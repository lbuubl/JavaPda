/* ------------------------------------------------------------------------------
*
*  # Datatables data sources
*
*  Specific JS code additions for datatable_data_sources.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */
var t2;
var t2_Id = "#dataList_allWorker";

function makeDataTable_allWorker(){
	// Table setup
	// ------------------------------

	// Setting datatable defaults
	$.extend( $.fn.dataTable.defaults, {
		autoWidth: false,
		dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		language: {
			//emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
			emptyTable: '데이터가 없습니다',
			zeroRecords: "데이터가 없습니다",
			search: '<span data-i18n="manpower:datatable.option.filter"></span> _INPUT_',
			lengthMenu: '<span data-i18n="datatable.option.show"></span> _MENU_',
			paginate: { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="datatable.option.next"></button>'}
		},
		drawCallback: function () {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

			/*
			if(!$(t2_Id).parent().hasClass("table-responsive")){
				$(t2_Id).wrap("<div class='table-responsive'></div>");
			}
			*/
		},
		preDrawCallback: function() {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
		}
	});


	var lengthMenu;

	// show list 설정
	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 250;
		var customLen = parseInt(($(".page-container").height()-customMinus)/41)-1
		lengthMenu = [customLen,30,50,100]
	}


	t2 = $(t2_Id).DataTable({
		"processing" : true
		,"serverSide" : true
		,"deferLoading": 57		//최초에 자동 로딩 방지
		,"autoWidth": false
		,"fixedHeader": true
		,"paging": false
		,"scrollY": cHeight-307
//		,"scrollX": 150
		,"ajax": {
			//"url": "/Module/UserModule/Manpower/json/getDataTable_allWorker.do",
			"url": "/module/usermodule/manpower/getDataTableAllWorker",
			"data" : function (d) {
				d.sch_level		= $("#sch_w_level").val()		//등급
				d.sch_part		= $("#sch_w_part").val()		//분야
				d.sch_comGubun	= $("#sch_w_comGubun").val()	//본사/협력사
				d.sch_sDate		= $("#sch_w_sDate").val()		//투입가능 시작일
				d.sch_eDate		= $("#sch_w_eDate").val()		//투입가능 종료일
			},
			"type": "POST"
		}
		,"lengthMenu": [lengthMenu, lengthMenu]
		,"pagingType": "simple"
		,"responsive": {
			details: {
				type: 'column',
				target: -1
			}
		}
		,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정
			{
				//0.번호
				"targets": [0],
				"width" : "50px",
				"orderable": false,
				"className" : "dt-center notMove "
			},{
				//1.SeqNo
				"targets": [1],
				"width" : "0px",
				"visible": false,
			},{
				//2.이름
				"targets": [2],
				//"width": "100px",
				"orderable": true,
				"className" : "dt-center dragUser"
			},{
				//3.등급
				"targets": [3],
				"width": "100px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//4.분야
				"targets": [4],
			    "width": "100px",
				"orderable": true,
				"className" : "dt-center"
			},{
				//5.계획
				"targets": [5],
			    "width": "165px",
				"orderable": false,
				"className" : "curP"
			},{
				//6.실적
				"targets": [6],
			    "width": "165px",
				"orderable": false,
				"className" : "curP"
			},{
				//7.외부입력여부
				"targets": [7],
				"width": "0px",
				"visible": false
			},{
				//8.업체명
				"targets": [8],
				"width": "0px",
				"visible": false
			}
		]
		//,keys: true
		,keys: {
			focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
		}

		,"order": [ 2, "asc" ] //기본 정렬 역순 출력(필수)
		,"infoCallback": function( settings, start, end, max, total, pre ) {


			if (t2 != undefined){
				//드레그앤드랍 초기화
				initDragNDrop();

				//사용자정보 툴팁 초기화
				fn_initUserTooltip("#dataList_allWorker .dragUser");

				//협력업체 인원 bg 변경
				t2.column(7).nodes().each(function (node, index, dt) {
					if($(node).html() == "1"){
						$(t2.row(index).node()).addClass("bg-corpWorker");
					}
				});

				t2.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

					//console.log("$(cell).closest('tr').index()", $(cell).closest("tr").index());
					//console.log("row", t2.row($(cell).closest("tr").index()).data()[8]);

					var corpNm = t2.row($(cell).closest("tr").index()).data()[8];

					cell.title = corpNm;
				});


				//page load시 previeus, next 버튼 등 한국어 처리
				$('.dataTables_wrapper').localize();

				var api = this.api();
				var pageInfo = api.page.info();


				//리턴값 없는경우 좌측하단 데이터 정보 안나옴
				//return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
			}
		}
		,"initComplete": function( settings, json ) {

			//목록수 조정 하단이동 추가
			/*
			listSize=$("#dataList_corpWoker_info");
			$("#dataList_corpWoker_length").insertBefore(listSize);
			*/

			$(t2_Id+"_filter").append($('#sch_w_level'));
			$(t2_Id+"_filter").append($('#sch_w_part'));
			$(t2_Id+"_filter").append($('#sch_w_comGubun'));
			$(t2_Id+"_filter").append($('#sch_w_date'));

			$('#sch_w_level, #sch_w_part, #sch_w_comGubun, #sch_w_sDate, #sch_w_eDate').on("change", function(){
				t2.ajax.reload(false);
			});

			//미정 등록할수 있도록 row 추가
			var html = "";
			html += "<table width='100%' id='table_notFixedMan'>"
			html += "	<tr class='bg-notFixedMan'>"
			html += "		<td class='dragDummyUser' width='124' height='40' align='center'>미정</td>"
			html += "		<td width='92' align='center'><select id='tm_level' class='form-control no-padding-left no-padding-right' style='width:86px !important;'></select></td>"	//등급
			html += "		<td width='87' align='center'><select id='tm_part' class='form-control no-padding-left no-padding-right' style='width:81px !important'></select></td>"	//분야
			html += "		<td align='center'><select id='tm_corpNm' class='form-control' style='width:368px !important'></select></td>"			//업체명
			html += "	</tr>"
			html += "</table>"
			$(".dataTables_scrollHead").after(html)

			//var $options = $("#sch_w_level > option").clone();
			$('#tm_level').append($("#sch_w_level > option").clone());
			$('#tm_part').append($("#sch_w_part > option").clone());
			$('#tm_corpNm').append($("#sch_w_corpNm > option").clone());

		}
		,"createdRow": function( row, data, dataIndex ) {
			var userSn			= data[1];
			var userNM			= data[2];
			var corpWorkerYn	= data[7];
			var corpNm			= data[8];


			var TD_Name = $(row).find('td:eq(1)')
			TD_Name.attr('userSn', userSn)
			TD_Name.attr('corpWorkerYn', corpWorkerYn)
			//TD_Name.attr('title', corpNm)

		}
		,"buttons":[
		]
	});

	//자동검색 수동으로 변경
	$(t2_Id+"_filter input").unbind();
	$(t2_Id+"_filter input").keyup(function(e){

		if(e.keyCode==13){
			t2.search( this.value ).draw();
			this.blur();
		}
	});

	// 데이터테이블 필터옵션 다국어 처리
	$(t2_Id+'_filter input[type=search]').attr('data-i18n',"[placeholder]manpower:datatable.option.name");

	//row 클릭시 실행
	/*
	$(t2_Id+' tbody').on( 'click', 'td', function () {

		if(!$(this).hasClass("dataTables_empty")){

			var sn = t2.row($(this)).data()[1];

		}
	});
	*/



	// External table additions (필수)
	// ------------------------------

	// Enable Select2 select for the length option
	$('.dataTables_length select').select2({
		minimumResultsForSearch: Infinity,
		width: 'auto'
	});



	//권한에 따른 글쓰기 버튼 숨기기
	if(aa!="yes"){
		//$("#datatable_task_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
		$("#docListPanel .btn_docWrite").hide();
	}


}