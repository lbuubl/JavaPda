/* ------------------------------------------------------------------------------
*
 전자결재 공통 에디터관련 자바스크립트
*
* ---------------------------------------------------------------------------- */

$(document).ready(function(){

	//뒤로 버튼 클릭
	$(document).on("click","#Editor_back",function(e){
		$("#sq").val("");
		$("#fs").val("");
		$("#Editor").hide();
		t1.ajax.reload(null,false);
		$("#indexList").show();
	});

	//삭제 버튼 클릭
	$(document).on("click","#Editor_delete",function(e){
		//showSwal(i18next.t("approval:msg.Editor_delete"),"warning");//삭제버튼 메세지
		swal({
			title: i18next.t("approval:msg.Editor_delete"),
			text: "",//i18next.t("approval:msg.Editor_delete"),
			type: "info",
				showCancelButton: true,
				confirmButtonClass: 'btn-primary',
				confirmButtonText: i18next.t("approval:button.confirm"),
				cancelButtonText: i18next.t("approval:button.cancel"),
				closeOnConfirm: true,
				closeOnCancel: true
		},function(isConfirm){
			if (isConfirm)
			{

				$.ajax({
					//url : "/module/UserModule/approval/common/DocDelete.do"
					url : "/module/usermodule/approval/common/docDelete"
					,type : "POST"
					,dataType:"json"
					,data: {"sq" :$("#sq").val()}
					,async: false
					,success: function(data){
						if (data.result=="success")
						{
							showSwal(i18next.t("approval:msg.Editor_delete"),"warning");//삭제버튼 메세지
							t1.ajax.reload(null, true);
							$("#Editor").hide();
							$("#indexList").show();
						}
						else
						{
							alert("err1:"+data.debug);
						}
						return;
					}
					,error:function(data){
						alert("err2:"+data.message);
					}
				});

			}
		});


	});

	//일반 버튼 클릭
	$(document).on("click",".approvalButtonEvent",function(e){

		//console.log("IN");
		var id = this.id.toString();
		if( id == "Editor_reject" || id =="Editor_receivecancel" || id == "Editor_adminsave"){
			//취소사유 작성하는 경우 별도 처리
			showReasonModal(this.id.toString());
		}else{

			$("#hidden_Resaon").val("");
			approvalButtonEvent(id);
		}
	});

});



function approvalValid(){
	//----------------------------------------------------------------------------//
	//****************액션버튼 후 처리 화면 호출**********************************//

	if ($("#hiddenActionEvent").val()=="Editor_save")
	{
		$("#editor_submitForm").submit();//임시저장일때 밸리데이션 체크 안함
	}else{
		if ($("#editor_submitForm").valid())
		{
	//console.log("approvalValid=");
			$("#editor_submitForm").submit();
		}
	}

}

