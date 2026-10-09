/**
 * 侧栏访客信息组件 - JavaScript逻辑
 * 通过青桔API获取访客位置信息并计算距离
 */

(function() {
  'use strict';

  /**
   * 根据当前时间获取问候语和建议
   * @returns {Object} 包含问候语(greeting)和建议(advice)的对象
   */
  function getGreetingAndAdvice() {
    const hour = new Date().getHours();

    if (hour < 6) {
      return {
        greeting: "🌛 深夜好呀 👋",
        advice: "🌙不要熬夜 早点休息啦🌙"
      };
    } else if (hour < 11) {
      return {
        greeting: "🌞 早上好呀 👋",
        advice: "💪新的一天 充满活力💪"
      };
    } else if (hour < 13) {
      return {
        greeting: "🍽️ 中午好呀 👋",
        advice: "🍔别忘了享受一顿美味的午餐🍔"
      };
    } else if (hour < 18) {
      return {
        greeting: "☕ 下午好呀 👋",
        advice: "🍵休息一下 喝杯咖啡吧🍵"
      };
    } else if (hour < 22) {
      return {
        greeting: "🌜 晚上好呀 👋",
        advice: "🌃放松心情 享受夜晚的宁静🌃"
      };
    } else {
      return {
        greeting: "🌛 深夜好呀 👋",
        advice: "🌙不要熬夜 早点休息啦🌙"
      };
    }
  }

  /**
   * 角度转弧度函数
   * @param {number} degrees - 角度值
   * @returns {number} 弧度值
   */
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * 计算两点间距离（Haversine公式）
   * @param {number} lat - 纬度
   * @param {number} lng - 经度
   * @param {number} customLat - 自定义纬度（站点位置）
   * @param {number} customLng - 自定义经度（站点位置）
   * @returns {string} 格式化后的距离（公里）
   */
  function calculateDistance(lat, lng, customLat, customLng) {
    // 地球半径（公里）
    const R = 6371;

    // 计算经纬度差值并转换为弧度
    const dLat = toRadians(lat - customLat);
    const dLon = toRadians(lng - customLng);

    // Haversine公式计算距离
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(customLat)) *
      Math.cos(toRadians(lat)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // 返回格式化后的距离
    return (R * c).toFixed(2);
  }

  /**
   * 获取用户地理位置信息
   * @param {string} apiKey - API密钥
   * @returns {Promise<Object|null>} 用户位置信息对象或null
   */
  async function fetchLocation(apiKey) {
    if (!apiKey) {
      console.error('访客信息API密钥未配置');
      return null;
    }

    // API配置数组
    const apis = [
      {
        url: `https://api.nsmao.net/api/ip/query?key=${encodeURIComponent(apiKey)}`,
        provinceField: "prov"
      },
      {
        url: `https://api.nsmao.net/api/ipip/query?key=${encodeURIComponent(apiKey)}`,
        provinceField: "province"
      }
    ];

    // 遍历API尝试获取位置信息
    for (const api of apis) {
      try {
        const res = await fetch(api.url);
        const result = await res.json();
        
        // 请求成功
        if (result.code === 200 && result.data) {
          const data = result.data;
          return {
            ip: data.ip,
            country: data.country,
            province: data[api.provinceField],
            city: data.city,
            district: data.district,
            adcode: data.adcode,
            lat: data.lat,
            lng: data.lng
          };
        }
      } catch (e) {
        console.error(`获取地理位置失败 (${api.url})：`, e);
        continue;
      }
    }
    
    // 所有API都失败返回null
    return null;
  }

  /**
   * 渲染欢迎信息
   * @param {Object} location - 位置信息对象
   * @param {Object} config - 配置对象
   */
  function renderWelcomeMessage(location, config) {
    const { greeting, advice } = getGreetingAndAdvice();
    let locationHtml = "";

    // 按优先级拼接位置信息
    if (location.province) {
      locationHtml += `<strong style="color: ${config.fontColor};">${location.province} </strong>`;
    }
    if (location.city) {
      locationHtml += `<strong style="color: ${config.fontColor};">${location.city} </strong>`;
    }
    if (location.district) {
      locationHtml += `<strong style="color: ${config.fontColor};">${location.district}</strong>`;
    }

    // 计算距离
    const distance = calculateDistance(location.lat, location.lng, config.customLat, config.customLng);

    // 更新欢迎信息内容
    const messageEl = document.getElementById('visitorInfoMessage');
    if (messageEl) {
      messageEl.innerHTML =
        `<p><strong>${greeting}</strong></p>` +
        `<p>欢迎来自 ${locationHtml} 的小伙伴！</p>` +
        `<p>${advice}</p>` +
        `<p>🌍 您当前的 IP 是<strong><span class="visitor-ip-mask" style="color: ${config.fontColor};">${location.ip}</span></strong> 🌍</p>` +
        `<p>📍 距离 <strong style="color: ${config.fontColor};">${config.siteName}</strong> 约<strong style="color: ${config.fontColor};">${distance}</strong> 公里哦！📍</p>`;
    }
  }

  /**
   * 初始化函数
   */
  async function initVisitorInfo() {
    // 检查组件是否存在
    const visitorCard = document.querySelector('.visitor-info-card');
    if (!visitorCard) {
      return;
    }

    // 检查配置
    const config = window.visitorInfoConfig || {};
    if (!config.enabled) {
      return;
    }

    if (!config.apiKey) {
      const messageEl = document.getElementById('visitorInfoMessage');
      if (messageEl) {
        messageEl.innerHTML = '<p>🌍 访客信息组件未配置API密钥 🌍</p>';
      }
      return;
    }

    // 获取位置信息
    const location = await fetchLocation(config.apiKey);

    if (location && location.lat && location.lng) {
      // 渲染欢迎信息
      renderWelcomeMessage(location, config);
    } else {
      // 获取失败时显示错误信息
      const messageEl = document.getElementById('visitorInfoMessage');
      if (messageEl) {
        messageEl.innerHTML =
          '<p>🌍 这位小伙伴，你似乎迷失了~🌍</p>' +
          '<p>获取位置信息失败，请稍后再试~😅</p>';
      }
    }
  }

  // 页面加载时初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisitorInfo);
  } else {
    initVisitorInfo();
  }

  // 支持PJAX重新初始化
  document.addEventListener('pjax:complete', function() {
    setTimeout(initVisitorInfo, 100);
  });
})();

