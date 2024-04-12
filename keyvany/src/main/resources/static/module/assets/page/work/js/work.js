
var timerId = 0;	//타이머 인터벌 ID

$(function(){

	// 다국어 초기화
	i18next.loadNamespaces(["work", "editor"], function(err, t){
		//jquery 사용위해 선언
		jqueryI18next.init(i18next, $);
		//$('body').localize();				//다국어 반영
	});


	/*-------------------------------------------------------------------------------------------------*/
	/********************************************* 버튼 이벤트 *****************************************/
	/*-------------------------------------------------------------------------------------------------*/


	/*-------------------------------------------------------------------------------------------------*/
	/********************************************* //버튼 이벤트 ***************************************/
	/*-------------------------------------------------------------------------------------------------*/

});

//i18next 로드 완료
function fn_i18nextLoaded(){

	//처음 로딩완료되면 Task 목록 페이지 로딩
	loadTaskList();

	//벨리데이션 다국어 처리
	validatorI18n();

	//언어 변경시 다국어 처리
	i18next.on('languageChanged', function(lng) {
		validatorI18n();
	});

	//벨리데이션 공통함수 초기화
	initValidCommon();
}


//테스크 리스트 로드 (첫페이지)
function loadTaskList(hMode){

	//메뉴클릭하고 들어오는 경우(history.back() 이나 새로고침으로 들어오는 경우가 아닌경우) datatable state 삭제
	if (hMode != "n" && performance.navigation.type != 1){
		localStorage.removeItem("DataTables_datatable_task_/service.do");
	}

	var param = ""
	$.post(
		//"/Module/UserModule/Work/taskList.page",
		"/module/usermodule/work/tasklist",
		param,
		function(data){
			$("#panelArea").html(data);
			$("#panelArea").localize();

			if (hMode != "n"){

				if(performance.navigation.type != 1){	//새로고침이 아니면
					window.history.replaceState({"data":"", "FnName":"loadTaskList"}  , "", location.href);
				}
			}
		}
	)
}

//테스크 등록/수정 로드
function loadTaskEdit(sn){
	var param = {"sn":sn}
	$.post(
		//"/Module/UserModule/Work/taskEdit.page",
		"/module/usermodule/work/taskedit",
		param,
		function(data){
			$("#panelArea").html(data);
			$("#panelArea").localize();
			$("body").scrollTop(0);
		}
	)
}


//테스크 상세 로드
function loadTaskDetail(sn){
	$.ajax({
		type: "POST",
		//url: "/Module/UserModule/Work/taskDetail.page",
		url: "/module/usermodule/work/taskdetail",
		data: {
			"sn" : sn
		},
		async: false,
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

//프로젝트 관리 목록 OPEN
function openProjectMgrList(){
	$.post(
		//"/Module/UserModule/Work/projectMgrList.page",
		"/module/usermodule/work/projectmgrlist",
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
		//"/Module/UserModule/Work/projectMgrEdit.page",
		"/module/usermodule/work/projectmgredit",
		param,
		function(data) {
			$("#modal_projectMgr").html(data);
			$("#modal_projectMgr").localize();
			$("#modal_projectMgr").modal("show");
		}
	)
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
			title: i18next.t("work:validation.insertContent"),
			confirmButtonColor: "#66BB6A",
			closeOnConfirm: true,
			type: "warning"
		},
		function() {
			setTimeout(function(){
				tinymce.get("taskContents").focus();
			}, 500)
		});
		return false;
	}else{
		return true;
	}
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
			//console.log(data)
			window[FnName](data.sn);
		}

	}catch (e){}
}