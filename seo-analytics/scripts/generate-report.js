/**
 * SEOレポート生成スクリプト
 * Search ConsoleとGA4のデータを統合してレポートを作成
 */

const fs = require('fs').promises;
const path = require('path');

class ReportGenerator {
  constructor(dataDir, sitesConfig) {
    this.dataDir = dataDir;
    this.sitesConfig = sitesConfig;
  }

  /**
   * サイトの最新データを読み込み
   */
  async loadLatestData(siteId, dataType) {
    const siteDataDir = path.join(this.dataDir, siteId);
    
    try {
      const files = await fs.readdir(siteDataDir);
      const matchingFiles = files.filter(f => f.includes(dataType));
      
      if (matchingFiles.length === 0) return null;
      
      // 最新ファイルを取得
      matchingFiles.sort().reverse();
      const latestFile = matchingFiles[0];
      
      const data = await fs.readFile(
        path.join(siteDataDir, latestFile),
        'utf-8'
      );
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * サイト別サマリーレポートを生成
   */
  async generateSiteSummary(siteId) {
    const site = this.sitesConfig.sites.find(s => s.id === siteId);
    if (!site) return null;

    // データ読み込み
    const scQueries = await this.loadLatestData(siteId, 'queries');
    const scPages = await this.loadLatestData(siteId, 'pages');
    const ga4Traffic = await this.loadLatestData(siteId, 'ga4_traffic');
    const ga4Sources = await this.loadLatestData(siteId, 'ga4_sources');

    const summary = {
      site: site.name,
      siteId: siteId,
      domain: site.domain,
      timestamp: new Date().toISOString(),
      searchConsole: {},
      analytics: {},
      topQueries: [],
      topPages: []
    };

    // Search Consoleサマリー
    if (scQueries && scQueries.data) {
      const totalClicks = scQueries.data.reduce((sum, q) => sum + (q.clicks || 0), 0);
      const totalImpressions = scQueries.data.reduce((sum, q) => sum + (q.impressions || 0), 0);
      const avgPosition = scQueries.data.reduce((sum, q) => sum + (q.position || 0), 0) / scQueries.data.length;

      summary.searchConsole = {
        totalClicks,
        totalImpressions,
        averageCTR: totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : 0,
        averagePosition: avgPosition.toFixed(1),
        totalQueries: scQueries.data.length
      };

      // トップクエリ
      summary.topQueries = scQueries.data
        .filter(q => q.keys && q.keys.length > 0)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10)
        .map(q => ({
          query: q.keys[0],
          clicks: q.clicks || 0,
          impressions: q.impressions || 0,
          ctr: ((q.ctr || 0) * 100).toFixed(2),
          position: (q.position || 0).toFixed(1)
        }));
    }

    // トップページ
    if (scPages && scPages.data) {
      summary.topPages = scPages.data
        .filter(p => p.keys && p.keys.length > 0)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10)
        .map(p => ({
          page: p.keys[0],
          clicks: p.clicks || 0,
          impressions: p.impressions || 0,
          ctr: ((p.ctr || 0) * 100).toFixed(2),
          position: (p.position || 0).toFixed(1)
        }));
    }

    // GA4サマリー
    if (ga4Traffic && ga4Traffic.data) {
      const totalSessions = ga4Traffic.data.reduce((sum, d) => sum + (d.sessions || 0), 0);
      const totalUsers = ga4Traffic.data.reduce((sum, d) => sum + (d.activeUsers || 0), 0);
      const totalPageViews = ga4Traffic.data.reduce((sum, d) => sum + (d.screenPageViews || 0), 0);
      const totalConversions = ga4Traffic.data.reduce((sum, d) => sum + (d.conversions || 0), 0);
      const avgSessionDuration = ga4Traffic.data.reduce((sum, d) => sum + (d.averageSessionDuration || 0), 0) / ga4Traffic.data.length;
      const avgBounceRate = ga4Traffic.data.reduce((sum, d) => sum + (d.bounceRate || 0), 0) / ga4Traffic.data.length;

      summary.analytics = {
        totalSessions,
        totalUsers,
        totalPageViews,
        totalConversions,
        conversionRate: totalSessions > 0 ? (totalConversions / totalSessions * 100).toFixed(2) : 0,
        averageSessionDuration: avgSessionDuration.toFixed(0),
        averageBounceRate: (avgBounceRate * 100).toFixed(2)
      };
    }

    // トラフィックソース
    if (ga4Sources && ga4Sources.data) {
      summary.analytics.topSources = ga4Sources.data
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 5)
        .map(s => ({
          channel: s.sessionDefaultChannelGroup,
          source: s.sessionSource,
          sessions: s.sessions,
          users: s.activeUsers,
          conversions: s.conversions
        }));
    }

