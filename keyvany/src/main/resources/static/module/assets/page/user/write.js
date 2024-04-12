$(function() {

//사용자관리가 맞다면.. Select_item_info는 OBS관리 항목)
if (main_div_nm!="#Select_item_info")
{
	$.jstree.destroy();
}

var obsTree= $('#obstree').jstree({
			'multiple' : true,  //다중선택여부
			'core' : {
				'data' : {
					//"url":"/module/sysModule/obs/obs.do",
					"url": "/module/sysmodule/obs/obs",
					"dataType" : "json"
					}
				},
			checkbox: {three_state: false},
			"plugins" : ["search", "wholerow","checkbox"]
		    });

	obsTree.on("select_node.jstree", function (e, data) {

			if(data.selected.length) {
				// 다중선택한 값가져오기
				var sel_Ids = [];
				var sel_name = [];
				var selectedElms = $('#obstree').jstree("get_selected", true);
				$.each(selectedElms, function() {
					sel_Ids.push(this.id);
					sel_name.push(this.text);
				});

				$("#inOBS").val(sel_name.join(",") );
				$("#obs_sn").val(sel_Ids.join(",") );

				// $("#obstree").hide();
			}else{
				//null data
			}
	});
	obsTree.on("deselect_node.jstree", function (e, data) {

				// 다중선택한 값가져오기
				var sel_Ids = [];
				var sel_name = [];
				var selectedElms = $('#obstree').jstree("get_selected", true);
				$.each(selectedElms, function() {
					sel_Ids.push(this.id);
					sel_name.push(this.text);
				});

				$("#inOBS").val("");
				$("#obs_sn").val("");

				$("#inOBS").val(sel_name.join(",") );
				$("#obs_sn").val(sel_Ids.join(",") );
	});

	obsTree.on("loaded.jstree", function (e, data) {
		$("#obstree").jstree("open_all");

		      if(obs_seqno.indexOf(",") >0){//여러개인 경우
			      obs_arr=obs_seqno.split(",");
			       $(obs_arr).each(function(i,item){
					$("#obstree").jstree("check_node","#"+item);
			       });
		       }else{
				$("#obstree").jstree("check_node","#"+obs_seqno);
		       }
	});

	$('#write_modal #ObsChoice, #edit_modal #ObsChoice').on('click', function (e) {

		if(isMobile){
			$('#obstree').css("top", $(main_div_nm).scrollTop());
			$('#treeChoiceOK').css("top", $(main_div_nm).scrollTop()+25);
		}
		else{
			$('#treeChoiceOK').css("top", "100px");
		}

		$("#obstree").show();
		$("#treeChoiceOK").show();
	});



	$('#treeChoiceOK').on('click', function (e) {
		 $("#obstree").hide();
		 $("#treeChoiceOK").hide();
	});

	$('#uSignUse').on('click', function (e) {
			var data = $sigdiv.jSignature('getData', 'default');
			if (data.length<=2082)//300*200 png 기준
			{
				alert(i18next.t("common:UserInfo.msg.noSingnWrite"));
			}else{
				$("#uSignBase64").text(data);
				$("#userSignW").attr("src", data);

				$("#signboxW").hide();
				$(""+main_div_nm+" #userinfoFooter").show();
				$(""+main_div_nm+" .form-group").show();
			}
	});

	$('#uSignReset').on('click', function (e) {
			$sigdiv.jSignature('reset')
			$("#uSignBase64").text("");
	});

	$('#uSignWrite').on('click', function (e) {
			$("#signboxW").show();
			$(""+main_div_nm+"  #userinfoFooter").hide();
			$(""+main_div_nm+"  .form-group").hide();
	});

	$('#uSignNo').on('click', function (e) {
			$("#uSignBase64").text("");
			//console.log(2);
			//$("#userSignW").attr("src", "");
			$("#signboxW").hide();

			$(""+main_div_nm+" #userinfoFooter").show();
			$(""+main_div_nm+" .form-group").show();
	});

	$("#usta").on('change', function (e) {
			if ($(this).val()=="STOP")
			{
				$("#outdt").attr("disabled",false);
			}else{
				$("#outdt").attr("disabled",true);
			}
	});

	$('#UserDel').on('click', function (e) {
			if (confirm("선택한 인원을 삭제하시겠습니까? \n삭제후 인원정보는 관리하실 수 없습니다.\n그래도 삭제하시겠습니까?")){
				$("#md").val("d");
				$("#userinfoform").submit();
			}
	});

	$("#uid").keyup(function() {
			if ($(this).val().length>=8)
			{
				$.ajax({
					  //url:'/module/SysModule/User/idExist.Do',
					  url:'/module/sysmodule/user/idExist',
					  type:'post',
					  data:"uid="+$(this).val(),
					  success:function(data){
						if (data>0)//있는 아이디
						{
							$("#idcheck").val("n");
							$("#uid").css("border-color","#D84315");
							$("#id_chk_icon").css("color", "#D84315");
							$("#id_chk_icon").html("<i class='icon-cancel-circle2'></i>");
						}else{//사용가능

							$("#idcheck").val("y");
							$("#uid").css("border-color","#43A047");
							$("#id_chk_icon").css("color", "#43A047");
							$("#id_chk_icon").html("<i class='icon-checkmark-circle'></i>");
						}
					   }
				});
		}else{
				$("#idcheck").val("n");
				$("#uid").css("border-color","#ddd");
				$("#id_chk_icon").css("color", "#ddd");
				$("#id_chk_icon").html("<i class='icon-arrow-right16'></i>");
		}
	});

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

	 //비밀번호 초기화
	 $("#resetUserPW").on("click", function(){
		swal({
			title: i18next.t("user:msg.resetPwConfirm"),
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				/*
				var uid = $("#userinfoform #usn").val();


				swal({
					title: "처리후 완료메세지",
					showConfirmButton: false,
					type: "success",
					timer: 1000
				});
				*/
				var formData = {"sessionId" : $("#gssid").val(),	"sysId" : $("#userinfoform #usn").val()	};

				$.ajax({
					type: "POST",
					//url: "/Module/SysModule/User/ResetPw.do",
					url: "/module/sysmodule/user/resetPw",
					//data: JSON.stringify(formData),
					//contentType: 'application/json',
					data: {
						"SSID" : $("#gssid").val(),
						"usn" : $("#userinfoform #usn").val()
					},
					dataType: "json",
					success:function(data) {

						if(data.result == "success"){
							swal({
								title: i18next.t("user:msg.resetPwOK").replace("#PW#", data.debug) ,
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "success"
							});
						}else{
							swal({
								title: i18next.t(data.code),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					}
					, error:function(xhr,textStatus){
						swal({
							title: i18next.t("msg.DbError"),
							confirmButtonColor: "#f44336",
							closeOnConfirm: true,
							type: "error"
						});
					}
				});




			}
		});
	 });

});
//명칭 부분에 _ 를 입력체크
$.validator.addMethod("underbar_Chk", function(value) {
			//return value == "buga";
			 return value.indexOf("_") == -1;
		 },  i18next.t("user:msg.underBarChk"));

function userInfoCheck(){

	userVchkeck = $(""+main_div_nm+" #userinfoform").validate({
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
		messages: {
		    uid: {
			required: i18next.t("user:msg.id")
		    },
		    upw: {
			required: i18next.t("user:msg.pw")
		    },
		    unm: {
			required: i18next.t("user:msg.unm")
		    },
		    mtel: {
			required: i18next.t("user:msg.cellP")
		    },
		    eml: {
			required: i18next.t("user:msg.umail")
		    },
		    ups: {
			required: i18next.t("user:msg.Postion")
		    },
		    upt: {
			required: i18next.t("user:msg.part")
		    },
		    inOBS:{
		       required: i18next.t("user:msg.obs")
		    },
		    uauh:{
			required: i18next.t("user:msg.uauh")
		    }
		},
		rules: {
			unm: "underbar_Chk"
		}

		//before handler
		, invalidHandler:  function(event, userVchkeck) {
		  // validationChecnk();
		}
		,submitHandler: function (form) {

			if ($("#idcheck").val()=="y")
			{
				if ($("#usta").val()=="STOP")
				{
					if($("#outdt").val()==""){
						alert(	i18next.t("user:msg.outDtChk")	);
						return false;
					}
				}
				user_saveW();
			}else{
				alert(	i18next.t("user:msg.idLenChk")	);
			}
			return false;
		}
    });
}
function user_saveW(){
		BlockShow();	//block-ui show
		var formData = new FormData($('#userinfoform')[0]);
		  $.ajax({
			   type : "POST",
			   //url : "/module/assets/page/User/Userinfo_Dml.do",
			   url : "/user/allUserinfoDml",
			   contentType: false,
			   dataType:"text",
			   processData: false,
			   cache : false,
			   data : formData,
			   error:function(request,status,error){
				 alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			  }
		  })
		  .done(function(data) {
			vMode=$("#md").val();
				if (vMode=="i" || vMode=="e" )
				{
					alert(i18next.t("common:msg.saveOk") );
				}else{
					alert(i18next.t("common:msg.delOk") );
					doSearch();
				}

				if (vMode=="i" || vMode=="d" )
				{
					$("#UserBoxClose").trigger('click');
				};
				$.unblockUI();
		  })

}