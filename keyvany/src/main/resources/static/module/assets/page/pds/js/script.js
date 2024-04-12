
//일반 썸네일
/*
$.fn.SmallphotoScrolling = function(){
	var pos = $(this).parent().position();

	var all_height = (pos.top + $("#pdsSmallPhotoList_inc").scrollTop())
	$( "#pdsSmallPhotoList_inc" ).scrollTop( all_height-70);
};


//최근 썸네일
$.fn.LatestSmallphotoScrolling = function(){
	var pos = $(this).parent().position();

	var all_height = (pos.top + $("#latest_pdsSmallPhotoList_inc").scrollTop())
	$( "#latest_pdsSmallPhotoList_inc" ).scrollTop( all_height-70);
};
*/


//썸네일 백그라운드 컬러 처리
function focusSmallPhoto(imgBox){
	if(imgBox.length > 0){
		imgBox.parent().siblings().find("div:eq(0)").css("background-color","#fff");
		imgBox.css("background-color","#e8f5e9");	//focus 처리
	}else{
		$(".tab-pane.active .thumDiv .thumWrap").css("background-color","#fff")
	}
}


var PDS_useThumnail = true;	//썸네일 사용여부 (쿠키값)
var mTreeOffSet = 140;		//모바일 트리 트리부분 제외한 부분높이(위, 아래)


//i18next 로드 완료
function fn_i18nextLoaded(){
	//벨리데이션 다국어 처리
	validatorI18n();

	//언어 변경시 다국어 처리
	i18next.on('languageChanged', function(lng) {
		validatorI18n();
	});
}

/*
arr_thumLi = $(this).parent().find("li").filter(function(){
	return $(this).attr("ext") == 'pdf' || ($(this).attr("ext") != 'pdf' && $(this).data("width") > 0)
});
*/

//페이지 이동후 처음 이나 마지막 썸네일을 클릭처리
function fn_firstLastThumClick(gubun, thumDivId){
	$('#modal_remote').modal('hide');

	var arr_thumLi =  $(thumDivId).find("li").filter(function(){
		return $(this).attr("ext") == 'pdf' || ($(this).attr("ext") != 'pdf' && $(this).data("width") > 0)
	});

	if (gubun == "next"){
		arr_thumLi.first().trigger( "click" );
		$(thumDivId).scrollTo(arr_thumLi.first());

	}else{
		arr_thumLi.last().trigger( "click" );
		$(thumDivId).scrollTo(arr_thumLi.last());
	}

	//스크롤 처리
	thumPageGubun = "";
}

