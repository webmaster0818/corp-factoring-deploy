/**
 * Google Analytics 4 データ取得スクリプト
 * セッション数、ユーザー数、コンバージョンなどを取得
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs').promises;
const path = require('path');

class GA4Client {
  constructor(credentialsPath) {
    this.client = new BetaAnalyticsDataClient({
      keyFilename: credentialsPath
    });
  }

  /**
   * 基本的なトラフィックデータを取得
   */
  async getTrafficData(propertyId, startDate, endDate) {
    const [response] = await this.client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      orderBys: [
        {
          dimension: { dimensionName: 'date' },
          desc: false
        }
      ]
    });

    return this.formatResponse(response);
  }

  /**
   * ランディングページ別データを取得
   */
  async getLandingPageData(propertyId, startDate, endDate, limit = 100) {
    const [response] = await this.client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'landingPage' }],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'conversions' }
      ],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true
        }
      ],
      limit
    });

    return this.formatResponse(response);
  }

  /**
   * トラフィックソース別データを取得
   */
  async getTrafficSourceData(propertyId, startDate, endDate) {
    const [response] = await this.client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'sessionDefaultChannelGroup' },
        { name: 'sessionSource' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'conversions' }
      ],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true
        }
      ],
      limit: 50
    });

    return this.formatResponse(response);
  }

  /**
   * デバイス・地域別データを取得
   */
  async getDeviceLocationData(propertyId, startDate, endDate) {
    const [response] = await this.client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'deviceCategory' },
        { name: 'country' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' }
      ],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true
        }
      ],
      limit: 100
    });

    return this.formatResponse(response);
  }

  /**
   * オーガニック検索トラフィックのみを取得
   */
  async getOrganicSearchData(propertyId, startDate, endDate) {
    const [response] = await this.client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' },
        { name: 'landingPage' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionDefaultChannelGroup',
          stringFilter: {
            matchType: 'EXACT',
            value: 'Organic Search'
          }
        }
      },
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true
        }
      ],
      limit: 100
    });

    return this.formatResponse(response);
  }

  /**
   * レスポンスを整形
   */
  formatResponse(response) {
    if (!response.rows || response.rows.length === 0) {
      return [];
    }

    const dimensionHeaders = response.dimensionHeaders.map(h => h.name);
    const metricHeaders = response.metricHeaders.map(h => h.name);

    return response.rows.map(row => {
      const result = {};

      // ディメンション
      dimensionHeaders.forEach((header, index) => {
        result[header] = row.dimensionValues[index].value;
      });

      // メトリクス
      metricHeaders.forEach((header, index) => {
        result[header] = parseFloat(row.metricValues[index].value);
      });

      return result;
    });
  }
}

/**
 * データを保存
 */
async function saveData(siteName, dataType, data, date) {
  const dataDir = path.join(__dirname, '../data', siteName);
  await fs.mkdir(dataDir, { recursive: true });

  const filename = `ga4_${dataType}_${date}.json`;
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

  console.log(`\n📈 GA4 データ取得開始`);
  console.log(`期間: ${startDateStr} 〜 ${endDateStr}\n`);

  const client = new GA4Client(credentialsPath);

  // 各サイトのデータを取得
  for (const site of sitesConfig.sites) {
    if (site.status !== 'active') continue;

    console.log(`\n🔍 ${site.name} (Property: ${site.ga4PropertyId})`);

    try {
      // 1. トラフィックデータ
      console.log('   取得中: トラフィックデータ...');
      const traffic = await client.getTrafficData(
        site.ga4PropertyId,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'traffic', traffic, endDateStr);

      // 2. ランディングページ
      console.log('   取得中: ランディングページデータ...');
      const landingPages = await client.getLandingPageData(
        site.ga4PropertyId,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'landing_pages', landingPages, endDateStr);

      // 3. トラフィックソース
      console.log('   取得中: トラフィックソースデータ...');
      const sources = await client.getTrafficSourceData(
        site.ga4PropertyId,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'sources', sources, endDateStr);

      // 4. デバイス・地域
      console.log('   取得中: デバイス・地域データ...');
      const deviceLocation = await client.getDeviceLocationData(
        site.ga4PropertyId,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'device_location', deviceLocation, endDateStr);

      // 5. オーガニック検索
      console.log('   取得中: オーガニック検索データ...');
      const organic = await client.getOrganicSearchData(
        site.ga4PropertyId,
        startDateStr,
        endDateStr
      );
      await saveData(site.id, 'organic_search', organic, endDateStr);

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

module.exports = { GA4Client, saveData };
