	var cWidth, cHeight, cBrower, isBrowser, datepicker_locale, uuidUpdateYn
	uuidUpdateYn=false;

//----------------------------------------------------------------------------------

function loadUploadLanJS(lan){ //파일업로드 다국어 처리
	var src = "/resources/module/assets/js/plugins/uploaders/locales/"+lan+".js";
	//console.log(src);
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", lan);
}

function loadJS(path){ //파일업로드 다국어 처리
	var fileref=document.createElement('script');

	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", path);
	//console.log(path);
}


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile=true;
}else{
		isMobile=false;
}

var Browser = {
   chk : navigator.userAgent.toLowerCase()
 }

 Browser = {
	  ie : Browser.chk.indexOf('msie') != -1,
	  ie6 : Browser.chk.indexOf('msie 6') != -1,
	  ie7 : Browser.chk.indexOf('msie 7') != -1,
	  ie8 : Browser.chk.indexOf('msie 8') != -1,
	  ie9 : Browser.chk.indexOf('msie 9') != -1,
	  ie10 : Browser.chk.indexOf('msie 10') != -1,
	  ie11 : Browser.chk.indexOf('trident/7.0') != -1,
	  opera : !!window.opera,
	  safari : Browser.chk.indexOf('safari') != -1,
	  safari3 : Browser.chk.indexOf('applewebkir/5') != -1,
	  mac : Browser.chk.indexOf('mac') != -1,
	  chrome : Browser.chk.indexOf('chrome') != -1,
	  firefox : Browser.chk.indexOf('firefox') != -1
 }

if ((Browser.ie6) || (Browser.ie7) || (Browser.ie8) ||(Browser.ie9) || (Browser.ie10) || (Browser.ie11)) {
	isBrowser="ie";
}else if (Browser.chrome){
	isBrowser="ch";
}else{
	isBrowser="etc";
}

CurentSize();

function CurentSize(){
	cWidth=$( window ).width();
	cHeight=$( window ).height();
}



// 세션 유지 스크립트 주석처리
/*
	ㄱ. session timeout  무제한으로  적용안되면..  ( 세션 유지 스크립트 주석처리 )
	ㄴ. LoginSuccessHandler 에서 24시간으로 처리... ( ㄱ. 반영안되면 )
	ㄷ. 세션 유지 스크립트 개발 ( ㄴ.반영 안되면 )

	 1.  서버(Tomcat) 설정 변경
	     D:\roi_framework\apache-tomcat-9.0.21\conf\web.xml 수정
				<session-config>
				    <!-- <session-timeout>30</session-timeout> -->
				    <session-timeout>-1</session-timeout>
				</session-config>
	 2. Spring Boot 설정 변경
		server.servlet.session.timeout : -1   #   36000  = 10시간  : 60 * 60 * 10

var reCalltime, RockYn=false;
const IntervalTime=1080000; // 360000= 6min
//if (location.href.indexOf("login.page")==-1)
if (location.href.indexOf("login")==-1)
{
	reCalltime=setInterval("ajaxCall()", IntervalTime); // 6min
}else{
}

// 로그인 처리인 경우.
//if (location.href.indexOf("login.page")==-1)//로그인 상태
if (location.href.indexOf("loginResult")>0 )//로그인 상태
{
		//모바일 연결상태 체크
		if (isMobile){
			document.addEventListener("visibilitychange", handleVisibilityChange, false);
		}

		//화면잠금에 대한 연결유지스크립트
		function handleVisibilityChange() {

			  if (document.visibilityState == "hidden") {
						clearInterval(reCalltime);
						RockYn=true;
			  } else  {
						ajaxCall();
						reCalltime=setInterval("ajaxCall()", IntervalTime);
						RockYn=true;
			  }
		}
		//메신저로 연결시..UUID업데이트   **  MOVE loginResult.jsp
		//MessengerYn=getCookie("RunMode_chk");

		//if (!uuidUpdateYn && MessengerYn=="Messenger")
		//if (MessengerYn)//메신저로 연결된 경우만..
		//{
		//	if (!uuidUpdateYn && MessengerYn!="")
		//	{

						//uuid업데이트 sessionID로..
		//				$.ajax({
		//					url: "/common/uuidUpdate.do",
		//					type: "POST",
		//					data : "uuid="+localStorage.getItem('uuid'),
		//					datatype: 'html',
		//					success: function(data) {

		//						if (data=="s")
		//						{
		//							uuidUpdateYn=true;
		//							deleteCookie("RunMode_chk");
		//						}else{
		//							uuidUpdateYn=false;
		//						}

		//					},
		//					error: function(XMLHttpRequest, textStatus, errorThrown) {
		//							//console.log("uuid update xx");
		//					},
		//					cache: false
		//				 });
		//	}
		//}
		//메신저로 연결시..UUID업데이트   **  MOVE loginResult.jsp
}

function ajaxCall() {

	$.ajax({
		url: '/common/none.page?ssid='+Math.random(),   // @TODO 일단 제외..
		type: "POST",
		data : "uuid="+localStorage.getItem('uuid'),
		datatype: 'html',
		success: function(data) {

			if (data=="f")
			{
				setCookie("lastChkTime",  CallgetTime());
				//alert("사용자 접속이 만료되었습니다.");
				//location.href="/login";
			}else if(data=="s"){
				//console.log("접속 중");
				setCookie("lastChkTime",  CallgetTime());
			}else{
				//console.log("접속종료");
				alert("사용자 접속이 만료되었습니다."+data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("사용자 접속이 만료되었습니다.[err="+textStatus+"]");

		},
		cache: false
	 });
}
*/


