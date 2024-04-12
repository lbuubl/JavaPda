/* ------------------------------------------------------------------------------
*
 전자결재 공통 결재선 지정 자바스크립트
*
* ---------------------------------------------------------------------------- */

var objDataArray; //data table row 저장 배열
var tSelectIds= new Array(); //데이터테이블 선택값 저장 배열
var tUserLoad1 ;
var tUserLoad1_Id = "#userList";

var tableInitFalg = true; //트리 init 이벤트 한번만 바인딩 하게끔 처리
$(document).ready(function(){

	//배열 초기화
	objDataArray = [];
	userListArray = [];
	tSelectIds = [];

	//기본 결재선 지정
	defaultAppLineInit();
	//기본 열람권한 지정
	defaultViewAuthInit();
	//기본 수신자 지정
	defaultReceiveInit();

	//트리 로드
	loadOBSTreeSet("#Modal_appLineGrpTree");

	//버튼 이벤트 바인딩


	//라인그룹 체인지 이벤트
	$("#appLineModal").on("change",".line-select-box",function(e){


		if($(this).val()!=""){
			$("#lineSeq").val($(this).val());
			$("#lineType").val($(this).data("type"));
			userSaveLineLoad();
		}
	});

	//라인저장모달호출
	$("#appLineModal").on("click",".btn-lineSave",function(e){
		$("#lineType").val($(this).data("type"));
		lineSaveMoadlLoad()
	});

		//라인저장모달호출
	$("#appLineModal").on("click",".btn-lineDel",function(e){
		//$("#lineType").val($(this).data("type"));

		var _id="";
		if($(this).data("type") == "1"){
			_id = "#appLineBox";
		}else{
			_id = "#revLineBox";
		}

		if($(_id).val() == "" ){
			showSwal("저장된 정보를 선택해주세요!","warning");
			return false;
		}

		swal({
			title: i18next.t("approval:msg.delYn"),
			//text: "You will not be able to recover this imaginary file!",
			type: "warning",
			confirmButtonClass: 'btn-primary',
			confirmButtonText: i18next.t("approval:button.confirm"),
			cancelButtonText: i18next.t("approval:button.cancel"),

			showCancelButton: true,
			closeOnConfirm: false

		},function(isConfirm){
			if (isConfirm)
			{
				//swal.close();

				$("#lineDmlType").val("del");
				lineSaveDML();

			}
		});

		//lineSaveMoadlLoad()

	});

	//라인저장버튼
	$("#appLineSaveModal").on("click",".lineSaveSubmit",function(e){


		var dataArr = []; // title, value , text 순서

		var lineNm = $("#lineTitle").val();


		if(lineNm == ""){
			showSwal(i18next.t("approval:msg.insertToLineNm"),"warning");
			return false;
		}


		var objId = "";

		if($("#lineType").val()=="1"){
			objId = "#selectedApprovalBox li"
		}else{
			objId = "#receiveBox li"

		}
		if($(objId).length == 0 ){
			showSwal(i18next.t("approval:msg.lineNotFound"),"warning");
			return false;
		}
		//결재선 지정
		$(objId).each(function(i,item){
			dataArr.push(item.title + "@@" + $(item).data("value") + "@@" + $(item).text());
		});

		$("#lineDmlType").val("add");
		var data = dataArr.join("||");
		lineSaveDML(data);

	});



	$("#appLineModal").on("click","#btn_appLineL",function(e){
		if(fn_addLineCheck()){
			fn_btnAppLineAdd("L");
		}
	});
	$("#appLineModal").on("click","#btn_appLineNL",function(e){
		if(fn_addLineCheck()){
			fn_btnAppLineAdd("NL");
		}
	});
	$("#appLineModal").on("click","#btn_appLineD",function(e){
		if($("#selectedApprovalBox li.ui-selected").length==0){
			showSwal(i18next.t("approval:msg.noSelectData"),"warning");
			return false;
		}
		//Delete
		fn_btnAppLineDel();
	});

	//열람권한 인원추가
	$("#appLineModal").on("click","#btn_authM",function(e){
		if(!fn_addLineCheck()){
			return false;
		}
		var optHtml = "";
		var val = "";

		/* 일반 사용자
		 * appLines =  [0]:UserSeq 사용자Seq , [1]:Nm 사용자명 ,[2]OBSCode ,[3] : 사용자OBSSeq, [4]OBS 구분자
		 *
		 *
		 * OBS그룹
		 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름  ,[2]OBSCode , [3] : GrpOBSSeq	 , [4]OBS 구분자
		 *
		 */

		for (i=0; i<objDataArray.length ;i++ )
		{
			//console.log(objDataArray);
			//같은 value 있는지 체크...
			//console.log($("#viewAuthBox li[data-value*='"+objDataArray[i][5]+"'][data-value*='"+objDataArray[i][8]+"']"));
			if($("#viewAuthBox li[data-value*='"+objDataArray[i][5]+"'][data-value*='"+objDataArray[i][8]+"']").length == 0 ){
				// seqno, nm , obsCode , kind
				//optHtml = optHtml+"<option style='background-color:#ddd;' title='"+ objDataArray[i][9] +"' value='"+objDataArray[i][5]+"_"+objDataArray[i][6]+"_"+objDataArray[i][3]+"_"+objDataArray[i][8]+"'>"+objDataArray[i][2]+"</option> " ;
				//console.log(objDataArray[i]);
				optHtml = optHtml+"<li style='background-color:#ddd;' title='"+ objDataArray[i][9] +"' data-value='"+objDataArray[i][5]+"_"+objDataArray[i][6]+"_"+objDataArray[i][3]+"_M'>"+objDataArray[i][2]+"</li> " ;
			}


		}

		$("#viewAuthBox").append(optHtml);
		//초기화
		fn_ArrayReset();

	});

	//열람권한 그룹추가
	$("#appLineModal").on("click","#btn_authGrp",function(e){

		var nSeq = $("#Modal_appLineGrpTree").jstree().get_selected();
		if(nSeq!=""){
			//console.log($("#Modal_appLineGrpTree").jstree().get_json(nSeq));

			var fnm = $("#Modal_appLineGrpTree").jstree().get_json(nSeq).a_attr.Fnm
			var t = $("#Modal_appLineGrpTree").jstree().get_json(nSeq).a_attr.T
			var ocd = $("#Modal_appLineGrpTree").jstree().get_json(nSeq).a_attr.ocd
			var	osq = $("#Modal_appLineGrpTree").jstree().get_json(nSeq).a_attr.osq ;
			var nm = $("#Modal_appLineGrpTree").jstree().get_json(nSeq).text ;
			var optHtml="";


		/* 일반 사용자
		 * appLines =  [0]:UserSeq 사용자Seq , [1]:Nm 사용자명 ,[2]OBSCode ,[3] : 사용자OBSSeq, [4]OBS 구분자
		 *
		 *
		 * OBS그룹
		 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름  ,[2]OBSCode , [3] : GrpOBSSeq	 , [4]OBS 구분자
		 *
		 */

			//같은 value 있는지 체크...
			if($("#viewAuthBox li[data-value*='"+nSeq+"'][data-value*='"+t+"']").length == 0){

				//optHtml = "<option style='background-color:#ddd;' title='"+fnm+"' value='"+nSeq+"_"+nm+"_"+ocd+"_"+t+"_0'>"+nm+"</option> " ;
				optHtml = "<li style='background-color:#ddd;' title='"+fnm+"'data-value='"+nSeq+"_"+nm+"_"+ocd+"_G'>"+nm+"</li> " ;
				$("#viewAuthBox").append(optHtml);
			}

		}
	});

	//열람권한 인원삭제
	$("#appLineModal").on("click","#btn_authD",function(e){
		if($("#viewAuthBox li.ui-selected").length==0){
			showSwal(i18next.t("approval:msg.noSelectData"),"warning");
			return false;
		}
		$("#viewAuthBox li.ui-selected").remove();
	})




	//결재선추가 모달 호출
	$("#appLineModal").on("click","#btn_addAppLine",function(e){
		$.ajax({
			//url:"/data.do?callcmd=APP_addAppLine",  //결재선 추가 페이지 로드
			//url:"/module/UserModule/approval/common/Modal-addAppLine.page",  //결재선 추가 페이지 로드
			//url:"/module/UserModule/approval/common/Modal-addAppLine-mobile.page",
			url:"/module/usermodule/approval/common/modalAddAppLineMobile",
			type:"POST",
			dataType:"html",
			success:function(data){
				$('#modal_addAppLineDiv').html(data);
			},
			error:function(data){
				alert("err//"+data.message);
			}
		});
	})


	//수신자 인원추가
	$("#appLineModal").on("click","#btn_recvM",function(e){
		if(!fn_addLineCheck()){
			return false;
		}
		var nSeq = $("#Modal_appLineGrpTree").jstree().get_selected();

		if(nSeq!=""){

			var node;

			node = $("#Modal_appLineGrpTree").jstree().get_json(nSeq);

			var fnm = node.a_attr.Fnm
			var t	= node.a_attr.T
			var ocd = node.a_attr.ocd
			var	osq = node.a_attr.osq ;
			var nm	= node.text ;


			/* 일반 사용자
			 * appLines =  [0]:UserSeq 사용자Seq , [1]:Nm 사용자명 , [2] : GrpOBSSeq, [3]OBS 구분자
			 *
			 *
			 * OBS그룹
			 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm 구분코드 , [2] : 선택그룹 전체 사용자 , [3]임시값? M30, [4]FullPath
			 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름 , [2] : GrpOBSSeq , [3]OBS 구분자
			 *
			 */

			var appRG = $("#tmpReceiveGroup").val().split("||");
			// 공통
			// appRG = [0]:ReceiveGrp OBS명칭, [1]:IsNextGrp(0:다음그룹 없음, 1:다음그룹 있음) 다음그룹있으면서 option값이 없는경우 문제, [2]:receiveKind (0:그룹, 1:멤버), [3]:receiveObsSeqno, [4]:hqObsSeqno, [5]:receiveGongu


			var optHtml = "";

			//OBS 정보 같은경우 그대로 추가
			//console.log(appRG[3] , nSeq);
			//console.log(appRG[3]==nSeq)
			if(appRG[3] == nSeq){
				//그룹이 있다면 삭제..
				if($("#receiveBox li[data-value*='_G']").length > 0){
					//삭제하고 새로 넣을것인지 묻기
					if(confirm(i18next.t("approval:msg.grpInfoReset"))){
						$("#receiveBox li[data-value*='_G']").remove();
						$(objDataArray).each(function(i,item){
							if($("#receiveBox OPTION[value*='"+$(item)[5]+"']").length == 0 ){
							//optHtml = optHtml + "<option value='"+$(item)[5]+'_'+$(item)[6]+" "+$(item)[7] +'_'+$(item)[3]+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"'>"+$(item)[6]+" "+$(item)[7] +"</option>";
							//optHtml = optHtml + "<li  class='ui-widget-content' data-value='"+$(item)[1]+'_'+$(item)[6]+" "+$(item)[7] +'_'+$("#osq").val()+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"'>"+$(item)[6]+" "+$(item)[7] +"</li>";
								optHtml = optHtml + "<li  class='ui-widget-content' data-value='"+$(item)[5]+'_'+$(item)[6]+" "+$(item)[7] +'_'+osq+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"'>"+$(item)[6]+" "+$(item)[7] +"</li>";
							}
						})
						appRG[2]="1";
						$("#receiveBox").append(optHtml);
						fn_ArrayReset();
					}
				}else{
					$(objDataArray).each(function(i,item){
					//중복체크
						if($("#receiveBox li[data-value*='"+$(item)[5]+"']").length == 0 ){
							//optHtml = optHtml + "<li  class='ui-widget-content' data-value='"+$(item)[1]+'_'+$(item)[6] +'_'+$("#osq").val()+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"' >"+$(item)[6]+" "+$(item)[7] +"</li>";
							optHtml = optHtml + "<li  class='ui-widget-content' data-value='"+$(item)[5]+'_'+$(item)[6] +'_'+osq+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"' >"+$(item)[6]+" "+$(item)[7] +"</li>";
						}
					})
					appRG[2]="1";
					$("#receiveBox").append(optHtml);
					fn_ArrayReset();
				}

			}else{
				if(confirm(i18next.t("approval:msg.grpInfoReset"))){
					//리셋
					$("#receiveBox li").remove();
					$(objDataArray).each(function(i,item){
						//optHtml = optHtml + "<li class='ui-widget-content' data-value='"+$(item)[1]+'_'+$(item)[6] +'_'+$("#osq").val()+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"' >"+$(item)[6]+" "+$(item)[7] +"</li>";
						optHtml = optHtml + "<li  class='ui-widget-content' data-value='"+$(item)[5]+'_'+$(item)[6] +'_'+osq+'_'+$(item)[8]+"' title='"+nm+">"+$(item)[6]+" "+$(item)[7]+"' >"+$(item)[6]+" "+$(item)[7] +"</li>";
					})
					$("#receiveBox").append(optHtml);

					//appRG 설정;
					appRG[0]=fnm;
					appRG[2]="1";
					appRG[3]=nSeq;

					//tmpReceiveGroup값(obs group정보) 변경
					var appTxt ="";
					appTxt = appRG.join("||");

					$("#tmpReceiveGroup").val(appTxt)


					//초기화
					fn_ArrayReset();
				}
			}

			$("#tmpReceiveGroup").val(appRG.join("||"));
		}
	})

	//수신자 그룹추가
	$("#appLineModal").on("click","#btn_recvGrp",function(e){

		var nSeq = $("#Modal_appLineGrpTree").jstree().get_selected();

		if(nSeq!=""){

			var node = $("#Modal_appLineGrpTree").jstree().get_json(nSeq);

			//console.log(node);
			var fnm = node.a_attr.Fnm
			var t	= node.a_attr.T
			var ocd = node.a_attr.ocd
			var	osq = node.a_attr.osq ;
			var nm	= node.text ;


			/* 일반 사용자
			 * appLines =  [0]:UserSeq 사용자Seq , [1]:Nm 사용자명 , [2] : GrpOBSSeq, [3]OBS 구분자
			 *
			 *
			 * OBS그룹
			 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm 구분코드 , [2] : 선택그룹 전체 사용자 , [3]임시값? M30, [4]FullPath
			 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름 , [2] : GrpOBSSeq , [3]OBS 구분자
			 *
			 */

			var appRG = $("#tmpReceiveGroup").val().split("||");

			// 공통
			// appRG = [0]:ReceiveGrp OBS명칭, [1]:IsNextGrp(0:다음그룹 없음, 1:다음그룹 있음) 다음그룹있으면서 option값이 없는경우 문제, [2]:receiveKind (0:그룹, 1:멤버), [3]:receiveObsSeqno, [4]:hqObsSeqno, [5]:receiveGongu


			var optHtml = "";

			//OBS 정보 같은경우 그대로 추가
			//console.log(appRG[3] , nSeq);
			//console.log(appRG[3]==nSeq)

			if(confirm(i18next.t("approval:msg.settingReset"))){

				//리셋
				$("#receiveBox li").remove();
				optHtml = optHtml + "<li class='ui-widget-content' data-value='"+nSeq+'_'+nm+'_'+ocd+'_'+ t +"' title='"+nm+"' >"+nm+"</li>";
				$("#receiveBox").append(optHtml);

				//appRG 설정;
				appRG[0]=fnm;
				appRG[2]="0";
				appRG[3]=nSeq;

				//tmpReceiveGroup값(obs group정보) 변경
				$("#tmpReceiveGroup").val(appRG.join("||"));
			}
			//초기화
			fn_ArrayReset();
		}
	})

	//수신자 인원삭제
	$("#appLineModal").on("click","#btn_recvD",function(e){
		if($("#receiveBox li.ui-selected").length==0){
			showSwal(i18next.t("approval:msg.noSelectData"),"warning");
			return false;
		}
		$("#receiveBox li.ui-selected").remove();
	})


	//결재선&열람권한&수신자 지정 후 저장버튼 클릭시
	$("#appLineModal").on("click","#setAppLineSave",function(e){
		var itemArr;

		//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
		//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)


		//==========================================================================================
		//마지막 결재자 뒤에 회람자만 있는지 체크

		var option = $("#selectedApprovalBox li");

		var item=null;
		var lastAppLineIdx = -1;
		var lastAppLineFlag = true;

		var addLineCheck = false; //결재자 최소 1명 이상인지 체크
		$("#selectedApprovalBox li").each(function(i,item){
			//결재자가 있으면서 ( 신규결재자에 사용자가 등록되있는 경우만 )
			if($(item).data("value").split("_")[4] == "1" && ( $(item).data("value").split("_")[1] !="0" || ($(item).data("value").split("_")[1] =="0" && $(item).data("value").split("_")[3] !="0" ) ) ){
				addLineCheck = true;
				return false;
			}
		});

		//결재자 1명도 없는경우
		if(addLineCheck != true){
			 showSwal( i18next.t("approval:msg.addAppLineFailLMsg"),"warning")
			return false;
		}

		//마지막 결재자 정보 조회
		for(var i=option.length-1; i>=0 ; i--){
			item = $(option[i]).data("value").split("_");
			//결재타입 결재면서 결재자 지정되어있는경우
			if( item[4] == "1" && item[3] != "30"){
				lastAppLineIdx = i+1;
				break;
			}
		}

		//마지막 결재자 뒤에 회람 이외의 인원지정이 되어있는경우 체크
		if(lastAppLineIdx >= 0 ){
			for(var i = lastAppLineIdx ; i < option.length-1 ; i++){
				//console.log("lastAppLineIdx"+lastAppLineIdx+",option.length="+option.length);

				if(typeof($(option[i]).data("value")) != "undefined"){
					item = $(option[i]).data("value").split("_");
					if( item[4] != "4" && item[3] != "30"){
						lastAppLineFlag = false;
						break;
					}

				}else{
					lastAppLineFlag = false;
					break;
				}

			}
		}
		if(!lastAppLineFlag){
			showSwal( i18next.t("approval:msg.addAppLineFailOnlyVL"),"warning")
			return false;
		}
		//==========================================================================================



		//추가 결재선 사용자 지정되었는지 체크하는 변수
		var addLineFlag = true;
		$("#selectedApprovalBox li").each(function(i,item){
			itemArr = $(item).data("value").split("_");
			if(itemArr[1] == "0" && itemArr[3] == "0" ){
				//console.log(itemArr);
				addLineFlag = false;
				return false;
			}

		});

		//추가 결재선에 인원맵핑이 안된경우 계속할건지 묻기
		if( addLineFlag == false ){
			//console.log("flag false");
			swal({
				title: i18next.t("approval:msg.newAppDelYn"),
				//text: "You will not be able to recover this imaginary file!",
				type: "warning",
				confirmButtonClass: 'btn-primary',
				confirmButtonText: i18next.t("approval:button.confirm"),
				cancelButtonText: i18next.t("approval:button.cancel"),

				showCancelButton: true,
				closeOnConfirm: false

			},function(isConfirm){
				if (isConfirm)
				{
					swal.close();
					fn_setAppLineSave();

				}
			});
		}else{
			//console.log("flag true");
			fn_setAppLineSave();
		}


	})


	//================================
	$("#appLineModal").modal("show");
	$('#appLineModal').localize();
	$('#appLineSaveModal').localize();

	//================================

	//OBS switch event
    $(".switch").bootstrapSwitch();
	$('#chkSwitch_filedHQ').on('switchChange.bootstrapSwitch', function (event, state) {
		var chk = 'fl';

		if($(this).is(":checked")) {
			chk = 'fl';
		}
		else{
			chk = 'hq';
		}
		$("#ock").val(chk);
		$("#ock_rec").val(chk);
		//tree reload
		//$("#Modal_appLineGrpTree").jstree("destroy");
		loadOBSTreeSet("#Modal_appLineGrpTree");

		$('#Modal_appLineGrpTree').jstree("refresh");
		//$('#Modal_appLineGrpTree').jstree("refresh",$("#osq").val());
		//$('#Modal_appLineGrpTree').jstree.refresh_node($("#osq").val());

		//기본 선택값 없으면 기본적으로 reload하게 설정
		/*
		if (tUserLoad1 != null)
		{
			tUserLoad1.ajax.reload();
		}
		*/
	})




})