function dataSubmit()
{
	var params = $('#editor_submitForm').serialize();
	//console.log("params="+params);
	$.ajax({
		//url:"/Module/UserModule/approval/common/process.do",
		url:"/module/usermodule/approval/common/process",
		type:"POST",
		dataType:"json",
		data:params,
		cache:false,
		async:false,
		processData:false,
		success:function(data){

			//console.dir(data);
			//console.log('process data : ' + JSON.stringify(data));
			//console.log("data.result="+data.result);
			//console.log("data.result.split="+data.result.split(",")[0]);

			if (data.result.split(",")[0]=="success")
			{
				var returnMsg="";
				var actEvent=$("#hiddenActionEvent").val().trim();
				switch (actEvent)
				{
				case "Editor_save"://임시저장버튼
					returnMsg=i18next.t("approval:msg.info.Editor_save");
					break;
				case "Editor_submit"://저장후상신버튼
					returnMsg=i18next.t("approval:msg.info.Editor_submit");
					break;
				case "Editor_approve"://결재진행버튼
					returnMsg=i18next.t("approval:msg.info.Editor_approve");
					break;
				case "Editor_approveAll"://전결버튼
					returnMsg=i18next.t("approval:msg.info.Editor_approveAll");
					break;
				case "Editor_reject"://반려버튼
					returnMsg=i18next.t("approval:msg.info.Editor_reject");
					break;
				case "Editor_sending"://발신버튼
					returnMsg=i18next.t("approval:msg.info.Editor_sending");
					break;
				case "Editor_receive"://수신버튼
					returnMsg=i18next.t("approval:msg.info.Editor_receive");
					break;
				case "Editor_receivecancel"://수신반려버튼
					returnMsg=i18next.t("approval:msg.info.Editor_receivecancel");
					break;
				case "Editor_circulation"://회람버튼
					returnMsg=i18next.t("approval:msg.info.Editor_circulation");
					break;
				case "Editor_adminsave"://관리자 저장버튼
					returnMsg=i18next.t("approval:msg.info.Editor_adminsave");
					break;
				}
				//console.log("editor_submitForm actEvent : "+actEvent);
				//console.log("editor_submitForm returnMsg : "+returnMsg);
				showSwal(returnMsg,"info");
				t1.ajax.reload(null, true);
				// 상신(Editor_submit) , 결재-승인(Editor_approve) ,  전결(Editor_approveAll) , 수신(Editor_receive)
				if (actEvent=="Editor_submit" || actEvent=="Editor_approve" || actEvent=="Editor_approveAll" || actEvent=="Editor_receive")
				{
					try
					{
						$.ajax({
							//url : "/Module/UserModule/CERTIFICATE/common/createPrintDocument.do"
							url : "/module/usermodule/certificate/common/createPrintDocument"
							,type : "POST"
							,data: {"sq" :data.result.split(",")[1]}
							,async: false
							,success: function(data){
								return;
							}
							,error:function(data){
								return;
							}
						});
					}
					catch (e)
					{
					}
				}
				$("#Editor").hide();
				$("#indexList").show();
			}
			return;
		},
		error:function(data){
			console.log("err//"+data);
		}
	});

}

