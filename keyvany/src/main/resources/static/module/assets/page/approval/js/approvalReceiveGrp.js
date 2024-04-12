/* ------------------------------------------------------------------------------
*
 전자결재 공통 열람권한설정
*
* ---------------------------------------------------------------------------- */

$(document).ready(function(){

	$(document).on("click","#setAppReceiveGrpback",function(e){ //수신자지정 닫기버튼
		swal({
			title: i18next.t("approval:msg.addAppLinebackTitle"),
			text: i18next.t("approval:msg.addAppLinebackMsg"),
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
				$('#modal_setReceiveGrp').modal('hide');
			}
		});
	});

	$(document).on("click","#setAppReceiveGrpSave",function(e){ //수신자지정 저장버튼
		var valueString="";
		var textString="";
		var titleString="";
		var strString=$("#configReceiveGroup").val().split("||");
		var receivGrp="";
		var newArrayValue = new Array();
		var newArrayText = new Array();
		var newArrayTitle = new Array();

		if(jQuery("#chkSwitch_filedHQ_Rec").is(":checked"))
		{
			receivGrp=$("#osq_setReceiveGrp").val();
		}
		else
		{
			receivGrp=$("#ohq_setReceiveGrp").val();
		}


		if(jQuery("#chkSwitch_Receive_input").is(":checked")) {
			var lastGrpNm = $("#setRecTreeFullName").val().split(">");
			strString[5]=$("#recG").val();
			//$("#receiveUsers").html(strReceiveUsers);

			strString[0]=$("#setRecTreeFullName").val();
			//strString[1]=1;
			strString[2]=0;
			strString[3]=$("#osq_setReceiveGrp").val();
			//strString[4]=$("#ohq_setReceiveGrp").val();
			strString[5]=$("#recG").val();
			$("#configReceiveValue").val(receivGrp+"_30_"+i18next.t("approval:app.label.All")+"_M30_"+$("#setRecTreeFullName").val()+">"+i18next.t("approval:app.label.All"));
			$("#configReceiveText").val(lastGrpNm[lastGrpNm.length-1]+":"+i18next.t("approval:app.label.All"));
			$("#configReceiveTitle").val(i18next.t("approval:app.label.All"));
			$("#configReceiveGroup").val(strString.join("||"));

			strReceiveUsers = "<span title='"+$("#setRecTreeFullName").val()+"'>"+lastGrpNm[lastGrpNm.length-1]+"</span>:"+"<span title='"+$("#setRecTreeFullName").val()+">"+i18next.t("approval:app.label.All")+"'>"+i18next.t("approval:app.label.All")+"</span>";
			$("#receiveUsers").html(strReceiveUsers);
		}
		else
		{
			if (receiveValueArray.length>0)
			{
				for (i=0;i<receiveValueArray.length ;i++ )
				{
					if (i==0)
					{
						var lastGrpNm = $("#setRecTreeFullName").val().split(">");
						strReceiveUsers = "<span title='"+$("#setRecTreeFullName").val()+"'>"+lastGrpNm[lastGrpNm.length-1]+"</span>:"+"<span title='"+$("#setRecTreeFullName").val()+receiveTitleArray[i].split(":")[0]+"'>"+receiveTextArray[i].split(":")[0]+"</span>";
					}
					else
					{
						strReceiveUsers = strReceiveUsers +", <span title='"+$("#setRecTreeFullName").val()+receiveTitleArray[i].split(":")[0]+"'>"+receiveTextArray[i].split(":")[0]+"</span>";
					}
					newArrayValue[i]=receiveValueArray[i].split(":")[0];
					newArrayText[i]=receiveTextArray[i].split(":")[0];
					newArrayTitle[i]=receiveTitleArray[i].split(":")[0];
				}
				strString[0]=$("#setRecTreeFullName").val();
				//strString[1]=1;
				strString[2]=1;
				strString[3]=$("#osq_setReceiveGrp").val();
				//strString[4]=$("#ohq_setReceiveGrp").val();
				strString[5]=$("#recG").val();
				$("#receiveUsers").html(strReceiveUsers);
				$("#configReceiveValue").val(newArrayValue.join("||"));
				$("#configReceiveText").val(lastGrpNm[lastGrpNm.length-1]+":"+newArrayText.join(","));
				$("#configReceiveTitle").val(newArrayTitle.join("||"));
				$("#configReceiveGroup").val(strString.join("||"));
			}
			else
			{
				var lastGrpNm = $("#setRecTreeFullName").val().split(">");
				strString[5]=$("#recG").val();
				//$("#receiveUsers").html(strReceiveUsers);

				strString[0]=$("#setRecTreeFullName").val();
				//strString[1]=1;
				strString[2]=0;
				strString[3]=$("#osq_setReceiveGrp").val();
				//strString[4]=$("#ohq_setReceiveGrp").val();
				strString[5]=$("#recG").val();
				$("#configReceiveValue").val(receivGrp+"_30_"+i18next.t("approval:app.label.All")+"_M30_"+$("#setRecTreeFullName").val()+">"+i18next.t("approval:app.label.All"));
				$("#configReceiveText").val(lastGrpNm[lastGrpNm.length-1]+":"+i18next.t("approval:app.label.All"));
				$("#configReceiveTitle").val(i18next.t("approval:app.label.All"));
				$("#configReceiveGroup").val(strString.join("||"));

				strReceiveUsers = "<span title='"+$("#setRecTreeFullName").val()+"'>"+lastGrpNm[lastGrpNm.length-1]+"</span>:"+"<span title='"+$("#setRecTreeFullName").val()+">"+i18next.t("approval:app.label.All")+"'>"+i18next.t("approval:app.label.All")+"</span>";
				$("#receiveUsers").html(strReceiveUsers);
			}
		}


		swal({
			title: " ", //확인내용
			text: i18next.t("approval:msg.setAppViewAuthSave"),//returnMsg, //확인내용
			type: "success",
			showCancelButton: false,
			showConfirmButton:  false,
			timer:1000
		});
		$('#modal_setReceiveGrp').modal('hide');
	});


	$(document).on("click","#setReceviGroupUser",function(e){//수신자 설정

        alert('[ERROR] \n 시스템 관리자 문의 바랍니다.');

		$.ajax({
			url:"/module/UserModule/approval/common/setReceiveConfig.page",  //수신자설정 페이지 로드
			type:"POST",
			dataType:"html",
			data:{ "sq": $("#sq").val(),"fq": $("#fs").val()},
			success:function(data){
				$('#modal_setReceiveGrp').html(data);
				//console.log($("#configReceiveValue").val());
				//console.log("$(\"#configReceiveGroup\").val()="+$("#configReceiveGroup").val());
				var riArray	=	$("#configReceiveValue").val().split("||");
				var receiveGrpArray = $("#configReceiveGroup").val().split("||");
				receiveGetObjArray = new Array();
				receiveListArray = new Array();
				$("#osq_setReceiveGrp").val(receiveGrpArray[3]);
				$("#ohq_setReceiveGrp").val(receiveGrpArray[4]);
				$("#recG").val(receiveGrpArray[5]);
				//console.log("$(\"#configReceiveValue\").val()="+$("#configReceiveValue").val());
				for (i=0;i<riArray.length ;i++ )
				{
					receiveGetObjArray[i]="id_"+riArray[i].split("_")[4]+"_"+receiveGrpArray[3];
				}

				$("#chkSwitch_filedHQ_Rec").attr("data-on-text",""+i18next.t("approval:workspace.label.Filed"));
				$("#chkSwitch_filedHQ_Rec").attr("data-off-text",""+i18next.t("approval:workspace.label.HQ"));
				//console.log("data-on-text="+$("#chkSwitch_Receive_input").attr("data-on-text"));
				//console.log("data-off-text="+$("#chkSwitch_Receive_input").attr("data-off-text"));
				if (receiveGrpArray[2].toString()!="0")
				{
					$("#chkSwitch_Receive_input").removeAttr('Checked');
				}
				else
				{
					$("#chkSwitch_Receive_input").attr("Checked","Checked");
				}
				$("#chkSwitch_Receive_input").attr("data-on-text",""+i18next.t("approval:workspace.label.All"));
				$("#chkSwitch_Receive_input").attr("data-off-text",""+i18next.t("approval:workspace.label.Choice"));
				//console.log("data-on-text2="+$("#chkSwitch_Receive_input").attr("data-on-text"));
				//console.log("data-off-text2="+$("#chkSwitch_Receive_input").attr("data-off-text"));

				$('#odal_addAppLine').localize();

				$(".switch").bootstrapSwitch();

				$('#chkSwitch_filedHQ_Rec').bootstrapSwitch('state', true);

				$('#chkSwitch_filedHQ_Rec').on('switchChange.bootstrapSwitch', function (event, state) {
					var chk = 'fl';
					var seq=null;
					receiveListArray = new Array();
					receiveValueArray = new Array();
					receiveTextArray = new Array();
					receiveTitleArray = new Array();


					if(jQuery("#chkSwitch_filedHQ_Rec").is(":checked")) {
						chk = 'fl';
						seq = $("#osq_setReceiveGrp").val();
					}
					else
					{
						chk = 'hq';
						seq = $("#ohq_setReceiveGrp").val();
					}

					$("#ock_rec").val(chk);

					$.ajax({
						url:"/module/UserModule/approval/common/getObsSeq2GongguCode.do", // 공구 구하기
						type:"POST",
						dataType:"text",
						data:{ "sq": seq},
						success:function(data){
							$("#recG").val(data);
							return;
						},
						error:function(data){
							alert("err//"+data.message);
						}
					});

					$('#ajax_ReceiveGrp').jstree("refresh");
					$('#ajax_ReceiveGrp').jstree().select_node(seq);
				});

				loadOBSTreeSetReceive("#ajax_ReceiveGrp",$("#osq_setReceiveGrp"),$("#ohq_setReceiveGrp"));
				$('#modal_setReceiveGrp').localize();
				$('#modal_setReceiveGrp').modal('show', {backdrop: 'static'});
				moveScrollTop(0);

				return;
			},
			error:function(data){
				alert("err//"+data.message);
				$('#modal_setReceiveGrp').modal('hide');
			}
		});
	});
});


	//수신그룹 OBS트리
	function loadOBSTreeSetReceive(obj,sq,fq){
		//console.log('approvalReceiveGrp.js');
		 $(obj).on("select_node.jstree", function (e, data) {

				if(data.selected.length) {
					/* 한개 선택하는 방식일때 사용 */
					node_id	     = data.instance.get_node(data.selected[0]).id;
					P_node_id	 = data.instance.get_node(data.selected[0]).parent;
					node_nm	     = data.instance.get_node(data.selected[0]).text;

					a_attr		     = data.instance.get_node(data.selected[0]).a_attr;
					type		     = a_attr.T;
					FullName	     = a_attr.Fnm;

					$(obj).jstree().select_node(node_id);
					$("#setRecTreeFullName").val(FullName);
					//console.log("Fnm="+$("#setRecTreeFullName").val());

					if(jQuery("#chkSwitch_filedHQ_Rec").is(":checked"))
					{
						sq.val(node_id);
						$("#ock_rec").val("fl");
					}
					else
					{
						fq.val(node_id);
						$("#ock_rec").val("hq");
					}

					receiveListArray = new Array();
					receiveValueArray = new Array();
					receiveTextArray = new Array();
					receiveTitleArray = new Array();

					 if (tuserList_setReceiveGrp != null)
					 {
						tuserList_setReceiveGrp.ajax.reload(function(j){
							$('#userList_setReceiveGrp tbody tr').each( function() {
								if (j.recordsTotal>0)
								{
									var nTds = $('td', this);
									var idx = parseInt($(nTds[0]).text());
									var totCnt = j.recordsTotal;
									var toolTip = j.data[(totCnt-idx)][9];
									var strID = j.data[(totCnt-idx)][1];
									var obsID = $("#osq_setReceiveGrp").val();
									this.setAttribute( 'title', toolTip );
									this.setAttribute( 'id', "id_"+ strID+"_"+obsID);
								}
							});
							for (i=0;i<receiveGetObjArray.length ;i++ )
							{
								$("#"+receiveGetObjArray[i]).click();
							}
						});
					 }

				}else{
					//null data
				}
			}).
			jstree({
				'core' : {
					//'multiple' : true,  //다중선택여부
					'check_callback': true, //add, rename, Del를 적용여부
					"themes" : { "stripes" : true }, //격자배경
					'data' : {
					//"url" : "/module/sysModule/obs/obs.do",
						//"url": "/module/usermodule/approval/common/getObsTree.do",
						"url": "/module/usermodule/approval/common/getObsTree",
						"type":"post",
						"data" : {"ock":function () {
									return $("#ock_rec").val();
									},"recG":function () {
									return $("#recG").val();
									}
						},
						"dataType" : "json" // needed only if you do not supply JSON headers
					}
				},
				"checkbox" : {three_state: false},
				//검색 , 선택배경반전, 체크박스
				"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
			});

		$(obj).on("loaded.jstree", function (e, data) { //first loading

			if(jQuery("#chkSwitch_filedHQ_Rec").is(":checked"))
			{
				$(obj).jstree().select_node($("#osq_setReceiveGrp").val());
				$("#ock_rec").val("fl");
			}
			else
			{
				$(obj).jstree().select_node($("#ohq_setReceiveGrp").val());
				$("#ock_rec").val("hq");
			}

			loadUserDataTableSetAppReceiveGrp();


			receiveListArray = new Array();
			receiveValueArray = new Array();
			receiveTextArray = new Array();
			receiveTitleArray = new Array();
			if (!isMobile)//pc tree height
			{
				//$(this).height(cHeight-200);
			}
		});
	}

	function loadUserDataTableSetAppReceiveGrp(){
		console.log ('approvalReceiveGrp.js  loadUserDataTableSetAppReceiveGrp.............');

		var tUserLoad1_Id = "#userList_setReceiveGrp";
		// Setting datatable defaults
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,
			//"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
			"dom": '<"datatable-header"fBl><"datatable-scroll"t>',
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

		tuserList_setReceiveGrp = $(tUserLoad1_Id).DataTable({
			 "processing" : true
			,"serverSide" : true
			//,"scrollY":    "35vh"
			//,"scrollCollapse": true
			,"bAutoWidth": true
			,"sScrollY": "300px"
			,"paging":         false
			,"ajax" : {
				//"url" :"/module/usermodule/approval/common/setAppViewAuthUserList.do"
				"url" :"/module/usermodule/approval/common/setAppViewAuthUserList"
				,"type" : "post"
				,"data" : function ( d ) {
							d.osq = $("#osq_setReceiveGrp").val();
							d.ohq = $("#ohq_setReceiveGrp").val();
							d.ock = $("#ock_rec").val();
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
					"width" : "240px",
					"className" : "dt-center"
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
				$('#userList_setReceiveGrp_wrapper').localize();
			}
			,"buttons":[]
			, "initComplete" : function(s,j){
				$('#userList_setReceiveGrp tbody tr').each( function() {
					if (j.recordsTotal>0)
					{
						var nTds = $('td', this);
						var idx = parseInt($(nTds[0]).text());
						var totCnt = j.recordsTotal;
						var toolTip = j.data[(totCnt-idx)][9];
						var strID = j.data[(totCnt-idx)][1];
						var obsID = $("#osq_setReceiveGrp").val();

						this.setAttribute( 'title', toolTip );
						this.setAttribute( 'id', "id_"+ strID+"_"+obsID);
					}
				});

				for (i=0;i<receiveGetObjArray.length ;i++ )
				{
					$("#"+receiveGetObjArray[i]).click();
				}
			}
		});

		if(!isMobile){
			event_kind="click"
		}else{
			event_kind="click"
		}

		$(tUserLoad1_Id+' tbody').on(event_kind , 'tr', function () {
			clickUserList3($(this));
		});

		tuserList_setReceiveGrp.on( 'page.dt', function () {
			moveScrollTop($(tUserLoad1_Id).offset().top)
		});
		tuserList_setReceiveGrp.on( 'order.dt', function (s,j) {
			$('#userList_setReceiveGrp tbody tr').each( function() {
				if (j._iRecordsTotal>0)
				{
					var nTds = $('td', this);
					var idx = parseInt($(nTds[0]).text());
					var totCnt = j._iRecordsTotal;
					var toolTip = j.aoData[(totCnt-idx)]._aData[9];
					var obsID = $("#osq_setReceiveGrp").val();
					this.setAttribute( 'title', toolTip );
					this.setAttribute( 'id', "id_"+ j.aoData[(totCnt-idx)]._aData[1]+"_"+obsID);

				}
			});

			for (i=0;i<receiveListArray.length ;i++ )
			{
				$("#"+receiveListArray[i]).addClass('success');
			}
		});

		$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");
	 }



	function clickUserList3(obj){
		var obsSeqNo="";
		var name="";
		var partNm="";
		var obsCode="";
		var obsNm="";
		var Position_Nm="";
		var userId="";
		var textVal="";
		var valueVal="";
		var obsKind="";
		var strString = "";

		obsSeqNo	= tuserList_setReceiveGrp.row(obj).data()[1];
		name		= tuserList_setReceiveGrp.row(obj).data()[2];
		obsCode		= tuserList_setReceiveGrp.row(obj).data()[3];
		partNm		= tuserList_setReceiveGrp.row(obj).data()[4];
		userId		= tuserList_setReceiveGrp.row(obj).data()[5];
		obsNm		= tuserList_setReceiveGrp.row(obj).data()[6];
		Position_Nm	= tuserList_setReceiveGrp.row(obj).data()[7];
		obsKind		= tuserList_setReceiveGrp.row(obj).data()[8];
		strString	= tuserList_setReceiveGrp.row(obj).data()[9] + ":" + obsSeqNo;

		textVal = name + ":" + obsSeqNo;
		valueVal = userId + "_" + obsNm + "_" + obsCode + "_" + obsKind + "_" + obsSeqNo + ":" + obsSeqNo;

		obj.toggleClass('success');
		arrayPushPop(receiveListArray,obj.attr("id"));
		arrayPushPop(receiveTextArray,textVal);
		arrayPushPop(receiveValueArray,valueVal);
		arrayPushPop(receiveTitleArray,strString);
	}