//결재선 저장
function fn_setAppLineSave(){
	var valArr = []; //결재선 value
	var txtArr = []; //결재선 text
	var titleArr = []; //결재선 title
	var oldArr = []; //기존 결재선 정보 저장하는 배열
	var itemArr = []; // value split

	var newLineArr = []; //신규결재선 배열
	var mappingLineArr = [];//결재자 지정된 결재선 배열

	var idx=1; //결재정렬순서 처리

	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)


	$("#selectedApprovalBox li").each(function(i,item){

		//결재선 추가시 신규 추가된 결재선은 별도 처리
		itemArr = $(item).data("value").split("_");
		//console.log(itemArr);
		//결재순서 재배치
		itemArr[2] = idx;
		if(itemArr[1] == "0" && itemArr[3] == "0" ){
			return true;
		}else{
			idx++;
		}
		//console.log(itemArr);
		//console.log(itemArr[1] == "0" , itemArr[3] != "30" , itemArr[6] != "0"  );
		//console.log(itemArr);
		//신규결재선은 결재방 생성을 위해 별도 배열처리 ( 기본싸인타입이 0번[없음]인것 )
		if(itemArr[1] == "0" && itemArr[3] != noneAppUser && itemArr[6] != "0" ){
			newLineArr.push(itemArr.join("_"));
			//console.log("push");
		}

		//인원정보가 있으면
		if(itemArr[3] != noneAppUser){
			mappingLineArr.push(itemArr.join("_")+"||"+$(item).text());
		}



		oldArr.push($(item).data("oldvalue"));
		valArr.push(itemArr.join("_"));
		txtArr.push($(item).text());
		titleArr.push($(item).prop("title"));

	});

	//결재선 정보 입력
	$("#hiddenApprovalValue").val(valArr.join("||"));
	$("#hiddenApprovalOldValue").val(oldArr.join("||"));
	$("#hiddenApprovalText").val(txtArr.join("||"));
	$("#hiddenApprovalTitle").val(titleArr.join("||"));
	//console.log("===#hiddenApprovalValue===")
	//console.log($("#hiddenApprovalValue").val());
	//console.log($("#hiddenApprovalOldValue").val());
	/*

	console.log($("#hiddenApprovalText").val());
	console.log($("#hiddenApprovalTitle").val());
	*/

	//열람권한 정보
	//viewAuthBox
	valArr = [];
	txtArr = [];
	titleArr = [];



	$("#viewAuthBox li").each(function(i,item){
		valArr.push($(item).data("val"));
		txtArr.push($(item).text());
		titleArr.push($(item).prop("title"));
	})
	/*
	console.log($("#viewAuthBox option"));
	console.log(valArr);
	console.log(txtArr);
	console.log(titleArr);
	*/
	$("#hiddenAuthViewValue").val(valArr.join("||"));
	$("#hiddenAuthViewText").val(txtArr.join("||"));
	$("#hiddenAuthViewTitle").val(titleArr.join("||"));

	/*
	console.log($("#hiddenAuthViewValue").val());
	console.log($("#hiddenAuthViewText").val());
	console.log($("#hiddenAuthViewTitle").val());
	*/


	//receiveBox
	valArr = [];
	txtArr = [];
	titleArr = [];

	$("#receiveBox option").each(function(i,item){
		valArr.push($(item).data("value"));
		txtArr.push($(item).text());
		titleArr.push($(item).prop("title"));
	})
	/*
	console.log($("#receiveBox option"));
	console.log(valArr);
	console.log(txtArr);
	console.log(titleArr);
	*/

