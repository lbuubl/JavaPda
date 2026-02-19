$(document).ready(function () {
  var $status = $(".paging-info");
  var $slickElement = $(".about-slider");

  $slickElement.on("init reInit afterChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    // $status.text(i + '/' + slick.slideCount);
    $status.html(
      '<span class="font-weight-bold">' + i + "</span>/" + slick.slideCount
    );
  });

  //   $(".about-slider").slick({
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     speed: 1e3,
  //     dots: !0,
  //     // customPaging: function (e, n) {
  //     //     return e.slickCurrentSlide + "/" + (n + 1)
  //     // },
  //     arrows: !0,
  //     prevArrow: $(".prev"),
  //     nextArrow: $(".next"),
  //     autoplay: !0,
  //     autoplaySpeed: 2e3,
  //     fade: !1,
  //     centerMode: !1,
  //     centerPadding: "0px",
  //   });

  $(".about-slider").owlCarousel({
    loop: !0,
    margin: 40,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    autoplaySpeed: 1500,
    autoplayTimeout: 2500,
    autoplayHoverPause: !0,
    responsiveClass: !0,
    // items: 4,
    responsive: {
      0: { items: 2 },
      1090: { items: 3 },
      1450: { items: 4 },
    },
  });
  $(".owl-dot").each(function () {
    $(this)
      .children("span")
      .text($(this).index() + 1);
  });

  // var e = $(".paging-info");
  // $(".about-slider").on("init reInit afterChange", function (n, o, t, r) {
  //     var a = (t || 0) + 1;
  //     e.html('<span class="font-weight-bold">' + a + "</span>/" + o.slideCount)
  // });
});
