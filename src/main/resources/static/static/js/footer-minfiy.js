$(document).ready(function () {
  $(".header").find(".user-name").hide();
  var e = $(window).width();
  $(".menu-trigger").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault(),
        $(this).toggleClass("active-" + (i + 1)),
        $(".header").toggleClass("active"),
        $(this).siblings(".menu-wrapper").toggleClass("d-block"),
        $(this).siblings(".user-name").toggle(),
        $(this).siblings(".logo").toggle(),
        $(".nav").children("li").children("button").addClass("d-flex");
    }),
      e > 1200
        ? $(window).resize(function () {
          $(".header").removeClass("active"),
            $(".header")
              .find(".menu-trigger")
              .removeClass("active-" + (i + 1)),
            $(".header").find(".menu-wrapper").hide().removeClass("d-block"),
            $(".header").find(".user-name").hide(),
            $(".header").find(".logo").show(),
            $(".nav").children("li").children("button").removeClass("d-flex");
        })
        : $(window).resize(function () {
          $(".header").removeClass("active"),
            $(".header")
              .find(".menu-trigger")
              .removeClass("active-" + (i + 1)),
            $(".header").find(".menu-wrapper").removeClass("d-block"),
            $(".header").find(".user-name").hide(),
            $(".header").find(".logo").show(),
            $(".nav").children("li").children("button").removeClass("d-flex");
        }),
      $(".nav")
        .children("li")
        .children("button")
        .click(function (e) {
          e.preventDefault(),
            $(this).toggleClass("active"),
            $(this).siblings(".mega-menu").slideToggle(300);
        });
  });

  var hederSliderOwl = $("#header-slider .owl-carousel");
  hederSliderOwl.owlCarousel({
    loop: !0,
    margin: 20,
    nav: !1,
    dots: !1,
    center: !false,
    autoplay: !0,
    autoplaySpeed: 2500,
    autoplayTimeout: 2500,
    autoplayHoverPause: !0,
    responsiveClass: !0,
    animateIn: 'linear', 
    animateOut: 'linear',
    responsive: {
      0: { items: 2 },
      1090: { items: 3 },
      1450: { items: 4 },
    },
    onDragged: callback
  });

  function callback(event) {
    hederSliderOwl.trigger('stop.owl.autoplay');
  }
});
