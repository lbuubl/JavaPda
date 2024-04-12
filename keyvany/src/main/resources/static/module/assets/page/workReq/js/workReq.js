
$(function(){

	// 다국어 초기화
	i18next.loadNamespaces(["workReq"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);
		//$('body').localize();				//다국어 반영
	});

	/*-------------------------------------------------------------------------------------------------*/
	/********************************************* 버튼 이벤트 *****************************************/
	/*-------------------------------------------------------------------------------------------------*/


	//업무요청 수정
	$("#panelArea").on("click", "#btn_workReqEdit", function(e){
		var sn = $(this).attr("sn");
		loadWorkReqEdit(sn);
	});

	//업무요청 삭제
	$("#panelArea").on("click", "#btn_workReqDelete", function(e){

		var sn = $(this).attr("sn");

		swal({
			title: i18next.t("msg.delYn"),
			type: "warning",
			html:true,
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type :'post'												// Post로 데이터 전달(get,post방식)
					, asyn : false												// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/WorkReq/dml/workReqEditDml.do"	// 전송할 페이지
					, url: "/module/usermodule/workreq/workReqEditDml"	// 전송할 페이지
					, data : {
						"dmlType" : "del",
						"sn" : sn,
						"ssid" : $("#gssid").val()
					}
					, dataType:"json"
					, success:function( data ){
						if(data.result == "success"){
							$.unblockUI();							//block-ui hide
							swal({
								title: i18next.t("msg.delOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							//loadWorkReqList();		//목록으로
							//location.href ="/Module/UserModule/WorkReq/index.page";
							//location.href ="/service.do";
							location.href ="/common/menu";
							//$(window).scrollTop(0);

						}else{
							$.unblockUI();
							swal({
								title: i18next.t(data.code),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					 }
					 , error:function(xhr,textStatus){
							$.unblockUI();								//block-ui hide
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

	//목록
	$("#panelArea").on("click", "#btn_workReqList", function(e){

		//loadWorkReqList();		//목록으로
		//location.href ="/Module/UserModule/WorkReq/index.page";
		//location.href ="/service.do";
		location.href ="/common/menu";
	});

	//업무요청 작성취소
	$("#panelArea").on("click", "#btn_workReqCancel", function(e){
		var dmlType = $("#frmWorkReqEdit input[name='dmlType']").val();
		var sn = $("#frmWorkReqEdit input[name='sn']").val();

		if (dmlType == "add"){
			//loadWorkReqList();		//목록으로
			//location.href ="/Module/UserModule/WorkReq/index.page";
			//location.href ="/service.do";
			location.href ="/common/menu";
		}else{
			loadWorkReqDetail(sn);	//상세로
		}
	});

	//코멘트 작성버튼
	$("#panelArea").on("click", ".btnComment", function(e){
		e.stopPropagation();

		var pPanel = $(this).closest(".panel")

		$.post(
			//"/Module/UserModule/workReq/modalCommentEdit.page",
			"/module/usermodule/workreq/modalCommentEdit",
			{
			"dmlType" : "add",
			"rgqGrpSeqNo" : pPanel.attr("rgqGrpSeqNo"),
			"boardSeqNo" : pPanel.attr("boardSeqNo")
			},
			function(data){
				$("#commentModal").html(data);
				$("#commentModal").modal("show");
				$("#commentModal").localize();
			}
		)
	});


	//댓글에 댓글달기
	$("#panelArea").on("click", ".btn_commentReply", function(e){

		var pPanel = $(this).closest(".panel")

		$.post(
			//"/Module/UserModule/workReq/modalCommentEdit.page",
			"/module/usermodule/workreq/modalCommentEdit",
			{
			"dmlType" : "reply",
			"sn" : $(this).attr("comment-SeqIdx"),
			"rgqGrpSeqNo" : pPanel.attr("rgqGrpSeqNo"),
			"boardSeqNo" : pPanel.attr("boardSeqNo")
			},
			function(data){
				$("#commentModal").html(data);
				$("#commentModal").modal("show");
				$("#commentModal").localize();
			}
		)
	});


	//댓글수정
	$("#panelArea").on("click", ".btn-commentEdit", function(e){

		var pPanel = $(this).closest(".panel")

		$.post(
			//"/Module/UserModule/workReq/modalCommentEdit.page",
			"/module/usermodule/workreq/modalCommentEdit",
			{
			"dmlType" : "edit",
			"sn" : $(this).attr("comment-SeqIdx"),
			"rgqGrpSeqNo" : pPanel.attr("rgqGrpSeqNo"),
			"boardSeqNo" : pPanel.attr("boardSeqNo")
			},
			function(data){
				$("#commentModal").html(data);
				$("#commentModal").modal("show");
				$("#commentModal").localize();
			}
		)
	});


	//코멘트 삭제버튼btn-commentDel
	$("#panelArea").on("click", ".btn-commentDel", function(e){
		var pPanel = $(this).closest(".panel");
		var oLi = $(this).closest("li");
		var sn	= $(this).attr("comment-SeqIdx");


		swal({
			title: i18next.t("msg.delYn"),
			type: "warning",
			html:true,
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/workReq/dml/workReqCommentDml.do",
					url: "/module/usermodule/workreq/workReqCommentDml",
					data: {
						"dmlType" : "del",
						"sn" : sn
					},
					// dataType:"json",
					dataType: "html", // workReqCommentDml.do 에서 넘기는 값중  result 만 사용.  result 만 넘기도록 변경함
					success:function(data) {
						if(data == "success"){
							//alert(i18next.t("pds:msg.deleted"));
							swal({
								title: i18next.t("msg.delOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});
							oLi.remove();


						}else{
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					}
					, error:function(xhr,textStatus){
						//alert(textStatus);
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



	//코멘트 저장버튼
	$("#commentModal").on("click", "#btn_commentSave", function(e){
		//댓글이나 파일 첨부 체크
		var uploader= new $("#uploadEvent_workReqComment").pluploadQueue();
		uploader.start();
	});


	//업무방 공개
	$("#panelArea").on("click", ".btn_boardOpen", function(){
		var pPanel = $(this).closest(".panel");
		var pDiv = $(this).closest(".boardOpenYnWrapper")

		swal({
			title: i18next.t("workReq:msg.boardOpenYn"),
			type: "warning",
			html:true,
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/workReq/dml/workReqBoardOpenDml.do",
					url: "/module/usermodule/workreq/workReqBoardOpenDml",
					data: {
						"Open_Yn" : "1",
						"boardSeqNo" : pPanel.attr("boardSeqNo")
					},
					dataType: "html",
					success:function(data) {
						if(data == "success"){
							//alert(i18next.t("pds:msg.deleted"));
							swal({
								title: i18next.t("workReq:msg.boardOpenOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							$(pDiv).find(".btn_boardOpen").hide();
							$(pDiv).find(".btn_boardClose").show();
						}else{
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					}
					, error:function(xhr,textStatus){
						//alert(textStatus);
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


	//업무방 비공개
	$("#panelArea").on("click", ".btn_boardClose", function(){
		var pPanel = $(this).closest(".panel");
		var pDiv = $(this).closest(".boardOpenYnWrapper")

		swal({
			title: i18next.t("workReq:msg.boardCloseYn"),
			type: "warning",
			html:true,
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/workReq/dml/workReqBoardOpenDml.do",
					url: "/module/usermodule/workreq/workReqBoardOpenDml",
					data: {
						"Open_Yn" : "0",
						"boardSeqNo" : pPanel.attr("boardSeqNo")
					},
					dataType: "html",
					success:function(data) {
						if(data == "success"){
							//alert(i18next.t("pds:msg.deleted"));
							swal({
								title: i18next.t("workReq:msg.boardCloseOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							$(pDiv).find(".btn_boardClose").hide();
							$(pDiv).find(".btn_boardOpen").show();
						}else{
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					}
					, error:function(xhr,textStatus){
						//alert(textStatus);
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

	//업무복사
	$("#panelArea").on("click", "#btn_workReqCopy", function(){
		//console.log("btn_workReqCopy")
		var sn = $(this).attr("sn")
		loadWorkReqEdit(sn, "copy");
	});


	//업무요청 종료
	$("#panelArea").on("click", "#btn_workReqEnd", function(){
		var sn = $(this).attr("sn")

		swal({
			title: i18next.t("workReq:msg.workReqEnd"),
			type: "warning",
			html:true,
			showCancelButton: true,
			confirmButtonColor: "#EF5350",
			confirmButtonText: i18next.t("btn.ok"),
			cancelButtonText: i18next.t("btn.cancel"),
			closeOnConfirm: false,
			closeOnCancel: true
		},function(isConfirm){
			if(isConfirm){

				$.ajax({
					type :'post'												// Post로 데이터 전달(get,post방식)
					, asyn : false												// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/WorkReq/dml/workReqEditDml.do"	// 전송할 페이지
					, url: "/module/usermodule/workreq/workReqEditDml"	// 전송할 페이지
					, data : {
						"dmlType" : "end",
						"sn" : sn,
						"ssid" : $("#gssid").val()
					}
					, dataType:"json"
					, success:function( data ){
						if(data.result == "success"){

							$.unblockUI();							//block-ui hide
							swal({
								title: i18next.t("msg.editOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							//상세페이지 재로딩
							loadWorkReqDetail(sn);

							$(window).scrollTop(0);

						}else{
							$.unblockUI();
							swal({
								title: i18next.t(data.code),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					 }
					 , error:function(xhr,textStatus){
							$.unblockUI();								//block-ui hide
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

	/*-------------------------------------------------------------------------------------------------*/
	/********************************************* //버튼 이벤트 ***************************************/
	/*-------------------------------------------------------------------------------------------------*/

});

//i18next 로드 완료
function fn_i18nextLoaded(){

	if (main_Seqno != ""){
		//상세로 바로 이동
		loadWorkReqDetail(main_Seqno);
	}else{
		//처음 로딩완료되면 목록 페이지 로딩
		loadWorkReqList();
	}

	//벨리데이션 다국어 처리
	validatorI18n();

	//언어 변경시 다국어 처리
	i18next.on('languageChanged', function(lng) {
		validatorI18n();
	});

	//벨리데이션 공통함수 초기화
	//initValidCommon();
}


//테스크 리스트 로드 (첫페이지)

function loadWorkReqList(){
 	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/workReqList.page",
		url: "/module/usermodule/workreq/workReqList",
		data: "",
		dataType: "html",
		success:function(data) {
			$("#panelArea").html(data);
			$("#panelArea").localize();
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


//업무요청 등록/수정 로드
function loadWorkReqEdit(sn, mode){
	/*
	var param = {"sn":sn}
	$.post(
		"/Module/UserModule/workReq/workReqEdit.page",
		param,
		function(data){
			$("#panelArea").html(data);
			$("#panelArea").localize();
			$(window).scrollTop(0);
		}
	)
	*/
	var isCopy = mode=="copy" ? "Y":"N";


	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/workReqEdit.page",
		url: "/module/usermodule/workreq/workReqEdit",
		data: {
			"sn":sn,
			"isCopy":isCopy
		},
		dataType: "html",
		success:function(data) {
			$("#panelArea").html(data);
			$("#panelArea").localize();
			$(window).scrollTop(0);
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


//업무요청 상세 로드
function loadWorkReqDetail(sn){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/workReqDetail.page",
		url: "/module/usermodule/workreq/workReqDetail",
		data: {
			"sn" : sn
		},
		async: false,
		dataType: "html",
		success:function(data) {
			//console.log('workReqDetail '+data);
			if(data=='noData'){
				alert('존재하지 않는 게시물입니다.');
				location.reload();
			}	else{
				$("#panelArea").html(data);
				$("#panelArea").localize();
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


//업무대화방 로드
function loadWorkReqBoard(bSn, collaboType){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/getWorkReqBoard.page",
		url: "/module/usermodule/workreq/workReqBoard",
		data: {
			"bSn" : bSn,
			"collaboType" : collaboType
		},
		async: false,
		dataType: "html",
		success:function(data) {
			//console.log('workReqBoard : '+data);
			$("#workReqAccordion").append(data);
			$("#workReqAccordion").localize();
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

//댓글목록 로딩
function loadWorkReqCommentList(bSn){

	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/getWorkReqCommentList.page",
		url: "/module/usermodule/workreq/workReqCommentList",
		data: {
			"bSn" : bSn
		},
		async: false,
		dataType: "html",
		success:function(data) {
			//console.log('workReqCommentList : '+data);

			$("#workReqBoard_"+bSn+" .commentListWrapper").html(data);
			$("#workReqBoard_"+bSn+" .commentListWrapper").localize();
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

//읽지않은 코맨트갯수 로딩
function loadWorkReqNotReadCount(bSn){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/workReq/getNotReadCount.do",
		url: "/module/usermodule/workreq/getNotReadCount",
		data: {
			"bSn" : bSn
		},
		async: false,
		dataType: "json",
		success:function(data) {

			var cnt = data.notReadCnt;
			if (data.notReadCnt == 0){
				cnt = "";
			}

			$("#workReqBoard_"+bSn+" .notReadCnt").html(cnt);
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


//에디터 데이터 체크
function editorCheck(){
	//에디터 값 유무 체크, 정규식 사용
	//var editTxt = $(tinymce.activeEditor.getBody()).html();
	var editTxt = tinymce.activeEditor.getContent();
	editTxt = editTxt.replace(/<p>/gi,"");
	editTxt = editTxt.replace(/<\/p>/gi,"");
	editTxt = editTxt.replace(/&nbsp;/gi,"");
	editTxt = editTxt.replace(/<br data-mce-bogus="1">/gi,"");
	if(editTxt== ""){
		swal({
			title: i18next.t("msg.insertContent"),
			confirmButtonColor: "#66BB6A",
			closeOnConfirm: true,
			type: "warning"
		},
		function() {
			setTimeout(function(){
				tinymce.get("contents").focus();
			}, 500)
		});
		return false;
	}else{
		return true;
	}
}

/*


//프로젝트 관리 목록 OPEN
function openProjectMgrList(){
	$.post(
		"/Module/UserModule/Work/projectMgrList.page",
		"",
		function(data){
			$("#modal_projectMgr").html(data);
			$("#modal_projectMgr").localize();
			$("#modal_projectMgr").modal("show");
		}

	)
}


//프로젝트 관리 등록/수정 OPEN
function openProjectEdit(sn){
	var param = {"sn" : sn}
	$.post(
		"/Module/UserModule/Work/projectMgrEdit.page",
		param,
		function(data) {
			$("#modal_projectMgr").html(data);
			$("#modal_projectMgr").localize();
			$("#modal_projectMgr").modal("show");
		}
	)
}








//Back, forword버튼 처리
window.onpopstate = function(e) {
	try{
		FnName	= e.state.FnName;
		url		= e.state.url;
		data	= e.state.data;

		if(FnName == "loadTaskList"){
			window[FnName]("n");

			$("#modal_projectMgr").modal("hide");
			$("#modal_activityProgress").modal("hide");
			$("#manModal").modal("hide");
			$("#modal_scheduleEdit").modal("hide");
			$("#modal_repeatSetting").modal("hide");
			$("#modal_repeatDelEdit").modal("hide");
			$("#modal_selectScheduleMc").modal("hide");

		}else if(FnName == "loadTaskDetail"){
			console.log(data)
			window[FnName](data.sn);
		}

	}catch (e){}
}
*/