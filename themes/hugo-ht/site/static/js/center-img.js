document.addEventListener('DOMContentLoaded', function () { document.querySelectorAll('main p > img:only-child').forEach(function (image) { image.parentElement.style.textAlign = 'center'; }); });
