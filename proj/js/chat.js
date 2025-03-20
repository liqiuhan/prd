// Monica.im聊天页面交互功能

document.addEventListener('DOMContentLoaded', () => {
    // DOM元素
    const chatMessages = document.querySelector('.chat-messages');
    const textarea = document.querySelector('.input-wrapper textarea');
    const sendBtn = document.querySelector('.send-btn');
    const historyItems = document.querySelectorAll('.history-item');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const voiceBtn = document.querySelector('.toolbar button[title="语音输入"]');
    const modelSelector = document.querySelector('.selected-model');
    const copyButtons = document.querySelectorAll('.message-actions button:first-child');
    const regenerateButtons = document.querySelectorAll('.message-actions button:last-child');
    
    // 模拟消息数据
    const demoResponses = [
        "我很好奇你对这个话题有什么看法。能分享更多详细信息吗？",
        "这是一个很有趣的问题！从技术角度来看，这涉及到多个方面...",
        "根据最新的研究，我们可以看到以下几个关键趋势...",
        "这是一个复杂的问题，让我们从几个不同的角度来分析...",
        "我理解你的问题。简单来说，这个过程可以分为以下几个步骤..."
    ];
    
    // 自动调整文本区域高度
    const adjustTextareaHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    };
    
    // 滚动到最新消息
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // 添加用户消息
    const addUserMessage = (text) => {
        const messageHTML = `
            <div class="message-container user-message">
                <div class="avatar">
                    <img src="https://via.placeholder.com/32" alt="用户头像">
                </div>
                <div class="message">
                    <p>${text}</p>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    };
    
    // 添加AI消息，包括加载状态
    const addAIMessage = (text) => {
        // 先添加加载提示
        const loadingId = 'loading-message-' + Date.now();
        const loadingHTML = `
            <div id="${loadingId}" class="message-container ai-message">
                <div class="avatar">
                    <img src="https://via.placeholder.com/32" alt="Monica">
                </div>
                <div class="message">
                    <p><i class="fas fa-spinner fa-spin"></i> 正在思考中...</p>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', loadingHTML);
        scrollToBottom();
        
        // 模拟API延迟
        setTimeout(() => {
            const loadingElem = document.getElementById(loadingId);
            if (loadingElem) {
                const messageHTML = `
                    <div class="message-container ai-message">
                        <div class="avatar">
                            <img src="https://via.placeholder.com/32" alt="Monica">
                        </div>
                        <div class="message">
                            <p>${text}</p>
                        </div>
                        <div class="message-actions">
                            <button><i class="fas fa-copy"></i> 复制</button>
                            <button><i class="fas fa-redo"></i> 重新生成</button>
                        </div>
                    </div>
                `;
                loadingElem.outerHTML = messageHTML;
                
                // 为新添加的按钮添加事件监听
                const newCopyBtn = chatMessages.querySelector('.message-container:last-child .message-actions button:first-child');
                const newRegenerateBtn = chatMessages.querySelector('.message-container:last-child .message-actions button:last-child');
                
                if (newCopyBtn) {
                    newCopyBtn.addEventListener('click', function() {
                        const textToCopy = this.closest('.message-container').querySelector('.message').textContent.trim();
                        copyToClipboard(textToCopy);
                    });
                }
                
                if (newRegenerateBtn) {
                    newRegenerateBtn.addEventListener('click', function() {
                        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
                        this.closest('.message-container').querySelector('.message p').textContent = randomResponse;
                    });
                }
                
                scrollToBottom();
            }
        }, 1500); // 1.5秒后显示回复
    };
    
    // 复制到剪贴板
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };
    
    // 处理用户发送消息
    const handleSendMessage = () => {
        const text = textarea.value.trim();
        if (text) {
            addUserMessage(text);
            textarea.value = '';
            textarea.style.height = 'auto';
            
            // 模拟AI回复
            setTimeout(() => {
                const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
                addAIMessage(randomResponse);
            }, 500);
        }
    };
    
    // 模拟语音输入功能
    const simulateVoiceInput = () => {
        const isListening = voiceBtn.classList.toggle('listening');
        
        if (isListening) {
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
            voiceBtn.style.color = '#ff4d4d';
            
            // 模拟3秒后识别完成
            setTimeout(() => {
                textarea.value = "这是通过语音输入的示例文本。";
                adjustTextareaHeight();
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceBtn.style.color = '';
                voiceBtn.classList.remove('listening');
            }, 3000);
        } else {
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.style.color = '';
        }
    };
    
    // 模拟切换聊天历史
    const simulateChatSwitch = (item) => {
        historyItems.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
        
        // 这里只是为了演示，实际应用中需要加载对应的聊天记录
        const title = item.querySelector('.history-title').textContent;
        alert(`已切换到对话: "${title}"`);
    };
    
    // 模拟新建聊天
    const simulateNewChat = () => {
        // 清空消息区域
        chatMessages.innerHTML = `
            <div class="message-container system-message">
                <div class="message">
                    <p>你好！我是Monica，你的全能AI助手。我可以帮助你回答问题、生成内容、分析数据等。请问有什么我可以帮助你的吗？</p>
                </div>
            </div>
        `;
        
        // 更新历史列表
        const newChatTitle = "新对话 " + new Date().toLocaleTimeString();
        const newHistoryItem = `
            <div class="history-item active">
                <div class="history-title">${newChatTitle}</div>
                <div class="history-date">刚刚</div>
            </div>
        `;
        
        const chatHistory = document.querySelector('.chat-history');
        historyItems.forEach(item => item.classList.remove('active'));
        chatHistory.insertAdjacentHTML('afterbegin', newHistoryItem);
        
        // 为新添加的历史项添加事件监听
        const newItem = chatHistory.querySelector('.history-item:first-child');
        newItem.addEventListener('click', () => simulateChatSwitch(newItem));
    };
    
    // 事件监听
    textarea.addEventListener('input', adjustTextareaHeight);
    
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    sendBtn.addEventListener('click', handleSendMessage);
    voiceBtn.addEventListener('click', simulateVoiceInput);
    newChatBtn.addEventListener('click', simulateNewChat);
    
    historyItems.forEach(item => {
        item.addEventListener('click', () => simulateChatSwitch(item));
    });
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.closest('.message-container').querySelector('.message').textContent.trim();
            copyToClipboard(textToCopy);
        });
    });
    
    regenerateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
            this.closest('.message-container').querySelector('.message p').textContent = randomResponse;
        });
    });
    
    // 模型选择器下拉菜单
    modelSelector.addEventListener('click', () => {
        const modelOptions = [
            { name: 'GPT-4o', img: 'https://via.placeholder.com/24' },
            { name: 'Claude 3.7', img: 'https://via.placeholder.com/24' },
            { name: 'DeepSeek-R1', img: 'https://via.placeholder.com/24' },
            { name: 'o3-mini', img: 'https://via.placeholder.com/24' },
        ];
        
        // 创建模型选择下拉菜单
        let dropdownHTML = `<div class="model-dropdown">`;
        modelOptions.forEach(model => {
            dropdownHTML += `
                <div class="model-option" data-name="${model.name}">
                    <img src="${model.img}" alt="${model.name}">
                    <span>${model.name}</span>
                </div>
            `;
        });
        dropdownHTML += `</div>`;
        
        // 检查是否已存在下拉菜单
        const existingDropdown = document.querySelector('.model-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }
        
        document.querySelector('.model-selector').insertAdjacentHTML('beforeend', dropdownHTML);
        
        // 为模型选项添加点击事件
        document.querySelectorAll('.model-option').forEach(option => {
            option.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const img = this.querySelector('img').getAttribute('src');
                
                // 更新选择器显示
                modelSelector.querySelector('img').setAttribute('src', img);
                modelSelector.querySelector('span').textContent = name;
                
                // 更新输入区域的模型显示
                document.querySelector('.model-options span').textContent = name;
                
                // 移除下拉菜单
                document.querySelector('.model-dropdown').remove();
            });
        });
        
        // 点击其他地方关闭下拉菜单
        const closeDropdown = (e) => {
            if (!e.target.closest('.model-selector')) {
                const dropdown = document.querySelector('.model-dropdown');
                if (dropdown) dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };
        
        // 延迟添加事件监听器，防止立即触发
        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 0);
    });
    
    // 调整文本区域初始高度
    adjustTextareaHeight();
    scrollToBottom();
}); 