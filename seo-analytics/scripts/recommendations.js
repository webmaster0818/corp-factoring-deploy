/**
 * SEO改善推奨アクション生成
 * データに基づく具体的な改善提案
 */

const fs = require('fs').promises;
const path = require('path');

class RecommendationEngine {
  constructor(dataDir, sitesConfig) {
    this.dataDir = dataDir;
    this.sitesConfig = sitesConfig;
    this.recommendations = [];
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
   * 優先度スコアを計算
   */
  calculatePriority(impact, effort) {
    // impact: high(3), medium(2), low(1)
    // effort: low(3), medium(2), high(1)
    const impactScore = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1;
    const effortScore = effort === 'low' ? 3 : effort === 'medium' ? 2 : 1;
    return impactScore * effortScore;
  }

  /**
   * タイトル・メタディスクリプション改善提案
   */
  async generateTitleMetaRecommendations(siteId, siteName, date) {
    const queriesData = await this.loadData(siteId, 'queries', date);
    const pagesData = await this.loadData(siteId, 'pages', date);
    
    if (!queriesData || !pagesData) return;
    
    const queries = queriesData.data || [];
    const pages = pagesData.data || [];
    
    // 上位表示でCTRが低いクエリ
    const lowCTRQueries = queries
      .filter(q => {
        const pos = q.position || 999;
        const ctr = (q.ctr || 0) * 100;
        return pos <= 10 && ctr < 3 && q.impressions >= 20;
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 5);
    
    if (lowCTRQueries.length > 0) {
      lowCTRQueries.forEach(query => {
        this.recommendations.push({
          site: siteName,
          siteId,
          type: 'title_meta',
          priority: this.calculatePriority('high', 'low'),
          impact: 'high',
          effort: 'low',
          title: 'タイトル・メタディスクリプション最適化',
          query: query.keys[0],
          currentPosition: query.position.toFixed(1),
          currentCTR: ((query.ctr || 0) * 100).toFixed(2) + '%',
          impressions: query.impressions,
          potentialGain: Math.round(query.impressions * 0.05), // 5%改善を想定
          actions: [
            `クエリ「${query.keys[0]}」を含むタイトルに最適化`,
            '数字や「完全ガイド」「最新」などの訴求ワードを追加',
            'メタディスクリプションにベネフィットを明記',
            '感情に訴える表現を追加（安心、簡単、確実など）'
          ]
        });
      });
    }
  }

  /**
   * コンテンツ改善提案
   */
  async generateContentRecommendations(siteId, siteName, date) {
    const queriesData = await this.loadData(siteId, 'queries', date);
    
    if (!queriesData) return;
    
    const queries = queriesData.data || [];
    
    // 順位4-10位のクエリ（コンテンツ改善で上位狙える）
    const improvableQueries = queries
      .filter(q => {
        const pos = q.position || 999;
        return pos >= 4 && pos <= 10 && q.impressions >= 30;
      })
      .sort((a, b) => a.position - b.position)
      .slice(0, 5);
    
    if (improvableQueries.length > 0) {
      improvableQueries.forEach(query => {
        this.recommendations.push({
          site: siteName,
          siteId,
          type: 'content',
          priority: this.calculatePriority('high', 'medium'),
          impact: 'high',
          effort: 'medium',
          title: 'コンテンツ品質向上',
          query: query.keys[0],
          currentPosition: query.position.toFixed(1),
          impressions: query.impressions,
          targetPosition: '3位以内',
          potentialGain: Math.round(query.impressions * 0.08), // 8%改善を想定
          actions: [
            `「${query.keys[0]}」に関する詳細情報を追加`,
            '関連する質問（FAQ）セクションを追加',
            '最新情報・統計データを追加',
            '画像・図表で視覚的にわかりやすく',
            '内部リンクで関連ページと連携',
            'E-E-A-T（専門性・権威性・信頼性）を強化'
          ]
        });
      });
    }
  }

  /**
   * 内部リンク最適化提案
   */
  async generateInternalLinkRecommendations(siteId, siteName, date) {
    const pagesData = await this.loadData(siteId, 'pages', date);
    
    if (!pagesData) return;
    
    const pages = pagesData.data || [];
    
    // クリック数が多いページ（ハブページ候補）
    const hubPages = pages
      .filter(p => p.clicks >= 10)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 3);
    
    // パフォーマンスが低いページ
    const weakPages = pages
      .filter(p => {
        const pos = p.position || 999;
        return pos >= 15 && p.impressions >= 50;
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 3);
    
    if (hubPages.length > 0 && weakPages.length > 0) {
      this.recommendations.push({
        site: siteName,
        siteId,
        type: 'internal_link',
        priority: this.calculatePriority('medium', 'low'),
        impact: 'medium',
        effort: 'low',
        title: '内部リンク戦略の最適化',
        hubPages: hubPages.map(p => ({
          url: p.keys[0],
          clicks: p.clicks,
          position: p.position.toFixed(1)
        })),
        weakPages: weakPages.map(p => ({
          url: p.keys[0],
          impressions: p.impressions,
          position: p.position.toFixed(1)
        })),
        actions: [
          '強いページ（ハブページ）から弱いページへの内部リンクを追加',
          '関連性の高いアンカーテキストを使用',
          'サイト構造を見直し、重要ページへのリンク深度を減らす',
          'パンくずリストを全ページに実装'
        ]
      });
    }
  }

  /**
   * モバイル最適化提案
   */
  async generateMobileRecommendations(siteId, siteName, date) {
    const devicesData = await this.loadData(siteId, 'devices', date);
    const ga4DeviceData = await this.loadData(siteId, 'ga4_device_location', date);
    
    if (!devicesData && !ga4DeviceData) return;
    
    // Search Consoleのデバイス別データ
    if (devicesData && devicesData.data) {
      const devices = devicesData.data;
      const mobile = devices.find(d => d.keys && d.keys[0] === 'MOBILE');
      const desktop = devices.find(d => d.keys && d.keys[0] === 'DESKTOP');
      
      if (mobile && desktop) {
        const mobileCTR = (mobile.ctr || 0) * 100;
        const desktopCTR = (desktop.ctr || 0) * 100;
        
        // モバイルCTRがデスクトップより20%以上低い
        if (mobileCTR < desktopCTR * 0.8) {
          this.recommendations.push({
            site: siteName,
            siteId,
            type: 'mobile',
            priority: this.calculatePriority('high', 'medium'),
            impact: 'high',
            effort: 'medium',
            title: 'モバイルUX改善',
            mobileCTR: mobileCTR.toFixed(2) + '%',
            desktopCTR: desktopCTR.toFixed(2) + '%',
            gap: (desktopCTR - mobileCTR).toFixed(2) + '%',
            actions: [
              'モバイルファーストデザインの見直し',
              'タップ可能領域のサイズ拡大（最低44x44px）',
              'フォント・画像サイズをモバイル最適化',
              'ページ読み込み速度の改善（Core Web Vitals）',
              '不要なポップアップ・インタースティシャルを削除',
              'AMP対応の検討'
            ]
          });
        }
      }
    }
  }

  /**
   * テクニカルSEO提案
   */
  async generateTechnicalRecommendations(siteId, siteName, date) {
    const pagesData = await this.loadData(siteId, 'pages', date);
    
    if (!pagesData) return;
    
    const pages = pagesData.data || [];
    
    // 表示回数が多いのに順位が低いページ
    const technicalIssuePages = pages
      .filter(p => {
        const pos = p.position || 999;
        return p.impressions >= 100 && pos >= 20;
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 3);
    
    if (technicalIssuePages.length > 0) {
      this.recommendations.push({
        site: siteName,
        siteId,
        type: 'technical',
        priority: this.calculatePriority('high', 'high'),
        impact: 'high',
        effort: 'high',
        title: 'テクニカルSEO最適化',
        affectedPages: technicalIssuePages.map(p => ({
          url: p.keys[0],
          impressions: p.impressions,
          position: p.position.toFixed(1)
        })),
        actions: [
          'ページ速度を改善（Core Web Vitals: LCP, FID, CLS）',
          '構造化データ（Schema.org）の実装',
          'クロール最適化（robots.txt, sitemap.xml）',
          'HTTPSの完全実装',
          'モバイルフレンドリー対応の確認',
          '重複コンテンツの解消（canonical設定）',
          '404エラー・リンク切れの修正'
        ]
      });
    }
  }

  /**
   * 全サイトの推奨アクション生成
   */
  async generateAllRecommendations(date) {
    this.recommendations = [];
    
    for (const site of this.sitesConfig.sites) {
      if (site.status !== 'active') continue;
      
      console.log(`💡 ${site.name} の推奨アクション生成中...`);
      
      await this.generateTitleMetaRecommendations(site.id, site.name, date);
      await this.generateContentRecommendations(site.id, site.name, date);
      await this.generateInternalLinkRecommendations(site.id, site.name, date);
      await this.generateMobileRecommendations(site.id, site.name, date);
      await this.generateTechnicalRecommendations(site.id, site.name, date);
    }
    
    // 優先度でソート
    this.recommendations.sort((a, b) => b.priority - a.priority);
    
    return this.recommendations;
  }

  /**
   * Discord用フォーマット
   */
  formatRecommendationsForDiscord() {
    if (this.recommendations.length === 0) {
      return '💡 新しい推奨アクションはありません。';
    }
    
    let message = `# 🎯 SEO改善推奨アクション\n\n`;
    message += `**生成日時:** ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}\n`;
    message += `**総推奨数:** ${this.recommendations.length}\n\n`;
    
    // サイトごとに分類
    const bySite = {};
    this.recommendations.forEach(rec => {
      if (!bySite[rec.site]) {
        bySite[rec.site] = [];
      }
      bySite[rec.site].push(rec);
    });
    
    for (const [siteName, siteRecs] of Object.entries(bySite)) {
      message += `## 🎯 ${siteName}\n\n`;
      
      siteRecs.forEach((rec, index) => {
        const priorityEmoji = rec.impact === 'high' ? '🔴' : rec.impact === 'medium' ? '🟡' : '🟢';
        const effortEmoji = rec.effort === 'low' ? '✨' : rec.effort === 'medium' ? '⚙️' : '🔧';
        
        message += `### ${index + 1}. ${rec.title} ${priorityEmoji}${effortEmoji}\n\n`;
        message += `**影響度:** ${rec.impact === 'high' ? '高' : rec.impact === 'medium' ? '中' : '低'} | `;
        message += `**工数:** ${rec.effort === 'low' ? '低' : rec.effort === 'medium' ? '中' : '高'}\n\n`;
        
        if (rec.query) {
          message += `**対象クエリ:** ${rec.query}\n`;
          message += `**現在順位:** ${rec.currentPosition}\n`;
          if (rec.potentialGain) {
            message += `**期待効果:** +${rec.potentialGain}クリック/週\n`;
          }
        }
        
        message += `\n**実施内容:**\n`;
        rec.actions.forEach(action => {
          message += `• ${action}\n`;
        });
        message += `\n`;
      });
    }
    
    message += `---\n\n`;
    message += `🔴 = 高影響 | 🟡 = 中影響 | 🟢 = 低影響\n`;
    message += `✨ = 低工数 | ⚙️ = 中工数 | 🔧 = 高工数\n\n`;
    message += `*優先度の高いものから実施することをお勧めします*\n`;
    
    return message;
  }

  /**
   * 推奨アクションを保存
   */
  async saveRecommendations(date) {
    const recsDir = path.join(__dirname, '../recommendations');
    await fs.mkdir(recsDir, { recursive: true });
    
    const filepath = path.join(recsDir, `recommendations_${date}.json`);
    await fs.writeFile(filepath, JSON.stringify({
      date,
      timestamp: new Date().toISOString(),
      totalRecommendations: this.recommendations.length,
      recommendations: this.recommendations
    }, null, 2));
    
    console.log(`✅ Recommendations saved: ${filepath}`);
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
  
  console.log('\n🎯 SEO改善推奨アクション生成開始\n');
  console.log(`対象日: ${currentDate}\n`);
  
  const engine = new RecommendationEngine(dataDir, sitesConfig);
  const recommendations = await engine.generateAllRecommendations(currentDate);
  
  console.log(`\n生成推奨数: ${recommendations.length}\n`);
  
  // 推奨アクションを保存
  await engine.saveRecommendations(currentDate);
  
  // Discord用フォーマット
  const discordMessage = engine.formatRecommendationsForDiscord();
  console.log('\n--- Discord通知メッセージ ---\n');
  console.log(discordMessage);
  
  return {
    recommendations,
    discordMessage
  };
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { RecommendationEngine };