/*
	var appLines = $("#hiddenReceiveValue").val().split("||");
	var appTexts = $("#hiddenReceiveText").val().split(":")[1].split(",");
	var appTitles = $("#hiddenReceiveTitle").val().split("||");
	var appRG = $("#hiddenReceiveGroup").val().split("||");
*/

	$("#hiddenReceiveValue").val(valArr.join("||"));
	$("#hiddenReceiveText").val(txtArr.join("||"));
	$("#hiddenReceiveTitle").val(titleArr.join("||"));
 	$("#hiddenReceiveGroup").val($("#tmpReceiveGroup").val());
	/*
	console.log(tinyMCE);
	console.log(tinyMCE.activeEditor);
	console.log(tinyMCE.activeEditor.contentAreaContainer);
	console.log($(tinyMCE.activeEditor.contentAreaContainer));
	*/

	//console.log($(tinyMCE.activeEditor.getBody()).append(appLineTb));
	//console.log($(tinyMCE.dom.DomQuery("body")).append(appLineTb));
	//console.log(newLineArr);


	//신규결재선이 있는경우 && 기본 싸인타입 0(없음)이 아닌경우
	if(newLineArr.length > 0 && newLineArr[0][6] != "0" ){
		editerAppLineSet(newLineArr);
	}

	//<span id="attendUsers" data-i18n="approval:workspace.label.approvalLineDefault" class="vCenter ">결재선을 지정하여 주세요.</span>
	//맵핑된 인원이 있는경우

	//문서 작성화면 결재선 다국어 처리
	if( mappingLineArr.length>0 ){
		//$("#attendUsers").html()
		var html = "";
		mapArr = "";
		var title = "";
		var num = "";
		var numIdx = 0;
		var optVal = null ;
		$(mappingLineArr).each(function(i,item){
			mapArr  = item.split("||");

			numIdx = mapArr[1].indexOf(":");
			num = mapArr[1].substr(numIdx-3,numIdx-1);
			title = mapArr[1].split(":")[1];

			switch( mapArr[0].split("_")[4]){
				case "1" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appL'></span>";
			 	break;

				case "2" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appCL'></span>";
				break;

				case "3" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appAL'></span>";
				break;

				case "4" :
				html = html + "<span class='wysiwyg-color-red' data-i18n='approval:setting.label.appVL'></span>";
				break;

			}

			html = html + ""+num+title+"&nbsp;&nbsp;>&nbsp;&nbsp; ";
		});
		//console.log(html);
		html = html.substr(0,html.lastIndexOf("&nbsp;&nbsp;>&nbsp;&nbsp;") );
		$("#attendUsers").html(html);
	}else{
		$("#attendUsers").html("<span data-i18n='approval:workspace.label.approvalLineDefault'></span>");
	}

	$("#attendUsers").localize();

	$("#appLineModal").modal("hide");
}


