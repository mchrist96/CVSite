(function() {
    window.addEventListener('load', function() {
        var projectContent = document.getElementById('project-content');
        if (!projectContent) return;

        var title = (document.title || '').toLowerCase();
        var fallback = title.indexOf('spotify') !== -1
            ? '../images/fulls/01.jpg'
            : '../images/fulls/02.jpg';

        projectContent.querySelectorAll('img').forEach(function(img) {
            img.addEventListener('error', function() {
                if (img.dataset.fallbackApplied === 'true') return;
                img.dataset.fallbackApplied = 'true';
                img.src = fallback;
                img.alt = 'Project image unavailable; showing project preview.';
            });
        });
    });
})();
