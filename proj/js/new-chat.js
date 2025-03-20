// Monica三栏式布局聊天页面的JavaScript功能

document.addEventListener('DOMContentLoaded', () => {
    // DOM元素选择
    const welcomeSection = document.querySelector('.welcome-section');
    const chatInterface = document.querySelector('.chat-interface');
    const questionChips = document.querySelectorAll('.question-chip');
    const inputTextarea = document.querySelector('.input-container textarea');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const modelItems = document.querySelectorAll('.model-item');
    const modelSelector = document.querySelector('.model-selector');
    const recentItems = document.querySelectorAll('.recent-item');
    const toolItems = document.querySelectorAll('.tool-item');
    const imageToolItems = document.querySelectorAll('.image-tool-item');
    const toolTabs = document.querySelectorAll('.tool-tab');
    
    // 示例回复数据
    const sampleResponses = [
        "这是一个很好的问题。根据最新研究，我们可以从以下几个方面来看...",
        "我理解你的问题，这确实是个复杂的话题。简单来说...",
        "你提出了一个有趣的观点。从历史角度看，这个问题的发展经历了以下阶段...",
        "关于这个问题，有几种不同的观点：首先...",
        "这是很多人都关心的问题。我的建议是考虑以下几点..."
    ];
    
    // 输入框自动调整高度
    const adjustTextareaHeight = () => {
        inputTextarea.style.height = 'auto';
        inputTextarea.style.height = Math.min(inputTextarea.scrollHeight, 150) + 'px';
    };
    
    // 滚动到最新消息
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // 切换聊天界面/欢迎界面
    const toggleChatInterface = (showChat = true) => {
        if (showChat) {
            welcomeSection.style.display = 'none';
            chatInterface.style.display = 'flex';
        } else {
            welcomeSection.style.display = 'block';
            chatInterface.style.display = 'none';
        }
    };
    
    // 初始化时显示欢迎界面
    toggleChatInterface(false);
    
    // 添加用户消息
    const addUserMessage = (text) => {
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const messageHTML = `
            <div class="message-time">今天 ${currentTime}</div>
            <div class="message user-message">
                <div class="message-content">
                    <p>${text}</p>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    };
    
    // 添加AI消息
    const addAIMessage = (text) => {
        // 添加思考指示
        const loadingId = 'loading-message-' + Date.now();
        const loadingHTML = `
            <div id="${loadingId}" class="message ai-message">
                <div class="message-content">
                    <p><i class="fas fa-circle-notch fa-spin"></i> 思考中...</p>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', loadingHTML);
        scrollToBottom();
        
        // 延迟模拟AI思考
        setTimeout(() => {
            const loadingElem = document.getElementById(loadingId);
            if (loadingElem) {
                loadingElem.outerHTML = `
                    <div class="message ai-message">
                        <div class="message-content">
                            <p>${text}</p>
                        </div>
                    </div>
                `;
                scrollToBottom();
            }
        }, 1500);
    };
    
    // 处理发送消息
    const handleSendMessage = () => {
        const messageText = inputTextarea.value.trim();
        if (messageText) {
            // 显示聊天界面
            toggleChatInterface(true);
            
            // 添加用户消息
            addUserMessage(messageText);
            
            // 清空输入框
            inputTextarea.value = '';
            adjustTextareaHeight();
            
            // 随机回复
            setTimeout(() => {
                const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
                addAIMessage(randomResponse);
            }, 500);
        }
    };
    
    // 处理推荐问题点击
    questionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const questionText = chip.textContent;
            
            // 显示聊天界面
            toggleChatInterface(true);
            
            // 添加用户消息
            addUserMessage(questionText);
            
            // 随机回复
            setTimeout(() => {
                const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
                addAIMessage(randomResponse);
            }, 500);
        });
    });
    
    // 模型选择功能
    modelItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            modelItems.forEach(mi => mi.classList.remove('active'));
            
            // 添加活动状态到点击项
            item.classList.add('active');
            
            // 更新模型选择器显示
            const modelName = item.querySelector('span').textContent;
            const modelImg = item.querySelector('img').getAttribute('src');
            
            modelSelector.querySelector('span').textContent = modelName;
            modelSelector.querySelector('img').setAttribute('src', modelImg);
        });
    });
    
    // 聊天历史点击
    recentItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            recentItems.forEach(ri => ri.classList.remove('active'));
            
            // 添加活动状态到点击项
            item.classList.add('active');
            
            // 显示聊天界面
            toggleChatInterface(true);
            
            // 模拟加载历史聊天
            const chatTitle = item.querySelector('.recent-title').textContent;
            
            // 清空聊天区域
            chatMessages.innerHTML = `
                <div class="message system-message">
                    <p>已加载对话: "${chatTitle}"</p>
                </div>
                
                <div class="message-time">今天 15:42</div>
                
                <div class="message user-message">
                    <div class="message-content">
                        <p>请为我详细解释${chatTitle}的相关信息</p>
                    </div>
                </div>
                
                <div class="message ai-message">
                    <div class="message-content">
                        <p>关于"${chatTitle}"，以下是一些重要信息：...</p>
                        <p>这是一个示例回复，实际内容会根据历史记录显示。</p>
                    </div>
                </div>
            `;
        });
    });
    
    // 工具项点击功能
    toolItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`您点击了"${item.querySelector('.tool-name').textContent}"工具，这只是一个演示。`);
        });
    });
    
    // 图像工具点击功能
    imageToolItems.forEach(item => {
        item.addEventListener('click', () => {
            alert(`您点击了"${item.querySelector('.image-tool-title').textContent}"工具，这只是一个演示。`);
        });
    });
    
    // 右侧工具标签切换
    toolTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            toolTabs.forEach(t => t.classList.remove('active'));
            
            // 添加活动状态到点击项
            tab.classList.add('active');
            
            // 这里可以添加实际的标签内容切换逻辑
        });
    });
    
    // 输入框事件
    inputTextarea.addEventListener('input', adjustTextareaHeight);
    
    // 回车发送消息（shift+回车换行）
    inputTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // 发送按钮点击
    sendButton.addEventListener('click', handleSendMessage);
    
    console.log('Monica三栏式聊天界面初始化完成');
}); 