//기본 열람권한그룹 설정
function defaultViewAuthInit(){
	/*
	console.log("열람권한");
	console.log($("#hiddenAuthViewValue").val());
	console.log($("#hiddenAuthViewText").val());
	console.log($("#hiddenAuthViewTitle").val());
	*/

	var hiddenAuthViewBoxValue = $("#hiddenAuthViewValue").val().split("||");
	var hiddenAuthViewBoxText = $("#hiddenAuthViewText").val().split("||");
	var hiddenAuthViewBoxTitle = $("#hiddenAuthViewTitle").val().split("||");

	var selObj = document.all.viewAuthBox;

	if (hiddenAuthViewBoxValue.length > 0 && $("#hiddenAuthViewValue").val().trim() != "")
	{
		/*
		for (i=0; i<hiddenAuthViewBoxValue.length ;i++ )
		{
			//selObj.options[i]=new Option(hiddenAuthViewBoxText[i],hiddenAuthViewBoxValue[i]);
			//selObj.options[i].title=hiddenAuthViewBoxTitle[i];
		}
		*/
		var appLineHtml = ""
		for (i=0; i<hiddenAuthViewBoxValue.length ;i++ ){

			appLineHtml = appLineHtml + "<li title='"+hiddenAuthViewBoxTitle[i]+"' data-value='"+hiddenAuthViewBoxValue[i]+"' " ;
			appLineHtml = appLineHtml + " class=' ui-widget-content  ";

			appLineHtml = appLineHtml + "' "
			appLineHtml = appLineHtml + ">"+hiddenAuthViewBoxText[i]+"</li>";
		}
		$("#viewAuthBox").append(appLineHtml);
	}

}

