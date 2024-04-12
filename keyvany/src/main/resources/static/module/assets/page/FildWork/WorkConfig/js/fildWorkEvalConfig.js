
			var aa;
			$(function(){
				i18next.loadNamespaces(["fildWorkEvalConfig"], function(err, t){
					//jquery 사용위해 선언
					jqueryI18next.init(i18next, $);

					$('.body').localize();				//다국어 반영

					//벨리데이션 다국어 처리
					validatorI18n();

					//평가유형 로딩
					fn_load_evalType();
				});

				aa = fn_getAuthInfo("").add_auth;


				/* ---------------------------------1. 평가유형 관련 --------------------------------- */
				var lastSelectedEvaltype;	//평가유형 추가시 현재 선택되어있는 평가유형 일련번호 담을 변수
				//추가버튼
				$(".content").on("click", "#btn_s1_insert", function(){
					//취소 처리를 위하여 현재 선택 일련번호 저장
					lastSelectedEvaltype = $("#tbl_evalType tbody .selected").attr("sn");

					$("#evaltypeNm").val("");
					$("#evaltypeNm").focus();
					$("#tbl_evalType tbody tr").removeClass("selected");

					$("#btn_s1_insert").hide();
					$("#btn_s1_delete").hide();
					$("#btn_s1_cancel").show();

					if (aa == "yes"){
						$("#btn_s1_save").show();
					}else{
						$("#btn_s1_save").hide();
					}

					fn_load_evalClass("");	//점검분류 초기화
				});

				//취소버튼
				$(".content").on("click", "#btn_s1_cancel", function(){
					$("#tbl_evalType tbody tr[sn='"+lastSelectedEvaltype+"']").click();
					fn_resetForm();
				});

				//저장버튼
				$(".content").on("click", "#btn_s1_save", function(){
					if($("#evaltypeNm").valid()){

						var dmlType = "";
						var sn = "";
						var alertStr = "";

						if ($("#tbl_evalType tbody .selected").length > 0){
							dmlType = "modify";
							sn = $("#tbl_evalType tbody .selected").attr("sn");
							alertStr = i18next.t("msg.editOk");
						}else{
							dmlType = "add";
							sn = "";
							alertStr = i18next.t("msg.saveOk");
						}

						$.ajax({
							type :'post'											// Post로 데이터 전달(get,post방식)
							//, async : false											// 비동기식으로 ajax 요청
							//, url: "/Module/UserModule/FildWork/WorkConfig/dml/evaltypeSaveDml.do"
							, url: "/module/usermodule/fieldwork/workconfig/dml/evalTypeSaveDml"
							, data : {
							"dmlType": dmlType,
							"sn" : sn,
							"evaltypeNm": $("#evaltypeNm").val(),
							"SSID" : $("#gssid").val()
							}
							, dataType:"json"
							, success:function( data ){
								if(data.result == "success"){
									swal({
										title: i18next.t("msg.saveOk"),
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});

									//평가유형 목록 재로딩
									fn_load_evaltypeList(sn);

								}else{
									swal({
										title: i18next.t(data.code),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							 }
							 , error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
							 }
						});
					}
				});

				//삭제버튼
				$(".content").on("click", "#btn_s1_delete", function(){
					swal({
						title: i18next.t("msg.delYn"),
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#EF5350",
						confirmButtonText: i18next.t("btn.ok"),
						cancelButtonText: i18next.t("btn.cancel"),
						closeOnConfirm: false,
						closeOnCancel: true
					},function(isConfirm){
						if(isConfirm){

							var sn		= $("#tbl_evalType .selected").attr("sn");

							$.ajax({
								type: "POST",
								//url: "/Module/UserModule/FildWork/WorkConfig/dml/evalTypeSaveDml.do",
								url: "/module/usermodule/fieldwork/workconfig/dml/evalTypeSaveDml",
								data: {
									"dmlType" : "del",
									"sn" : sn,
									"ssid" : $("#gssid").val()
								},
								dataType: "json",
								success:function(data) {

									if(data.result == "success"){
										swal({
											title: i18next.t("msg.delOk"),
											showConfirmButton: false,
											type: "success",
											timer: 1000
										});

										//평가유형 목록 로딩
										fn_load_evaltypeList("");

									}else{
										swal({
											title: i18next.t(data.code),
											confirmButtonColor: "#f44336",
											closeOnConfirm: true,
											type: "error"
										});
									}
								}
								, error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							});

						}
					});
				});

				//평가유형 선택시 Action
				$(".content").on("click", "#tbl_evalType tbody tr", function(){
					if(! $(this).hasClass("no-data")){
						$(this).addClass("selected");
						$(this).siblings().removeClass("selected");
						var evaltypeNm = $(this).find("td:eq(1)").text();

						$("#evaltypeNm").val(evaltypeNm);

						fn_load_evalClass($(this).attr("sn"));	//점검분류 로딩

						$("#btn_s1_cancel").hide();
						$("#btn_s1_insert").show();
						$("#btn_s1_delete").show();

						var authInfo = fn_getAuthInfo($(this).attr("regid"));
						if (authInfo.modify_auth != "yes"){
							$("#btn_s1_save").hide();
						}
						if (authInfo.del_auth != "yes"){
							$("#btn_s1_delete").hide();
						}

						fn_resetForm();
					}else{

					}
				});
				/* --------------------------------- // 1. 평가유형 관련 --------------------------------- */


				/* ----------------------------------- 2. 점검분류 관련 ---------------------------------- */
				var lastSelectedEvalClass = "";
				//추가버튼
				$(".content").on("click", "#btn_s2_insert", function(){
					//취소 처리를 위하여 현재 선택 일련번호 저장
					lastSelectedEvalClass = $("#tbl_evalClass tbody .selected").attr("sn");

					$("#evalClassNm").val("");
					$("#evalClassNm").focus();
					$("#tbl_evalClass tbody tr").removeClass("selected");	//선택해제

					//평가방법 초기화
					$("#panel_evalClass input:checkbox[name='evalMethod']").prop("checked", false);

					//첨부파일 초기화
					fn_load_fileModal("", "");	//점검분류 첨부파일 로딩

					//평가기준초기화(우수,보통,미흡,불량)
					$("select[name='methodTypeCode1']").val("");
					$("select[name='methodTypeCode2']").val("");
					$("select[name='methodTypeCode3']").val("");
					$("select[name='methodTypeCode4']").val("");

					$("#btn_s2_insert").hide();
					$("#btn_s2_delete").hide();
					$("#btn_s2_cancel").show();

					if (aa == "yes"){
						$("#btn_s2_save").show();
					}else{
						$("#btn_s2_save").hide();
					}

					fn_load_evalItem("");	//점검항목 초기화
				});

				//취소버튼
				$(".content").on("click", "#btn_s2_cancel", function(){
					$("#tbl_evalClass tbody tr[sn='"+lastSelectedEvalClass+"']").click();
					fn_resetForm();
				});

				//저장버튼
				//-- 파일업로드 부분에서 이벤트 처리후 fn_save_evalClass() 호출하여 처리완료
				/*
				$(".content").on("click", "#btn_s2_save", function(){
					if($("#evalClassNm").valid()){


						//점검분류 저장처리
						var dmlType = "";
						var sn = "";
						var alertStr = "";
						var typeSn = $("#tbl_evalType tbody .selected").attr("sn");
						var evalMethod = $.map($(':checkbox[name=evalMethod]:checked'), function(n, i){
							  return n.value;
						}).join(',');

						var methodTypeCode = $.map($('#panel_evalClass select[name=methodTypeCode] option:selected'), function(n, i){
							  return n.value;
						}).join(',');


						if ($("#tbl_evalClass tbody .selected").length > 0){
							dmlType = "modify";
							sn = $("#tbl_evalClass tbody .selected").attr("sn");
							alertStr = i18next.t("msg.editOk");
						}else{
							dmlType = "add";
							sn = "";
							alertStr = i18next.t("msg.saveOk");
						}

						$.ajax({
							type :'post'												// Post로 데이터 전달(get,post방식)
							//, async : false											// 비동기식으로 ajax 요청
							, url: "/Module/UserModule/FildWork/WorkConfig/dml/evalClassSaveDml.do"
							, data : {
								"dmlType": dmlType,
								"typeSn" : typeSn,
								"sn" : sn,
								"evalClassNm": $("#evalClassNm").val(),
								"evalMethod": evalMethod,
								"methodTypeCode" : methodTypeCode,
								"SSID" : $("#gssid").val()
							}
							, dataType:"json"
							, success:function( data ){
								if(data.result == "success"){
									swal({
										title: i18next.t("msg.saveOk"),
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});

									//점검분류 목록 재로딩
									var typeSn = $("#tbl_evalType tbody .selected").attr("sn");
									fn_load_evalClassList(typeSn, sn);

								}else{
									swal({
										title: i18next.t(data.code),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
									$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
								}
							 }
							 , error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
									$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
							 }
						});


					}
				});
				*/

				//삭제버튼
				$(".content").on("click", "#btn_s2_delete", function(){
					swal({
						title: i18next.t("msg.delYn"),
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#EF5350",
						confirmButtonText: i18next.t("btn.ok"),
						cancelButtonText: i18next.t("btn.cancel"),
						closeOnConfirm: false,
						closeOnCancel: true
					},function(isConfirm){
						if(isConfirm){

							var sn		= $("#tbl_evalClass .selected").attr("sn");

							$.ajax({
								type: "POST",
								//url: "/Module/UserModule/FildWork/WorkConfig/dml/evalClassSaveDml.do",
								url: "/module/usermodule/fieldwork/workconfig/dml/evalClassSaveDml",
								data: {
									"dmlType" : "del",
									"sn" : sn,
									"ssid" : $("#gssid").val()
								},
								dataType: "json",
								success:function(data) {

									if(data.result == "success"){
										swal({
											title: i18next.t("msg.delOk"),
											showConfirmButton: false,
											type: "success",
											timer: 1000
										});

										//점검분류 로딩
										var typeSn = $("#tbl_evalType tbody .selected").attr("sn");
										fn_load_evalClassList(typeSn, "")

									}else{
										swal({
											title: i18next.t(data.code),
											confirmButtonColor: "#f44336",
											closeOnConfirm: true,
											type: "error"
										});
									}
								}
								, error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							});

						}
					});
				});

				//첨부파일
				$(".content").on("click", "#btn_s2_attachFile", function(){
					$("#modal_file").localize().modal("show");

					/*
					$.ajax({
						type: "POST",
						url: "/Module/UserModule/FildWork/WorkConfig/getFileForm.page",
						data: {
						},
						dataType: "html",
						success:function(data) {
							$("#modal_file").html(data);
							$("#modal_file").modal("show")
						}
					});
					*/
				});

				//점검분류 선택시 Action
				$(".content").on("click", "#tbl_evalClass tbody tr", function(){
					if(! $(this).hasClass("no-data")){
						$(this).addClass("selected");
						$(this).siblings().removeClass("selected");

						$("#evalClassNm").val($(this).find("td:eq(1)").text());

						//평가방법
						var evalMethodVal = $(this).find("td:eq(2)").attr("methodVal");
						var oChkEvalMethod = $("#panel_evalClass input:checkbox[name='evalMethod']");
						$(oChkEvalMethod).each(function(index, obj){
							if(evalMethodVal.indexOf($(this).val()) > -1){
								$(this).prop("checked", true);
							}else{
								$(this).prop("checked", false);
							}
						});


						//평가기준
						var methodTypeCode		= $(this).attr("methodTypeCode");	//코드값
						var arrMethodTypeCode	= methodTypeCode.split(",");
						//var oMethodTypeCode = $("#panel_evalClass select[name='methodTypeCode']");	//select box

						/*
						$(oMethodTypeCode).each(function(index, obj){
							$(this).val(arrMethodTypeCode[index]);
						});
						*/

						$("#panel_evalClass select[name='methodTypeCode1']").val(arrMethodTypeCode[0]);
						$("#panel_evalClass select[name='methodTypeCode2']").val(arrMethodTypeCode[1]);
						$("#panel_evalClass select[name='methodTypeCode3']").val(arrMethodTypeCode[2]);
						$("#panel_evalClass select[name='methodTypeCode4']").val(arrMethodTypeCode[3]);




						fn_load_fileModal($(this).attr("sn"), $(this).attr("regid"));	//점검분류 첨부파일 로딩
						fn_load_evalItem($(this).attr("sn"));	//점검항목 로딩

						$("#btn_s2_cancel").hide();
						$("#btn_s2_insert").show();
						$("#btn_s2_delete").show();

						var authInfo = fn_getAuthInfo($(this).attr("regid"));
						if (authInfo.modify_auth != "yes"){
							$("#btn_s2_save").hide();
						}
						if (authInfo.del_auth != "yes"){
							$("#btn_s2_delete").hide();
						}

						fn_resetForm();
					}
				});
				/* --------------------------------- // 2. 점검분류 관련 --------------------------------- */


				/* ----------------------------------- 3. 점검항목 관련 ---------------------------------- */
				var lastSelectedEvalItem = "";
				//추가버튼
				$(".content").on("click", "#btn_s3_insert", function(){

					//취소 처리를 위하여 현재 선택 일련번호 저장
					lastSelectedEvalItem = $("#tbl_evalItem tbody .selected").attr("sn");

					$("#evalItemNm").val("");
					$("#evalItemTerm").val("");
					$("#evalItemNm").focus();
					$("#tbl_evalItem tbody tr").removeClass("selected");	//선택해제

					$("#btn_s3_insert").hide();
					$("#btn_s3_delete").hide();
					$("#btn_s3_cancel").show();

					if (aa == "yes"){
						$("#btn_s3_save").show();
					}else{
						$("#btn_s3_save").hide();
					}

					$("#panel_evalItem input[name='isEssential']").prop("checked", false);

					//정기문서여부
					$("#panel_evalItem select[name='repeatDoc']").val("0");
					$("#panel_evalItem select[name='repeatDocDateType']").val("1");
					$("#panel_evalItem .span_repeatDocDateType").hide();

					//fn_load_evalItem("");	//점검항목 초기화
				});

				//취소버튼
				$(".content").on("click", "#btn_s3_cancel", function(){
					$("#tbl_evalItem tbody tr[sn='"+lastSelectedEvalItem+"']").click();
					fn_resetForm();
				});

				//저장버튼
				$(".content").on("click", "#btn_s3_save", function(){
					if($("#evalItemNm").valid() && $("#evalItemTerm").valid()){
						var dmlType = "";
						var sn	= "";
						var alertStr = "";
						var classSn = $("#tbl_evalClass tbody .selected").attr("sn");


						if ($("#tbl_evalItem tbody .selected").length > 0){
							dmlType = "modify";
							sn = $("#tbl_evalItem tbody .selected").attr("sn");
							alertStr = i18next.t("msg.editOk");
						}else{
							dmlType = "add";
							sn = "";
							alertStr = i18next.t("msg.saveOk");
						}

						$.ajax({
							type :'post'											// Post로 데이터 전달(get,post방식)
							//, url: "/Module/UserModule/FildWork/WorkConfig/dml/evalItemSaveDml.do"
							, url: "/module/usermodule/fieldwork/workconfig/dml/evalItemSaveDml"
							, data : {
								"dmlType": dmlType,
								"classSn" : classSn,
								"sn" : sn,
								"evalItemNm": $("#evalItemNm").val(),
								"evalItemTerm": $("#evalItemTerm").val(),
								"isEssential" : $("#panel_evalItem input[name='isEssential']:checked").val(),
								"repeatDoc" : $("#panel_evalItem select[name='repeatDoc']").val(),
								"repeatDocDateType" : $("#panel_evalItem select[name='repeatDocDateType']").val(),
								"SSID" : $("#gssid").val()
							}
							, dataType:"json"
							, success:function( data ){
								if(data.result == "success"){
									swal({
										title: i18next.t("msg.saveOk"),
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});

									//점검항목 목록 재로딩
									fn_load_evalItemList(classSn, sn);

								}else{
									swal({
										title: i18next.t(data.code),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							 }
							 , error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
							 }
						});
					}
				});

				//삭제버튼
				$(".content").on("click", "#btn_s3_delete", function(){
					swal({
						title: i18next.t("msg.delYn"),
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#EF5350",
						confirmButtonText: i18next.t("btn.ok"),
						cancelButtonText: i18next.t("btn.cancel"),
						closeOnConfirm: false,
						closeOnCancel: true
					},function(isConfirm){
						if(isConfirm){

							var sn		= $("#tbl_evalItem .selected").attr("sn");

							$.ajax({
								type: "POST",
								//url: "/Module/UserModule/FildWork/WorkConfig/dml/evalItemSaveDml.do",
								url: "/module/usermodule/fieldwork/workconfig/dml/evalItemSaveDml",
								data: {
									"dmlType" : "del",
									"sn" : sn,
									"ssid" : $("#gssid").val()
								},
								dataType: "json",
								success:function(data) {

									if(data.result == "success"){
										swal({
											title: i18next.t("msg.delOk"),
											showConfirmButton: false,
											type: "success",
											timer: 1000
										});

										//점검항목 로딩
										var classSn = $("#tbl_evalClass tbody .selected").attr("sn");
										fn_load_evalItemList(classSn, "")

									}else{
										swal({
											title: i18next.t(data.code),
											confirmButtonColor: "#f44336",
											closeOnConfirm: true,
											type: "error"
										});
									}
								}
								, error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							});

						}
					});
				});

				$(".content").on("change","#panel_evalItem select[name='repeatDoc']",function(){
					if (String($(this).val())=="0")
					{
						$("#panel_evalItem .span_repeatDocDateType").hide();
					}else{
						$("#panel_evalItem .span_repeatDocDateType").show();
					}
				});

				//점검항목 선택시 Action
				$(".content").on("click", "#tbl_evalItem tbody tr", function(){
					if(! $(this).hasClass("no-data")){
						$(this).addClass("selected");
						$(this).siblings().removeClass("selected");

						$("#evalItemNm").val($(this).find("td:eq(1)").text());				//점검항목
						$("#evalItemTerm").val($(this).find("td:eq(2)").attr("dueDay"));	//처리기간

						//필수여부
						var isEssential = $(this).attr("isEssential")=="1"?true:false;
						$("#panel_evalItem input[name='isEssential']").prop("checked", isEssential);

						//정기문서여부
						$("#panel_evalItem select[name='repeatDoc']").val($(this).attr("repeatDoc"));
						$("#panel_evalItem select[name='repeatDocDateType']").val($(this).attr("repeatDocDateType"));


						//후속작업 로딩
						var classSn = $("#tbl_evalClass tbody .selected").attr("sn");
						var itemSn = $("#tbl_evalItem tbody .selected").attr("sn");
						fn_load_evalAction(classSn, itemSn);

						if (String($(this).attr("repeatDoc"))=="0")
						{
							$("#panel_evalItem .span_repeatDocDateType").hide();
						}else{
							$("#panel_evalItem .span_repeatDocDateType").show();
						}

						$("#btn_s3_cancel").hide();
						$("#btn_s3_insert").show();
						$("#btn_s3_delete").show();

						var authInfo = fn_getAuthInfo($(this).attr("regid"));
						if (authInfo.modify_auth != "yes"){
							$("#btn_s3_save").hide();
						}
						if (authInfo.del_auth != "yes"){
							$("#btn_s3_delete").hide();
						}

						fn_resetForm();
					}
				});
				/* -------------------------------- // 3. 점검항목 관련 ---------------------------------- */


				/* ----------------------------------- 4. 후속작업 관련 ---------------------------------- */
				var lastSelectedEvalAction = "";
				//추가버튼
				$(".content").on("click", "#btn_s4_insert", function(){

					//취소 처리를 위하여 현재 선택 일련번호 저장
					lastSelectedEvalAction = $("#tbl_evalAction tbody .selected").attr("sn");

					$("#evalActionNm").val("");
					$("#evalActionTerm").val("");
					$("#evalActionNm").focus();
					$("#tbl_evalAction tbody tr").removeClass("selected");	//선택해제

					$("#btn_s4_insert").hide();
					$("#btn_s4_delete").hide();
					$("#btn_s4_cancel").show();

					if (aa == "yes"){
						$("#btn_s4_save").show();
					}else{
						$("#btn_s4_save").hide();
					}
					$("#panel_evalAction input[name='isEssential']").prop("checked", false);

					//정기문서여부
					$("#panel_evalAction select[name='repeatDoc']").val("0");
					$("#panel_evalAction select[name='repeatDocDateType']").val("1");
					$("#panel_evalAction .span_repeatDocDateType").hide();

					//fn_load_evalItem("");	//점검항목 초기화
				});

				//취소버튼
				$(".content").on("click", "#btn_s4_cancel", function(){
					$("#tbl_evalAction tbody tr[sn='"+lastSelectedEvalAction+"'] .td_actionNm").click();

					fn_resetForm();
				});

				//저장버튼
				$(".content").on("click", "#btn_s4_save", function(){
					if($("#evalActionNm").valid() && $("#evalActionTerm").valid()){
						var dmlType = "";
						var sn	= "";
						var alertStr = "";
						var classSn = $("#tbl_evalClass tbody .selected").attr("sn");


						if ($("#tbl_evalAction tbody .selected").length > 0){
							dmlType = "modify";
							sn = $("#tbl_evalAction tbody .selected").attr("sn");
							alertStr = i18next.t("msg.editOk");
						}else{
							dmlType = "add";
							sn = "";
							alertStr = i18next.t("msg.saveOk");
						}

						$.ajax({
							type :'post'											// Post로 데이터 전달(get,post방식)
							//, async : false											// 비동기식으로 ajax 요청
							//, url: "/Module/UserModule/FildWork/WorkConfig/dml/evalActionSaveDml.do"
							, url: "/module/usermodule/fieldwork/workconfig/dml/evalActionSaveDml"
							, data : {
								"dmlType": dmlType,
								"classSn" : classSn,
								"sn" : sn,
								"evalActionNm": $("#evalActionNm").val(),
								"evalActionTerm": $("#evalActionTerm").val(),
								"isEssential" : $("#panel_evalAction input[name='isEssential']:checked").val(),
								"repeatDoc" : $("#panel_evalAction select[name='repeatDoc']").val(),
								"repeatDocDateType" : $("#panel_evalAction select[name='repeatDocDateType']").val(),
								"SSID" : $("#gssid").val()
							}
							, dataType:"json"
							, success:function( data ){
								if(data.result == "success"){
									swal({
										title: i18next.t("msg.saveOk"),
										showConfirmButton: false,
										type: "success",
										timer: 1000
									});

									//후속작업 재로딩
									var itemSn = $("#tbl_evalItem tbody .selected").attr("sn");
									fn_load_evalAction(classSn, itemSn);

								}else{
									swal({
										title: i18next.t(data.code),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							 }
							 , error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
							 }
						});
					}
				});

				//삭제버튼
				$(".content").on("click", "#btn_s4_delete", function(){
					swal({
						title: i18next.t("msg.delYn"),
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#EF5350",
						confirmButtonText: i18next.t("btn.ok"),
						cancelButtonText: i18next.t("btn.cancel"),
						closeOnConfirm: false,
						closeOnCancel: true
					},function(isConfirm){
						if(isConfirm){

							var sn		= $("#tbl_evalAction .selected").attr("sn");
							var itemSn	= $("#tbl_evalItem .selected").attr("sn");

							$.ajax({
								type: "POST",
								//url: "/Module/UserModule/FildWork/WorkConfig/dml/evalActionSaveDml.do",
								url: "/module/usermodule/fieldwork/workconfig/dml/evalActionSaveDml",
								data: {
									"dmlType" : "del",
									"sn" : sn,
									"itemSn" : itemSn,
									"ssid" : $("#gssid").val()
								},
								dataType: "json",
								success:function(data) {

									if(data.result == "success"){
										swal({
											title: i18next.t("msg.delOk"),
											showConfirmButton: false,
											type: "success",
											timer: 1000
										});

										//후속작업 로딩
										var classSn = $("#tbl_evalClass tbody .selected").attr("sn");
										var itemSn = $("#tbl_evalItem tbody .selected").attr("sn");
										fn_load_evalAction(classSn, itemSn);

									}else{
										swal({
											title: i18next.t(data.code),
											confirmButtonColor: "#f44336",
											closeOnConfirm: true,
											type: "error"
										});
									}
								}
								, error:function(xhr,textStatus){
									swal({
										title: i18next.t("msg.DbError"),
										confirmButtonColor: "#f44336",
										closeOnConfirm: true,
										type: "error"
									});
								}
							});

						}
					});
				});

				$(".content").on("change","#panel_evalAction select[name='repeatDoc']",function(){
					if (String($(this).val())=="0")
					{
						$("#panel_evalAction .span_repeatDocDateType").hide();
					}else{
						$("#panel_evalAction .span_repeatDocDateType").show();
					}
				});

				//후속작업 선택시 Action
				$(".content").on("click", "#tbl_evalAction tbody .td_actionNm", function(){
					var oTr = $(this).parent();
					if(! $(oTr).hasClass("no-data")){
						$(oTr).addClass("selected");
						$(oTr).siblings().removeClass("selected");

						$("#evalActionNm").val($(oTr).find("td:eq(2)").text());				//후속작업
						$("#evalActionTerm").val($(oTr).find("td:eq(3)").attr("dueDay"));		//처리기간

						//필수여부
						var isEssential = $(oTr).attr("isEssential")=="1"?true:false;
						$("#panel_evalAction input[name='isEssential']").prop("checked", isEssential);

						//정기문서여부
						$("#panel_evalAction select[name='repeatDoc']").val($(oTr).attr("repeatDoc"));
						$("#panel_evalAction select[name='repeatDocDateType']").val($(oTr).attr("repeatDocDateType"));

						//fn_load_evalClass($(this).attr("sn"));	//후속작업 로딩

						if (String($(oTr).attr("repeatDoc"))=="0")
						{
							$("#panel_evalAction .span_repeatDocDateType").hide();
						}else{
							$("#panel_evalAction .span_repeatDocDateType").show();
						}

						$("#btn_s4_cancel").hide();
						$("#btn_s4_insert").show();
						$("#btn_s4_delete").show();

						var authInfo = fn_getAuthInfo($(oTr).attr("regid"));
						if (authInfo.modify_auth != "yes"){
							$("#btn_s4_save").hide();
						}
						if (authInfo.del_auth != "yes"){
							$("#btn_s4_delete").hide();
						}

						fn_resetForm();
					}
				});

				//후속작업선택저장 버튼
				$(".content").on("click", "#btn_action_select_save", function(){
					var dmlType = "actionMapping";
					var itemSn	= $("#tbl_evalItem tbody .selected").attr("sn");	//항목일련번호

					//선택된 후속작업일련번호
					var checkedActonSn = $.map($(':checkbox[name=chkActionSn]:checked'), function(n, i){
						  return n.value;
					}).join(',');

					$.ajax({
						type :'post'											// Post로 데이터 전달(get,post방식)
						//, async : false											// 비동기식으로 ajax 요청
						//, url: "/Module/UserModule/FildWork/WorkConfig/dml/evalActionSaveDml.do"
						, url: "/module/usermodule/fieldwork/workconfig/dml/evalActionSaveDml"
						, data : {
							"dmlType": dmlType,
							"itemSn" : itemSn,
							"checkedActonSn" : checkedActonSn,
							"SSID" : $("#gssid").val()
						}
						, dataType:"json"
						, success:function( data ){
							if(data.result == "success"){
								swal({
									title: i18next.t("msg.saveOk"),
									showConfirmButton: false,
									type: "success",
									timer: 1000
								});

							}else{
								alert(i18next.t(data.code));
							}
						 }
						 , error:function(xhr,textStatus){
								swal({
									title: i18next.t("msg.DbError"),
									confirmButtonColor: "#f44336",
									closeOnConfirm: true,
									type: "error"
								});
						 }
					});

				});
				/* -------------------------------- // 4. 후속작업 관련 ---------------------------------- */

				//validate init
				valid_frmFildWorkEvalConfig();

			});

			//평가유형 로딩
			function fn_load_evalType(){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					, async : false											// 동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/evalType.page"
					, url: "/module/usermodule/fieldwork/workconfig/evalType"
					, data : {
					}
					, dataType:"html"
					, success:function( data ){
						$("#panel_evalType").html(data).localize();

						//niceScroll
						if(!isMobile){//데스트탑 만.
							$("#tbl_evalType").closest("div").niceScroll();
						}

						//평가유형 목록 로딩
						fn_load_evaltypeList("");
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}

			//평가유형 목록 로딩
			function fn_load_evaltypeList(selSn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/getEvalTypeList.page"
					, url: "/module/usermodule/fieldwork/workconfig/getEvalTypeList"
					, data : {}
					, dataType:"html"
					, success:function( data ){
						$("#tbl_evalType tbody").html(data);

						//데이타가 있을경우
						if ($("#tbl_evalType tbody tr:not(.no-data)").length > 0){
							if (selSn > ""){
								$("#tbl_evalType tbody tr[sn='"+selSn+"']").click();	//해당일련번호 선택
							}else{
								$("#tbl_evalType tbody tr:eq(0)").click();	//첫번째 항목 선택
							}
						}else{
							fn_load_evalClass("");			//점검분류 목록 초기화
							fn_load_evalItem("");			//점검항목 목록 초기화
							fn_load_evalAction("", "");	//후속작업 목록 초기화

							//데이터가 없는 경우 버튼 제어
							$("#btn_s1_insert").hide();
							$("#btn_s1_delete").hide();
							$("#btn_s1_cancel").hide();
						}
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}


			//점검분류 로딩
			function fn_load_evalClass(sn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/evalClass.page"
					, url: "/module/usermodule/fieldwork/workconfig/evalClass"
					, data : {
						"typeSn": sn
					}
					, dataType:"html"
					, success:function( data ){
						$("#panel_evalClass").html(data).localize();

						//niceScroll
						if(!isMobile){//데스트탑 만.
							$("#tbl_evalClass").closest("div").niceScroll();
						}

						if (aa == "yes"){
							$("#btn_s2_save").show();
						}else{
							$("#btn_s2_save").hide();
						}

						//점검분류 목록 로딩
						if (sn != ""){
							fn_load_evalClassList(sn, "");
						}
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}

			//점검분류 목록 로딩
			function fn_load_evalClassList(sn, selSn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/getEvalClassList.page"
					, url: "/module/usermodule/fieldwork/workconfig/getEvalClassList"
					, data : {
						"typeSn": sn
					}
					, dataType:"html"
					, success:function( data ){
						$("#tbl_evalClass tbody").html(data);
						$("#tbl_evalClass tbody").localize();

						//데이타가 있을경우
						if ($("#tbl_evalClass tbody tr:not(.no-data)").length > 0){
							if (selSn > ""){
								$("#tbl_evalClass tbody tr[sn='"+selSn+"']").click();	//해당일련번호 선택
							}else{
								$("#tbl_evalClass tbody tr:eq(0)").click();	//첫번째 항목 선택
							}
						}else{
							fn_load_evalItem("");	//점검분류가 없는경우 점검항목을 초기화
							fn_load_evalAction("", "");	//후속작업 초기화

							//첨부파일 초기화
							fn_load_fileModal("", "");	//점검분류 첨부파일 로딩

							//데이터가 없는 경우 버튼 제어
							$("#btn_s2_insert").hide();
							$("#btn_s2_delete").hide();
							$("#btn_s2_cancel").hide();
						}
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}

			//점검분류 파일모달 로딩
			function fn_load_fileModal(sn, regid){
					$.ajax({
						type: "POST",
						//url: "/Module/UserModule/FildWork/WorkConfig/getFileForm.page",
						url: "/module/usermodule/fieldwork/workconfig/getFileForm",
						data: {
							"sn" : sn,
							"regid" : regid
						},
						dataType: "html",
						success:function(data) {
							$("#modal_file").html(data);
						}
					});
			}


			//점검분류 저장처리(파일 업로드 후에 호출)
			function fn_save_evalClass(){
				//점검분류 저장처리
				var dmlType = "";
				var sn = "";
				var alertStr = "";
				var typeSn = $("#tbl_evalType tbody .selected").attr("sn");
				var evalMethod = $.map($(':checkbox[name=evalMethod]:checked'), function(n, i){
					  return n.value;
				}).join(',');

				/*
				var methodTypeCode = $.map($('#panel_evalClass select[name=methodTypeCode] option:selected'), function(n, i){
					  return n.value;
				}).join(',');
				*/

				methodTypeCode = ""
				methodTypeCode += $('#panel_evalClass select[name=methodTypeCode1] option:selected').val();
				methodTypeCode += ",";
				methodTypeCode += $('#panel_evalClass select[name=methodTypeCode2] option:selected').val();
				methodTypeCode += ",";
				methodTypeCode += $('#panel_evalClass select[name=methodTypeCode3] option:selected').val();
				methodTypeCode += ",";
				methodTypeCode += $('#panel_evalClass select[name=methodTypeCode4] option:selected').val();


				if ($("#tbl_evalClass tbody .selected").length > 0){
					dmlType = "modify";
					sn = $("#tbl_evalClass tbody .selected").attr("sn");
					alertStr = i18next.t("msg.editOk");
				}else{
					dmlType = "add";
					sn = "";
					alertStr = i18next.t("msg.saveOk");
				}

				$.ajax({
					type :'post'												// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/dml/evalClassSaveDml.do"
					, url: "/module/usermodule/fieldwork/workconfig/dml/evalClassSaveDml"
					, data : {
						"dmlType": dmlType,
						"typeSn" : typeSn,
						"sn" : sn,
						"evalClassNm": $("#evalClassNm").val(),
						"evalMethod": evalMethod,
						"methodTypeCode" : methodTypeCode,
						"SSID" : $("#gssid").val()
					}
					, dataType:"json"
					, success:function( data ){
						$.unblockUI();							//block-ui hide

						if(data.result == "success"){
							swal({
								title: i18next.t("msg.saveOk"),
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});


							//점검분류 목록 재로딩
							var typeSn = $("#tbl_evalType tbody .selected").attr("sn");
							fn_load_evalClassList(typeSn, sn);

						}else{

							swal({
								title: i18next.t(data.code),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
							//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"});
						}
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
							//$.ajax({url: "/Common/TempFileDelete.do"});	//session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"});
					 }
				});
			}


			//점검항목 로딩
			function fn_load_evalItem(sn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/evalItem.page"
					, url: "/module/usermodule/fieldwork/workconfig/evalItem"
					, data : {
						"classSn": sn
					}
					, dataType:"html"
					, success:function( data ){
						$("#panel_evalItem").html(data).localize();

						//niceScroll
						if(!isMobile){//데스트탑 만.
							$("#tbl_evalItem").closest("div").niceScroll();
						}

						if (aa == "yes"){
							$("#btn_s3_save").show();
						}else{
							$("#btn_s3_save").hide();
						}

						//점검항목 목록 로딩
						if (sn != ""){
							fn_load_evalItemList(sn, "");
						}
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}

			//점검항목 목록 로딩
			function fn_load_evalItemList(sn, selSn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/getEvalItemList.page"
					, url: "/module/usermodule/fieldwork/workconfig/getEvalItemList"
					, data : {
						"classSn": sn
					}
					, dataType:"html"
					, success:function( data ){
						$("#tbl_evalItem tbody").html(data).localize();

						if ($("#tbl_evalItem tbody tr:not(.no-data)").length > 0){
							if (selSn > ""){
								$("#tbl_evalItem tbody tr[sn='"+selSn+"']").click();	//해당일련번호 선택
							}else{
								$("#tbl_evalItem tbody tr:eq(0)").click();	//첫번째 항목 선택
							}
						}else{
							//후속작업 로딩 초기화
							fn_load_evalAction(sn, "");

							//데이터가 없는 경우 버튼 제어
							$("#btn_s3_insert").hide();
							$("#btn_s3_delete").hide();
							$("#btn_s3_cancel").hide();

						}

						/*
						//후속작업 로딩
						var classSn = sn;
						var itemSn = $("#tbl_evalItem tbody .selected").attr("sn");
						fn_load_evalAction(classSn, itemSn, "");
						*/
					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}


			//후속작업 로딩
			function fn_load_evalAction(classSn, itemSn){
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					//, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/evalAction.page"
					, url: "/module/usermodule/fieldwork/workconfig/evalAction"
					, data : {
						"classSn": classSn,
						"itemSn": itemSn
					}
					, dataType:"html"
					, success:function( data ){
						$("#panel_evalAction").html(data).localize();

						//niceScroll
						if(!isMobile){//데스트탑 만.
							$("#tbl_evalAction").closest("div").niceScroll();
						}

						if (aa == "yes"){
							$("#btn_s4_save").show();
						}else{
							$("#btn_s4_save").hide();
						}

						$("#btn_s4_insert").hide();
						$("#btn_s4_delete").hide();
						$("#btn_s4_cancel").hide();


					 }
					 , error:function(xhr,textStatus){
							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});
			}


			//글권한 조회
			function fn_getAuthInfo(regId){
				var rObj;
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					, async : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/FildWork/WorkConfig/checkAuth.do"
					, url: "/module/usermodule/fieldwork/workconfig/checkAuth"
					, data : {
						"regId": regId
					}
					, dataType:"json"
					, success:function( data ){
						rObj =  data;
					 }
				});
				return rObj
			}


			var validator_frmFildWorkEvalConfig;
			function valid_frmFildWorkEvalConfig(){
				validator_frmFildWorkEvalConfig = $("#frmFildWorkEvalConfig").validate({
					ignore: '', // ignore hidden fields
					errorClass: 'validation-error-label',
					successClass: 'validation-valid-label',
					highlight: function(element, errorClass) {
						$(element).removeClass(errorClass);
					},
					unhighlight: function(element, errorClass) {
						$(element).removeClass(errorClass);
					},

					// Different components require proper error label placement
					errorPlacement: function(error, element) {
						// Styled checkboxes, radios, bootstrap switch
						if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
							if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
								error.appendTo( element.parent().parent().parent().parent() );
							}
							 else {
								error.appendTo( element.parent().parent().parent().parent().parent() );
							}
						}

						// Unstyled checkboxes, radios
						else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
							error.appendTo( element.parent().parent().parent() );
						}

						// Input with icons and Select2
						else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
							error.appendTo( element.parent() );
						}

						// Inline checkboxes, radios
						else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
							error.appendTo( element.parent().parent() );
						}

						// Input group, styled file input
						else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
							error.appendTo( element.parent().parent() );
						}

						else if ($(element).attr("name") == "evalItemTerm"){
							error.insertAfter($(element).next());
						}
						else if ($(element).attr("name") == "evalActionTerm"){
							error.insertAfter($(element).next());
						}

						else {
							error.insertAfter(element);
						}
					},
					validClass: "validation-valid-label",
					rules: {
						evaltypeNm: {
							required: true
						},
						evalClassNm: {
							required: true
						},
						evalItemNm: {
							required: true
						},
						evalItemTerm: {
							required: true,
							number: true
						},
						evalActionNm: {
							required: true
						},
						evalActionTerm: {
							required: true,
							number: true
						}
					},
					submitHandler: function (form) {
						//submit_revAdd();
					}
				});
			}

			function fn_resetForm(){
				validator_frmFildWorkEvalConfig.resetForm();
			}