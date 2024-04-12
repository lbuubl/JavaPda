define(function() {
	
	var communityScheduleSearchPopup = {
			init: function(){
				var _this = this;
				var gongguSeqno = $("#gongguSeqno").val();
				
				$("#popup_schedule_search_attend_type").kendoDropDownList({
					autoWidth: true,
					 dataSource: [{label: "전체", value: "all"},{label: "참가받은일정", value: "B"},{label: "참가등록일정", value: "A"}],
					 dataTextField: 'label',
					 dataValueField: 'value',
				});
				
				
				$("#popup_schedule_search_kindcd").kendoDropDownTree({
				    placeholder: "Select ...",
	                checkboxes: true,
//	                checkAll: true,
	                autoClose: false,
//	                dataSource: [
//	                            { text: "Tables & Chairs" },
//	                            { text: "Sofas" },
//	                            { text: "Occasional Furniture" },
//	                            { text: "Bed Linen" },
//	                            { text: "Curtains & Blinds" },
//	                            { text: "Carpets" }
//	                ]
				});
				
				UI.getCode(['SCH_KIND'],[gongguSeqno], true).done(function(coeds){
					
					var dataSource = [];
					$.map( coeds.SCH_KIND, function( r ){
						var data = {
								text: r.label,
								value : r.value	
						};
						dataSource.push(data);
					});
					
					var popup_schedule_search_kindcd = $("#popup_schedule_search_kindcd").data("kendoDropDownTree");
					popup_schedule_search_kindcd.setDataSource(dataSource);
					
				});
				
				_this.create();
				_this.addEvent();
				
			},
			create : function() {
				var _this = this;
				
			},
			addEvent : function() {
				var _this = this;
				
				//닫기
				$("#btn_popup_schedule_search_close").click(function(){
					
					var popup = $("#popup_schedule_search").data('kendoWindow');
					popup.close();
				});
				
				//검색
				$("#btn_popup_schedule_search").click(function(){
					
					$('#calendar').fullCalendar( 'refetchEvents' );
					
					var popup = $("#popup_schedule_search").data('kendoWindow');
					popup.close();
				});
				
				
			},
		}
	
	
	return communityScheduleSearchPopup;
});