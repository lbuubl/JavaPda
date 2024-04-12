/*미사용*/
(function ($) {

    var methods = {
        _download: function (options) {
            var triggerDelay = (options && options.delay) || 100;
            var cleaningDelay = (options && options.cleaningDelay) || 10000;

            this.each(function (index, item) {
                methods._createIFrame(item, index * triggerDelay, cleaningDelay);
            });
            return this;
        },

        _createIFrame: function (item, triggerDelay, cleaningDelay) {
            setTimeout(function () {
                var frame = $('<iframe !style="display: none;" class="multi-download-frame" name="frame_'+$(item).attr('FileSeq')+'" id="frame_'+$(item).attr('FileSeq')+'"></iframe>');
             //   frame.attr('src', $(item).attr('href') || $(item).attr('src'));
			  //  frame.attr('src', "/Common/Download.do?Fsn="+$(item).attr('FileSeq'));

				  $("#iframe_div").append(frame);
				  $("#fsn").val($(item).attr('FileSeq'));
				  $("#fileDownForm").attr("target", "frame_"+$(item).attr('FileSeq'));
				  $("#fileDownForm").attr("method", "post");
				  $("#fileDownForm").attr("action", "/Common/Download.do");
				  $("#fileDownForm").submit();
	  	
				 // CompleteChk($(item).attr('FileSeq'), $("#ssid").val());
				//setTimeout(function () { frame.remove(); }, cleaningDelay);
            }, triggerDelay);
        }
    };
	
    $.fn.multiDownload = function(options) {
        return methods._download.apply(this, arguments);
    };

})(jQuery);


//-----------------------------------------------------------------------------------------------------------------------//	
	function CompleteChk(Fsn, ssid){
		//  eval("fileTimer"+Fsn+ssid+"") = window.setInterval(function () {
		  iTime= window.setInterval(function () {

		//  var SSckvalue = $.cookie('ssn'+Fsn+ssid); //서버에서 생성된 쿠키값이 파일일련번호과 같은게 있는지 확인
		  var SSckvalue =	getCookie('ssn'+Fsn+ssid);
		  console.log('ssn'+Fsn+ssid+"="+SSckvalue);

		  if (SSckvalue == Fsn){
			  $("#frame_"+Fsn).remove();//프레임삭제
			   window.clearInterval(iTime); //완료된 체크반복은 삭제
			   console.log('ssn'+Fsn+ssid+" 완료: "+Fsn);
		  }else{
			  console.log('ssn'+Fsn+ssid+"진행중:"+Fsn);
		  }
		}, 1000);
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

