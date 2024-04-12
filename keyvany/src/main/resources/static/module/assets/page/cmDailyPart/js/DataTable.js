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
*  양식리스트 컨트롤 소스
* ---------------------------------------------------------------------------- */
var t1;
var t1_Id = "#dataList";

var $selRow = null;

function makeDataTable(){

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
			}
		});
	// ------------------------------------------------------------

	// Table setup
			var colIdx = 0 ;
			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/UserModule/CmDailyPart/indexList.do",
					"url" :"/module/usermodule/cmdailypart/indexList",
					"type" : "post",
					"data": function ( d ) {
							d.CMDAILY_FORM_Seqno = cmFnc;
							d.ITEM_CALL_KIND = 2;
					}
				}
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						"width" : "60px",
						"targets": [colIdx++],
						"orderable": false,
						"className" : "dt-center"
					}, { // Idx
						"targets": [colIdx++],
						"visible": false,
						"searchable": false
					}, { //Report_Dt
						"targets": [colIdx++],
						"width" : "100px",
						"className" : "dt-center"
					} , { //Sum_part
						"targets": [colIdx++],
						"width" : "80px",
						"className" : "dt-center",
						"orderable": false
					} , { //weather
						"targets": [colIdx++],
						"width" : "120px",
						"className" : "dt-center",
						"orderable": false
					} , { //Worksumary
						"targets": [colIdx++],
						"className" : "dt-left",
						"orderable": false
					} , { //App_State
						"targets": [colIdx++],
						"width" : "90px",
						"className" : "dt-center",
						"orderable": false
					} , { //write _NM
						"targets": [colIdx++],
						"width" : "80px",
						"className" : "dt-center",
						"orderable": false
					} , { //app seqno
						"targets": [colIdx++],
						"orderable": false,
						"visible": false,
						"searchable": false
					}

				]

				, "order": [ 2, "desc" ] //기본 정렬 역순 출력(필수)

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

				//커스텀 버튼(양식추가)
				,"buttons":[
					{
						"text": '<i class="icon-plus3"></i> <span data-i18n="common:btn.append"></span>',
						"className": 'btn btn-success btn-icon btn-default btn-xs btn-DailyAdd'
					}
				]//로드 완료 이벤트
				,"initComplete": function(settings, json) {

								//목록수 조정 하단이동 추가
								listSize=$("#dataList_info");
								$("#dataList_length").insertBefore(listSize);

				}

			});


			$(t1_Id+' tbody').on("click" , 'tr td', function () {

				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("dataTables_empty")){
						$selRow = ( t1.row( $(this).parent()) );

						$.ajax({
								//"url" :"/Module/UserModule/CmDailyPart/CmDailyMoDal.page"
								"url" :"/module/usermodule/cmdailypart/cmdailymodal"
								,"type" : "POST"
								,"data": {
									"CMDAILY_FROM":cmFnc, "cmSeqNo": $selRow.data()[1]
								}
								,"success" : function(data){
									$("#CmDailyModal").html(data);

								},"error" : function(e){
									//console.log(e);
									showSwal("Error발생","error");
								}
						});


						 var hData = {
							"data" : {
								"fq" :  $selRow.data()[1]
							}
						}
						SetHistory(hData, "contentLoad");


						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');

				}
			});

			/*$(t1_Id+' tbody').on("dblclick" , 'tr td', function () {

				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("dataTables_empty")){
						$selRow = ( t1.row( $(this).parent()) );

						//양식템플릿 보기
						FormEdit($selRow.data()[1]);

						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');

				}
			}); */

			//자동검색 수동으로 변경
			$(t1_Id+"_filter input").unbind();
			$(t1_Id+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					t1.search( this.value ).draw();
					$(this).blur();
				}
			});

			// 데이터테이블 필터옵션 다국어 처리
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

			// 그리드 상단 페이징 버튼 처리
			$('.dataTables_length select').select2({
					minimumResultsForSearch: Infinity,
					containerCssClass: 'select-xs',
					width: 'auto'
			});

 }
