(function ($) {
   /*"use strict"; */

    $.fn.pin = function (options) {
        var scrollY = 0, elements = [], disabled = false;
		var $window = $("#BRight");
		
		var TO = false; 
		var scroll_static = true;

        options = options || {};
		var prevScrollTop = $window.scrollTop(),	 nowScrollTop = $window.scrollTop(); // 스크롤체크용

		recalculateLimits = function () {


            for (var x=0, len=elements.length; x<len; x++) {
                var $this = elements[x];
				disabled = false;
     
				var $container = $this.closest(options.containerSelector);
                var containerOffset = $container.offset();
                var parentOffset = $this.offsetParent().offset();

                /*if (!$this.parent().is(".pin-wrapper")) { //상위에 없으면 추가
						$this.wrap("<div class='pin-wrapper'>");
                } */

				var mod_num=( x % 3);

				if (mod_num==0) //첫 번째 컬럼인 경우
				{
						$this.data("pin", {
							from: containerOffset.top , //시작
							to: containerOffset.top + $container.height() - $this.outerHeight() , //종료
							end: containerOffset.top + $container.height(),
							parentTop: parentOffset.top,
							row : parseInt( x / 3 )
						});

						//console.log(containerOffset.top ,  containerOffset.top + $container.height() - $this.outerHeight())
						//템프에 담아 두번째 3번째 값에 사용
						var 	tmp_data =$this.data("pin");

				}else{ //1 or 2

						//템프값 사용
						$this.data("pin", tmp_data);

						if (mod_num==2)//세번째인경우 초기화
						{
							tmp_data=""	
						}
				}

            }//for 
        };

        var onScroll = function () {
			

            if (disabled) { return; }

			var zoomRate	=$("#zoombox").val();
			var as=$window.scrollTop() * zoomRate;

			if ($window.scrollTop() > as) //100% 이하인 경우
			{

					var ws= $window.scrollTop() + ($window.scrollTop() * zoomRate ); // 현재스크롤 위치
					
					var ot= $("#tmplView1_top").offset().top+ ($("#tmplView1_top").offset().top* zoomRate );
					var topmargin=60*zoomRate;
					
					//var ws=$window.scrollTop();
					//var ot=$("#tmplView1_top").offset().top
					//var topmargin=60

			}else{

					var ws=$window.scrollTop();
					var ot=$("#tmplView1_top").offset().top
					var topmargin=60
			}

            scrollY = (ws+ ot + topmargin); //상단마진 추가
		

			nowScrollTop = $($window).scrollTop();
			
			console.log(nowScrollTop)

			var elmts = [];

            for (var k=0, len=elements.length; k<len; k++) {          
				
                var $this = $(elements[k]),
                    data  = $this.data("pin");

                if (!data) { // Removed element
                  continue;
                }

                elmts.push($this); 

				var from = data.from;
                var  to = data.to;
				var newTop=scrollY - from;

				if (from + $this.outerHeight() > data.end) {
                    $this.css('position', '');
                    continue;
                }
					
                if (from < scrollY && to > scrollY) { //아직 보일때	

				//			!($this.css("position") == "fixed") && $this.css({ top: newTop }).css("position", "relative");
							!($this.css("position") == "fixed") && $($this ).animate({ "top": newTop  }, "fast" ).css("position", "relative");
							if (options.activeClass) { $this.addClass(options.activeClass); }

                } else if ((scrollY) >= to) { //숨김처리할때
							/*
							$this.css({ left: "", top: to - data.parentTop
							}).css("position", "relative");
							if (options.activeClass) { $this.addClass(options.activeClass); }
							*/
                } else { // 원래 보일떄 
							
							$this.css({position: "", top: "", left: ""});
							if (options.activeClass) { $this.removeClass(options.activeClass); }
						
                }
          }
		 
		  prevScrollTop = nowScrollTop;
          elements = elmts;
		  scroll_static = true;
			

        };

        var update = function () { recalculateLimits(); onScroll(); };

        this.each(function () {
			
            var $this = $(this), 
                data  = $(this).data('pin') || {};

            if (data && data.update) { return; }
            elements.push($this);
            //$("img", this).one("load", recalculateLimits);
            data.update = update;
            $(this).data('pin', data);
			
        });


		 var lastScrollLeft = 0;
		 $window.scroll (function () {
			var documentScrollLeft = $window.scrollLeft();

			if (lastScrollLeft != documentScrollLeft) {//수평스크롤 제외
				lastScrollLeft = documentScrollLeft;
			}else{
					if( scroll_static ){
						scroll_static = false;
					}

					if(TO !== false){ clearTimeout(TO); }           
					  TO = setTimeout(onScroll, 200); //200분에 1초마다 호출
			}

		});
		
      //  $window.resize(function () { recalculateLimits(); });
        recalculateLimits();
        $window.load(update);
        return this;
      };


})(jQuery);



(function(){

    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function() {

            var timer,
                handler =  function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }

                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);

                };

          //  jQuery(this).bind('scroll', handler).data(uid1, handler);
		  $("#BLeft_Inner").bind('scroll', handler).data(uid1, handler);

        },
        teardown: function(){
           // jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
			 $("#BLeft_Inner").unbind( 'scroll', jQuery(this).data(uid1) );
        }


    };

    special.scrollstop = {
        latency: 300,
        setup: function() {

            var timer,
                handler = function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout( function(){
							timer = null;
							evt.type = 'scrollstop';
							jQuery.event.handle.apply(_self, _args);
                    }, special.scrollstop.latency);
                };

          //  jQuery(this).bind('scroll', handler).data(uid2, handler);
			 $("#BLeft_Inner").bind('scroll', handler).data(uid2, handler);


        },
        teardown: function() {
           // jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
			 $("#BLeft_Inner").unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };

})();