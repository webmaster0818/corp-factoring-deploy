/**
 * SEOアラートシステム
 * 順位変動、トラフィック異常を検知して通知
 */

const fs = require('fs').promises;
const path = require('path');

// アラート設定
const ALERT_THRESHOLDS = {
  // 順位変動
  positionDrop: 5,           // 5位以上下落でアラート
  positionDropCritical: 10,  // 10位以上下落で重大アラート
  
  // トラフィック異常
  sessionDecreasePercent: 20,  // 前週比20%減でアラート
  sessionIncrease: 50,         // 前週比50%増で通知（ポジティブ）
  
  // クリック数
  clickDecreasePercent: 30,    // 前週比30%減でアラート
  
  // CTR
  ctrDecreasePercent: 25,      // 前週比25%減でアラート
};

class AlertSystem {
  constructor(dataDir, sitesConfig) {
    this.dataDir = dataDir;
    this.sitesConfig = sitesConfig;
    this.alerts = [];
  }

  /**
   * 日付文字列から前週の日付を計算
   */
  getPreviousWeekDate(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  }

  /**
   * データファイルを読み込み
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
   * 順位変動アラート
   */
  async checkRankingChanges(siteId, siteName, currentDate) {
    const previousDate = this.getPreviousWeekDate(currentDate);
    
    const currentData = await this.loadData(siteId, 'queries', currentDate);
    const previousData = await this.loadData(siteId, 'queries', previousDate);
    
    if (!currentData || !previousData) return;
    
    const currentQueries = currentData.data || [];
    const previousQueries = previousData.data || [];
    
    // 前週データをマップ化
    const previousMap = new Map();
    previousQueries.forEach(q => {
      if (q.keys && q.keys[0]) {
        previousMap.set(q.keys[0], q);
      }
    });
    
    // クエリごとに順位変動をチェック
    for (const current of currentQueries) {
      if (!current.keys || !current.keys[0]) continue;
      
      const query = current.keys[0];
      const previous = previousMap.get(query);
      
      if (!previous) continue;
      
      const positionChange = current.position - previous.position;
      
      // 順位下落アラート
      if (positionChange >= ALERT_THRESHOLDS.positionDropCritical) {
        this.alerts.push({
          type: 'ranking',
          severity: 'critical',
          site: siteName,
          siteId,
          query,
          currentPosition: current.position.toFixed(1),
          previousPosition: previous.position.toFixed(1),
          change: positionChange.toFixed(1),
          clicks: current.clicks || 0,
          impressions: current.impressions || 0
        });
      } else if (positionChange >= ALERT_THRESHOLDS.positionDrop) {
        this.alerts.push({
          type: 'ranking',
          severity: 'warning',
          site: siteName,
          siteId,
          query,
          currentPosition: current.position.toFixed(1),
          previousPosition: previous.position.toFixed(1),
          change: positionChange.toFixed(1),
          clicks: current.clicks || 0,
          impressions: current.impressions || 0
        });
      }
      
      // 順位上昇（ポジティブアラート）
      if (positionChange <= -5 && (current.clicks > 0 || previous.clicks > 0)) {
        this.alerts.push({
          type: 'ranking',
          severity: 'positive',
          site: siteName,
          siteId,
          query,
          currentPosition: current.position.toFixed(1),
          previousPosition: previous.position.toFixed(1),
          change: positionChange.toFixed(1),
          clicks: current.clicks || 0,
          impressions: current.impressions || 0
        });
      }
    }
  }

