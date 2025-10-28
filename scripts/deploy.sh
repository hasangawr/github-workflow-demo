#!/bin/bash

# EC2 Deployment Script for GitHub Workflow Demo
# This script deploys the Node.js application to an EC2 instance

set -e

APP_NAME="github-workflow-demo"
APP_DIR="/home/ec2-user/$APP_NAME"
BACKUP_DIR="/home/ec2-user/backups"
PORT=3000

echo "🚀 Starting deployment of $APP_NAME..."

# Create necessary directories
echo "📁 Creating directories..."
sudo mkdir -p $APP_DIR
sudo mkdir -p $BACKUP_DIR
sudo chown ec2-user:ec2-user $APP_DIR
sudo chown ec2-user:ec2-user $BACKUP_DIR

# Stop existing application
echo "🛑 Stopping existing application..."
pm2 stop $APP_NAME 2>/dev/null || echo "No existing application to stop"
pm2 delete $APP_NAME 2>/dev/null || echo "No existing application to delete"

# Backup current version if it exists
if [ -d "$APP_DIR" ] && [ "$(ls -A $APP_DIR)" ]; then
    echo "📦 Backing up current version..."
    BACKUP_NAME="$APP_NAME-backup-$(date +%Y%m%d_%H%M%S)"
    cp -r $APP_DIR $BACKUP_DIR/$BACKUP_NAME
    echo "✅ Backup created: $BACKUP_DIR/$BACKUP_NAME"
fi

# Extract new version
echo "📤 Extracting new application version..."
cd $APP_DIR
rm -rf ./* 2>/dev/null || true
tar -xzf /tmp/app.tar.gz

# Install dependencies (already done during build, but just in case)
echo "📦 Installing dependencies..."
npm ci --production --silent

# Start application with PM2
echo "🔄 Starting application..."
NODE_ENV=production PORT=$PORT pm2 start app.js --name $APP_NAME --update-env

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot (if not already done)
pm2 startup systemd -u ec2-user --hp /home/ec2-user >/dev/null 2>&1 || true

# Health check
echo "🏥 Performing health check..."
sleep 5

for i in {1..10}; do
    if curl -s http://localhost:$PORT/health >/dev/null; then
        echo "✅ Application is healthy!"
        break
    else
        echo "⏳ Waiting for application to start... ($i/10)"
        sleep 2
    fi
    
    if [ $i -eq 10 ]; then
        echo "❌ Health check failed!"
        pm2 logs $APP_NAME --lines 20
        exit 1
    fi
done

# Display application info
echo ""
echo "🎉 Deployment completed successfully!"
echo "📊 Application Status:"
pm2 list | grep $APP_NAME
echo ""
echo "🌐 Application is running on:"
echo "   - Local: http://localhost:$PORT"
echo "   - Health Check: http://localhost:$PORT/health"
echo "   - API Demo: http://localhost:$PORT/api/demo"
echo ""

# Clean up
echo "🧹 Cleaning up..."
rm -f /tmp/app.tar.gz

echo "✨ Deployment process completed!"