function approvalButtonEvent(id){
	var isAction=false;
	var checkReturn = true;
	var approvalArray = new Array();
	var lastApp, firstApp, curApp;
	var onLoginUser=$("#UserCode").val().toString();

	//에디터 내용을 히든필드에 셋팅
	checkReturn = CheckUserItem();
	//console.log(checkReturn);


	if(checkReturn == false){
		return false;
	}

	switch (id)
	{
		case "Editor_save"://임시저장버튼
			$("#hiddenActionEvent").val("Editor_save");
			$("#hiddenUpdateReason").val("TempSave");

			isAction=true;
			break;

		case "Editor_submit"://저장후상신버튼
			$("#hiddenActionEvent").val("Editor_submit");
			$("#hiddenUpdateReason").val("save and approval start");

			if ($("#hiddenApprovalValue").val().trim()=="")
			{
				isAction = false;
				alert(i18next.t("approval:msg.noAppline"));
				return false;
			}



			//싸인 정보 입력
			isAction = fn_CheckAppMember("");

			//문서번호 채번
			fn_getDocNum();

			// 작성자의 본문 내용 저장
			$("#hiddenWriteMainContents").val(tinyMCE.activeEditor.getContent({format : 'raw'}));

			//alert(isAction);
			if (!isAction)
			{
				//console.log("실패");
				return false;
			}

			break;
		case "Editor_approve"://결재진행버튼
			$("#hiddenActionEvent").val("Editor_approve");
			$("#hiddenUpdateReason").val("approve");

			//문서번호 채번
			fn_getDocNum();

			//싸인 정보 입력
			/*
			if(	!fn_CheckAppMember()){
				isAction=false;

			}else{
				isAction=true;
			}
			  */
			isAction = fn_CheckAppMember("");
			//alert(isAction);
			if (!isAction)
			{
				return false;
			}
			break;

		case "Editor_approveAll"://전결버튼
			$("#hiddenActionEvent").val("Editor_approveAll");
			$("#hiddenUpdateReason").val("approveAll");

			//문서번호 채번
			fn_getDocNum();

			//싸인 정보 입력
			/*
			if(	!fn_CheckAppMember()){
				isAction=false;

			}else{
				isAction=true;
			}
			  */
			isAction = fn_CheckAppMember("");

			break;

		case "Editor_reject"://반려버튼
			$("#hiddenActionEvent").val("Editor_reject");
			//$("#hiddenUpdateReason").val("reject");

			//싸인 정보 입력
			if(	!fn_CheckAppMember("REJECT")){
				isAction=false;
			}else{
				isAction=true;
			}

			break;

		case "Editor_sending"://발신버튼
			$("#hiddenActionEvent").val("Editor_sending");
			$("#hiddenUpdateReason").val("sending");

			isAction=true;
			break;

		case "Editor_receive"://수신버튼
			$("#hiddenActionEvent").val("Editor_receive");
			$("#hiddenUpdateReason").val("receive");
			// 수신자의 본문 내용 저장
			$("#hiddenWriteMainContents").val(tinyMCE.activeEditor.getContent({format : 'raw'}));

			if ($("#hiddenApprovalValue").val().trim()=="")
			{
				isAction = false;
				alert(i18next.t("approval:msg.noAppline"));
				return false;
			}

			//문서번호 채번
			fn_getDocNum();

			//싸인 정보 입력
			if(	!fn_CheckAppMember()){
				isAction=false;
			}else{
				isAction=true;
			}

			break;

		case "Editor_receivecancel"://수신반려버튼
			$("#hiddenActionEvent").val("Editor_receivecancel");
			//$("#hiddenUpdateReason").val("receivecancel");

			//싸인 정보 입력
			if(	!fn_CheckAppMember("REJECT")){
				isAction=false;
			}else{
				isAction=true;
			}
			break;

		case "Editor_circulation"://회람버튼
			$("#hiddenActionEvent").val("Editor_circulation");
			$("#hiddenUpdateReason").val("circulation");

			//싸인 정보 입력
			if(	!fn_CheckAppMember()){
				isAction=false;
			}else{
				isAction=true;
			}
			break;

		case "Editor_adminsave"://관리자 저장버튼
			$("#hiddenActionEvent").val("Editor_adminsave");  // ??[Edward]  일부러 공란을 둔건가???   --> RF -> 일부 문자열 제외하고 InjectData 에서 trim 처리함.
			//$("#hiddenUpdateReason").val("adminsave");
			isAction=true;
			break;
	}


	//console.log(" isAction : " + isAction);
	//마지막 결재일경우 수신자 체크 루틴
	lastApp=0;
	firstApp=-1;
	curApp=-1;
	var tmpArr=$("#hiddenApprovalValue").val().split("||")

	if ($("#hiddenApprovalValue").val().trim()!="")
	{
		for (i=0;i<tmpArr.length ;i++ )
		{
			approvalArray=tmpArr[i].split("_");
			if (inside)
			{
				//console.log("$(\"#hiddenApprovalValue\").val()="+$("#hiddenApprovalValue").val());
			}

			if (approvalArray[4].toString()=="1" && approvalArray[3].toString() != "30")
			{
				lastApp=i;
				if (firstApp == -1)
				{
					firstApp = i;
				}
				//console.log(tmpArr,i);
				if ((approvalArray[8].toString()=="0" || approvalArray[8].toString()=="1") && approvalArray[3].toString()==onLoginUser && curApp == -1)
				{
					curApp=i;
				}
			}
		}
	}

	if (curApp != -1 && curApp == lastApp)
	{
		var tmp = false;
		if ($("#hiddenReceiveValue").val() != "")
		{
			var arrRec = new Array();
			arrRec = $("#hiddenReceiveValue").val().split("||");
			//console.log($("#hiddenReceiveValue").val());
			//for (i=0;i<arrRec.length ;i++ )
			//{
			//console.log("arrRec[0]="+arrRec[0]+"____arrRec[0].split(\"_\")[0].toString()="+arrRec[0].split("_")[0].toString());
			if (arrRec[0].split("_")[0].toString() != "30" && arrRec[0].split("_")[0].toString() != "")
			{
				tmp = true;
				//break;
			}
			//}
		}

		if (tmp==false && $("#h_CurAppGrpOrd").val() != $("#h_LASTGRP").val() && $("#hiddenActionEvent").val() != "Editor_reject")
		{
			isAction = false;
			alert(i18next.t("approval:msg.insertRecGrp"));
		}

	}

	if ( $("#h_CurAppGrpOrd").val() != $("#h_LASTGRP").val() && ($("#hiddenActionEvent").val() =="Editor_submit" || $("#hiddenActionEvent").val()  == "Editor_receive") && $("#hiddenReceiveValue").val() == "")
	{

		if (confirm(i18next.t("approval:msg.insertRecGrpQ")))
		{
			isAction = false;
		}

	}

	//console.log('approvalButtonEvent  isAction : ' + isAction );

	if (isAction == true )
	{
		//console.log('isAction ..... JSP');
		var sendclass = new Array();
		$("input[class*=input_appClassIdx]").each(function(i,item){
			sendclass.push(item.value);
		});
		chkFormsTags();
		sendclass.join(",");
		// 문서번호 및 결재싸인 등 포함된 내용 저장
		$("#hiddenMainContents").val(tinyMCE.activeEditor.getContent({format : 'raw'}));
		//console.log($("#hiddenMainContents").val());
		$("#hiddenClass").val(sendclass);
		$("#hiddenUpdateReason").val($("#docReasonTxt").val());  // 사유
		$("#hidden_Editor_opinion").val($("#comment").val());   // 의견
		$("#hiddentags").val($("#tags").val());
		$("#hiddenFtags").val(fStrTag);
		$("#hiddenUtags").val(uStrTag);

		/*  추가&amp;nbsp;의견ㅇㅇ
		console.log('  ::  comment  : ' +$("#comment").val() );
		console.log('  ::  hidden_Editor_opinion  : ' +$("#hidden_Editor_opinion").val() );
		console.log('  ::  docReasonTxt  : ' +$("#docReasonTxt").val() );
		console.log('  ::  hiddenUpdateReason  : ' +$("#hiddenUpdateReason").val() );
		*/

		approvalValid();
	}
	else
	{
		console.log('CANCEL 전송실패');
		///---
		return false;

	}
}


