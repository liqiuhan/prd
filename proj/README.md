# Monica.im 网站复刻

这是一个Monica.im网站的前端复刻项目，用于学习和展示目的。Monica是一个强大的AI助手平台，提供多种AI功能，包括聊天、图像生成、PDF工具等。

## 功能特点

- 响应式设计，适配不同的设备尺寸
- 主页展示Monica的主要功能和特点
- 交互式聊天页面，模拟AI对话体验
- 新增三栏式布局聊天界面，更贴近原版Monica.im设计
- 新增侧边栏可折叠的聊天界面，工具栏和历史会话可展开收缩
- 下拉菜单导航系统
- 简洁现代的UI设计

## 文件结构

```
monica-clone/
├── index.html                # 主页
├── chat.html                 # 传统聊天页面
├── index-three-column.html   # 三栏式布局聊天页面
├── index-sidebar.html        # 侧边栏可折叠聊天页面
├── styles/
│   ├── monica.css            # 主要样式
│   ├── chat.css              # 传统聊天页面样式
│   ├── new-chat.css          # 三栏式布局聊天页面样式
│   └── sidebar-chat.css      # 侧边栏可折叠聊天页面样式
├── js/
│   ├── monica.js             # 主页交互脚本
│   ├── chat.js               # 传统聊天页面脚本
│   ├── new-chat.js           # 三栏式布局聊天页面脚本
│   └── sidebar-chat.js       # 侧边栏可折叠聊天页面脚本
└── README.md                 # 项目说明
```

## 安装与运行

这是一个纯前端项目，不需要任何构建步骤或服务器。您可以通过以下方式本地运行：

1. 克隆或下载本仓库：
```
git clone https://github.com/yourusername/monica-clone.git
```

2. 直接在浏览器中打开`index.html`文件，或者使用您喜欢的任何静态文件服务器：

使用Python:
```
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

使用Node.js (需要先安装http-server):
```
npx http-server
```

3. 访问浏览器中的本地地址（通常是 http://localhost:8000 或类似地址）

## 页面说明

### 主页 (index.html)
展示Monica的主要功能和价值主张，包括AI聊天、图像生成、PDF工具和写作助手等。

### 传统聊天页面 (chat.html)
简洁的双栏布局聊天界面，左侧为聊天历史，右侧为主聊天区域。

### 三栏式布局聊天页面 (index-three-column.html)
更贴近原版Monica.im的三栏式布局：
- 左侧边栏：模型选择和聊天历史
- 中间内容区：欢迎页面和聊天界面
- 右侧边栏：工具面板（翻译、写作、图像生成等）

特色功能：
- 聊天上方的推荐问题，点击即可快速提问
- 切换不同的AI模型
- 工具面板的切换与使用
- 响应式设计，在移动设备上自动调整布局

### 侧边栏可折叠聊天页面 (index-sidebar.html)
全新的三栏式布局设计：
- 左侧工具栏：只展示图标，可展开显示文字（问数、分析、预警、PPT、历史会话、管理后台）
- 中间历史列表：可收缩的历史会话列表，按日期分组
- 右侧聊天区域：聊天消息显示和输入区域

特色功能：
- 工具栏可折叠，节省屏幕空间
- 历史会话列表可展开收缩
- 聊天上方的推荐问题，提供快速提问
- 消息按时间分组显示
- 响应式设计，适配各种屏幕尺寸

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, CSS变量)
- JavaScript (原生，无框架)
- Font Awesome 图标

## 注意事项

- 这只是一个演示项目，不包含实际的AI功能
- 所有的交互都是通过JavaScript模拟的
- 项目中使用了占位图像，在实际应用中应替换为真实的图像

## 后续改进

- 添加更多功能页面（如图像生成、PDF工具等）
- 实现更完整的移动端菜单交互
- 添加深色模式支持
- 优化图像和资源加载
- 可能添加更多的AI助手样式选项

## 免责声明

本项目仅用于学习和展示目的，与Monica.im官方网站无关。所有设计灵感和界面布局均来自对原网站的学习和理解。如有侵权，请联系删除。 