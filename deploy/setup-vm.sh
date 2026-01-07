#!/bin/bash

# ============================================
# VM Setup Script for Coaching API
# Run this on your VM as root or with sudo
# ============================================

set -e

echo "🚀 Setting up VM for Coaching API..."

# Update system
echo "📦 Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    # Add current user to docker group
    usermod -aG docker $SUDO_USER || usermod -aG docker $USER
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt-get install -y docker-compose-plugin
fi

# Create app directory
echo "📁 Creating app directory..."
mkdir -p ~/coaching
cd ~/coaching

# Create .env file template
echo "📝 Creating .env template..."
cat > .env << 'EOF'
# Database
DB_USERNAME=postgres
DB_PASSWORD=CHANGE_ME_STRONG_PASSWORD
DB_DATABASE=sportscoach

# Docker Hub
DOCKERHUB_USERNAME=YOUR_DOCKERHUB_USERNAME

# Mailjet
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_API_SECRET=your_mailjet_api_secret

# Email Settings
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Sports Coach
EMAIL_LOGO_URL=

# Delivery
DELIVERY_EMAIL=delivery@yourdomain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EOF

echo ""
echo "✅ VM setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit ~/coaching/.env with your actual values"
echo "2. Copy docker-compose.prod.yml to ~/coaching/"
echo "3. Run: cd ~/coaching && docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "⚠️  Don't forget to:"
echo "   - Open port 5000 in your VM firewall"
echo "   - Set up GitHub secrets for CI/CD"

