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

function makeDataTable(){
	var t1_Id = "#dataList";


	// Table setup
			// ------------------------------

			// Setting datatable defaults
			$.extend( $.fn.dataTable.defaults, {
				"autoWidth": false,
				"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
				"language": {
					"search": '<span data-i18n="approval:datatable.option.filter"></span> _INPUT_'
					,"lengthMenu": '<span data-i18n="approval:datatable.option.show"></span> _MENU_'
					,"emptyTable": '<span data-i18n="datatable.option.emptyTable">'
					,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="approval:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="approval:datatable.option.next"></button>'}
				},
				"drawCallback": function () {
					$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
				},
				"preDrawCallback": function() {
					$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
				}
			});


			// show list 설정
			if(isMobile){
				lengthMenu = [10,30,50,100]
			}else{
				var customMinus = 240
				var customLen = parseInt(($(".page-container").height()-customMinus)/44)-1
				lengthMenu = [customLen,30,50,100]
			}


			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				//,"bDestroy": true
				,"ajax" : {
					//"url" :"/Module/UserModule/approval/appList/json/getMyPendingList.do"
					"url" :"/module/usermodule/approval/applist/getMyPendingList"
					,"type" : "post"
					,"data" : function ( d ) {// param > appState,GongGuCode 만 사용  , ASP 로직 유지
						d.mc = mc;
						d.ty = $("#ty").val();
						d.appState = $("#sch_appState").val();	//결재상태 조건
						d.GongGuCode = $("#sch_GongGuCode option:selected").val();	//공구선택
					}

				}
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					{
						//0.번호
						//"width" : "50px",
						"targets": [0],
						"orderable": false,
						"className" : "dt-center"
					}, {
						//1.SeqNo
						//"width" : "0px",
						"targets": [1],
						"visible": false,
						"searchable": false
					}, {
						//2.Form_SeqNo
						//"width" : "0px",
						"targets": [2],
						"visible": false,
						"searchable": false
					}, {
						//3.문서번호
						//"width" : "100px",
						"targets": [3],
						"orderable": true,
						"className" : "dt-center"
					}, {
						//4.제목
						//"width" : "340px",
						"targets": [4],
						"orderable": true,
						"className" : "FixColnum"
					}, {
						//5.작성자
						//"width" : "100px",
						"targets": [5],
						"orderable": true,
						"className" : "dt-center"
					}, {
						//6.작성일
						//"width" : "100px",
						"targets": [6],
						"orderable": true,
						"className" : "dt-center"
					}, {
						//7.상태
						//"width" : "60px",
						"targets": [7],
						"orderable": true,
						"className" : "dt-center"
					}, {
						//8.현결재자
						//"width" : "100px",
						"targets": [8],
						"orderable": true,
						"className" : "dt-center"
					}, {
						//9.파일
						//"width" : "50px",
						"targets": [9],
						"orderable": false,
						"className" : "dt-center"
					}, {
						//10.의견
						//"width" : "50px",
						"targets": [10],
						"orderable": false,
						"className" : "dt-center"
					}, {
						//11.정보
						//"width" : "50px",
						"targets": [11],
						"orderable": false,
						"className" : "dt-center "
					}, {
						//12.마지막 컬럼 정렬 안되는 문제로 빈 컬럼 추가
						"targets": [12],
						"visible": false
					}
				]

				, "order": [ 0, "desc" ] //기본 정렬 역순 출력(필수)

				, "infoCallback": function( settings, start, end, max, total, pre ) {
					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$('#dataList_wrapper').localize();
					if (total==0){
						$("#dataList_previous").hide();
						$("#dataList_next").hide();
					}

					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					if (total==0){
						return '';
					}else{
						return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
					}
				}

				//커스텀 버튼
				,"buttons":[
					{
						"text": '<i class="glyphicon glyphicon-plus position-left"></i><span data-i18n="approval:button.new"></span>',
						"className": 'btn btn-success btn-icon btn-write btn-default btn-xs'
					}
				]

				,initComplete: function(settings){
					$("#dataList_filter").append($('#tableFilter_appState').detach().show());
					$("#dataList_filter").append($('#tableFilter_gonggu_list').detach().show());

					$("#sch_appState").on("change", function(){
						t1.ajax.reload(null, true);
					});
					//데스트탑 만.(김형식 부장 추가)
					$("#sch_GongGuCode").on("change", function(){
						t1.ajax.reload(null, true);
					});

					//목록수 조정 하단이동 추가
					listSize=$("#dataList_info");
					$("#dataList_length").insertBefore(listSize);
				}

			});



			/*
			if(!isMobile){//데스트탑 만.(김형식 부장 추가)
				event_kind="dblclick"
			}else{
				event_kind="click"
			}
			*/

			event_kind="click"

			//모바일 아닌경우 클릭스 row 선택 추가, 2017-04-12, 김영식
			if (!isMobile){
				$(t1_Id+' tbody').on("click" , 'tr', function () {
					if ($(this).closest(".approval-info-tr").length > 0){
						return false;
					}
					//row 선택
					$(this).addClass('selected');
					$(this).siblings().removeClass('selected');
				});
			}

			$(t1_Id+' tbody').on(event_kind , 'tr td', function () {
				if ($(this).closest(".approval-info-tr").length > 0){
					return false;
				}

				//(김형식 부장 추가)
				document.ondblclick = function(evt) {
					if (window.getSelection)
							try
									{
										window.getSelection().removeAllRanges();
										}
									catch (e) { }
					else if (document.selection)
						document.selection.empty();
				}

				var colIndex = $(this).parent().children().index($(this));
				var colLength = $(this).parent().children().length;

				//마지막 컬럼은 결제정보 버튼 컬럼이므로 td 이벤트 제외
				if(colIndex != colLength-1){
					var sn = t1.row( $(this).parent() ).data()[1];
					var fSn = t1.row( $(this).parent() ).data()[2];
					fn_viewAppDetail(sn, fSn);
				}

				//row 선택
				$(this).closest("tr").addClass('selected');
				$(this).closest("tr").siblings().removeClass('selected');
			});

			//자동검색 수동으로 변경
			$(t1_Id+"_filter input").unbind();
			$(t1_Id+"_filter input").keyup(function(e){

				if(e.keyCode==13){
					t1.search( this.value ).draw();
					this.blur();
				}
			});


			// External table additions (필수)
			// ------------------------------

			// Add placeholder to the datatable filter option
			$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]approval:datatable.option.filter");

			// Enable Select2 select for the length option
			$('.dataTables_length select').select2({
				minimumResultsForSearch: Infinity,
				containerCssClass: 'select-xs',
				width: '60px'
			});

			//권한에 따른 글쓰기 버튼 숨기기
			//alert($("#add_auth").val());

			if($("#add_auth").val()!="yes"){
				$("#dataList_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
			}
			// ------------------------------


			i18next.loadNamespaces(["editor"], function(err, t){
				jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
				$('.body').localize();				//다국어 반영
			});

 }
