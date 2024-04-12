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
		btns = [ ]
	}
			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/data.do?callcmd=CODE_MNG_MList"
					//"url" :"/Module/userModule/expenseMng/CompanyMainList.do"
					"url" :"/module/usermodule/expensemng/companymainlist"
					,"type" : "post"
					, "data" : function(d){
						d.searchYYYY = $(".searchYYYY").val();
						d.searchMM = $(".searchMM").val();
						d.searchGonggu = $(".searchGonggu").val();
						d.searchStat = $(".searchStat").val();

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
					},  {
						"targets": [idx++],
						"className" : "dt-center FixColnum"
					}, {
						//dt
						//"width" : "120px",
						"targets": [idx++] ,
						"className" : "dt-center"
					}, {
						//"width" : "150px",
						"targets": [idx++],
						"className" : "dt-head-center dt-body-right"
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
						cell.innerHTML = "<span>"+cell.innerHTML+"</span>";
					});

					t1.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = numberWithCommas(cell.innerHTML);
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
				buttons=buttons+"<select class='searchStat'>";
				buttons=buttons+"<option data-i18n='expenseMng:label.stat' value='' ></option>";
				buttons=buttons+"<option data-i18n='expenseMng:label.progress' value='1'></option>";
				buttons=buttons+"<option data-i18n='expenseMng:label.end' value='0'></option>";
				buttons=buttons+"</select>";
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

				$.ajax({
					type: 'POST'

					//,url : "/module/usermodule/expensemng/companygonggulist.do"
					,url : "/module/usermodule/expensemng/companygonggulist"
					,async: false
					,success:function(data){
						$(t1_Id+"_filter").prepend(data);
					}
				})

				mm = d.getMonth()+1;


				$(t1_Id+"_filter").localize();
				//select change event bind
				$(document).on("change",".searchStat,.searchGonggu,.searchMM,.searchYYYY",function(e){
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
							$("#selectGonggu").val($selRow1.data()[1]);
							$("#selectDate").val($selRow1.data()[3])
							 loadDtlList();
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

			// select2
			$(' .searchGonggu, .searchYYYY, .searchMM, .searchStat, .dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: 'auto'
			});


			// ------------------------------------------------------------------------------------------


 }
