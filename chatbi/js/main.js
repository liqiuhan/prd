// ChatBI 核心功能
const ChatBI = {
    // 状态变量
    state: {
        currentTheme: document.documentElement.getAttribute('data-theme') || 'light',
        sidebarCollapsed: false,
        activePageId: 'page-analysis-approach'
    },
    
    // 初始化应用
    init: function() {
        // 缓存DOM元素
        this.cacheElements();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化主题
        this.updateThemeOptionState();
        
        // 初始化响应式布局
        this.handleResize();
        
        // 加载默认页面
        this.loadPage(this.state.activePageId);
        
        // 监听iframe消息
        this.setupMessageListener();
        
        console.log('ChatBI 初始化完成');
    },
    
    // 设置iframe消息监听
    setupMessageListener: function() {
        window.addEventListener('message', (event) => {
            // 检查消息来源安全性（这里需要根据您的域名进行调整）
            // if (event.origin !== "您的域名") return;
            
            // 处理来自iframe的消息
            if (event.data && event.data.action === 'showNewRelationPage') {
                console.log('收到iframe消息：显示新建关系页面');
                
                // 查找iframe所在的DOM元素
                const frame = document.getElementById('indicator-choose-frame');
                if (frame) {
                    // 获取iframe的contentWindow并调用其中的函数
                    const iframeWindow = frame.contentWindow;
                    if (iframeWindow) {
                        try {
                            // 直接调用iframe中的函数
                            iframeWindow.openNewRelationPage();
                        } catch (e) {
                            console.error('调用iframe函数失败:', e);
                            
                            // 如果直接调用失败，则发送消息回iframe
                            iframeWindow.postMessage({ action: 'openNewRelationPage' }, '*');
                        }
                    }
                }
            }
        });
    },
    
    // 缓存DOM元素
    cacheElements: function() {
        this.elements = {
            sidebar: document.getElementById('sidebar'),
            toggleBtn: document.getElementById('toggle-sidebar'),
            toggleIcon: document.getElementById('toggle-icon'),
            htmlElement: document.documentElement,
            menuItems: document.querySelectorAll('.menu-item'),
            submenuItems: document.querySelectorAll('.submenu-item'),
            tabItems: document.querySelectorAll('.tab-item'),
            contentPages: document.querySelectorAll('.content-page'),
            themeOptions: document.querySelectorAll('.theme-option'),
            mainContent: document.getElementById('main-content')
        };
    },
    
    // 绑定事件
    bindEvents: function() {
        // 主题选项点击事件
        document.addEventListener('click', (event) => {
            const themeOption = event.target.closest('.theme-option');
            if (themeOption) {
                this.handleThemeChange(themeOption);
            }
        });
        
        // 侧边栏切换事件
        this.elements.toggleBtn.addEventListener('click', this.toggleSidebar.bind(this));
        
        // 菜单项点击事件
        this.elements.menuItems.forEach(item => {
            item.addEventListener('click', this.handleMenuItemClick.bind(this));
        });
        
        // 子菜单项点击事件
        this.elements.submenuItems.forEach(item => {
            item.addEventListener('click', this.handleSubmenuItemClick.bind(this));
        });
        
        // 标签切换事件
        this.elements.tabItems.forEach(tab => {
            tab.addEventListener('click', this.handleTabClick.bind(this));
        });
        
        // 响应式布局
        window.addEventListener('resize', this.handleResize.bind(this));
    },
    
    // 设置当前主题选项选中状态
    updateThemeOptionState: function() {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === this.state.currentTheme) {
                option.classList.add('active');
            }
        });
    },
    
    // 主题选项点击处理
    handleThemeChange: function(themeOption) {
        const theme = themeOption.getAttribute('data-theme');
        
        // 更新当前主题
        if (theme === 'auto') {
            // 获取系统主题偏好
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.elements.htmlElement.setAttribute('data-theme', 'dark');
                this.state.currentTheme = 'dark';
            } else {
                this.elements.htmlElement.setAttribute('data-theme', 'light');
                this.state.currentTheme = 'light';
            }
        } else {
            this.elements.htmlElement.setAttribute('data-theme', theme);
            this.state.currentTheme = theme;
        }
        
        // 更新选中状态
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.remove('active');
        });
        themeOption.classList.add('active');
    },
    
    // 侧边栏切换
    toggleSidebar: function() {
        this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
        
        if (this.state.sidebarCollapsed) {
            this.elements.sidebar.classList.add('collapsed');
            this.elements.toggleIcon.className = 'fas fa-angle-right';
            
            // 关闭所有子菜单
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('show');
            });
        } else {
            this.elements.sidebar.classList.remove('collapsed');
            this.elements.toggleIcon.className = 'fas fa-angle-left';
            
            // 恢复活动菜单项的子菜单
            const activeMenuItem = document.querySelector('.menu-item.active');
            if (activeMenuItem) {
                const submenuId = activeMenuItem.getAttribute('data-submenu');
                if (submenuId) {
                    document.getElementById(submenuId).classList.add('show');
                }
            }
        }
    },
    
    // 菜单项点击处理
    handleMenuItemClick: function(event) {
        const menuItem = event.currentTarget;
        const hasSubmenu = menuItem.getAttribute('data-has-submenu') === 'true';
        const submenuId = menuItem.getAttribute('data-submenu');
        const pageId = menuItem.getAttribute('data-page');
        const isActive = menuItem.classList.contains('active');
        
        // 如果点击的是已经激活的菜单项，并且有子菜单，则切换子菜单的展开/折叠状态
        if (isActive && hasSubmenu && submenuId) {
            const submenu = document.getElementById(submenuId);
            if (submenu.classList.contains('show')) {
                submenu.classList.remove('show');
            } else {
                submenu.classList.add('show');
            }
            return;
        }
        
        // 更新活动状态
        this.elements.menuItems.forEach(i => i.classList.remove('active'));
        menuItem.classList.add('active');
        
        // 如果侧边栏是收起状态，则展开
        if (this.state.sidebarCollapsed) {
            this.state.sidebarCollapsed = false;
            this.elements.sidebar.classList.remove('collapsed');
            this.elements.toggleIcon.className = 'fas fa-angle-left';
        }
        
        // 处理子菜单
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('show');
        });
        
        if (hasSubmenu && submenuId) {
            document.getElementById(submenuId).classList.add('show');
            
            // 如果子菜单中有活动项，保持其活动状态
            const activeSubmenuItem = document.querySelector(`#${submenuId} .submenu-item.active`);
            if (activeSubmenuItem) {
                this.loadPage(activeSubmenuItem.getAttribute('data-page'));
            } else if (pageId) {
                this.loadPage(pageId);
            }
        } else if (pageId) {
            this.loadPage(pageId);
        }
    },
    
    // 子菜单项点击处理
    handleSubmenuItemClick: function(event) {
        const submenuItem = event.currentTarget;
        const hasSubmenu = submenuItem.getAttribute('data-has-submenu') === 'true';
        const submenuId = submenuItem.getAttribute('data-submenu');
        const pageId = submenuItem.getAttribute('data-page');
        const onclick = submenuItem.getAttribute('onclick');
        
        // 如果点击的子菜单项有自己的子菜单，则切换其显示状态
        if (hasSubmenu && submenuId) {
            const submenu = document.getElementById(submenuId);
            const isShown = submenu.classList.contains('show');
            
            if (isShown) {
                submenu.classList.remove('show');
                submenuItem.classList.remove('active');
            } else {
                submenu.classList.add('show');
                submenuItem.classList.add('active');
            }
            
            // 如果有页面ID，加载对应页面
            if (pageId && !isShown) {
                this.loadPage(pageId);
            }
            
            return;
        }
        
        // 如果点击的子菜单项有onclick属性，不处理其他逻辑（让onclick处理）
        if (onclick) {
            return;
        }
        
        // 移除所有子菜单项的激活状态（保留有子菜单的父项的激活状态）
        this.elements.submenuItems.forEach(item => {
            if (item.getAttribute('data-has-submenu') !== 'true') {
                item.classList.remove('active');
            }
        });
        
        // 设置点击项的激活状态
        submenuItem.classList.add('active');
        
        // 加载对应页面
        if (pageId) {
            this.loadPage(pageId);
        }
    },
    
    // 标签切换处理
    handleTabClick: function(event) {
        const tab = event.currentTarget;
        const parentTabList = tab.closest('.tab-list');
        if (parentTabList) {
            parentTabList.querySelectorAll('.tab-item').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
        }
    },
    
    // 加载页面
    loadPage: function(pageId) {
        this.state.activePageId = pageId;
        
        // 隐藏所有页面
        this.elements.contentPages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示指定页面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // 处理iframe高度设置
            if (pageId === 'page-analysis-approach' || 
                pageId === 'page-knowledge-strategy' || 
                pageId === 'page-indicator-approval' ||
                pageId === 'page-business-jargon') {
                
                const iframeId = pageId === 'page-analysis-approach' ? 'analysis-approach-frame' : 
                                 pageId === 'page-knowledge-strategy' ? 'knowledge-strategy-frame' : 
                                 pageId === 'page-indicator-approval' ? 'indicator-approval-frame' :
                                 'business-jargon-frame';
                                 
                const iframe = document.getElementById(iframeId);
                if (iframe) {
                    // 设置iframe高度为窗口高度减去一些边距
                    const setIframeHeight = () => {
                        iframe.style.height = (window.innerHeight - 80) + 'px';
                    };
                    setIframeHeight();
                    // 窗口大小变化时重新设置高度
                    window.addEventListener('resize', setIframeHeight);
                }
            }
            
            // 知识导入页面的iframe高度设置，仅在该页面激活时进行
            if (pageId === 'page-knowledge-import') {
                const importFrame = document.getElementById('knowledge-import-frame');
                if (importFrame) {
                    // 设置iframe高度为窗口高度减去一些边距
                    importFrame.style.height = (window.innerHeight - 80) + 'px';
                    
                    // 检查iframe加载状态
                    if (importFrame.getAttribute('src') !== 'pages/Knowledge_import.html') {
                        importFrame.setAttribute('src', 'pages/Knowledge_import.html');
                    }
                    
                    // 添加iframe加载事件监听
                    importFrame.onload = function() {
                        console.log('知识导入iframe加载完成');
                    };
                } else {
                    console.error('未找到知识导入iframe元素');
                }
            }
            
            // 如果页面内容为空，尝试从外部加载
            if (pageId !== 'page-analysis-approach' && 
                pageId !== 'page-knowledge-strategy' &&
                pageId !== 'page-knowledge-import' &&
                pageId !== 'page-indicator-approval' &&
                pageId !== 'page-business-jargon' &&
                (targetPage.innerHTML.trim() === '' || 
                (targetPage.innerHTML.indexOf('<!-- 页面内容将通过JavaScript动态加载 -->') !== -1 && 
                 pageId !== 'page-empty'))) {
                
                // 动态加载页面内容
                fetch(`pages/${pageId}.html`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('页面加载失败');
                        }
                        return response.text();
                    })
                    .then(html => {
                        targetPage.innerHTML = html;
                    })
                    .catch(error => {
                        console.error('加载页面失败:', error);
                        targetPage.innerHTML = `
                            <div class="empty-placeholder">
                                <i class="fas fa-tools"></i>
                                <p>该功能页面正在建设中...</p>
                            </div>
                        `;
                    });
            }
            return;
        }
        
        // 如果页面不存在，尝试动态创建
        fetch(`pages/${pageId}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('页面加载失败');
                }
                return response.text();
            })
            .then(html => {
                // 创建新页面元素
                const pageElement = document.createElement('div');
                pageElement.id = pageId;
                pageElement.className = 'content-page active';
                pageElement.innerHTML = html;
                this.elements.mainContent.appendChild(pageElement);
                
                // 更新缓存的页面元素
                this.elements.contentPages = document.querySelectorAll('.content-page');
            })
            .catch(error => {
                console.error('加载页面失败:', error);
                // 显示空页面
                document.getElementById('page-empty').classList.add('active');
            });
    },
    
    // 响应式布局处理
    handleResize: function() {
        if (window.innerWidth <= 768) {
            this.elements.sidebar.classList.remove('collapsed');
            this.state.sidebarCollapsed = false;
        }
    }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
    ChatBI.init();
}); 

// 标签管理页面的Tab切换功能
function switchTagTab(tabId) {
    // 隐藏所有标签内容
    document.querySelectorAll('#page-tag-management .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 取消所有标签的激活状态
    document.querySelectorAll('#page-tag-management .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 激活选中的标签和内容
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`#page-tag-management .tab[onclick="switchTagTab('${tabId}')"]`).classList.add('active');
} 