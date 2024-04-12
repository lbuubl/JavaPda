$(document).ready(function () {
  AOS.init(),
    $('[data-toggle="tooltip"]').tooltip(),
    $("#fullpage").fullpage({
      autoScrolling: !0,
      scrollHorizontally: !0,
      anchors: ["intro", "project", "video", "about", "service", "footer"],
      navigation: !0,
      navigationPosition: "left",
      navigationTooltips: [
        "intro",
        "project",
        "video",
        "about",
        "service",
        "footer",
      ],
      showActiveTooltip: false,
      afterLoad: function (o, e) {
        console.log("afterLoad");
        // console.log(e),
        //   $("body").hasClass("fp-viewing-video") &&
        //     $("body").hasClass("temp") &&
        //     (console.log("YTPlayer Start"),
        //     jQuery(function () {
        //       jQuery("#background-video").YTPlayer();
        //     }),
        //     $("body").removeClass("temp"));

        $(".header").addClass("sticky");
        // console.log('add sticky');
      },
      onLeave: function (o) {
        console.log("onLeave");
        console.log("anchors", this.anchors);
        // if (this.anchors == "video") {
        if ($("body.fp-viewing-video")) {
          //   $("body").on("click", function () {
          //     $.fn.fullpage.moveSectionDown();
          //   });
          //   console.log("video 섹션에서만 로그 찍기");
          //   $(document).on("click", "#moveDown", function () {
          //     fullpage_api.moveSectionDown();
          //   });
        }
      },
      onSlideLeave: function (o, e, t, a) {
        console.log(o + "/" + e + "/" + t + "/" + a);
      },
    });

  //   var $status = $(".paging-info");
  //   var $slickElement = $("#intro-slider");

  //   $slickElement.on("init reInit afterChange", function (
  //     event,
  //     slick,
  //     currentSlide,
  //     nextSlide
  //   ) {
  //     //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
  //     var i = (currentSlide ? currentSlide : 0) + 1;
  //     // $status.text(i + '/' + slick.slideCount);
  //     $status.html(
  //       '<span class="font-weight-bold">' + i + "</span>/" + slick.slideCount
  //     );
  //   });

  ($("link[id=css_sub]")[0].disabled = !0),
    $("#intro-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1e3,
      dots: true,
      // customPaging: function (o, e) {
      //     $(o.$slides[e]).data();
      //     return '<a class="text-danger">' + e + "</a>";
      // },

      // customPaging: function (slider, i) {
      //     var slide = slider.$slides[i],
      //         pagination = $(slide).data('title');
      //     return '<div>' + pagination + '</div>';
      // },
      arrows: true,
      //   prevArrow: $(".prev"),
      //   nextArrow: $(".next"),
      autoplay: !0,
      autoplaySpeed: 2e3,
      fade: !0,
    });

  // var o = $(".paging-info");
  // $("#intro-slider").on("init reInit afterChange", function (e, t, a, i) {
  //     console.log('paging info');
  //     var s = (a || 0) + 1;
  //     o.html('<span class="font-weight-bold">' + s + "</span>/" + t.slideCount);
  // }),
  var projectSliderOwl = $("#project-slider");

  projectSliderOwl.owlCarousel({
    loop: !0,
    margin: 40,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    autoplaySpeed: 5000,
    autoplayTimeout: 4990,
    autoplayHoverPause: !0,
    responsiveClass: !0,
    responsive: {
      0: { items: 1.8 },
      1090: { items: 3.8 },
      1450: { items: 4.8 },
    },
    onDragged: callback
  });

  function callback(event) {
    projectSliderOwl.trigger('stop.owl.autoplay');
  }

  $("#about-slider").slick({
    slidesToShow: 1,
    centerMode: !0,
    speed: 1e3,
    dots: !1,
    arrows: !1,
    autoplay: !0,
    autoplaySpeed: 2e3,
    fade: !0,
  });
});

$(".section.video iframe").each(function () {
  var url = $(this).attr("src");
  if ($(this).attr("src").indexOf("?") > 0) {
    $(this).attr({
      src: url + "&wmode=transparent",
      wmode: "Opaque",
    });
  } else {
    $(this).attr({
      src: url + "?wmode=transparent",
      wmode: "Opaque",
    });
  }
});

jQuery(function () {
  jQuery("#background-video").YTPlayer();
});

// Project marquee
(function ($) {
  $(function () {
    //$(".prj-scroller").simplyScroll({ pauseOnHover: true });
  });
})(jQuery);

/* iframe scroll */
$('.play-video').on('click', function() {
    $(this).toggleClass("on");
    if($(this).hasClass("on")){            
        $("#video-iframe")[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');
        //$(this).css("z-index","1");
    }else{
        $("#video-iframe")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
        //$(this).css("z-index","-1");
    }
});