//기본 수신자 설정
function defaultReceiveInit(){
//	console.log("====================================");
//	console.log("수신자");
//	console.log($("#hiddenReceiveValue").val());
//	console.log($("#hiddenReceiveText").val());
//	console.log($("#hiddenReceiveTitle").val());
//	console.log($("#hiddenReceiveGroup").val());
	/* 일반 사용자
	 * appLines =  [0]:UserSeq 사용자Seq , [1]:Nm 사용자명 , [2] : GrpOBSSeq, [3]OBS 구분자
	 *
	 *
	 * OBS그룹
	 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm 구분코드 , [2] : 선택그룹 전체 사용자 , [3]임시값? M30, [4]FullPath
	 * appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름 , [2] : GrpOBSSeq , [3]OBS 구분자
	 *
	 */
	var appLines = $("#hiddenReceiveValue").val().split("||");
	var appTexts = $("#hiddenReceiveText").val().split("||");
	var appTitles = $("#hiddenReceiveTitle").val().split("||");
	var appRG = $("#hiddenReceiveGroup").val().split("||");

	// 공통
	// appRG = [0]:ReceiveGrp OBS명칭, [1]:IsNextGrp(0:다음그룹 없음, 1:다음그룹 있음) 다음그룹있으면서 option값이 없는경우 문제, [2]:receiveKind (0:그룹, 1:멤버), [3]:receiveObsSeqno, [4]:hqObsSeqno, [5]:receiveGongu
	var strReceiveUsers="";

	$("#tmpReceiveValue").val($("#hiddenReceiveValue").val());
	$("#tmpReceiveText").val($("#hiddenReceiveText").val());
	$("#tmpReceiveTitle").val($("#hiddenReceiveTitle").val());

	//ReceiveGrpNm , IsNextGrp  , receiveKind , receiveObsSeqno , hqObsSeqno , receiveGonggu
	$("#tmpReceiveGroup").val($("#hiddenReceiveGroup").val());

	var optHtml = "";

	var dataArr=[];


//	console.log("====RG & LINE====");
//	console.log(appRG);
//	console.log(appLines);
//	console.log(appTitles);
//	console.log(appTexts);
//	console.log(appRG[2]);

	/*
	//리시브 타입에 따라 작업
	if(appRG[2] == "0"){
		for(var i=0 ; i < appLines.length ; i++){
			dataArr = appLines[i].split("_");
			optHtml = optHtml  + "<option value='"+appLines[i]+"' title='"+appTitles[i]+"' >"+appTexts[i]+"</option>"
		}
	}else{
		dataArr = appLines[0].split("_");
//	console.log("dataArr[0]");
//	console.log(dataArr[0]);
		//선택된 그룹이 있는경우
		if(dataArr[0] != "30"){
//			console.log("grp : "+ appTexts[i]);
			optHtml = optHtml + "<option value='"+appLines[0]+"' title='"+appTitles[0]+"' >"+appTexts[0]+"</option>";
		}
		console.log(optHtml);
	}
	*/

	//수신타입에 상관없이 지정된 사용자 가져오기
	for(var i=0 ; i < appLines.length ; i++){
		if(appLines[0].split("_")[0] != "30"){
			dataArr = appLines[i].split("_");
			optHtml = optHtml  + "<li data-value='"+appLines[i]+"' title='"+appTitles[i]+"' class=' ui-widget-content '>"+appTexts[i]+"</li>"
		}
	}
	$("#receiveBox").append(optHtml);
}

// OBS Tree Load
function loadOBSTreeSet(obj,sq,fq){
	//console.log('approvalModalAppLine-mobile.js');
	//이벤트 중첩 막기 위해 별도 처리
	$(obj).off("ready.jstree");
	$(obj).off("refresh.jstree");
	$(obj).off("select_node.jstree");

	//console.log("LOAD");
	 $(obj).on("ready.jstree", function (e, data) { //first loading
			/*
			*/
			//console.log("READY");
			if(tableInitFalg){
				if($("#chkSwitch_filedHQ").is(":checked"))
				{
					$("#ock_rec").val("fl");
					$(obj).jstree().select_node($("#osq").val());
				//console.log("osq1111111111111111="+$("#osq").val());
				}else {

					$("#ock_rec").val("hq");
					$(obj).jstree().select_node($("#ohq").val());
				}
				loadUserDataTable();
				tableInitFalg = false;
			}

	}).on("refresh.jstree", function (e, data) {
			if($("#chkSwitch_filedHQ").is(":checked"))
			{
				$("#ock_rec").val("fl");
				$(obj).jstree().select_node($("#osq").val());
			}else {

				$("#ock_rec").val("hq");
				$(obj).jstree().select_node($("#ohq").val());
			}


		//tUserLoad1.ajax.reload();
		//loadUserDataTable();

	}).on("select_node.jstree", function (e, data) {

		if(data.selected.length) {
			/* 한개 선택하는 방식일때 사용 */
			node_id	     = data.instance.get_node(data.selected[0]).id;
			P_node_id	 = data.instance.get_node(data.selected[0]).parent;
			node_nm	     = data.instance.get_node(data.selected[0]).text;

			a_attr		     = data.instance.get_node(data.selected[0]).a_attr;
			type		     = a_attr.T;
			FullName	     = a_attr.Fnm;

			$(obj).jstree().select_node(node_id);
			//console.log(node_id);
			if($("#chkSwitch_filedHQ").is(":checked"))
			{
				//sq.val(node_id);
				$("#osq").val(node_id);
				$("#ock_rec").val("fl");
//console.log("osq222222222222222222222="+$("#osq").val());

			}
			else
			{
				//fq.val(node_id);
				$("#ohq").val(node_id);
				$("#ock_rec").val("hq");
			}


			//트리 클릭시 배열 초기화
			objDataArray = [];
			userListArray = [];
			tSelectIds = [];

			 if (tUserLoad1 != null)
			 {
				tUserLoad1.ajax.reload();
			 }

		}else{
			//null data
		}
	}).jstree({
		'core' : {
			//'multiple' : true,  //다중선택여부
			'check_callback': true, //add, rename, Del를 적용여부
			"themes" : { "stripes" : true }, //격자배경
			'data' : {
			//"url" : "/module/sysModule/obs/obs.do",
				//"url": "/module/usermodule/approval/common/getObsTree.do",
				"url": "/module/usermodule/approval/common/getObsTree",
				"type":"post",
				"data" :{"ock":function () {
							return $("#ock").val();
						}
				},
				"dataType" : "json" // needed only if you do not supply JSON headers
			}
		},
		"checkbox" : {three_state: false},
		//검색 , 선택배경반전, 체크박스
		"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
	});
}

