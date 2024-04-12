define(function() {
	
	var communityScheduleDetailPopup = {
			init: function(){
				var _this = this;
				
				var popup_detail_delete_info = $("#popup_detail_delete_info");
				popup_detail_delete_info.kendoWindow({
						width: "560px",
						modal: true,
						height: '',
						iframe: true,
						resizable: true,
						title: "반복일정 삭제",
						visible: false
				}).data("kendoWindow")
				
				if($("#companyYn").val() == "Y"){
					//일정 공지현장 목록 로딩
					_this.loadNoticeGongguSetting($("#detailPopup_seqno").val()).done(function(noticeGongguList){
						_this.makeNoticeGongguList(noticeGongguList);
					});										
				}
				
				_this.create();
				_this.addEvent();
				
				
			},
			create : function() {
				var _this = this;
				
			},
			addEvent : function() {
				var _this = this;
				var repeatYn = $("#detailPopup_repeatYn").val();
				
				//삭제
				$("#popup_schedule_detail_delete").off("click");
				$("#popup_schedule_detail_delete").on("click",function(){
					if(repeatYn == "true"){  //반복 옵션일경우
						$("#popup_detail_delete_info").data('kendoWindow').center().open();
					}else{
						kendo.confirm("삭제하시겠습니까?").then(function() {
							var seqno = $("#detailPopup_seqno").val();
							var params = {
									repeatDelType : "1",
									seqno : seqno
								};
							_this.destory(params).done(function(data) {
								$('#calendar').fullCalendar( 'refetchEvents' );
								var popup = $("#popup_schedule_detail").data('kendoWindow');
								popup.close();
								kendo.alert('삭제되었습니다.');
							});
						});
					}
				});
				
				//반복옵션중 삭제(이번 일정만)
				$("#btn_popup_detail_delete_repeat1").off("click");
				$("#btn_popup_detail_delete_repeat1").on("click",function(){
					var seqno = $("#detailPopup_seqno").val();
					var params = {
							repeatDelType : "1",
							seqno : seqno
						};
					_this.destory(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_delete_info = $("#popup_detail_delete_info").data('kendoWindow');
						popup_delete_info.close();
						
						var popup = $("#popup_schedule_detail").data('kendoWindow');
						popup.close();
						kendo.alert('삭제되었습니다.');
					});
				});
				
				//반복옵션중 삭제(향후 일정 모두)
				$("#btn_popup_detail_delete_repeat2").off("click");
				$("#btn_popup_detail_delete_repeat2").on("click",function(){
					var repeatconfigSeqno = $("#detailPopup_repeatconfigSeqno").val();
					var detailPopup_timeFrom = $("#detailPopup_timeFrom").val();
					var params = {
							repeatDelType : "2",
							repeatConfigSeqNo : repeatconfigSeqno,
							timeFrom : detailPopup_timeFrom
						};
					_this.destory(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_delete_info = $("#popup_detail_delete_info").data('kendoWindow');
						popup_delete_info.close();
						
						var popup = $("#popup_schedule_detail").data('kendoWindow');
						popup.close();
						kendo.alert('삭제되었습니다.');
					});
				});
				
				//반복옵션중 삭제(반복 일정 모두)
				$("#btn_popup_detail_delete_repeat3").off("click");
				$("#btn_popup_detail_delete_repeat3").on("click",function(){
					var repeatconfigSeqno = $("#detailPopup_repeatconfigSeqno").val();
					var params = {
							repeatDelType : "3",
							repeatConfigSeqNo : repeatconfigSeqno
						};
					_this.destory(params).done(function(data) {
						$('#calendar').fullCalendar( 'refetchEvents' );
						
						var popup_delete_info = $("#popup_detail_delete_info").data('kendoWindow');
						popup_delete_info.close();
						
						var popup = $("#popup_schedule_detail").data('kendoWindow');
						popup.close();
						kendo.alert('삭제되었습니다.');
					});
				});
				
				//반복옵션 닫기
				$("#btn_popup_detail_delete_close").click(function(){
					var popup = $("#popup_detail_delete_info").data('kendoWindow');
					popup.close();
				});
				
				
				//닫기
				$("#popup_schedule_detail_close").click(function(){
					var popup = $("#popup_schedule_detail").data('kendoWindow');
					popup.close();
				});
				
				
				//수정
				$("#popup_schedule_detail_update").off("click");
				$("#popup_schedule_detail_update").on("click",function(){
					var popup = $("#popup_schedule_detail").data('kendoWindow');
					popup.close();
					
					var seqno = $("#detailPopup_seqno").val();
					var url = "/community/schedule/view/update/"+seqno;
					$.onLoadPopup(url);  //등록팝업 호출(수정화면)
				});
			},
			destory:function(params){
				var dfd = new $.Deferred();
				
				params
				$.ajax({
					url : '/community/schedule',
					method:'DELETE',
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
				var html = "";
				$.each( data, function( i, data ) {
					console.log(data);
					if(data.checked=="CHECKED"){
						html += '<li>';								
						html += data.gongguNm;
						html += '</li>';
					}
				});
				console.log(html);
				$("#popup_schedule_detail #projectGonggu").append(html);
			}			
		}
	
	
	return communityScheduleDetailPopup;
});