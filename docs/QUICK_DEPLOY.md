# 빠른 배포 가이드 (카페24 VPS)

## 1단계: 로컬에서 준비

### A. 프로젝트 빌드
```bash
npm run build
```

### B. 전송할 파일 목록
다음 파일/폴더를 WinSCP나 FileZilla로 서버에 전송:
- `.next` (빌드 결과물)
- `public` (정적 파일)
- `package.json`
- `package-lock.json`
- `next.config.js`
- `.env.local` (환경 변수 - 보안 주의!)

**제외할 것:**
- `node_modules` (서버에서 설치)
- `.git`
- `*.log`
- `.next/cache`

## 2단계: 서버에서 초기 설정

### Putty로 서버 접속 후:

```bash
# 1. 프로젝트 디렉토리 생성
mkdir -p /home/vero-website
cd /home/vero-website

# 2. Node.js 설치 확인 (없다면 설치)
node --version
# 18.x 이상이어야 함

# 3. PM2 설치
sudo npm install -g pm2

# 4. 의존성 설치
npm install --production

# 5. 환경 변수 확인
cat .env.local
```

## 3단계: 애플리케이션 실행

```bash
# PM2로 시작
pm2 start npm --name "vero-website" -- start

# 자동 시작 설정
pm2 startup
pm2 save

# 상태 확인
pm2 status
pm2 logs vero-website
```

## 4단계: Nginx 설정 (포트 80으로 접속)

```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/vero-website
```

다음 내용 입력:
```nginx
server {
    listen 80;
    server_name 211.45.163.205;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/vero-website /etc/nginx/sites-enabled/

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

## 5단계: 방화벽 확인

```bash
# 포트 80, 3000 열기
sudo ufw allow 80/tcp
sudo ufw allow 3000/tcp
```

## 완료!

이제 `http://211.45.163.205`로 접속하면 사이트가 보입니다!

## 문제 해결

### 포트 3000이 이미 사용 중
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### PM2 재시작
```bash
pm2 restart vero-website
pm2 logs vero-website
```

### Nginx 재시작
```bash
sudo systemctl restart nginx
sudo nginx -t
```
