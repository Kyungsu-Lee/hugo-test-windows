// 文章加密功能
function initEncryption() {
    // 清理旧的加密遮罩层（页面切换时）
    cleanupEncryptionOverlay();
    
    // 处理部分内容加密
    initPartialEncryption();
    
    // 处理全文加密
    initFullEncryption();
}

// 清理加密遮罩层
function cleanupEncryptionOverlay() {
    const existingOverlay = document.querySelector('.full-encryption-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
}

// 部分内容加密
function initPartialEncryption() {
    const encryptedContents = document.querySelectorAll('.encrypted-content');
    
    encryptedContents.forEach(container => {
        const submitBtn = container.querySelector('.encryption-submit');
        const passwordInput = container.querySelector('.encryption-password');
        const errorMsg = container.querySelector('.encryption-error');
        const encryptionBox = container.querySelector('.encryption-box');
        const encryptedData = container.querySelector('.encrypted-data');
        const encryptedDataSource = container.querySelector('.encrypted-data-source');
        const storedPassword = container.dataset.password; // SHA256 hash
        
        // 立即编码并存储内容，然后清空源码显示
        if (encryptedDataSource && encryptedDataSource.innerHTML.trim()) {
            try {
                const contentHTML = encryptedDataSource.innerHTML;
                // 使用 UTF-8 安全编码
                const encodedContent = btoa(unescape(encodeURIComponent(contentHTML)));
                container.dataset.encryptedContent = encodedContent;
                
                // 清空源码中的内容，防止暴露
                encryptedDataSource.innerHTML = '';
                encryptedDataSource.remove(); // 移除源元素
            } catch (error) {
                console.error('[Encryption] 部分加密内容编码失败:', error);
            }
        }
        
        // 检查是否已解锁
        const contentId = Array.from(container.parentElement.children).indexOf(container);
        const unlocked = sessionStorage.getItem(`encrypted_${contentId}`);
        
        if (unlocked === 'unlocked' && container.dataset.encryptedContent) {
            // 已解锁，解码并显示内容
            try {
                const decodedContent = decodeURIComponent(escape(atob(container.dataset.encryptedContent)));
                encryptedData.innerHTML = decodedContent;
                encryptionBox.style.display = 'none';
                encryptedData.style.display = 'block';
            } catch (error) {
                console.error('[Encryption] 解码内容失败:', error);
            }
        }
        
        // 应用部分加密弹窗样式
        applyPartialEncryptionPopupStyles(encryptionBox);
        
        // 点击解锁按钮
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                checkPartialPassword(passwordInput, storedPassword, errorMsg, encryptionBox, encryptedData, container);
            });
        }
        
        // 回车键解锁
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkPartialPassword(passwordInput, storedPassword, errorMsg, encryptionBox, encryptedData, container);
                }
            });
        }
    });
}

// 检查部分加密密码
async function checkPartialPassword(input, storedHash, errorMsg, encryptionBox, encryptedData, container) {
    const password = input.value.trim();
    
    if (!password) {
        showError(errorMsg, '请输入密码');
        return;
    }
    
    // 计算密码的 SHA256
    const inputHash = await sha256(password);
    
    if (inputHash === storedHash) {
        // 密码正确，解码并显示内容
        const encryptedContent = container.dataset.encryptedContent;
        if (encryptedContent) {
            try {
                // 解码 base64 内容
                const decodedContent = decodeURIComponent(escape(atob(encryptedContent)));
                encryptedData.innerHTML = decodedContent;
                encryptionBox.style.display = 'none';
                encryptedData.style.display = 'block';
                
                // 保存解锁状态到 sessionStorage（仅当前会话有效）
                const contentId = Array.from(container.parentElement.children).indexOf(container);
                sessionStorage.setItem(`encrypted_${contentId}`, 'unlocked');
            } catch (error) {
                console.error('[Encryption] 解码内容失败:', error);
                showError(errorMsg, '内容解码失败，请刷新页面重试');
            }
        } else {
            // 兼容旧版本（如果没有加密内容，使用原有逻辑）
            encryptionBox.style.display = 'none';
            encryptedData.style.display = 'block';
            
            const contentId = Array.from(container.parentElement.children).indexOf(container);
            sessionStorage.setItem(`encrypted_${contentId}`, 'unlocked');
        }
    } else {
        // 密码错误
        const errorText = window.siteConfig?.encryption?.wrongPasswordHint || '密码错误，请重试';
        showError(errorMsg, errorText);
        input.value = '';
        input.focus();
    }
}

