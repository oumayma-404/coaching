# Deployment Guide

## 🖥️ VM First-Time Setup

### 1. SSH into your VM
```bash
ssh user@your-vm-ip
```

### 2. Run the setup script
```bash
curl -sSL https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/deploy/setup-vm.sh | sudo bash
```

Or manually copy and run `setup-vm.sh`.

### 3. Configure environment variables
```bash
nano ~/coaching/.env
```

Fill in all the values:
- `DB_PASSWORD`: A strong password for PostgreSQL
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `MAILJET_API_KEY` / `MAILJET_API_SECRET`: From Mailjet dashboard
- `DELIVERY_EMAIL`: Email address for order notifications
- `CLOUDINARY_*`: From Cloudinary dashboard

### 4. Copy docker-compose.prod.yml to VM
```bash
# From your local machine
scp docker-compose.prod.yml user@your-vm-ip:~/coaching/
```

### 5. Start the services
```bash
cd ~/coaching
docker compose -f docker-compose.prod.yml up -d
```

### 6. Check status
```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

---

## 🔐 GitHub Secrets Setup

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Description |
|-------------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (not password) |
| `VM_HOST` | Your VM IP address or hostname |
| `VM_USERNAME` | SSH username (e.g., `root` or `ubuntu`) |
| `VM_SSH_KEY` | Private SSH key for VM access |

### Generate Docker Hub Token
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Give it a name and copy the token

### Generate SSH Key for GitHub Actions
```bash
# On your local machine
ssh-keygen -t ed25519 -f github-actions-key -C "github-actions"

# Copy public key to VM
ssh-copy-id -i github-actions-key.pub user@your-vm-ip

# The private key content goes in VM_SSH_KEY secret
cat github-actions-key
```

---

## 🚀 Manual Deployment

If you need to deploy manually:

```bash
# SSH into VM
ssh user@your-vm-ip

# Pull latest image and restart
cd ~/coaching
docker compose -f docker-compose.prod.yml pull api
docker compose -f docker-compose.prod.yml up -d api

# Check logs
docker compose -f docker-compose.prod.yml logs -f api
```

---

## 🔧 Useful Commands

```bash
# View logs
docker compose -f docker-compose.prod.yml logs -f

# Restart services
docker compose -f docker-compose.prod.yml restart

# Stop services
docker compose -f docker-compose.prod.yml down

# Stop and remove volumes (⚠️ deletes database!)
docker compose -f docker-compose.prod.yml down -v

# Check database
docker exec -it coaching-db psql -U postgres -d sportscoach
```

---

## 🌐 Firewall Setup

Make sure port 5000 is open:

```bash
# Ubuntu/Debian with UFW
sudo ufw allow 5000/tcp

# Or with iptables
sudo iptables -A INPUT -p tcp --dport 5000 -j ACCEPT
```

---

## 🔒 SSL/HTTPS (Optional)

For production, set up a reverse proxy with SSL:

```bash
# Install Nginx
sudo apt install nginx

# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com
```

Nginx config (`/etc/nginx/sites-available/api`):
```nginx
server {
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
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