// function.do  > InjecReData 에서 치환한 문자 역치환, 2016-11-29, 김영식
function reInjecReData(sString){
	var temp = ""

	temp = sString.trim();
	temp = temp.replace(/&#39;/gi, "'");

	return temp;
}

function userLoad(){

			//$('#user_modal').load("/module/userInfo.page", function() {
			$('#user_modal').load("/user/userInfo", function() {

				  $('.select').select2();
				  $('#bDay').daterangepicker({
						locale: datepicker_locale,  //다국어 js에 선언
						singleDatePicker: true,
						autoUpdateInput: false,
						showDropdowns: true,
						//minDate: '1900-01-01'
						minDate: moment().subtract(100, 'years'),
						maxDate: moment().add(5, 'years')
				  },
					function(start, end, label) {
						$("#bDay").val(start.format('YYYY-MM-DD'));
					});

				   $('#bDay').focus(function(){//생일달력 이동
							$(".daterangepicker").css("top", "50px");
				   });

					$(".file-Choice").uniform({
							fileButtonClass: 'action btn bg-blue'
					});

					$(".file-Choice").next().html(i18next.t("common:F.NoChoiceFile"));
					$(".file-Choice").next().next().html(i18next.t("common:F.ChoiceFile"));

					userCheck();

					$(this).localize();				//다국어 반영

					var $sigdiv = $("#signature").jSignature({'UndoButton':true});
						$('#SignUse').on('click', function (e) {
							var data = $sigdiv.jSignature('getData', 'default')
								if (data.length<=2082)//300*200 png 기준
								{
									alert(i18next.t("common:UserInfo.msg.noSingnWrite"));
								}else{
									$("#SignBase64").text(data);
									$("#userSign").attr("src", data);

									$("#signbox").hide();
									$("#userinfoFooter").show();
									$("#userinfoitem .form-group").show();
								}
						});

						$('#SignReset').on('click', function (e) {
							$sigdiv.jSignature('reset')
							$("#SignBase64").text("");
						});

						$('#SignWrite').on('click', function (e) {
							$("#signbox").show();
							$("#userinfoFooter").hide();
							$("#userinfoitem .form-group").hide();
						});

						$('#SignNo').on('click', function (e) {
								$("#SignBase64").text("");
								//$("#userSign").attr("src", "");
								$("#signbox").hide();
								$("#userinfoFooter").show();
								$("#userinfoitem .form-group").show();
						});

			});
}

function userCheck(){

	userVchkeck = $("#user_form").validate({
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },

        // Different components require proper error label placement
        errorPlacement: function(error, element) {
            // Styled checkboxes, radios, bootstrap switch
            if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
                if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                    error.appendTo( element.parent().parent().parent().parent() );
                }
                 else {
                    error.appendTo( element.parent().parent().parent().parent().parent() );
                }
				//alert(1)
            }
            // Unstyled checkboxes, radios
            else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                error.appendTo( element.parent().parent().parent() );
				//alert(2)
            }
            // Input with icons and Select2
            else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
                //error.appendTo( element.parent() );
				error.appendTo(  element.parent().parent() );
				//alert(3)
            }
            // Inline checkboxes, radios
            else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                error.appendTo( element.parent().parent() );
				//alert(4)
            }
            // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo( element.parent().parent() );
				//alert(5)
            }
            else {
                error.insertAfter(element);
				///alert(6)
            }
        },
        validClass: "validation-valid-label",
		rules : {
			userInfoPw : {
				minlength : 5
			},
			userInfoPw1 : {
				minlength : 5
			},

			userInfoPw2 : {
				minlength : 5
			}
		}
       , messages: {
            cellphone: {
                required: i18next.t("common:UserInfo.msg.cellP")
            },
			umail: {
                required: i18next.t("common:UserInfo.msg.umail")
            },
			Postion: {
                required: i18next.t("common:UserInfo.msg.Postion")
            },
			part: {
                required: i18next.t("common:UserInfo.msg.part")
            },
			userInfoPw : {
				minlength : i18next.t("common:validation.minlength",{ "minlength" : 5 })
			},
			userInfoPw1 : {
				minlength : i18next.t("common:validation.minlength",{ "minlength" : 5 })
			},
			userInfoPw2 : {
				minlength : i18next.t("common:validation.minlength",{ "minlength" : 5 })
			}
        }
		//before handler
		, invalidHandler:  function(event, userVchkeck) {
          // validationChecnk();
        }
		,submitHandler: function (form) {
				user_save()
				return false;
		}
    });
}

