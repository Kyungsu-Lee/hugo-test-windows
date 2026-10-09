document.addEventListener("DOMContentLoaded", function () {
  var article = document.querySelector(".article-content");
  if (!article) {
    return;
  }

  var blocks = article.querySelectorAll(".highlight, pre:has(> code)");
  blocks.forEach(function (block) {
    if (block.closest(".highlight") !== block && block.closest(".highlight")) {
      return;
    }

    block.classList.add("code-block");
    if (block.querySelector(".code-copy-btn")) {
      return;
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-btn";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.textContent = "Copy";
    block.prepend(button);

    button.addEventListener("click", function () {
      var text = getCodeText(block);
      if (!text) {
        return;
      }

      copyText(text)
        .then(function () {
          showCopied(button);
        })
        .catch(function () {
          button.textContent = "Failed";
          window.setTimeout(function () {
            button.textContent = "Copy";
          }, 2000);
        });
    });
  });
});

function getCodeText(block) {
  var code = block.querySelector("code");
  if (!code) {
    return (block.textContent || "").trim();
  }

  var lines = code.querySelectorAll(".line");
  if (lines.length) {
    return Array.from(lines)
      .map(function (line) {
        return line.textContent.replace(/\u00a0/g, " ");
      })
      .join("\n")
      .trim();
  }

  return code.textContent.replace(/\u00a0/g, " ").trim();
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function (resolve, reject) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      resolve();
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
}

function showCopied(button) {
  var original = "Copy";
  button.textContent = "Copied!";
  button.classList.add("is-copied");
  window.setTimeout(function () {
    button.textContent = original;
    button.classList.remove("is-copied");
  }, 2000);
}
