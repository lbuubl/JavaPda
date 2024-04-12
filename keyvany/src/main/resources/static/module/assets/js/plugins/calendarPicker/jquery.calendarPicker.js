jQuery.fn.calendarPicker = function(options) {
	// --------------------------  start default option values --------------------------
	if (!options.date) {
		options.date = new Date();
	}

	if (typeof(options.years) == "undefined")
		options.years=1;

	if (typeof(options.months) == "undefined")
		options.months=3;

	if (typeof(options.days) == "undefined")
		options.days=4;

	if (typeof(options.showDayArrows) == "undefined")
		options.showDayArrows=true;

	if (typeof(options.useWheel) == "undefined")
		options.useWheel=true;

	if (typeof(options.callbackDelay) == "undefined")
		options.callbackDelay=500;

	if (typeof(options.monthNames) == "undefined")
		options.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	if (typeof(options.dayNames) == "undefined")
		options.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


	// --------------------------  end default option values --------------------------

	var calendar = {currentDate: options.date};
	calendar.options = options;

	//build the calendar on the first element in the set of matched elements.
	var theDiv = this.eq(0);//$(this);
	theDiv.addClass("calBox");

	//empty the div
	theDiv.empty();


	var divYears = $("<div>").addClass("calYear");
	var divMonths = $("<div>").addClass("calMonth");
	var divYM = $("<div>");
	var divScroll = $("<div class=dayScroll>");
	var divDays = $("<div>").addClass("calDay");
 
	divScroll.append(divDays)
	divYM.append(divYears).append(divMonths)
	theDiv.append(divYM).append(divScroll);

	calendar.changeDate = function(date, clickSource) {

		//console.log("changeDate : " + moment(date).format("YYYY-MM-DD"))

		calendar.currentDate = date;

		var fillYears = function(date) {
			var year = date.getFullYear();
			var t = new Date();
			divYears.empty();
			var nc = options.years*2+1;
			var w = parseInt((theDiv.width()-4-(nc)*4)/nc)+"px";
			for (var i = year - options.years; i <= year + options.years; i++) {
				var d = new Date(date);
				d.setFullYear(i);
				var span = $("<span>").addClass("calElement").attr("millis", d.getTime()).html(i);// .css("width",w);
				if (d.getYear() == t.getYear())
					span.addClass("today");

				if (d.getYear() == calendar.currentDate.getYear())
					span.addClass("selected");

					divYears.append(span);
			}
		}

		var fillMonths = function(date) {
			var month = date.getMonth();
			var t = new Date();
			divMonths.empty();
			var oldday = date.getDay();
			//     var nc = options.months*2+1;
			var nc = options.months*2;
			var w = parseInt((theDiv.width()-4-(nc)*4)/nc)+"px";
			//  console.log(nc +"-"+w)

			//      for (var i = -options.months; i <= options.months; i++) {
			for (var i =0; i <= 11; i++) {
				//console.log("i="+i);

				var d = new Date(date);
				var oldday = d.getDate();
				//d.setMonth(month + i);
				d.setMonth(i);

				if (d.getDate() != oldday) {
					d.setMonth(d.getMonth() - 1);
					d.setDate(28);
				}

				var span = $("<span>").addClass("calElement").attr("millis", d.getTime()).html(options.monthNames[d.getMonth()]); //.css("width",w);
				if (d.getYear() == t.getYear() && d.getMonth() == t.getMonth())
					span.addClass("today");
				if (d.getYear() == calendar.currentDate.getYear() && d.getMonth() == calendar.currentDate.getMonth())
					span.addClass("selected");

				divMonths.append(span);

			}
		}

		var fillDays = function(date) {
			var day = date.getDate();
			var lastMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			var lastDay=lastMonthDay.getDate();

			var t = new Date();
			divDays.empty();
			var nc = options.days*2+1;
			var w = parseInt((theDiv.width()-4-(options.showDayArrows?12:0)-(nc)*4)/(nc-(options.showDayArrows?2:0)))+"px";

			//for (var i = -options.days; i <= options.days; i++) {
			for (var i =1; i <=lastDay ; i++) {

				var d = new Date(date);
				//    d.setDate(day + i)
				d.setDate(i)

				var span = $("<div>").addClass("calElement").attr("millis", d.getTime())
				if (i == -options.days && options.showDayArrows) {
					span.addClass("prev");
				} else if (i == options.days && options.showDayArrows) {
					span.addClass("next");
				} else {
					// span.html("<span class=dayNumber>" + d.getDate() + "</span><br>"+ options.dayNames[d.getDay()]); //.css("width",w);
					if (d.getDay()==0){
						dayColor="Sun";
					}else if(d.getDay()==6) {
						dayColor="Sat";
					}else{
						dayColor="";
					}

					span.append("<div class='dayNumber "+dayColor+" dd'>"+ options.dayNames[d.getDay()] + "</div>"); //.css("width",w);
					span.append("<span class='dayNumber "+dayColor+"'>"+  d.getDate() + "</span>"); //.css("width",w);

					if (d.getYear() == t.getYear() && d.getMonth() == t.getMonth() && d.getDate() == t.getDate())
						span.addClass("today");
					if (d.getYear() == calendar.currentDate.getYear() && d.getMonth() == calendar.currentDate.getMonth() && d.getDate() == calendar.currentDate.getDate())
						span.addClass("selected");
				}
				divDays.append(span);

			}

			//day 감싸고 있는 div 넓이 계산 및 적용, 2017-03-24, 김영식
			var divDaysWidth = 0;
			$(divDays).find(".calElement").each(function(){
				$(this).attr("data-offset", divDaysWidth);	//left offset
				divDaysWidth += $(this).outerWidth() + 2;
			});
			divDays.width(divDaysWidth);


		}

		//var deferredCallBack = function() {
		calendar.deferredCallBack = function(clickSource) {
			if (typeof(options.callback) == "function") {
				if (calendar.timer)
					clearTimeout(calendar.timer);

				calendar.timer = setTimeout(function() {
					options.callback(calendar, clickSource);
				}, options.callbackDelay);
			}
		}


		fillYears(date);
		fillMonths(date);

		if(clickSource != "day"){
			fillDays(date);
		}		

		//deferredCallBack();
		calendar.deferredCallBack(clickSource);

	}

	theDiv.click(function(ev) {
		var el = $(ev.target).closest(".calElement");
		if (el.hasClass("calElement")) {
			
			var clickSource = ""
			if(el.parent().hasClass("calDay")){
				clickSource = "day"
			}else if(el.parent().hasClass("calMonth")){
				clickSource = "month"
			}else if(el.parent().hasClass("calYear")){
				clickSource = "year"
			}

			//일자 클릭시 달력 새로그림 막음			
			if(el.parent().hasClass("calDay")){
				$(".calDay .selected").removeClass("selected");
				el.addClass("selected");
				calendar.changeDate(new Date(parseInt(el.attr("millis"))), clickSource);
				calendar.deferredCallBack("day");
			}else{
				calendar.changeDate(new Date(parseInt(el.attr("millis"))), clickSource);
			}		
			

			//calendar.changeDate(new Date(parseInt(el.attr("millis"))));
		}
	});


	//if mousewheel
	if ($.event.special.mousewheel && options.useWheel) {
		divYears.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setFullYear(d.getFullYear() + delta);
			calendar.changeDate(d);
			return false;
		});
		divMonths.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setMonth(d.getMonth() + delta);
			calendar.changeDate(d);
			return false;
		});
		divDays.mousewheel(function(event, delta) {
			var d = new Date(calendar.currentDate.getTime());
			d.setDate(d.getDate() + delta);
			calendar.changeDate(d);
			return false;
		});
	}


  calendar.changeDate(options.date);

  return calendar;
};