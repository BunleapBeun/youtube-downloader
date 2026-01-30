# Deployment Guide - YouTube Downloader

## ⚠️ Important: Netlify is NOT Compatible

This app **cannot** be deployed to Netlify because it requires:
- yt-dlp (command-line tool)
- FFmpeg (video processing)
- Backend processing for large files

## ✅ Recommended Hosting Options

---

## Option 1: Ngrok (Quick Testing - FREE)

**Best for:** Sharing with friends temporarily

### Steps:
1. **Download Ngrok**: https://ngrok.com/download
2. **Run your app locally**:
   ```bash
   npm run dev
   ```
3. **In another terminal, run**:
   ```bash
   ngrok http 3000
   ```
4. **Share the URL** (e.g., `https://abc123.ngrok-free.app`)

**Pros:** Instant, free, easy
**Cons:** URL changes each time, only works while your computer is on

---

## Option 2: Railway (Best for Small Projects)

**Best for:** Permanent hosting, easy deployment
**Cost:** Free tier available, then ~$5/month

### Steps:
1. **Sign up**: https://railway.app
2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```
3. **Login**:
   ```bash
   railway login
   ```
4. **Deploy**:
   ```bash
   cd youtube-downloader
   railway init
   railway up
   ```
5. **Get your URL**:
   ```bash
   railway domain
   ```

**Pros:** Easy deployment, supports Docker, handles large files
**Cons:** Costs money after free tier

---

## Option 3: Render

**Best for:** Alternative to Railway
**Cost:** Free tier available

### Steps:
1. **Sign up**: https://render.com
2. **Create New Web Service**
3. **Connect GitHub** (push your code to GitHub first)
4. **Select your repo**
5. **Use Docker** (Dockerfile is included)
6. **Deploy**

**Pros:** Free tier, easy setup
**Cons:** Free tier can be slow

---

## Option 4: VPS (Best Performance)

**Best for:** Full control, best performance
**Cost:** $5-6/month

### Recommended Providers:
- DigitalOcean: $6/month
- Vultr: $6/month
- Linode: $5/month
- AWS Lightsail: $5/month

### Setup Steps:

1. **Create a Droplet/Server** (Ubuntu 22.04)

2. **SSH into server**:
   ```bash
   ssh root@your-server-ip
   ```

3. **Install dependencies**:
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   
   # Install yt-dlp and FFmpeg
   apt install -y python3-pip ffmpeg
   pip3 install yt-dlp
   ```

4. **Upload your project**:
   ```bash
   # On your local computer
   scp -r youtube-downloader root@your-server-ip:/var/www/
   ```

5. **Build and run**:
   ```bash
   cd /var/www/youtube-downloader
   npm install
   npm run build
   
   # Install PM2 (keeps app running)
   npm install -g pm2
   pm2 start npm --name "youtube-downloader" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup domain** (optional):
   - Point your domain to server IP
   - Install Nginx:
     ```bash
     apt install -y nginx
     ```
   - Configure reverse proxy (see nginx-config.txt)

7. **Access your app**: `http://your-server-ip:3000`

**Pros:** Full control, best performance, handles any file size
**Cons:** Requires more technical knowledge

---

## Option 5: Vercel (Limited)

**NOT RECOMMENDED** - Vercel has 50MB function size limit, so large videos will fail.

---

## Quick Comparison

| Service | Cost | Ease | File Size Limit | Best For |
|---------|------|------|-----------------|----------|
| **Ngrok** | Free | ⭐⭐⭐⭐⭐ | None | Testing |
| **Railway** | $5/mo | ⭐⭐⭐⭐ | None | Small projects |
| **Render** | Free/Paid | ⭐⭐⭐⭐ | None | Free hosting |
| **VPS** | $5-6/mo | ⭐⭐⭐ | None | Best performance |
| **Vercel** | Free | ⭐⭐⭐⭐⭐ | 50MB ❌ | Not suitable |

---

## 🎯 My Recommendation

1. **Just want to share quickly?** → Use **Ngrok**
2. **Want it permanently online?** → Use **Railway** or **VPS**
3. **Want free hosting?** → Use **Render** (but slower)

---

## Nginx Configuration (For VPS)

Create `/etc/nginx/sites-available/youtube-downloader`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Important for large files
        client_max_body_size 500M;
        proxy_read_timeout 600s;
    }
}
```

Enable:
```bash
ln -s /etc/nginx/sites-available/youtube-downloader /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## Need Help?

- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
- DigitalOcean tutorials: https://www.digitalocean.com/community/tutorials
