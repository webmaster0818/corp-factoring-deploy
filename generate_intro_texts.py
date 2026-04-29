#!/usr/bin/env python3
import json

# 分析結果を読み込み
with open('/Users/jiro.hasegawa/.openclaw/workspace/prefecture_analysis.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# TypeScript 形式で出力
print("export const prefectureIntros: PrefectureIntro[] = [")

for pref, info in data.items():
    count = info['count']
    top3 = info['top3']
    
    # 導入テキストを生成
    if count >= 3:
        # 3社以上ある場合
        provider_ids = [p['id'] for p in top3[:3]]
        provider_names = [
            f"{{{p['id']}|{p['name']}}}"
            for p in top3[:3]
        ]
        
        text = (
            f"{pref}には{count}社以上のペット火葬業者が対応しています。"
            f"ペット火葬業者を選ぶ際は、実績数、口コミ評価、価格の3つのポイントを重視することが重要です。"
            f"これらの観点でおすすめなのは、{provider_names[0]}、{provider_names[1]}、{provider_names[2]}の3社です。"
            f"{pref}では個別火葬から合同火葬、訪問火葬まで幅広いプランが用意されており、ご予算やご希望に応じて最適な業者を選ぶことができます。"
        )
        
        print(f"  {{")
        print(f"    prefecture: '{pref}',")
        print(f"    text: '{text}',")
        print(f"    recommendedProviders: {provider_ids}")
        print(f"  }},")
        
    elif count == 2:
        # 2社の場合
        provider_ids = [p['id'] for p in top3[:2]]
        provider_names = [
            f"{{{p['id']}|{p['name']}}}"
            for p in top3[:2]
        ]
        
        text = (
            f"{pref}には{count}社のペット火葬業者が対応しています。"
            f"ペット火葬業者を選ぶ際は、実績数、口コミ評価、価格の3つのポイントを重視することが重要です。"
            f"{pref}で特におすすめなのは、{provider_names[0]}と{provider_names[1]}の2社です。"
            f"個別火葬や合同火葬など、ご予算やご希望に応じたプランを選ぶことができます。"
        )
        
        print(f"  {{")
        print(f"    prefecture: '{pref}',")
        print(f"    text: '{text}',")
        print(f"    recommendedProviders: {provider_ids}")
        print(f"  }},")
        
    elif count == 1:
        # 1社のみの場合
        provider = top3[0]
        provider_id = provider['id']
        provider_name = f"{{{provider['id']}|{provider['name']}}}"
        
        text = (
            f"{pref}には現在1社のペット火葬業者が登録されています。"
            f"ペット火葬業者を選ぶ際は、実績数、口コミ評価、価格の3つのポイントを重視することが重要です。"
            f"{pref}でおすすめなのは{provider_name}です。"
            f"個別火葬や合同火葬など、ご予算やご希望に応じたプランをご利用いただけます。"
        )
        
        print(f"  {{")
        print(f"    prefecture: '{pref}',")
        print(f"    text: '{text}',")
        print(f"    recommendedProviders: ['{provider_id}']")
        print(f"  }},")
        
    else:
        # 業者がゼロの場合
        text = (
            f"{pref}のペット火葬業者を探す際は、実績数、口コミ評価、価格の3つのポイントを重視することが重要です。"
            f"個別火葬、合同火葬、訪問火葬など、ご予算やご希望に応じたプランを提供している業者を選びましょう。"
            f"24時間対応や、丁寧な供養サービスを提供している業者もあります。複数の業者を比較検討することをおすすめします。"
        )
        
        print(f"  {{")
        print(f"    prefecture: '{pref}',")
        print(f"    text: '{text}',")
        print(f"    recommendedProviders: []")
        print(f"  }},")

print("]")
