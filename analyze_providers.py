#!/usr/bin/env python3
import re
import json

PREFECTURES = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県',
    '沖縄県'
]

# providers-verified.ts を読み込み
with open('/Users/jiro.hasegawa/.openclaw/workspace/pet-funeral-navi/data/providers-verified.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 各業者オブジェクトを抽出
provider_objects = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', content, re.DOTALL)

providers = []
for obj in provider_objects:
    # id を抽出
    id_match = re.search(r"id:\s*'([^']+)'", obj)
    # name を抽出
    name_match = re.search(r"name:\s*'([^']+)'", obj)
    # rating を抽出
    rating_match = re.search(r"rating:\s*([0-9.]+)", obj)
    # reviewCount を抽出
    review_match = re.search(r"reviewCount:\s*([0-9]+)", obj)
    # prefectures を抽出
    pref_match = re.search(r"prefectures:\s*\[([^\]]+)\]", obj)
    
    if id_match and name_match and rating_match and review_match and pref_match:
        # prefectures をリストに変換
        pref_list = [p.strip().strip("'\"") for p in pref_match.group(1).split(',')]
        
        providers.append({
            'id': id_match.group(1),
            'name': name_match.group(1),
            'rating': float(rating_match.group(1)),
            'reviewCount': int(review_match.group(1)),
            'prefectures': pref_list
        })

# 都道府県ごとに集計
import math

result = {}
for pref in PREFECTURES:
    # この都道府県の業者を抽出
    pref_providers = [p for p in providers if pref in p['prefectures']]
    
    # スコアでソート (rating * log(reviewCount + 1))
    pref_providers.sort(key=lambda p: p['rating'] * math.log(p['reviewCount'] + 1), reverse=True)
    
    result[pref] = {
        'count': len(pref_providers),
        'top3': [
            {
                'id': p['id'],
                'name': p['name'],
                'rating': p['rating'],
                'reviewCount': p['reviewCount']
            }
            for p in pref_providers[:3]
        ]
    }

print(json.dumps(result, ensure_ascii=False, indent=2))
