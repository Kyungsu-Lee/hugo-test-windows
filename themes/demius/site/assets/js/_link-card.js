/**
 * 文章内容链接卡片和跳转中转功能
 * 支持链接卡片显示和跳转中转页
 */

(function() {
  'use strict';

  // 解析配置值（处理字符串转数组的情况）
  function parseConfigValue(value, defaultValue) {
    if (value === null || value === undefined) {
      return defaultValue;
    }
    
    // 如果已经是数组，直接返回
    if (Array.isArray(value)) {
      return value;
    }
    
    // 如果是字符串，尝试解析为JSON
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // 解析失败，使用默认值
      }
    }
    
    return defaultValue;
  }

  // 获取配置
  function getConfig() {
    if (window.siteConfig && window.siteConfig.linkCard) {
      const rawConfig = window.siteConfig.linkCard;
      const redirectConfig = rawConfig.redirect || {};
      
      const config = {
        enable: rawConfig.enable || false,
        cardMode: rawConfig.cardMode || 'external',
        openInNewTab: rawConfig.openInNewTab !== false,
        showArticleInfo: rawConfig.showArticleInfo !== false,
        showArticleTitle: rawConfig.showArticleTitle !== false,
        showArticleDate: rawConfig.showArticleDate !== false,
        showArticleSummary: rawConfig.showArticleSummary !== false,
        redirectPage: rawConfig.redirectPage !== false,
        replaceWhitelist: parseConfigValue(rawConfig.replaceWhitelist, []),
        pageWhitelist: parseConfigValue(rawConfig.pageWhitelist, []),
        elementWhitelist: parseConfigValue(rawConfig.elementWhitelist, []),
        redirectWhitelist: parseConfigValue(rawConfig.redirectWhitelist, []),
        redirect: {
          pagePath: redirectConfig.pagePath || '/go.html',
          countdown: redirectConfig.countdown !== undefined ? redirectConfig.countdown : 3,
          showCountdown: redirectConfig.showCountdown !== false,
          showButton: redirectConfig.showButton !== false,
          safeMessage: redirectConfig.safeMessage || '😃 来自本站，本站可确保其安全性，请放心点击跳转'
        }
      };
      
      return config;
    }
    
    const defaultConfig = {
      enable: false,
      cardMode: 'external',
      openInNewTab: true,
      showArticleInfo: true,
      showArticleTitle: true,
      showArticleDate: true,
      showArticleSummary: true,
      redirectPage: true,
      replaceWhitelist: [],
      pageWhitelist: [],
      elementWhitelist: [],
      redirectWhitelist: []
    };
    return defaultConfig;
  }

  // 检查URL是否为本站链接
  function isInternalLink(url) {
    if (!url) {
      return false;
    }
    try {
      const urlObj = new URL(url, window.location.origin);
      const isInternal = urlObj.origin === window.location.origin;
      return isInternal;
    } catch (e) {
      // 相对路径
      const isRelative = url.startsWith('/') || url.startsWith('#');
      return isRelative;
    }
  }

  // 检查URL是否匹配白名单
  function matchesWhitelist(url, whitelist) {
    if (!whitelist || whitelist.length === 0) {
      return false;
    }
    
    const matched = whitelist.some(pattern => {
      if (!pattern || pattern.trim() === '') return false;
      try {
        const regex = new RegExp(pattern);
        return regex.test(url);
      } catch (e) {
        return url.includes(pattern);
      }
    });
    
    return matched;
  }

  // 文章信息缓存
  let articleInfoCache = null;
  
  // 获取文章信息（从Hugo站点数据）
  async function getArticleInfo(url) {
    if (!isInternalLink(url)) return null;
    
    try {
      // 规范化URL（移除hash和查询参数）
      const urlObj = new URL(url, window.location.origin);
      const normalizedUrl = urlObj.pathname;
      
      // 如果缓存为空，先加载index.json
      if (!articleInfoCache) {
        try {
          const response = await fetch('/index.json', { cache: 'no-store' });
          if (!response.ok) {
            return null;
          }
          articleInfoCache = await response.json();
        } catch (e) {
          return null;
        }
      }
      
      // 在索引中查找匹配的文章
      const article = articleInfoCache.find(item => {
        // 匹配URL（支持相对路径和绝对路径）
        const itemUrl = item.url || '';
        return itemUrl === normalizedUrl || 
               itemUrl === urlObj.pathname ||
               itemUrl.replace(/\/$/, '') === normalizedUrl.replace(/\/$/, '') ||
               normalizedUrl.endsWith(itemUrl) ||
               itemUrl.endsWith(normalizedUrl);
      });
      
      if (article) {
        return {
          title: article.title || '',
          date: article.date || '',
          description: article.description || '',
          url: article.url || ''
        };
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  // 创建链接卡片
  async function createLinkCard(link, config) {
    // 使用原始href来判断链接类型（用于决定是否显示卡片）
    // 如果提供了originalHref，使用它；否则使用href
    const typeCheckHref = link.originalHref || link.href;
    const isInternal = isInternalLink(typeCheckHref);
    const cardType = isInternal ? 'internal' : 'external';
    
    // 检查是否应该显示卡片
    if (config.cardMode === 'none') {
      return null;
    }
    
    if (config.cardMode === 'internal' && !isInternal) {
      return null;
    }
    
    if (config.cardMode === 'external' && isInternal) {
      return null;
    }
    
    const container = document.createElement('div');
    container.className = 'link-card-container';
    
    const card = document.createElement('a');
    card.className = `link-card-${cardType}`;
    card.href = link.href;
    
    if (config.openInNewTab) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    
    // 卡片头部
    const header = document.createElement('div');
    header.className = 'link-card-header';
    
    const icon = document.createElement('i');
    icon.className = isInternal ? 'fas fa-link' : 'fas fa-external-link-alt';
    icon.classList.add('link-card-icon');
    
    const title = document.createElement('div');
    title.className = 'link-card-title';
    
    // 如果是内部链接且需要显示文章信息，尝试获取文章标题
    let articleInfo = null;
    if (isInternal && config.showArticleInfo) {
      articleInfo = await getArticleInfo(typeCheckHref);
      if (articleInfo && config.showArticleTitle && articleInfo.title) {
        title.textContent = articleInfo.title;
      } else {
        title.textContent = link.text || link.href;
      }
    } else {
      title.textContent = link.text || link.href;
    }
    
    header.appendChild(icon);
    header.appendChild(title);
    card.appendChild(header);
    
    // 如果是内部链接且需要显示文章信息
    if (isInternal && config.showArticleInfo) {
      // 显示文章日期
      if (config.showArticleDate && articleInfo && articleInfo.date) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'link-card-date';
        const dateIcon = document.createElement('i');
        dateIcon.className = 'fas fa-calendar-alt';
        dateDiv.appendChild(dateIcon);
        dateDiv.appendChild(document.createTextNode(articleInfo.date));
        card.appendChild(dateDiv);
      }
      
      // 显示文章摘要
      if (config.showArticleSummary && articleInfo && articleInfo.description) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'link-card-summary';
        summaryDiv.textContent = articleInfo.description;
        card.appendChild(summaryDiv);
      }
      
      // 显示URL（如果未显示文章信息或需要显示URL）
      const urlDiv = document.createElement('div');
      urlDiv.className = 'link-card-url';
      const urlIcon = document.createElement('i');
      urlIcon.className = 'fas fa-globe';
      urlDiv.appendChild(urlIcon);
      urlDiv.appendChild(document.createTextNode(typeCheckHref));
      card.appendChild(urlDiv);
    } else if (!isInternal) {
      // 外部链接显示URL（显示原始URL，而不是跳转页URL）
      const urlDiv = document.createElement('div');
      urlDiv.className = 'link-card-url';
      const urlIcon = document.createElement('i');
      urlIcon.className = 'fas fa-globe';
      urlDiv.appendChild(urlIcon);
      // 显示原始URL（如果存在），否则显示当前href
      const displayUrl = link.originalHref || link.href;
      urlDiv.appendChild(document.createTextNode(displayUrl));
      card.appendChild(urlDiv);
    }
    
    container.appendChild(card);
    
    return container;
  }

  // 处理链接替换
  async function processLinks(config) {
    // 确定要处理的容器
    let containers = [];
    
    if (config.elementWhitelist && config.elementWhitelist.length > 0) {
      config.elementWhitelist.forEach(selector => {
        if (!selector || selector.trim() === '') {
          return;
        }
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el && !containers.includes(el)) {
            containers.push(el);
          }
        });
      });
    } else {
      // 默认处理文章内容区域
      const postContent = document.querySelector('.post-content');
      if (postContent) {
        containers.push(postContent);
      }
    }
    
    if (containers.length === 0) {
      // 如果找不到容器，尝试查找其他可能的内容容器
      const fallbackContainers = [
        '.post-content',
        'article .content',
        '.content',
        'main article'
      ];
      
      for (const selector of fallbackContainers) {
        const el = document.querySelector(selector);
        if (el && !containers.includes(el)) {
          containers.push(el);
          break;
        }
      }
    }
    
    if (containers.length === 0) {
      return;
    }
    
    for (let containerIndex = 0; containerIndex < containers.length; containerIndex++) {
      const container = containers[containerIndex];
      const links = container.querySelectorAll('a[href]');
      
      for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {
        const link = links[linkIndex];
        const href = link.getAttribute('href');
        if (!href || href.trim() === '') {
          continue;
        }
        
        // 跳过特殊链接
        if (link.hasAttribute('data-fancybox')) {
          continue;
        }
        if (link.hasAttribute('data-no-replace')) {
          continue;
        }
        if (link.classList.contains('no-replace')) {
          continue;
        }
        if (link.closest('.link-card-container')) {
          continue;
        }
        
        // 跳过已经是跳转页的链接（避免重复处理）
        if (href.includes('/go.html?goUrl=') || href.includes('/go/?goUrl=')) {
          continue;
        }
        
        // 检查替换白名单
        if (config.replaceWhitelist && config.replaceWhitelist.length > 0) {
          if (matchesWhitelist(href, config.replaceWhitelist)) {
            continue; // 在白名单中，不替换
          }
        }
        
        const isInternal = isInternalLink(href);
        
        // 记录原始href，用于后续比较
        const originalHref = href;
        let currentHref = href; // 当前使用的href（可能会被更新）
        let hrefUpdated = false; // 标记href是否被更新
        
        // 处理外部链接：跳转中转
        if (!isInternal && config.redirectPage) {
          if (!config.redirect) {
            // redirect 配置不存在，跳过
          } else {
            // 检查跳转白名单
            if (config.redirectWhitelist && config.redirectWhitelist.length > 0) {
              if (matchesWhitelist(href, config.redirectWhitelist)) {
                // 在白名单中，使用跳转页但显示为安全
                const redirectPath = config.redirect?.pagePath || '/go.html';
                const goUrl = `${redirectPath}?goUrl=${encodeURIComponent(href)}&type=goDown`;
                link.href = goUrl;
                currentHref = link.href;
                hrefUpdated = true;
                continue;
              }
            }
            
            // 使用跳转中转页
            const redirectPath = config.redirect?.pagePath || '/go.html';
            const goUrl = `${redirectPath}?goUrl=${encodeURIComponent(href)}&type=goDown`;
            link.href = goUrl;
            currentHref = link.href;
            hrefUpdated = true;
          }
        }
        
        // 处理链接卡片
        if (config.enable && config.cardMode !== 'none') {
          // 判断是否显示卡片时，使用原始href（因为更新后的href会被识别为内部链接）
          const cardDisplayCheckHref = originalHref;
          const cardDisplayIsInternal = isInternalLink(cardDisplayCheckHref);
          
          const shouldShowCard = 
            (config.cardMode === 'all') ||
            (config.cardMode === 'internal' && cardDisplayIsInternal) ||
            (config.cardMode === 'external' && !cardDisplayIsInternal);
          
          if (shouldShowCard) {
            // 创建卡片时，使用更新后的href（跳转页URL），这样点击卡片会跳转到中转页
            const cardHref = hrefUpdated ? link.href : originalHref;
            const card = await createLinkCard({
              href: cardHref,
              originalHref: originalHref,
              text: link.textContent.trim()
            }, config);
            
            if (card) {
              // 隐藏原始链接
              link.style.display = 'none';
              // 在链接后插入卡片
              link.parentNode.insertBefore(card, link.nextSibling);
            }
          }
        }
      }
    }
  }

  // 初始化
  function init() {
    const config = getConfig();
    
    if (!config.enable && !config.redirectPage) {
      return; // 功能未启用
    }
    
    // 检查页面白名单
    if (config.pageWhitelist && config.pageWhitelist.length > 0) {
      const currentPath = window.location.pathname;
      
      const shouldProcess = config.pageWhitelist.some(pattern => {
        if (!pattern || pattern.trim() === '') {
          return false;
        }
        try {
          const regex = new RegExp(pattern);
          return regex.test(currentPath);
        } catch (e) {
          return currentPath.includes(pattern);
        }
      });
      
      if (!shouldProcess) {
        return; // 不在页面白名单中
      }
    }
    
    // 处理链接的函数
    async function doProcess() {
      // 增加延迟，确保内容完全渲染
      setTimeout(async () => {
        await processLinks(config);
      }, 200);
    }
    
    // 等待内容加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        doProcess();
      });
    } else {
      // DOM已经加载完成，立即执行
      doProcess();
    }
  }

  // 启动初始化
  init();

  // PJAX支持
  document.addEventListener('pjax:complete', function() {
    setTimeout(() => {
      const config = getConfig();
      
      if (config.enable || config.redirectPage) {
        // 重新检查页面白名单
        if (config.pageWhitelist && config.pageWhitelist.length > 0) {
          const currentPath = window.location.pathname;
          const shouldProcess = config.pageWhitelist.some(pattern => {
            if (!pattern || pattern.trim() === '') return false;
            try {
              const regex = new RegExp(pattern);
              return regex.test(currentPath);
            } catch (e) {
              return currentPath.includes(pattern);
            }
          });
          
          if (!shouldProcess) {
            return; // 不在页面白名单中
          }
        }
        
        (async () => {
          await processLinks(config);
        })();
      }
    }, 200);
  });

})();

