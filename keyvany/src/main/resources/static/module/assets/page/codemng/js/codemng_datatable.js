/* ------------------------------------------------------------------------------
*
*  # Datatables data sources
*
*  Specific JS code additions for datatable_data_sources.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
*  사용시 index.page의 css 참고하기
* ---------------------------------------------------------------------------- */
var t1;
var t2;

var t1_Id = "#dataList";
var t1_Property="";

var t2_Id = "#dataList2";

var $selRow1 = null;
var $selRow2 = null;

var columnDefaultIdx;
var pLen;

var clickFlag = true;
var clickFlag2 = true;


var t1InitFlag = true;
var t2InitFlag = true;

function makeDataTable(){

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": '<span data-i18n="common:datatable.option.filter"></span> _INPUT_'
				//
				,"lengthMenu": '<span data-i18n="common:datatable.option.show"></span> _MENU_'
				//페이징 처리 옵션
				,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="common:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="common:datatable.option.next"></button>'}
			},
			"drawCallback": function () {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
			},
			"preDrawCallback": function() {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
			}


		});
	// ------------------------------------------------------------

	// Table setup

			t1 =  $(t1_Id).on( 'init.dt', function () {
				try{
					//처음 로딩시 첫번째 로우 선택하도록
					if(clickFlag){

						$selRow1 = t1.row($(t1_Id+' tbody tr')[0]);

						$("#mSeqIdx").val($selRow1.data()[1]);
						mLoad();

						//row 선택 효과 적용
						$(t1_Id+' tbody tr')[0].addClass('selected');
						$(t1_Id+' tbody tr')[0].removeClass('selected');

						clickFlag = false;
					}
				}catch(e){}
			}).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/SysModule/CodeMng/MstList.do"
					"url" :"/module/sysmodule/codemng/mstList"
					,"type" : "post"
				}
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						//"width" : "80px",
						"targets": [0],
						"orderable": false
						,"className" : "dt-center"
					}, {
						"width" : "0px",
						"targets": [1],
						"visible": false,
						"searchable": false

					}, {
						"targets": [2],
						//"width" : "120px"
						"className" : "dt-center FixColnum "
					}, {
						"targets": [3],
						"className" : "dt-center FixColnum"
					}, {
						"targets": [4],
						"visible": false,
						"searchable": false
					}, {
						//"width" : "120px",
						"targets": [5], // useAt
						"className" : "dt-center"
					}, {
						"targets": [6], // memo
						"visible": false,
						"searchable": false
					}
				]

				, "order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});

					//INDEX 역순 출력(필수)
					t1.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = "<span>"+cell.innerHTML+"</span>";
					});

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_Id+'_wrapper').localize();

					/*
					console.log("=======================")
					console.log(" Reload ")
					console.log("=======================")
					 */

					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}
				/* 데이터 확인용.
				//로드 완료 이벤트
				,"initComplete": function(settings, json) {
						alert('initComplete');
						console.log('settings : '+JSON.stringify(settings));
						console.log('json : '+JSON.stringify(json) );
				}
				*/

			});



			$(t1_Id+' tbody').on("click" , 'tr td', function (e) {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load

				if(!$(this).hasClass("notMove")){
						//게시글 load

						//blockUI load
						//BlockShow();

						$selRow1 = t1.row( $(this).parent());

						$("#mSeqIdx").val( t1.row( $(this).parent() ).data()[1]);
						mLoad();

						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');



						var hData = {
							"data" : {
								"mSeqIdx" : $("#mSeqIdx").val()
							}
						}
						SetHistory(hData, "mLoad");


				}

			});

			//자동검색 수동으로 변경
			$(t1_Id+"_filter input").unbind();
			$(t1_Id+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					t1.search( this.value ).draw();
					$(this).blur();
				}
			});

			// 하단 부분 필수 적용
			// ------------------------------------------------------------------------------------------

			// 데이터테이블 필터옵션 다국어 처리
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

			// 그리드 상단 페이징 버튼 처리
			$('.dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});

			// ------------------------------------------------------------------------------------------

			//처음 로딩시 테이블 2 로드

			makeDataTable2();
 }


