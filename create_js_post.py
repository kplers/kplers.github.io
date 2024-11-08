import os
from datetime import datetime

# _posts 폴더 경로
posts_folder = '_posts'

# 파일 목록에서 python[#] 형식의 파일 찾기
existing_python_posts = [
    f for f in os.listdir(posts_folder) if 'js' in f and f.endswith('.md')
]

# 파일 번호 추출
numbers = [int(f.split('js')[1].split('.')[0]) for f in existing_python_posts]

# 가장 큰 번호보다 1 큰 번호 설정
next_number = max(numbers) + 1 if numbers else 1

# 현재 날짜 가져오기
today = datetime.today().strftime('%Y-%m-%d')

# 새 파일 경로 설정
new_post_filename = f"{today}-js{next_number}.md"
new_post_path = os.path.join(posts_folder, new_post_filename)

# 파일 내용 템플릿
new_post_content = f"""---
title: "JS-{next_number}: "
excerpt: ""

categories:
  - js
tags:
  - [javascript, 자바스크립트]

permalink: /js/{next_number}

toc: true
toc_sticky: true

date: {today}
last_modified_at: {today}
---

___

**차례**

___


## 결론



[이전 에피소드로](/js/{next_number - 1}) [다음 에피소드로](/js/{next_number + 1})
"""

# 파일 생성
with open(new_post_path, 'w', encoding='utf-8') as f:
    f.write(new_post_content)

print(f"{new_post_filename} 파일이 생성되었습니다.")