function user_save(){

		/* PW CHECK*/
		if($("#userInfoPw1").val() != $("#userInfoPw2").val()){
			showSwal(i18next.t("common:UserInfo.msg.checkPWSame"),"error");
			return false;
		}

		//기존 패스워드와 동일한지 체크
		$.ajax({
			"type" : "POST"
			//,"url" : "/data.do?callcmd=USERINFO_PW_CHECK"
			// data.do 는 deprecated 된 기능 같음 ( 전체 조회결과 대부분 주석처리 )
			//  > Select * from T_MODULE_SUBURL where call_CMD='USERINFO_PW_CHECK'
			,"url" : "/user/userInfoPwCheck"   //  /module/userInfoPwCheck.do
			,"data" : {
				"pw" : $("#userInfoPw").val()
			}
			,"success" : function(result){
				if(result=="success"){
					 //  수정 실패시의 처리는????? 무조건 성공 처리인가..??
					 var formData = new FormData($('#user_form')[0]);
					  $.ajax({
						   type : "POST",
						   //url : "/module/Userinfo_Dml.Do",
						   url : "/user/userinfoDml",
						   contentType: false,
						   dataType:"text",
						   processData: false,
						   cache : false,
						   data : formData
						   // ADD EDWARD START
						   // @TODO 처리 결과를 보여줘야할거 같음...
						   /*
						   , success : function(data) {		   alert(data);		  }
						   , error:function(request,status,error){
							  console.log(request,status,error);
							  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
						   }
						  */
						  //  ADD EDWARD END
					  })
						.done(function(data) {
							//초기화
							$("#userInfoPw").val("")
							$("#userInfoPw1").val("")
							$("#userInfoPw2").val("")
							showSwal( i18next.t("common:msg.editOk"),"success" );
					  })
				}else{

					showSwal(i18next.t("common:UserInfo.msg.checkPW"),"error");
				}
			}
		})


		return false;
}