//User Table
function loadUserDataTable(){
console.log ('approvalModalAppLine-mobile.js  loadUserDataTable.............');
		// Setting datatable defaults
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,
			//"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				"search": '_INPUT_'
				,"emptyTable": '<span data-i18n="datatable.option.emptyTable">'
			},
			"drawCallback": function () {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
			},
			"preDrawCallback": function() {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
			}
		});



		tUserLoad1 = $(tUserLoad1_Id).DataTable({
			 "processing" : true
			,"serverSide" : true
			//,"bDestroy": true
			//,"scrollY":    "32px"
			//,"sScrollY": "350px"
			//,"scrollCollapse": true
			,"bAutoWidth": true
			,"sScrollY": "470px"
			//,"bScrollCollapse": true
			,"paging":         false
			,"ajax" : {
				//"url" :"/module/usermodule/approval/common/setAppViewAuthUserList.do"
				"url" :"/module/usermodule/approval/common/setAppViewAuthUserList"
				,"type" : "post"
				,"data" : function ( d ) {
							d.osq = $("#osq").val();
							d.ohq = $("#ohq").val();
							d.ock = $("#ock").val();
							}
			}
			,"rowId": 'Idx'
			,"pagingType": "simple"
			,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

				//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
				{
					"width" : "50px",			//단순 리스트 번호
					"targets": [0],
					"orderable": false  ,
					"searchable": false
					,"className" : "dt-center"
				}, {
					"width" : "0px",			//OBS일련번호
					"targets": [1],
					"visible": false,
					"searchable": false
				} , {
					"targets": [2],				//OBS명 + 직위명
					"width" : "240px"
					,"className" : "dt-center"
				},{
					"width" : "0px",			//OBSCode
					"targets": [3], //
					"visible": false,
					"searchable": false
				},{
					"width" : "60px",			//분야
					"targets": [4], //
					"orderable": false  ,
					"className" : "dt-center"
				},{
					"width" : "0px",			//User Sys_ID
					"targets": [5], //
					"visible": false,
					"searchable": false
				},{
					"width" : "0px",			//사용자 이름
					"targets": [6], //
					"visible": false,
					"searchable": false
				},{
					"width" : "0px",			//직위
					"targets": [7], //
					"visible": false,
					"searchable": false
				},{
					"width" : "0px",			//구분, M:사용자, G:그룹,조직,파트, C:회사
					"targets": [8], //
					"visible": false,
					"searchable": false
				},{
					"width" : "0px",			//OBS 풀 경로
					"targets": [9], //
					"visible": false,
					"searchable": false
				}
			]
			//keytable set


			, "order": [ 3, "asc" ] //기본 정렬 역순 출력(필수)
			//INDEX 역순 출력(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {
				$('#userList_wrapper').localize();

				tSelectIds = new Array();

				//기존 조직에서 선택한 값 있는지 체크
				$(tUserLoad1.rows()[0]).each(function(i,item){
					//배열에 같은 데이터 있으면 Select
					if( userListArray.indexOf(tUserLoad1.row(i).data()[1] ) >= 0  ){
						$($(tUserLoad1_Id+' tbody tr')[i]).addClass("success");
						tSelectIds.push(i);
					}
				});

				//title 설정
				$(tUserLoad1.rows()[0]).each(function(i,item){
					$($(tUserLoad1_Id+' tbody tr')[i]).attr("title", tUserLoad1.row(i).data()[9] );
				});

			}
			, "initComplete" : function(s,j){
				//처음 로딩 후 header 맞추기 위해 클릭이벤트 바인딩
				//$(tUserLoad1_Id+"_wrapper .sorting").trigger("click");

			}
		});

		if(!isMobile){
			event_kind="click"
		}else{
			event_kind="click"
		}



		//자동검색 수동으로 변경
		$(tUserLoad1_Id+"_filter input").unbind();
		$(tUserLoad1_Id+"_filter input").keyup(function(e){
			if(e.keyCode==13){
				//console.log(this.value );

				//reload 할 때 마다 배열 초기화
				//console.log("reload!");
				tSelectIds = [];
				userListArray = [];
				objDataArray  = [];

				tUserLoad1.search( this.value ).draw();
				$(this).blur();


			}
		});

		$(tUserLoad1_Id+' tbody').on(event_kind , 'tr td', function () {
			clickUserList($(this));
		});

		/*
		tUserLoad1.on( 'order.dt', function (s,j) {

			console.log("=======================");
			$('#userList tbody tr').each( function() {

				if (j._iRecordsTotal>0)
				{
					var nTds = $('td', this);
					var idx = parseInt($(nTds[0]).text());
					var totCnt = j._iRecordsTotal;
					console.log(totCnt)


					var toolTip = j.aoData[(totCnt-idx)]._aData[9];

					this.setAttribute( 'title', toolTip );


				}
			});
		});
		*/

		// External table additions (필수)
		// ------------------------------

		// Add placeholder to the datatable filter option
		$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");
	 }


