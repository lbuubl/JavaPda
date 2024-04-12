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

var $selRow1 = null;
var t1_flag = true;


function makeDataTable(){



	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": ' <"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				"search": ' _INPUT_'
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



	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 280
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]

	}


	var idx = 0 ;

	// Table setup

	var btns = [];

	if(aAuth == "yes"){
		btns = [
					{
						"text": '<i class="icon-plus3 position-left"></i> <span data-i18n="common:btn.append"></span>',
						"className": 'btn btn-success btn-icon btn-write btn-default btn-xs addDtlModal'
					}
				]
	}
			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/data.do?callcmd=CODE_MNG_MList"
					//"url" :"/Module/userModule/expenseMng/gongguMstList.do"
					"url" :"/module/usermodule/expensemng/gonggumstlist"
					,"type" : "post"
					, "data" : function(d){
						d.searchYYYY = $(".searchYYYY").val();
						d.searchMM = $(".searchMM").val();
					}
				}
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					{
						//"width" : "70px",
						"targets": [idx++],
						"orderable": false ,
						"searchable": false ,
						"className" : "dt-center "

					}, {
						"targets": [idx++],
						"width" : "0px",
						"orderable": false ,
						"searchable": false ,
						"visible" : false
					}, {
						"targets": [idx++],
						"width" : "0px",
						"orderable": false ,
						"searchable": false ,
						"visible" : false
					}, {
						"targets": [idx++],
						"className" : "dt-center"
					}, {
						"targets": [idx++],
						"className" : "FixColnum dt-head-center dt-body-right"
					}, {
						//dt
						//"width" : "120px",
						"targets": [idx++] ,
						"className" : "dt-center"
					}, {
						//nm
						//"width" : "100px",
						"targets": [idx++]  ,
						"className" : "dt-center"

					} , {
						//file cnt
						//"width" : "50px",
						"targets": [idx++],
						"className" : "dt-center"
					} , {
						//m config

						"targets": [idx++],
						"orderable": false ,
						"searchable": false ,
						"visible" : false
					}  , {
						//yn

						"targets": [idx++],
						"orderable": false ,
						"searchable": false ,
						"visible" : false
					}

				]

				, "order": [ 2, "desc" ] //기본 정렬 역순 출력(필수)
				//커스텀 버튼(우측 상단)
				,"buttons":btns
				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});

					t1.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = "<span>"+numberWithCommas(cell.innerHTML)+"</span>";
					});

					var icon = '<i class="icon-floppy-disk"></i>';
					t1.column(7, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						//console.log(cell.innerHTML != "");

						if(cell.innerHTML != ""){
							cell.innerHTML = icon;
						}
					});



					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(t1_Id+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}

			});

			if(t1_flag){

				var buttons = "";
				buttons=buttons+"<span>";
				buttons=buttons+"<select class='searchYYYY'>";
				var d = new Date();
				for ( i = d.getFullYear() ; i > 2010 ; i-- ){
					buttons=buttons +"<option value='"+i+"'>"+i+"</option>";
				}
				buttons=buttons+"</select> ";


				buttons=buttons+"<select class='searchMM'>";

				var mm = "";

				var selected = ""

				for ( i = 12 ; i >= 1 ; i-- ){

					if(d.getMonth()+1 == i){
						selected = "selected";
					}else{
						selected = "";
					}
					if(i<10){
						mm="0"+i;
					}else{
						mm=i;
					}

					buttons=buttons +"<option "+selected+" value='"+mm+"'>"+mm+"</option>";
				}
				buttons=buttons+"</select> ";
				buttons=buttons+"</span>";


				$(t1_Id+"_filter").prepend(buttons);
				mm = d.getMonth()+1;



				//select change event bind
				$(document).on("change",".searchMM,.searchYYYY",function(e){

					t1.ajax.reload(null,false);
				})

				t1_flag = !t1_flag;


			}

			$(t1_Id+' tbody').on("click" , 'tr td', function () {
				if(!$(this).hasClass("notMove")){
						//게시글 load

						//blockUI load
						//BlockShow();

						$selRow1 = t1.row( $(this).parent());

						try{
							$("#mstSeq").val($selRow1.data()[1]);
							$("#mstFinishYn").val($selRow1.data()[9]);

							mainDtlList();
							var $item = $(this).parent().find("input");
							$item.prop("checked",!$item.prop("checked"));

							//row 선택 효과 적용
							$(this).parent().addClass('selected');
							$(this).parent().siblings().removeClass('selected');

							var hData = {
								"data" : {
									"mSeqIdx" : $("#mSeqIdx").val()
								}
							}
							//SetHistory(hData, "mLoad");
						}catch(e){}

				}

			});

			$(t1_Id+' tbody').on("dblclick" , 'tr td', function () {
				if(!$(this).hasClass("notMove")){

					$("#modal_dmlType").val("VIEW");
					$("#openType").val("EDIT");
					showDtlModal($("#mstSeq").val());


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
			$('.searchYYYY, .searchMM, .dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});


			// ------------------------------------------------------------------------------------------


 }
