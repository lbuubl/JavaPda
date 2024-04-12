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

var clickFlag = true;
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
			},
			"drawCallback": function () {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
			},
			"preDrawCallback": function() {
				$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
			}


		});
	// ------------------------------------------------------------
	// show list 설정
	var lengthMenu ;
	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 240
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}
	// Table setup

			t1 = $(t1_Id).on( 'init.dt', function () {
				try{
					//처음 로딩시 첫번째 로우 선택하도록
					if(clickFlag){

						$selRow = ( t1.row( $(t1_Id+' tbody tr')[0]) );
						$("#seq").val($selRow.data()[1]);
						$("#dmlType").val("view");
						viewLoad();

						clickFlag = false;
					}
				}catch(e){}
			}).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/UserModule/cctv/List.do"
					"url" :"/module/usermodule/cctv/list"
					,"type" : "post"
				}
				,"pagingType": "simple"
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						//"width" : "60px",
						"targets": [0],
						"orderable": false,
						"className" : "dt-center"
					}, { // Idx
						"width" : "0px",
						"targets": [1],
						"visible": false,
						"searchable": false

					}, {
						"targets": [2],
						//"width" : "120px"
						"className" : "dt-center FixColnum"
					}, {
						"targets": [3],
						"className" : "dt-center FixColnum"

					} , {
						"targets": [4],
						"className" : "dt-center"

					}  , {
						"targets": [5],
						"orderable": false,
						"className" : "dt-center "

					}   , {
						"targets": [6],
						"visible": false,
						"className" : "dt-center "
					}    , {
						"targets": [7],
						"visible": false,
						"className" : "dt-center "
					}
				]
				//커스텀 버튼(우측 상단)
				,"buttons":[
					{
						"text": '<i class="icon-plus3 position-left"></i> <span data-i18n="common:btn.append"></span>',
						"className": 'btn btn-success btn-icon btn-write btn-default btn-xs'
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

					t1.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = "<span>"+cell.innerHTML +"</span>";
					});

					t1.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = "<span>"+cell.innerHTML +"</span>";
					});


					var linkInfo = "";
					t1.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);

						if(cell.innerHTML != ""){
							linkInfo="<button data-i18n='common:btn.open' class='btn btn-primary btn-xs linkInfo' data-link='"+cell.innerHTML+"'></button>"
						}else{
							linkInfo=""
						}

						cell.innerHTML = linkInfo;
					});

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});


			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				try{
					//첫번째 컬럼(Seq)이 아닌경우에만 view load
					$selRow = ( t1.row( $(this).parent()) );
					$("#seq").val($selRow.data()[1]);
					$("#dmlType").val("view");
					viewLoad();


					var hData = {
						"data" : {
							"arr" : $selRow.data()
						}
					}
					SetHistory(hData, "viewLoad");

					//row 선택 효과 적용
					$(this).parent().addClass('selected');
					$(this).parent().siblings().removeClass('selected');
				}catch(e){}
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
			//버튼 삭제
			if(aa != "yes"){
				$(".btn-write").remove();

			}

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


