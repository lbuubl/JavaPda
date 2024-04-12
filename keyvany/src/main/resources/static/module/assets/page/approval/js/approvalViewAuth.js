/* ------------------------------------------------------------------------------
*
 전자결재 공통 열람권한설정
*
* ---------------------------------------------------------------------------- */

$(document).ready(function(){

	//열람권한자 추가 버튼클릭
	$(document).on("click","#btn_choice_setAppViewAuth",function(w){
		var sObj = document.all.setAppViewAuthSelectBox;
		addAuthValue = new Array();
		addAuthText = new Array();
		addAuthTitle = new Array();
		for (i=0;i<sObj.length ;i++ )
		{
			addAuthValue[i]=sObj.options[i].value;
			addAuthText[i]=sObj.options[i].text;
			addAuthTitle[i]=sObj.options[i].title;
		}
		var lp=0
		while (userListValueArray2.length>0)
		{
			var len=sObj.length;
			if (len < 0)
			{
				len=0;
			}
			if (!chkArrayValue(addAuthValue,userListValueArray2[0].split(":")[0])) //배열에 중복값이 있는지 체크
			{
				addAuthValue.push(userListValueArray2[0].split(":")[0]);	//중복값이 없을때 삽입
				addAuthText.push(userListTextArray2[0].split(":")[0]);	//중복값이 없을때 삽입
				addAuthTitle.push(userListTitleArray2[0].split(":")[0]);	//중복값이 없을때 삽입
				sObj.options[len]=new Option (userListTextArray2[0].split(":")[0],userListValueArray2[0].split(":")[0]);
				sObj.options[len].title = userListTitleArray2[0].split(":")[0];
			}
			objArray2[0].parent().toggleClass('success');
			userListValueArray2.shift();
			userListTextArray2.shift();
			userListTitleArray2.shift();
			objArray2.shift();
			lp++;
		}
	});

	//열람권한그룹 추가 버튼클릭
	$(document).on("click","#btn_choice_setAppViewAuth_Grp",function(w){
		var sObj = document.all.setAppViewAuthSelectBox;
		var inValue="";
		var inText="";
		var inTitle="";
		var rootID = $("#ajax_setAppViewAuth").jstree('get_node', 'ul > li:first').id.toString();
		var node_id = $('#ajax_setAppViewAuth').jstree(true).get_selected(true)[0];//$("#ajax_setAppViewAuth").jstree('get_selected').toString();
		var userId, obsNm, obsCode, obsKind, obsSeqNo,Fnm
		obsNm =  node_id.text; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("text");
		userId = node_id.a_attr.oks; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("attr.oks");
		obsCode =  node_id.a_attr.ocd; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("attr.ocd");
		obsKind =  node_id.a_attr.T; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("attr.T");
		obsSeqNo =  node_id.a_attr.osq; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("attr.osq");
		Fnm =  node_id.a_attr.Fnm; //$("#ajax_setAppViewAuth").jstree('get_selected').attr("attr.osq");
		//console.log("userID="+userId);
		//inValue = userId + "_" + obsNm + "_" + obsCode + "_" + obsKind;
		inValue = node_id.id.toString() + "_" + obsNm + "_" + obsCode + "_" + obsKind;
		//console.log("inValue="+inValue);
		inText = obsNm;
		inTitle = Fnm;

		if (rootID==node_id.id.toString())
		{
			inTitle = i18next.t("approval:setting.label.all");
		}
		else
		{
			inTitle = $("#setAuthTreeFullName").val();
		}

		addAuthValue = new Array();
		addAuthText = new Array();
		addAuthTitle = new Array();
		//addAuth(userListValueArray2,userListTextArray2);
		for (i=0;i<sObj.length ;i++ )
		{
			addAuthValue[i]=sObj.options[i].value;
			addAuthText[i]=sObj.options[i].text;
			addAuthTitle[i]=sObj.options[i].title;
		}
		//for (i=0;i<userListValueArray2.length ;i++ )
		var len=sObj.length;
		if (len < 0)
		{
			len=0;
		}

		//userId + "_" + obsNm + "_" + obsCode + "_" + obsKind + ":" + obsSeqNo

		if (!chkArrayValue(addAuthValue,inValue)) //배열에 중복값이 있는지 체크
		{
			addAuthValue.push(inValue);	//중복값이 없을때 삽입
			addAuthText.push(inText);	//중복값이 없을때 삽입
			addAuthTitle.push(inTitle);	//중복값이 없을때 삽입
			sObj.options[len]=new Option (inText,inValue);
			sObj.options[len].title = inTitle;
		}
	});


	$(document).on("click","#setAppViewAuthback",function(e){ //열람자 지정창 닫기버튼
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
				$('#modal_setAppViewAuth').modal('hide');
			}
		});
	});

	$(document).on("click","#setAppViewAuthSave",function(e){ //열람권한 저장버튼
		var obj2 = document.all.setAppViewAuthSelectBox;
		var obj1 = document.all.viewAuthLine;
		for (i=obj1.length -1;i>=0 ;i-- )
		{
			obj1.options[i]=null;
		}
		for (i=0;i<obj2.length ;i++ )
		{
			obj1.options[i]=new Option(obj2.options[i].text,obj2.options[i].value);
			obj1.options[i].title=obj2.options[i].title;
		}

		swal({
			title: " ", //확인내용
			text: i18next.t("approval:msg.setAppViewAuthSave"),//returnMsg, //확인내용
			type: "success",
			showCancelButton: false,
			showConfirmButton:  false,
			timer:1000
		});
		$('#modal_setAppViewAuth').modal('hide');
	});


	//열람권한 삭제
	$(document).on("click","#setAppViewAuthSelectRemove",function(e){
		var obj = document.all.setAppViewAuthSelectBox;
		for (i=obj.length-1;i>=0 ;i-- )
		{
			if (obj.options[i].selected)
			{
				obj.options[i]=null;
			}
		}
	});



	$(document).on("click","#setAppViewAuth",function(e){//열람권한설정
		$.ajax({
			url:"/module/UserModule/approval/common/setAppViewAuth.page",  //열람권한 페이지 로드
			type:"POST",
			dataType:"html",
//			data:{ "sq": sq,"fq": fq},
			success:function(data){
				$('#modal_setAppViewAuth').html(data);
				$("#chkSwitch_filedHQ_input").attr("data-on-text",""+i18next.t("approval:workspace.label.Filed"));
				$("#chkSwitch_filedHQ_input").attr("data-off-text",""+i18next.t("approval:workspace.label.HQ"));
				var obj1 = document.all.setAppViewAuthSelectBox;
				var obj2 = document.all.viewAuthLine;
				if (obj2.length > 0)
				{
					for (i=obj1.length -1;i>=0 ;i-- )
					{
						obj1.options[i]=null;
					}
					for (i=0;i<obj2.length ;i++ )
					{
						obj1.options[i]=new Option(obj2.options[i].text,obj2.options[i].value);
						obj1.options[i].title=obj2.options[i].title;
					}
				}
				else
				{
					for (i=obj1.length -1;i>=0 ;i-- )
					{
						obj1.options[i]=null;
					}
				}
				$('#odal_addAppLine').localize();

				$(".switch").bootstrapSwitch();


				$('#chkSwitch_filedHQ_input').bootstrapSwitch('state', true);

				$('#chkSwitch_filedHQ_input').on('switchChange.bootstrapSwitch', function (event, state) {
					//loadOBSTreeSetAppViewAuth("#ajax_setAppViewAuth",$("#osq_setAppViewAuth"),$("#ohq_setAppViewAuth"));
					var chk = 'fl';
					var seq=null;
					userListValueArray2 = new Array();
					userListTextArray2 = new Array();
					userListTitleArray2 = new Array();
					objArray2 = new Array();
					if(jQuery("#chkSwitch_filedHQ_input").is(":checked")) {
						chk = 'fl';
						seq = $("#osq_setAppViewAuth").val();
					}
					else
					{
						chk = 'hq';
						seq = $("#ohq_setAppViewAuth").val();
					}
					$("#ock").val(chk);

					$('#ajax_setAppViewAuth').jstree("refresh");
					$('#ajax_setAppViewAuth').jstree().select_node(seq);

				});



				loadOBSTreeSetAppViewAuth("#ajax_setAppViewAuth",$("#osq_setAppViewAuth"),$("#ohq_setAppViewAuth"));
				//$("#ajax_setAppViewAuth").height(200);
				$('#modal_setAppViewAuth').localize();
				$('#modal_setAppViewAuth').modal('show', {backdrop: 'static'});
				moveScrollTop(0);

				return;
			},
			error:function(data){
				alert("err//"+data.message);
				$('#modal_setAppViewAuth').modal('hide');
			}
		});
	});
});


	//열람권한 OBS트리
	function loadOBSTreeSetAppViewAuth(obj,sq,fq){
		//console.log('approvalViewAuth.js');
		//var chkObj = document.all.chkSwitch_filedHQ;
		//osq_setAppViewAuth -현장일때 obs일련번호
		//ohq_setAppViewAuth -본사일때 obs일련번호

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
					$("#setAuthTreeFullName").val(FullName);

					if(jQuery("#chkSwitch_filedHQ_input").is(":checked"))
					{
						sq.val(node_id);
						$("#ock").val("fl");
					}
					else
					{
						fq.val(node_id);
						$("#ock").val("hq");
					}

					 //loadUserDataTable(node_id);
					 objArray2 = new Array();
					userListValueArray2 = new Array();
					userListTextArray2 = new Array();
					userListTitleArray2 = new Array();
					 if (tuserList_setAppViewAuth != null)
					 {
						//tuserList_setAppViewAuth.ajax.reload(null,false);
						tuserList_setAppViewAuth.ajax.reload(function(j){
							$('#userList_setAppViewAuth tbody tr').each( function() {
								if (j.recordsTotal>0)
								{
									var nTds = $('td', this);
									var idx = parseInt($(nTds[0]).text());
									var totCnt = j.recordsTotal;
									var toolTip = j.data[(totCnt-idx)][9];
									this.setAttribute( 'title', toolTip );
								}
							});
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

		$(obj).on("loaded.jstree", function (e, data) { //first loading

			if(jQuery("#chkSwitch_filedHQ_input").is(":checked"))
			{
				$(obj).jstree().select_node($("#osq_setAppViewAuth").val());
				$("#ock").val("fl");
			}
			else
			{
				$(obj).jstree().select_node($("#ohq_setAppViewAuth").val());
				$("#ock").val("hq");
			}

			loadUserDataTableSetAppViewAuth();
			objArray2 = new Array();
			userListValueArray2 = new Array();
			userListTextArray2 = new Array();
			userListTitleArray2 = new Array();
			if (!isMobile)//pc tree height
			{
				//$(this).height(cHeight-200);
			}
		});
	}

	function loadUserDataTableSetAppViewAuth(){
		console.log ('approvalViewAuth.js loadUserDataTableSetAppViewAuth.............');

		var tUserLoad1_Id = "#userList_setAppViewAuth";
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

		tuserList_setAppViewAuth = $(tUserLoad1_Id).DataTable({
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
							d.osq = $("#osq_setAppViewAuth").val();
							d.ohq = $("#ohq_setAppViewAuth").val();
							d.ock = $("#ock").val();
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
				} /*,{
					"width" : "0px",			//사용자 이름
					"targets": [8], //
					"searchable": false
				}*/
			]
			//keytable set
			,keys: {
				focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
			}

			, "order": [ 3, "asc" ] //기본 정렬 역순 출력(필수)
			//INDEX 역순 출력(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {
				$('#userList_setAppViewAuth_wrapper').localize();
			}
			,"buttons":[]
			, "initComplete" : function(s,j){
				$('#userList_setAppViewAuth tbody tr').each( function() {
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
			clickUserList2($(this));
		});

		tuserList_setAppViewAuth.on( 'page.dt', function () {
			moveScrollTop($(tUserLoad1_Id).offset().top)
		});
		tuserList_setAppViewAuth.on( 'order.dt', function (s,j) {
			$('#userList_setAppViewAuth tbody tr').each( function() {
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

		$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");

	 }



	function clickUserList2(obj){
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

		obsSeqNo	= tuserList_setAppViewAuth.row( obj.parent()).data()[1];
		name		= tuserList_setAppViewAuth.row( obj.parent()).data()[2];
		obsCode		= tuserList_setAppViewAuth.row( obj.parent()).data()[3];
		partNm		= tuserList_setAppViewAuth.row( obj.parent()).data()[4];
		userId		= tuserList_setAppViewAuth.row( obj.parent()).data()[5];
		obsNm		= tuserList_setAppViewAuth.row( obj.parent()).data()[6];
		Position_Nm	= tuserList_setAppViewAuth.row( obj.parent()).data()[7];
		obsKind		= tuserList_setAppViewAuth.row( obj.parent()).data()[8];
		strString	= tuserList_setAppViewAuth.row( obj.parent()).data()[9] + ":" + obsSeqNo;

		textVal = name + ":" + obsSeqNo;
		valueVal = userId + "_" + obsNm + "_" + obsCode + "_" + obsKind + ":" + obsSeqNo;

		obj.parent().toggleClass('success');
		arrayPushPop(userListArray2,obsSeqNo);
		arrayPushPop(userListTextArray2,textVal);
		arrayPushPop(userListValueArray2,valueVal);
		arrayPushPop(userListTitleArray2,strString);
		arrayPushPop(objArray2,obj);

	}