/*언어코드 변환관련 함수 - 각 컴포넌트 마다 언어코드가 다를경우 함수 정의해서 사용  */
/*----------------------------------------------------------------------------------*/
//Fullcalendar
function changeLanCode_fullcalendar(lanCd){
	var trCode = ""
	switch (lanCd) {
		case "c1"	: trCode = "zh-cn";		break;
		default		: trCode = lanCd;		break;
	}

	return trCode;
}

//현재 i18 언어코드 리턴, 2018-06-14, 김영식
function geti18language(){
	var strLng=i18next.language;//"ko";
	if (strLng != undefined){
		var lng=strLng.substr(0, 2);//"ko";
	}else{
		var lng="ko";
	}
	return lng;
}
/*----------------------------------------------------------------------------------*/

//sweet alert load
function showSwal(_title, _type){
	swal({
		title:_title,
		type: _type,
		confirmButtonText: i18next.t("common:btn.ok"),
		showConfirmButton: true
		//timer: 1000
	});
}

function BlockShow(BlockElement, timeO, Msg){

	if (timeO ==undefined)
	{
		timeO=2000
	}

	if (Msg ==undefined)
	{
		Msg="<i class='icon-spinner10 spinner'></i><span class='text-semibold display-block'>Loading</span>"
	}

	if (BlockElement !=undefined) //특정엘리먼트에 block처리
	{
		 $(BlockElement).block({
			message: Msg,
			timeout: timeO, //unblock after 2 seconds
			overlayCSS: {
				backgroundColor: '#fff',
				opacity: 0.6,
				cursor: 'wait'
			},
			css: {
				padding: 0,
				border: 1,
				backgroundColor: 'transparent'
			}
		});
	}else if(BlockElement ==undefined){
		$.blockUI({
			message: Msg,
			timeout: timeO, //unblock after 2 seconds
			overlayCSS: {
				backgroundColor: '#fff',
				opacity: 0.6,
				cursor: 'wait'
			},
			css: {
				padding: 0,
				border: 1,
				backgroundColor: 'transparent'
			}
		});
	}
}

function BlockHide(){
	$.unblockUI();
}

function acodionActive(obj){

	$('.navigation').find('li.active').parents('li').addClass('active');
	$('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');
	$('.navigation').find('li').has('ul').children('a').addClass('has-ul');

	$('.navigation').find('li.active').find('ul').eq(0).css("display", "block");

	$(obj).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(150);

}