//사용자 클릭시 변수 및 배열에 담음
 function clickUserList(obj){
	var seqNo="";
	var name="";
	var partNm="";
	var obsCode="";
	var obsNm="";
	var Position_Nm="";
	var Fnm="";
	var userId="";
	var textVal="";
	var valueVal=""

	seqNo		= tUserLoad1.row( obj.parent()).data()[1];
	name		= tUserLoad1.row( obj.parent()).data()[2];
	obsCode		= tUserLoad1.row( obj.parent()).data()[3];
	partNm		= tUserLoad1.row( obj.parent()).data()[4];
	userId		= tUserLoad1.row( obj.parent()).data()[5];
	obsNm		= tUserLoad1.row( obj.parent()).data()[6];
	Position_Nm	= tUserLoad1.row( obj.parent()).data()[7];
	Fnm			= tUserLoad1.row( obj.parent()).data()[9];

	textVal = name + "/" + seqNo;
	valueVal = userId + "_" + name + "_" + seqNo + "_" + obsCode;
	if( obj.parent().hasClass('success')){
		obj.parent().removeClass('success');
	}else{
		obj.parent().addClass('success');
	}

	//arrayPushPop(userListArray,seqNo);
	//arrayPushPop(userListTextArray,textVal);
	//arrayPushPop(userListValueArray,valueVal);
	//arrayPushPop(userListTitleArray,Fnm);
	//arrayPushPop(objArray,obj);


	arrayPushPop(tSelectIds, tUserLoad1.row( obj.parent()).toArray()[0].toString() );

	arrayPushPop(userListArray,seqNo);
	arrayPushPop(objDataArray, tUserLoad1.row( obj.parent()).data()  );

}


//기본 결재선 지정
function defaultAppLineInit(){
	/*
	console.log( $("#hiddenApprovalValue").val());
	console.log( $("#hiddenApprovalText").val());
	console.log( $("#hiddenApprovalTitle").val());
	*/

	hiddenApprovalBoxValue = $("#hiddenApprovalValue").val().split("||");
	hiddenApprovalBoxText = $("#hiddenApprovalText").val().split("||");
	hiddenApprovalBoxTitle = $("#hiddenApprovalTitle").val().split("||");



	var appLineHtml = "";

	var valArr;
	for (i=0; i<hiddenApprovalBoxValue.length ;i++ ){
		valArr = hiddenApprovalBoxValue[i].split("_");
		appLineHtml = appLineHtml + "<li title='"+hiddenApprovalBoxTitle[i]+"' data-oldvalue='"+hiddenApprovalBoxValue[i]+"' data-value='"+hiddenApprovalBoxValue[i]+"' " ;
		appLineHtml = appLineHtml + " class=' ui-widget-content  ";
		if(valArr[1] == "0"){
			appLineHtml = appLineHtml + " select-option-bg "
		}
		appLineHtml = appLineHtml + "' "
		appLineHtml = appLineHtml + ">"+hiddenApprovalBoxText[i]+"</li>";
	}
	$("#selectedApprovalBox").append(appLineHtml);
}


//결재라인 추가
function fn_btnAppLineAdd(type){
	// tUserLoad1.row( $(this).parent() ).data()[1];

	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)
	//75_1_1_1_0||79_1_0_2_1||80_1_0_3_1||81_3_0_4_1||79_3_0_5_1||82_1_2_6_0


	var optLen = $("#selectedApprovalBox li").length; //option길이

	var valArr = []; //value array
	var txtArr = []; //text array
	var titleArr = [];
	var valTxt = "";

	//선택한 결재선 정보가 있는경우 그 부분 뒤로 들어가게..

	var optIdx;
	var _tmpItem = $("#selectedApprovalBox li.ui-selected");
	if(_tmpItem.length > 0){
		optIdx = $("#selectedApprovalBox li").index(_tmpItem[0]);
	}else{
		optIdx = 0
	}


	var chkFlag = false; //결재선 칸에 사용자 정보 있는지 체크 위한 플래그

	var memberFlag = false;//이미 추가된 결재선의 경우 alert호출


	for(j = optIdx; j < optLen ; j++ ){
		txtArr = $($("#selectedApprovalBox li")[j]).text().split(":");
		valArr = $($("#selectedApprovalBox li")[j]).data("value").split("_");
		titleArr
		//순차결재 이거나 비순차의 경우 결재타입이 결재인 경우 , length 1이상인경우
		if(( type=="L" || (type=="NL" && (valArr[4] == 1 || valArr[4] == 3) )) && objDataArray.length > 0){

			//console.log(typeof(valArr[3]) != "string" || valArr[3] != "0");
			/*
			console.log( typeof(valArr[3]) );
			console.log( valArr[3] != "0" );
			console.log( typeof(valArr[3]) != "string"  );
			console.log(  valArr[3] != "30"   ) ;
			*/
			//기존에 사람이 들어가 있는 경우 체크..
			if( typeof(valArr[3]) != "string" || valArr[3] != "30"    ){
				chkFlag = chkMsg("tChangeUser","cChangeUser",txtArr[0]) ; //obj1=셀렉트박스, obj2=배열
			}else{
				chkFlag = true;
			}

			//console.log($("#selectedApprovalBox option[value*='_"+objDataArray[0][5]+"_']"));
			//console.log($("#selectedApprovalBox option[value*='_"+objDataArray[0][5]+"_']").length > 0);
			//console.log(valArr[3] != "0" );
			//결재선에 본인이 있는지 체크
			if(  objDataArray[0][5] != "0" && $("#selectedApprovalBox li[data-value*='_"+objDataArray[0][5]+"_']").length > 0  ){
				memberFlag = chkMsg("ctDuplicateusers","ctDuplicateusers",objDataArray[0][6]+ " " +  objDataArray[0][7]);

				if(memberFlag==false){
					break;
				}
			}else{
				memberFlag = true;
			}


			//사람 들어갈 경우
			if(chkFlag && memberFlag){
				//console.log(objDataArray[0]);
				txtArr[1] = objDataArray[0][6]+ " " +  objDataArray[0][7]; //이름 + 직위
				valArr[3] = objDataArray[0][5];
				valArr[9] = objDataArray[0][7];


				//$($(tUserLoad1_Id+' tbody tr')[tSelectIds[0]]).removeClass("success");
				//objArray[0].parent().removeClass("success");
				if(type=="L"){
					valArr[7] = 1;
				}else{
					valArr[7] = 6;
				}

				/*
				valTxt = "";
				for (var z=0; z < valArr.length ; z++ ){
					valTxt = valTxt+valArr[z]+"_";
				}
				*/

				//console.log(objDataArray[0]);

				//$("#selectedApprovalBox option")[j].value = valTxt.substring(0,valTxt.lastIndexOf("_")-1)  ;
				$($("#selectedApprovalBox li")[j]).data("value",valArr.join("_"))  ;
				$($("#selectedApprovalBox li")[j]).text(txtArr[0] + ": "+ txtArr[1]) ;
				$("#selectedApprovalBox li")[j].title = objDataArray[0][6];


				if (valArr[3] != noneAppUser && valArr[7]=="6")
				{
					$("#selectedApprovalBox li")[j].style.color="#00cc00";
				}
				else
				{
					$("#selectedApprovalBox li")[j].style.color="#333333";
				}

				userListArray.shift();
				objDataArray.shift();


				//console.log($($("#selectedApprovalBox li")[j]).data("value"));
				//console.log($($("#selectedApprovalBox li")[j]));


				//모두 꺼낸 경우 break
				if(typeof(objDataArray[0]) == "undefined"){
					break;
				}


			}
		}else{
			//break;
		}

	}



	//배열 및 success 초기화
	fn_ArrayReset();

	//deselected
	//$("#selectedApprovalBox option").prop("selected",false);
	$("#selectedApprovalBox li.ui-selected").removeClass("ui-selected");

}

