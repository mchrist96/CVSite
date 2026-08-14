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
		var $nav = $('#site-nav');
		if ($nav.length) {
			$nav.html('<ul>' +
				'<li><a href="index.html">Main &amp; Contact</a></li>' +
				'<li><a href="resume.html">Resume</a></li>' +
				'<li><a href="portfolio.html">Portfolio</a></li>' +
			'</ul>');
		}

		var isProjectPage = document.getElementById('project-content') !== null;
		if (!$nav.length && isProjectPage) {
			var nav = document.createElement('nav');
			nav.id = 'site-nav';
			nav.setAttribute('aria-label', 'Page navigation');
			nav.innerHTML = '<ul>' +
				'<li><a href="../index.html">Main &amp; Contact</a></li>' +
				'<li><a href="../resume.html">Resume</a></li>' +
				'<li><a href="../portfolio.html">Portfolio</a></li>' +
			'</ul>';
			var inner = document.querySelector('#header .inner');
			if (inner) inner.appendChild(nav);
		}

		var $inner = $('#header .inner');
		if ($inner.length && !$inner.find('.sidebar-visual').length) {
			var basePath = isProjectPage ? '../' : '';
			$inner.append('<img class="sidebar-visual" src="' + basePath + 'images/sidebar-data.svg" alt="Data analytics graphic" />');
		}
	});

	// Project pages use the same visual language as the resume and portfolio.
	if (document.getElementById('project-content')) {
		$body.addClass('project-page');
		var stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = '../assets/css/project-enhancements.css';
		document.head.appendChild(stylesheet);
	}

})(jQuery);
