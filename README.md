# GitHub Workflow Demo 🚀

A simple Node.js application demonstrating GitHub Actions CI/CD workflows with automated Build, Test, and Deploy stages to EC2.

## 🎯 Demo Purpose

This project demonstrates a complete CI/CD pipeline using GitHub Actions with:

- **Build Stage**: Install dependencies and prepare application
- **Test Stage**: Run automated tests and linting
- **Security Stage**: Perform security audits
- **Deploy Stage**: Automated deployment to EC2 instance

## 🏗️ Application Overview

Simple Express.js REST API with the following endpoints:

- `GET /` - Welcome message with app info
- `GET /health` - Health check endpoint
- `GET /api/demo` - Demo API endpoint
- `POST /api/calculate` - Simple calculator API for testing

## 🚀 Quick Start

### Local Development

1. **Clone and setup:**

   ```bash
   git clone <your-repo-url>
   cd github-workflow-demo
   npm install
   ```

2. **Run the application:**

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

3. **Run tests:**

   ```bash
   npm test
   # or for watch mode
   npm run test:watch
   ```

4. **Access the application:**
   - Main app: http://localhost:3000
   - Health check: http://localhost:3000/health
   - API demo: http://localhost:3000/api/demo

## ☁️ EC2 Setup

### 1. Prepare EC2 Instance

Run this script on your EC2 instance to install required dependencies:

```bash
# Copy the setup script to your EC2 instance
scp scripts/setup-ec2.sh ec2-user@YOUR_EC2_IP:/tmp/
ssh ec2-user@YOUR_EC2_IP
chmod +x /tmp/setup-ec2.sh
/tmp/setup-ec2.sh
```

### 2. Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name       | Description               | Example                                  |
| ----------------- | ------------------------- | ---------------------------------------- |
| `EC2_HOST`        | EC2 public IP or hostname | `3.15.123.456`                           |
| `EC2_USER`        | SSH username              | `ec2-user`                               |
| `EC2_PRIVATE_KEY` | Private key content       | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

## 🔄 CI/CD Pipeline

The workflow (`.github/workflows/ci-cd.yml`) includes:

### Build Stage 🔨

- Checkout code
- Setup Node.js environment
- Install dependencies
- Cache build artifacts

### Test Stage 🧪

- Run linting checks
- Execute Jest unit tests
- Generate test reports

### Security Stage 🔒

- Perform npm security audit
- Check for vulnerabilities

### Deploy Stage 🚀

- **Trigger**: Only on `main` branch pushes
- Create deployment package
- Deploy to EC2 via SSH
- Start application with PM2
- Perform health checks
- Rollback on failure

## 🎭 Demo Scenarios

### 1. Basic CI/CD Demo

1. Make a simple change to `app.js` (e.g., update welcome message)
2. Commit and push to `dev` branch
3. Show workflow running (Build → Test → Security)
4. Create PR to `main`
5. Merge PR to trigger deployment

### 2. Failed Test Demo

1. Temporarily break a test in `app.test.js`
2. Push changes and show failing pipeline
3. Fix the test and show successful pipeline

### 3. Failed Deployment Demo

1. Temporarily break deployment (e.g., wrong port)
2. Show deployment failure and rollback

### 4. API Testing Demo

```bash
# Test the calculator API
curl -X POST http://YOUR_EC2_IP:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 5, "b": 3}'
```

## 📁 Project Structure

```
github-workflow-demo/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── scripts/
│   ├── deploy.sh              # EC2 deployment script
│   └── setup-ec2.sh           # EC2 initial setup
├── app.js                     # Main Express application
├── app.test.js                # Jest unit tests
├── package.json               # Node.js dependencies
└── README.md                  # This file
```

## 🛠️ Customization

### Adding New Features

1. Update `app.js` with new endpoints
2. Add corresponding tests in `app.test.js`
3. Push changes to trigger CI/CD

### Modifying Deployment

- Edit `scripts/deploy.sh` for custom deployment logic
- Update `.github/workflows/ci-cd.yml` for workflow changes

### Environment Variables

Set these in your deployment environment:

- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)

## 🔍 Monitoring

After deployment, monitor your application:

```bash
# Check PM2 status
pm2 list

# View logs
pm2 logs github-workflow-demo

# Monitor resources
pm2 monit
```

## 🐛 Troubleshooting

### Common Issues

1. **Deployment fails with SSH errors**

   - Verify EC2_PRIVATE_KEY secret is correctly formatted
   - Check EC2 security group allows SSH (port 22)

2. **Application not accessible**

   - Verify EC2 security group allows HTTP traffic (port 3000)
   - Check if PM2 process is running: `pm2 list`

3. **Tests failing locally**
   - Ensure all dependencies installed: `npm install`
   - Check Node.js version compatibility

### Health Check

```bash
# Quick health check
curl http://YOUR_EC2_IP:3000/health
```

## 📊 Workflow Status

Check the Actions tab in your GitHub repository to monitor:

- Build completion time
- Test results
- Deployment status
- Error logs and debugging info

## 🎓 Learning Objectives

This demo teaches:

- GitHub Actions workflow syntax
- CI/CD pipeline design
- Automated testing integration
- Secure deployment practices
- Infrastructure as code concepts
- Monitoring and health checks

---

**🎉 Happy Demonstrating!** This setup provides a complete, functional CI/CD pipeline perfect for showcasing modern DevOps practices.