// 全文加密
function initFullEncryption() {
    const article = document.querySelector('article.post');
    if (!article) return;
    
    const password = article.dataset.password;
    if (!password) return;
    
    // 检查是否已解锁
    const articleId = article.dataset.slug || window.location.pathname;
    const unlocked = sessionStorage.getItem(`full_encrypted_${articleId}`);
    
    // 隐藏并存储文章内容
    const postContent = article.querySelector('.post-content');
    if (postContent) {
        const contentHTML = postContent.innerHTML;
        
        // 如果有加密内容且未编码，立即编码并存储，然后清空源码显示
        if (contentHTML && contentHTML.trim() && !article.dataset.encryptedContent) {
            try {
                // 使用 UTF-8 安全编码
                const encodedContent = btoa(unescape(encodeURIComponent(contentHTML)));
                article.dataset.encryptedContent = encodedContent;
                
                // 清空内容，防止在源码中暴露
                postContent.innerHTML = '';
            } catch (error) {
                console.error('[Encryption] 全文加密内容编码失败:', error);
                // 如果编码失败，仍然隐藏内容（降级方案）
            }
        }
        
        // 检查是否已解锁
        if (unlocked === 'unlocked' && article.dataset.encryptedContent) {
            // 已解锁，解码并显示内容
            try {
                const decodedContent = decodeURIComponent(escape(atob(article.dataset.encryptedContent)));
                postContent.innerHTML = decodedContent;
                postContent.style.display = 'block';
            } catch (error) {
                console.error('[Encryption] 解码内容失败:', error);
            }
            return; // 已解锁，不显示遮罩
        }
        
        // 未解锁，隐藏内容
        postContent.style.display = 'none';
    }
    
    // 确保文章容器有相对定位
    article.style.position = 'relative';
    
    // 创建全文加密遮罩
    const hint = article.dataset.hint || window.siteConfig?.encryption?.fullHint || '此文章已加密，请输入密码查看完整内容';
    
    const overlay = document.createElement('div');
    overlay.className = 'full-encryption-overlay';
    overlay.innerHTML = `
        <div class="full-encryption-container">
            <div class="encryption-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            </div>
            <h2>🔒 文章已加密</h2>
            <p class="encryption-hint">${hint}</p>
            <div class="encryption-input-group">
                <input type="password" class="encryption-password" placeholder="请输入密码" autofocus>
                <button class="encryption-submit">解锁</button>
            </div>
            <p class="encryption-error" style="display:none;"></p>
        </div>
    `;
    
    // 在插入 DOM 之前就应用样式，避免动画期间样式变化导致抖动
    // 先应用样式（在插入DOM之前）
    applyEncryptionPopupStyles(overlay);
    
    // 将遮罩添加到文章容器内（暂时不显示）
    article.appendChild(overlay);
    
    const container = overlay.querySelector('.full-encryption-container');
    if (container) {
        // 记录初始尺寸
        const initialHeight = container.offsetHeight;
        const initialWidth = container.offsetWidth;
        
        // 先隐藏，防止闪烁
        // 使用 visibility: hidden + opacity: 0，保持元素在布局中，避免尺寸变化
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        // 暂时禁用动画，避免首次显示时抖动
        container.style.animation = 'none';
        // 移除所有可能的内联 transform，避免与动画冲突
        container.style.removeProperty('transform');
        // 设置 pointer-events: none，确保隐藏时不可交互
        container.style.pointerEvents = 'none';
        // 单独设置 willChange 用于硬件加速
        container.style.willChange = 'transform, opacity';
        
        // 监控布局变化
        let layoutChangeCount = 0;
        let lastHeight = initialHeight;
        let lastWidth = initialWidth;
        
        // 记录初始 scrollHeight，只监控真正的布局变化
        let lastScrollHeight = container.scrollHeight;
        
        const checkLayoutChanges = () => {
            const currentHeight = container.offsetHeight;
            const currentWidth = container.offsetWidth;
            const currentScrollHeight = container.scrollHeight;
            const computedStyle = window.getComputedStyle(container);
            const currentTransform = computedStyle.transform;
            const currentBackgroundImage = computedStyle.backgroundImage;
            
            // 只监控 offsetHeight 和 offsetWidth 的变化（真正的布局变化）
            // 允许1px以内的误差（可能是渲染精度问题）
            const heightDiff = Math.abs(currentHeight - lastHeight);
            const widthDiff = Math.abs(currentWidth - lastWidth);
            
            if (heightDiff > 1 || widthDiff > 1) {
                layoutChangeCount++;
                lastHeight = currentHeight;
                lastWidth = currentWidth;
                lastScrollHeight = currentScrollHeight;
            } else if (currentScrollHeight !== lastScrollHeight) {
                // scrollHeight 变化但不是布局变化（可能是内容渲染完成），记录但不计数
                lastScrollHeight = currentScrollHeight;
            }
        };
        
        // 强制浏览器进行一次完整的布局计算，确保所有样式已应用且尺寸已确定
        // 触发强制重排，确保所有样式计算完成（包括背景图等）
        void container.offsetHeight;
        void container.offsetWidth;
        void container.scrollHeight;
        
        checkLayoutChanges();
        
        // 等待浏览器完成布局计算，确保稳定
        requestAnimationFrame(() => {
            // 再次触发布局计算，确保背景图等资源加载后的布局稳定
            void container.offsetHeight;
            checkLayoutChanges();
            
            // 使用双重 requestAnimationFrame 确保在下一帧渲染前完成
            requestAnimationFrame(() => {
                
                // 最终检查布局
                void container.offsetHeight;
                checkLayoutChanges();
                
                // 确保背景图完全渲染后再启动动画
                const bgImage = (window.siteConfig?.encryption?.popupBackgroundImage && typeof window.siteConfig.encryption.popupBackgroundImage === 'string' && window.siteConfig.encryption.popupBackgroundImage.trim()) || '';
                
                // 启动动画的函数
                const startAnimation = () => {
                    // 多次强制布局计算，确保所有样式都已应用
                    void container.offsetHeight;
                    void container.offsetWidth;
                    void container.scrollHeight;
                    checkLayoutChanges();
                    
                    // 等待一帧
                    requestAnimationFrame(() => {
                        // 再次强制布局计算
                        void container.offsetHeight;
                        checkLayoutChanges();
                        
                        // 再等待一帧，确保背景图等资源完全加载
                        requestAnimationFrame(() => {
                            // 最终布局检查
                            void container.offsetHeight;
                            checkLayoutChanges();
                            
                            // 最后一次强制布局计算，确保稳定
                            void container.offsetHeight;
                            void container.offsetWidth;
                            checkLayoutChanges();
                            
                            // 启用动画并显示
                            // 记录启用动画前的完整状态
                            const beforeAnimationStyle = {
                                height: container.offsetHeight,
                                width: container.offsetWidth,
                                scrollHeight: container.scrollHeight,
                                computedStyle: {
                                    transform: window.getComputedStyle(container).transform,
                                    animation: window.getComputedStyle(container).animation,
                                    visibility: window.getComputedStyle(container).visibility,
                                    opacity: window.getComputedStyle(container).opacity
                                }
                            };
                            
                            // 确保没有任何内联 transform 干扰动画
                            container.style.removeProperty('transform');
                            
                            // 先设置为可见但保持透明，确保布局稳定（元素已在布局中，不会导致尺寸变化）
                            container.style.visibility = 'visible';
                            container.style.pointerEvents = 'auto';
                            
                            // 强制多次布局计算，确保显示后的布局完全稳定
                            void container.offsetHeight;
                            void container.offsetWidth;
                            void container.scrollHeight;
                            checkLayoutChanges();
                            
                            // 等待一帧，确保显示后的布局完全稳定
                            requestAnimationFrame(() => {
                                // 再次强制布局计算
                                void container.offsetHeight;
                                void container.offsetWidth;
                                checkLayoutChanges();
                                
                                // 再等待一帧，确保布局完全稳定
                                requestAnimationFrame(() => {
                                    // 最后一次强制布局计算
                                    void container.offsetHeight;
                                    void container.offsetWidth;
                                    checkLayoutChanges();
                                    
                                    // 现在启用淡入动画（此时布局已完全稳定）
                                    // 使用双重 requestAnimationFrame 确保完美同步浏览器渲染帧
                                    requestAnimationFrame(() => {
                                        requestAnimationFrame(() => {
                                            // 确保初始 opacity 为 0，让 CSS 动画完全控制
                                            container.style.opacity = '0';
                                            // 使用纯 opacity 动画，避免 transform 导致的抖动
                                            container.style.animation = 'fadeIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
                                        });
                                    });
                                    
                                    // 强制布局计算，确保动画启用后的布局稳定
                                    void container.offsetHeight;
                                    void container.offsetWidth;
                                    checkLayoutChanges();
                                    
                                    const afterAnimationStyle = {
                                        height: container.offsetHeight,
                                        width: container.offsetWidth,
                                        scrollHeight: container.scrollHeight,
                                        computedStyle: {
                                            transform: window.getComputedStyle(container).transform,
                                            animation: window.getComputedStyle(container).animation,
                                            visibility: window.getComputedStyle(container).visibility,
                                            opacity: window.getComputedStyle(container).opacity
                                        }
                                    };
                                    
                                });
                            });
                        });
                    });
                };
                
                // 确保背景图完全渲染后再启动动画
                if (bgImage) {
                    // 使用三重 requestAnimationFrame 确保背景图完全渲染
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                // 强制重排，确保背景图已渲染
                                void container.offsetHeight;
                                void container.offsetWidth;
                                
                                startAnimation();
                            });
                        });
                    });
                } else {
                    // 没有背景图，等待一帧确保布局稳定后启动动画
                    requestAnimationFrame(() => {
                        startAnimation();
                    });
                }
            });
        });
    }
    
    const submitBtn = overlay.querySelector('.encryption-submit');
    const passwordInput = overlay.querySelector('.encryption-password');
    const errorMsg = overlay.querySelector('.encryption-error');
    
    // 点击解锁
    submitBtn.addEventListener('click', () => {
        checkFullPassword(passwordInput, password, errorMsg, overlay, postContent, articleId);
    });
    
    // 回车键解锁
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkFullPassword(passwordInput, password, errorMsg, overlay, postContent, articleId);
        }
    });
}

