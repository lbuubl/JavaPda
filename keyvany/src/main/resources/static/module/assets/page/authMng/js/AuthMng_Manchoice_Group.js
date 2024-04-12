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
var manTbGroup;

var manTbGroup_Id = "#manGroupList";


function makeManGroupList(){

	//var callCmd = "/Module/SysModule/AuthMng/ManGroupList.do"
	var callCmd = "/module/sysmodule/authmng/manGroupList"

	var prop = "";
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
				"search": '<span class="grid-span" data-i18n="common:datatable.option.filter"></span> _INPUT_'
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

		manTbGroup = $(manTbGroup_Id).DataTable({

			 "processing" : true
			,"serverSide" : true
			,"ajax" : {
				"url" :callCmd
				,"type" : "post"
			}
			,"pagingType": "simple"
			,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

				//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
				{
					"width" : "50px",
					"targets": [0],
					"orderable": false,
					"className" : "dt-center"
				}, { // Idx
					"width" : "0px",
					"targets": [1],
					"visible": false,
					"searchable": false

				},{
					"width" : "50px",
					"targets": [2],
					"orderable": false,
					"className" : "dt-center notMove"
				}, {
					"targets": [3],
					"className" : "dt-center"
				}, {
					"targets": [4],
					"orderable": false,
					"className" : ""

				},  {
					"targets": [5],
					"orderable": false,
					"className" : "dt-center notMove"

				}
			]

			, "order": [ 3, "desc" ] //기본 정렬 역순 출력(필수)

			//데이터 로드 완료 후 실행할 이벤트(필수)
			, "infoCallback": function( settings, start, end, max, total, pre ) {
				//INDEX 역순 출력(필수)
				manTbGroup.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					cell.innerHTML = total-i-start+1;
				});

				//체크박스 생성
				manTbGroup.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					prop = ""
					prop = prop + " value='"+manTbGroup.column(1).nodes()[i].innerHTML+"'"
					cell.innerHTML = "<input type='checkbox' name='grpBox' class='gBox' "+ prop +"'>";
				});


				//체크박스 생성
				manTbGroup.column(5, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					//console.log(total,i,start+1);
					cell.innerHTML = '<button  type="button" class="btn btn-danger btn-xs grpDel" data-val="'+manTbGroup.column(1).nodes()[i].innerHTML+'"><i class="icon-trash"></i></button>';
				});

				//배열에 값 있는지 체크
				$("#mstGroupBox").prop("checked",false);
				$(manGroupArr).each(function(){
					$("INPUT[NAME=grpBox][VALUE="+this+"]").prop("checked",true);
				})

				var api = this.api();
				var pageInfo = api.page.info();

				//page load시 previeus, next 버튼 등 한국어 처리
				$(manTbGroup_Id+'_wrapper').localize();



				//리턴값 없는경우 좌측하단 데이터 정보 안나옴
				return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
			}
			//그리드 로드 후 한번만 실행
			, "initComplete": function(settings, json) {
				listSize=$("#manGroupList_info");
				$("#manGroupList_length").insertBefore(listSize);
			}
			//높이설정
			//,"scrollY":        "400px"
			//,"deferRender":    true
			//,"scroller":       true
		});



		$(manTbGroup_Id+' tbody').on("click" , 'tr td', function () {

			if(!$(this).hasClass("notMove")){
				//row 클릭시 체크박스 클릭 이벤트
				var $item = $(this).parent().find("input");
				$item.prop("checked",!$item.prop("checked"));

				if($item.prop("checked")){
					manGroupArr = util_ArrAdd(manGroupArr,$item.val());
				}else{
					manGroupArr = util_ArrRemove(manGroupArr,$item.val());
				}

				ms_GroupCheck();
			}

		});

		//자동검색 수동으로 변경
		$(manTbGroup_Id+"_filter input").unbind();
		$(manTbGroup_Id+"_filter input").keyup(function(e){
			if(e.keyCode==13){
				//console.log(this.value );
				manTbGroup.search( this.value ).draw();
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

 }


