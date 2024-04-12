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
var useManpower = MANPOWER_CNT > 0 ? true:false;	//인력배치관리 사용여부

function makeDataTable(){

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
	var lengthMenu ;

	if(isMobile){
		lengthMenu = [10,30,50,100]
	}else{
		var customMinus = 240
		var customLen = parseInt(($(".page-container").height()-customMinus)/37)-1
		lengthMenu = [customLen,30,50,100]
	}

	// Table setup
			var colIdx = 0 ;

			var txt = "";
			t1 = $(t1_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Data.do?callcmd=ProjectMNg_PList"
					//"url" :"/Module/UserModule/ProjectSummary/List.do"
					"url" :"/module/usermodule/projectsummary/list"
					,"type" : "post"
					,"data" : function(d){
						d.key = $("INPUT.dataList_filter").val();
						d.law = $("SELECT[Name=searchLaw]").val();
						d.step = $("SELECT[Name=searchStep]").val();
						d.status = $("SELECT[Name=searchStatus]").val();
						d.supervision = $("SELECT[Name=searchSupervision]").val();
						d.orderType = $("SELECT[Name=orderType]").val();
					}
				}
				,"pagingType": "simple"
				,"lengthMenu": [lengthMenu, lengthMenu]
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						//No
						"targets": [0],
						"orderable": false,
						"className" : "FixTitle dt-center"
					}, { // key
						//"width" : "0px",
						"targets": [1],
						"visible": false,
						"searchable": false

					}, {
						//Prj Name
						"targets": [2],
						"className" : "FixColnum dt-head-center",
						"width" : "180px",
					}, {
						//law
						"targets": [3],
						"className" : "FixTitle dt-center"
					}, {
						//orderType
						"targets": [4],
						"className" : "FixTitle dt-center"
					}, {
						//manager Nm
						"targets": [5],
						"className" : "FixTitle dt-center"
					}, {
						//계약시작일
						"targets": [6],
						"className" : "FixTitle dt-center"
					}, {
						//계약종료일
						"targets": [7],
						"className" : "FixTitle dt-center"
					}, {
						//mmPlan
						"targets": [8],
						"className" : "FixTitle  dt-center",
						"visible": useManpower
					}, {
						//mmReal
						"targets": [9],
						"className" : "FixTitle dt-center",
						"visible": useManpower
					}, {
						//투입율
						"targets": [10],
						"className" : "FixTitle dt-center",
						"visible": useManpower

					}, {
						//투입대비기성율
						"targets": [11],
						"className" : "FixTitle dt-center",
						"visible": useManpower

					}, {
						//planMoney
						"targets": [12],
						"className" : "FixTitle dt-right"
					}, {
						//realMoney
						"targets": [13],
						"className" : "FixTitle dt-right"
					}, {
						//moneyPrgress
						"targets": [14],
						"className" : "FixTitle dt-center"
					}, {
						//change
						"targets": [15],
						"className" : "FixTitle dt-right"
					}, {
						//Start date
						"targets": [16],
						"className" : "FixTitle dt-center"
					}, {
						//end Date
						"targets": [17],
						"className" : "FixTitle dt-center"
					}, {
						// step
						"targets": [18],
						"className" : "FixTitle dt-center"
					}, {
						//planPrg
						"targets": [19],
						"className" : "FixTitle dt-center"
					}, {
						//realPrg
						"targets": [20],
						"className" : "FixTitle dt-center"
					}, {
						//stat
						"targets": [21],
						"orderable": false,
						"className" : "FixTitle dt-center"
					}, {
						//sort
						"targets": [22],
						"visible": false,
						"searchable": false
					}
				]

				, "order": [ 22, "asc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						//cell.innerHTML = total-i-start+1;
						cell.innerHTML = total-i;
					});

					t1.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.title = cell.innerHTML
						cell.innerHTML = "<span>"+cell.innerHTML+"</span>";

					});

					var imgHTML ="";
					//신호등

					/*
					t1.column(17, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {


						if(cell.innerHTML == 0 && t1.row(i).data()[15] =="0" ){
							imgHTML = "<img src='/module/assets/images/round/gray.gif'>";
						}else if(cell.innerHTML <= STANDARD_GREEN ){
							imgHTML = "<img src='/module/assets/images/round/green.gif'>";
						}else if(cell.innerHTML <= STANDARD_YELLO ){
							imgHTML = "<img src='/module/assets/images/round/yellow.gif'>";
						}else{
							imgHTML = "<img src='/module/assets/images/round/red.gif'>";
						}

						cell.innerHTML = imgHTML;
					});
					*/

					// M/M 계획
					t1.column(8, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(cell.innerHTML,STANDARD_MM, (cell.innerHTML/STANDARD_MM).toFixed(2));
						cell.innerHTML = (cell.innerHTML/STANDARD_MM).toFixed(2);
					});

					// M/M 투입
					var per = 0;
					t1.column(9, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						/*
					 	if(cell.innerHTML!="0" && t1.row(i).data()[8] != "0"){
							per = (cell.innerHTML/t1.row(i).data()[8]*100).toFixed(2);
						}else{
							per = 0;
						}
						cell.innerHTML = (cell.innerHTML/STANDARD_MM).toFixed(2) + "(" + per +"%)";
						*/
						cell.innerHTML = (cell.innerHTML/STANDARD_MM).toFixed(2);
					});



					t1.column(11, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {


						if(parseFloat(cell.innerHTML) > 0){
							cell.innerHTML = "<font color='blue'>" + cell.innerHTML + "</font>";
						}else{
							cell.innerHTML = "<font color='red'>" + cell.innerHTML + "</font>";
						}

						cell.innerHTML = numberWithCommas(cell.innerHTML);
					});

					t1.column(12, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = numberWithCommas(cell.innerHTML);
					});
					t1.column(13, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = numberWithCommas(cell.innerHTML);
					});

					t1.column(15, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
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
				/*
				,"buttons":[
					{
						"text": '<i class="icon-plus3"></i> <span data-i18n="common:btn.append"></span>',
						"className": 'btn btn-success btn-icon btn-write btn-default btn-xs btn-addGroup'
					}
				]
				*/
			});

			var evnt ="";

			if(isMobile){
				evnt = "dblclick";
			}else{
				evnt = "click"
			}
			//alert(inside)

			//--헤더스크립트 시작

					//넓이값을 지정
					if(iOS==null)
					{
						$("#fixDiv").width($("#resizeDiv").width());
					}

					//헤더복사
					$( "#header" ).clone().appendTo( "#dataList_header" );
					$( "#dataList_header thead tr th" ).css("text-align", "center"); //정렬중앙
					$( "#dataList_header thead tr th" ).removeClass( "dt-right sorting" )//정렬css remove

					//데이터테이블 초기위치값
					var const_event_pv=curent_pos();
					$("#resizeDiv").scroll(function(event){

							if ($(this).scrollTop() >22)//스크롤 내려가면...
							{
									$( "#dataList_header" ).show(); //만든 헤더를 보여준다..
									$( "#fixDiv" ).show();
									$( "#fixDiv").css("border-bottom", "1px solid #d7d7d7");

									if ($(this).scrollLeft()==0) //우측으로 스크롤변동없을경우.
									{
												set_header=$("#dataList").offset();
												if (set_header.left >0) //헤더위치가 0보다 크면..
													{
														$( "#dataList_header" ).css("left", curent_pos()-const_event_pv);
													}
									}

									if ($(this).scrollLeft() >0){ //우측으로 스크롤발생시
											$( "#dataList_header" ).css("left", curent_pos() - const_event_pv);
									}
							}else{ //스크롤이 꼭대기 라면..

									$( "#dataList_header" ).hide(); //헤더를 숨긴다.
									$( "#fixDiv" ).hide(); //숨긴다.
									$( "#fixDiv").css("border-bottom", "0px solid #fff");

									set_header=$("#dataList").offset();
									if (set_header.left > 0)
									{
											$( "#dataList_header" ).css("left", curent_pos()-const_event_pv);
									}
							}
					});

					function curent_pos(){
							return $("#dataList").offset().left;
					}

					$("#resizeDiv").on("mresize",function(){ //스크롤박스 리사이즈시..
							if(iOS==null)
							{
								$("#fixDiv").width($("#resizeDiv").width());
							}

							const_event_pv=curent_pos(); //위치값변경
							if ($(this).scrollLeft() > 0)
							{
								const_event_pv=const_event_pv+$(this).scrollLeft();
							}

					});

			// -- 헤더스크립트끝


			$(t1_Id+' tbody').on( evnt , 'tr td', function () {
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
					 try{
						$selRow = ( t1.row( $(this).parent()) );
						$("#selectGonggu").val( $selRow.data()[1] );
						$("#sDate").val( $selRow.data()[16] );
						$("#eDate").val( $selRow.data()[17] );
						$("#plan").val( $selRow.data()[19] );
						$("#real").val( $selRow.data()[20] );
						$("#deposit").val( $selRow.data()[12] );

						viewLoad();


						//row 선택 효과 적용
						$(this).parent().addClass('selected');
						$(this).parent().siblings().removeClass('selected');
					 }catch(e){}
				}

			});


			//$(t1_Id+"_filter").prepend($("#hiddenSearchDiv").html());
			//$("#hiddenSearchDiv").remove();

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


