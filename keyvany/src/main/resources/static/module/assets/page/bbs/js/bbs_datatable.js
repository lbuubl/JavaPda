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
var cur_page, last_page, fixwidth
var page_ch = function(){}

function makeDataTable(){
	var t1_Id = "#dataList";


	// Table setup
	// ------------------------------

	// Setting datatable defaults
	$.extend( $.fn.dataTable.defaults, {
		"autoWidth": false,

		// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
		// https://datatables.net/reference/option/dom 참고
		"dom": '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
		//"dom": '<"datatable-header"fBl><"datatable-footer"ip>',
		"language": {
			//데이터 없는 경우
			emptyTable: '<span data-i18n="datatable.option.emptyTable"></span>',
			//keyworkd 라벨 설정
			"search": '<span data-i18n="bbs:datatable.option.filter"></span> _INPUT_'
			//
			,"lengthMenu": '<span data-i18n="bbs:datatable.option.show"></span> _MENU_'
			//페이징 처리 옵션
			,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="bbs:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="bbs:datatable.option.next"></button>'}
		},
		"drawCallback": function () {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
		},
		"preDrawCallback": function() {
			$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
		}


	});

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

	t1 = $(t1_Id).DataTable({
		"processing" : true
		,"serverSide" : true
		//,"stateSave" : true //datatable 페이징/검색 cache 사용(history.back 을 위해 사용, Menu 클릭시 localStoge 삭제)
		,"ajax" : {
				//"url" :"/Module/UserModule/bbs/List.do"    // ASP
				"url" :"/module/usermodule/bbs/list"  //JAVA
			   ,"type" : "post"
		}
		,"lengthMenu": [lengthMenu, lengthMenu]
		//,"lengthMenu": [[10,30,50,-1], [10,30,50,ALL]]


		,"pagingType": "simple"
		,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

			//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
			{
				//"width" : "50px",
				"targets": [0],
				"orderable": false ,
				"className" : "dt-center"
			}, {
				//"width" : "0px",
				"targets": [1],
				"visible": false,
				"searchable": false
			}, {
				"targets": [2],
				"className" : "FixColnum"
			} , {

				//"width" : "120px",
				"targets": [3],
				"className" : "dt-center"
			}, {
				"targets": [4],
				//"width" : "100px",
				"className" : "dt-center"
			},
{
				//"width" : "0px",
				"targets": [5], // rank step
				"visible": false,
				"searchable": false
			},
{
				//"width" : "0px",
				"targets": [6], // commentCnt
				"visible": false,
				"searchable": false
			} ,{
			//	"width" : "0px",
				"targets": [7], // comment last date
				"visible": false,
				"searchable": false
			}
		]
		//keytable set
		,keys: {
			focus: ':eq(0)' //페이지 이동시 첫번째 row로 포커싱(필수)
		}

		, "order": [ 3, "desc" ] //기본 정렬 역순 출력(필수)

		//데이터 로드 완료 후 실행할 이벤트(필수)
		, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					t1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});

					//리플 구분 처리를 위한 로직
					t1.column(2, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = "<span>"+cell.innerHTML ;

						if(t1.column(5).nodes()[i].innerHTML>0){

							cell.innerHTML = "<i class='icon-forward' ></i> "+cell.innerHTML;
							cell.innerHTML = "<span style='padding-left:"+ t1.column(5).nodes()[i].innerHTML*10+"px'>" + cell.innerHTML + "</span>";
						}

						cell.innerHTML = cell.innerHTML+"</span>" ;
					});



					//Comment 갯수 표출
					t1.column(6, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {

						if(t1.column(6).nodes()[i].innerHTML>0){
							//최근 등록된 댓글인지 체크..
							var lastDt = new Date(t1.column(7).nodes()[i].innerHTML);
							var tmpDt = new Date();
							tmpDt.setDate(tmpDt.getDate()-commnetOption);

							var badgeNm = "";
							if( lastDt > tmpDt ){
								badgeNm = "badge badge-success"
							}else{
								badgeNm = "badge badge-default"
							}
							t1.column(2).nodes()[i].innerHTML = t1.column(2).nodes()[i].innerHTML+' <span class="'+badgeNm+'">'+cell.innerHTML+'</span>';

						}
					});

					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$('#dataList_wrapper').localize();

					cur_page=pageInfo.page+1;
					last_page=pageInfo.pages;

					page_ch();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;

		}

		//커스텀 버튼(우측 상단)
		,"buttons":[
			{
				"text": '<i class="icon-plus3 position-left"></i> <span data-i18n="bbs:button.new"></span>',
				"className": 'btn btn-success btn-icon btn-write btn-default btn-xs'
			}
		]
		//로드 완료 이벤트
		,"initComplete": function(settings, json) {

					// 메인페이지에서 게시글 클릭인 경우에만 
					if(bbsIdx!="" &&  bbsIdx != "0"){
						//view load
						viewLoad(bbsIdx);
						var hData = {
							"data" : {
								"seqIdx" : bbsIdx
							}
						}
						SetHistory(hData, "viewLoad");
					}else{

						var hData = {
							"data" : {

							}
						}
						SetHistory(hData, "wsRemove");
					}

					//목록수 조정 하단이동 추가
					listSize=$("#dataList_info");
					$("#dataList_length").insertBefore(listSize);
		}
	});



	//window.location.reload();


	if(!isMobile){//데스크탑 탑인 경우.(김형식 부장 추가)
		event_kind="click"
	}else{
		event_kind="click"
	}

	$(t1_Id+' tbody').on(event_kind , 'tr td', function () {
		//첫번째 컬럼(Seq)이 아닌경우에만 view load

		//console.log( $(this).parent());
		try{
			if(!$(this).hasClass("notMove")){
				//게시글 load
				var seqIdx="";
				//blockUI load
				BlockShow();

				//seqNo bind
				seqIdx = t1.row( $(this).parent() ).data()[1];

				//view load
				viewLoad(seqIdx);

				var hData = {
					"data" : {
						"seqIdx" : seqIdx
					}
				}
				SetHistory(hData, "viewLoad");

				//row 선택 효과 적용
				$(this).parent().addClass('selected');
				$(this).parent().siblings().removeClass('selected');

			}
		}catch(e){}
	});

	//data table key event bind
	 t1.on('key', function (e, datatable, key, cell, originalEvent) {

			if(key=="13"){
				//게시글 load
				var seqIdx = t1.row( $(cell.node()).parent() ).data()[1];
				viewLoad(seqIdx);
				var hData = {
					"data" : {
						"seqIdx" : seqIdx
					}
				}
				SetHistory(hData, "viewLoad");

				//row 선택 효과 적용
				$(cell.node()).parent().addClass('selected');
				$(cell.node()).parent().siblings().removeClass('selected');
			}
		});



	//페이지 이동시 이벤트 바인딩
	t1.on( 'page.dt', function () {
		//console.log("aaaaaaaa");
	});

	$(".label:after").click(function(){
		//console.log("click")
	})

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
	$('.dataTables_filter input[type=search]').attr('data-i18n',"[placeholder]bbs:datatable.option.filter");

	// 그리드 상단 페이징 버튼 처리
	$('.dataTables_length select').select2({
		minimumResultsForSearch: Infinity,
		containerCssClass: 'select-xs',
		width: 'auto'
	});

	$("#dataList").on("mresize",function(){
		/*	CFixWidth=$(this).width()-fixwidth;
			console.log(CFixWidth)
			$(this).find( ".FixColnum" ).width(CFixWidth); */
	});

	//권한에 따른 글쓰기 버튼 숨기기
	if(aa!="yes"){
		$("#dataList_wrapper > div.datatable-header > div.dt-buttons > a").css("display","none");
	}
	// ------------------------------------------------------------------------------------------

	//에디터 다국어 처리
	i18next.loadNamespaces(["editor"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('.body').localize();				//다국어 반영
	});

 }


