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
		window.setTimeout(function() { $body.removeClass('is-preload'); }, 100);
	});

	if (browser.mobile) {
		$body.addClass('is-touch');
		window.setTimeout(function() { $window.scrollTop($window.scrollTop() + 1); }, 0);
	}

	breakpoints.on('<=medium', function() { $footer.insertAfter($main); });
	breakpoints.on('>medium', function() { $footer.appendTo($header); });

	if (browser.name == 'ie' || browser.mobile) settings.parallax = false;

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
		$window.on('load', function() { $window.triggerHandler('scroll'); });
	}

	$window.on('load', function() {
		$('#two').poptrox({
			caption: function($a) { return $a.next('h3').text(); },
			overlayColor: '#2c2c2c', overlayOpacity: 0.85,
			popupCloserText: '', popupLoaderText: '', selector: '.work-item a.image',
			usePopupCaption: true, usePopupDefaultStyling: false,
			usePopupEasyClose: false, usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});
	});

	// Keep the complete sidebar identical on the home, resume, portfolio, and project pages.
	$window.on('load', function() {
		var isProjectPage = document.getElementById('project-content') !== null;
		var basePath = isProjectPage ? '../' : '';
		var $inner = $('#header .inner');
		if (!$inner.length) return;

		// Remove page-specific sidebar elements so every page gets the same version.
		$inner.find('#site-nav, .sidebar-visual, #sidebar-graphic').remove();
		$inner.css({ 'position': 'relative', 'top': '-30px' });

		// Use the same identity block as the main page, including on individual project pages.
		$inner.find('h1').first().html('<strong>Mitchell Christensen<br />Global Data Analytics Lead</strong>');
		$inner.find('a.image.avatar').first().attr('href', basePath + 'index.html');

		var nav = document.createElement('nav');
		nav.id = 'site-nav';
		nav.setAttribute('aria-label', 'Page navigation');
		nav.innerHTML = '<ul>' +
			'<li><a href="' + basePath + 'index.html">Main &amp; Contact</a></li>' +
			'<li><a href="' + basePath + 'resume.html">Resume</a></li>' +
			'<li><a href="' + basePath + 'portfolio.html">Portfolio</a></li>' +
			'</ul>';
		$inner.append(nav);

		$(nav).css({
			'margin-top': '2em',
			'padding-top': '1.5em',
			'border-top': '1px solid rgba(255,255,255,0.15)'
		});
		$(nav).find('ul').css({ 'list-style': 'none', 'margin': '0', 'padding': '0' });
		$(nav).find('li').css({ 'margin': '0.75em 0' });
		$(nav).find('a').css({ 'font-size': '1.2em', 'text-decoration': 'none' });

		// Use the personal photo in every sidebar.
		var photo = document.createElement('img');
		photo.id = 'sidebar-photo';
		photo.src = basePath + 'Self Photo.jpeg';
		photo.alt = 'Mitchell Christensen';
		$inner.append(photo);
		$(photo).css({
			'display': 'block',
			'width': '150px',
			'height': '180px',
			'object-fit': 'cover',
			'margin': '2.5em auto 0',
			'border-radius': '4px'
		});
	});

	if (document.getElementById('project-content')) {
		$body.addClass('project-page');
		var stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = '../assets/css/project-enhancements.css';
		document.head.appendChild(stylesheet);
	}

})(jQuery);
