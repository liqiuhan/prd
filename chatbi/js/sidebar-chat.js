// Monica侧边栏可折叠的三栏式布局聊天页面的JavaScript功能

document.addEventListener('DOMContentLoaded', () => {
    // DOM元素选择
    const sidebarTools = document.getElementById('sidebar-tools');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarToggleExpanded = document.getElementById('sidebar-toggle-expanded');
    const productLogo = document.getElementById('product-logo');
    const historyPanel = document.getElementById('history-panel');
    const historyToggle = document.getElementById('history-toggle');
    const toolItems = document.querySelectorAll('.tool-item');
    const chatItems = document.querySelectorAll('.chat-item');
    const questionChips = document.querySelectorAll('.question-chip');
    const inputTextarea = document.querySelector('.input-container textarea');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const roleSwitch = document.querySelector('.role-switch');
    const recommendedQuestions = document.querySelector('.recommended-questions');
    const webSearchBtn = document.querySelector('.feature-btn.web-search');
    const deepThinkingBtn = document.querySelector('.feature-btn.deep-thinking');
    const userProfile = document.querySelector('.user-profile');
    // 分页相关元素
    const paginationPrev = document.getElementById('pagination-prev');
    const paginationNext = document.getElementById('pagination-next');
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    // 不同类型的推荐问题
    const recommendedQuestionsByType = {
        '查数示例': [
            {
                title: '数据查询技巧',
                desc: '如何优化SQL查询以提高数据获取效率？'
            },
            {
                title: '多维数据分析',
                desc: '从多个维度分析用户行为数据的方法有哪些？'
            },
            {
                title: '数据质量控制',
                desc: '如何确保数据查询结果的准确性和可靠性？'
            },
            {
                title: '数据集成与ETL',
                desc: '企业多源数据集成的最佳实践是什么？'
            }
        ],
        '分析示例': [
            {
                title: '数据可视化方法',
                desc: '如何选择合适的图表类型展示复杂的业务数据？'
            },
            {
                title: '业务指标分析',
                desc: '核心业务KPI波动分析与归因方法有哪些？'
            },
            {
                title: '预测模型应用',
                desc: '如何构建销售预测模型并应用于业务决策？'
            },
            {
                title: '竞品分析框架',
                desc: '系统性进行竞品分析的方法论与实践步骤？'
            }
        ],
        '预警示例': [
            {
                title: '异常检测机制',
                desc: '如何设计业务数据异常检测与预警系统？'
            },
            {
                title: '风险评估模型',
                desc: '构建企业运营风险预警模型的关键因素有哪些？'
            },
            {
                title: '预警阈值设定',
                desc: '如何科学确定业务预警指标的阈值？'
            },
            {
                title: '预警响应流程',
                desc: '设计高效的预警触发后响应处理流程？'
            }
        ],
        'PPT示例': [
            {
                title: '数据可视化PPT',
                desc: '如何在PPT中有效展示复杂数据并讲述数据故事？'
            },
            {
                title: '汇报结构设计',
                desc: '业务分析汇报PPT的最佳结构与内容安排？'
            },
            {
                title: '视觉设计原则',
                desc: '提升PPT专业感与说服力的视觉设计原则？'
            },
            {
                title: '演示技巧提升',
                desc: '数据分析结果演示的高效沟通技巧有哪些？'
            }
        ]
    };
    
    // 侧边栏展开/收起
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebarTools.classList.toggle('expanded');
        });
    }

    // 产品Logo点击展开
    if (productLogo) {
        productLogo.addEventListener('click', () => {
            if (!sidebarTools.classList.contains('expanded')) {
                sidebarTools.classList.add('expanded');
            } else {
                // 如果已经展开，则切换状态
                sidebarTools.classList.remove('expanded');
            }
        });

        // 为Logo添加脉冲动画
        setTimeout(() => {
            const logoIcon = productLogo.querySelector('.logo-icon');
            if (logoIcon) {
                logoIcon.classList.add('pulse');
                setTimeout(() => {
                    logoIcon.classList.remove('pulse');
                }, 2000);
            }
        }, 1000);
    }

    // 展开后的折叠按钮点击
    if (sidebarToggleExpanded) {
        sidebarToggleExpanded.addEventListener('click', (e) => {
            // 阻止事件冒泡，避免触发productLogo的点击事件
            e.stopPropagation();
            sidebarTools.classList.remove('expanded');
        });
    }
    
    // 用户头像点击事件
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            // 展开侧边栏，如果已收起
            if (!sidebarTools.classList.contains('expanded')) {
                sidebarTools.classList.add('expanded');
            }
            
            // 这里可以添加用户菜单显示逻辑
            alert('用户设置功能尚未实现');
        });
    }
    
    // 历史面板展开/收起
    if (historyToggle && historyPanel) {
        console.log('初始化历史面板折叠功能');
        
        // 确保按钮可见
        historyToggle.style.display = 'flex';
        historyToggle.style.visibility = 'visible';
        historyToggle.style.opacity = '1';
        
        // 添加点击事件
        historyToggle.addEventListener('click', function() {
            console.log('历史面板折叠按钮被点击');
            
            // 切换折叠类
            historyPanel.classList.toggle('collapsed');
            
            // 切换折叠按钮图标方向
            const icon = historyToggle.querySelector('i');
            if (historyPanel.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
                historyToggle.setAttribute('title', '展开历史面板');
                console.log('历史面板已折叠');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
                historyToggle.setAttribute('title', '折叠历史面板');
                console.log('历史面板已展开');
            }
        });
        
        console.log('历史面板折叠功能初始化完成');
    } else {
        console.error('找不到历史面板或折叠按钮元素!');
        if (!historyPanel) console.error('历史面板不存在');
        if (!historyToggle) console.error('折叠按钮不存在');
    }
    
    // 工具项点击
    toolItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            toolItems.forEach(ti => ti.classList.remove('active'));
            
            // 添加活动状态到点击项
            item.classList.add('active');
            
            // 根据工具类型执行不同操作
            const toolType = item.getAttribute('data-tool');
            
            // 如果点击的是历史会话工具，显示历史面板
            if (toolType === 'history') {
                historyPanel.classList.remove('collapsed');
            } else {
                // 对于其他工具，可以添加相应的操作
                console.log(`选择了 ${toolType} 工具`);
            }
        });
    });
    
    // 聊天历史项点击
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            chatItems.forEach(ci => ci.classList.remove('active'));
            
            // 添加活动状态到点击项
            item.classList.add('active');
            
            // 加载历史聊天记录
            const chatTitle = item.querySelector('.chat-title').textContent;
            console.log(`加载聊天: ${chatTitle}`);
        });
    });
    
    // 输入框自动调整高度
    const adjustTextareaHeight = () => {
        if (inputTextarea) {
            inputTextarea.style.height = 'auto';
            inputTextarea.style.height = Math.min(inputTextarea.scrollHeight, 150) + 'px';
        }
    };
    
    // 初始化默认推荐问题
    const initRecommendedQuestions = () => {
        // 获取初始加载的推荐问题卡片
        const initialQuestionCards = document.querySelectorAll('.question-card');
        
        // 为初始的问题卡片添加点击事件
        if (initialQuestionCards.length > 0) {
            initialQuestionCards.forEach(card => {
                card.addEventListener('click', () => {
                    if (inputTextarea) {
                        const questionDesc = card.querySelector('.question-card-desc').textContent;
                        inputTextarea.value = questionDesc;
                        inputTextarea.focus();
                        adjustTextareaHeight();
                    }
                });
            });
        }
    };
    
    // 执行初始化
    initRecommendedQuestions();
    
    // 分页功能
    if (paginationItems && paginationItems.length > 0) {
        // 当前页码
        let currentPage = 1;
        const totalPages = paginationItems.length;
        
        // 切换页码函数
        const switchPage = (pageNum) => {
            if (pageNum < 1 || pageNum > totalPages) return;
            
            // 更新当前页码
            currentPage = pageNum;
            
            // 更新分页UI
            paginationItems.forEach((item, index) => {
                if (index + 1 === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // 禁用或启用上一页/下一页按钮
            if (currentPage === 1) {
                paginationPrev.classList.add('disabled');
            } else {
                paginationPrev.classList.remove('disabled');
            }
            
            if (currentPage === totalPages) {
                paginationNext.classList.add('disabled');
            } else {
                paginationNext.classList.remove('disabled');
            }
            
            // 这里可以添加加载不同页面聊天历史的逻辑
            console.log(`加载第 ${currentPage} 页历史会话`);
            
            // 模拟内容切换效果 - 实际项目中应该通过AJAX请求或其他方式获取数据
            // 此处只是为了演示
            const historyList = document.querySelector('.history-list');
            if (historyList) {
                historyList.style.opacity = '0.5';
                setTimeout(() => {
                    historyList.style.opacity = '1';
                }, 300);
            }
        };
        
        // 初始化分页状态
        switchPage(1);
        
        // 分页项点击事件
        paginationItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                switchPage(index + 1);
            });
        });
        
        // 上一页按钮点击
        if (paginationPrev) {
            paginationPrev.addEventListener('click', () => {
                if (currentPage > 1) {
                    switchPage(currentPage - 1);
                }
            });
        }
        
        // 下一页按钮点击
        if (paginationNext) {
            paginationNext.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    switchPage(currentPage + 1);
                }
            });
        }
    }
    
    // 标签页切换逻辑 - 更新推荐问题
    if (questionChips && questionChips.length > 0 && recommendedQuestions) {
        // 默认选中第一个标签
        questionChips[0].classList.add('active');
        
        questionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                // 移除所有active类
                questionChips.forEach(c => c.classList.remove('active'));
                // 添加active类到当前点击的chip
                this.classList.add('active');
                
                // 更新推荐问题
                updateRecommendedQuestions(this.textContent);
            });
        });
    }
    
    // 更新推荐问题的函数
    function updateRecommendedQuestions(category) {
        if (!recommendedQuestions || !recommendedQuestionsByType[category]) return;
        
        console.log(`更新推荐问题为: ${category}`);
        
        // 清空当前推荐问题
        recommendedQuestions.innerHTML = '';
        
        // 添加新的推荐问题
        recommendedQuestionsByType[category].forEach(question => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.innerHTML = `
                <div class="question-card-title">${question.title}</div>
                <div class="question-card-desc">${question.desc}</div>
            `;
            
            // 添加点击事件 - 将问题填入输入框
            questionCard.addEventListener('click', function() {
                if (inputTextarea) {
                    inputTextarea.value = question.desc;
                    inputTextarea.focus();
                    adjustTextareaHeight();
                }
            });
            
            recommendedQuestions.appendChild(questionCard);
        });
    }
    
    // 输入框事件
    if (inputTextarea) {
        inputTextarea.addEventListener('input', adjustTextareaHeight);
    }
    
    // 发送按钮点击
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            if (inputTextarea) {
                const messageText = inputTextarea.value.trim();
                if (messageText) {
                    console.log(`发送消息: ${messageText}`);
                }
            }
        });
    }
    
    // 角色切换按钮点击
    if (roleSwitch) {
        roleSwitch.addEventListener('click', () => {
            alert('角色切换功能尚未实现');
        });
    }
    
    // 联网检索按钮点击
    if (webSearchBtn && inputTextarea) {
        webSearchBtn.addEventListener('click', () => {
            const currentInput = inputTextarea.value.trim();
            if (currentInput) {
                console.log(`使用联网检索: ${currentInput}`);
            } else {
                alert('请先输入您的问题，再使用联网检索功能');
            }
        });
    }
    
    // 深度思考按钮点击
    if (deepThinkingBtn && inputTextarea) {
        deepThinkingBtn.addEventListener('click', () => {
            const currentInput = inputTextarea.value.trim();
            if (currentInput) {
                console.log(`使用深度思考: ${currentInput}`);
            } else {
                alert('请先输入您的问题，再使用深度思考功能');
            }
        });
    }
    
    // 初始化时更新第一个标签的问题
    if (questionChips && questionChips.length > 0) {
        updateRecommendedQuestions(questionChips[0].textContent);
    }
    
    // 调整输入框高度
    adjustTextareaHeight();
    
    console.log('Monica侧边栏可折叠的三栏式布局聊天页面初始化完成');
}); 