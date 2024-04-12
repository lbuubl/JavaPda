/* ------------------------------------------------------------------------------
*
 전자결재 공통 결재선 지정 자바스크립트
*
* ---------------------------------------------------------------------------- */

$(document).ready(function(){

	//순차결재 지정 버튼 클릭
	$(document).on("click","#btn_appL",function(e){
		actBtnApp("1","1"); //순차결재
	});

	//비순차결재 지정 버튼 클릭
	$(document).on("click","#btn_appNL",function(e){
		actBtnApp("1","6");//비순차 결재
	});

	//참조차결재 지정 버튼 클릭
	$(document).on("click","#btn_appCL",function(e){
		actBtnApp("2","2");//참조 결재
	});

	//협조차결재 지정 버튼 클릭
	$(document).on("click","#btn_appAL",function(e){
		actBtnApp("3","3");//협조 결재
	});

	//회람자결재 지정 버튼 클릭
	$(document).on("click","#btn_appVL",function(e){
		actBtnApp("4","4");//회람 결재
	});

	//삭제 버튼 클릭
	$(document).on("click","#btn_appD",function(e){
		var obj = document.all.selectedApprovalBox;
		var applineSelectedLength = obj.length;
		//var objVal = new Array();
		//var objTxt = new Array();
		var appLCnt=0;
		var appCCnt=0;
		var appACnt=0;
		var appVCnt=0;

		applineSelectedLength = obj.length;
		for (i=applineSelectedLength-1;i>=0 ;i-- )
		{
			if (obj.options[i].selected==true)
			{
				var objVal = obj.options[i].value.split("_");
				var objTxt = obj.options[i].value.split(":");
				if (objVal[1].toString()=="0")
				{
					obj.options[i]=null;
				}
				else
				{
					obj.options[i].value=objVal[0]+"_"+objVal[1]+"_"+objVal[2]+"_0_"+objVal[4]+"_"+objVal[5]+"_"+objVal[6]+"_"+objVal[7]+"_"+objVal[8];
					obj.options[i].text=objTxt[0]+": "+i18next.t("approval:setting.label.blank");
				}
			}
		}

		applineSelectedLength = obj.length;
		for (i=0;i<applineSelectedLength ;i++ )
		{
			var objVal = obj.options[i].value.split("_");
			var objTxt = obj.options[i].text.split(":");
			var objTit = obj.options[i].title;
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
			obj.options[i].value=objVal[0]+"_"+objVal[1]+"_"+objVal[2]+"_"+objVal[3]+"_"+objVal[4]+"_"+objVal[5]+"_"+objVal[6]+"_"+objVal[7]+"_"+objVal[8];
			obj.options[i].text=prObjTxt[0] + " " + prObjTxt[1] +": "+objTxt[1];
			obj.options[i].title=objTxt[1];
		}
		appLineDesel(obj);
	});

	$(document).on("click",".addAppTypeLI",function(e){ //추가항목 삭제
		//적용내용
		$(this).parent().parent().remove();
	});


	$(document).on("click","#btnApprovalLine2",function(e){ //결재선 지정버튼

        alert('[ERROR] \n 시스템 관리자 문의 바랍니다.');

		var formData = new FormData();
		var sq=$("#sq").val();
		var fq=$("#fs").val();
		formData.append("sq",sq);
		formData.append("fq",fq);

		$.ajax({
			url:"/module/UserModule/approval/common/appLineConfig.page",  //결재선 지정 페이지 로드
			type:"POST",
			dataType:"html",
			data:{ "sq": sq,"fq": fq},
			success:function(data){
				$('#appLineLoadModal').html(data);

				hiddenReceiveValue = new Array();
				hiddenReceiveText = new Array();
				hiddenReceiveGrp = new Array();

				loadOBSTree(sq,fq);
				$("#ajax").height(200);
				$('#appLineLoadModal').localize();
				$('#appLineLoadModal').modal('show', {backdrop: 'static'});
				moveScrollTop(0);
				userListArray=new Array();
				userListTextArray = new Array();
				userListValueArray = new Array();


				$.ajax({
					//url:"/module/UserModule/approval/common/loadAppUserList.do", // 기본 결재선 로드
					url:"/module/usermodule/approval/common/loadAppUserList", // 기본 결재선 로드
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						//console.log('loadAppUserList : '+data);
						var appInfo = data.split("|@|");
						var appCount = appInfo[0].split(",");
						grpSort = appCount[5];
						var appLines = appInfo[1].split("||");
						var appTexts = appInfo[2].split("||");
						var appTitles = appInfo[3].split("||");
						var selObj = document.all.selectedApprovalBox;
						var optionText="";
						var optionValue="";
						for (i=selObj.length-1;i>=0 ;i-- ) // 결재선란 초기화
						{
							selObj.options[i]=null;
						}
						hiddenApprovalBoxValue = new Array();
						hiddenApprovalBoxText = new Array();
						hiddenApprovalBoxTitle = new Array();
						hiddenApprovalBoxValue = $("#hiddenApprovalValue").val().split("||");
						hiddenApprovalBoxText = $("#hiddenApprovalText").val().split("||");
						hiddenApprovalBoxTitle = $("#hiddenApprovalTitle").val().split("||");

						if (hiddenApprovalBoxValue.length > 0 && $("#hiddenApprovalValue").val().trim() != "")
						{
							for (i=0; i<hiddenApprovalBoxValue.length ;i++ )
							{
								selObj.options[i]=new Option(hiddenApprovalBoxText[i],hiddenApprovalBoxValue[i]);
								selObj.options[i].title=hiddenApprovalBoxTitle[i];
							}
						}
						else
						{
							for (i=0; i<appLines.length ;i++ )
							{
								optionText=createOption(appLines[i],appTexts[i],"text");
								optionValue=createOption(appLines[i],appTexts[i],"value");
								selObj.options[i]=new Option(optionText,optionValue);
								if (appTitles[i]=='i18next.t')
								{
									selObj.options[i].title=i18next.t("approval:setting.label.blank");
								}
								else
								{
									selObj.options[i].title=appTitles[i];
								}
							}
						}

						for (i=0; i<selObj.length ;i++ )
						{
							var tmpArr = selObj.options[i].value.split("_");
							if (tmpArr[4].toString()=="1")
							{
								lastAppIndex=i;
							}
						}

						//alert(data);
						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 지정 결재선

				$.ajax({
					//url:"/module/usermodule/approval/common/getViewAuthList.do", // 기본열람권한 설정
					url:"/module/usermodule/approval/common/getViewAuthList", // 기본열람권한 설정
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						var appInfo = data.split("|@|");
						var appLines = appInfo[0].split("||");
						var appTexts = appInfo[1].split("||");
						var appTitles = appInfo[2].split("||");
						var selObj = document.all.viewAuthLine;

						for (i=selObj.length-1;i>=0 ;i-- ) // 결재선란 초기화
						{
							selObj.options[i]=null;
						}
						hiddenAuthViewBoxValue = new Array();
						hiddenAuthViewBoxText = new Array();
						hiddenAuthViewBoxTitle = new Array();

						hiddenAuthViewBoxValue = $("#hiddenAuthViewValue").val().split("||");
						hiddenAuthViewBoxText = $("#hiddenAuthViewText").val().split("||");
						hiddenAuthViewBoxTitle = $("#hiddenAuthViewTitle").val().split("||");

						if (hiddenAuthViewBoxValue.length > 0 && $("#hiddenAuthViewValue").val().trim() != "")
						{

							for (i=0; i<hiddenAuthViewBoxValue.length ;i++ )
							{
								selObj.options[i]=new Option(hiddenAuthViewBoxText[i],hiddenAuthViewBoxValue[i]);
								selObj.options[i].title=hiddenAuthViewBoxTitle[i];
							}
						}
						else
						{

							var j=0;
							for (i=0; i<appLines.length ;i++ )
							{
								if (appLines[i].trim() != "")
								{
									selObj.options[j]=new Option(appTexts[i],appLines[i]);
									selObj.options[j].title=appTitles[i];
									j++;
								}
							}
						}

						//alert(data);
						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 열람권한 설정

				// TODO ??? 이거 뭐지...???  사용하지 않는 정보를 왜????
				$.ajax({
					//url:"/module/UserModule/approval/common/getReceiveList.do", // 기본수신자 설정
					url:"/module/usermodule/approval/common/getReceiveList", // 기본수신자 설정
					type:"POST",
					dataType:"text",
					data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
					success:function(data){
						alert('getReceiveList  호출만 하고 사용하지 않는다.. 이거 보이면.. \n 코드 수정필요.[approvalAppLine.js]');

						var appLines = $("#hiddenReceiveValue").val().split("||");
						var appTexts = $("#hiddenReceiveText").val().split(":")[1].split(",");
						var appTitles = $("#hiddenReceiveTitle").val().split("||");
						var appRG = $("#hiddenReceiveGroup").val().split("||");
						// appLines =  [0]:UserSeq ObsSeq , [1]:Nm OBS이름 , [2] : GrpOBSSeq , [3]OBS 구분자
						// appRG = [0]:ReceiveGrp OBS명칭, [1]:IsNextGrp, [2]:receiveKind, [3]:receiveObsSeqno, [4]:hqObsSeqno, [5]:receiveGongu
						var strReceiveUsers="";

						$("#configReceiveValue").val($("#hiddenReceiveValue").val());
						$("#configReceiveText").val($("#hiddenReceiveText").val());
						$("#configReceiveTitle").val($("#hiddenReceiveTitle").val());
						$("#configReceiveGroup").val($("#hiddenReceiveGroup").val());

						if ($("#configReceiveValue").val().split("_")[1].toString()=="30")
						{
							strReceiveUsers = "<span title='"+appRG[0]+"'>"+$("#hiddenReceiveText").val().split(":")[0]+"</span>:"+"<span title='"+appRG[0]+">"+i18next.t("approval:app.label.All")+"'>"+i18next.t("approval:app.label.All")+"</span>";
						}
						else
						{
							for (i=0;i<appTexts.length ;i++ )
							{
								if (i==0)
								{
									strReceiveUsers = "<span title='"+appRG[0]+"'>"+$("#hiddenReceiveText").val().split(":")[0]+"</span>:"+"<span title='"+appTitles[i]+"'>"+appTexts[i]+"</span>";
								}
								else
								{
									strReceiveUsers = strReceiveUsers +", <span title='"+appTitles[i]+"'>"+appTexts[i]+"</span>";
								}
							}
						}
						$("#receiveUsers").html(strReceiveUsers);

						return;
					},
					error:function(data){
						alert("err//"+data.message);
					}
				});  //기본 수신자 설정


				return;
			},
			error:function(data){
				alert("err//"+data.message);
				$('#appLineLoadModal').modal('hide');
			}

		});
	});
	$(document).on("click","#btnApprovalLine",function(e){ //결재선 지정버튼
		var url;
		if(isMobile){
			//url = "/module/UserModule/approval/common/Modal-AppLine-mobile.page";
			url = "/module/usermodule/approval/common/modalAppLineMobile";   // 결재선 지정(모바일)
		}else{
			//url = "/module/UserModule/approval/common/Modal-AppLine.page";
			url = "/module/usermodule/approval/common/modalAppLine";  // 결재선 지정
		}
		$.ajax({
			"url": url
			,type : "post"
			,data:{ "sq": $("#sq").val(),"fq": $("#fs").val()}
			,success : function(result){
				$("#approvalAppLineModal").html(result);
			}
		})
	});

	$(document).on("click","#addAppLine",function(e){
		$.ajax({
			url:"/data.do?callcmd=APP_addAppLine",  //결재선 추가 페이지 로드
			type:"POST",
			dataType:"html",
			success:function(data){
				$('#modal_addAppLine').html(data);

				$("#chkSwitch_appTypeAdd").attr("data-on-text",""+i18next.t("approval:workspace.label.befor"));
				$("#chkSwitch_appTypeAdd").attr("data-off-text",""+i18next.t("approval:workspace.label.after"));
				$('#modal_addAppLine').localize();

				var tAppTypeLoad1_ID = "#appTypeList";
				 $(".switch").bootstrapSwitch();


				$(tAppTypeLoad1_ID).find("tbody").on("click" , 'tr td', function () {
					var strSeq=$(this).attr("Seq").toString();
					var strAppend="";

					switch (strSeq)
					{
					case "1":
						sstrAppend = "<li Seq=\"1\"><span>"+i18next.t("approval:datatable.col.appL")+"</span> <span><i class='icon-user-minus position-center addAppTypeLI' style='cursor:pointer;'></i></span></li>"
						break;
					case "2":
						sstrAppend = "<li Seq=\"2\"><span>"+i18next.t("approval:datatable.col.appCL")+"</span> <span><i class='icon-user-minus position-center addAppTypeLI' style='cursor:pointer;'></i></span></li>"
						break;
					case "3":
						sstrAppend = "<li Seq=\"3\"><span>"+i18next.t("approval:datatable.col.appAL")+"</span> <span><i class='icon-user-minus position-center addAppTypeLI' style='cursor:pointer;'></i></span></li>"
						break;
					case "4":
						sstrAppend = "<li Seq=\"4\"><span>"+i18next.t("approval:datatable.col.appVL")+"</span> <span><i class='icon-user-minus position-center addAppTypeLI' style='cursor:pointer;'></i></span></li>"
						break;
					default :
						sstrAppend = ""
						break;
					}
					if (sstrAppend !="")
					{
						$("#appTypeDropdownMenu").append(sstrAppend);
					}
				});


				$('#modal_addAppLine').modal('show', {backdrop: 'static'});

			},
			error:function(data){
				alert("err//"+data.message);
				$('#modal_addAppLine').modal('hide');
			}
		});
	});
});


	function loadOBSTree(sq,fq){
		//console.log('approvalAppLine.js');
		 $('#ajax').on("select_node.jstree", function (e, data) {

				if(data.selected.length) {
					/* 한개 선택하는 방식일때 사용 */
					node_id	     = data.instance.get_node(data.selected[0]).id;
					P_node_id	 = data.instance.get_node(data.selected[0]).parent;
					node_nm	     = data.instance.get_node(data.selected[0]).text;

					a_attr		     = data.instance.get_node(data.selected[0]).a_attr;
					type		     = a_attr.T;

					$("#tree_sn").val(node_id);
					$("#tree_pn").val(P_node_id);
					$("#tree_md").val("");

					 $('#ajax').jstree().select_node(node_id);
					 $("#osq").val(node_id);
					 objArray = new Array();
					 if (tUserLoad1 != null)
					 {
						tUserLoad1.ajax.reload(function(j){
							$('#userList tbody tr').each( function() {
								if (j.recordsTotal>0)
								{
									var nTds = $('td', this);
									var idx = parseInt($(nTds[0]).text());
									var totCnt = j.recordsTotal;
									var toolTip = j.data[(totCnt-idx)][9];

									this.setAttribute( 'title', toolTip );
								}
							});
						},false);
					 }

				}else{
					//null data
				}
			}).
			jstree({
			'core' : {
				'check_callback': true, //add, rename, Del를 적용여부
				"themes" : { "stripes" : true }, //격자배경
				'data' : {
					//"url" : "/module/sysModule/obs/obs.do",
					 //"url": "/module/usermodule/approval/common/getObsTree.do",
					 "url": "/module/usermodule/approval/common/getObsTree",
					 //"url": "/module/usermodule/approval/common/getObsTree",
					"dataType" : "json" // needed only if you do not supply JSON headers
						}
				},
			//검색 , 선택배경반전, 체크박스
			"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
		});

		$('#ajax').on("loaded.jstree", function (e, data) { //first loading
			//R_id=$('#ajax ul > li:first').attr("id");
			$('#ajax').jstree().select_node($("#osq").val());
			loadUserDataTable();
			objArray = new Array();

			$("#ajax").height(410);

			if (!isMobile)//pc tree height
			{
				//$(this).height(cHeight-200);
			}
		});
	}


	function loadUserDataTable(){

		var tUserLoad1_Id = "#userList";
		// Setting datatable defaults
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,
			"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
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
			,"sScrollY": "300px"
			//,"bScrollCollapse": true
			,"paging":         false
			,"ajax" : {
				"url" :"/Module/UserModule/approval/common/loadUserList.do"
				,"type" : "post"
				,"data" : function ( d ) {
							d.osq = $("#osq").val();
							}
			}
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

			,keys: {
				focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
			}
			, "order": [ 3, "asc" ] //기본 정렬 역순 출력(필수)
			//INDEX 역순 출력(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {
				$('#userList_wrapper').localize();
			}
			,"buttons":[]
			, "initComplete" : function(s,j){
				//처음 로딩 후 header 맞추기 위해 클릭이벤트 바인딩
				$(tUserLoad1_Id+"_wrapper .sorting").trigger("click");

				$('#userList tbody tr').each( function() {
					if (j.recordsTotal>0)
					{
						var nTds = $('td', this);
						var idx = parseInt($(nTds[0]).text());
						var totCnt = j.recordsTotal;
						var toolTip = j.data[(totCnt-idx)][9];
						this.setAttribute( 'title', toolTip );
					}
				});
			}
		});

		if(!isMobile){
			event_kind="click"
		}else{
			event_kind="click"
		}

		$(tUserLoad1_Id+' tbody').on(event_kind , 'tr td', function () {
			clickUserList($(this));
		});



		tUserLoad1.on( 'page.dt', function () {
			moveScrollTop($(tUserLoad1_Id).offset().top);
		});
		tUserLoad1.on( 'order.dt', function (s,j) {
			$('#userList tbody tr').each( function() {
				if (j._iRecordsTotal>0)
				{
					var nTds = $('td', this);
					var idx = parseInt($(nTds[0]).text());
					var totCnt = j._iRecordsTotal;
					var toolTip = j.aoData[(totCnt-idx)]._aData[9];

					this.setAttribute( 'title', toolTip );
				}
			});
		});


		// External table additions (필수)
		// ------------------------------

		// Add placeholder to the datatable filter option
		$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");
	 }

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
		obj.parent().toggleClass('success');
		arrayPushPop(userListArray,seqNo);
		arrayPushPop(userListTextArray,textVal);
		arrayPushPop(userListValueArray,valueVal);
		arrayPushPop(userListTitleArray,Fnm);
		arrayPushPop(objArray,obj);
	}

	function appLineDesel(obj){
		for (i=0;i<obj.length ;i++ )
		{
			obj.options[i].selected=false;
		}
	}

	function actBtnApp(appType,appType2)
	{
		var obj = document.all.selectedApprovalBox;
		var applineSelectedIndex = obj.selectedIndex;
		var applineSelectedLength = obj.length;
		var objVal = new Array();
		var objTxt = new Array();
		var objTit = new Array();
		userSeqListArray = new Array();

		for (i=0;i<applineSelectedLength ;i++ )
		{
			objVal[i] = obj.options[i].value;
			objTxt[i] = obj.options[i].text;
			objTit[i] = obj.options[i].title;
			userSeqListArray[i]=objVal[i].split("_")[3];
		}

		if (applineSelectedIndex < 0)
		{
			applineSelectedIndex=0;
		}
		if (userListValueArray.length > 0)
		{
			for (i=applineSelectedIndex;i<applineSelectedLength ;i++ )
			{
			//[0]=결재그룹, [1]=결재기본순서, [2]=결재정렬순서, [3]=결재자ID, [4]=결재타입(1:결재,2:참조,3:협조,4:회람), [5]=사인타입, [6]=기본사인타입, [7]=결재 세부타입(1:순차결재,5:전결,6:비순차결재), [8] = 결재여부(0결재대기, 1결재진행, 2반려, 3전결, 4결재완료)
			//75_1_1_1_0||79_1_0_2_1||80_1_0_3_1||81_3_0_4_1||79_3_0_5_1||82_1_2_6_0
				var val = objVal[i].split("_");
				var txt = objTxt[i].split(":");
				var optVal = userListValueArray[0].split("_");
				var optTxt = userListTextArray[0].split(":");

				if (val[4].toString()==appType.toString())
				{
					if (val[3].toString() != "0")
					{
						var isChkMsg = chkMsg("tChangeUser","cChangeUser",txt[0]);
						if (isChkMsg)
						{
							if (chkArrayValue(userSeqListArray,optVal[0]) && (obj.options[i].value.split("_")[3]) != optVal[0])
							{
								var isDChkMsg = chkMsg("tDuplicateusers","tDuplicateusers",txt[0]);
								if (isDChkMsg)
								{
									obj.options[i].value=val[0]+"_"+val[1]+"_"+val[2]+"_"+optVal[0]+"_"+val[4]+"_"+val[5]+"_"+val[6]+"_"+appType2.toString()+"_"+val[8];
									obj.options[i].text=txt[0]+": "+optVal[1];
									obj.options[i].title=userListTitleArray[0];

									userListTextArray.shift();
									userListValueArray.shift();
									userListTitleArray.shift();
									objArray[0].parent().toggleClass('success');
									objArray.shift();

								}
							}
							else
							{
								obj.options[i].value=val[0]+"_"+val[1]+"_"+val[2]+"_"+optVal[0]+"_"+val[4]+"_"+val[5]+"_"+val[6]+"_"+appType2.toString()+"_"+val[8];
								obj.options[i].text=txt[0]+": "+optVal[1];
								obj.options[i].title=userListTitleArray[0];

								userListTextArray.shift();
								userListValueArray.shift();
								userListTitleArray.shift();
								objArray[0].parent().toggleClass('success');
								objArray.shift();
							}
						}
					}
					else
					{
						if (chkArrayValue(userSeqListArray,optVal[0]) && (obj.options[i].value.split("_")[3]) != optVal[0])
						{
							var isDChkMsg = chkMsg("tDuplicateusers","tDuplicateusers",txt[0]);
							if (isDChkMsg)
							{
								obj.options[i].value=val[0]+"_"+val[1]+"_"+val[2]+"_"+optVal[0]+"_"+val[4]+"_"+val[5]+"_"+val[6]+"_"+appType2.toString()+"_"+val[8];
								obj.options[i].text=txt[0]+": "+optVal[1];
								obj.options[i].title=userListTitleArray[0];

								userListTextArray.shift();
								userListValueArray.shift();
								userListTitleArray.shift();
								objArray[0].parent().toggleClass('success');
								objArray.shift();
							}
						}
						else
						{
							obj.options[i].value=val[0]+"_"+val[1]+"_"+val[2]+"_"+optVal[0]+"_"+val[4]+"_"+val[5]+"_"+val[6]+"_"+appType2.toString()+"_"+val[8];
							obj.options[i].text=txt[0]+": "+optVal[1];
							obj.options[i].title=userListTitleArray[0];

							userListTextArray.shift();
							userListValueArray.shift();
							userListTitleArray.shift();
							userListArray.shift();
							objArray[0].parent().toggleClass('success');
							objArray.shift();
						}
					}
					if (optVal[0] !="0" && appType2.toString()=="6")
					{
						obj.options[i].style.color="#00cc00";
					}
					else
					{
						obj.options[i].style.color="#333333";
					}


					if (userListValueArray.length<=0)
					{
						break;
					}
				}
			}
		}

		appLineDesel(obj);
	}