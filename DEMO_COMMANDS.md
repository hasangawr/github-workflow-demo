# Demo Commands for GitHub Workflow Presentation

## Local Testing Commands

```bash
# Install dependencies
npm install

# Start the application
npm start

# Start in development mode
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm test -- --coverage
```

## API Testing Commands

### Health Check

```bash
curl http://localhost:3000/health
```

### Welcome Endpoint

```bash
curl http://localhost:3000/
```

### Demo API

```bash
curl http://localhost:3000/api/demo
```

### Calculator API Examples

```bash
# Addition
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 10, "b": 5}'

# Subtraction
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "subtract", "a": 10, "b": 3}'

# Multiplication
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "multiply", "a": 7, "b": 6}'

# Division
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "divide", "a": 20, "b": 4}'

# Error case - Division by zero
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "divide", "a": 10, "b": 0}'

# Error case - Invalid operation
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "power", "a": 2, "b": 3}'
```

## EC2 Production Testing

Replace `YOUR_EC2_IP` with your actual EC2 public IP:

```bash
# Health check on EC2
curl http://YOUR_EC2_IP:3000/health

# Main endpoint on EC2
curl http://YOUR_EC2_IP:3000/

# API demo on EC2
curl http://YOUR_EC2_IP:3000/api/demo

# Calculator on EC2
curl -X POST http://YOUR_EC2_IP:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 15, "b": 25}'
```

## EC2 Management Commands

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@YOUR_EC2_IP

# Check PM2 status
pm2 list

# View application logs
pm2 logs github-workflow-demo

# Restart application
pm2 restart github-workflow-demo

# Stop application
pm2 stop github-workflow-demo

# Monitor resources
pm2 monit

# Check system resources
htop
```

## Git Commands for Demo

```bash
# Create a feature branch
git checkout -b feature/demo-change

# Make changes and commit
git add .
git commit -m "Demo: Update welcome message"

# Push to trigger CI
git push origin feature/demo-change

# Create pull request (via GitHub UI)

# Merge to main to trigger deployment
git checkout main
git merge feature/demo-change
git push origin main
```

## Demo Failure Scenarios

### 1. Failing Test Demo

```javascript
// Temporarily change in app.test.js to make test fail
expect(response.body.result).toBe(999); // Wrong expected value
```

### 2. Breaking Application

```javascript
// Temporarily break the health endpoint in app.js
app.get("/health", (req, res) => {
  throw new Error("Intentional error for demo");
});
```

### 3. Port Conflict Demo

```bash
# Start another process on port 3000 to simulate conflict
node -e "require('http').createServer().listen(3000)"
```

## Monitoring Commands

```bash
# Check if application is responding
curl -f http://YOUR_EC2_IP:3000/health && echo "✅ Healthy" || echo "❌ Unhealthy"

# Monitor logs in real-time
pm2 logs github-workflow-demo --lines 50

# Check system resources
free -h
df -h
ps aux | grep node
```

## Cleanup Commands

```bash
# Stop and remove PM2 process
pm2 stop github-workflow-demo
pm2 delete github-workflow-demo

# Remove application directory
sudo rm -rf /home/ec2-user/github-workflow-demo

# Clear PM2 logs
pm2 flush
```