// 检查全文加密密码
async function checkFullPassword(input, storedHash, errorMsg, overlay, postContent, articleId) {
    const password = input.value.trim();
    
    if (!password) {
        showError(errorMsg, '请输入密码');
        return;
    }
    
    // 计算密码的 SHA256
    const inputHash = await sha256(password);
    
    if (inputHash === storedHash) {
        // 密码正确，解码并显示内容
        const article = postContent?.closest('article.post');
        const encryptedContent = article?.dataset.encryptedContent;
        
        if (encryptedContent && postContent) {
            try {
                // 解码 base64 内容
                const decodedContent = decodeURIComponent(escape(atob(encryptedContent)));
                postContent.innerHTML = decodedContent;
            } catch (error) {
                console.error('[Encryption] 解码内容失败:', error);
                showError(errorMsg, '内容解码失败，请刷新页面重试');
                return;
            }
        }
        
        // 移除遮罩，显示内容
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
            if (postContent) {
                postContent.style.display = 'block';
                postContent.style.animation = 'fadeIn 0.5s ease-in-out';
            }
        }, 300);
        
        // 保存解锁状态
        sessionStorage.setItem(`full_encrypted_${articleId}`, 'unlocked');
    } else {
        // 密码错误
        const errorText = window.siteConfig?.encryption?.wrongPasswordHint || '密码错误，请重试';
        showError(errorMsg, errorText);
        input.value = '';
        input.focus();
    }
}

