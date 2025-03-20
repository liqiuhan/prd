// Monica.im网页复刻 - JavaScript功能

document.addEventListener('DOMContentLoaded', () => {
    // 移动设备菜单切换
    const setupMobileMenu = () => {
        const headerElement = document.querySelector('header');
        const logoElement = document.querySelector('.logo');
        
        if (headerElement && logoElement) {
            // 创建移动菜单按钮
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // 创建移动菜单容器
            const mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile-menu');
            mobileMenu.style.display = 'none';
            
            // 复制导航链接到移动菜单
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                mobileMenu.innerHTML = navLinks.innerHTML;
                
                // 添加登录和注册按钮
                const authButtons = document.querySelector('.auth-buttons');
                if (authButtons) {
                    const authButtonsClone = authButtons.cloneNode(true);
                    mobileMenu.appendChild(authButtonsClone);
                }
                
                // 将移动菜单按钮和容器添加到DOM
                headerElement.appendChild(mobileMenu);
                logoElement.after(mobileMenuBtn);
                
                // 点击菜单按钮切换显示
                mobileMenuBtn.addEventListener('click', () => {
                    if (mobileMenu.style.display === 'none') {
                        mobileMenu.style.display = 'flex';
                        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        mobileMenu.style.display = 'none';
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
                
                // 监听窗口大小变化，自动调整菜单显示
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 992) {
                        mobileMenu.style.display = 'none';
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
        }
    };
    
    // 平滑滚动到锚点
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // 考虑固定导航栏的高度
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // 按钮动画效果
    const setupButtonEffects = () => {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = '';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    };
    
    // 滚动时导航栏效果
    const setupScrollEffects = () => {
        const header = document.querySelector('header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    };
    
    // FAQ手风琴效果
    const setupFaqAccordion = () => {
        const questions = document.querySelectorAll('.question h3');
        
        questions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isExpanded = answer.style.maxHeight;
                
                // 关闭所有其他打开的答案
                document.querySelectorAll('.question p').forEach(p => {
                    p.style.maxHeight = null;
                });
                
                // 切换当前答案
                if (!isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    };
    
    // 模拟聊天功能（仅用于演示）
    const setupChatDemo = () => {
        const chatButton = document.querySelector('.primary-btn');
        
        if (chatButton) {
            chatButton.addEventListener('click', () => {
                alert('这是Monica.im的演示版本。在实际应用中，这里会打开一个聊天窗口或跳转到应用页面。');
            });
        }
    };
    
    // 初始化所有功能
    setupMobileMenu();
    setupSmoothScroll();
    setupButtonEffects();
    setupScrollEffects();
    setupFaqAccordion();
    setupChatDemo();
    
    console.log('Monica.im demo initialized successfully!');
}); 