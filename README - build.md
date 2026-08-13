<div align="center">

# 📦 FanBox
## windows
```
npm run dist
```

## windows新的需求
### 需求列表
1. **文件路径栏支持手动输入, 代码文件 public/app.js， public/style.css **
   - 用户可以在双击路径栏变为直接输入路径
   - 按回车后跳转到输入的路径
   - 需要验证路径是否存在

2. **程序退出时检查终端运行状态 代码文件electron/main.js**
   - 退出程序时检查是否有终端在运行
   - 如果有终端运行，弹出确认对话框
   - 提示用户退出会终止正在运行的 agent 任务