// 应用加密弹窗样式配置
function applyEncryptionPopupStyles(overlay) {
    const container = overlay.querySelector('.full-encryption-container');
    if (!container) {
        return;
    }
    
    // 检查 window.siteConfig 是否存在
    if (!window.siteConfig) {
        console.error('[Encryption] window.siteConfig 不存在！');
        return;
    }
    
    // 检查加密配置是否存在
    if (!window.siteConfig.encryption) {
        console.error('[Encryption] window.siteConfig.encryption 不存在！');
        return;
    }
    
    const config = window.siteConfig.encryption;
    
    // 应用文字颜色（处理 undefined、空字符串情况）
    let textColor = '#ffffff'; // 默认白色
    if (config.popupTextColor && typeof config.popupTextColor === 'string' && config.popupTextColor.trim()) {
        textColor = config.popupTextColor.trim();
    }
    
    const iconElements = container.querySelectorAll('.encryption-icon, .encryption-icon svg');
    const textElements = container.querySelectorAll('h2, .encryption-hint');
    
    iconElements.forEach(el => {
        el.style.setProperty('color', textColor, 'important');
    });
    
    textElements.forEach(el => {
        el.style.setProperty('color', textColor, 'important');
    });
    
    // 应用错误消息颜色（稍微透明，便于区分）
    const errorElements = container.querySelectorAll('.encryption-error');
    errorElements.forEach(el => {
        el.style.setProperty('color', textColor, 'important');
        el.style.opacity = '0.9';
    });
    
    // 应用背景色（处理 undefined、空字符串情况）
    let bgColor = '';
    if (config.popupBackgroundColor && typeof config.popupBackgroundColor === 'string' && config.popupBackgroundColor.trim()) {
        bgColor = config.popupBackgroundColor.trim();
    }
    const defaultBgColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // 应用背景图（处理 undefined、空字符串情况）
    let bgImage = '';
    if (config.popupBackgroundImage && typeof config.popupBackgroundImage === 'string' && config.popupBackgroundImage.trim()) {
        bgImage = config.popupBackgroundImage.trim();
    }
    
    // 清除所有背景相关样式，重新设置
    // 使用 getPropertyValue 和 removeProperty 确保完全清除
    container.style.removeProperty('background');
    container.style.removeProperty('background-color');
    container.style.removeProperty('background-image');
    container.style.removeProperty('background-size');
    container.style.removeProperty('background-position');
    container.style.removeProperty('background-repeat');
    
    if (bgImage) {
        // 如果有背景图，优先使用背景图
        // 先设置默认背景色作为占位，避免背景图加载时显示空白
        const placeholderBgColor = bgColor || defaultBgColor;
        if (placeholderBgColor.includes('gradient')) {
            container.style.setProperty('background', placeholderBgColor, 'important');
        } else {
            container.style.setProperty('background-color', placeholderBgColor, 'important');
        }
        
        // 预加载背景图，确保在动画开始前完成加载和应用
        const img = new Image();
        img.onload = () => {
            // 立即应用背景图，不等 requestAnimationFrame，避免延迟
            // 立即应用背景图
            container.style.setProperty('background-image', `url("${bgImage}")`, 'important');
            container.style.setProperty('background-size', 'cover', 'important');
            container.style.setProperty('background-position', 'center', 'important');
            container.style.setProperty('background-repeat', 'no-repeat', 'important');
            
            // 如果有背景色且不是渐变，作为底色
            if (bgColor && !bgColor.includes('gradient')) {
                container.style.setProperty('background-color', bgColor, 'important');
            }
            
            // 强制重排，确保背景图应用后的布局稳定
            void container.offsetHeight;
            void container.offsetWidth;
        };
        img.onerror = () => {
            // 图片加载失败时保持使用背景色（已在上面设置）
        };
        // 开始加载图片（立即开始，不等任何条件）
        img.src = bgImage;
    } else {
        // 没有背景图，使用背景色
        const finalBgColor = bgColor || defaultBgColor;
        if (finalBgColor.includes('gradient')) {
            container.style.setProperty('background', finalBgColor, 'important');
        } else {
            container.style.setProperty('background-color', finalBgColor, 'important');
        }
    }
}