//결재선 삭제
function fn_btnAppLineDel(){
	//[0]=결재그룹, .data((1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)
	//삭제 후 순서 재정렬 하는 로직 필요

	var obj = $("#selectedApprovalBox li");
	var applineSelectedLength = obj.length;;
	//var objVal = new Array();
	//var objTxt = new Array();
	var appLCnt=0;
	var appCCnt=0;
	var appACnt=0;
	var appVCnt=0;
	//삭제 가능한 결재선인지체크

	//삭제하는 결재선의 기본값 설정
	applineSelectedLength = obj.length;
	for (i=applineSelectedLength-1;i>=0 ;i-- )
	{
		if ($(obj[i]).hasClass("ui-selected")==true)
		{
			var objVal = $(obj[i]).data("value").split("_");
			var objTxt = $(obj[i]).text().split(":");
			if (objVal[1].toString()=="0")
			{
				//추가된 결재선은 remove
				$(obj[i]).remove();
			}
			else
			{
				$(obj[i]).data("value",objVal[0]+"_"+objVal[1]+"_"+objVal[2]+"_"+noneAppUser+"_"+objVal[4]+"_"+objVal[5]+"_"+objVal[6]+"_"+objVal[7]+"_"+objVal[8]);
				$(obj[i]).text(objTxt[0]+": "+i18next.t("approval:setting.label.blank"));
			}
		}
	}

	//순서 및 명칭 재정렬
	applineSelectedLength = obj.length;
	for (i=0;i<applineSelectedLength ;i++ )
	{
		var objVal = $(obj[i]).data("value").split("_");
		var objTxt = $(obj[i]).text().split(":");
		var objTit = obj[i].title;
		var prObjTxt = objTxt[0].split(" ");

		switch (objVal[4].toString())
		{
		case "1":
			appLCnt++;
			prObjTxt[1]=("0"+appLCnt).toString().right(2);
			prObjTxt[0]=i18next.t("approval:setting.label.appL");
			break;
		case "2":
			appCCnt++;
			prObjTxt[1]=("0"+appCCnt).toString().right(2);
			prObjTxt[0]=i18next.t("approval:setting.label.appCL");
			break;
		case "3":
			appACnt++;
			prObjTxt[1]=("0"+appACnt).toString().right(2);
			prObjTxt[0]=i18next.t("approval:setting.label.appAL");
			break;
		case "4":
			appVCnt++;
			prObjTxt[1]=("0"+appVCnt).toString().right(2);
			prObjTxt[0]=i18next.t("approval:setting.label.appVL");
			break;
		}

		objVal[2]=i+1;
		$(obj[i]).data("value",objVal[0]+"_"+objVal[1]+"_"+objVal[2]+"_"+objVal[3]+"_"+objVal[4]+"_"+objVal[5]+"_"+objVal[6]+"_"+objVal[7]+"_"+objVal[8] );
		$(obj[i]).text(prObjTxt[0] + " " + prObjTxt[1] +": "+objTxt[1]);
		obj[i].title=objTxt[1];
	}

	//deselected
	$("#selectedApprovalBox li").removeClass("ui-selected");
}

//배열 및 success 초기화
function fn_ArrayReset(){
	$(tUserLoad1_Id+' tbody tr.success').removeClass("success");
	userListArray=[];
	objDataArray=[];

}


//인원추가시 체크 함수
function fn_addLineCheck(){
	if(userListArray.length > 0){
		return true;
	}else{
		showSwal("선택된 인원이 없습니다.","warning");
		return false;
	}
}


//결재선&수신자 저장 모달 호출
function lineSaveMoadlLoad(){
	$("#lineTitle").val("");
	$("#appLineSaveModal").modal("show");
}

function lineSaveDML(dataArr){
	alert('approvalModalAppLine-mobile.js');
	//dataArr
	$.ajax({
		//url : "/module/UserModule/approval/common/Modal-AppLine-UserLineDML.do"
		url : "/module/usermodule/approval/common/modalAppLineUserLineDML"
		,type : "post"
		,data : {
			"fs" : $("#hidden_Fs").val()
			,"lineTitle" : $("#lineTitle").val()
			,"lineDmlType" : $("#lineDmlType").val()
			,"lineType" : $("#lineType").val()
			,"lineSeq" : $("#lineSeq").val()
			,"dataArr" : dataArr
		}
		,success : function(data){
			var jData = JSON.parse(data);
			var returnType = jData.returnType;


			if(returnType =="success" ){

				var appId="#appLineBox";
				var revId="#revLineBox";
				var _id = "";
				if($("#lineType").val() == "1"){
					_id = appId;
				}else{
					_id = revId;
				}

				if($("#lineDmlType").val() == "add" ){
					$(_id).append("<option value='"+jData.seq+"'>"+$("#lineTitle").val()+"</option>");
				}else{
					//console.log($(_id+" option[value='"+$("#lineSeq").val()+"']"));
					//console.log($(_id).val(""));
					$(_id).val("");
					$(_id+" option[value='"+$("#lineSeq").val()+"']").remove();
				}

				$("#appLineSaveModal").modal("hide");
			}


			showSwal(i18next.t("common:msg."+returnType),returnType);
		}
	})
}

function userSaveLineLoad(){

	$.ajax({
		//url : "/module/UserModule/approval/common/Modal-AppLine-UserLineList.do"
		url : "/module/usermodule/approval/common/modalAppLineUserLineList"
		,type : "post"
		,data : {
			"lineSeq" : $("#lineSeq").val()
		}
		,success : function(data){
			//var jData = JSON.parse(data);

			if(data.delYn == "1"){
				showSwal(i18next.t("approval:msg.cantUsedLineGrp"),"warning");
				return false;
			}
			//userSaveLineLoad();

			var appId="#selectedApprovalBox";
			var revId="#receiveBox";
			var _id = "";
			if(data.lineType == "1"){
				_id = appId;
			}else{
				_id = revId;
			}

			var _idLen = $(_id + " li").length;

			$(_id + " li").remove();

			var li=""
			for (i=0; i<data.data.length ; i++ ){
				//저장된 결재선이 많거나 적은 경우 어떻게 처리할 것인지?
				li = li + "<li class=' ui-widget-content load-line' title='"+data.data[i].title+"' data-value='"+data.data[i].value+"' data-oldvalue='"+data.data[i].value+"'>"+data.data[i].text+"</li>"
			}

			$(_id).append(li);

			//showSwal(i18next.t("common:msg."+returnType),returnType);
		}
	})
}