define(function() {
	
	var communityScheduleWritePopup = {
			multiValues        : [],
			init: function(){
				var _this              = this;
				var isNew              = $('#writePopup_scheduleNew').val();
				var gongguSeqno        = $("#gongguSeqno").val();
				var index_selected_day = $("#index_selected_day").val();
				var companyYn          = $("#companyYn").val(); 
				
				var write_loginSeqno   = $("#write_loginSeqno").val();
				var write_loginUserNm  = $("#write_loginUserNm").val();
				
				//일정 날짜
				$("#write_timeFrom").kendoDatePicker({
					format: 'yyyy-MM-dd',
				    change: function() {
				        var value = this.value();
				        $("#write_timeTo").val(kendo.toString(value, "yyyy-MM-dd"));
				    }					
				});
				$("#write_timeTo").kendoDatePicker({format: 'yyyy-MM-dd'});
				
				//시간 설정
				var TIMES = [];
				for(var i=0; i<24; i++){
					for(var ii=0; ii<2; ii++){
						
						var mmss = "";
						if(ii == 0){
							if(i<10){
								mmss = "0"+i+":00";
							}else{
								mmss = i+":00";
							}
						}else{
							if(i<10){
								mmss = "0"+i+":30";
							}else{
								mmss = i+":30";
							}
						}
						
						TIMES.push({label: mmss, value: mmss})
//						console.log("mmss",mmss);
					}
				}
				
				$('#write_timeFrom_mmss').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: TIMES,
					 change: function(e) {						 
						 $('#write_timeTo_mmss').data("kendoDropDownList").value(this.value());
					 }					 
				}).data("kendoDropDownList");
				
				$('#write_timeTo_mmss').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: TIMES,
				}).data("kendoDropDownList");
				
				
				//반복 날짜
				$("#write_repeat_sdate").kendoDatePicker({
					format: 'yyyy-MM-dd',
					change:function(e){
						var selected_day = kendo.toString(this.value(), "yyyy-MM-dd");
						communityScheduleWritePopup.wmSetting(selected_day);
						
						var write_repeat_edate_value = $("#write_repeat_edate").data("kendoDatePicker").value();
						var write_repeat_sdate_value_date = new Date(selected_day);
						var write_repeat_edate_value_date = new Date(write_repeat_edate_value);
						if(write_repeat_sdate_value_date > write_repeat_edate_value_date){ //시작날짜가 종료날짜보다 크거나 같으면
							var second_date = new Date(write_repeat_edate_value);
							    second_date.setMonth(second_date.getMonth()+1);
						    var second_date_string = moment(second_date).format('YYYY-MM-DD');
							$("#write_repeat_edate").data("kendoDatePicker").value(second_date_string);
						}
					}
				});
				$("#write_repeat_edate").kendoDatePicker({
					format: 'yyyy-MM-dd'
				});
				
				//Tag 창 생성
				_this.communityScheduleWriteAttend = $("#communityScheduleWriteAttend").kendoMultiSelect({
					autoClose: true,
					dataSource : {
		                batch: false,
		                schema: {
		                    model: {
		                        id: "seqNo",
		                        fields: {
		                        	seqNo: { type: "number" },
		                        	name: { type: "string" }
		                        }
		                    }
		                }
		            },
		            deselect: function(e){
		            	if("A" == e.dataItem.type){
		            		kendo.alert('일정 생성자는 삭제 할수없습니다.');
		            		e.preventDefault();
		            	}else{
		            		e.preventDefault();
		                 	var dataItem = e.dataItem;
		                 	
		                 	var datas = _this.communityScheduleWriteAttend.dataSource.data();
		         			datas = $.grep(datas, function(data) { return data.seqNo != dataItem.seqNo; });
		         			
		         			_this.communityScheduleWriteAttend.dataSource.data(datas);
		            	}
	                },
		            dataTextField: "name",
	                dataValueField: "seqNo"
				}).data("kendoMultiSelect");
				
				if(isNew == 'true'){
					//일정 날짜
					$("#write_timeFrom").data("kendoDatePicker").value(index_selected_day);
					$("#write_timeTo").data("kendoDatePicker").value(index_selected_day);
					
					//반복 시작 날짜
					$("#write_repeat_sdate").data("kendoDatePicker").value(index_selected_day);
					//반복 종료 날짜
					var second_date = new Date(index_selected_day);
					    second_date.setMonth(second_date.getMonth()+1);
				    var second_date_string = moment(second_date).format('YYYY-MM-DD');
					$("#write_repeat_edate").data("kendoDatePicker").value(second_date_string);
					
					//로그인한 사람 추가
					var param = {seqNo : write_loginSeqno, name : write_loginUserNm , type : "A"};
					$("#communityScheduleWriteAttend").getKendoMultiSelect().dataSource.add(param);
					$("#communityScheduleWriteAttend").getKendoMultiSelect().value(param.seqNo);
					communityScheduleWritePopup.multiValues.push(param.seqNo);
					
					//일정 공지현장 목록 로딩
					_this.loadNoticeGongguSetting("").done(function(noticeGongguList){
						_this.makeNoticeGongguList(noticeGongguList);
					});
				}else{
					
					var seqno = $("#write_seqno").val();
					_this.getAttendList(seqno).done(function(data) {
						$.map( data, function( r ) {
							var param = {seqNo : r.Indv_ID,name : r.Indv_Nm , type : r.Indv_Type};
							$("#communityScheduleWriteAttend").getKendoMultiSelect().dataSource.add(param);
							communityScheduleWritePopup.multiValues.push(param.seqNo);
						 });
						$("#communityScheduleWriteAttend").getKendoMultiSelect().value(communityScheduleWritePopup.multiValues);
					});
					
					
					//종일체크여부에 따라 enable
					var writePopup_dayYn = $("#writePopup_dayYn").val();
					var write_timeFrom_mmss = $("#write_timeFrom_mmss").data("kendoDropDownList");
					var write_timeTo_mmss   = $("#write_timeTo_mmss").data("kendoDropDownList");

					if(writePopup_dayYn == "true"){
						write_timeFrom_mmss.enable(false);
						write_timeTo_mmss.enable(false);
					}else{
						write_timeFrom_mmss.enable(true);
						write_timeTo_mmss.enable(true);
					}
					
					//일정 공지현장 목록 로딩
					_this.loadNoticeGongguSetting(seqno).done(function(noticeGongguList){
						_this.makeNoticeGongguList(noticeGongguList);
					});					
					
				}
				
				//반복빈도
				var repeatFrequencyDataSource = [
					{value : "d", label : "매일" },
					{value : "w", label : "매주" },
					{value : "m", label : "매월" },
					{value : "y", label : "매년" }
				]
				$('#popup_schedule_repeat_frequency').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: repeatFrequencyDataSource,
					 change: function(e){
						 var f_value = this.value();
						 
						 $("#popup_schedule_repeat_frequency_wm").css("display","none");
						 $("#popup_schedule_repeat_frequency_w").css("display","none");
						 $("#popup_schedule_repeat_frequency_m").css("display","none");
						 
						 if("d" == f_value){
							 $("#popup_schedule_repeat_cycle_text").html("일");
						 }else if("w" == f_value){
							 $("#popup_schedule_repeat_frequency_wm").css("display","block");
							 $("#popup_schedule_repeat_frequency_w").css("display","block");
							 $("#popup_schedule_repeat_cycle_text").html("주");
						 }else if("m" == f_value){
							 $("#popup_schedule_repeat_frequency_wm").css("display","block");
							 $("#popup_schedule_repeat_frequency_m").css("display","block");
							 $("#popup_schedule_repeat_cycle_text").html("월");
						 }else{
							 $("#popup_schedule_repeat_cycle_text").html("년");
						 }
					 }
				});
				
				//반복주기
				var repeatCycleDataSource = [
				]
				for(var i=1; i<31; i++){
					var tempData = {value : i, label : i };
					repeatCycleDataSource.push(tempData);
				}
				$('#popup_schedule_repeat_cycle').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: repeatCycleDataSource
				});
				
				$.scheduleWriteGetCode();
				
