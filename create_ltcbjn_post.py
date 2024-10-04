import os
from datetime import datetime

# _posts 폴더 경로
posts_folder = '_posts'

# 사용자로부터 Leetcode 또는 Baekjoon 선택
problem_type = input("문제 유형을 선택하세요 (1: Leetcode, 2: Baekjoon): ")

# 문제 번호 입력
problem_number = input("문제 번호를 입력하세요: ")

# Leetcode와 Baekjoon 구분
if problem_type == '1':
    problem_prefix = "l"
    problem_title = f"[리트코드] #{problem_number}. "
    tags = "[리트코드, leetcode]"
    permalink = f"/ltcbjn/l{problem_number}"
else:
    problem_prefix = "b"
    problem_title = f"[백준] #{problem_number}. "
    tags = "[백준, baekjoon]"
    permalink = f"/ltcbjn/b{problem_number}"

# 현재 날짜 가져오기
today = datetime.today().strftime('%Y-%m-%d')

# 새 파일 경로 설정
new_post_filename = f"{today}-ltcbjn-{problem_prefix}{problem_number}.md"
new_post_path = os.path.join(posts_folder, new_post_filename)

# 파일 내용 템플릿
new_post_content = f"""---
title: "{problem_title}문제 제목"
excerpt: ""

categories:
  - ltcbjn
tags:
  - {tags}

permalink: {permalink}

toc: true
toc_sticky: true

date: {today}
last_modified_at: {today}
---

## 문제
## 풀이
"""

# 파일 생성
with open(new_post_path, 'w', encoding='utf-8') as f:
    f.write(new_post_content)

print(f"{new_post_filename} 파일이 생성되었습니다.")