$(function(){

	$("#img_nav_div").show();
	var curViewindex=0;	//현재 index
	var fileLength=0;	//썸네일갯수 (이미지, pdf)
	var arr_thumLi;		//썸네일 배열


	//썸네일 이동시 이전/다음 페이지 여부 체크후 호출
	function getOtherThumPage(gubun){
		var thumDiv_id = $(arr_thumLi).closest(".thumDiv").attr("id");	//탭의 구분을 위한 ID
		var dtObj = thumDiv_id == "pdsSmallPhotoList" ? t1:t2;			//데이터테이블 객체
		var pageInfo = dtObj.page.info();								//페이지정보 가져오기(이전, 다음 페이지 여부)

		//다음
		if (gubun == "next"){
			if(pageInfo.pages > pageInfo.page+1){
				//alert("다음페이지 존재");
				thumPageGubun = "next";
				dtObj.page("next").draw("page");

				return true;
			}else{
				return false;
			}

		//이전
		}else{
			if (pageInfo.page > 0){
				//alert("이전페이지 존재");
				thumPageGubun = "prev";
				dtObj.page("previous").draw("page");
				return true;
			}else{
				return false;
			}
		}
	}

	/*이전이벤트*/
	$("#p").unbind("click");
	$("#p").on("click", function () {
		if (curViewindex==0){
			/*
			var thumDiv_id = $(arr_thumLi).closest(".thumDiv").attr("id");	//탭의 구분을 위한 ID
			var dtObj = thumDiv_id == "pdsSmallPhotoList" ? t1:t2;			//데이터테이블 객체
			var pageInfo = dtObj.page.info();								//페이지정보 가져오기(이전, 다음 페이지 여부)
			*/

			//이전페이지 있으면 이전페이지 로딩후 마지막 썸네일 로드
			if (! getOtherThumPage("prev")){
				alert("이전 파일이 없습니다.");
			}
			return false;
		}
		$('#modal_remote').modal('hide');
		$(arr_thumLi).eq(curViewindex-1).trigger( "click" );

		//스크롤 처리
		$(arr_thumLi).closest(".thumDiv").scrollTo($(arr_thumLi).eq(curViewindex));
	});

	/*다음이벤트*/
	$("#n").unbind("click");
	$("#n").on("click", function () {
		if (curViewindex==(fileLength-1)){
			//alert("다음 파일이 없습니다.")

			//다음페이지 있으면 다음페이지 로딩후 첫번째 썸네일 로드
			if (! getOtherThumPage("next")){
				alert("다음 파일이 없습니다.");
			}
			return false;
		}
		$('#modal_remote').modal('hide');
		$(arr_thumLi).eq(curViewindex+1).trigger( "click" );

		//스크롤 처리
		$(arr_thumLi).closest(".thumDiv").scrollTo($(arr_thumLi).eq(curViewindex));
	})

	//스크롤시 모바일 트리 컨트롤
	/*
	$(window).scroll(function () {
		if(isMobile){
			pdsMobileTreeTopSet();
		}
	});
	*/

	//좌측 트리 높이 고정
	$("#ajax_tree").height(cHeight-290)

	//화면 회전시 처리
	$(window).on('orientationchange',function(event) {
		pdsMobileTreeTopSet();
	});


	//선택하여 다운로드
	$(document).on("click", ".checkedDownloadBtn", function(){
		var gubun = $(this).find("i:eq(0)").attr("gubun");
		var chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked")

		if(chkObj.length == 0){
			//alert(i18next.t("pds:msg.selectDownloadFilePlz"));
			swal({
				title: i18next.t("pds:msg.selectDownloadFilePlz"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});

			return;
		}else{
			multiFileDown(chkObj);
		}

	});


	//선택하여 파일삭제
	$(document).on("click", ".checkedFileDelBtn", function(){

		var gubun = $(this).find("i:eq(0)").attr("gubun");

		var chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");
		var others = null;

		if(AK != "A"){
			others = chkObj.filter(function() {
				return $(this).attr("uid") != uid;
			});

			//본인이 작성하지 않은글만 선택(alert 후 리턴)
			if (chkObj.length > 0 && chkObj.length == others.length){
				//alert("본인이 작성하지 않은 글은 삭제할 수 없습니다.");
				swal({
					title: i18next.t("pds:msg.cantDeleteOthers"),
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				}, function(){
					others.attr("checked", false);
					swal.close();
				});

				return;
			}
		}


		//선택한 글이 없는경우
		if(chkObj.length == 0){
			swal({
				title: i18next.t("pds:msg.selectDeleteFilePlz"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
			return;

		}else{
			var delMsg = ""

			//본인이 작성하지 않은글 포함 선택
			if(others !=null && others.length > 0){
				delMsg = i18next.t("pds:confirm.cantDeleteWidthOthers");
				others.attr("checked", false);
				chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");

			//본인이 작성한 글만 선택
			}else{
				delMsg = i18next.t("pds:confirm.selectedDeleteFile");
			}

			swal({
				title: delMsg,
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
						//url: "/Module/UserModule/pds/selectFileDel.do",
						url: "/module/usermodule/pds/selectFileDel",
						data: {
							"fsn" : chkObj.map(function() {return this.value;}).get().join(','),
							"SSID" : $("#gssid").val()
						},
						dataType: "json",
						success:function(data) {
							if(data.result == "success"){
								//alert(i18next.t("pds:msg.deleted"));
								swal({
									title: i18next.t("pds:msg.deleted"),
									showConfirmButton: false,
									type: "success",
									timer: 1000
								});

								$('#ajax_tree').jstree("refresh");		//트리 재로드
								latestTabReLoad();						//최근 등록자료 재로딩
							}else{
								//alert(i18next.t("pds:msg.wrongSubmit"));
								swal({
									title: i18next.t("pds:msg.wrongSubmit"),
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
		}
	});


	//선택하여 파일명수정
	$(document).on("click", ".checkedFileModifyBtn", function(){
		var gubun = $(this).find("i:eq(0)").attr("gubun");
		var chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");
		var others = null;

		//관리자가 아닌경우 본인글 체크
		if (AK != "A"){
			others = chkObj.filter(function() {
				return $(this).attr("uid") != uid;
			});

			//본인이 작성하지 않은글만 선택(alert 후 리턴)
			if (chkObj.length > 0 && chkObj.length == others.length){
				//alert("본인이 작성하지 않은 글은 삭제할 수 없습니다.");
				swal({
					title: i18next.t("pds:msg.cantEditOthers"),
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				}, function(){
					others.attr("checked", false);
					swal.close();
				});

				return;
			}
		}


		if(chkObj.length == 0){
			swal({
				title: i18next.t("pds:msg.selectEidtFilePlz"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
			return;
		}else{

			var editMsg = ""

			//본인이 작성하지 않은글 포함 선택
			if(others !=null && others.length > 0){

				others.attr("checked", false);
				chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");

				swal({
					title: i18next.t("pds:msg.cantEditOthers"),
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				}, function(){
					swal.close();
				});

			}


			$.ajax({
				type: "POST",
				//url: "/Module/UserModule/pds/editFileNameList.page",
				url: "/module/usermodule/pds/editFileNameList",
				data: {
					"fsn" : chkObj.map(function() {return this.value;}).get().join(',')
				},
				dataType: "html",
				success:function(data) {
					$("#modal_changeFileName").html(data)
					$("#modal_changeFileName").localize();
					$("#modal_changeFileName").modal("show");
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


	//선택하여 자료이동
	$("#pdsTab, #fab_folder, #fab_latest").on("click", ".checkedFileMoveBtn", function(){

		var gubun = $(this).find("i:eq(0)").attr("gubun");

		var chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");
		var others = null;

		if(AK != "A"){
			others = chkObj.filter(function() {
				return $(this).attr("uid") != uid;
			});

			//본인이 작성하지 않은글만 선택(alert 후 리턴)
			if (chkObj.length > 0 && chkObj.length == others.length){
				//alert("본인이 작성하지 않은 글은 이동할 수 없습니다.");
				swal({
					title: i18next.t("pds:msg.cantMoveOthers"),
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				}, function(){
					others.attr("checked", false);
					swal.close();
				});

				return;
			}
		}


		//선택한 글이 없는경우
		if(chkObj.length == 0){
			swal({
				title: i18next.t("pds:msg.selectMoveFilePlz"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});
			return;

		}else{
			var moveMsg = ""

			//본인이 작성하지 않은글 포함 선택
			if(others !=null && others.length > 0){
				moveMsg = i18next.t("pds:confirm.cantMoveWidthOthers");
				others.attr("checked", false);
				chkObj = $(gubun+"_wrapper").find(".chkSeqNo:checked");

			//본인이 작성한 글만 선택
			}else{
				//moveMsg = i18next.t("pds:confirm.selectedMoveFile");
				moveMsg = "";
			}

			//console.log("gubun : " + gubun)
			//console.log("fsn : " + chkObj.map(function() {return this.value;}).get().join(','));	//선택한 파일일련번호
			//console.log("folderSn : " + $("#folderSn").val());										//현재 폴더일련번호

			var fsn = chkObj.map(function() {return this.value;}).get().join(',');	//선택한 파일일련번호
			var folderSn = "";														//현재 폴더일련번호

			//폴더자료
			if (gubun == "#dataList"){
				folderSn = $("#folderSn").val();
				//console.log("folderSn_1 : " + $("#folderSn").val());

			//최신자료
			}else{
				if (chkObj.length == 1){
					folderSn = $(chkObj[0]).closest("tr").find(".icon-enter").attr("foldersn")
					//console.log("folderSn_2 : " + $("#folderSn").val());
				}
			}

			//console.log("gubun : " + gubun)
			//console.log("fsn : " + fsn);
			//console.log("folderSn : " + folderSn);

			if(moveMsg != ""){
				swal({
					title: moveMsg,
					type: "warning",
					html:true,
					showCancelButton: true,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: true,
					closeOnCancel: true
				},function(isConfirm){
					if(isConfirm){
						openModal_moveFolderSelect();
					}
				})
			}else{
				openModal_moveFolderSelect();
			}

			//권한없는 글 선택후 alert 분기 위해 내부 함수로 분리, 2017-12-19, 김영식
			function openModal_moveFolderSelect(){
				//폴더 선택 모달 오픈
				$.ajax({
					type: "POST",
					//url: "/Module/UserModule/pds/modal_moveFolderSelect.page",
					url: "/module/usermodule/pds/modalMoveFolderSelect",
					data:{
						"folderSn" : folderSn,
						"sn" : fsn
					},
					dataType: "html",
					success:function(data) {

						$("#modal_moveFolderSelect").html(data);
						$("#modal_moveFolderSelect").localize();
						$("#modal_moveFolderSelect").modal("show");

						$("#modal_moveFolderSelect .modal-body").height(cHeight-300)
						$("#modal_moveFolderSelect .modal-body").css("overflow", "auto")

					}
				});
			}

		}
	});



	//파일명 수정 모달 checkAll
	$("#modal_changeFileName").on("change", "input[name='checkAll']", function(){
		var checked = $(this).is(":checked");
		$(this).closest("table").find("input:checkbox[name='fsn']").each(function(){
			$(this).prop("checked", checked);
		})

	});

	//파일명 수정 저장 버튼
	$("#modal_changeFileName").on("click", "#btn_editFileName", function(){
		var checkedObj = $("#form_editFileNm input:checkbox[name='fsn']:checked");
		if(checkedObj.length == 0){
			//alert(i18next.t("pds:msg.selectEidtFilePlz"));
			swal({
				title: i18next.t("pds:msg.selectEidtFilePlz"),
				confirmButtonColor: "#f44336",
				closeOnConfirm: true,
				type: "error"
			});

			return;
		}else{
			if ($('#form_editFileNm').valid()){


				swal({
					title: i18next.t("pds:confirm.editOk"),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("btn.ok"),
					cancelButtonText: i18next.t("btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				},function(isConfirm){
					if(isConfirm){

						var param = "SSID=" + $("#gssid").val()
						//var param2 = $("#form_editFileNm input:checkbox[name='fsn']:checked").closest("tr").find("input").serialize();
						//param += "&" + param2

						var strFsn = $("#form_editFileNm input:checkbox[name='fsn']:checked").closest("tr").find("[name='fsn']").map(function(){ return this.value }).get().join();
						var strTitle = $("#form_editFileNm input:checkbox[name='fsn']:checked").closest("tr").find("[name='title']").map(function(){ return this.value }).get().join();
						var strRegDt = $("#form_editFileNm input:checkbox[name='fsn']:checked").closest("tr").find("[name='regDt']").map(function(){ return this.value }).get().join();

						param += "&fsn="+strFsn;
						param += "&title="+strTitle;
						param += "&regDt="+strRegDt;

						BlockShow();	//block-ui show

						$.ajax({
							type: "POST",
							//url: "/Module/UserModule/pds/editFileNameDml.do",
							url: "/module/usermodule/pds/editFileNameDml",
							data: param,
							dataType: "json",
							success:function(data) {
								if(data.result == "success"){
									$.unblockUI();

									swal({
										title: i18next.t("pds:msg.updated"),
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});

									$("#modal_changeFileName").modal("hide");
									$('#ajax_tree').jstree("refresh");			//트리 재로드
									latestTabReLoad();							//최근 등록자료 재로딩

								}else{
									$.unblockUI();
									//alert(i18next.t("pds:msg.wrongSubmit"));
									swal({
										title: i18next.t("pds:msg.wrongSubmit"),
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

			}
		}
	});






	//파일정보 전체파일 다운로드
	$(document).on("click", "#btn_fileInfo_down", function(){
			var fsnObj = $(".fileInfo_fsn")
				 multiFileDown(fsnObj);
	});

	//게시형 파일정보 전체파일 다운로드
	$(document).on("click", "#btn_groupFileInfo_down", function(){
			var fsnObj = $(".fileInfoGroup_fsn")
				 multiFileDown(fsnObj);
	});


	//게시형 개별파일 삭제버튼
	$("#modal_groupFileInfo").on("click", ".btn_deleteGroupFile", function(){
		var fsn = $(this).data("fsn");
		var sn = $(this).data("sn");
		var oTr = $(this).closest("tr");

		swal({
			title: i18next.t("pds:confirm.fileDelete"),
			type: "warning",
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
					//url: "/Module/UserModule/pds/selectGroupFileDel.do",
					url: "/module/usermodule/pds/selectGroupFileDel",
					data: {
						"fsn" : fsn,
						"sn" : sn,
						"SSID" : $("#gssid").val()
					},
					dataType: "json",
					success:function(data) {
						if(data.result == "success"){
							//alert(i18next.t("pds:msg.deleted"));
							swal({
								title: i18next.t("pds:msg.deleted"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							oTr.remove();	//해당 row삭제처리

							$('#ajax_tree').jstree("refresh");		//트리 재로드
							latestTabReLoad();						//최근 등록자료 재로딩

							/*
							$("#modal_fileInfo").modal("hide");
							$("#modal_groupFileInfo").modal("hide");

							$('#ajax_tree').jstree("refresh");		//트리 재로드
							latestTabReLoad();						//최근 등록자료 재로딩
							*/
						}else{
							//alert(i18next.t("pds:msg.wrongSubmit"));
							swal({
								title: i18next.t("pds:msg.wrongSubmit"),
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

	//파일정보 삭제버튼
	$(document).on("click", "#btn_fileInfo_del, #btn_groupFileInfo_del", function(){
		var fsn = $(this).attr("fsn");

		swal({
			title: i18next.t("pds:confirm.fileDelete"),
			type: "warning",
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
					//url: "/Module/UserModule/pds/selectFileDel.do",
					url: "/module/usermodule/pds/selectFileDel",
					data: {
						"fsn" : fsn,
						"SSID" : $("#gssid").val()
					},
					dataType: "json",
					success:function(data) {
						if(data.result == "success"){
							//alert(i18next.t("pds:msg.deleted"));
							swal({
								title: i18next.t("pds:msg.deleted"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							$("#modal_fileInfo").modal("hide");
							$("#modal_groupFileInfo").modal("hide");

							$('#ajax_tree').jstree("refresh");		//트리 재로드
							latestTabReLoad();						//최근 등록자료 재로딩
						}else{
							//alert(i18next.t("pds:msg.wrongSubmit"));
							swal({
								title: i18next.t("pds:msg.wrongSubmit"),
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


	/* 썸네일 클릭 (포커스 처리, 미리보기 처리) */
	$(document).on("click", ".thumLi", function(){

		//썸네일 배열
		arr_thumLi = $(this).parent().find("li").filter(function(){
			return $(this).attr("ext") == 'pdf' || ($(this).attr("ext") != 'pdf' && $(this).data("width") > 0)
		});

		fileLength = arr_thumLi.length;				//썸네일 갯수
		curViewindex = arr_thumLi.index(this);		//현재 index

		//console.log("arr_thumLi", arr_thumLi)
		//console.log("fileLength", fileLength)
		//console.log("curViewindex", curViewindex)


		$("#Prv_img").css("text-align","center");

		//썸네일 백그라운드 컬러 처리
		focusSmallPhoto($(this).find("div:eq(0)"))

		//데이터테이블 선택처리
		var datatablesId = $(this).attr("datatablesId");

		var tableWrapper = ""
		//if($(this).find("img:eq(0)").hasClass("tphotos")){
		if($(this).find(".thumImg").hasClass("tphotos")){
			//선택폴더 자료
			tableWrapper = "#dataList_wrapper"
		}else{
			//최근 등록자료
			tableWrapper = "#latestDataList_wrapper"
		}

		var oTr = $(tableWrapper).find("input[type=checkbox][value='"+datatablesId+"']").closest('tr');
		oTr.addClass('selected');
		oTr.siblings().removeClass('selected');
		//*** 데이터테이블 선택처리


		var fsn		= $(this).attr("fsn");
		var title	= $(this).attr("title");		//제목

		var iw		= $(this).attr("data-width");
		var ih		= $(this).attr("data-height");

		var tw		= $(this).attr("tw");
		var ext		= $(this).attr("ext");

		/*
		$("#modal_remote").find('.modal-title').html(title);
		$("#modal_remote").find('.modal-body img').attr("src", '');
		$("#modal_remote").find('.modal-body img').attr("src", '/Common/img.Do?fsn='+fsn+"&ssid="+ssid);
		*/

		//제목
		$("#modal_remote").find('.modal-title').html(title);

		/* PDF 처리 */
		if(ext == "pdf"){

			$("#modal_remote").find(".modal-dialog").width("95%");
			$("#modal_remote .modal-content").removeAttr( "style" );

			$(".img-small").attr("src", "");
			$("img.loaded").remove();
			$("#Prv_img").height(0);

			if (isMobile)
			{
				$("#modal_remote .modal-body").css("padding", "0px");
				frame_h=cHeight-100;
			}else{
				frame_h=cHeight-210;
			}


			$( "#Prv_PDF" ).html("");
			//$( "#Prv_PDF" ).append("<iframe width='100%' height='"+frame_h+"' src='"+"/Module/assets/js/plugins/pdfjs-1.8.170-dist/web/viewer.page?fsn="+fsn+"'></iframe>")
			$( "#Prv_PDF" ).append("<iframe width='100%' height='"+frame_h+"' src='/common/pdfViewer?fsn="+fsn+"'></iframe>")


			$("#modal_remote").modal("show");


		/* 일반 이미지 처리*/
		}else{

			if ( iw <= 0){ return; }

			$( "#Prv_PDF" ).html("");
			$("#Prv_img").removeAttr( "style" );

			var Prv_placeholder = $('.Prv_placeholder'),	  small =  $('.img-small')

			//기존로딩 이미지 삭제
			$(".img-small").attr("src", "");
			$('.Prv_placeholder img:not(.img-small)').remove();

			// 1: load small image and show it
			if (tw > 0){
				$('.img-small').show();
				//$(".img-small").attr("src", "/data/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext);
				$(".img-small").attr("src", "/common/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext);
				//console.log("/data/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext)

				var img = new Image();
				img.src =  $('.img-small').attr("src");
				img.onload = function () {
					small.addClass('loaded');
				};
			}

			// 2: load large image
			var imgLarge = new Image();
			// imgLarge.src = Prv_placeholder.dataset.large;
			//imgLarge.src = '/Common/img.Do?fsn='+fsn+"&ssid="+$("#gssid").val()
			imgLarge.src = '/common/img?fsn='+fsn+"&ssid="+$("#gssid").val()
			imgLarge.onload = function () {
				$('.img-small').hide();
				imgLarge.classList.add('loaded');
				//$('.loaded').css("position","relative");
			};
			Prv_placeholder.append(imgLarge);

			//이미지클릭 닫기 이벤트추가
			$("#modal_remote").find('.modal-body img').attr("data-dismiss", "modal");


			if (iw >= cWidth) //이미지가 윈도우보다 크면
			{
					if (!isMobile) //모바일이 아닌 경우
					{
						height_rate=ih/iw*100;
						view_img_height=cHeight-150;
						view_img_width =view_img_height*100/height_rate; //높이기준 넓이 산정

						if (view_img_width>cWidth) //높이기준으로 이미지 넓이를 산정했으나, 넓이가 윈도우 넓이보다 큰경우(와이드)
						{

							$("#modal_remote").find(".modal-dialog").width("95%");
							$("#modal_remote").find('.modal-body img').css("width", "100%");
							$("#modal_remote").find('.modal-body img').css("height", "auto");
							$("#modal_remote .modal-content").css("left", "");
						}else{

								$("#modal_remote").find(".modal-dialog").width(view_img_width+50+"px");
								$("#modal_remote").find('.modal-body img').css("width", view_img_width+"px");
								$("#modal_remote").find('.modal-body img').css("height", view_img_height+"px");

								cwinPx=(parseInt(view_img_width)+50) ;
								modal_c = $(window).width() / 2 - cwinPx / 2;
								$("#modal_remote .modal-content").css("left", modal_c);
								$("#modal_remote").find(".modal-dialog").css("margin-top", "10px");
						}

					}else{ //모바일인 경우

						$("#modal_remote").find(".modal-dialog").width("95%");
						$("#modal_remote").find('.modal-body img').css("width", "100%");
						$("#modal_remote").find('.modal-body img').css("height", "auto");

					}



			}else{

					cwinPx=(parseInt(iw)+50) ;
					if (cwinPx <320) // 최소해상도 320보다 작으면 창사이즈를 320으로 고정
					{
							cwinPx =320;
					}

					$("#modal_remote").find(".modal-dialog").width(cwinPx+"px");
					$("#modal_remote").find('.modal-body img').css("width", iw+"px");
					$("#modal_remote").find('.modal-body img').css("height", "");
					modal_c = $(window).width() / 2 - cwinPx / 2;

					if (!isMobile)
					{
						$("#modal_remote .modal-content").css("left", modal_c);
					}else{
						if (iw<320)
						{
							$("#modal_remote").find(".modal-dialog").css("margin", "auto");
						}
						$("#modal_remote .modal-content").css("left", "");
					}

					$("#modal_remote").find('.modal-body').addClass("text-center");						//이미지 중앙정렬
					$("#modal_remote").find('.Prv_placeholder').css("background-color", "#FFFFFF")		//이미지홀더 컬러 제거
			}

			$("#modal_remote").modal("show");


		}

	});


	 /*모달 숨기기*/
	 $('#Prv_img img, .img_close').on('click', function() {
			$('#modal_remote').modal('hide')
	 });


	//여러개 자료 다운로드
	function multiFileDown(arrFormObj){
		if (isBrowser=="ch"){
			arrFormObj.each(function(index){
				//일반형
				if($(this).val().indexOf("g_") < 0){
					var fileSeqNo = $(this).closest("tr").find(".fileDown").attr("fileseq");
					FileDown(fileSeqNo);

				//게시형
				}else{
					pdsGroupfileDown($(this).val());
				}
			});

		}else{
			//크롬이 아닌경우 일반형/게시형을 함께 압축한다.
			//$.fileDownload("/Module/UserModule/pds/zip_checkedFiles.do", {
			$.fileDownload("/module/usermodule/pds/zipCheckedfiles", {
				successCallback : function () {
					//console.log('File download a success!~~~~~');
				},
				failCallback: function (responseHtml, url) {
					//console.log('File download failed!');
				},
				httpMethod: "POST",
				data: {
					"fsn" : arrFormObj.map(function() {return this.value;}).get().join(',')
				},
				cookieName: "ssn"+$("#gssid").val()
			});
		}
	}

	//모바일인 경우 트리 버튼 SHOW
	if(isMobile){
		$(".pds-tree-btn").show();
		$("#treeCol").hide();

		$(".pdsMobileTree").html($("#treeCol").html());	//트리 슬라이드 메뉴에 넣기
		$("#treeCol").html("");		//기존 트리 부분 삭제
		$(".pdsMobileTree").show();	//슬라이드 트리 보이기
	}

	//모바일 트리버튼 클릭
	$(".pds-tree-btn").on("click", function(){
		if(! $(".pdsMobileTree").hasClass("SideTreeActive")){
			pdsMobileTreeTopSet();
			pdsMTreeShow();
		}else{
			pdsMTreeHide();
		}
	});


	//썸네일 사용여부 쿠키값 변수에 담기 및 영역 초기화
	if($.cookie("pdsthumUse_"+$.cookie("menu_Seqno")) == "false"){
		PDS_useThumnail = false;
		$("#thumSwitch").trigger("click")

		$("#pdsSmallPhotoList, #latest_pdsSmallPhotoList").hide();	//썸네일영역 숨기기
	}


	//썸네일 보이기/숨기기 스위치
	$("#thumSwitch").on("click", function(){
		var checked = $("#thumSwitch").is(":checked");
		if(checked){
			$("#pdsSmallPhotoList, #latest_pdsSmallPhotoList").show();
			$.cookie("pdsthumUse_"+$.cookie("menu_Seqno"), null);	//쿠키삭제
			PDS_useThumnail = true;

			//썸네일 불러오기
			/*
			getSmallPhotoList();
			getLatestSmallPhotoList();
			*/

			// 썸네일 영역 그리기
			drawThumArea("folder", t1.ajax.json().thumData);
			drawThumArea("latest", t2.ajax.json().thumData);

		}else{
			$("#pdsSmallPhotoList, #latest_pdsSmallPhotoList").hide();
			$.cookie("pdsthumUse_"+$.cookie("menu_Seqno"), "false", { expires : 3600 });		//쿠키에 저장
			PDS_useThumnail = false;
		}
	});


	/* 파일정보, 게시형파일정보 태그 저장 */
	$("#modal_fileInfo, #modal_groupFileInfo").on("click", ".btn_saveTag", function(){
		var sn		= $(this).attr("sn");
		var title	= $(this).attr("title");
		var tags	= $(this).closest("form").find("input[name='tags']").val();

		$.ajax({
			type: "POST",
			url: "/Module/UserModule/pds/updateTag.do",
			data: {
				"sn" : sn,
				"title" : title,
				"SSID"	: $("#gssid").val(),
				"tags"	: tags
			},
			dataType: "json",
			success:function(data) {
				if(data.result == "success"){
					//alert(i18next.t("pds:msg.updated"));
					swal({
						title: i18next.t("pds:msg.updated"),
						showConfirmButton: false,
						type: "success",
						timer: 1000
					});

					//일반형
					if(sn.indexOf("g_") < 0){
						openFileInfo(sn);
					//게시형
					}else{
						openGroupFileInfo(sn);
					}

				}else{
					//alert(i18next.t("pds:msg.wrongSubmit"));
					swal({
						title: i18next.t("pds:msg.wrongSubmit"),
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

	});


	//자료이동 폴더선택 모달
	$("#modal_fileInfo, #modal_groupFileInfo").on("click", ".btn_moveFolder", function(){
		$.ajax({
			type: "POST",
			//url: "/Module/UserModule/pds/modal_moveFolderSelect.page",
			url: "/module/usermodule/pds/modalMoveFolderSelect",
			data:{
				"folderSn" : $("#folderSn").val(),	//현재폴더번호
				"sn" : $(this).data("sn")
			},
			dataType: "html",
			success:function(data) {

				$("#modal_moveFolderSelect").html(data);
				$("#modal_moveFolderSelect").localize();
				$("#modal_moveFolderSelect").modal("show");

				$("#modal_moveFolderSelect .modal-body").height(cHeight-300)
				$("#modal_moveFolderSelect .modal-body").css("overflow", "auto")

			}
		});
	});

});


//768(ipad) 이하 화면에서 페이징카운트 하단으로 이동
function changeDTUiForMobile(){

		//if(isMobile && cWidth < 768){
			//목록수 조정 하단이동 추가
			listSize=$("#dataList_info");
			$("#dataList_length").insertBefore(listSize);

			listSize=$("#latestDataList_info");
			$("#latestdataList_length").insertBefore(listSize);
		//}

	/*
	if(isMobile && cWidth < 768){
		var html = "";
		html += "<div class='row'>"
		html += "	<div class='col-xs-6 newPagingInfo'></div>"
		html += "	<div class='col-xs-6 newPageingCount'></div>"
		html += "</div>"

		$("#folder_tab, #latest_tab").each(function(){
			var df = $(this).find(".datatable-footer");
			df.prepend(html);

			df.find(".newPagingInfo").append(df.find(".dataTables_info"))
			df.find(".newPageingCount").html($(this).find(".dataTables_length"))

		});
	}*/
}


//트리 슬라이드 열기
function pdsMTreeShow(){
	$(".pdsMobileTree").addClass("SideTreeActive");
}

//트리 슬라이드 닫기
function pdsMTreeHide(){
	$(".pdsMobileTree").removeClass("SideTreeActive");
}


//모바일 트리슬라이드바 높이 조정
function pdsMobileTreeTopSet(){
	//$(".SideActive").height(cHeight);
	var scrollTop_v = $(document).scrollTop();
	var mTreeTop = 0
	/*
	if (scrollTop_v <= 50) {
		mTreeTop = 48
	}else{
		mTreeTop = 0
	}
	*/

	$(window).resize(function() {
		var	ccHeight = $(window).height();
		$(".pdsMobileTree").css("top", mTreeTop);
		$(".pdsMobileTree").find(".panel").height(ccHeight-mTreeTop);	//트리 영역 높이 조정
		var panelHeight = $(".pdsMobileTree").find(".panel").height();
		$("#ajax_tree").height(panelHeight-mTreeOffSet);
	});

	$(window).resize();
}


//썸네일 영역 그리기
function drawThumArea(gubun, thumData){
	var html = "";
	var targetDiv = "";
	var idGubun = ""

	if(gubun == "folder"){
		targetDiv	= "#pdsSmallPhotoList"
		idGubun		= "tphotos"

	}else{
		targetDiv	= "#latest_pdsSmallPhotoList"
		idGubun		= "latest_photos"
	}

	$(targetDiv).html("");

	if(thumData != undefined){

		if(PDS_useThumnail){	//썸네일 사용인 경우만 실행
			html += "<div class='thumbnail_container'>"
			html += "	<ul>"
			for(var i=0; i < thumData.length; i++){
				var mode			= thumData[i].mode;
				var sn				= thumData[i].sn;
				var rev				= thumData[i].rev;
				var ext				= thumData[i].ext;
				var fileSn			= thumData[i].fileSn;
				var fileImgWidth	= thumData[i].fileImgWidth;
				var fileImgHeight	= thumData[i].fileImgHeight;
				var fileNm			= thumData[i].fileNm;
				var thumReplaceImg	= thumData[i].thumReplaceImg;
				var viewAuth	= thumData[i].viewAuth;

				var imgId = idGubun + "_" + sn;

				var title = ""
				if(gubun == "folder"){
					title = "R."+rev+" : "+fileNm
				}else{
					title = fileNm
				}

				if(viewAuth == "Y"){
					html += "	<li class='thumLi' data-width='"+fileImgWidth+"' data-height='"+fileImgHeight+"' title='"+fileNm+"' ext='"+ext+"' tw='150' fsn='"+fileSn+"' datatablesId='"+sn+"' style='cursor:pointer'>"
					html += "		<div class='thumWrap ellipsis text-center'>"

					//썸네일 대체이미지 없으면 (이미지 파일인 경우)
					if (thumReplaceImg == ""){
						//html += "			<img src='/Data/imgThum/"+mc+"_150_"+fileSn+"."+ext+"' title='"+fileNm+"' class='"+idGubun+" thumImg' id='"+imgId+"'>"
						html += "			<img src='/common/imgThum/"+mc+"_150_"+fileSn+"."+ext+"' title='"+fileNm+"' class='"+idGubun+" thumImg' id='"+imgId+"'>"
					}else{
						//html += "			<img src='"+thumReplaceImg+"' border='0' class='"+idGubun+"' title='"+fileNm+"' id='"+imgId+"'>"
						html += "			<center calss='extWrap'><i class='"+thumReplaceImg+" "+idGubun+" thumImg' id='"+imgId+"' ></i></center>"
					}

					html += "		</div>"
					html += "		<div style='width:158px;' class='text-center ellipsis'>"
					html += "			"+title+""
					html += "		</div>"
					html += "	</li>"
				}
			}
			html += "	</ul>"
			html += "</div>"

			$(targetDiv).html(html);

			thumbnailContainerWidthCalc(targetDiv);	//스크롤 컨테이너 넓이 계산/반영
		}
	}
}





	//Back, forword버튼 처리
	window.onpopstate = function(e) {
		try{
			FnName	= e.state.FnName;
			url		= e.state.url;
			data	= e.state.data;


			//폴더선택
			if(FnName == "treeSelected"){
				window[FnName](data, "n");

				//부모노트 open
				if( data.node.parent != "#" && !$("#ajax_tree").jstree("is_open", $("#"+data.node.parent)) ){
					$("#ajax_tree").jstree("open_node", $("#"+data.node.parent));
				}

				//트리 선택처리
				$('#ajax_tree').jstree().deselect_all();
				var tree_sn = data.node.id
				$("#"+tree_sn).attr("aria-selected", true);
				$("#"+tree_sn+">div").addClass("jstree-wholerow-clicked");
				$("#"+tree_sn+">a").addClass("jstree-clicked");

				//기존에 떠있는 modal close
				$("#modal_upload").modal("hide")
				$("#modal_fileInfo").modal("hide")
				$("#modal_groupFileInfo").modal("hide")
				$("#modal_changeFileName").modal("hide")
			}

		}
		catch (e){}
	};