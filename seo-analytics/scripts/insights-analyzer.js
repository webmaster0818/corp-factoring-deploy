/**
 * SEOインサイト分析
 * キーワード機会、CTR改善、トレンド分析
 */

const fs = require('fs').promises;
const path = require('path');

class InsightsAnalyzer {
  constructor(dataDir, sitesConfig) {
    this.dataDir = dataDir;
    this.sitesConfig = sitesConfig;
    this.insights = [];
  }

  /**
   * データ読み込み
   */
  async loadData(siteId, dataType, date) {
    const filepath = path.join(this.dataDir, siteId, `${dataType}_${date}.json`);
    
    try {
      const data = await fs.readFile(filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * キーワード機会分析
   * 順位4-20位のクエリ（少し頑張れば1ページ目に入れる）
   */
  async analyzeKeywordOpportunities(siteId, siteName, date) {
    const data = await this.loadData(siteId, 'queries', date);
    if (!data || !data.data) return;
    
    const queries = data.data;
    
    // 順位4-20位のクエリを抽出
    const opportunities = queries
      .filter(q => {
        const pos = q.position || 0;
        return pos >= 4 && pos <= 20 && q.impressions >= 10; // 表示回数も条件に
      })
      .sort((a, b) => a.position - b.position)
      .slice(0, 15);
    
    if (opportunities.length > 0) {
      this.insights.push({
        type: 'keyword_opportunity',
        site: siteName,
        siteId,
        count: opportunities.length,
        keywords: opportunities.map(q => ({
          query: q.keys[0],
          position: q.position.toFixed(1),
          impressions: q.impressions,
          clicks: q.clicks || 0,
          ctr: ((q.ctr || 0) * 100).toFixed(2) + '%',
          potential: this.calculatePotential(q.position, q.impressions)
        }))
      });
    }
  }

  /**
   * 順位向上の潜在価値を計算
   */
  calculatePotential(currentPosition, impressions) {
    // 順位ごとのCTR（業界平均）
    const avgCTRByPosition = {
      1: 0.285, 2: 0.152, 3: 0.098, 4: 0.069, 5: 0.053,
      6: 0.042, 7: 0.035, 8: 0.030, 9: 0.026, 10: 0.023
    };
    
    const currentCTR = avgCTRByPosition[Math.floor(currentPosition)] || 0.01;
    const targetCTR = avgCTRByPosition[3] || 0.098; // 3位を目標
    
    const potentialClicks = Math.round(impressions * (targetCTR - currentCTR));
    return potentialClicks > 0 ? potentialClicks : 0;
  }

  /**
   * CTR改善機会分析
   * 表示回数は多いがCTRが低いクエリ
   */
  async analyzeCTROpportunities(siteId, siteName, date) {
    const data = await this.loadData(siteId, 'queries', date);
    if (!data || !data.data) return;
    
    const queries = data.data;
    
    // 表示回数50以上、順位10以内、CTR3%未満
    const lowCTR = queries
      .filter(q => {
        const ctr = (q.ctr || 0) * 100;
        const pos = q.position || 999;
        return q.impressions >= 50 && pos <= 10 && ctr < 3;
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10);
    
    if (lowCTR.length > 0) {
      this.insights.push({
        type: 'ctr_opportunity',
        site: siteName,
        siteId,
        count: lowCTR.length,
        keywords: lowCTR.map(q => ({
          query: q.keys[0],
          position: q.position.toFixed(1),
          impressions: q.impressions,
          clicks: q.clicks || 0,
          ctr: ((q.ctr || 0) * 100).toFixed(2) + '%',
          expectedCTR: this.getExpectedCTR(q.position),
          potentialClicks: this.calculateCTRPotential(q)
        }))
      });
    }
  }

  /**
   * 順位に基づく期待CTRを取得
   */
  getExpectedCTR(position) {
    const avgCTRByPosition = {
      1: 28.5, 2: 15.2, 3: 9.8, 4: 6.9, 5: 5.3,
      6: 4.2, 7: 3.5, 8: 3.0, 9: 2.6, 10: 2.3
    };
    
    return (avgCTRByPosition[Math.floor(position)] || 1.0).toFixed(1) + '%';
  }

  /**
   * CTR改善による潜在クリック数を計算
   */
  calculateCTRPotential(query) {
    const avgCTRByPosition = {
      1: 0.285, 2: 0.152, 3: 0.098, 4: 0.069, 5: 0.053,
      6: 0.042, 7: 0.035, 8: 0.030, 9: 0.026, 10: 0.023
    };
    
    const currentCTR = query.ctr || 0;
    const expectedCTR = avgCTRByPosition[Math.floor(query.position)] || 0.02;
    
    const potentialClicks = Math.round(query.impressions * (expectedCTR - currentCTR));
    return potentialClicks > 0 ? potentialClicks : 0;
  }

  /**
   * トラフィックトレンド分析
   */
  async analyzeTrafficTrends(siteId, siteName, date) {
    const data = await this.loadData(siteId, 'ga4_traffic', date);
    if (!data || !data.data) return;
    
    const traffic = data.data;
    
    // 日次データから週のトレンドを分析
    if (traffic.length >= 7) {
      const firstHalf = traffic.slice(0, 3);
      const secondHalf = traffic.slice(4, 7);
      
      const firstAvg = firstHalf.reduce((sum, d) => sum + (d.sessions || 0), 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, d) => sum + (d.sessions || 0), 0) / secondHalf.length;
      
      const trend = ((secondAvg - firstAvg) / firstAvg) * 100;
      
      if (Math.abs(trend) > 10) {
        this.insights.push({
          type: 'traffic_trend',
          site: siteName,
          siteId,
          trend: trend > 0 ? 'increasing' : 'decreasing',
          changePercent: trend.toFixed(1),
          firstHalfAvg: Math.round(firstAvg),
          secondHalfAvg: Math.round(secondAvg)
        });
      }
    }
  }

  /**
   * ページパフォーマンス分析
   * 表示は多いがクリックが少ないページ
   */
  async analyzePagePerformance(siteId, siteName, date) {
    const data = await this.loadData(siteId, 'pages', date);
    if (!data || !data.data) return;
    
    const pages = data.data;
    
    // 表示回数100以上、CTR2%未満のページ
    const underperforming = pages
      .filter(p => {
        const ctr = (p.ctr || 0) * 100;
        return p.impressions >= 100 && ctr < 2;
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 5);
    
    if (underperforming.length > 0) {
      this.insights.push({
        type: 'page_performance',
        site: siteName,
        siteId,
        count: underperforming.length,
        pages: underperforming.map(p => ({
          url: p.keys[0],
          position: p.position.toFixed(1),
          impressions: p.impressions,
          clicks: p.clicks || 0,
          ctr: ((p.ctr || 0) * 100).toFixed(2) + '%'
        }))
      });
    }
  }

  /**
   * 全サイトの分析実行
   */
  async analyzeAllSites(date) {
    this.insights = [];
    
    for (const site of this.sitesConfig.sites) {
      if (site.status !== 'active') continue;
      
      console.log(`🔍 ${site.name} のインサイト分析中...`);
      
      await this.analyzeKeywordOpportunities(site.id, site.name, date);
      await this.analyzeCTROpportunities(site.id, site.name, date);
      await this.analyzeTrafficTrends(site.id, site.name, date);
      await this.analyzePagePerformance(site.id, site.name, date);
    }
    
    return this.insights;
  }

  /**
   * インサイトをDiscord用にフォーマット
   */
  formatInsightsForDiscord() {
    if (this.insights.length === 0) {
      return '💡 新しいインサイトはありません。';
    }
    
    let message = `# 💡 SEOインサイト分析\n\n`;
    message += `**生成日時:** ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}\n`;
    message += `**総インサイト数:** ${this.insights.length}\n\n`;
    
    // サイトごとに分類
    const bySite = {};
    this.insights.forEach(insight => {
      if (!bySite[insight.site]) {
        bySite[insight.site] = [];
      }
      bySite[insight.site].push(insight);
    });
    
    for (const [siteName, siteInsights] of Object.entries(bySite)) {
      message += `## 🎯 ${siteName}\n\n`;
      
      siteInsights.forEach(insight => {
        if (insight.type === 'keyword_opportunity') {
          message += `### 📈 キーワード機会 (${insight.count}件)\n\n`;
          message += `少し改善すれば上位表示が狙えるキーワード:\n\n`;
          insight.keywords.slice(0, 5).forEach((kw, i) => {
            message += `${i + 1}. **${kw.query}**\n`;
            message += `   順位: ${kw.position} | 表示: ${kw.impressions} | 潜在クリック: +${kw.potential}\n`;
          });
          message += `\n`;
        }
        
        if (insight.type === 'ctr_opportunity') {
          message += `### 🎯 CTR改善機会 (${insight.count}件)\n\n`;
          message += `上位表示されているがCTRが低いキーワード:\n\n`;
          insight.keywords.slice(0, 5).forEach((kw, i) => {
            message += `${i + 1}. **${kw.query}**\n`;
            message += `   順位: ${kw.position} | CTR: ${kw.ctr} (期待: ${kw.expectedCTR}) | 潜在: +${kw.potentialClicks}クリック\n`;
          });
          message += `\n`;
        }
        
        if (insight.type === 'traffic_trend') {
          const emoji = insight.trend === 'increasing' ? '📈' : '📉';
          message += `### ${emoji} トラフィックトレンド\n\n`;
          message += `週の後半が${insight.trend === 'increasing' ? '上昇' : '下降'}傾向: ${insight.changePercent > 0 ? '+' : ''}${insight.changePercent}%\n`;
          message += `前半平均: ${insight.firstHalfAvg} → 後半平均: ${insight.secondHalfAvg}\n\n`;
        }
        
        if (insight.type === 'page_performance') {
          message += `### 📄 改善が必要なページ (${insight.count}件)\n\n`;
          insight.pages.slice(0, 3).forEach((page, i) => {
            const url = page.url.length > 60 ? page.url.substring(0, 57) + '...' : page.url;
            message += `${i + 1}. ${url}\n`;
            message += `   順位: ${page.position} | 表示: ${page.impressions} | CTR: ${page.ctr}\n`;
          });
          message += `\n`;
        }
      });
    }
    
    message += `---\n\n`;
    message += `*このインサイトはOpenClaw SEO Analyticsによって自動生成されました*\n`;
    
    return message;
  }

  /**
   * インサイトを保存
   */
  async saveInsights(date) {
    const insightsDir = path.join(__dirname, '../insights');
    await fs.mkdir(insightsDir, { recursive: true });
    
    const filepath = path.join(insightsDir, `insights_${date}.json`);
    await fs.writeFile(filepath, JSON.stringify({
      date,
      timestamp: new Date().toISOString(),
      totalInsights: this.insights.length,
      insights: this.insights
    }, null, 2));
    
    console.log(`✅ Insights saved: ${filepath}`);
    return filepath;
  }
}

/**
 * メイン処理
 */
async function main() {
  const dataDir = path.join(__dirname, '../data');
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');
  
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  console.log('\n💡 SEOインサイト分析開始\n');
  console.log(`対象日: ${currentDate}\n`);
  
  const analyzer = new InsightsAnalyzer(dataDir, sitesConfig);
  const insights = await analyzer.analyzeAllSites(currentDate);
  
  console.log(`\n検出インサイト数: ${insights.length}\n`);
  
  // インサイトを保存
  await analyzer.saveInsights(currentDate);
  
  // Discord用フォーマット
  const discordMessage = analyzer.formatInsightsForDiscord();
  console.log('\n--- Discord通知メッセージ ---\n');
  console.log(discordMessage);
  
  return {
    insights,
    discordMessage
  };
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { InsightsAnalyzer };
