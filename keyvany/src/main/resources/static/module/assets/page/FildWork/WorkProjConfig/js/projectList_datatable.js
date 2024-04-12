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
var t1_Id = "#datatable_projectList";


$(function(){


var $selRow = null;
var clickFlag = true;

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
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
			var colIdx = 0 ;

			var lengthMenu;
			var tmpHtml;

				fixwidth =270;

			// show list 설정
			if(isMobile){
				lengthMenu = [10,30,50,100]
			}else{
				var customMinus = 240
				var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
				lengthMenu = [customLen,30,50,100]
			}


			t1 = $(t1_Id).on( 'init.dt', function () {
				try{
					//처음 로딩시 첫번째 로우 선택하도록
					if(clickFlag){
						$selRow = ( t1.row( $(t1_Id+' tbody tr')[0]) );
						fn_loadEvalProConfigEdit($selRow.data()[1]);


						//row 선택 효과 적용
						$($(t1_Id+' tbody tr')[0]).addClass('selected');
						clickFlag = false;
					}
				}catch(e){}
			}).DataTable({
			//t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/UserModule/FildWork/WorkProjConfig/getProjectList.do"
					"url" :"/module/usermodule/fieldwork/workprojconfig/getprojectlist"
					,"type" : "post"
					,"data" : function(d){
						d.sch_Gonggu_Stat = $("#searchStat").val();
						d.sch_SDate = $("#sch_SDate").val();
						d.sch_EDate = $("#sch_EDate").val();
					}
				}
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{	//no
						"targets": [0],
						"orderable": false,
						"className" : "dt-center"
					}, { //Idx
						"targets": [1],
						"visible": false,
						"searchable": false
					}, { //프로젝트명
						"targets": [2],
						"sortable" : false,
						"className" : "FixColnum projectNm"
					}, { //상태
						"targets": [3],
						"className" : "dt-center",
						"sortable" : false
					},  { //시작일
						"targets": [4],
						"className" : "dt-center",
						"sortable" : false
					},  { //종료일
						"targets": [5],
						"className" : "dt-center",
						"sortable" : false
					},  { //정렬을 위한 빈 컬럼
						"targets": [6],
						"visible": false
					}

				]

				//, "order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

						//INDEX 역순 출력(필수)
						t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
							//console.log(total,i,start+1);
							cell.innerHTML = total-i-start+1;
						});

						var api = this.api();
						var pageInfo = api.page.info();

						//page load시 previeus, next 버튼 등 한국어 처리
						$(t1_Id+'_wrapper').localize();


						//리턴값 없는경우 좌측하단 데이터 정보 안나옴
						return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;

				}

				//커스텀 버튼(우측 상단)
				,"buttons":[
					/*
					{	text: '<i class="icon-plus22 position-left"></i><span data-i18n="btn.write">등록</span>',
						className: 'btn btn-success btn-xs btnWorkReqWirte'
					}
					*/
				]
				//로드 완료 이벤트
				,"initComplete": function(settings, json) {
					listSize=$("#datatable_projectList_info");
					$("#datatable_projectList_length").insertBefore(listSize);


					$(t1_Id+"_filter").append($('#panel_p1 .searchStat'));
					$('#panel_p1 .searchStat').show();

					$(t1_Id+"_filter").append($('#panel_p1 .search-option-div'));
					$('#panel_p1 .search-option-div').show();



					/*
					$(t1_Id+"_filter").append($('#workReqListPanel .search-option-div'));
					$('#workReqListPanel .search-option-div').show();
					*/
				}

			});


			$(t1_Id+' tbody').on( 'click', 'tr', function () {
				//row 선택
				$(this).addClass('selected');
				$(this).siblings().removeClass('selected');

				if(!$(this).find("td:eq(0)").hasClass("dataTables_empty")){
					var sn = t1.row( $(this)).data()[1];
					if(sn != ""){
						fn_loadEvalProConfigEdit(sn)
					}
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


			//페이지 이동시 이벤트 바인딩
			t1.on( 'page.dt', function () {
				//moveScrollTop($(t1_Id).offset().top)
			});


			// 하단 부분 필수 적용
			// ------------------------------------------------------------------------------------------

			// 데이터테이블 필터옵션 다국어 처리
			$(t1_Id+'_wrapper .dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

			// 그리드 상단 페이징 버튼 처리
			$(t1_Id+'_wrapper .dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});

			// ------------------------------------------------------------------------------------------


})

