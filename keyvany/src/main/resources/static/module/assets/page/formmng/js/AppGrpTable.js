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
* 결재그룹 리스트 컨트롤소스
* ---------------------------------------------------------------------------- */
var t2;
var t2_Id = "#AppGrpList";

var $selRow = null;
var datalength =null;

function makeAppGrpTable(){

	// Setting datatable defaults
	// ------------------------------------------------------------
		$.extend( $.fn.dataTable.defaults, {
				"autoWidth": false,

				// header , scroll , footer 옵션에 따라 데이터 테이블 ui 변경됨
				// https://datatables.net/reference/option/dom 참고

				"dom": '<"datatable-header"><"datatable-scroll"t>',
				"language": {
					//데이터 없는 경우
					"emptyTable": '<span data-i18n="common:datatable.option.emptyTable"></span>'
				},
				"drawCallback": function () {
						$(this).find('thead tr th').removeClass('sorting_asc');
				}
		});

	// Table setup
			var colIdx = 0 ;
	//No ,item_infoSeq, sort_nm, PdsFolder_SeqNo
			var txt = "";
			t2 = $(t2_Id).DataTable({
				 "processing" : true
				,"serverSide" : true
				,"ajax" : {
					//"url" :"/Module/SysModule/FormMng/AppGrpList.do"
					"url" :"/module/sysmodule/formmng/appGrpList"
					,"type" : "post"
					,"data" : function (d) {
							d.form_num = $("#form_num").val();
							d.tempKey = $("#app_grp_temp_key").val();
					 }
				}
				,"columnDefs": [  //컬럼 옵션 : 사용자 기호에 맞게 수정

					//첫번째 컬럼은 우선순위 적용 안되는 것으로 보임..
					{
						"width" : "80px",
						"targets": [colIdx++],
						"orderable": false,
					}, { // Idx
						//"width" : "0px",
						"targets": [colIdx++],
						"visible": false,
						"orderable": false,
						"searchable": false
					}, { //GRP_NM
						"targets": [colIdx++],
						"orderable": false
					}, { //App_cnt
						"targets": [colIdx++],
						"width" : "50px",
						"orderable": false,
						"className" : "dt-center"
					} , { //Refer_cnt
						"targets": [colIdx++],
						"width" : "50px",
						"orderable": false,
						"className" : "dt-center"
					}  , { //Coper_cnt
						"targets": [colIdx++],
						"width" : "50px",
						"orderable": false,
						"className" : "dt-center"
					}  , { //view_cnt
						"targets": [colIdx++],
						"width" : "50px",
						"orderable": false,
						"className" : "dt-center"
					}  , { //FORM_GRP_Kind
						"targets": [colIdx++],
						"width" : "100px",
						"orderable": false,
						"className" : "dt-center"
					}  , { //Recive_Kind
						"targets": [colIdx++],
						"width" : "80px",
						"orderable": false,
						"className" : "dt-center"
					}  , { //AppGrp_DocEditYn
						"targets": [colIdx++],
						"width" : "100px",
						"orderable": false,
						"className" : "dt-center"
					}
					 , { //del
						"targets": [colIdx++],
						"width" : "50px",
						"orderable": false,
						"className" : "dt-center"
					}
				]

				//로드 완료 이벤트 -
				,"initComplete": function(settings, json) {
					//			total=json.data.length;

				}

			});

			$(t2_Id).on( 'draw.dt', function () {
					total=$("#AppGrpList tbody tr").length;
					//No 표기
					t2.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = total-i;
					});

					//삭제버튼
					t2.column(10, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = "<button type='button' class='btn btn-success btn-xs btn-AppGrp-del' data-seqidx='"+t2.column(1).nodes()[i].innerHTML+"'><span data-i18n='common:btn.delete'></span></button>";
					});

					$(t2_Id+'_wrapper').localize();
			} );

			$(t2_Id+' tbody').on("dblclick" , 'tr td', function () {

					//첫번째 컬럼(Seq)이 아닌경우에만 view load
					if(!$(this).hasClass("dataTables_empty")){

							$selRow = ( t2.row( $(this).parent()) );
							//양식템플릿 보기
							GRP_SEQNO=$selRow.data()[1];
							tempKey=$("#app_grp_temp_key").val();
							formNum=$("#form_num").val();

	                        alert("app_temp_key : " + tempKey + " / form_num : "+ formNum + " / GRP_SEQNO : "+GRP_SEQNO);

							$.ajax({
								//"url" :"/Module/sysModule/FormMng/AppGrp_modal.page"
					            "url" :"/module/sysmodule/formmng/appGrpModal"
								,"type" : "POST"
								,"data" : {"app_temp_key" : tempKey , "form_num":formNum, "GRP_SEQNO":GRP_SEQNO}
								,"success" : function(data){
									$("#AppGrpModal").html(data);

								},"error" : function(e){
									//console.log(e);
									showSwal("Error발생","error");
								}
							});
					}
			});



 }
