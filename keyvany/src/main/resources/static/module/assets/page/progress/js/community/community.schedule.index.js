
var communitySchedule;
$(document).ready(function() {
	
	communitySchedule = {
		_timeline: null,
		CODES:{},		
		init: function(){
			var _this = this;
			var gongguSeqno = $("#gongguSeqno").val();
			
			
			$.scheduleGetCode();
			
			_this.create();
			_this.addEvent();
			
			var popup_schedule_search = $("#popup_schedule_search");
			popup_schedule_search.kendoWindow({
				width: "400px",
				modal: true,
				//height: '300px',
				iframe: true,
				resizable: false,
				title: "일정조회",
				visible: false
			}).data("kendoWindow")
			
			var popup_schedule_setting = $("#popup_schedule_setting");
			popup_schedule_setting.kendoWindow({
				width: "300px",
				modal: true,
				height: '',
				iframe: true,
				title: "일정종류추가 권한",
				visible: false
			}).data("kendoWindow")
			
			var popup_schedule_write = $("#popup_schedule_write");
			popup_schedule_write.kendoWindow({
				width: "640px",
				modal: true,
				//height: '490px',
				iframe: true,
				resizable: false,
				title: "일정 등록/수정",
				visible: false
			});
			
			var popup_schedule_detail = $("#popup_schedule_detail");
			popup_schedule_detail.kendoWindow({
				width: "640px",
				modal: true,
				//height: '500px',
				iframe: true,
				resizable: false,
				title: "일정 보기",
				visible: false
			});
			
			var popup_schedule_write = $("#popup_schedule_prjScheWrite");
			popup_schedule_write.kendoWindow({
				width: "640px",
				modal: true,
				//height: '490px',
				iframe: true,
				resizable: false,
				title: "사업일정 수정",
				visible: false
			});
			
			var popup_schedule_detail = $("#popup_schedule_prjScheDetail");
			popup_schedule_detail.kendoWindow({
				width: "640px",
				modal: true,
				//height: '500px',
				iframe: true,
				resizable: false,
				title: "사업일정 보기",
				visible: false
			});				
			
									
			//레벨
			$("#projectSchedule_lev").kendoDropDownList({
	            dataTextField: "label",
	            dataValueField: "value",								
				 dataSource: [
		              {label: "중요도 선택", value: ""},
		              {label: "상", value: "1"},
		              {label: "중", value: "2"},
		              {label: "하", value: "3"}
	             ],
	             change: _this.projectScheduleSearch,
				 index:0
			});
								
			
			//_this.createTimeLine();
		},
		create : function() {
			var _this = this;
			
			/* 캘린더 */
			$('#calendar').fullCalendar({
				// 기본 옵션
				locale: 'ko',
				nextDayThreshold : "00:00:00",
				navLinks: true,
				editable: true,
				eventLimit: true,
				businessHours: true,
				selectable: true,
				droppable: true,
				drop: function(e) {
					
					var timeFrom       = e._d;
					var timeTo         = e._d;
					var subject        = $(this).attr("data-title");
					var kindCd         = $(this).attr("data-kindcd");
					
					var eventData = {};
					eventData.start = e._d;

					var year = eventData.start.getUTCFullYear();
					var month = eventData.start.getUTCMonth() + 1;
					var day = eventData.start.getUTCDate();
					var hours = eventData.start.getUTCHours();
					var minutes = eventData.start.getUTCMinutes();
					var seconds = eventData.start.getUTCSeconds();
					if(month < 10){ month = '0' + month; }
					if(day < 10){ day = '0' + day; }
					if(hours < 10){ hours = '0' + hours; }
					if(minutes < 10){ minutes = '0' + minutes; }
					if(seconds < 10){ seconds = '0' + seconds; }

					eventData.start = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
					
					timeFrom = eventData.start;
					timeTo = eventData.start;
					
					var TimeFromDate = new Date(timeFrom);
					var TimeToDate = new Date(timeTo);
					
					var params_master = {
							timeFrom : TimeFromDate,
							timeTo : TimeToDate,
							dayYn  : 0,
							repeatYn : 0,
							subject : subject,
							place : "",
							memo  : "",
							openType : "A",
							alarmType : "0",
							kindCd : kindCd
					};
					
					var index_loginSeqno   = $("#index_loginSeqno").val();
					var index_loginUserNm  = $("#index_loginUserNm").val();
					
					var selectedWriteAttend = [];
					selectedWriteAttend.push({
						indvType: "A",
						indvId: index_loginSeqno,
						indvNm: index_loginUserNm
					})
					
					var params = {
						myscheduleMaster : params_master,
						myscheduleAttend : selectedWriteAttend
					};
					
					_this.add(params).done(function(data) {
						$('#calendar').fullCalendar('removeEvents', e._id);
						$('#calendar').fullCalendar( 'refetchEvents' );
						kendo.alert('저장되었습니다.');	
					}).fail(function(){
						$('#calendar').fullCalendar('removeEvents', e._id);
						$('#calendar').fullCalendar( 'refetchEvents' );
					});
					
				},
				eventDrop: function(e) {
					//일반일정
					if(e.eventType=="my"){
						var seqno          = e.id;
						var timeFrom       = e.start._d;
						var timeTo         = "";
//							
//							if(e.end == null){
//								timeTo         = e.start._d;
//							}else{
//								timeTo         = e.end._d;
//							}
						
						var eventData = {};
						eventData.start = e.start.toDate();

						var year = eventData.start.getUTCFullYear();
						var month = eventData.start.getUTCMonth() + 1;
						var day = eventData.start.getUTCDate();
						var hours = eventData.start.getUTCHours();
						var minutes = eventData.start.getUTCMinutes();
						var seconds = eventData.start.getUTCSeconds();
						if(month < 10){ month = '0' + month; }
						if(day < 10){ day = '0' + day; }
						if(hours < 10){ hours = '0' + hours; }
						if(minutes < 10){ minutes = '0' + minutes; }
						if(seconds < 10){ seconds = '0' + seconds; }

						eventData.start = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
						
						timeFrom = eventData.start;
						
						if(e.end == null){
							timeTo         = eventData.start;
						}else{
							
							eventData.end = e.end.toDate();

							var year2 = eventData.end.getUTCFullYear();
							var month2 = eventData.end.getUTCMonth() + 1;
							var day2 = eventData.end.getUTCDate();
							var hours2 = eventData.end.getUTCHours();
							var minutes2 = eventData.end.getUTCMinutes();
							var seconds2 = eventData.end.getUTCSeconds();
							if(month2 < 10){ month2 = '0' + month2; }
							if(day2 < 10){ day2 = '0' + day2; }
							if(hours2 < 10){ hours2 = '0' + hours2; }
							if(minutes2 < 10){ minutes2 = '0' + minutes2; }
							if(seconds2 < 10){ seconds2 = '0' + seconds2; }

							eventData.end = year2 + '-' + month2 + '-' + day2 + ' ' + hours2 + ':' + minutes2 + ':' + seconds2;
								
							timeTo         = eventData.end;
						}
						
//			                console.log("e",e);
//							console.log("timeFrom",timeFrom);
//							console.log("timeTo",timeTo);
						
						var TimeFromDate = new Date(timeFrom);
						var TimeToDate = new Date(timeTo);
						
						var params = {
								seqno : seqno,
								timeFrom : TimeFromDate,
								timeTo : TimeToDate
						};
						
						_this.edit(params).done(function(data) {
							kendo.alert('수정되었습니다.');	
						});
						
					//사업일정
					}else{
						var timeFrom	= moment(e.start._d).format('YYYYMMDD');
						var seqNo 		= (e.id).replace("P_", "");
							
						var params = {
								plnNo : seqNo,
								clsgDt : timeFrom
						};
													
						_this.editPrjectSchedule(params).done(function(data) {
							kendo.alert('수정되었습니다.');	
						});
													
					}					
				},
				eventResize: function(e){
					var seqno          = e.id;
					var timeFrom       = e.start._d;
					var timeTo         = "";
//						
//						if(e.end == null){
//							timeTo         = e.start._d;
//						}else{
//							timeTo         = e.end._d;
//						}
					
					var eventData = {};
					eventData.start = e.start.toDate();

					var year = eventData.start.getUTCFullYear();
					var month = eventData.start.getUTCMonth() + 1;
					var day = eventData.start.getUTCDate();
					var hours = eventData.start.getUTCHours();
					var minutes = eventData.start.getUTCMinutes();
					var seconds = eventData.start.getUTCSeconds();
					if(month < 10){ month = '0' + month; }
					if(day < 10){ day = '0' + day; }
					if(hours < 10){ hours = '0' + hours; }
					if(minutes < 10){ minutes = '0' + minutes; }
					if(seconds < 10){ seconds = '0' + seconds; }

					eventData.start = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
					
					timeFrom = eventData.start;
					
					if(e.end == null){
						timeTo         = eventData.start;
					}else{
						
						eventData.end = e.end.toDate();

						var year2 = eventData.end.getUTCFullYear();
						var month2 = eventData.end.getUTCMonth() + 1;
						var day2 = eventData.end.getUTCDate();
						var hours2 = eventData.end.getUTCHours();
						var minutes2 = eventData.end.getUTCMinutes();
						var seconds2 = eventData.end.getUTCSeconds();
						if(month2 < 10){ month2 = '0' + month2; }
						if(day2 < 10){ day2 = '0' + day2; }
						if(hours2 < 10){ hours2 = '0' + hours2; }
						if(minutes2 < 10){ minutes2 = '0' + minutes2; }
						if(seconds2 < 10){ seconds2 = '0' + seconds2; }

						eventData.end = year2 + '-' + month2 + '-' + day2 + ' ' + hours2 + ':' + minutes2 + ':' + seconds2;
							
						timeTo         = eventData.end;
					}
					
//		                console.log("e",e);
//						console.log("timeFrom",timeFrom);
//						console.log("timeTo",timeTo);
					
					var TimeFromDate = new Date(timeFrom);
					var TimeToDate = new Date(timeTo);
					
					var params = {
							seqno : seqno,
							timeFrom : TimeFromDate,
							timeTo : TimeToDate
					};
					
					_this.edit(params).done(function(data) {
						kendo.alert('수정되었습니다.');	
					});
				},
				// header 옵션
				header: {
					left: 'prev,next today',
					center: 'title search',
					right: 'month,agendaWeek,agendaDay,listWeek'
				},
				customButtons: {
					search: {
						text: '검색',
						click: function() {  // 검색 클릭이벤트
							
							var url = "/community/schedule/view/search";
							UI.loadPage(url).done(function(html){
								$("#popup_schedule_search").html(html);
								$("#popup_schedule_search").data('kendoWindow').center().open();
							});
						}
					}
				},
				
				// 날짜 클릭이벤트
				dayClick: function(e) {
					
					var selectedDay_temp       = e._d;
					var selectedDay = kendo.toString(selectedDay_temp, 'yyyy-MM-dd');
					
					var url = "/community/schedule/view/write/"+selectedDay;
//						UI.loadPage(url).done(function(html){
//							$("#popup_schedule_write").html(html);
//							$("#popup_schedule_write").data('kendoWindow').center().open();
//						});
					$.onLoadPopup(url);  //등록팝업 호출(수정화면)
//						e.preventDefault();
				},
				
				// 등록된 일정 클릭이벤트
				eventClick: function(e) {
					var _this = this;
					if(e.eventType=="my"){
						var id	= e.id;
						var url = "/community/schedule/view/detail/"+id;
						UI.loadPage(url).done(function(html){
							$("#popup_schedule_detail").html(html);
							$("#popup_schedule_detail").data('kendoWindow').center().open();
						});
					}else{							
						var id	= e.id.replace("P_", "");							
						var url = "/community/schedule/view/prjScheDetail/"+id;
						UI.loadPage(url).done(function(html){
							$("#popup_schedule_prjScheDetail").html(html);
							$("#popup_schedule_prjScheDetail").data('kendoWindow').center().open();
						});
					}
				},
				
				//사업일정 상세팝업 오픈
				openPrjScheDetail: function(id){
					var url = "/community/schedule/view/prjScheDetail/"+id;
					UI.loadPage(url).done(function(html){
						$("#popup_schedule_prjScheDetail").html(html);
						$("#popup_schedule_prjScheDetail").data('kendoWindow').center().open();
					});						
				},
				
				// 비즈니스 시간(활동시간)
				businessHours: {
					start: '08:00',
					end: '19:00',
					dow: [1, 2, 3, 4, 5]
				},
				viewRender: function (view, e) {
					var bh = view.options.businessHours,
						startDate = view.start;

					if (view.type === "agendaDay" && bh.dow.indexOf(startDate.day()) === -1) {
						$('#calendar').fullCalendar('renderEvent', {
							start: moment(startDate),
							end: moment(view.end),
							rendering: 'background',
							className: 'fc-nonbusiness'
						}, false);

						$('#calendar').fullCalendar('renderEvent', {
							start: moment(startDate),
							allDay: true,
							rendering: 'background',
							className: 'fc-nonbusiness'
						}, false);
					}
				},
				
				// 이벤트 리스트
//					events: [
//						{ title: '연차', start: '2018-11-01' },
//						{ id:11, title: '겨울휴가', start: '2018-11-07', end: '2018-11-10' },
//						{ id: 999, title: '주간회의', start: '2018-11-09T16:00:00' },
//						{ id: 999, title: '주간회의', start: '2018-11-16T16:00:00' },
//						{ title: 'EG그룹 미팅', start: '2018-11-11', end: '2018-11-13' },
//						{ title: '업무보고', start: '2018-11-12T10:30:00', end: '2018-11-12T12:30:00' },
//						{ title: '회식', start: '2018-11-12T12:00:00' },
//						{ title: '전체회의', start: '2018-11-12T14:30:00' },
//						{ title: '생일', start: '2018-11-12T17:30:00' },
//						{ title: '홍길동과 저녁약속', start: '2018-11-12T20:00:00' },
//						{ title: '마감', start: '2018-11-13T07:00:00' },
//					]
				
//					events: {
//					    url: '/community/schedule',
//					    type: 'GET',
//					    dataType: 'json',
//					    data: {
//					      custom_param1: 'something',
//					      custom_param2: 'somethingelse'
//					    },
//					    error: function() {
//					      alert('there was an error while fetching events!');
//					    },
//					    color: 'yellow',   // a non-ajax option
//					    textColor: 'black' // a non-ajax option
//					  }
				
				events: function(start, end, timezone, callback) {
					
					var popup_schedule_search_attend_type = $("#popup_schedule_search_attend_type").val();
					var popup_schedule_search_kindcd      = [];
					var popup_schedule_search_attend      = $("#popup_schedule_search_attend").val();
					var popup_schedule_search_keyword     = $("#popup_schedule_search_keyword").val();
					
					if(undefined == popup_schedule_search_attend){
						popup_schedule_search_attend_type = "all";
						popup_schedule_search_attend = "";
						popup_schedule_search_keyword = "";
					}
					
					//참가자
					var search_multi = $("#popup_schedule_search_kindcd").getKendoDropDownTree();
					if(undefined == search_multi){
						popup_schedule_search_kindcd = [];
					}else{
						popup_schedule_search_kindcd = search_multi._values;
//							
//							for(var i = 0; i < search_multi_values.length; i += 1) {
//								var current = search_multi_values[i];
//								                 
//								popup_schedule_search_kindcd.push({
//									indvType: current.type,
//									indvId: current.seqNo,
//									indvNm: current.name
//								})
//							}
					}
					
//						console.log("popup_schedule_search_kindcd",popup_schedule_search_kindcd);
					
					
					var params = {
							 attendType : popup_schedule_search_attend_type
						   , kindcd     : popup_schedule_search_kindcd.toString()
						   , attend     : popup_schedule_search_attend
						   , keyword    : popup_schedule_search_keyword
						   , start      : start.format()
						   , end        : end.format()
					}
					
					jQuery.ajax({
						url: '/community/schedule',
						type: 'GET',
						dataType: 'json',
						data: {
//				                start: start.format(),
//				                end: end.format(),
							searchParams : params
						},
						success: function(doc) {
//				            	console.log("doc",doc);
							
							var events = [];
							if(!!doc){
								$.map( doc, function( r ) {
console.log(r)																		
									//var _durationEditable = true;
									//var _editable = true;
									var _durationEditable = r.auth_Yn;	//권한에 따른 수정여부
									var _editable = r.auth_Yn;			//권한에 따른 수정여부
									if(r.eventType=="project"){
										_durationEditable = false;	//사업일정인 경우 기간드레그 불가
										if(r.kindCd == "P_END"){	//사업일정 (완료) 인 경우 일정 수정 불가
											_editable = false;
										}
									} 
									
									//다른현장의 일정 수정 불가
									if($("#gongguSeqno").val() != r.gongguSeqno){
										_durationEditable = false;
										_editable = false;
									}
									
									events.push({
										id: r.SeqNo,
										title: r.Subject,
										start: r.TimeFrom,
//				                            start: r.TimeFrom_text,
										end: r.TimeTo,
//				                            end: r.TimeTo_text,
										backgroundColor: UI.hexToRgb(r.kindCd_Property_1),
//				                            allDay:true
										allDay:r.Day_Yn,
										eventType:r.eventType,	//일정구분(my:일반일정, project:사업일정)
										durationEditable:_durationEditable,
										editable: _editable
									});
								});
							}
							callback(events);
						}
					});
				}
			});
			
		},
		addEvent : function() {
			var _this = this;
			
			//설정
			$("#btn_schedule_setting").click(function(){
				var url = "/community/schedule/view/setting";
				UI.loadPage(url).done(function(html){
					$("#popup_schedule_setting").html(html);
					$("#popup_schedule_setting").data('kendoWindow').center().open();
				});
			});
			
		},
		add : function(params) { // 신규저장
			var dfd = new $.Deferred();
			$.ajax({
				method : 'POST',
				url : '/community/schedule',
				dataType : 'json',
				contentType : 'application/json',
				data : JSON.stringify(params),
				success : function(response, data) {
					dfd.resolve(response);
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
				url : '/community/schedule',
				dataType : 'json',
				contentType : 'application/json',
				data : JSON.stringify(params),
				success : function(response, data) {
					dfd.resolve(response);
				},
				error : function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		editPrjectSchedule : function(params) { // 수정
			var dfd = new $.Deferred();
			$.ajax({
				method : 'PUT',
				url : '/community/schedule/updateProjectSchedule',
				dataType : 'json',
				contentType : 'application/json',
				data : JSON.stringify(params),
				success : function(response, data) {
					dfd.resolve(response);
				},
				error : function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		
		projectScheduleSearch: function(){					
			communitySchedule._timeline.destroy();			
			communitySchedule.createTimeLine();			
		},
			
		getTimeLineData: function(){
			var dfd = new $.Deferred();
			$.ajax({
				method : 'GET',
				url : '/community/schedule/getTimeLineData',
				dataType : 'json',
				contentType : 'application/json',
				data : {
					sDate: $("#projectSchedule_sDate").val(),
					eDate: $("#projectSchedule_eDate").val(),
					stdSchDs: $("#projectSchedule_stdSchDs").val(),
					lev: $("#projectSchedule_lev").val()
				},
				success : function(response, data) {
					dfd.resolve(response);
				},
				error : function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();				
		},
		
		createTimeLine: function(){		
			var _this = this;

			var dfd = new $.Deferred();
			
			_this.getTimeLineData().done(function(response){				
				//console.log(response);
				var maxDt = response.maxDt;
				var minDt = response.minDt;
				
				if($("#projectSchedule_sDate").val() == "" && $("#projectSchedule_eDate").val() == ""){						
					$("#projectSchedule_sDate").val(moment(minDt).format("YYYY-MM-DD"));
					$("#projectSchedule_eDate").val(moment(maxDt).format("YYYY-MM-DD"));									
				}else{
					//검색으로 들어온경우
					minDt = moment($("#projectSchedule_sDate").val()).format("YYYYMMDD");
					maxDt = moment($("#projectSchedule_eDate").val()).format("YYYYMMDD");
				}
				
				var sDate = moment(minDt).add(-4, "month");
				var eDate = moment(moment(maxDt).add(3, "month").format("YYYYMM") + "01").add(-1, "day");
				
				/*
				console.log(minDt);
				console.log(maxDt);					
				console.log(sDate.format("YYYYMMDD"));
				console.log(eDate.format("YYYYMMDD"));
				*/
									
				var startYear = sDate.format("YYYY");
				var startMonth = sDate.format("MM");
				var startDay = sDate.format("DD");
				
				var endYear = eDate.format("YYYY");
				var endMonth = eDate.format("MM");
				var endDay = eDate.format("DD");
																
				
				var container = document.getElementById('project_timeline');
				
				var winH = $(window).height();			//윈도우높이
				var tabH = $(".ui-tabs-nav").height();	//탭높이
				var inpH = $(".i_inputs").height();		//검색창높이			
				
				var options = {
						width: '100%',
						//height: '500px',
						height: winH-tabH-inpH-220,
						margin: {
							item: 5
						},
						min: new Date(startYear, startMonth, startDay),	// lower limit of visible range
						max: new Date(endYear, endMonth, endDay),		// upper limit of visible range
						zoomMin: 1000 * 60 * 60 * 24 * 20,							// one day in milliseconds
						zoomMax: 1000 * 60 * 60 * 24 * 31 * 60,						// about three months in milliseconds
						format:{
							minorLabels: {
								millisecond:'SSS',
								second:     's',
								minute:     'HH:mm',
								hour:       'HH:mm',
								weekday:    'ddd D',
								day:        'DD',
								week:       'w',
								month:      'MM',
								year:       'YYYY'
							},
							majorLabels: {
								millisecond:'HH:mm:ss',
								second:     'D MM HH:mm',
								minute:     'ddd D MM',
								hour:       'ddd D MM',
								weekday:    'YYYY-MM',
								day:        'YYYY-MM',
								week:       'YYYY-MM',
								month:      'YYYY',
								year:       ''
							}
						}
					};					
				
				var items = [];	
				for(var i=0; i < response.schedules.length; i++){
					var schedule = response.schedules[i];
					var item = {id: schedule.PLN_NO, content: schedule.TSK_NM, start: schedule.CLSG_DT+"T00:00:00", className: schedule.kindCd};
					items.push(item);
				}					
													
				_this._timeline = new vis.Timeline(container, items, options);				
				_this._timeline.moveTo(moment().format("YYYY-MM-DD")+"T00:00:00");
										
				_this._timeline.on('select', function(properties) {												
					if(properties.items.length > 0){
						var id = properties.items[0];
						var url = "/community/schedule/view/prjScheDetail/"+id;
						UI.loadPage(url).done(function(html){
							$("#popup_schedule_prjScheDetail").html(html);
							$("#popup_schedule_prjScheDetail").data('kendoWindow').center().open();
						});
					}
				});					
				//$("#loader-wrapper").hide();	
				dfd.resolve();
			});					
			return dfd.promise();
		}
	}
	
	$.onLoadPopup = function(url) {
		
		$('#popup_schedule_write').off('shown.bs.modal'); 
		$('#popup_schedule_write').on('shown.bs.modal'); 
		
		UI.loadPage(url).done(function(html){
			$("#popup_schedule_write").html(html);
			$("#popup_schedule_write").data('kendoWindow').center().open();
		});
	}
	
	$.scheduleGetCode = function(){		
		UI.getCode(['SCH_KIND', 'H_STD_SCH_DS'],[gongguSeqno], true).done(function(coeds){			
			communitySchedule.CODES = coeds;			
			//prjSchedule.init();
			
			var codeHtml = "";
			
			$.map( coeds.SCH_KIND, function( r ) {				
				var cursor="";
				var mClass="";
				if(r.value=="P_END" || r.value=="P_DELAY" || r.value=="P_EXPECTED"){
					cursor = "cursor:default;";	//사업일정인 경우 cursor:default, 2019-01-29, 김영식
					//사업일정 (예정) 하단에 마진 추가, 2019-01-30, 김영식
					if(r.value=="P_EXPECTED"){
						mClass = "mb20i ";
					}
				}
				codeHtml += "<div class='"+mClass+"fc-event' data-color='"+r.property1+"' data-kindcd='"+r.value+"' data-title='"+r.label+"' style='background-color: "+UI.hexToRgb(r.property1)+"; border-color: "+UI.hexToRgb(r.property1)+";"+cursor+"'>"+r.label+"</div>";
				
				$("#index_totalcode_seqno").val(r.parentSeqno);

			 });
			
			$("#external-events").html(codeHtml);
			
			
			
			/* 주요일정 이벤트 드래그시 오버플러 해제 */
			$('#external-events .fc-event').draggable({
				start: function (e, ui) {						
					if(e.target.dataset.kindcd == "P_END" || e.target.dataset.kindcd == "P_DELAY" || e.target.dataset.kindcd == "P_EXPECTED"){	//사업일정인 경우 드래그하여 일정 추가 불가, 2019-01-29, 김영식
						return false;
					}					
					$("#external-events").css("overflow-y", "visible");
				},
				stop: function (e, ui) {
					$("#external-events").css("overflow-y", "auto");
				}
			});
			
			/* 좌측 주요일정 이벤트 */
			$('#external-events .fc-event').each(function() {
				$(this).data('event', {
					title: $.trim($(this).text()),
					stick: true
				});
				$(this).draggable({
					zIndex: 999,
					revert: true,
					revertDuration: 0
				});
			});
			
			//일정구분							
			var STDSCHDS_INCHK = [{label: '일정구분 선택', value: ''}].concat(coeds.H_STD_SCH_DS);
			$("#projectSchedule_stdSchDs").kendoDropDownList({
	            dataTextField: "label",
	            dataValueField: "value",								
				dataSource: STDSCHDS_INCHK,
				change: communitySchedule.projectScheduleSearch,
				index:0
			});			
		});
	}
	
	communitySchedule.init();		
});


//사업일정 관련
var prjSchedule = {
		
	init: function(){
		var _this = this;								
	},
	makePrjSchedule: function(){	//사업일정 생성하기					
	    kendo.confirm("일정을 생성하시겠습니까?")
        .done(function(){
        	
        	$("#loader-wrapper").show();
        	
    		$.ajax({
    			method : 'GET',    			
    			url : '/community/schedule/makePrjSchedule',
    			dataType : 'json',
    			contentType : 'application/json',			
    			success : function(response, data) {
    				$("#loader-wrapper").hide();
    				kendo.alert("일정 생성이 완료되었습니다.");    				
    			},
    			error : function(e) {
    				$("#loader-wrapper").hide();    				
    			}
    		});        	
        });			
	}
} 

