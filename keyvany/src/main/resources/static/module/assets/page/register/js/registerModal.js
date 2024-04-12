$(document).ready(function(e){
	$('#uSignUse').unbind();
	$('#uSignUse').on('click', function (e) {
			var data = $sigdiv.jSignature('getData', 'default');
			if (data.length<=2082)//300*200 png 기준
			{
				alert(i18next.t("common:UserInfo.msg.noSingnWrite"));
			}else{
				$("#uSignBase64").text(data);
				$("#userSignW").attr("src", data);

				$("#signboxW").hide();
				$("#userinfoFooter").show();
				$("#infobox").show();
			}
	});
	$('#uSignReset').unbind();
	$('#uSignReset').on('click', function (e) {
			$sigdiv.jSignature('reset')
			$("#uSignBase64").text("");
	});

	$('#uSignWrite').unbind();
	$('#uSignWrite').on('click', function (e) {
			$("#infobox").hide();
			$("#userinfoFooter").hide();
			$("#signboxW").show();
	});

	$('#uSignNo').unbind();
	$('#uSignNo').on('click', function (e) {
			//console.log(1);
			$("#uSignBase64").text("");
			$("#signboxW").hide();

			$("#userinfoFooter").show();
			$("#infobox").show();
	});

	$('#usta').unbind();
	$("#usta").on('change', function (e) {
		if ($(this).val()=="STOP")
		{
			$("#outdt").attr("disabled",false);
		}else{
			$("#outdt").attr("disabled",true);
		}
	});

	$('#registerModalCheck #formUid').unbind();
	$("#registerModalCheck #formUid").keyup(function() {

		var re=/[^a-zA-Z0-9]/gi;  // 비밀번호,아이디체크 영문,숫자만허용, 4~10자리
		//[출처] [Javascript] 정규식을 이용한 특수문자, 한글 등 특정 문자 체크(제거)|작성자 realuv

		$(this).val($(this).val().replace(re,""))

		if ($(this).val().length>=8){
			$.ajax({
			  //url:'/Module/SysModule/Register/registerModal_CHECK.do',
			  url:'/common/registerModalCheck',
			  type:'post',
			  data:"formUid="+$(this).val(),
			  success:function(data){

					if (data.result>0)//있는 아이디     if (data=="true")//있는 아이디
					{
						$("#idcheck").val("N");
						$("#formUid").css("border-color","#D84315");
						$("#id_chk_icon").css("color", "#D84315");
						$("#id_chk_icon").html("<i class='icon-cancel-circle2'></i>");
						//$("#chkLabel").attr("data-i18n","Register:msg.used");
						$("#chkLabel").html("이미 사용중인 ID입니다.");
						$("#chkLabel").addClass("validation-error-label");
						$("#chkLabel").removeClass("validation-valid-label");
						$("#chkLabel").show();

					}else{//사용가능
						$("#idcheck").val("Y");
						$("#formUid").css("border-color","#43A047");
						$("#id_chk_icon").css("color", "#43A047");
						$("#id_chk_icon").html("<i class='icon-checkmark-circle'></i>");
						//$("#chkLabel").attr("data-i18n","Register:msg.canUse");
						$("#chkLabel").html("");
						$("#chkLabel").removeClass("validation-error-label");
						$("#chkLabel").addClass("validation-valid-label");
						$("#chkLabel").hide();
					}


					$('#chkLabel').localize();
				}
			});
		}else{
			$("#idcheck").val("N");
			$("#chkLabel").html("");
			$("#formUid").css("border-color","#D84315");
			$("#id_chk_icon").css("color", "#D84315");
			$("#id_chk_icon").html("<i class='icon-cancel-circle2'></i>");
		}
	});

	$('#upw').unbind();
	$("#upw").keyup(function() {
			if ($(this).val().length>8)
			{
				$("#upw").css("border-color","#43A047");
				$("#pw_chk_icon").css("color", "#43A047");
				$("#pw_chk_icon").html("<i class='icon-checkmark-circle'></i>");
			}else{
				$("#upw").css("border-color","#ddd");
				$("#pw_chk_icon").css("color", "#ddd");
				$("#pw_chk_icon").html("<i class='icon-arrow-right16'></i>");
			}
	});

	$('.dateBox').focus(function(){
			 $(".daterangepicker").css("top", "50px");
	});

	$(".file-styled").uniform({
			fileButtonClass: 'action btn btn-default'
	});

	$(".file-Choice").next().html(i18next.t("common:F.NoChoiceFile"));
	$(".file-Choice").next().next().html(i18next.t("common:F.ChoiceFile"));

	i18next.loadNamespaces(["user"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('#registerModal').localize();				//다국어 반영
		//$(".heading-elements").appendTo("#dataList_length");

		userInfoCheck();
	});

});

function userInfoCheck(){

	userVchkeck = $("#userinfoform").validate({
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
		    }
		    // Unstyled checkboxes, radios
		    else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
			error.appendTo( element.parent().parent().parent() );
		    }
		    // Input with icons and Select2
		    else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
			error.appendTo( element.parent() );
			//error.appendTo(  element.parent().parent() );
		    }
		    // Inline checkboxes, radios
		    else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
			error.appendTo( element.parent().parent() );
		    }
		    // Input group, styled file input
		    else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
			error.appendTo( element.parent().parent() );
		    }
		    else {
			error.insertAfter(element);
		    }
		},
		validClass: "validation-valid-label",
		rules : {
			formUid : {
				minlength : 8
			},
			upw : {
				minlength : 8
			},
			upw2 : {
				minlength : 8
			}
		},
		messages: {
		    formUid: {
				required: "ID를 입력해주세요"
		    },
		    upw: {
				required: "패스워드를 입력해주세요"
		    },
			upw2: {
				required: "패스워드를 입력해주세요"
		    },
		    unm: {
				required: "이름을 입력해주세요"
		    },
		    mtel: {
				required: "휴대전화 번호를 입력해주세요"
		    },
		    eml: {
				required: "이메일주소를 입력해주세요"
		    },
		    ups: {
				required: "직급을 선택해주세요"
		    },
			upt: {
				required: "분야를 선택해주세요"
		    },
			selectGonggu: {
				required : i18next.t("Register:label.gonggu")
			}
		}
		//before handler
		, invalidHandler:  function(event, userVchkeck) {
		  // validationChecnk();
		}
		,submitHandler: function (form) {
			if($("#upw").val() != $("#upw2").val()){
				alert("비밀번호를 확인해주세요");
				return false;
			}
			if ($("#idcheck").val()=="Y")
			{
				//console.log(uploader);
				//uploader.start();
				user_saveW();
			}else{
				alert(	"이미 사용중인 아이디입니다!"	);
			}
			return false;
		}
    });
}
function user_saveW(){

	var formData = new FormData($('#userinfoform')[0]);
	  $.ajax({
		   type : "POST",
		   //url : "/RegisterModalDML.do",
		   url : "/common/registerModalDML",
		   contentType: false,
		   dataType:"text",
		   processData: false,
		   cache : false,
		   data : formData,
			success : function(data) {
				if (data == "success"){
					$("#UserBoxClose").trigger('click');
					alert("저장성공!\n관리자 승인후 로그인할 수 있습니다.");
				}else{
					alert("저장실패!\n관리자에게 문의해주세요");
				}
		  },
		   error:function(request,status,error){
			  console.log(request,status,error);
			// alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		  }

	  })
}