//이전 ,다음이동


var GestureArea = document.getElementById('workSpace');
var GA = new Hammer(GestureArea);
GA.get('pan').set({ threshold: 250, direction:Hammer.DIRECTION_HORIZONTAL});
GA.on("panend", function(ev) {

	cur_Select = $("#dataList .selected");
	bbs_len = $("#dataList tbody tr").length-1;

	//변경전에 현재 선택한 Row인덱스가 0이거나, 마지막줄인지 확인
	//console.log(	cur_Select.index());

	if (ev.direction == 2)//left
	{
		if (cur_Select.index()==0)
		{
				if (cur_page==1)
				{
					alert("이전글이 없습니다.")
					return false;
				}else{
					//앞페이지로 이동후 멘 뒤에 있는 항목 읽기처리
					$('#dataList_previous').trigger('click');
					 page_ch=function(){
									$("#dataList tbody tr:last").addClass('selected');
									move_item = $("#dataList .selected");
									readCall(move_item);
									page_ch=null; //실행후 초기화
					 }
				}

		}else{
				move_item=cur_Select.prev();
				if (ev.direction == 2 || ev.direction == 4){//left
					readCall(move_item)
				}
		}
	}else if(ev.direction == 4){// 4 right
		if (cur_Select.index()==bbs_len){
			if (cur_page==last_page)
			{
				alert("다음글이 없습니다.")
				return false;

			}else{
				// 다음페이지로 이동 후 첫항목의 읽기처리
				 $('#dataList_next').trigger('click');
				 page_ch=function(){
								$("#dataList tbody tr:first").addClass('selected');
								move_item = $("#dataList .selected");
								readCall(move_item);
								page_ch=null; //실행후 초기화
				 }

			}
		}else{
			move_item=cur_Select.next();
			if (ev.direction == 2 || ev.direction == 4){//left
				readCall(move_item)
			}
		}
	}


});


function  readCall(move_item){
	try
	{
			seqIdx = t1.row(move_item).data()[1];
			BlockShow();
			viewLoad(seqIdx);

			//row 선택 효과 적용
			move_item.addClass('selected');
			move_item.siblings().removeClass('selected');
	}
	catch (e)
	{
	}

}


