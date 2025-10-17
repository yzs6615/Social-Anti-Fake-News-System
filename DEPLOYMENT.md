# 部署说明 / Deployment Guide

## Vercel部署步骤 / Vercel Deployment Steps

### 方法一：通过Vercel CLI / Method 1: Via Vercel CLI

1. **安装Vercel CLI**
```bash
npm install -g vercel
```

2. **登录Vercel账户**
```bash
vercel login
```

3. **在项目目录中部署**
```bash
vercel
```

4. **按照提示完成部署**
- 选择项目设置
- 确认部署配置
- 等待部署完成

### 方法二：通过Vercel网站 / Method 2: Via Vercel Website

1. **访问 [vercel.com](https://vercel.com)**
2. **连接GitHub/GitLab账户**
3. **导入项目仓库**
4. **配置部署设置**
5. **一键部署**

### 部署后配置 / Post-Deployment Configuration

1. **自定义域名（可选）**
   - 在Vercel控制台设置自定义域名
   - 配置DNS记录

2. **环境变量（如需要）**
   - 在项目设置中添加环境变量
   - 配置生产环境参数

### 注意事项 / Important Notes

- 项目使用静态文件部署，无需服务器端配置
- 所有数据存储在浏览器本地存储中
- 支持HTTPS自动配置
- 支持全球CDN加速

### 故障排除 / Troubleshooting

**常见问题：**
1. 部署失败：检查vercel.json配置
2. 页面无法访问：确认路由配置正确
3. 样式问题：检查CSS文件路径

**解决方案：**
1. 重新部署项目
2. 检查控制台错误信息
3. 验证文件完整性
