/* -----------------------------
Pre Loader
----------------------------- */
$(window).load(function() {
	'use strict';
	$('.loading-icon').delay(500).fadeOut();
	$('#preloader').delay(800).fadeOut('slow');
});

/* Morph Logo */
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 20) {
		$('body').find('img.site-name.normal').addClass('shrink');
		$('body').find('img.site-name.with-tag').addClass('morph');

	} else {
		$('body').find('img.site-name.with-tag').removeClass('morph');
		$('body').find('img.site-name.normal').removeClass('shrink');


	}
});

/* -----------------------------
Email Popup
----------------------------- */
//hide pop on page load
$('.page-pop').hide();
$('.not-email').hide();
$(document).ready(function(){

	// check for cookies to see if visitor has been here, like a boss
	if(Cookies.set('submitted-email') != 1) {
		if (Cookies.set('closed-pop') != 1) {
			// let me know if there's cookies in the jar
			console.log('no cookie');
			// function to show Popup
			// addClass('no-scroll') to body to prevent it front scrolling when add is shown
			function showPop() {
				console.log('show popup here');
				$('body').addClass('no-scroll');
				$('.page-pop').show();
			}
			// wait 5 seconds before showing popup
			setTimeout(showPop, 5000);

		} else {
			console.log('cookie exists');
		}

	} else {
		console.log('cookie exists');
	}
});

/* -----------------------------
Booking Popup
----------------------------- */
$('.booking-open').on('click', function(e) {
	e.preventDefault();

	var bookingPopUp = $('.booking-wrapper');

	bookingPopUp.addClass('active');
	$('body').addClass('dont-scroll');
})

$('.close-booking').on('click', function(e) {
	e.preventDefault();
	var bookingPopUp = $('.booking-wrapper');

	bookingPopUp.removeClass('active');
	$('body').removeClass('dont-scroll');
})


// hide popup on click, cookie is already set to 7-days so no worries
$('.close-pop').on('click', function(e){
	// since they IGNORED the response let's add a new cookie that will show in 7-days
	Cookies.set('closed-pop', '1', {expires: 7});
	console.log('cookie set');

	$('.page-pop').hide();
	$('body').removeClass('no-scroll');
});

// hide popup on submit, cookie is already set to 30-days so no worries
// also remove no-scroll from body to allow it to be able to scroll
$('#mc-embedded-subscribe').on('click', function(e){
	var validate = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	var email = $('.mc-field-group').find('.required.email').text();

	Cookies.remove('closed-pop');
	Cookies.set('submitted-email', '1', {expires: 365});
	console.log('cookie set');
	$('.not-email').hide();
	$('.page-pop').hide();
	$('body').removeClass('no-scroll');

	// check if valid email
	// since they submitted the response let's add a new cookie that will show in 365-days
	// if (validate.test(email)) {
	//
	//
	// 	Cookies.remove('closed-pop');
	// 	Cookies.set('submitted-email', '1', {expires: 365});
	// 	console.log('cookie set');
	// 	$('.not-email').hide();
	// 	$('.page-pop').hide();
	// 	$('body').removeClass('no-scroll');
	// }

	// if invalid email, let em know
	// else {
	// 	console.log('invalid');
	// 	e.preventDefault();
	// 	$('.not-email').show();
	// }

});



/* -----------------------------
Backgroung slider
----------------------------- */
$(window).ready(function() {
	'use strict';
	$.vegas('slideshow', {
	  backgrounds:[
		{ src:'images/bg-slider/bg-1.jpg', fade:1000 }
	  ]
	})();
});

/* -----------------------------
Scroll into viewPort Animation
----------------------------- */
$(document).ready(function() {
	'use strict';
	$('.animated').appear(function() {
		var element = $(this),
			animation = element.data('animation'),
			animationDelay = element.data('animation-delay');
			if ( animationDelay ) {

				setTimeout(function(){
					element.addClass( animation + " visible");
				}, animationDelay);

			} else {
				element.addClass( animation + " visible");
			}
	});
});


/* -----------------------------
SmoothScroll
----------------------------- */
smoothScroll.init();
/*------------------------------
Close NavBar On Small Screen
-------------------------------*/
$(document).ready(function () {
$(".navbar-nav li a").click(function(event) {
$(".navbar-collapse").collapse('hide');
});
});

/*-------------------------------
Magnific Popup
-------------------------------*/
$(document).ready(function() {
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title')+ '<small>by Anna</small>';
			}
		}
	});
});


/* -----------------------------
IE 9 Placeholder fix
----------------------------- */
$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur();



/* -----------------------------
Screenshot Load
----------------------------- */
$(document).ready(function() {
	'use strict';
	$('.view-project').on('click', function(e) {
		e.preventDefault();

		var href 			= $(this).attr('href') + ' .portfolio-project',
			portfolioWrap	= $('.porfolio-container'),
			contentLoaded 	= $('#portfolio-load'),
			offset			= $('#section-screenshots').offset().top;

		portfolioWrap.animate({'left':'-120%'},{duration:400,queue:false});
		portfolioWrap.fadeOut(400);
		$('html, body').animate({scrollTop: offset},{duration:800,queue:true});
		setTimeout(function(){ $('#portfolio-loader').fadeIn('fast'); },300);

		setTimeout(function(){
            contentLoaded.load(href, function(){
                $('#portfolio-loader').fadeOut('fast');
                contentLoaded.fadeIn(600).animate({'left':'0'},{duration:800,queue:false});
                $('.back-button').fadeIn(600);
            });
        },400);



	});

	$('.backToProject').on('click', function(e){
		e.preventDefault();

		var portfolioWrap	= $('.porfolio-container'),
			contentLoaded 	= $('#portfolio-load');

		contentLoaded.animate({'left':'105%'},{duration:400,queue:false}).delay(300).fadeOut(400);
        $(this).parent().fadeOut(400);
		setTimeout(function(){
            portfolioWrap.animate({'left':'0'},{duration:400,queue:false});
            portfolioWrap.fadeIn(600);
        },500);

	});

});



/* -----------------------------
BxSlider
----------------------------- */
// $(document).ready(function() {
// 	'use strict';
// 	$('.testimonial-slider').bxSlider({
// 		pagerCustom: '#bx-pager',
// 		pager: true,
// 		touchEnabled: true,
// 		controls: false
// 	});
// });


/* -----------------------------
Main navigation
----------------------------- */
$(document).ready(function() {
	'use strict';
	$('.nav').onePageNav({
		currentClass: 'current',
		scrollSpeed: 1000,
		easing: 'easeInOutQuint'
	});
	$(window).bind('scroll', function(e) {
		var scrollPos = $(window).scrollTop();
		scrollPos > 220 ? $('.sticky-section').addClass('nav-bg') : $('.sticky-section').removeClass('nav-bg');
	});
});


/* ------------------
Click For Rewards
------------------ */
$(document).ready(function(){
	$(".photo-box").click(function(){
		$(".photo-overlay").toggle();
	});
});
