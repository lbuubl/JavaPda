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
var t1_1;

var t1_1_Id = "#dataList1_1";

function makeDataTable1_1(){
	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header t1_1"l><"datatable-scroll"t><"datatable-footer"ip>',
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
			t1_1 = $(t1_1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					"url" :"/module/sysmodule/downloadstats/tab1_1"
					//"url" :"/module/SysModule/DownloadStats/tab1-1.do"
					,"type" : "post"
					,"data" : function (d) {
						d.sDate = $("#f_sDate").val();
						d.eDate = $("#f_eDate").val();
						d.keyword = $("#f_keyword").val();
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
					}, { // file Idx
						"targets": [colIdx++],
						"visible": false,
						"searchable": false

					}, {
						"targets": [colIdx++],
						"visible": false,
						"className" : "dt-center"
					}, {
						"targets": [colIdx++],
						"className" : "dt-left FixColnum"
						//,"render": $.fn.dataTable.render.ellipsis(25, true)
					} , {
						"targets": [colIdx++],
						"className" : "dt-center"

					} , {
						"targets": [colIdx++],

						"visible": false,
						"className" : "dt-center"

					} , {
						"targets": [colIdx++],
						//"width" : "50px",
						"className" : "dt-center"
					}  , {
						"targets": [colIdx++],
						//"width" : "50px",
						"className" : "dt-center"

					}

				]

				, "order": [ 3, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1_1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

						//툴팁 추가
						$(cell).parent().attr("title","메뉴명 : "+t1_1.row(i).data()[2] + "   작성자 : "+ t1_1.row(i).data()[5]);

						cell.innerHTML = total-i-start+1;
					});

				  	//INDEX 역순 출력(필수)
					t1_1.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

						cell.innerHTML = "<span>"+cell.innerHTML+"</span>";
					});

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_1_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});


			$(t1_1_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
						$selRow = ( t1_1.row( $(this).parent()) );
						$("#tab1FSeq").val($selRow.data()[1]);
						//$("#tab1MSeq").val($selRow.data()[8]);

						t1_2.ajax.reload();
						t1_3.ajax.reload();

						/*
						$("#select_Gonggu").val( $selRow.data()[1] );
						 contentLoad();

						 var hData = {
							"data" : {
								"gonggu" :  $selRow.data()[1]
							}
						}
						SetHistory(hData, "contentLoad");
						*/

						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');

				}

			});

			$("div.t1_1").html("<span class='tb-header' data-i18n='DownloadStats:label.fileList'></span>"+$("div.t1_1").html())

			//자동검색 수동으로 변경
			$(t1_1_Id+"_filter input").unbind();
			$(t1_1_Id+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					t1_1.search( this.value ).draw();
					$(this).blur();
				}
			});


			//페이지 이동시 이벤트 바인딩
			t1_1.on( 'page.dt', function () {
				//moveScrollTop($(t1_1_Id).offset().top)
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

 }
