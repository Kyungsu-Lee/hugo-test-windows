document.addEventListener("DOMContentLoaded", function () {
  var toc = document.querySelector(".table-of-contents");
  if (!toc) {
    return;
  }

  var links = toc.querySelectorAll('a[href^="#"]');
  var headings = Array.from(links)
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if (!headings.length || !("IntersectionObserver" in window)) {
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
  );

  headings.forEach(function (heading) {
    observer.observe(heading);
  });
});
