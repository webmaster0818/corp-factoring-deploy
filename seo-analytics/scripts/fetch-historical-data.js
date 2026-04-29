/**
 * 過去の履歴データを取得するスクリプト
 * 2025年1月から現在までの月次データを取得
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

async function fetchHistoricalData() {
  const credentialsPath = path.join(__dirname, '../../google-credentials.json');
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');

  // 設定読み込み
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  const ketaSite = sitesConfig.sites.find(s => s.id === 'keta');

  if (!ketaSite) {
    console.error('K-ETAサイトが見つかりません');
    return;
  }

  console.log(`\n📊 K-ETA 履歴データ取得開始`);
  console.log(`サイト: ${ketaSite.searchConsoleUrl}\n`);

  // 認証
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: await auth.getClient(),
  });

  // 月次データを取得（2025年1月〜現在）
  const months = [];
  const startYear = 2025;
  const startMonth = 1;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  for (let year = startYear; year <= currentYear; year++) {
    const monthStart = year === startYear ? startMonth : 1;
    const monthEnd = year === currentYear ? currentMonth : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      months.push({ year, month });
    }
  }

  const results = [];

  for (const { year, month } of months) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // 月末
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    console.log(`📅 ${year}年${month}月 (${startDateStr} 〜 ${endDateStr})`);

    try {
      const response = await searchconsole.searchanalytics.query({
        siteUrl: ketaSite.searchConsoleUrl,
        requestBody: {
          startDate: startDateStr,
          endDate: endDateStr,
          dimensions: ['query'],
          rowLimit: 1000,
        },
      });

      const data = response.data.rows || [];
      
      // 主要キーワードのみ抽出
      const mainKeywords = ['keta', 'k-eta', 'k-eta 申請', 'keta 申請', 'k-etaとは'];
      const mainData = data.filter(row => 
        mainKeywords.some(kw => row.keys[0].toLowerCase() === kw)
      );

      const summary = {
        year,
        month,
        period: `${year}-${String(month).padStart(2, '0')}`,
        totalClicks: data.reduce((sum, row) => sum + row.clicks, 0),
        totalImpressions: data.reduce((sum, row) => sum + row.impressions, 0),
        avgPosition: data.reduce((sum, row) => sum + (row.position * row.impressions), 0) / 
                     data.reduce((sum, row) => sum + row.impressions, 0),
        queryCount: data.length,
        mainKeywords: mainData.map(row => ({
          keyword: row.keys[0],
          clicks: row.clicks,
          impressions: row.impressions,
          position: row.position,
          ctr: row.ctr,
        })),
      };

      results.push(summary);
      
      console.log(`  クリック: ${summary.totalClicks}, 表示: ${summary.totalImpressions}, 平均順位: ${summary.avgPosition.toFixed(1)}`);
      
      // 主要キーワードの情報
      if (mainData.length > 0) {
        console.log(`  主要キーワード:`);
        mainData.forEach(row => {
          console.log(`    "${row.keys[0]}": 順位${row.position.toFixed(1)}, クリック${row.clicks}, 表示${row.impressions}`);
        });
      }

    } catch (error) {
      console.error(`  ❌ エラー:`, error.message);
    }

    // API制限を考慮して少し待機
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // 結果を保存
  const outputPath = path.join(__dirname, '../data/keta/historical_data.json');
  await fs.writeFile(outputPath, JSON.stringify({
    site: 'keta',
    generatedAt: new Date().toISOString(),
    period: '2025-01 to present',
    data: results,
  }, null, 2));

  console.log(`\n✅ 履歴データ保存完了: ${outputPath}`);

  // サマリーレポート生成
  console.log(`\n📊 推移サマリー:\n`);
  console.log(`期間 | クリック | 表示回数 | 平均順位 | keta順位 | k-eta順位`);
  console.log(`-----|---------|----------|---------|---------|----------`);
  
  results.forEach(r => {
    const ketaData = r.mainKeywords.find(k => k.keyword === 'keta');
    const ketaDashData = r.mainKeywords.find(k => k.keyword === 'k-eta');
    
    console.log(
      `${r.period} | ${r.totalClicks.toString().padStart(7)} | ${r.totalImpressions.toString().padStart(8)} | ${r.avgPosition.toFixed(1).padStart(8)} | ` +
      `${ketaData ? ketaData.position.toFixed(1).padStart(8) : '     N/A'} | ` +
      `${ketaDashData ? ketaDashData.position.toFixed(1).padStart(9) : '      N/A'}`
    );
  });

  return results;
}

// 実行
if (require.main === module) {
  fetchHistoricalData().catch(console.error);
}

module.exports = { fetchHistoricalData };