  /**
   * トラフィック異常検知
   */
  async checkTrafficAnomalies(siteId, siteName, currentDate) {
    const previousDate = this.getPreviousWeekDate(currentDate);
    
    const currentData = await this.loadData(siteId, 'ga4_traffic', currentDate);
    const previousData = await this.loadData(siteId, 'ga4_traffic', previousDate);
    
    if (!currentData || !previousData) return;
    
    const currentTraffic = currentData.data || [];
    const previousTraffic = previousData.data || [];
    
    // 週合計を計算
    const currentTotal = currentTraffic.reduce((sum, d) => sum + (d.sessions || 0), 0);
    const previousTotal = previousTraffic.reduce((sum, d) => sum + (d.sessions || 0), 0);
    
    if (previousTotal === 0) return;
    
    const changePercent = ((currentTotal - previousTotal) / previousTotal) * 100;
    
    // トラフィック減少アラート
    if (changePercent <= -ALERT_THRESHOLDS.sessionDecreasePercent) {
      this.alerts.push({
        type: 'traffic',
        severity: 'critical',
        site: siteName,
        siteId,
        metric: 'セッション数',
        currentValue: currentTotal,
        previousValue: previousTotal,
        changePercent: changePercent.toFixed(1),
        changeAbsolute: currentTotal - previousTotal
      });
    }
    
    // トラフィック急増（ポジティブ）
    if (changePercent >= ALERT_THRESHOLDS.sessionIncrease) {
      this.alerts.push({
        type: 'traffic',
        severity: 'positive',
        site: siteName,
        siteId,
        metric: 'セッション数',
        currentValue: currentTotal,
        previousValue: previousTotal,
        changePercent: changePercent.toFixed(1),
        changeAbsolute: currentTotal - previousTotal
      });
    }
    
    // ユーザー数もチェック
    const currentUsers = currentTraffic.reduce((sum, d) => sum + (d.activeUsers || 0), 0);
    const previousUsers = previousTraffic.reduce((sum, d) => sum + (d.activeUsers || 0), 0);
    
    if (previousUsers > 0) {
      const usersChangePercent = ((currentUsers - previousUsers) / previousUsers) * 100;
      
      if (usersChangePercent <= -ALERT_THRESHOLDS.sessionDecreasePercent) {
        this.alerts.push({
          type: 'traffic',
          severity: 'warning',
          site: siteName,
          siteId,
          metric: 'ユーザー数',
          currentValue: currentUsers,
          previousValue: previousUsers,
          changePercent: usersChangePercent.toFixed(1),
          changeAbsolute: currentUsers - previousUsers
        });
      }
    }
  }

  /**
   * Search Consoleパフォーマンス低下
   */
  async checkSearchConsolePerformance(siteId, siteName, currentDate) {
    const previousDate = this.getPreviousWeekDate(currentDate);
    
    const currentData = await this.loadData(siteId, 'queries', currentDate);
    const previousData = await this.loadData(siteId, 'queries', previousDate);
    
    if (!currentData || !previousData) return;
    
    const currentQueries = currentData.data || [];
    const previousQueries = previousData.data || [];
    
    // 総クリック数
    const currentClicks = currentQueries.reduce((sum, q) => sum + (q.clicks || 0), 0);
    const previousClicks = previousQueries.reduce((sum, q) => sum + (q.clicks || 0), 0);
    
    if (previousClicks > 0) {
      const clicksChangePercent = ((currentClicks - previousClicks) / previousClicks) * 100;
      
      if (clicksChangePercent <= -ALERT_THRESHOLDS.clickDecreasePercent) {
        this.alerts.push({
          type: 'performance',
          severity: 'critical',
          site: siteName,
          siteId,
          metric: 'Search Console クリック数',
          currentValue: currentClicks,
          previousValue: previousClicks,
          changePercent: clicksChangePercent.toFixed(1),
          changeAbsolute: currentClicks - previousClicks
        });
      }
    }
    
    // 平均CTR
    const currentCTR = currentQueries.reduce((sum, q) => sum + (q.ctr || 0), 0) / currentQueries.length;
    const previousCTR = previousQueries.reduce((sum, q) => sum + (q.ctr || 0), 0) / previousQueries.length;
    
    if (previousCTR > 0) {
      const ctrChangePercent = ((currentCTR - previousCTR) / previousCTR) * 100;
      
      if (ctrChangePercent <= -ALERT_THRESHOLDS.ctrDecreasePercent) {
        this.alerts.push({
          type: 'performance',
          severity: 'warning',
          site: siteName,
          siteId,
          metric: 'Search Console 平均CTR',
          currentValue: (currentCTR * 100).toFixed(2) + '%',
          previousValue: (previousCTR * 100).toFixed(2) + '%',
          changePercent: ctrChangePercent.toFixed(1)
        });
      }
    }
  }

  /**
   * 全サイトのアラートチェック
   */
  async checkAllSites(currentDate) {
    this.alerts = []; // リセット
    
    for (const site of this.sitesConfig.sites) {
      if (site.status !== 'active') continue;
      
      console.log(`🔍 ${site.name} のアラートチェック中...`);
      
      await this.checkRankingChanges(site.id, site.name, currentDate);
      await this.checkTrafficAnomalies(site.id, site.name, currentDate);
      await this.checkSearchConsolePerformance(site.id, site.name, currentDate);
    }
    
    return this.alerts;
  }

