/**
 * SEOレポートをDiscordに投稿
 */

const fs = require('fs').promises;
const path = require('path');

async function postReportToDiscord(siteId, channelName) {
  const date = new Date().toISOString().split('T')[0];
  const reportPath = path.join(__dirname, '../reports', `${siteId}_report_${date}.md`);
  
  try {
    const report = await fs.readFile(reportPath, 'utf-8');
    
    // Discordの文字数制限を考慮して分割
    const maxLength = 1900;
    const parts = [];
    
    if (report.length <= maxLength) {
      parts.push(report);
    } else {
      // セクションごとに分割
      const sections = report.split('##');
      let currentPart = sections[0]; // ヘッダー部分
      
      for (let i = 1; i < sections.length; i++) {
        const section = '##' + sections[i];
        
        if ((currentPart + section).length <= maxLength) {
          currentPart += section;
        } else {
          if (currentPart.trim()) parts.push(currentPart);
          currentPart = section;
        }
      }
      
      if (currentPart.trim()) parts.push(currentPart);
    }
    
    return {
      channelName,
      parts,
      totalParts: parts.length
    };
  } catch (error) {
    console.error(`Error reading report for ${siteId}:`, error.message);
    return null;
  }
}

async function main() {
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  
  // チャンネルマッピング
  const channelMap = {
    'esta': '1481647405316440144',    // #esta
    'etias': '1481647474744492195',   // #etias
    'keta': '1481647476611092541',    // #k-eta
    'uketa': '1481647478259581039',   // #uk-eta
    'france': '1481647479882780672'   // #france
  };
  
  console.log('\n📤 Discordへのレポート投稿準備\n');
  
  const results = [];
  
  for (const site of sitesConfig.sites) {
    if (site.status !== 'active') continue;
    
    const channelId = channelMap[site.id];
    if (!channelId) {
      console.log(`⚠️  ${site.name}: チャンネルIDが見つかりません`);
      continue;
    }
    
    console.log(`📝 ${site.name} のレポート準備中...`);
    const result = await postReportToDiscord(site.id, channelId);
    
    if (result) {
      results.push({
        site: site.name,
        siteId: site.id,
        channelId: result.channelName,
        parts: result.parts,
        totalParts: result.totalParts
      });
      console.log(`   ✅ ${result.totalParts}パートに分割しました`);
    }
  }
  
  console.log('\n✅ 準備完了！\n');
  console.log('投稿するには message ツールを使用してください:');
  console.log('例: message({ action: "send", channel: "discord", to: "channel:ID", message: "..." })');
  
  return results;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { postReportToDiscord };
