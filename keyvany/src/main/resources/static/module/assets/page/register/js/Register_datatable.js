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

			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/SysModule/Register/List.do"
					"url" :"/module/sysmodule/register/list"
					,"type" : "post"
				}
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
					//	"width" : "60px",
						"targets": [0],
						"orderable": false,
						"className" : "dt-center"
					}, { // chk box
					//	"width" : "60px",
						"className" : "dt-center",
						"targets": [1],
						"orderable": false,
						"searchable": false


					},{ // Idx
					//	"width" : "0px",
						"targets": [2],
						"visible": false,
						"searchable": false

					}, {
						"targets": [3],
						//"width" : "120px"
						"className" : "FixColnum dt-head-center dt-body-left"
					}, {
						"targets": [4],

						"className" : "dt-center"

					} , {
						"targets": [5],
						"className" : "dt-center"
						//,"width" : "100px"
					}  , {
						"targets": [6],

						"className" : "dt-center"
						//,						"width" : "120px"
					}  , {
						"targets": [7],
						"className" : "dt-center"
						//,						"width" : "120px"
					}  , {
						"targets": [8],
						"visible": false,
						"className" : "dt-center"
						//,						"width" : "120px"
					} , {
						"targets": [9],
						"visible": false,
						"searchable": false
					} , {
						"targets": [10],
						"visible": false,
						"searchable": false
					} , {
						"targets": [11],
						"visible": false,
						"searchable": false
					}
				]

				, "order": [ 7, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});



					//체크박스 생성
					t1.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						prop = "";
						prop = " data-idx='"+t1.column(2).nodes()[i].innerHTML+"'";

						cell.innerHTML = "<input type='checkbox' name='userBox' class='cbox' "+ prop +"'>";
					});


					t1.column(3, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

						cell.innerHTML = "<span>"+ cell.innerHTML+"</span>";
					});


					fn_boxInit();

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}
				//커스텀 버튼(우측 상단)
				,"buttons":[
					{
						"text": '<i class="icon-reset position-left"></i> <span data-i18n="common:btn.reset"></span>',
						"className": 'btn btn-success btn-icon btn-reset btn-default btn-xs '
					}
				]

			});


			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				//row 클릭시 체크박스 클릭 이벤트
				try{
					$(this).parent().find("input").trigger("click");
					//첫번째 컬럼(Seq)이 아닌경우에만 view load
					if(!$(this).hasClass("notMove")){
						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');

						$("#uCompanyName").val(t1.row( $(this).parent() ).data()[3]);
						$("#uName").val(t1.row( $(this).parent() ).data()[4]);
						$("#uPart").val(t1.row( $(this).parent() ).data()[5]);
						$("#uId").val(t1.row( $(this).parent() ).data()[11]);
						$("#uPosition").val(t1.row( $(this).parent() ).data()[8]);
						$("#uEmail").val(t1.row( $(this).parent() ).data()[9]);
						$("#uMobilePhone").val(t1.row( $(this).parent() ).data()[10]);
					}
				}catch(e){};
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
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]common:datatable.option.filter");

			// 그리드 상단 페이징 버튼 처리
			$('.dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});

			// ------------------------------------------------------------------------------------------

 }


//DataGrid에서 사용
function fn_boxInit(){

	try{
		//체크박스 해제
		$("#mstUserBox").prop("checked",false);
		//배열에 값 있는지 체크

		$(userArr).each(function(index, aData){
			$("INPUT[NAME=userBox]").each(function(j,item){
				if(aData==$(item).data("idx")){
					$(item).prop("checked",true);
				}
			})
		});
	}catch(e){}
}