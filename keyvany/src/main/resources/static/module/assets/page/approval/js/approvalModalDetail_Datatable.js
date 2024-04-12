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
var tbDtlInfo;

var tbDtlId = "#docDetailList";

var $selRow = null;

function makeDetailDataTable(){

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
			"autoWidth": false,

			// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
			// https://datatables.net/reference/option/dom 참고
			"dom": '<"datatable-header"><"datatable-scroll"t><"datatable-footer"i>',
			//푸터 페이지 정보가 빠지면 버튼생성이 안된다.
			"language": {
				//데이터 없는 경우
				"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>',
				//keyworkd 라벨 설정
				//"search": '<span data-i18n="common:datatable.option.filter"></span> _INPUT_'
				//
				//,"lengthMenu": '<span data-i18n="common:datatable.option.show"></span> _MENU_'
				//페이징 처리 옵션
				//,"paginate": { 'first': 'First', 'last': 'Last', 'previous': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs" data-i18n="common:datatable.option.previous"></button>' , 'next': '<button class="dt-button btn btn-success btn-icon btn-default btn-xs"  data-i18n="common:datatable.option.next"></button>'}
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

			tbDtlInfo = $(tbDtlId).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/module/UserModule/approval/common/Modal-doclnfoDetailList.do"
					"url" :"/module/usermodule/approval/common/modalDoclnfoDetailList"
					,"type" : "post"
					,"data" : function ( d ) {
						d.dsq = $("#sq").val();
					}
				}
				,"pagingType": "simple"
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정
					 {
						//appSq
						"width" : "60px",
						"targets": [0],
						"orderable": false,
						"className" : "dt-center" ,
						"visible": false,
						"searchable": false

					}, { //User sq
						"className" : "dt-center",
						"targets": [1],
						"visible": false,
						"searchable": false
						, "orderable": false
					}, {
						//appKind
						"targets": [4],
						"className" : "dt-center"
						, "orderable": false
					}, {
						//Dt
						"targets": [3],
						//"width" : "120px"
						"className" : "dt-center"
						, "orderable": false
						},{
						//User nm
						"className" : "dt-center",
						"targets": [2]
						, "orderable": false
					} , {
						//appCancel
						"targets": [5],
						"className" : "dt-center"
						, "orderable": false
					} , {
						//docView
						"targets": [6],
						"className" : "dt-center"
						, "orderable": false
					}  , {
						//updateReason
						"targets": [7],
						"className" : "dt-center"
						, "orderable": false
					}, { //appStat
						"className" : "dt-center",
						"targets": [8],
						"visible": false,
						"searchable": false
						, "orderable": false
					} , { //docSq
						"className" : "dt-center",
						"targets": [9],
						"visible": false,
						"searchable": false
						, "orderable": false
					}
				]

				//, "order": [ 3, "desc" ] //기본 정렬 역순 출력(필수)

				//데이터 로드 완료 후 실행할 이벤트(필수)
				, "infoCallback": function( settings, start, end, max, total, pre ) {

					//INDEX 역순 출력(필수)
					tbDtlInfo.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						//console.log(total,i,start+1);
						cell.innerHTML = total-i-start+1;
					});




					var kind = "";
					kindTxt="";
					//구분 다국어처리
					tbDtlInfo.column(4, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						kind = tbDtlInfo.column(4).nodes()[i].innerHTML;
						switch(kind){
							case "0" :
								kindTxt = "writer";
								break;
							case "1" :
								kindTxt = "approve";
								break;
							case "2" :
								kindTxt = "refer";
								break;
							case "3" :
								kindTxt = "helper";
								break;
							case "4" :
								kindTxt = "circulation";
								break;
							case "5" :
								kindTxt = "approveAll";
								break;
							case "6" :
								kindTxt = "nonAssign";
								break;
							case "7" :
								kindTxt = "sending";
								break;
							case "8" :
								kindTxt = "receive";
								break;
							default :
								kindTxt = "admin";
								break;
						}
						cell.innerHTML = " <span data-i18n='approval:label."+kindTxt+"'></span>";
					});


					var stat = ""
					var appSq = "";
					var docSq = "";

					//보기버튼 생성
					tbDtlInfo.column(6, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						stat = tbDtlInfo.column(8).nodes()[i].innerHTML;
						docSq = tbDtlInfo.row( $(cell).parent() ).data()[9];
						if(stat == "4"){
							cell.innerHTML = "<button type='button'class='btn btn-icon btn-default btn-xs btn-docDetailInfoView' data-dsq='"+docSq+"'><i class=' icon-file-eye '></i> 보기</button>";
						}else{
							cell.innerHTML = "";
						}
					});

					//완료시에만 취소버튼 생성
					tbDtlInfo.column(5, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						stat = tbDtlInfo.column(8).nodes()[i].innerHTML;
						appSq = tbDtlInfo.row( $(cell).parent() ).data()[0];
						docSq = tbDtlInfo.row( $(cell).parent() ).data()[9];
						uid = tbDtlInfo.row( $(cell).parent() ).data()[1]
						//관리자여부 및 사용자 아이디 비교
						if(( true  ) && stat == "4"){
							cell.innerHTML = "<button type='button' data-lsq='"+appSq+"' data-dsq='"+docSq+"' class='btn btn-icon btn-default btn-xs btn-docApprovalCancel'><i class='icon-reply' ></i> 취소</button>";
						}
					});


					var api = this.api();
					var pageInfo = api.page.info();

					//page load시 previeus, next 버튼 등 한국어 처리
					$(tbDtlId+'_wrapper').localize();


					//리턴값 없는경우 좌측하단 데이터 정보 안나옴
					//return 'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
					return '';//'Page '+ (pageInfo.page+1) +' of '+ pageInfo.pages;
				}
				//커스텀 버튼(우측 상단)
				/*,"buttons":[
					{
						"text": '<i class="icon-reset position-left"></i> <span data-i18n="common:btn.reset"></span>',
						"className": 'btn btn-success btn-icon btn-reset btn-default btn-xs '
					}
				]
				*/
			});


			$(tbDtlId+' tbody').on("click" , 'tr td', function () {
				//row 클릭시 체크박스 클릭 이벤트
				$(this).parent().find("input").trigger("click");
				//첫번째 컬럼(Seq)이 아닌경우에만 view load
				if(!$(this).hasClass("notMove")){
					//row 선택 효과 적용
					$(this).parent().addClass('selected');
					$(this).parent().siblings().removeClass('selected');


				}

			});


			//결재취소 이벤트
			$(tbDtlId+' tbody').on("click" , '.btn-docApprovalCancel', function () {
				//console.log(this);
				//console.log($(this).data("lsq") , $(this).data("dsq"), $("#sq").val());

				var sendData ={
								sq : $("#sq").val()
								,lsq : $(this).data("lsq")+""
								,dsq : $(this).data("dsq")+""
							}
				//console.log(sendData);
				swal({
					title: i18next.t("approval:msg.cancelYn"),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("common:btn.yes"),
					cancelButtonText: i18next.t("common:btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				},
				function(isConfirm){
					if (isConfirm) {
						alert('[2019-10-08] \n 결재취소 기능은 차후 개발 \n 개선중(이대영B)');
						$.ajax({
							//url : "/module/usermodule/approval/common/Modal-docCancel.do"
							url : "/module/usermodule/approval/common/modalDocCancel"
							,type : "post"
							,data :sendData
							,success : function(result){
								alert('[2019-10-08] \n 결재취소 기능은 차후 개발 \n 개선중(이대영B) \n modalDocCancel result : '+result);
								if(result=="success"){
									tbDtlInfo.ajax.reload(null,false);
									//showSwal(i18next.t("approval:msg.cancelSuccess"),result);

									//$("#modal_docInfo").modal("hide");
									//console.log("hide=============");
									EditorReLoad($("#hidden_Sq").val(),$("#hidden_Fs").val(),result);
									/*
									swal({
										title: "성공",
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});
									 */
								}

							}
						})
					}
				});

			});
			$("#docDetailList_wrapper .datatable-footer").attr("style","display:none");

			//보기 이벤트
			$(tbDtlId+' tbody').on("click" , '.btn-docDetailInfoView', function () {
				//console.log(this);
			});


			//자동검색 수동으로 변경
			$(tbDtlId+"_filter input").unbind();
			$(tbDtlId+"_filter input").keyup(function(e){
				if(e.keyCode==13){
					//console.log(this.value );
					tbDtlInfo.search( this.value ).draw();
					$(this).blur();
				}
			});


			//페이지 이동시 이벤트 바인딩
			tbDtlInfo.on( 'page.dt', function () {
				//moveScrollTop($(tbDtlId).offset().top)
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

