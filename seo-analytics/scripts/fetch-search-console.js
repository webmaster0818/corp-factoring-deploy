/**
 * Search Console データ取得スクリプト
 * 検索順位、クリック数、表示回数、CTRなどを取得
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

class SearchConsoleClient {
  constructor(credentialsPath) {
    this.credentialsPath = credentialsPath;
    this.auth = null;
    this.searchconsole = null;
  }

  async initialize() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: this.credentialsPath,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const authClient = await this.auth.getClient();
    this.searchconsole = google.searchconsole({
      version: 'v1',
      auth: authClient
    });
  }

  /**
   * サイトの検索パフォーマンスデータを取得
   */
  async getSearchAnalytics(siteUrl, startDate, endDate, dimensions = ['query']) {
    try {
      const response = await this.searchconsole.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
          startDate: startDate,
          endDate: endDate,
          dimensions: dimensions,
          rowLimit: 1000,
          dataState: 'final'
        }
      });

      return response.data.rows || [];
    } catch (error) {
      console.error(`Error fetching data for ${siteUrl}:`, error.message);
      return [];
    }
  }

  /**
   * ページ別パフォーマンスを取得
   */
  async getPagePerformance(siteUrl, startDate, endDate) {
    return this.getSearchAnalytics(siteUrl, startDate, endDate, ['page']);
  }

  /**
   * クエリ別パフォーマンスを取得
   */
  async getQueryPerformance(siteUrl, startDate, endDate) {
    return this.getSearchAnalytics(siteUrl, startDate, endDate, ['query']);
  }

  /**
   * 国別パフォーマンスを取得
   */
  async getCountryPerformance(siteUrl, startDate, endDate) {
    return this.getSearchAnalytics(siteUrl, startDate, endDate, ['country']);
  }

  /**
   * デバイス別パフォーマンスを取得
   */
  async getDevicePerformance(siteUrl, startDate, endDate) {
    return this.getSearchAnalytics(siteUrl, startDate, endDate, ['device']);
  }

  /**
   * 複合ディメンション（クエリ×ページ）
   */
  async getQueryPagePerformance(siteUrl, startDate, endDate) {
    return this.getSearchAnalytics(siteUrl, startDate, endDate, ['query', 'page']);
  }
}

/**
 * データを整形して保存
 */
async function saveData(siteName, dataType, data, date) {
  const dataDir = path.join(__dirname, '../data', siteName);
  await fs.mkdir(dataDir, { recursive: true });

  const filename = `${dataType}_${date}.json`;
  const filepath = path.join(dataDir, filename);

  await fs.writeFile(filepath, JSON.stringify({
    site: siteName,
    type: dataType,
    date: date,
    timestamp: new Date().toISOString(),
    count: data.length,
    data: data
  }, null, 2));

  console.log(`✅ Saved: ${filepath}`);
  return filepath;
}

/**
 * メイン処理
 */
async function main() {
  const credentialsPath = path.join(__dirname, '../../google-credentials.json');
  const sitesConfigPath = path.join(__dirname, '../../sites-config.json');

  // 設定読み込み
  const sitesConfig = JSON.parse(await fs.readFile(sitesConfigPath, 'utf-8'));
  
  // 日付設定（過去7日間）
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1); // 昨日まで
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6); // 7日前から

  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];

  console.log(`\n📊 Search Console データ取得開始`);
  console.log(`期間: ${startDateStr} 〜 ${endDateStr}\n`);

  const client = new SearchConsoleClient(credentialsPath);
  await client.initialize();

  // 各サイトのデータを取得
  for (const site of sitesConfig.sites) {
    if (site.status !== 'active') continue;
    if (site.searchConsoleUrl === '未確認') {
      console.log(`⚠️  ${site.name}: Search Console URL未設定のためスキップ`);
      continue;
    }

    console.log(`\n🔍 ${site.name} (${site.searchConsoleUrl})`);

    try {
      // 1. クエリ別パフォーマンス
      console.log('   取得中: クエリ別パフォーマンス...');
      const queries = await client.getQueryPerformance(
        site.searchConsoleUrl,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'queries', queries, endDateStr);

      // 2. ページ別パフォーマンス
      console.log('   取得中: ページ別パフォーマンス...');
      const pages = await client.getPagePerformance(
        site.searchConsoleUrl,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'pages', pages, endDateStr);

      // 3. 国別パフォーマンス
      console.log('   取得中: 国別パフォーマンス...');
      const countries = await client.getCountryPerformance(
        site.searchConsoleUrl,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'countries', countries, endDateStr);

      // 4. デバイス別パフォーマンス
      console.log('   取得中: デバイス別パフォーマンス...');
      const devices = await client.getDevicePerformance(
        site.searchConsoleUrl,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'devices', devices, endDateStr);

      console.log(`   ✅ ${site.name} 完了！`);
    } catch (error) {
      console.error(`   ❌ ${site.name} エラー:`, error.message);
    }
  }

  console.log('\n✅ 全サイトのデータ取得完了！\n');
}

// 実行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SearchConsoleClient, saveData };