  /**
   * アラートをフォーマット（Discord用）
   */
  formatAlertsForDiscord() {
    if (this.alerts.length === 0) {
      return '✅ **異常なし** - 全サイトのパフォーマンスは正常範囲内です。';
    }
    
    // 重大度別に分類
    const critical = this.alerts.filter(a => a.severity === 'critical');
    const warnings = this.alerts.filter(a => a.severity === 'warning');
    const positive = this.alerts.filter(a => a.severity === 'positive');
    
    let message = `# 🚨 SEOアラート通知\n\n`;
    message += `**検出日時:** ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}\n`;
    message += `**総アラート数:** ${this.alerts.length}\n\n`;
    
    if (critical.length > 0) {
      message += `## ⚠️ 重大アラート (${critical.length}件)\n\n`;
      critical.forEach((alert, i) => {
        message += this.formatSingleAlert(alert, i + 1);
      });
    }
    
    if (warnings.length > 0) {
      message += `## ⚡ 警告 (${warnings.length}件)\n\n`;
      warnings.forEach((alert, i) => {
        message += this.formatSingleAlert(alert, i + 1);
      });
    }
    
    if (positive.length > 0) {
      message += `## 🎉 改善検知 (${positive.length}件)\n\n`;
      positive.forEach((alert, i) => {
        message += this.formatSingleAlert(alert, i + 1);
      });
    }
    
    return message;
  }

  /**
   * 個別アラートをフォーマット
   */
  formatSingleAlert(alert, index) {
    let msg = `**${index}. ${alert.site}**\n`;
    
    if (alert.type === 'ranking') {
      msg += `• クエリ: "${alert.query}"\n`;
      msg += `• 順位変動: ${alert.previousPosition} → ${alert.currentPosition} (${alert.change > 0 ? '+' : ''}${alert.change})\n`;
      msg += `• クリック: ${alert.clicks} / 表示: ${alert.impressions}\n`;
    } else if (alert.type === 'traffic') {
      msg += `• メトリクス: ${alert.metric}\n`;
      msg += `• 前週: ${alert.previousValue.toLocaleString()} → 今週: ${alert.currentValue.toLocaleString()}\n`;
      msg += `• 変動: ${alert.changePercent > 0 ? '+' : ''}${alert.changePercent}% (${alert.changeAbsolute > 0 ? '+' : ''}${alert.changeAbsolute.toLocaleString()})\n`;
    } else if (alert.type === 'performance') {
      msg += `• メトリクス: ${alert.metric}\n`;
      msg += `• 前週: ${alert.previousValue} → 今週: ${alert.currentValue}\n`;
      msg += `• 変動: ${alert.changePercent}%\n`;
    }
    
    msg += '\n';
    return msg;
  }

  /**
   * アラートを保存
   */
  async saveAlerts(date) {
    const alertsDir = path.join(__dirname, '../alerts');
    await fs.mkdir(alertsDir, { recursive: true });
    
    const filepath = path.join(alertsDir, `alerts_${date}.json`);
    await fs.writeFile(filepath, JSON.stringify({
      date,
      timestamp: new Date().toISOString(),
      totalAlerts: this.alerts.length,
      critical: this.alerts.filter(a => a.severity === 'critical').length,
      warnings: this.alerts.filter(a => a.severity === 'warning').length,
      positive: this.alerts.filter(a => a.severity === 'positive').length,
      alerts: this.alerts
    }, null, 2));
    
    console.log(`✅ Alerts saved: ${filepath}`);
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
  
  console.log('\n🚨 SEOアラートチェック開始\n');
  console.log(`対象日: ${currentDate}`);
  console.log(`比較対象: ${new Date(new Date(currentDate).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}\n`);
  
  const alertSystem = new AlertSystem(dataDir, sitesConfig);
  const alerts = await alertSystem.checkAllSites(currentDate);
  
  console.log(`\n検出アラート数: ${alerts.length}`);
  console.log(`  重大: ${alerts.filter(a => a.severity === 'critical').length}`);
  console.log(`  警告: ${alerts.filter(a => a.severity === 'warning').length}`);
  console.log(`  改善: ${alerts.filter(a => a.severity === 'positive').length}\n`);
  
  // アラートを保存
  await alertSystem.saveAlerts(currentDate);
  
  // Discord用フォーマット
  const discordMessage = alertSystem.formatAlertsForDiscord();
  console.log('\n--- Discord通知メッセージ ---\n');
  console.log(discordMessage);
  
  return {
    alerts,
    discordMessage
  };
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { AlertSystem, ALERT_THRESHOLDS };
