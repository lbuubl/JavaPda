

var datePickerId = "#datePicker";
function datePickerInit(startDtate,endDate){ 

	var dt = new Date();
	dt.setDate(dt.getDate() + 7)

	datePicker = $(datePickerId).daterangepicker({
		applyClass: 'bg-slate-600'
		,cancelClass: 'btn-default'
		,locale: datepicker_locale
		//,startDate: moment().subtract('days', 29)
		,"startDate": new Date()
        ,"endDate": dt
        ,minDate: new Date()
		,showDropdowns: true
		
	});	
	 

	$('.body').localize();

}; 
