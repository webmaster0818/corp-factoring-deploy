#!/usr/bin/env python3
import re
import json
import math

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
    lines = f.readlines()

providers = []
current_provider = None

for i, line in enumerate(lines):
    # 新しいプロバイダーの開始（ id: で始まる行、インデントが少ない）
    if re.match(r"^\s{2,4}id:\s*'", line):
        if current_provider:
            providers.append(current_provider)
        current_provider = {}
        
        # id を抽出
        id_match = re.search(r"id:\s*'([^']+)'", line)
        if id_match:
            current_provider['id'] = id_match.group(1)
    
    # name を抽出（プロバイダーレベルのname）
    elif current_provider and 'name' not in current_provider and re.match(r"^\s{2,4}name:\s*'", line):
        name_match = re.search(r"name:\s*'([^']+)'", line)
        if name_match:
            current_provider['name'] = name_match.group(1)
    
    # rating を抽出
    elif current_provider and re.match(r"^\s{2,4}rating:\s*", line):
        rating_match = re.search(r"rating:\s*([0-9.]+)", line)
        if rating_match:
            current_provider['rating'] = float(rating_match.group(1))
    
    # reviewCount を抽出
    elif current_provider and re.match(r"^\s{2,4}reviewCount:\s*", line):
        review_match = re.search(r"reviewCount:\s*([0-9]+)", line)
        if review_match:
            current_provider['reviewCount'] = int(review_match.group(1))
    
    # prefectures を抽出
    elif current_provider and re.match(r"^\s{2,4}prefectures:\s*\[", line):
        # 同じ行に閉じ括弧がある場合
        if ']' in line:
            pref_match = re.search(r"prefectures:\s*\[([^\]]+)\]", line)
            if pref_match:
                pref_str = pref_match.group(1)
                current_provider['prefectures'] = [p.strip().strip("'\"") for p in pref_str.split(',')]

# 最後のプロバイダーを追加
if current_provider and 'id' in current_provider and 'prefectures' in current_provider:
    providers.append(current_provider)

# 都道府県ごとに集計
result = {}
for pref in PREFECTURES:
    # この都道府県の業者を抽出
    pref_providers = [p for p in providers if 'prefectures' in p and pref in p['prefectures']]
    
    # スコアでソート (rating * log(reviewCount + 1))
    pref_providers.sort(
        key=lambda p: p.get('rating', 0) * math.log(p.get('reviewCount', 0) + 1),
        reverse=True
    )
    
    result[pref] = {
        'count': len(pref_providers),
        'top3': [
            {
                'id': p['id'],
                'name': p.get('name', ''),
                'rating': p.get('rating', 0),
                'reviewCount': p.get('reviewCount', 0)
            }
            for p in pref_providers[:3]
        ]
    }

print(json.dumps(result, ensure_ascii=False, indent=2))