$(document).ready(function () {


	/*접힌 메뉴는 계속 접히게..*/
	ActiveBindYn=false;
	//if (location.href.indexOf("login.page")==-1)//로그인 상태
	if (location.href.indexOf("login")==-1)//로그인 상태
	{
		if (getCookie("LeftCloseYn")=="y")
		{
				//$('.inoutInfo').toggle();
				$('body').toggleClass('sidebar-xs');

				if ($('body').hasClass('sidebar-xs')) {
						$('.inoutInfo').hide();

						$('.sidebar-main.sidebar-fixed .sidebar-content').on('mouseenter', function () { //over

							if ($('body').hasClass('sidebar-xs')) {

									$('.inoutInfo').show();

									// Expand fixed navbar
									$('body').removeClass('sidebar-xs').addClass('sidebar-fixed-expanded');

									if(!ActiveBindYn){
											$("#side_ul li a").each(function(){
													//console.log($(this).attr("addrs"))
													if (MenuSeqNos.indexOf("/"+$(this).attr("addrs")+"/") >0)
													{
														acodionActive(this);
														//console.log("active:"+ $(this).attr("addrs"))
													}
											})
											ActiveBindYn=true;
									}
							}
						}).on('mouseleave', function () { //out

								if ($('body').hasClass('sidebar-fixed-expanded')) {
									// Collapse fixed navbar
									$('body').removeClass('sidebar-fixed-expanded').addClass('sidebar-xs');
									$('.inoutInfo').hide();
								}
						});

				}


		}
	}


	$(document).on('click',function(){
			//절전상태로 빠진경우 다시 클릭시 접속이벤트 발생
			//if (location.href.indexOf("login.page")==-1)//로그인 상태
			if (location.href.indexOf("login")==-1)//로그인 상태
			{
				// 세션 연장 처리(ajaxCall) 불필요. 주석처리
				/*lastTime=getCookie("lastChkTime").split("-");

				var old = new Date (lastTime[0], lastTime[1], lastTime[2], lastTime[3], lastTime[4], lastTime[5], 0);
				var now = new Date();
				var gap =now.getTime() - old.getTime() ;
				//console.log(gap/1000/60)

				if ( gap/1000/60 >= 18) //마지막 센션체크시간에서 18분이상 지난경우 클릭시
				{
					//console.log("10분 경과");
					ajaxCall();
				}else{
					//console.log("10분 미 경과");
				}*/
			}
	});

	/* 파일업로더 숨기기버튼 이벤트 */
	/*
	$(document).on('click', '.plupload_togle', function() {
		$('.File_Content:not(.Filelist_UI .File_Content)').slideToggle('fast', function(i){

			if($(".File_Content").is(":hidden")){
					$('.plupload_togle img').attr("src", "/resources/module/assets/images/file_closed.gif");
			}else{
					$('.plupload_togle img').attr("src", "/resources/module/assets/images/file_opened.gif");
			}

		});
	});
	*/

	$(document).on('click', '.plupload_togle', function() {
		var targetObj = $(this).parent().parent();
		targetObj.find('.File_Content:not(.Filelist_UI .File_Content)').slideToggle('fast', function(i){

			if(targetObj.find(".File_Content").is(":hidden")){
					targetObj.find('.plupload_togle img').attr("src", "/resources/module/assets/images/file_closed.gif");
			}else{
					targetObj.find('.plupload_togle img').attr("src", "/resources/module/assets/images/file_opened.gif");
			}

		});
	});

	if (isMobile)
	{
			$(window).on('orientationchange',function(event) {

					  CurentSize();

					// alert(cWidth +"="+cHeight );
					 if (cWidth > cHeight) // landscape
					 {
						orientation="L";
						cHeight =cWidth
					 }else{                     // portrait
						orientation="P";
						cHeight =cWidth
					 }

					  //alert(cHeight);
					  SideActiveTopSet();
			});



	}else{

		window.addEventListener("resize", function() {
			CurentSize();
		}, false);

		$(".side-menu-btn").hide();//PC에서 필요없음
	}

	//Scroll Top Button Fade In/Out
	  $(window).scroll(function () {

			var scrollPosition = $(this).scrollTop();

			if (scrollPosition > 50) {
					$('.scroll-to-top').fadeIn();
					if (isMobile){
						$('.side-menu-btn').fadeIn();
						// SideActiveTopSet();
					}

					try{
						fn_callBack_onScrollTapShow();
					}catch(e){}

			} else {
					$('.scroll-to-top').fadeOut();
					if (isMobile){
						$('.side-menu-btn').fadeOut();
						// SideActiveTopSet();
					}

					try{
						fn_callBack_onScrollTapHide();
					}catch(e){}
			}
	  });

	// Scroll to top
	  $('.scroll-to-top').click(function () {
		  /*
			$('body,html').animate({
				scrollTop: 0
			}, 500);
		*/
		   $('body,html').scrollTop(0);
		   $(".SideActive").css("top", 0 );
	  });

	// ismobile .side-menu-btn
	  $('.side-menu-btn').click(function () {
			CurentSize();
			$('.sidebar-mobile-main-toggle').trigger( "click" );
			//	alert(cWidth +"="+cHeight );
			SideActiveTopSet();
	  });

	//logout click
	 $('#LogoutBtn').on('click', function (e) {
			//e.preventDefault();
			//sessionStorage.clear();
			//location.href="/logout.Do";
			// 로그아웃 확인
		 	if(confirm("로그아웃 하시겠습니까...?")){
				e.preventDefault();
				sessionStorage.clear();
				location.href="/logout";
		 	}
	  });

	  //파일선택
	   $('.file-styled').uniform({
			fileButtonClass: 'action btn bg-warning-400'
	   });

	   //홈으로 이동
	   $('#goIndex').on("click", function () {
			BlockShow();
			//$('#actForm').attr("action","/common/menu");  // 이전 페이지로 이동.
			//$('#m').val(0);
			//$('#actForm').submit();
			//  메인 페이지로 이동
			location.href = "/user/moveGonggu";
		});

		//로컬js지우기
		$('#LocalJsRemove').on('click', function (e) {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
		});

		//사용자정보창
		$('#user_modal').on('show.bs.modal', function() {
			userLoad();
		});

		$(".Prj_Choice").height(cHeight-200);
		$(".Contact-list").height(cHeight-200-30);
		//$(".Noti-list").height(cHeight-200-30);
		$(".Noti-list").css("max-height", cHeight-200-30 + "px");


		 if(!isMobile){//데스크탑 만.
			// $(".Prj_Choice").niceScroll();
		 }

});



