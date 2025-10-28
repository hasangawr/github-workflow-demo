#!/bin/bash

# Prepares the EC2 instance for the Node.js application

set -e

echo "🔧 Setting up EC2 instance for GitHub Workflow Demo..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js (using NodeSource repository)
echo "🟢 Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install git
echo "📁 Installing Git..."
sudo yum install -y git

# Install PM2 globally
echo "🔄 Installing PM2..."
sudo npm install -g pm2

# Create application user and directories
echo "👤 Setting up application environment..."
sudo mkdir -p /home/ec2-user/github-workflow-demo
sudo mkdir -p /home/ec2-user/backups
sudo chown ec2-user:ec2-user /home/ec2-user/github-workflow-demo
sudo chown ec2-user:ec2-user /home/ec2-user/backups

# Setup PM2 startup script
echo "🚀 Configuring PM2 startup..."
pm2 startup systemd -u ec2-user --hp /home/ec2-user
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Configure firewall for port 3000
echo "🔥 Configuring firewall..."
sudo firewall-cmd --permanent --add-port=3000/tcp 2>/dev/null || echo "Firewall not configured (may not be installed)"
sudo firewall-cmd --reload 2>/dev/null || echo "Firewall reload skipped"

# Install additional useful tools
echo "🛠️ Installing additional tools..."
sudo yum install -y htop curl wget

# Display system information
echo ""
echo "✅ EC2 instance setup completed!"
echo ""
echo "📋 System Information:"
echo "   - Node.js version: $(node --version)"
echo "   - npm version: $(npm --version)"
echo "   - PM2 version: $(pm2 --version)"
echo "   - Operating System: $(cat /etc/system-release)"
echo ""
echo "🔑 Next Steps:"
echo "   1. Configure GitHub secrets with EC2 connection details"
echo "   2. Push code to trigger the CI/CD pipeline"
echo "   3. Access your application at http://YOUR_EC2_PUBLIC_IP:3000"
echo ""
echo "🔧 GitHub Secrets needed:"
echo "   - EC2_HOST: Your EC2 public IP or hostname"
echo "   - EC2_USER: ec2-user"
echo "   - EC2_PRIVATE_KEY: Your EC2 private key content"
echo ""