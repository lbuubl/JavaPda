define(function() {
	
	var communityScheduleSettingPopup = {
			init: function(){
				var _this = this;
				var gongguSeqno = $("#gongguSeqno").val();
				
				_this.create();
				_this.addEvent();
				
			},
			create : function() {
				var _this = this;
				
			},
			addEvent : function() {
				var _this = this;
				
				//저장
				$("#btn_schedule_settion_save").off("click");
				$("#btn_schedule_settion_save").on("click",function(){
					
					var addscheduletypeAuth = $(":input:radio[name=setting]:checked").val();

					var params = {
							addscheduletypeAuth : addscheduletypeAuth,
					};
					
					_this.edit(params).done(function(obs) {
						var popup = $("#popup_schedule_setting").data('kendoWindow');
						popup.close();
						$('#calendar').fullCalendar( 'refetchEvents' );
						kendo.alert('저장되었습니다.');
					});
				});
				
				
				//닫기
				$("#popup_schedule_setting_close").off("click");
				$("#popup_schedule_setting_close").on("click",function(){
					var popup = $("#popup_schedule_setting").data('kendoWindow');
					popup.close();
				});
			},
			edit : function(params) { // 신규저장
				var dfd = new $.Deferred();
				$.ajax({
					method : 'PUT',
					url : '/community/schedule/setting',
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
		}
	
	
	return communityScheduleSettingPopup;
});