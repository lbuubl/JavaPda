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
var t1_Id = "#dataList";

var $selRow = null;
var clickFlag = true;
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
						$("#selectContract").val( $selRow.data()[1] );
						$("#selectRequest").val("");
						$("#selectDeposit").val("");
						selectGonggu = $selRow.data()[4];


						//row 선택 효과 적용
						//$(t1_Id+' tbody tr')[0].siblings().removeClass('selected');
						$($(t1_Id+' tbody tr')[0]).addClass('selected');
						clickFlag = false;
						tableResize();
						getList2();
						getList3();
					}

				}catch(e){}
			}).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/UserModule/paymentMng/List1.do"
					"url" :"/module/usermodule/paymentmng/list1"
					,"type" : "post"
					,"data" : function(d){
						d.searchStat = $("#searchStat").val();
						d.searchSDate = $("#searchSDate").val();
						d.searchEDate = $("#searchEDate").val();
						d.searchKey= $("#searchKey").val();

					}
				}
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						//"width" : "60px",
						"targets": [colIdx++],
						"orderable": false,
						"className" : "dt-center"
					}, { // Idx
						//"width" : "0px",
						"targets": [colIdx++],
						"visible": false,
						"searchable": false

					}, {
						"targets": [colIdx++],
						//"width" : "80px",
						"className" : " FixColnum dt-head-center dt-body-left"
					}, {
						"targets": [colIdx++],
						"className" : "dt-head-center dt-body-right "
					},  { // mc
						//"width" : "0px",
						"targets": [colIdx++],
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

							t1.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
								cell.innerHTML = numberWithCommas(cell.innerHTML);
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

				]//로드 완료 이벤트
				,"initComplete": function(settings, json) {
					/*
								$("#dataList tbody tr:first").addClass('selected');
								move_item = $("#dataList .selected");
								$selRow =  t1.row(move_item) ;
								$("#selectContract").val( $selRow.data()[1] );
								//contentLoad();
*/
								//목록수 조정 하단이동 추가
								/*
								listSize=$("#dataList_info");
								$("#dataList_length").insertBefore(listSize);
								*/
				}

			});


			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
					try{
						$selRow = ( t1.row( $(this).parent()) );

						var _seq =null;

						if(Array.isArray($selRow.data() )){
							_seq = $selRow.data()[1]
							selectGonggu = $selRow.data()[4]

						}
						$("#selectContract").val( _seq);
						$("#selectRequest").val("");
						$("#selectDeposit").val("");

						getList2();
						getList3();

						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');
					}catch(e){}
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

 }
