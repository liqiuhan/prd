import os
import datetime

# 指定目录路径
directory = r"D:\chatbi"
# 设置替换的基础URL
base_url = "http://nas.chatbi.live:41026"

# 创建HTML文件
html_content = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatBI原型</title>
    <style>
        /* 重置样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
            font-family: 'Microsoft YaHei', 'Segoe UI', Arial, sans-serif;
            color: #333;
        }
        
        body {
            display: flex;
            flex-direction: row;
            background-color: #fcfcfc;
        }
        
        /* 左侧目录区域 */
        .sidebar {
            width: 280px;
            height: 100%;
            background-color: #f8fafc;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-right: 1px solid rgba(226, 232, 240, 0.8);
            position: relative;
            flex-shrink: 0;
            z-index: 10;
        }
        
        .sidebar.collapsed {
            width: 60px;
        }
        
        .sidebar-header {
            height: 60px;
            background: linear-gradient(135deg, #4481eb 0%, #04befe 100%);
            color: white;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            padding: 0 16px;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            height: 100%;
            overflow: hidden;
            flex: 1;
        }
        
        .logo-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            fill: white;
            flex-shrink: 0;
            transition: opacity 0.3s, margin 0.3s;
        }
        
        .sidebar-header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .sidebar.collapsed .logo-container {
            justify-content: center;
        }
        
        .sidebar.collapsed .logo-icon {
            display: none;
        }
        
        .sidebar.collapsed .sidebar-header h1 {
            display: none;
        }
        
        .toggle-sidebar {
            width: 24px;
            height: 24px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            position: absolute;
            right: 16px;
        }
        
        .sidebar.collapsed .toggle-sidebar {
            left: 18px;
            right: auto;
            transform: rotate(180deg);
        }
        
        .toggle-sidebar:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        .toggle-icon {
            width: 14px;
            height: 14px;
            fill: white;
            transition: transform 0.3s;
        }
        
        .file-list-container {
            flex: 1;
            overflow-y: auto;
            padding: 12px 0;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e0 #f8fafc;
        }
        
        .file-list-container::-webkit-scrollbar {
            width: 6px;
        }
        
        .file-list-container::-webkit-scrollbar-track {
            background: #f8fafc;
        }
        
        .file-list-container::-webkit-scrollbar-thumb {
            background-color: #cbd5e0;
            border-radius: 6px;
        }
        
        .file-list {
            list-style: none;
        }
        
        .file-list li {
            margin: 2px 8px;
            border-radius: 6px;
            overflow: hidden;
        }
        
        .file-list li.active .file-link {
            background-color: rgba(66, 153, 225, 0.08);
            color: #3182ce;
        }
        
        .file-list li.active {
            position: relative;
        }
        
        .file-list li.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, #4481eb, #04befe);
            border-radius: 0 2px 2px 0;
            opacity: 0.8;
        }
        
        .file-link {
            display: flex;
            padding: 10px 12px;
            text-decoration: none;
            color: #4a5568;
            cursor: pointer;
            transition: all 0.2s ease;
            border-radius: 6px;
            align-items: center;
        }
        
        .file-link:hover {
            background-color: rgba(66, 153, 225, 0.05);
        }
        
        .file-number {
            margin-right: 10px;
            color: #4481eb;
            font-weight: 500;
            min-width: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .file-name {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .sidebar.collapsed .file-link {
            padding: 10px 0;
            justify-content: center;
        }
        
        .sidebar.collapsed .file-name {
            display: none;
        }
        
        /* 右侧内容区域 */
        .content {
            flex: 1;
            height: 100%;
            overflow: hidden;
            background-color: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }
        
        /* 右键菜单 */
        .context-menu {
            position: fixed;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            z-index: 1000;
            display: none;
            overflow: hidden;
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
        
        .menu-item {
            padding: 10px 16px;
            cursor: pointer;
            transition: background 0.2s;
            font-size: 14px;
            display: flex;
            align-items: center;
        }
        
        .menu-item:hover {
            background-color: #f7fafc;
        }
        
        .menu-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            fill: #4a5568;
        }
        
        /* 侧边栏折叠时的展开按钮 */
        .expand-button {
            position: fixed;
            left: 18px;
            bottom: 18px;
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #4481eb 0%, #04befe 100%);
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(68, 129, 235, 0.4);
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
        }
        
        .expand-button:hover {
            transform: scale(1.05);
        }
        
        body.sidebar-collapsed .expand-button {
            display: flex;
            opacity: 1;
        }
        
        .expand-icon {
            width: 18px;
            height: 18px;
            fill: white;
        }
    </style>
</head>
<body>
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <svg class="logo-icon" viewBox="0 0 24 24">
                    <path d="M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M21,19H3V5H21V19M5,7H7V9H9V7H11V9H13V7H15V9H17V7H19V11H5V7M5,13H19V17H5V13Z" />
                </svg>
                <h1>ChatBI原型</h1>
            </div>
            <div class="toggle-sidebar" id="toggle-sidebar">
                <svg class="toggle-icon" viewBox="0 0 24 24">
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            </div>
        </div>
        <div class="file-list-container">
            <ul class="file-list">
"""

# 获取所有HTML文件路径
html_files = []
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.lower().endswith('.html') and file != "目录.html":
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, directory)
            html_files.append(rel_path)

# 为文件分配编号
current_level = 0
primary_index = 0
current_dir = ""
level = 0  # 初始化level变量

# 创建一个列表用于存储链接信息
links_content = []

for index, rel_path in enumerate(sorted(html_files)):
    file_dir = os.path.dirname(rel_path)
    file_name = os.path.basename(rel_path)
    
    # 将路径中的反斜杠替换为正斜杠，用于URL
    url_path = rel_path.replace("\\", "/")
    
    # 创建完整的URL
    full_url = f"{base_url}/{url_path}"
    
    # 显示不带.html后缀的文件名（不包含路径）
    display_name = file_name
    if display_name.lower().endswith('.html'):
        display_name = display_name[:-5]  # 移除.html后缀
    
    # 确定目录级别并分配编号
    if file_dir != current_dir:
        current_dir = file_dir
        dir_parts = file_dir.split('\\') if '\\' in file_dir else file_dir.split('/')
        level = len(dir_parts) if file_dir else 0
        
        if level == 0:
            primary_index += 1
            number = f"{primary_index}"
        elif level == 1:
            primary_index += 1
            number = f"{primary_index}.1"
        else:
            number = f"{primary_index}.{level}"
    else:
        # 使用之前确定的level值
        if level == 0:
            primary_index += 1
            number = f"{primary_index}"
        else:
            parts = number.split('.')
            if len(parts) > 1:
                last_part = int(parts[-1]) + 1
                number = '.'.join(parts[:-1] + [str(last_part)])
            else:
                number = f"{parts[0]}.1"
    
    # 添加到HTML内容，使用完整URL和仅显示文件名
    html_content += f"""                <li data-path="{full_url}">
                    <div class="file-link" onclick="loadPage('{full_url}')" oncontextmenu="showMenu(event, '{full_url}'); return false;">
                        <span class="file-number">{number}</span>
                        <span class="file-name">{display_name}</span>
                    </div>
                </li>\n"""
                
    # 添加到链接内容中
    links_content.append(f"{number}. {display_name}: {full_url}")

html_content += """            </ul>
        </div>
    </div>
    
    <div class="content" id="content">
        <iframe id="content-iframe" name="content-frame" src="about:blank"></iframe>
    </div>
    
    <div class="expand-button" id="expand-button" title="展开菜单">
        <svg class="expand-icon" viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
    </div>
    
    <div class="context-menu" id="context-menu">
        <div class="menu-item" id="open-here">
            <svg class="menu-icon" viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
            在当前窗口打开
        </div>
        <div class="menu-item" id="open-new">
            <svg class="menu-icon" viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
            在新标签页打开
        </div>
    </div>

    <script>
        // 当前路径
        let currentPath = '';
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
        const toggleButton = document.getElementById('toggle-sidebar');
        const expandButton = document.getElementById('expand-button');
        const body = document.body;
        
        // 折叠/展开侧边栏
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            body.classList.toggle('sidebar-collapsed');
        });
        
        // 展开按钮
        expandButton.addEventListener('click', function() {
            sidebar.classList.remove('collapsed');
            body.classList.remove('sidebar-collapsed');
        });
        
        // 在iframe中加载页面
        function loadPage(path) {
            document.getElementById('content-iframe').src = path;
            
            // 高亮当前选中项
            document.querySelectorAll('.file-list li').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeItem = document.querySelector(`li[data-path="${path}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                // 确保选中项可见
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        // 显示右键菜单
        function showMenu(event, path) {
            event.preventDefault();
            currentPath = path;
            
            const menu = document.getElementById('context-menu');
            menu.style.display = 'block';
            menu.style.left = event.pageX + 'px';
            menu.style.top = event.pageY + 'px';
            
            // 确保菜单在视口内
            const rect = menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                menu.style.left = (window.innerWidth - rect.width) + 'px';
            }
            if (rect.bottom > window.innerHeight) {
                menu.style.top = (window.innerHeight - rect.height) + 'px';
            }
        }
        
        // 绑定右键菜单事件
        document.getElementById('open-here').addEventListener('click', function() {
            loadPage(currentPath);
            hideMenu();
        });
        
        document.getElementById('open-new').addEventListener('click', function() {
            window.open(currentPath, '_blank');
            hideMenu();
        });
        
        // 隐藏右键菜单
        function hideMenu() {
            document.getElementById('context-menu').style.display = 'none';
        }
        
        // 点击页面任意处隐藏菜单
        document.addEventListener('click', hideMenu);
        
        // 键盘快捷键: Esc关闭右键菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideMenu();
            }
        });
        
        // 页面加载时打开第一个文件
        window.onload = function() {
            const firstItem = document.querySelector('.file-list li');
            if (firstItem) {
                const path = firstItem.getAttribute('data-path');
                loadPage(path);
            }
        };
    </script>
</body>
</html>
"""

try:
    # 创建输出文件，确保目录存在
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    # 生成HTML目录文件
    output_path = os.path.join(directory, "目录.html")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    # 生成链接TXT文件
    links_output_path = os.path.join(directory, "链接目录.txt")
    with open(links_output_path, "w", encoding="utf-8") as f:
        # 添加标题和时间
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"ChatBI原型链接目录 (生成时间: {current_time})\n")
        f.write("="*50 + "\n\n")
        
        # 写入所有链接
        for link in links_content:
            f.write(f"{link}\n")
    
    print(f"ChatBI原型目录已生成，保存在 {output_path}")
    print(f"链接目录已生成，保存在 {links_output_path}")
    print(f"链接已更新: 所有 D:\\chatbi 路径已替换为 {base_url}")
    print("目录项只显示文件名，不显示完整路径")
    
    # 输出编号逻辑说明
    print("\n编号逻辑说明:")
    print("1. 文件按文件夹结构和名称排序")
    print("2. 顶级目录的文件获得主编号(1, 2, 3...)")
    print("3. 子目录文件编号规则:")
    print("   - 第一级子目录: 主编号.1, 主编号.2, 主编号.3...")
    print("   - 更深层子目录: 主编号.层级数")
    print("4. 同一目录内的文件按顺序递增最后一位数字")
except Exception as e:
    print(f"生成目录时出错: {str(e)}")