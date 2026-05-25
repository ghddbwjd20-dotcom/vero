# 카페24 VPS 배포 가이드

## 1. 서버 환경 확인

Putty로 서버에 접속한 후 다음 명령어로 환경을 확인합니다:

```bash
# Node.js 버전 확인 (18.x 이상 필요)
node --version

# npm 버전 확인
npm --version

# PM2 설치 여부 확인 (프로세스 관리자)
pm2 --version

# Git 설치 여부 확인
git --version
```

## 2. 필요한 패키지 설치

```bash
# Node.js가 없다면 설치 (NodeSource 저장소 사용)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 설치 (전역)
sudo npm install -g pm2

# Nginx 설치 (리버스 프록시)
sudo apt-get update
sudo apt-get install -y nginx
```

## 3. 프로젝트 배포 방법

### 방법 A: Git을 통한 배포 (권장)

```bash
# 프로젝트 디렉토리 생성
cd /home
sudo mkdir -p vero-website
sudo chown $USER:$USER vero-website
cd vero-website

# Git 저장소 클론 (GitHub 등에 푸시한 경우)
git clone <your-repository-url> .

# 또는 로컬에서 파일 전송
# WinSCP나 FileZilla를 사용하여 프로젝트 폴더 전체를 업로드
```

### 방법 B: 로컬에서 빌드 후 파일 전송

1. 로컬에서 빌드:
```bash
npm run build
```

2. WinSCP나 FileZilla로 다음 파일/폴더를 서버로 전송:
   - `.next` 폴더
   - `public` 폴더
   - `package.json`
   - `package-lock.json`
   - `node_modules` (또는 서버에서 `npm install --production`)

## 4. 서버에서 프로젝트 설정

```bash
# 프로젝트 디렉토리로 이동
cd /home/vero-website

# 의존성 설치
npm install --production

# 환경 변수 파일 생성
nano .env.local
```

`.env.local` 파일 내용:
```env
# 데이터베이스 설정
DATABASE_URL=postgresql://username:password@localhost:5432/verosite

# NextAuth 설정
NEXTAUTH_URL=http://211.45.163.205:3000
NEXTAUTH_SECRET=iXrg43XF6es6pnTI6litVyUDExcBoXrf

# 카카오 로그인 설정
KAKAO_CLIENT_ID=c040a3fd0c122b597929213d4655468e
KAKAO_CLIENT_SECRET=yNonvJfoZ9DKtRZEjtDnV5LfY6ciyhUr

# SMS 서비스 설정
SMS_SERVICE=none

# 애플리케이션 URL
NEXT_PUBLIC_APP_URL=http://211.45.163.205:3000
```

## 5. PM2로 애플리케이션 실행

```bash
# PM2로 Next.js 앱 시작
pm2 start npm --name "vero-website" -- start

# 또는 package.json에 start 스크립트가 있다면
pm2 start npm --name "vero-website" -- run start

# PM2 상태 확인
pm2 status

# PM2 로그 확인
pm2 logs vero-website

# 서버 재시작 시 자동 시작 설정
pm2 startup
pm2 save
```

## 6. Nginx 리버스 프록시 설정

```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/vero-website
```

설정 파일 내용:
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

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

## 7. 방화벽 설정

```bash
# UFW 방화벽이 활성화되어 있다면
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw reload

# 또는 iptables 사용 시
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
```

## 8. 카페24 VPS 방화벽 설정

카페24 관리자 페이지에서도 방화벽 설정이 필요할 수 있습니다:
- 포트 80 (HTTP)
- 포트 443 (HTTPS)
- 포트 3000 (Next.js 앱)

## 9. 도메인 연결 (선택사항)

도메인이 있다면:
1. DNS A 레코드를 서버 IP(211.45.163.205)로 설정
2. Nginx 설정에서 `server_name`을 도메인으로 변경
3. SSL 인증서 설치 (Let's Encrypt)

## 10. 유용한 PM2 명령어

```bash
# 앱 재시작
pm2 restart vero-website

# 앱 중지
pm2 stop vero-website

# 앱 삭제
pm2 delete vero-website

# 모니터링
pm2 monit

# 로그 확인
pm2 logs vero-website --lines 100
```

## 문제 해결

### 포트가 이미 사용 중인 경우
```bash
# 포트 3000 사용 중인 프로세스 확인
sudo lsof -i :3000

# 프로세스 종료
sudo kill -9 <PID>
```

### 빌드 오류 발생 시
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 메모리 부족 시
```bash
# 스왑 메모리 추가 (2GB)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```
