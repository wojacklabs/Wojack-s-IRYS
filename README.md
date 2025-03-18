# Nextra 문서 사이트

이 프로젝트는 Nextra를 사용하여 만든 문서 사이트입니다.

## 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하여 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm run start
```

## Vercel 배포

이 프로젝트는 Vercel에 바로 배포할 수 있도록 설정되어 있습니다.

1. GitHub에 코드를 푸시합니다
2. Vercel에서 "Import Project"를 클릭합니다
3. GitHub 저장소를 선택합니다
4. "Deploy" 버튼을 클릭합니다

자동으로 빌드 설정을 감지하고 배포가 시작됩니다.

## 문서 작성

`pages` 디렉토리에 `.mdx` 파일을 생성하면 자동으로 페이지가 생성됩니다.

### 폴더 구조

```
pages/
├── index.mdx          # 홈 페이지
├── getting-started.mdx # /getting-started
├── guides/            # /guides/*
│   ├── _meta.json    # 사이드바 설정
│   ├── markdown.mdx
│   └── deployment.mdx
├── api.mdx           # /api
└── about.mdx         # /about
```

### 메타데이터

`_meta.json` 파일로 사이드바의 순서와 제목을 설정할 수 있습니다:

```json
{
  "index": "홈",
  "getting-started": "시작하기",
  "guides": "가이드",
  "api": "API 레퍼런스",
  "about": "소개"
}
```

## 테마 설정

`theme.config.tsx` 파일에서 사이트의 테마와 설정을 변경할 수 있습니다.

## 라이선스

MIT
