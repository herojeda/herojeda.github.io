
!(function($) {
    "use strict";

    const urlParams = new URLSearchParams(window.location.search);

    // Language switcher
    const defaultLanguage = 'es';
    const msgs = messages;
    function getLanguage() {
        let language = urlParams.get('lang');
        if (language === null) {
            language = defaultLanguage;
        }
        return language;
    }

    $(".lang-switch").click(function () {
        const lang = urlParams.get("lang");
        const language = $(this).data('language');
        location.href = `index.html?lang=${language}`;
    });

    $(window).on('load', function() {
        const language = getLanguage();

        $('.write-msg').map(function () {
            const element = $(this);
            const messageKey = element.data('msg-key');
            element.text(msgs[language][messageKey])
        })
    });

    // Hero typed
    const typed = $('.typed');
    if (typed.length) {
        const language = getLanguage();
        let typed_strings = msgs[language]['hero-typed-items'];
        typed_strings = typed_strings.split(',');
        console.log(language)
        console.log(typed_strings);
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.sidebar-menu a, .scrollto', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {

                const scrollto = target.offset().top;

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.sidebar-menu, .mobile-nav').length) {
                    $('.sidebar-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                const body = $('body');
                if (body.hasClass('mobile-nav-active')) {
                    body.removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                }
                return false;
            }
        }
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out-back",
            once: true
        });
    }
    $(window).on('load', function() {
        aos_init();
    });

    // Sidebar dropdown
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown")
                .removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

})(jQuery);