function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");

	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  x=x.replace("%5F","_");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

 function deleteCookie(name) {
		var expDate = new Date();
		expDate.setTime(expDate.getTime() - 86400000); //-1 day
		var value = "; expires=" + expDate.toGMTString() + ";path=/";
		document.cookie = name + "=" + value;
}

//common ajax history save function
var SetHistory=function(aJaxobj, FnName){

	if (typeof(aJaxobj)=="object")//ajax에서 바로 주는 경우
	{
		targetUrl = aJaxobj.url;
		data		=  aJaxobj.data;
	}else{ //다른 경로를 바로주는 경우
		targetUrl = aJaxobj;
		data="";
		FnName="";
	}

//	console.log("SetHistory FnName : " + FnName)
	path      =  location.href;
	mns		  =  getCookie("menu_Seqno");

	window.history.pushState({"data":data, "FnName":FnName, "url": targetUrl, "menu_seqno":mns}  , "", path);
}
//common ajax history save function
var replaceHistory=function(path, FnName){

		targetUrl = path;
		data="";
		FnName="";

	    path      =  location.href;
	    mns		=  getCookie("menu_Seqno");
    	window.history.pushState({"data":data, "FnName":FnName, "url": targetUrl, "menu_seqno":mns}  , "", path);
}

//main data list  item move
function DetailMove(m, s){
	//alert('[ALERT 삭제필요] \n DetailMove   m: '+m+'  / main_seqno : '+s);
	$("#m").val(m);
	$("#main_seqno").val(s);
	//$('#actForm').attr("action","/service.do");
	$('#actForm').attr("action","/common/menu");

	$("#actForm").submit();
}

function CallgetTime(){
	var d = new Date();
	return d.getFullYear()+ "-"+(d.getMonth()) + "-"+ d.getDate() +"-"+ d.getHours() +"-"+d.getMinutes() +"-"+ d.getSeconds() ;
}



/* 웹푸쉬로 들어올 경우 처리할 함수*/
/*---------------------------------------------------------------------------------------------------------------*/
//일정상세 로딩
     //     Module\UserModule\schedule\scheduleEditDml.do  에서 호출함    * UserModule\schedule\ 작업시 진행 할것.
function fn_push_loadScheduleDetailModal(menuSn, sn){
	//alert('fn_push_loadScheduleDetailModal..');
	$.ajax({
		//url : "/Module/UserModule/schedule/scheduleDetail.page",
        url : "/module/usermodule/schedule/scheduleDetail",
		type: "POST",
		dataType: "HTML",
		data:{
			//"menuSn" : menuSn,		//메뉴코드
            "menuSeqNo" : menuSn,       //메뉴코드
			"sn" : sn
		},
		success: function(data) {
			$("#modal_scheduleEdit").html(data);
			$('#modal_scheduleEdit').localize();	//다국어 반영
			$("#modal_scheduleEdit").modal("show");

		},
		error:function(request,status,error){
			console.log("일정상세 로드 오류");
		}
	});
}
/*===============================================================================================================*/
