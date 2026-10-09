(function () {
  const profiles = Array.from(document.querySelectorAll("[data-x-profile]"));
  if (!profiles.length) return;

  const proxy = document.querySelector("[data-x-profile-proxy]")?.dataset.xProfileProxy;
  const formatter = new Intl.NumberFormat("en-US");
  const endpoint = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json";
  const usernames = [...new Set(profiles.map((node) => node.dataset.xProfile).filter(Boolean))];

  function applyProfile(username, data) {
    profiles
      .filter((node) => node.dataset.xProfile === username)
      .forEach((node) => {
        const names = Array.from(node.querySelectorAll("[data-x-name]"));
        const handles = Array.from(node.querySelectorAll("[data-x-handle]"));
        const followers = node.querySelector("[data-x-followers]");
        const following = node.querySelector("[data-x-following]");
        const avatar = node.querySelector("[data-x-avatar]");
        const screenName = data.screen_name || data.username || data.handle;
        const imageUrl = data.profile_image_url || data.profile_image_url_https || data.avatar || data.avatar_url;

        if (data.name) names.forEach((name) => { name.textContent = data.name; });
        if (screenName) handles.forEach((handle) => { handle.textContent = `@${screenName}`; });
        setCount(following, data.following_count, "following");
        setCount(followers, data.followers_count, "followers");
        if (avatar && imageUrl) {
          avatar.src = imageUrl;
        } else if (avatar && screenName) {
          avatar.src = `https://unavatar.io/x/${encodeURIComponent(screenName)}`;
        }
      });
  }

  function applyZeroCounts(username) {
    profiles
      .filter((node) => node.dataset.xProfile === username)
      .forEach((node) => {
        setCount(node.querySelector("[data-x-following]"), 0, "following");
        setCount(node.querySelector("[data-x-followers]"), 0, "followers");
      });
  }

  function setCount(node, count, label) {
    if (!node || !Number.isFinite(count)) return;
    const formatted = formatCompactCount(count);
    node.textContent = node.hasAttribute("data-x-number-only") ? formatted : `${formatted} ${label}`;
  }

  function formatCompactCount(count) {
    if (count >= 1000000000) return `${formatUnit(count, 1000000000)}B`;
    if (count >= 1000000) return `${formatUnit(count, 1000000)}M`;
    if (count >= 1000) return `${formatUnit(count, 1000)}K`;
    return formatter.format(count);
  }

  function formatUnit(count, unit) {
    const truncated = Math.floor((count / unit) * 10) / 10;
    return Number.isInteger(truncated) ? String(truncated) : truncated.toFixed(1);
  }

  function requestJson(url, callback) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "json";
    request.onload = function () {
      const data = request.response || JSON.parse(request.responseText || "null");
      callback(null, data);
    };
    request.onerror = function () {
      callback(new Error("X profile proxy request failed"));
    };
    request.send();
  }

  function loadViaProxy(username, fallback) {
    if (!proxy) {
      fallback();
      return;
    }

    const url = proxy.replace("{username}", encodeURIComponent(username));
    requestJson(url, function (error, payload) {
      if (error) {
        fallback();
        return;
      }

      const data = normalizeProfilePayload(payload);
      if (data) {
        applyProfile(username, data);
        return;
      }
      fallback();
    });
  }

  function normalizeProfilePayload(payload) {
    const data = Array.isArray(payload) ? payload[0] : payload?.user || payload?.data || payload;
    if (!data) return null;

    return {
      name: data.name,
      screen_name: data.screen_name || data.username || data.handle,
      followers_count: data.followers_count ?? data.followers,
      following_count: data.following_count ?? data.following,
      profile_image_url: data.profile_image_url || data.profile_image_url_https || data.avatar_url || data.avatar,
    };
  }

  function loadViaSyndication(username) {
    const callback = `__xProfile_${username.replace(/[^a-zA-Z0-9_]/g, "_")}_${Date.now()}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(function () {
      cleanup();
      applyZeroCounts(username);
    }, 5000);
    const params = new URLSearchParams({
      screen_names: username,
      callback,
    });

    window[callback] = function (payload) {
      const data = Array.isArray(payload) ? payload[0] : null;
      if (data) applyProfile(username, data);
      if (!data) applyZeroCounts(username);
      cleanup();
    };

    script.onerror = function () {
      applyZeroCounts(username);
      cleanup();
    };

    script.src = `${endpoint}?${params.toString()}`;
    document.head.appendChild(script);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callback];
      script.remove();
    }
  }

  usernames.forEach((username) => loadViaProxy(username, () => loadViaSyndication(username)));
})();
