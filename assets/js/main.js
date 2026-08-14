/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {
				parallax: true,
				parallaxFactor: 20
			};

	breakpoints({
		xlarge:  [ '1281px',  '1800px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '481px',   '736px'  ],
		xsmall:  [ null,      '480px'  ],
	});

	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	if (browser.mobile) {
		$body.addClass('is-touch');
		window.setTimeout(function() {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);
	}

	breakpoints.on('<=medium', function() {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function() {
		$footer.appendTo($header);
	});

	if (browser.name == 'ie' || browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {
		breakpoints.on('<=medium', function() {
			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');
		});

		breakpoints.on('>medium', function() {
			$header.css('background-position', 'left 0px');
			$window.on('scroll.strata_parallax', function() {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});
		});

		$window.on('load', function() {
			$window.triggerHandler('scroll');
		});
	}

	$window.on('load', function() {
		$('#two').poptrox({
			caption: function($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image',
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});
	});

	// Standardize sidebar navigation and visual treatment across every page.
	$window.on('load', function() {
		var isProjectPage = document.getElementById('project-content') !== null;
		var $nav = $('#site-nav');
		var homePath = isProjectPage ? '../index.html' : 'index.html';
		var resumePath = isProjectPage ? '../resume.html' : 'resume.html';
		var portfolioPath = isProjectPage ? '../portfolio.html' : 'portfolio.html';

		if ($nav.length) {
			$nav.html('<ul>' +
				'<li><a href="' + homePath + '">Main &amp; Contact</a></li>' +
				'<li><a href="' + resumePath + '">Resume</a></li>' +
				'<li><a href="' + portfolioPath + '">Portfolio</a></li>' +
				'</ul>');
		} else if (isProjectPage) {
			var nav = document.createElement('nav');
			nav.id = 'site-nav';
			nav.setAttribute('aria-label', 'Page navigation');
			nav.innerHTML = '<ul>' +
				'<li><a href="' + homePath + '">Main &amp; Contact</a></li>' +
				'<li><a href="' + resumePath + '">Resume</a></li>' +
				'<li><a href="' + portfolioPath + '">Portfolio</a></li>' +
				'</ul>';
			var inner = document.querySelector('#header .inner');
			if (inner) inner.appendChild(nav);
			$nav = $(nav);
		}

		var $inner = $('#header .inner');
		if ($inner.length && !$inner.find('.sidebar-visual').length) {
			var basePath = isProjectPage ? '../' : '';
			$inner.append('<img class="sidebar-visual" src="' + basePath + 'images/sidebar-data.svg" alt="Data analytics graphic" />');
		}

		if ($nav.length) {
			$nav.css({
				'margin-top': '2em',
				'padding-top': '1.5em',
				'border-top': '1px solid rgba(255,255,255,0.15)'
			});
			$nav.find('ul').css({ 'list-style': 'none', 'margin': '0', 'padding': '0' });
			$nav.find('li').css({ 'margin': '0.75em 0' });
			$nav.find('a').css({ 'font-size': '1.2em', 'text-decoration': 'none' });
		}

		$('.sidebar-visual').css({
			'display': 'block',
			'width': '100%',
			'max-width': '260px',
			'height': 'auto',
			'margin': '2.75em auto 0',
			'opacity': '0.85'
		});
	});

	// Project pages use the same visual language as the resume and portfolio.
	if (document.getElementById('project-content')) {
		$body.addClass('project-page');
		var stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = '../assets/css/project-enhancements.css';
		document.head.appendChild(stylesheet);
	}

	// Legacy project posts reference images hosted outside the repository.
	// When one of those external images is unavailable, fall back to the
	// locally stored project thumbnail so the page never shows a broken image.
	$window.on('load', function() {
		if (!document.getElementById('project-content')) return;

		var title = (document.title || '').toLowerCase();
		var fallback = title.indexOf('spotify') !== -1
			? '../images/fulls/01.jpg'
			: '../images/fulls/02.jpg';

		$('#project-content img').each(function() {
			this.addEventListener('error', function() {
				if (this.dataset.fallbackApplied) return;
				this.dataset.fallbackApplied = 'true';
				this.src = fallback;
				this.alt = 'Project image unavailable; showing project preview.';
			});
		});
	});

})(jQuery);
