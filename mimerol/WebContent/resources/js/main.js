$(document).ready(function() {

  $(window).load(function(){
    $('.form-input input').on('focus blur', function (e) {
        $(this).parents('.form-input').toggleClass('active', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  });
    //
    $("#sticker").sticky({
        topSpacing: 78,
        bottomSpacing: 510
    });
    $("#sticker2").sticky({
        topSpacing: 100,
        bottomSpacing: 550
    });
    $("#sticker3").sticky({
        topSpacing: 100
    });


    // quantity
    var incrementPlus;
    var incrementMinus;

    var buttonPlus = $(".cart-qty-plus");
    var buttonMinus = $(".cart-qty-minus");

    var incrementPlus = buttonPlus.click(function() {
        var $n = $(this)
            .parent(".button-container")
            .parent(".quantity-container")
            .find(".qty");
        $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function() {
        var $n = $(this)
            .parent(".button-container")
            .parent(".quantity-container")
            .find(".qty");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount - 1);
        }
    });
    /* menu left and right */
    $(function() {
        $(document).bind("beforecreate.offcanvas", function(e) {
            var dataOffcanvas = $(e.target).data('offcanvas-component');
            console.log(dataOffcanvas);
            dataOffcanvas.onInit = function() {
                console.log(this);
            };
        });
        $(document).bind("create.offcanvas", function(e) {
            var dataOffcanvas = $(e.target).data('offcanvas-component');
            console.log(dataOffcanvas);
            dataOffcanvas.onOpen = function() {
                console.log('Callback onOpen');
            };
            dataOffcanvas.onClose = function() {
                console.log('Callback onClose');
            };

        });
        $(document).bind("clicked.offcanvas-trigger clicked.offcanvas", function(e) {
            var dataBtnText = $(e.target).text();
            console.log(e.type + '.' + e.namespace + ': ' + dataBtnText);
        });
        $(document).bind("open.offcanvas", function(e) {
            var dataOffcanvasID = $(e.target).attr('id');
            console.log(e.type + ': #' + dataOffcanvasID);
        });
        $(document).bind("resizing.offcanvas", function(e) {
            var dataOffcanvasID = $(e.target).attr('id');
            console.log(e.type + ': #' + dataOffcanvasID);
        });
        $(document).bind("close.offcanvas", function(e) {
            var dataOffcanvasID = $(e.target).attr('id');
            console.log(e.type + ': #' + dataOffcanvasID);
        });
        $('#right').bind("create.offcanvas", function(e) {
            var dataOffcanvas = $(this).data('offcanvas-component');
            setTimeout(function() {
                //dataOffcanvas.open();
            }, 500);

        });

        $('#left').offcanvas({
            modifiers: "left,overlay",
            triggerButton: '.js-left'
        });
        $(document).trigger("enhance");
    });

    /* fix header top */
    $(function() {
        var cubuk_seviye = $(document).scrollTop();
        var header_yuksekligi = $('.header-top').outerHeight();

        $(window).scroll(function() {
            var kaydirma_cubugu = $(document).scrollTop();

            if (kaydirma_cubugu > header_yuksekligi) {
                $('.header-top').addClass('gizle');
            } else {
                $('.header-top').removeClass('gizle');
            }

            if (kaydirma_cubugu > cubuk_seviye) {
                $('.header-top').removeClass('sabit');
            } else {
                $('.header-top').addClass('sabit');
            }

            cubuk_seviye = $(document).scrollTop();
        });
    });
    /* search */
    $('.cd-primary-nav-trigger').on('click', function() {
        $('.cd-primary-nav-trigger').toggleClass('is-clicked');
        $('.cd-header').toggleClass('menu-is-open');


        if ($('.cd-primary-nav').hasClass('is-visible')) {
            $('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').addClass('overflow-hidden');
            });
        }
    });
    /* Navbar */
    var menu = $('.navbar');
    $(window).bind('scroll', function(e) {
        if ($(window).scrollTop() > 140) {
            if (!menu.hasClass('open')) {
                menu.addClass('open');
            }
        } else {
            if (menu.hasClass('open')) {
                menu.removeClass('open');
            }
        }
    });


    /* scrolling */
    if (!window.console) console = {
        log: function() {}
    };

    // The actual plugin
    $('.nav .nav_dotted').singlePageNav({
        offset: $('.nav .nav_dotted').outerHeight(),
        filter: ':not(.external)',
        updateHash: true,
        beforeStart: function() {
            console.log('begin scrolling');
        },
        onComplete: function() {
            console.log('done scrolling');
        }
    });
    /* slider what say */

    $('.bxslider').bxSlider({
        mode: 'vertical',
        minSlides: 3,
        maxSlides: 3,
        adaptiveHeight: true,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true,
    });

    /* animation */
    wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false // trigger animations on mobile devices (true is default)
    });
    wow.init();

});


/*accordion bs-collapse*/

$(document).ready(function() {
    $('.collapse.in').prev('.panel-heading').addClass('active');
    $('#accordion, #bs-collapse')
        .on('show.bs.collapse', function(a) {
            $(a.target).prev('.panel-heading').addClass('active');
        })
        .on('hide.bs.collapse', function(a) {
            $(a.target).prev('.panel-heading').removeClass('active');
        });
});


/* price */
$(document).ready(function() {
    $("#slider_price").slider({
        range: true,
        min: 0,
        max: 500,
        values: [120, 380],
        slide: function(event, ui) {
            $("#app_min_price").text(ui.values[0] + "$");
            $("#app_max_price").text(ui.values[1] + "$");
        },
        stop: function(event, ui) {
            var nr_total = getEstatesNumber(ui.values[0], ui.values[1]);
            $("#number_results").text(nr_total);
        },
    });
    $("#app_min_price").text($("#slider_price").slider("values", 0) + "$");
    $("#app_max_price").text($("#slider_price").slider("values", 1) + "$");
});


// same hieght //


equalheight = function(container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(window).load(function() {
    equalheight('.product');
});


$(window).resize(function() {
    equalheight('.product');
});


/* dropdown */


$(document).ready(function() {
    $('select').niceSelect();
});

/* sticker */
$(document).ready(function(){
 	 // on click signup It Hide Login Form and Display Registration Form
	 $("#signup").click(function(){
       $("#first").slideUp("fast", function(){
		  $("#second").slideDown("fast");
	   });
	 });

	 // on click signin It Hide Registration Form and Display Login Form
     $("#signin").click(function(){
       $("#second").slideUp("fast",function(){
	      $("#first").slideDown("fast");
	   });
	 });

});
