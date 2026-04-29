/**
 * Discord自動レポート投稿
 * OpenClawのmessageツールと連携
 */

const fs = require('fs').promises;
const path = require('path');

// チャンネルマッピング
const CHANNEL_MAP = {
  'esta': '1481647405316440144',
  'etias': '1481647474744492195',
  'keta': '1481647476611092541',
  'uketa': '1481647478259581039',
  'france': '1481647479882780672',
  'summary': '1481647403902959728'  // #分析レポート
};

/**
 * レポートを読み込んでDiscord用にフォーマット
 */
async function loadAndFormatReport(siteId, date) {
  const reportPath = path.join(__dirname, '../reports', `${siteId}_report_${date}.md`);
  
  try {
    const report = await fs.readFile(reportPath, 'utf-8');
    return formatForDiscord(report);
  } catch (error) {
    console.error(`Error loading report for ${siteId}:`, error.message);
    return null;
  }
}

/**
 * Discordの文字数制限(2000)に対応して分割
 */
function formatForDiscord(markdown) {
  const maxLength = 1900; // 余裕を持たせる
  const parts = [];
  
  // セクションごとに分割
  const sections = markdown.split(/(?=^##)/m);
  let currentPart = '';
  
  for (const section of sections) {
    if (!section.trim()) continue;
    
    if ((currentPart + section).length <= maxLength) {
      currentPart += section;
    } else {
      if (currentPart.trim()) {
        parts.push(currentPart.trim());
      }
      currentPart = section;
    }
  }
  
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }
  
  return parts;
}

/**
 * サマリーレポートを生成（全サイト統合）
 */
async function generateSummaryReport(date) {
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  
  let summary = `# 📊 週次SEOサマリーレポート\n\n`;
  summary += `**生成日時:** ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}\n`;
  summary += `**期間:** 過去7日間\n\n`;
  summary += `---\n\n`;
  
  const siteStats = [];
  
  for (const site of sitesConfig.sites) {
    if (site.status !== 'active') continue;
    
    const jsonPath = path.join(__dirname, '../reports', `${site.id}_report_${date}.json`);
    
    try {
      const data = JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
      
      const sc = data.searchConsole || {};
      const ga = data.analytics || {};
      
      siteStats.push({
        name: site.name,
        clicks: sc.totalClicks || 0,
        impressions: sc.totalImpressions || 0,
        avgPosition: parseFloat(sc.averagePosition) || 0,
        sessions: ga.totalSessions || 0,
        users: ga.totalUsers || 0,
        conversions: ga.totalConversions || 0
      });
    } catch (error) {
      console.error(`Error loading ${site.id}:`, error.message);
    }
  }
  
  // 総計
  const totals = siteStats.reduce((acc, s) => ({
    clicks: acc.clicks + s.clicks,
    impressions: acc.impressions + s.impressions,
    sessions: acc.sessions + s.sessions,
    users: acc.users + s.users,
    conversions: acc.conversions + s.conversions
  }), { clicks: 0, impressions: 0, sessions: 0, users: 0, conversions: 0 });
  
  summary += `## 📈 全体統計\n\n`;
  summary += `• **総クリック数:** ${totals.clicks.toLocaleString()}\n`;
  summary += `• **総表示回数:** ${totals.impressions.toLocaleString()}\n`;
  summary += `• **総セッション数:** ${totals.sessions.toLocaleString()}\n`;
  summary += `• **総ユーザー数:** ${totals.users.toLocaleString()}\n`;
  summary += `• **総コンバージョン:** ${totals.conversions}\n\n`;
  
  summary += `## 🏆 サイト別パフォーマンス\n\n`;
  
  // セッション数でソート
  siteStats.sort((a, b) => b.sessions - a.sessions);
  
  siteStats.forEach((s, i) => {
    summary += `### ${i + 1}. ${s.name}\n`;
    summary += `• SC: ${s.clicks}クリック / ${s.impressions.toLocaleString()}表示 / 順位${s.avgPosition.toFixed(1)}\n`;
    summary += `• GA: ${s.sessions.toLocaleString()}セッション / ${s.users.toLocaleString()}ユーザー / ${s.conversions}CV\n\n`;
  });
  
  summary += `---\n\n`;
  summary += `詳細は各サイトのチャンネルをご確認ください:\n`;
  summary += `• <#1481647405316440144> ESTA\n`;
  summary += `• <#1481647474744492195> ETIAS\n`;
  summary += `• <#1481647476611092541> K-ETA\n`;
  summary += `• <#1481647478259581039> UK-ETA\n`;
  summary += `• <#1481647479882780672> フランス\n\n`;
  summary += `*このレポートはOpenClaw SEO Analyticsによって自動生成されました*\n`;
  
  return summary;
}

/**
 * メイン処理
 */
async function main() {
  const date = new Date().toISOString().split('T')[0];
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  
  console.log('\n📤 Discordレポート投稿準備\n');
  
  const postInstructions = [];
  
  // 各サイトのレポート
  for (const site of sitesConfig.sites) {
    if (site.status !== 'active') continue;
    
    const channelId = CHANNEL_MAP[site.id];
    if (!channelId) continue;
    
    const parts = await loadAndFormatReport(site.id, date);
    
    if (parts) {
      postInstructions.push({
        type: 'site',
        site: site.name,
        channelId,
        messages: parts
      });
    }
  }
  
  // サマリーレポート
  const summaryText = await generateSummaryReport(date);
  const summaryParts = formatForDiscord(summaryText);
  
  postInstructions.push({
    type: 'summary',
    site: '全体サマリー',
    channelId: CHANNEL_MAP.summary,
    messages: summaryParts
  });
  
  // 投稿用JSONを出力
  const outputPath = path.join(__dirname, '../discord-posts.json');
  await fs.writeFile(outputPath, JSON.stringify(postInstructions, null, 2));
  
  console.log(`✅ 投稿データ準備完了: ${outputPath}`);
  console.log(`   投稿予定: ${postInstructions.length}件\n`);
  
  return postInstructions;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { loadAndFormatReport, generateSummaryReport, CHANNEL_MAP };