// 应用部分加密弹窗样式
function applyPartialEncryptionPopupStyles(encryptionBox) {
    if (!encryptionBox) {
        return;
    }
    
    // 检查 window.siteConfig 是否存在
    if (!window.siteConfig) {
        console.error('[Encryption] window.siteConfig 不存在！');
        return;
    }
    
    // 检查加密配置是否存在
    if (!window.siteConfig.encryption) {
        console.error('[Encryption] window.siteConfig.encryption 不存在！');
        return;
    }
    
    const config = window.siteConfig.encryption;
    
    // 应用文字颜色（处理 undefined、空字符串情况）
    if (config.partialPopupTextColor && typeof config.partialPopupTextColor === 'string' && config.partialPopupTextColor.trim()) {
        const textColor = config.partialPopupTextColor.trim();
        
        const iconElements = encryptionBox.querySelectorAll('.encryption-icon, .encryption-icon svg');
        const textElements = encryptionBox.querySelectorAll('.encryption-hint');
        
        iconElements.forEach(el => {
            el.style.setProperty('color', textColor, 'important');
        });
        
        textElements.forEach(el => {
            el.style.setProperty('color', textColor, 'important');
        });
        
        // 应用错误消息颜色
        const errorElements = encryptionBox.querySelectorAll('.encryption-error');
        errorElements.forEach(el => {
            el.style.setProperty('color', textColor, 'important');
            el.style.opacity = '0.9';
        });
    }
    
    // 应用背景色（处理 undefined、空字符串情况）
    let bgColor = '';
    if (config.partialPopupBackgroundColor && typeof config.partialPopupBackgroundColor === 'string' && config.partialPopupBackgroundColor.trim()) {
        bgColor = config.partialPopupBackgroundColor.trim();
    }
    
    // 应用背景图（处理 undefined、空字符串情况）
    let bgImage = '';
    if (config.partialPopupBackgroundImage && typeof config.partialPopupBackgroundImage === 'string' && config.partialPopupBackgroundImage.trim()) {
        bgImage = config.partialPopupBackgroundImage.trim();
    }
    
    // 清除所有背景相关样式，重新设置
    encryptionBox.style.removeProperty('background');
    encryptionBox.style.removeProperty('background-color');
    encryptionBox.style.removeProperty('background-image');
    encryptionBox.style.removeProperty('background-size');
    encryptionBox.style.removeProperty('background-position');
    encryptionBox.style.removeProperty('background-repeat');
    
    if (bgImage) {
        // 如果有背景图，优先使用背景图
        // 先设置背景色作为占位，避免背景图加载时显示空白
        if (bgColor) {
            if (bgColor.includes('gradient')) {
                encryptionBox.style.setProperty('background', bgColor, 'important');
            } else {
                encryptionBox.style.setProperty('background-color', bgColor, 'important');
            }
        }
        
        // 预加载背景图
        const img = new Image();
        img.onload = () => {
            // 应用背景图
            encryptionBox.style.setProperty('background-image', `url("${bgImage}")`, 'important');
            encryptionBox.style.setProperty('background-size', 'cover', 'important');
            encryptionBox.style.setProperty('background-position', 'center', 'important');
            encryptionBox.style.setProperty('background-repeat', 'no-repeat', 'important');
            
            // 如果有背景色且不是渐变，作为底色
            if (bgColor && !bgColor.includes('gradient')) {
                encryptionBox.style.setProperty('background-color', bgColor, 'important');
            }
        };
        img.onerror = () => {
            // 图片加载失败时保持使用背景色（如果有）
            if (bgColor) {
                if (bgColor.includes('gradient')) {
                    encryptionBox.style.setProperty('background', bgColor, 'important');
                } else {
                    encryptionBox.style.setProperty('background-color', bgColor, 'important');
                }
            }
        };
        // 开始加载图片
        img.src = bgImage;
    } else if (bgColor) {
        // 没有背景图，使用背景色
        if (bgColor.includes('gradient')) {
            encryptionBox.style.setProperty('background', bgColor, 'important');
        } else {
            encryptionBox.style.setProperty('background-color', bgColor, 'important');
        }
        
        // 如果有背景色，可能需要调整文字颜色以确保可读性
        if (bgColor && (!config.partialPopupTextColor || !config.partialPopupTextColor.trim())) {
            // 如果没有配置文字颜色，自动判断是否需要白色文字
            // 简单判断：如果是深色背景，使用白色文字
            const isDark = bgColor.includes('#') && (
                bgColor.includes('000') || 
                bgColor.includes('111') || 
                bgColor.includes('222') ||
                bgColor.includes('333')
            ) || bgColor.includes('rgb(0') || bgColor.includes('rgba(0');
            
            if (isDark) {
                const iconElements = encryptionBox.querySelectorAll('.encryption-icon, .encryption-icon svg');
                const textElements = encryptionBox.querySelectorAll('.encryption-hint');
                
                iconElements.forEach(el => {
                    el.style.setProperty('color', '#ffffff', 'important');
                });
                
                textElements.forEach(el => {
                    el.style.setProperty('color', '#ffffff', 'important');
                });
            }
        }
    }
}

// 显示错误信息
function showError(errorElement, message) {
    if (!errorElement) return;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// SHA256 哈希函数
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// fadeOut 动画
const fadeOutKeyframes = `
@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
`;

// 注入动画样式
if (!document.querySelector('#encryption-animations')) {
    const style = document.createElement('style');
    style.id = 'encryption-animations';
    style.textContent = fadeOutKeyframes;
    document.head.appendChild(style);
}

// 首次加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initEncryption();
    });
} else {
    initEncryption();
}

// 监听浏览器返回/前进按钮（popstate事件）
window.addEventListener('popstate', () => {
    // 清理加密遮罩层
    cleanupEncryptionOverlay();
});

// 监听PJAX页面切换前事件（如果使用PJAX）
document.addEventListener('pjax:send', () => {
    // 清理加密遮罩层
    cleanupEncryptionOverlay();
});

// 监听PJAX页面切换完成事件（如果使用PJAX）
document.addEventListener('pjax:complete', () => {
    // 延迟一点，确保DOM完全更新
    setTimeout(() => {
        initEncryption();
    }, 100);
});

// 导出到全局供PJAX使用
window.initEncryption = initEncryption;
window.cleanupEncryptionOverlay = cleanupEncryptionOverlay;