//결재시 싸인정보 체크 함수
function fn_CheckAppMember(_reject){
	//uc:사용자코드

	var valArr = $("#hiddenApprovalValue").val().split("||");
	var arr = [];
	var isReturn = false;

	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,2:참조,3:협조,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료 , [9]=직위 , [10]=싸인위치

	//현재 결재할 결재자 정보 저장 변수
	var wait=[];

	//단독결재 구분 플래그
	var soloAppFlag = false;

	//현결재 구분 플래그
	var arrChk = false;

	//console.log(valArr);


	//결재자 정보가 설정되어있는지 체크
	$(valArr).each(function(i,item){

		arr = item.split("_");
		if(arr[3] != "30" ){
			soloAppFlag = true;
		//	break;
			isReturn = false;
		}
	});

	//마지막 결재자 Idx, 현재 결재자 Idx, 현재 결재 그룹순서
	var lastIdx, nowIdx , curGrp;
	valArr = $("#hiddenApprovalValue").val().split("||");
	$($(valArr).get().reverse()).each(function(i,item){

		arr = item.split("_");
		//console.log(arr);
		if(arr[4] == "1"){
			lastIdx=i;
			return false;
		}
	});
	//마지막 결재자 Idx 설정
	lastIdx = ((valArr.length-lastIdx)-1);

	//console.log(isReturn);
	//단독결재
	if( !soloAppFlag ){
		//단독 결재시 종료된다는 메세지와 계속하겠냐는 질문 던지기
		if(confirm(i18next.t("approval:msg.onlyOneApp"))){
			var UserNm = $("#UserNm").val();
			var UserCode = $("#UserCode").val();
			var apprVal = $("#hiddenApprovalValue").val().split("||");
			var apprText = $("#hiddenApprovalText").val().split("||");
			var isSet=false;
			var App_Grp_In_Sort=0;
			var App_Grp_In_Sort_Change=1;
			var APP_Kind=1;
			var appValD = new Array();
			var apprTextD = new Array();

			for (i=0;i<apprVal.length ;i++ )
			{
				appValD = apprVal[0].split("_");
				if (appValD[4].toString()=="1" && appValD[3].toString() != "30")
				{
					isSet = true;
				}
			}

			if (isSet==false)
			{
				for (i=0;i<apprVal.length ;i++ )
				{
					appValD = apprVal[i].split("_");
					apprTextD = apprText[i].split(":");
					if (appValD[4].toString()=="1")
					{
						appValD[3]=UserCode;
						apprTextD[1]=UserNm;
						var valStr = appValD.join("_");
						var txtStr = apprTextD.join(":");
						apprVal[i]=valStr;
						apprText[i]=txtStr;
						$("#hiddenApprovalValue").val(apprVal.join("||"));
						$("#hiddenApprovalText").val(apprText.join("||"));
						break;
					}
				}
			}

			//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
			//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)
			//이번에 결재할 결재라인 정보 조회
			valArr = $("#hiddenApprovalValue").val().split("||");
			arrChk = false;
			$(valArr).each(function(i,item){

				arr = item.split("_");
				if (arrChk==false)
				{
					wait = arr;
				}
				//console.log(arr);
				if((arr[8] == "0" || arr[8] == "1") && arr[3] == $("#UserCode").val()){
					curGrp = arr[0];
					nowIdx = i;
					//단독결재시 마지막 Idx 현재 결재자로 설정
					lastIdx = i;
					//console.log( "  lastIdx : "  + lastIdx)
					if (arrChk==false)
					{
						wait = arr;
						arrChk=true;
						App_Grp_In_Sort_Change = arr[2];
						App_Grp_In_Sort = arr[1];
						APP_Kind = arr[4];
					}
					//break;
					isReturn = false;
					//1_1_1_3539_1_6_0_1_0||1_2_2_30_1_6_0_1_0
				}
			});

			$.ajax({
				//url : "/module/userModule/approval/common/getUserInfo.do"
				url : "/module/usermodule/approval/common/getUserInfo"
				,type : "POST"
				,data: {
					"uc" : $("#UserCode").val()//wait[3]
					,"formSeq" : $("#fs").val()
					,"lastIdx" : lastIdx
					,"nowIdx" : nowIdx
					,"curGrp" : curGrp
					,"sq" : $("#hidden_Sq").val()
					,"App_Grp_In_Sort" : App_Grp_In_Sort
					,"App_Grp_In_Sort_Change" : App_Grp_In_Sort_Change
					,"APP_Kind" : APP_Kind
				}
				,async: false
				,success: function(data){
					//var info = JSON.parse(data);
					var info = data;
					//console.log('getUserInfo aa : ' + JSON.stringify(info));
					if (info.signCode != "0")
					{
						/*
						{ "signCode": "123123", "nm" : "홍길동"}
						*/

						/*
						  싸인타입
						  0: 사인 없음
						  1: 이름
						  2: 싸인
						  3: 싸인/이름
						  4: 싸인/결재일
						  5: 싸인/이름/결재일
						  ------------------
						  여기부턴 S, P, N 사용
						   P: 직위, S:싸인, N: 이름

						  6: |이름|싸인|
						  7: |이름|싸인/결재일|
						  8: |직위|이름|싸인|
						  ,"sq" : $("#hidden_Sq").val()
						*/

						//싸인 정보 들어갈 필드 정보 셋팅
						var cls = info.signField;//fn_appLineClassMake(wait.join("_"));
						//console.log("cls="+cls);

						var eBody = tinyMCE.activeEditor.getBody();
						var $signField = $(eBody).find("."+cls);
						var $signField2 = $(eBody).find(".S"+cls);
						var $nmField = $(eBody).find(".N"+cls);
						var $pField = $(eBody).find(".P"+cls);
						var $tField = $(eBody).find(".T"+cls);
						var dt = new Date().toString().localeDateConvert('YY.MM.DD',i18next.language.changeLanCode('app'));

						var sTxt = "";
						var s2Txt = "";
						var nmTxt = "";
						var tTxt = "";
						var pTxt = "";



						//텍스트 값 바인딩
						switch(wait[5]){
							case "0" :
								break;
							case "1" :
								sTxt = info.nm;
								break;
							case "2" :
								sTxt = getSignImg($signField,info.signCode,_reject);
								break;
							case "3" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+info.nm;
								break;
							case "4" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+dt;
								break;
							case "5" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+info.nm+"<br>"+dt;
								break;
							case "6" :
							case "7" :
							case "8" :
								nmTxt = info.nm;
								s2Txt = getSignImg($signField2,info.signCode,_reject);
								tTxt = getSignImg($signField2,info.signCode,_reject)+"<br>"+dt;
								pTxt = wait[9];
								break;
							default :
								break;

						}
						/*
						console.log(sTxt);
						console.log(s2Txt);
						console.log(nmTxt);
						console.log(tTxt);
						console.log(pTxt);
						*/

						//Field SET
						$signField.html(sTxt);
						$signField2.html(s2Txt);
						$tField.html(tTxt);
						$nmField.html(nmTxt);
						$pField.html(pTxt);

						//가운데정렬 클래스 추가
						$signField.addClass("text-center");
						$signField2.addClass("text-center");
						$tField.addClass("text-center");
						$nmField.addClass("text-center");
						$pField.addClass("text-center");
						isReturn = true;
					}else{
						alert("결재사인이 등록되어 있지 않습니다.\n사인을 등록 후 다시 시도해 주세요");
						isReturn = false;
					}
				}

			});
		}else{
			isReturn = false;
		}

	}else{

		//이번에 결재할 결재라인 정보 조회
		$(valArr).each(function(i,item){
			arr = item.split("_");
			//console.log(arr);
			if((arr[8] == "0" || arr[8] == "1") && arr[3] == $("#UserCode").val()){
				curGrp = arr[0]
				nowIdx = i;
				if (arrChk==false)
				{
					wait = arr;
					arrChk=true;
					App_Grp_In_Sort_Change = arr[2];
					App_Grp_In_Sort = arr[1];
					APP_Kind = arr[4];
				}
				isReturn = false;
			}else{
				isReturn = true;
			}
		});
		//console.log("$(\"#hiddenApprovalValue\").val()="+$("#hiddenApprovalValue").val());
		//console.log($(valArr));
		//console.log(arr);
		//console.log(wait);
		//wait 0인 경우도 있다..

		if(wait.length>0){

			//사용자 정보를 읽어와 싸인 정보 입력
			$.ajax({
				//url : "/module/userModule/approval/common/getUserInfo.do"
				url : "/module/usermodule/approval/common/getUserInfo"
				,type : "POST"
				,data: {
					"uc" : $("#UserCode").val()//wait[3]
					,"formSeq" : $("#fs").val()
					,"lastIdx" : lastIdx
					,"nowIdx" : nowIdx
					,"curGrp" : curGrp
					,"sq" : $("#hidden_Sq").val()
					,"App_Grp_In_Sort" : App_Grp_In_Sort
					,"App_Grp_In_Sort_Change" : App_Grp_In_Sort_Change
					,"APP_Kind" : APP_Kind
				}
				,async: false
				,success: function(data){
					//var info = JSON.parse(data);
					var info = data;
					//console.log('getUserInfo bb : ' + JSON.stringify(info));
					if (info.signCode != "0")
					{
						/*
						{ "signCode": "123123", "nm" : "홍길동"}
						*/

						/*
						  싸인타입
						  0: 사인 없음
						  1: 이름
						  2: 싸인
						  3: 싸인/이름
						  4: 싸인/결재일
						  5: 싸인/이름/결재일
						  ------------------
						  여기부턴 S, P, N 사용
						   P: 직위, S:싸인, N: 이름

						  6: |이름|싸인|
						  7: |이름|싸인/결재일|
						  8: |직위|이름|싸인|
						*/

						//싸인 정보 들어갈 필드 정보 셋팅
						var cls = info.signField;//fn_appLineClassMake(wait.join("_"));
						//console.log("cls="+cls);

						var eBody = tinyMCE.activeEditor.getBody();
						var $signField = $(eBody).find("."+cls);
						var $signField2 = $(eBody).find(".S"+cls);
						var $nmField = $(eBody).find(".N"+cls);
						var $pField = $(eBody).find(".P"+cls);
						var $tField = $(eBody).find(".T"+cls);
						var dt = new Date().toString().localeDateConvert('YY.MM.DD',i18next.language.changeLanCode('app'));

						var sTxt = "";
						var s2Txt = "";
						var nmTxt = "";
						var tTxt = "";
						var pTxt = "";



						//텍스트 값 바인딩
						switch(wait[5]){
							case "0" :
								break;
							case "1" :
								sTxt = info.nm;
								break;
							case "2" :
								sTxt = getSignImg($signField,info.signCode,_reject);
								break;
							case "3" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+info.nm;
								break;
							case "4" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+dt;
								break;
							case "5" :
								sTxt = getSignImg($signField,info.signCode,_reject)+"<br>"+info.nm+"<br>"+dt;
								break;
							case "6" :
							case "7" :
							case "8" :
								nmTxt = info.nm;
								s2Txt = getSignImg($signField2,info.signCode,_reject);
								tTxt = getSignImg($signField2,info.signCode,_reject)+"<br>"+dt;
								pTxt = wait[9];
								break;
							default :
								break;

						}
						/*
						console.log(sTxt);
						console.log(s2Txt);
						console.log(nmTxt);
						console.log(tTxt);
						console.log(pTxt);
						*/

						//Field SET
						$signField.html(sTxt);
						$signField2.html(s2Txt);
						$tField.html(tTxt);
						$nmField.html(nmTxt);
						$pField.html(pTxt);

						//가운데정렬 클래스 추가
						$signField.addClass("text-center");
						$signField2.addClass("text-center");
						$tField.addClass("text-center");
						$nmField.addClass("text-center");
						$pField.addClass("text-center");
						isReturn = true;
					}else{
						alert("결재사인이 등록되어 있지 않습니다.\n사인을 등록 후 다시 시도해 주세요");
						isReturn = false;
					}
				}
			});
		}
	}
	return isReturn;

	/*
	$.ajax({
		url : "/module/userModule/approval/common/"
	})
	*/
}