function makeDataTable2(){


		//플래그 초기화
		//clickFlag2 = true;
		$("#sSeqIdx").val("");
		sCancelLoad();

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": '<span data-i18n="common:datatable.option.filter"></span> _INPUT_'
				//
				,"lengthMenu": '<span data-i18n="common:datatable.option.show"></span> _MENU_'
				//페이징 처리 옵션
				,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="common:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="common:datatable.option.next"></button>'}
			},
			"drawCallback": function () {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
			},
			"preDrawCallback": function() {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
			}


		});
	// ------------------------------------------------------------

	// Table setup
			// ------------------------------


			//커스텀 변수들..
			var t1_P = t1_Property.split(","); // 프로퍼티
			pLen = t1_Property.split(",").length; // 프로퍼티 길이
			var pTmp = "";
			//console.log(t1_P);
			//console.log(pLen);

			//값이 없는 경우 예외처리
			if(t1_P[0] == "" ){
				pLen = 0;
			};

			columnDefaultIdx = 5;
			var columnMaxIdx = columnDefaultIdx+7

			var columnDef = [
					{
						"width" : "80px",
						"targets": [0],
						"orderable": false
						,"className" : "dt-center"
					}, {
						"width" : "0px",
						"targets": [1],
						"visible": false,
						"searchable": false

					} , {
						//"title": i18next.t("codeMng:label.code"),
						"targets": [2],
						"width" : "120px"
						,"className" : "dt-center"
					}, {
						//"title": i18next.t("codeMng:label.codeNm"),
						"targets": [3],
						"className" : "dt-center"
					}, {
						"width" : "120px",
						//"title": i18next.t("codeMng:label.codeNm"),
						"targets": [4],
						"className" : "dt-center",
						"visible": true,
						"searchable": true
					}
			];

			//console.log(columnDef);

			var cFlag = true;
			var cTitle = "";

			var tmpHtml = "";
			//detailForm 초기화
			$("#detailForm").html("");

			var opt = "";
			var lNm = "";
			//동적 html 생성
			for(var i=1 ; i<= pLen ; i++){
				//console.log( i<= pLen);
				if(t1_P[i-1].indexOf("@@") > 0){
					opt = "val-check='1'";
					lNm = "*"+t1_P[i-1].replace("@@","");
				}else{
					opt = "";
					lNm = t1_P[i-1];

				}
				tmpHtml = tmpHtml + "<div class='content-group'> ";
				tmpHtml = tmpHtml + "<label class=' control-label text-semibold' >"+lNm+"</label>";
				tmpHtml = tmpHtml + "<div>";
				tmpHtml = tmpHtml + "<input type='text'class='form-control' readonly name='p"+i+"' "+opt+" placeholder='"+t1_P[i-1].replace("@@","")+"'/>"
				tmpHtml = tmpHtml + "</div>";
				tmpHtml = tmpHtml + "</div>";
			}
			$("#detailForm").append(tmpHtml);


			//columnDefs 데이터 설정
			for(var i=columnDefaultIdx ; i< columnMaxIdx ; i++){
				//console.log((i < columnDefaultIdx + pLen ) , i ,columnDefaultIdx + pLen  );
				//console.log(i < columnDefaultIdx + pLen) ;
				if(i < columnDefaultIdx + pLen  ){
					//console.log(t1_P[i-columnDefaultIdx], i-columnDefaultIdx);
					cFlag = true;
					//validation 옵션 체크

					cTitle = t1_P[i-columnDefaultIdx].replace("@@","");


				}else{
					cFlag = false;
					cTitle = "";
				}

				columnDef.push ({
					"title" : cTitle,
					"targets": [i],
					"visible": cFlag,
					"searchable": cFlag,
					"className" : "dt-center"

				});

			}


			//console.log(columnDef);
			t2 = $(t2_Id).on( 'init.dt', function () {
				try{
					//처음 로딩시 첫번째 로우 선택하도록
					if(clickFlag2==true){
						clickFlag2 = false;
						$selRow2 = t2.row($(t2_Id+' tbody tr')[0]);

						$("#sSeqIdx").val($selRow2.data()[1]);
						sLoad();

						//row 선택 효과 적용
						$(t2_Id+' tbody tr')[0].addClass('selected');
						$(t2_Id+' tbody tr')[0].removeClass('selected');


					}
				}catch(e){}
			}).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" : "/Module/SysModule/CodeMng/DetailList.do?mSeqIdx="+$("#mSeqIdx").val()
					//"url" : "/Module/SysModule/CodeMng/DetailList.do"
					"url" : "/module/sysmodule/codemng/detailList"
					,"type" : "post"
					,"data" : function(d){
						//alert(' mSeqIdx' +$("#mSeqIdx").val() ) ;
						d.mSeqIdx =  $("#mSeqIdx").val()
					}
				}

				,"pagingType": "simple"
				,"columnDefs": columnDef  //컬럼 옵션 : 사용자 기호에 맞게 수정

				,"destroy": true
				//keytable set
				, "order": [0, "desc"  ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t2_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});



			$(t2_Id+' tbody').unbind();
			$(t2_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load

				if(!$(this).hasClass("notMove")){
					//게시글 load


					//seqNo bind

					$selRow2 = t2.row( $(this).parent() );


					$("#sSeqIdx").val($selRow2.data()[1]);

					sLoad();
					var hData = {
						"data" : {
							"sSeq" : $selRow2.data()[1]
						}
					}
					SetHistory(hData, "sLoad");

					$(this).parent().addClass('selected');
					$(this).parent().siblings().removeClass('selected');

				}

			});


			//자동검색 수동으로 변경
			$(t2_Id+"_filter input").unbind();
			$(t2_Id+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					t2.search( this.value ).draw();
					$(this).blur();
				}
			});

			// 하단 부분 필수 적용
			// ------------------------------------------------------------------------------------------

			// 데이터테이블 필터옵션 다국어 처리
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

			// 그리드 상단 페이징 버튼 처리
			$('.dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});

			// ------------------------------------------------------------------------------------------


			$(t2_Id).localize();



 }

