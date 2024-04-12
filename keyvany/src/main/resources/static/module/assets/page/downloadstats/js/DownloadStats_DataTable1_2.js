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
var t1_2;

var t1_2_Id = "#dataList1_2";


function makeDataTable1_2(){
	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header t1_2"l><"datatable-scroll"t><"datatable-footer"ip>',
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

			var txt = "";
			t1_2 = $(t1_2_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					"url" :"/module/sysmodule/downloadstats/tab1_2"
					//"url" :"/module/SysModule/DownloadStats/tab1-2.do"
					,"type" : "post"
					,"data" : function (d) {
						d.sDate = $("#f_sDate").val();
						d.eDate = $("#f_eDate").val();
						d.kind = "V";
						d.tab1FSeq = $("#tab1FSeq").val();
						d.tab1MSeq = $("#tab1MSeq").val();
					 }
				}
				,"pagingType": "simple"

				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						"width" : "60px",
						"targets": [colIdx++],
						"orderable": false,
						"className" : "dt-center" ,
						"searchable": false
					}, {
						"targets": [colIdx++],
						"width" : "120px",
						"className" : "dt-center"
					}, {
						"targets": [colIdx++],
						"className" : "dt-center"
					}

				]

				, "order": [ 1, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1_2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});


					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_2_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});


			$(t1_2_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
						$selRow = ( t1_2.row( $(this).parent()) );

						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');

				}

			});

			$("div.t1_2").html("<span class='tb-header' data-i18n='DownloadStats:label.viewHistory'></span>"+$("div.t1_2").html());

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

 }