//문서번호 조회
function fn_getDocNum(){
	var ruleType = null;
	var docRule = null;


	//파라미터로 넘길 배열
	var paramArr = ["","","","","","",""];

	//console.log($("#fs").val());

	//채번시점 조회
	$.ajax({
		//url : "/module/usermodule/approval/common/getDocNum.do"
		url : "/module/usermodule/approval/common/getDocNum"
		,data : {
			"dmlType" : "getPoint"
			,"fs" : $("#fs").val()
		}
		,type : "POST"
		,async : false
		,success : function(data){
			//console.log('getDocNum : ' +JSON.stringify(data));

			//var jData = JSON.parse(data);
			ruleType = data.point;

			var multiInfoArr = [] ;
			if(data.multiInfo != ""){
				multiInfoArr = data.multiInfo.split("||");
			}

			var itemArr =[];
			for(var i=0 ; i < multiInfoArr.length ; i++ ){
					itemArr = multiInfoArr[i].split("@@");
					paramArr[parseInt(itemArr[1])] = $("INPUT[id=hidden_"+itemArr[0]+"_ItemVal]").val();
			}
		}
	})

	//var hiddenFiled="hidden_"+_target.id.split(GUBUN)[0]+"_ItemVal";
	//console.log($(tinymce.activeEditor.dom.select("INPUT[id*=_ItemVal]"))

	//console.log($("#hiddenApprovalValue").val());

	var appLineArr= $("#hiddenApprovalValue").val().split("||");
	//[0]=결재그룹, [1]=결재기본순서(1~N:기본 , 0:추가), [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람),
	//[5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,2:참조,3:협조,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료 , [9]=직위 , [10]=싸인위치


	//첫번째 결재자 결재여부 조회 1_1_1_32313836_1_6_2_1_0_임원_||1_2_2_32313837_1_6_2_1_0_임원_
	var firstAppArr = appLineArr[0].split("_");
	var firstAppStat = firstAppArr[8];  //결재상태
	var firstAppGRP = firstAppArr[0];  //결재상태


	var itemArr=[];

	var lastAppLine; // 마지막 결재자인지 체크
	var lastAppGrp; // 결재그룹정보

	//마지막 결재자 순서 및 결재그룹 조회
	for(var i=(appLineArr.length-1) ; i>=0 ; i--){
		itemArr = appLineArr[i].split("_");

		if(itemArr[4] =="1"  && itemArr[8] =="0" && itemArr[3] != "30"){
			lastAppGrp = itemArr[0];
			lastAppLine = itemArr[2];
			break;
		}
	}
	//console.log("lastAppLine="+lastAppLine);
	var isLastFlag = false;
	//현 결재자가 마지막 결재자인지 체크
	for(var i=0 ; i<appLineArr.length ; i++){
		itemArr = appLineArr[i].split("_");
		if(itemArr[2] ==lastAppLine  && itemArr[4] =="1" && (itemArr[8] =="0" || itemArr[8] =="1") && $("#UserCode").val() == itemArr[3]){
			isLastFlag =true ;
			break;
		}
	}

	//console.log("create point : " + ruleType)
	//console.log("firstAppStat : " + firstAppStat)
	//console.log("firstAppGRP : " + firstAppGRP)

	//(0:사용 안함 , 1:결재상신시, 2:지정그룹결재완료시,3: 최종결재완료시)
	if(ruleType=="0"){
		//console.log("1")
		return false;

	//------------------------------------------------------------------------------------------------------------------------
	// - 1번째 결재자가 결재시 firstAppStat == 0 이여서 문서번호 다시 채번하고 있음. 수정필요, 2018-07-12, 김영식
	// - 수신시에 문서번호 변경이 일어났는데.. 혹시 아래 조건이 수정되었는지?
	//------------------------------------------------------------------------------------------------------------------------
	}else if( ruleType=="1" && firstAppStat == "0" && firstAppGRP=="1" && $("#hiddenActionEvent").val() == "Editor_submit" ) { //결재상신이며 첫번째 결재자가 결재대기상태인 경우
		data = fn_getDocRule(paramArr);
		setDocNum(data.docNum);
		//console.log("2")

	}else if(ruleType=="2"){ //  선택그룹 완료시 채번
		data = fn_getDocRule(paramArr);
		//console.log(" ruleType 2");
		//console.log(data);
		//console.log(data.selectGrpIdx , lastAppGrp , isLastFlag)
		//console.log("3")
		//if(data.selectGrpIdx == lastAppGrp && isLastFlag || true){
		if(data.selectGrpIdx == lastAppGrp && isLastFlag){
			setDocNum(data.docNum);
		}

	}else if(ruleType=="3"){ //최종결재완료시 채번 로직 추가
		data = fn_getDocRule(paramArr);
		//console.log("getDocRule ="+ data);
		//console.log( data.maxGrpCnt , lastAppGrp , isLastFlag );
		//console.log("5")
		//console.log("data.maxGrpCnt : " + data.maxGrpCnt +", lastAppGrp="+lastAppGrp+ ",isLastFlag="+isLastFlag )
		//if(data.maxGrpCnt == lastAppGrp && isLastFlag  || true){ //최종결재그룹이면서 마지막 결재자인 경우
		// 수신시 - 채번되는 현상 발생
		if(data.maxGrpCnt == lastAppGrp && isLastFlag ){ //최종결재그룹이면서 마지막 결재자인 경우
			setDocNum(data.docNum);
		}
	}
}