//				UI.getCode(['OPEN_TYPE', 'ALARM_TYPE'],[gongguSeqno], true).done(function(coeds){
//					
//					//공개여부
//					$('#popup_schedule_write_openType').kendoDropDownList({
//						 dataTextField: 'label',
//						 dataValueField: 'value',
//						 dataSource: coeds.OPEN_TYPE,
//					});
//					
//					//알림 타입
//					var ALARM_TYPE_VALUE = [{label: "없음", value: "0"}].concat(coeds.ALARM_TYPE);
//					$('#popup_schedule_write_alarmType').kendoDropDownList({
//						 dataTextField: 'label',
//						 dataValueField: 'value',
//						 dataSource: coeds.ALARM_TYPE,
//					});
//				});
				
				//공개여부
				var OPENTYPE_VALUE = [{value: "Z", label: "비공개"},{value: "A", label: "공개"}];
				$('#popup_schedule_write_openType').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: OPENTYPE_VALUE,
				});
				
				//알림 타입
				var ALARMTYPE_VALUE = [									
										  {value: "", label: "= 선택 ="}
										, {value: "00",  label: "즉시"}
										, {value: "AM7", label: "당일오전7시"}
										, {value: "D01", label: "하루전"}										
									  ];
				$('#popup_schedule_write_alarmType').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 dataSource: ALARMTYPE_VALUE,
				});
				
				
				var popup_schedule_repeat = $("#popup_schedule_repeat");
				popup_schedule_repeat.kendoWindow({
					width: "400px",
					modal: true,
					//height: '320px',
					iframe: true,
					resizable: false,
					title: "반복",
					visible: false
				});
				
				var popup_write_update_info = $("#popup_write_update_info");
				popup_write_update_info.kendoWindow({
						width: "560px",
						modal: true,
						height: '',
						iframe: true,
						resizable: true,
						title: "반복일정 수정",
						visible: false
				}).data("kendoWindow")
				
				_this.create();
				_this.addEvent();
				
			},
			create : function() {
				var _this = this;
				
			},
			addEvent : function() {
				var _this = this;
				var isNew = $('#writePopup_scheduleNew').val();
				
				
				//공통코드 저장
				$("#btn_popup_schedule_dtl_save").off("click");
				$("#btn_popup_schedule_dtl_save").on("click",function(){
					
					var totalcode_seqno = $("#index_totalcode_seqno").val();
					var dtl_code_name   = $("#dtl_code_name").val();
					var property_1     = $("#color_picker").val();
					
					if(dtl_code_name == ""){
						kendo.alert("일정구분 명을 입력하세요");
						$("#dtl_code_name").focus();
						return;
					}
					
					var params = {
							projectSeqno     : "1",
							totalCodeSeqno   : totalcode_seqno,
							totalCodeMstCode : "SCH_KIND",
							dtlCodeName      : dtl_code_name,
							Property1        : property_1
						};
					
					_this.addCodeDtl(params).done(function(data) {
						$.scheduleGetCode();
						$.scheduleWriteGetCode();
						$('#calendar').fullCalendar( 'refetchEvents' );
						$("#schedule_select_body").toggle();
						kendo.alert('일정구분이 추가되었습니다.');	
					});
				});
				
				//공통코드 삭제
				$("#btn_popup_schedule_dtl_delete").off("click");
				$("#btn_popup_schedule_dtl_delete").on("click",function(){
					
					kendo.confirm("일정구분을 삭제하시겠습니까?").then(function() {
						var dtlCode = $("#write_kindCd").val();
						var params = {
								dtlCode     : dtlCode
							};
						_this.destoryCodeDtl(params).done(function(data) {
							$.scheduleGetCode();
							$.scheduleWriteGetCode();
							$('#calendar').fullCalendar( 'refetchEvents' );
							kendo.alert('일정구분이 삭제되었습니다.');	
						});
					});
					
				});
				
				//사용자 추가
				$("#btn_schedle_write_attend").off("click");
				$("#btn_schedle_write_attend").on("click",function(){
					
					UI.showObsModal({
						target : "pop_osbSearch", 
						callback : function(data){
							$.map( data, function( r ) {
								var param = {seqNo : r.id,name : r.name , type : "B"};
								$("#communityScheduleWriteAttend").getKendoMultiSelect().dataSource.add(param);
								communityScheduleWritePopup.multiValues.push(param.seqNo);
							 });
							$("#communityScheduleWriteAttend").getKendoMultiSelect().value(communityScheduleWritePopup.multiValues);
						}
					});
				});
				
				//종일선택
				$("#write_chk_dayYn").click(function(){
					
					var write_timeFrom_mmss = $("#write_timeFrom_mmss").data("kendoDropDownList");
					var write_timeTo_mmss = $("#write_timeTo_mmss").data("kendoDropDownList");

					if($("input:checkbox[id='write_chk_dayYn']").is(":checked")){
//						write_timeFrom_mmss.readonly(true);
						write_timeFrom_mmss.enable(false);
						write_timeTo_mmss.enable(false);
					}else{
//						write_timeFrom_mmss.readonly(false);
						write_timeFrom_mmss.enable(true);
						write_timeTo_mmss.enable(true);
					}
					
				});
				
				//반복 팝업
				$("#btn_popup_schedule_repeat").click(function(){
					
//					var index_selected_day = $("#index_selected_day").val();
					var index_selected_day = $("#write_timeFrom").val();
					
					 if($("input:checkbox[id='write_chk_repeatYn']").is(":checked")){
//						 $("#popup_schedule_repeat").data('kendoWindow').center().open();
					 }else{
						 //매월 값 설정
						 communityScheduleWritePopup.wmSetting(index_selected_day);
						 
						//반복 시작 날짜
						$("#write_repeat_sdate").data("kendoDatePicker").value(index_selected_day);
						//반복 종료 날짜
						var second_date = new Date(index_selected_day);
						    second_date.setMonth(second_date.getMonth()+1);
					    var second_date_string = moment(second_date).format('YYYY-MM-DD');
						$("#write_repeat_edate").data("kendoDatePicker").value(second_date_string);
						 
						$("#popup_schedule_repeat").data('kendoWindow').center().open();
					 }
				});
				
				//반복(수정) 버튼 이벤트
				$("#btn_popup_schedule_repeat_edit").click(function(){
					 $("#popup_schedule_repeat").data('kendoWindow').center().open();
				});
				
				//반복 저장
				$("#popup_schedule_repeat_save").click(function(){
					var popup = $("#popup_schedule_repeat").data('kendoWindow');
					popup.close();
				});
				
				//반복 닫기
				$("#popup_schedule_repeat_close").click(function(){
					var popup = $("#popup_schedule_repeat").data('kendoWindow');
					popup.close();
				});
				
				//닫기
				$("#popup_schedule_write_close").click(function(){
					var popup = $("#popup_schedule_write").data('kendoWindow');
					popup.close();
				});
				
				//저장
				$("#btn_popup_schedule_save").off("click");
				$("#btn_popup_schedule_save").on("click",function(){
					
					var repeatYn = $("#writePopup_repeatYn").val();
					if(repeatYn == "true"){  //반복 옵션일경우
						$("#popup_write_update_info").data('kendoWindow').center().open();
					}else{
						 //종일체크
						 if($("input:checkbox[id='write_chk_dayYn']").is(":checked")){
							 $("#write_dayYn").val(true);
						 }else{
							 $("#write_dayYn").val(false);
						 }
						
						 //반복체크
						 if($("input:checkbox[id='write_chk_repeatYn']").is(":checked")){
							 $("#write_repeatYn").val(true);
						 }else{
							 $("#write_repeatYn").val(false);
						 }
						 
						 //반복일 체크
						 var repeatDay = "";
						 var repeat_frequency = $("#popup_schedule_repeat_frequency").val();
						 if(repeat_frequency == "w"){  //매주 반복일 값 설정
							 if($("input:checkbox[id='day_mon']").is(":checked")){
								 repeatDay += "2,"
							 }
							 if($("input:checkbox[id='day_tue']").is(":checked")){
								 repeatDay += "3,"
							 }
							 if($("input:checkbox[id='day_wed']").is(":checked")){
								 repeatDay += "4,"
							 }
							 if($("input:checkbox[id='day_thu']").is(":checked")){
								 repeatDay += "5,"
							 }
							 if($("input:checkbox[id='day_fri']").is(":checked")){
								 repeatDay += "6,"
							 }
							 if($("input:checkbox[id='day_sat']").is(":checked")){
								 repeatDay += "7,"
							 }
							 if($("input:checkbox[id='day_sun']").is(":checked")){
								 repeatDay += "1,"
							 }
						 }else if(repeat_frequency == "m"){  //매월 선택시 반복일 값
							 var month_repeat = $(":input:radio[name=month_repeat]:checked").val();
							 repeatDay = month_repeat;
						 }
						 $("#repeatDay").val(repeatDay);
						 
						 
						//공지현장 데이터 세팅						
						if($("#companyYn").val() == "Y"){
							var mmoduleconfigSeqno = '';												
							if($("input[name='notic']:checked").length == $("input[name='notic']").length){	//체크한 현장이 전체현장이면 ALL
								mmoduleconfigSeqno = "ALL";							
							}else{
								$('input[name="notic"]').each(function(i) {								
									if ($(this).is(':checked')) {								
										if(mmoduleconfigSeqno != ''){
											mmoduleconfigSeqno += ','
										}
										mmoduleconfigSeqno += $(this).val();
									}												 
								});					
							}
							$("#mmoduleconfigSeqno").val(mmoduleconfigSeqno);												
						}
						 
						 
						var $form              = $('#scheduleForm');
						var $repeat_form       = $('#repeatForm');
						var formData           = UI.Validator($form).value();
						var repeat_formData    = UI.Validator($repeat_form).value();												
						
						//참가자
						var multi = $("#communityScheduleWriteAttend").getKendoMultiSelect();
					    var multiDataItems = multi.dataItems();
					    var selectedWriteAttend = [];
						
						for(var i = 0; i < multiDataItems.length; i += 1) {
							var current = multiDataItems[i];
							                 
							selectedWriteAttend.push({
								indvType: current.type,
								indvId: current.seqNo,
								indvNm: current.name
							})
						}					
						
						var params = {
								myscheduleMaster : formData,
								myscheduleAttend : selectedWriteAttend,
								myscheduleRepeatConfig : repeat_formData,
								repeatUpdateType : "1",
								repeatIsType     : $("#writePopup_repeatYn").val(),
							};
						
						if (formData) {
							if (isNew == 'true') {  //등록
								_this.add(params).done(function(data) {
									var popup = $("#popup_schedule_write").data('kendoWindow');
									popup.close();
									$('#calendar').fullCalendar( 'refetchEvents' );
									kendo.alert('저장되었습니다.');	
								});
							}else{  //수정
								_this.edit(params).done(function(obs) {
									var popup = $("#popup_schedule_write").data('kendoWindow');
									popup.close();
									$('#calendar').fullCalendar( 'refetchEvents' );
									kendo.alert('수정되었습니다.');	
								});
							}
						}
					}
				});
				
				//반복옵션중 수정(이번 일정만)
				$("#btn_popup_write_update_repeat1").off("click");
				$("#btn_popup_write_update_repeat1").on("click",function(){
					 //종일체크
					 if($("input:checkbox[id='write_chk_dayYn']").is(":checked")){
						 $("#write_dayYn").val(true);
					 }else{
						 $("#write_dayYn").val(false);
					 }
					
					 //반복체크
					 if($("input:checkbox[id='write_chk_repeatYn']").is(":checked")){
						 $("#write_repeatYn").val(true);
					 }else{
						 $("#write_repeatYn").val(false);
					 }
					var $form              = $('#scheduleForm');
					var formData           = UI.Validator($form).value();
					//참가자
					var multi = $("#communityScheduleWriteAttend").getKendoMultiSelect();
				    var multiDataItems = multi.dataItems();
				    var selectedWriteAttend = [];
					
					for(var i = 0; i < multiDataItems.length; i += 1) {
						var current = multiDataItems[i];
						                 
						selectedWriteAttend.push({
							indvType: current.type,
							indvId: current.seqNo,
							indvNm: current.name
						})
					}
					var params = {
							myscheduleMaster : formData,
							myscheduleAttend : selectedWriteAttend,
							repeatUpdateType : "1",
							repeatIsType     : $("#writePopup_repeatYn").val(),
					};
					
					_this.edit(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_write_update_info = $("#popup_write_update_info").data('kendoWindow');
						popup_write_update_info.close();
						
						var popup = $("#popup_schedule_write").data('kendoWindow');
						popup.close();
						kendo.alert('수정되었습니다.');
					});
				});
				
				//반복옵션중 수정(향후 일정 모두)
				$("#btn_popup_write_update_repeat2").off("click");
				$("#btn_popup_write_update_repeat2").on("click",function(){
					 //종일체크
					 if($("input:checkbox[id='write_chk_dayYn']").is(":checked")){
						 $("#write_dayYn").val(true);
					 }else{
						 $("#write_dayYn").val(false);
					 }
					
					 //반복체크
					 if($("input:checkbox[id='write_chk_repeatYn']").is(":checked")){
						 $("#write_repeatYn").val(true);
					 }else{
						 $("#write_repeatYn").val(false);
					 }
					var $form              = $('#scheduleForm');
					var formData           = UI.Validator($form).value();
					//참가자
					var multi = $("#communityScheduleWriteAttend").getKendoMultiSelect();
				    var multiDataItems = multi.dataItems();
				    var selectedWriteAttend = [];
					
					for(var i = 0; i < multiDataItems.length; i += 1) {
						var current = multiDataItems[i];
						                 
						selectedWriteAttend.push({
							indvType: current.type,
							indvId: current.seqNo,
							indvNm: current.name
						})
					}
					var timeFrom           = $("#writePopup_timeFrom").val();
					var params = {
							myscheduleMaster  : formData,
							myscheduleAttend  : selectedWriteAttend,
							repeatUpdateType  : "2",
							selectedTimeFrom  : timeFrom
						};
					_this.edit(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_write_update_info = $("#popup_write_update_info").data('kendoWindow');
						popup_write_update_info.close();
						
						var popup = $("#popup_schedule_write").data('kendoWindow');
						popup.close();
						kendo.alert('수정되었습니다.');
					});
				});
				
				//반복옵션중 수정(반복 일정 모두)
				$("#btn_popup_write_update_repeat3").off("click");
				$("#btn_popup_write_update_repeat3").on("click",function(){
					 //종일체크
					 if($("input:checkbox[id='write_chk_dayYn']").is(":checked")){
						 $("#write_dayYn").val(true);
					 }else{
						 $("#write_dayYn").val(false);
					 }
					
					 //반복체크
					 if($("input:checkbox[id='write_chk_repeatYn']").is(":checked")){
						 $("#write_repeatYn").val(true);
					 }else{
						 $("#write_repeatYn").val(false);
					 }
					var $form              = $('#scheduleForm');
					var formData           = UI.Validator($form).value();
					//참가자
					var multi = $("#communityScheduleWriteAttend").getKendoMultiSelect();
				    var multiDataItems = multi.dataItems();
				    var selectedWriteAttend = [];
					
					for(var i = 0; i < multiDataItems.length; i += 1) {
						var current = multiDataItems[i];
						                 
						selectedWriteAttend.push({
							indvType: current.type,
							indvId: current.seqNo,
							indvNm: current.name
						})
					}
					var params = {
							myscheduleMaster  : formData,
							myscheduleAttend  : selectedWriteAttend,
							repeatUpdateType  : "3",
						};
					_this.edit(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_write_update_info = $("#popup_write_update_info").data('kendoWindow');
						popup_write_update_info.close();
						
						var popup = $("#popup_schedule_write").data('kendoWindow');
						popup.close();
						kendo.alert('수정되었습니다.');
					});
				});
				
				//반복옵션 닫기
				$("#btn_popup_write_update_close").click(function(){
					var popup = $("#popup_write_update_info").data('kendoWindow');
					popup.close();
				});
				
				$('#partAll').change(function() {	
					if ($('#partAll').is(':checked')) {
						$('input[name="notic"]').each(function() { 
							this.checked = true; 
						});
						$('input[name="part"]').each(function() { 
							this.checked = true;						
							$('#'+this.id).prop("disabled", true)
						});
					}else{
						$('input[name="notic"]').each(function() { 
							this.checked = false; 
						});
						$('input[name="part"]').each(function() { 
							this.checked = false; 
							$('#'+this.id).removeAttr("disabled");
						});
					}							
				});				
			},
			add : function(params) { // 신규저장
				
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
				console.log(params);
				console.log(JSON.stringify(params));
				console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
				
				
				var dfd = new $.Deferred();
				$.ajax({
					method : 'POST',
					url : '/community/schedule/form',
					dataType : 'json',
					contentType : 'application/json',
					data : JSON.stringify(params),
					success : function(response, data) {
						dfd.resolve(params);
					},
					error : function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			edit : function(params) { // 수정
				var dfd = new $.Deferred();
				$.ajax({
					method : 'PUT',
					url : '/community/schedule/form',
					dataType : 'json',
					contentType : 'application/json',
					data : JSON.stringify(params),
					success : function(response, data) {
						dfd.resolve(params);
					},
					error : function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			getAttendList : function(seqno) { // 참가자리스트
				var dfd = new $.Deferred();
				$.ajax({
					url : '/community/schedule/attend/'+seqno,
					dataType : 'json',
					contentType : 'application/json',
					success : function(response, data) {
						dfd.resolve(response);
					},
					error : function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			addCodeDtl : function(params) { // 코드저장
				var dfd = new $.Deferred();
				$.ajax({
					method : 'POST',
					url : '/community/schedule/dtl',
					dataType : 'json',
					contentType : 'application/json',
					data : JSON.stringify(params),
					success : function(response, data) {
						dfd.resolve(params);
					},
					error : function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			destoryCodeDtl : function(params) { // 코드삭제
				var dfd = new $.Deferred();
				$.ajax({
					method : 'DELETE',
					url : '/community/schedule/dtl',
					dataType : 'json',
					contentType : 'application/json',
					data : JSON.stringify(params),
					success : function(response, data) {
						dfd.resolve(params);
					},
					error : function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			wmSetting : function(index_selected_day) { // 반복(매월) 값 설정
				var index_selected_day_split = index_selected_day.split("-");
				 $("#month_day_text").html(index_selected_day_split[2]+"일");
				 var wm = $.weekNumberByMonth(index_selected_day);
//				 console.log("wm",wm);
				 
				 var week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
				 var dayOfWeek = week[new Date(index_selected_day).getDay()];
//				 console.log("dayOfWeek",dayOfWeek);
				 
				 $("#month_week_text").html(wm.weekNo+"번째 "+dayOfWeek);
			},
			
			loadNoticeGongguSetting: function(seqno) {
				var _this = this;
				var dfd = new $.Deferred();
				var query = {};
				query.seqno = seqno;
				$.ajax({					
					url:'/community/schedule/getNoticeGongguList',					     
					type: 'POST',
					contentType: 'application/json',
					data : JSON.stringify(query),
					success: function(data) {
						dfd.resolve(data);
					},
					error: function(e) {
						dfd.reject();
					}
				});
				return dfd.promise();
			},
			
			makeNoticeGongguList: function(data){				
				$("#projectCount").text(data.length);
				var html = "";
				$.each( data, function( i, data ) {
					var checked = "";					
					if(data.checked=="CHECKED"){
						checked = "checked";
					}
					
					html += '<li>';
					html += '<input type="checkbox" name="notic" data-key="'+data.tModuleconfigSeqno+'" id="notice'+data.tModuleconfigSeqno+''+i+'" value="'+data.tModuleconfigSeqno+'" class="k-checkbox" '+checked+' >';
					html += '<label class="k-checkbox-label" for="notice'+data.tModuleconfigSeqno+''+i+'">'+data.gongguNm+'</label>';
					html += '</li>';									
				});
				$("#popup_schedule_write #projectGonggu").append(html);								
			}
						
		}
	
		$.scheduleWriteGetCode = function(){
			UI.getCode(['SCH_KIND'],[gongguSeqno], true).done(function(coeds){				
				//일정구분								
				var schKind = coeds.SCH_KIND;
				
				for(i=0; i<schKind.length; i++){	//일정구분에서 사업일정관련 데이터는 제거
					if(schKind[i].value=="P_END" || schKind[i].value=="P_DELAY" || schKind[i].value=="P_EXPECTED"){						
						schKind = schKind.slice(i+1);
					}
				}
				
				$('#write_kindCd').kendoDropDownList({
					autoWidth: true,
					 dataTextField: 'label',
					 dataValueField: 'value',
					 valueTemplate: '<span class="color" style="background-color: #: data.property1 #"></span><p>#: data.label #</p></span>',
					 template: '<span class="color" style="background-color: #: data.property1 #"></span><p>#: data.label #</p></span>',
					 //dataSource: coeds.SCH_KIND,
					 dataSource: schKind,
				});
				
			});
		}
	
		$.weekNumberByMonth = function(dateFormat) {
			  const inputDate = new Date(dateFormat);
			 
			  // 인풋의 년, 월
			  let year = inputDate.getFullYear();
			  let month = inputDate.getMonth() + 1;
			 
			  // 목요일 기준 주차 구하기
			  //const weekNumberByThurFnc = (paramDate) => {
			  const weekNumberByThurFnc = function(paramDate){
			 
			    const year = paramDate.getFullYear();
			    const month = paramDate.getMonth();
			    const date = paramDate.getDate();
			 
			    // 인풋한 달의 첫 날과 마지막 날의 요일
			    const firstDate = new Date(year, month, 1);
			    const lastDate = new Date(year, month+1, 0);
			    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
			    const lastDayOfweek = lastDate.getDay();
			 
			    // 인풋한 달의 마지막 일
			    const lastDay = lastDate.getDate();
			 
			    // 첫 날의 요일이 금, 토, 일요일 이라면 true
			    const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
			    // 마지막 날의 요일이 월, 화, 수라면 true
			    const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;
			 
			    // 해당 달이 총 몇주까지 있는지
			    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);
			 
			    // 날짜 기준으로 몇주차 인지
			    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);
			 
			    // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
			    if(weekNo === 1 && firstWeekCheck) weekNo = 'prev';
			    // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
			    else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
			    // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
			    else if(firstWeekCheck) weekNo = weekNo -1;
			 
			    return weekNo;
			  };
			 
			  // 목요일 기준의 주차
			  let weekNo = weekNumberByThurFnc(inputDate);
			 
			  // 이전달의 마지막 주차일 떄
			  if(weekNo === 'prev') {
			    // 이전 달의 마지막날
			    const afterDate = new Date(year, month-1, 0);
			    year = month === 1 ? year - 1 : year;
			    month = month === 1 ? 12 : month - 1;
			    weekNo = weekNumberByThurFnc(afterDate);
			  }
			  // 다음달의 첫 주차일 때
			  if(weekNo === 'next') {
			    year = month === 12 ? year + 1 : year;
			    month = month === 12 ? 1 : month + 1;
			    weekNo = 1;
			  }
			  
			  //var rtObj = new obejct();
			  var rtObj = {'year' : year, 'month':month, 'weekNo':weekNo};
			  return rtObj;
			}
	
	return communityScheduleWritePopup;
});