    return summary;
  }

  /**
   * 全サイトのサマリーレポートを生成
   */
  async generateAllSitesSummary() {
    const summaries = [];

    for (const site of this.sitesConfig.sites) {
      if (site.status !== 'active') continue;

      const summary = await this.generateSiteSummary(site.id);
      if (summary) {
        summaries.push(summary);
      }
    }

    return {
      timestamp: new Date().toISOString(),
      totalSites: summaries.length,
      sites: summaries
    };
  }

  /**
   * Markdown形式のレポートを生成
   */
  formatMarkdownReport(summary) {
    let md = `# 📊 SEOレポート - ${summary.site}\n\n`;
    md += `**生成日時:** ${new Date(summary.timestamp).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}\n`;
    md += `**ドメイン:** ${summary.domain}\n\n`;
    
    md += `---\n\n`;

    // Search Console
    if (summary.searchConsole && Object.keys(summary.searchConsole).length > 0) {
      md += `## 🔍 Search Console (過去7日間)\n\n`;
      md += `• **総クリック数:** ${summary.searchConsole.totalClicks.toLocaleString()}\n`;
      md += `• **総表示回数:** ${summary.searchConsole.totalImpressions.toLocaleString()}\n`;
      md += `• **平均CTR:** ${summary.searchConsole.averageCTR}%\n`;
      md += `• **平均掲載順位:** ${summary.searchConsole.averagePosition}\n`;
      md += `• **検索クエリ数:** ${summary.searchConsole.totalQueries.toLocaleString()}\n\n`;

      if (summary.topQueries && summary.topQueries.length > 0) {
        md += `### トップ検索クエリ\n\n`;
        summary.topQueries.forEach((q, i) => {
          md += `${i + 1}. **${q.query}**\n`;
          md += `   - クリック: ${q.clicks} | 表示: ${q.impressions} | CTR: ${q.ctr}% | 順位: ${q.position}\n`;
        });
        md += `\n`;
      }

      if (summary.topPages && summary.topPages.length > 0) {
        md += `### トップページ\n\n`;
        summary.topPages.slice(0, 5).forEach((p, i) => {
          md += `${i + 1}. ${p.page}\n`;
          md += `   - クリック: ${p.clicks} | CTR: ${p.ctr}% | 順位: ${p.position}\n`;
        });
        md += `\n`;
      }
    }

    // GA4
    if (summary.analytics && Object.keys(summary.analytics).length > 0) {
      md += `## 📈 Google Analytics (過去7日間)\n\n`;
      md += `• **総セッション数:** ${summary.analytics.totalSessions?.toLocaleString() || 'N/A'}\n`;
      md += `• **総ユーザー数:** ${summary.analytics.totalUsers?.toLocaleString() || 'N/A'}\n`;
      md += `• **ページビュー:** ${summary.analytics.totalPageViews?.toLocaleString() || 'N/A'}\n`;
      md += `• **コンバージョン:** ${summary.analytics.totalConversions || 0}\n`;
      md += `• **コンバージョン率:** ${summary.analytics.conversionRate || 0}%\n`;
      md += `• **平均セッション時間:** ${summary.analytics.averageSessionDuration}秒\n`;
      md += `• **直帰率:** ${summary.analytics.averageBounceRate}%\n\n`;

      if (summary.analytics.topSources && summary.analytics.topSources.length > 0) {
        md += `### トップトラフィックソース\n\n`;
        summary.analytics.topSources.forEach((s, i) => {
          md += `${i + 1}. **${s.channel}** (${s.source})\n`;
          md += `   - セッション: ${s.sessions} | ユーザー: ${s.users} | CV: ${s.conversions}\n`;
        });
        md += `\n`;
      }
    }

    md += `---\n\n`;
    md += `*このレポートはOpenClaw SEO Analyticsによって自動生成されました*\n`;

    return md;
  }

  /**
   * レポートを保存
   */
  async saveReport(siteId, content, format = 'md') {
    const reportsDir = path.join(__dirname, '../reports');
    await fs.mkdir(reportsDir, { recursive: true });

    const date = new Date().toISOString().split('T')[0];
    const filename = `${siteId}_report_${date}.${format}`;
    const filepath = path.join(reportsDir, filename);

    await fs.writeFile(filepath, content, 'utf-8');
    console.log(`✅ Report saved: ${filepath}`);
    
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
  const generator = new ReportGenerator(dataDir, sitesConfig);

  console.log('\n📊 SEOレポート生成開始\n');

  // 全サイトのサマリーを生成
  const allSummary = await generator.generateAllSitesSummary();

  console.log(`処理サイト数: ${allSummary.totalSites}\n`);

  // 各サイトのレポート生成
  for (const siteSummary of allSummary.sites) {
    console.log(`📝 ${siteSummary.site} のレポート生成中...`);
    
    // Markdown形式
    const mdReport = generator.formatMarkdownReport(siteSummary);
    await generator.saveReport(siteSummary.siteId, mdReport, 'md');
    
    // JSON形式も保存
    await generator.saveReport(
      siteSummary.siteId,
      JSON.stringify(siteSummary, null, 2),
      'json'
    );
  }

  console.log('\n✅ 全レポート生成完了！\n');

  return allSummary;
}

// 実行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ReportGenerator };