//문서번호 셋팅
function setDocNum(_docNum){
	var eBody = tinyMCE.activeEditor.getBody();
	var $docNumField = $(eBody).find("TD[class^=S4_]");
	/*
	console.log("문서번호 필드");
	console.log($docNumField);
	console.log($docNumField.html());
	console.log(_docNum);
	console.log("문서번호 필드 끝");
	*/
	try{
		$docNumField.html(_docNum);
		//$($docNumField).html(_docNum);
	}catch(e){
		console.log(e)
	}
	//console.log("문서번호"+_docNum);
}

//채번규칙 조회
function fn_getDocRule(_arr ){
	var jData = null;
	// deprecated code 제거
	/*
	var urlPage;
	//console.log(inside.toString().toLowerCase());
	if (inside.toString().toLowerCase()=="true")
	{
		urlPage="getDocNum2.do"
	}
	else
	{
		urlPage="getDocNum2.do"
	}
	*/
	//채번규칙조회
	$.ajax({
		//url : "/module/usermodule/approval/common/"+urlPage  // getDocNum2.do
		url : "/module/usermodule/approval/common/getDocNum2"
		,data : {
			"dmlType" : "getDocRule"
			,"fs" : $("#fs").val()
			,"paramArr" : _arr.toString()
			,"sq" : $("#hidden_Sq").val()
		}
		,type : "POST"
		,async : false
		,success : function(data){
			//console.log('getDocNum2 : ' +JSON.stringify(data));
			//jData = JSON.parse(data);
			jData = data;
			//console.log(JSON.parse(data));
		}
	})
	return jData;

}

//이미지 경로 셋팅
function getSignImg(_s,sn,_reject){

	var txt = "";
	if(_reject=="REJECT"){
		//txt ="<img class='sign-img' src='/data/imgSign/reject.gif' style='width:98%'>";
		txt ="<img class='sign-img' src='/common/imgSign/reject.gif' style='width:98%'>";
	}
	else if(sn != ""){
		//_s.html("<img class='sign-img' src='/Common/img.do?Fsn="+sn+"'>");
		//txt ="<img class='sign-img' src='/Common/img.do?Fsn="+sn+"'  style='width:98%'>";
		txt ="<img class='sign-img' src='/common/img?fsn="+sn+"'  style='width:98%'>";
		//alert(txt);
	}else{
		//_s.html();
	}
	//console.log(txt);
	return txt;
}