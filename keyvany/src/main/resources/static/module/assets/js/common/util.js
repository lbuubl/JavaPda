
//2010.08.23 이대영 추가 - ASP의 trim 구현
//예) var tempNo = form.tempNo.value.trim();
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//2010.08.23 이대영 추가 - ASP의 ltrim 구현
//예) var tempNo = form.tempNo.value.ltrim();
String.prototype.ltrim = function() {
	return value.replace(/^\s+/,"");
}

//2010.08.23 이대영 추가 - ASP의 rtrim 구현
//예) var tempNo = form.tempNo.value.rtrim();
String.prototype.rtrim = function() {
	return value.replace(/\s+$/,"");
}

//2010.08.23 이대영 추가 - ASP의 replace 구현 정규식 이용
//예) var tempNo = form.tempNo.value.replaceAll(str1, str2);
String.prototype.replaceAll = function( str1, str2 )
{
	return this.replace(eval("/" + str1 + "/gi"), str2);
	//return this.replace(eval(/\s+$/gi), str2);
}

//2010.08.23 이대영 추가 - ASP의 replace 단어 비교 치환
//예) var tempNo = form.tempNo.value.replaceAll(str1, str2);
String.prototype.replaceAll2 = function( str1, str2 )
{
	var objArray;
	var returnStr="";
	objArray = this.split(str1);
	for (i=0;i<objArray.length ;i++ )
	{
		if (i>0)
		{
			returnStr = returnStr + str2 + objArray[i];
		}
		else
		{
			returnStr = objArray[i];
		}
	}
	return returnStr;
	//return this.replace(eval(/\s+$/gi), str2);
}

//2016-12-16 김영식 추가 - 해당일이 몇주차 인지 리턴
//예) new Date("2016-12-01").getWeekOfMonth();
Date.prototype.getWeekOfMonth = function(exact) {
	var selectedDayOfMonth = this.getDate();

	var first = new Date(this.getFullYear() + '/' + (this.getMonth() + 1) + '/01');
	var monthFirstDateDay = first.getDay();

	return Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);
}


//2016-12-17 이대영 추가 - ASP의 left함수 구현
//예) var tempNo = form.tempNo.value.left(5);
String.prototype.left = function(length){
	if(this.length <= length){
		return this;
	}
	else{
		return this.substring(0, length);
	}
}

//2016-12-17 이대영 추가 - ASP의 right함수 구현
//예) var tempNo = form.tempNo.value.right(5);
String.prototype.right = function(length){
	if(this.length <= length){
		return this;
	}
	else{
		return this.substring(this.length - length, this.length);
	}
}

//2017-02-24 김영식 추가 - 오라클 LPAD 구현  (자릿수 만큼 왼쪽에 문자열 채움)
String.prototype.lpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s = padString + s;
    return s;
}

//2017-02-24 김영식 추가 - 오라클 RPAD 구현 (자릿수 만큼 오른쪽에 문자열 채움)
String.prototype.rpad = function(padLength, padString){
    var s = this;
    while(s.length < padLength)
        s += padString;
    return s;
}


/*언어코드 변환관련 함수 - 각 컴포넌트 마다 언어코드가 다를경우 함수 정의해서 사용  */
/*----------------------------------------------------------------------------------*/
String.prototype.changeLanCode=function(module){
	var trCode = ""
	var lanCd = this.trim();
	if (module=="")
	{
		module="default";
	}

	switch (module.toLowerCase())
	{
		case "default":
			switch (lanCd) {
				case "ko"	: trCode = "ko-KR";		break;
				case "en"	: trCode = "en-US";		break;
				case "c1"	: trCode = "zh-cn";		break;
				case "ja"	: trCode = "ja-JP";		break;
				default		: trCode = lanCd;		break;
			}
			break;
		case "editor":
			switch (lanCd) {
				case "ko"	: trCode = "ko";		break;
				case "en"	: trCode = "en-US";		break;
				case "c1"	: trCode = "zh-cn";		break;
				case "ja"	: trCode = "ja";		break;
				default		: trCode = lanCd;		break;
			}
			break;
		case "app"://전자결재
			switch (lanCd) {
				case "ko"	: trCode = "ko";		break;
				case "en"	: trCode = "en-US";		break;
				case "c1"	: trCode = "zh-cn";		break;
				case "ja"	: trCode = "ja";		break;
				default		: trCode = lanCd;		break;
			}
			break;
		case "schedule"://일정관리
			switch (lanCd) {
				//case "ko"	: trCode = "ko-KR";		break;
				//case "en"	: trCode = "en-US";		break;
				case "c1"	: trCode = "zh-cn";		break;
				//case "ja"	: trCode = "ja-JP";		break;
				default		: trCode = lanCd;		break;
			}
			break;
		default:
			switch (lanCd) {
				case "ko"	: trCode = "ko-KR";		break;
				case "en"	: trCode = "en-US";		break;
				case "c1"	: trCode = "zh-cn";		break;
				case "ja"	: trCode = "ja-JP";		break;
				default		: trCode = lanCd;		break;
			}
			break;
	}

	return trCode;
}
/*----------------------------------------------------------------------------------*/

// 접속 브라우저를 확인합니다(html5 지원하지 않을 경우 경고문을 출력하기 위해 사용)
String.prototype.isBrowserCheck = function(){
    var agt = this;// navigator.userAgent.toLowerCase();
	var bro="Etc";
    if (agt.indexOf("mozilla/5.0") != -1) bro = 'Mozilla';
    if (agt.indexOf("netscape") != -1) bro = 'Netscape';
    if (agt.indexOf("safari") != -1) bro = 'Safari';
    if (agt.indexOf("chrome") != -1) bro = 'Chrome';
    if (agt.indexOf("opera") != -1) bro = 'Opera';
    if (agt.indexOf("staroffice") != -1) bro = 'Star Office';
    if (agt.indexOf("webtv") != -1) bro = 'WebTV';
    if (agt.indexOf("beonex") != -1) bro = 'Beonex';
    if (agt.indexOf("chimera") != -1) bro = 'Chimera';
    if (agt.indexOf("netpositive") != -1) bro = 'NetPositive';
    if (agt.indexOf("phoenix") != -1) bro = 'Phoenix';
    if (agt.indexOf("firefox") != -1) bro = 'Firefox';
    if (agt.indexOf("skipstone") != -1) bro = 'SkipStone';
    if (agt.indexOf("trident") != -1) bro = 'Internet Explorer 11';
    if (agt.indexOf("edge") != -1) bro = 'Edge';
    if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
        }
        bro = 'Internet Explorer '+rv;
    }
	return bro;
}
/*날자포맷변경*/
String.prototype.localeDateConvert = function(formatString,trCode) {
	var arrFormat = formatString.toUpperCase().split("|");
	var theDate = new Date(this);
	//console.log("formatString="+formatString);
	//console.log("theDate="+theDate);
	//console.log("this="+this);
	var year = theDate.getFullYear().toString();
	var yy = year.toString().right(2);
	var mm = theDate.getMonth()+1;
	var dd = theDate.getDate();
	var month = ("0"+(theDate.getMonth()+1)).right(2);
	var day = ("0"+theDate.getDate()).right(2);
	var weekDay = theDate.getDay();
	var weekDays = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	var strWeekDay = i18next.t("editor:workspace.label." + weekDays[weekDay]);
	var returnString = "";
	var agt = navigator.userAgent.toLowerCase().isBrowserCheck();

	var dtf;
	var strDate;
	//console.log("arrFormat[0]="+arrFormat[0]);
	switch (arrFormat[0]) {
		case "YYYY"	: returnString = year;		break;
		case "YY"	: returnString = yy;		break;
		case "MM"	: returnString = month;		break;
		case "DD"	: returnString = day;		break;
		case "M"	: returnString = mm;		break;
		case "D"	: returnString = dd;		break;
		case "WW"	: returnString = strWeekDay;		break;
		case "YYYYMMDD"	: returnString = year+month+day;		break;
		case "YYMMDD"	: returnString = yy+month+day;		break;
		case "MMDDYYYY"	: returnString = month+day+year;		break;
		case "MMDDYY"	: returnString = month+day+yy;		break;
		case "DDMMYYYY"	: returnString = day+month+year;		break;
		case "DDMMYY"	: returnString = day+month+yy;		break;


        case "YYYY-MM-DD"	: returnString = year+"-"+month+"-"+day;		break;
		case "DD-MM-YYYY"	: returnString = day+"-"+month+"-"+year;		break;
		case "MM-DD-YYYY"	: returnString = month+"-"+day+"-"+year;		break;
		case "YYYY/MM/DD"	: returnString = year+"/"+month+"/"+day;		break;
		case "DD/MM/YYYY"	: returnString = day+"/"+month+"/"+year;		break;
		case "MM/DD/YYYY"	: returnString = month+"/"+day+"/"+year;		break;
		case "YYYY.MM.DD."	: returnString = year+"."+month+"."+day+".";		break;
		case "DD.MM.YYYY."	: returnString = day+"."+month+"."+year+".";		break;
		case "MM.DD.YYYY."	: returnString = month+"."+day+"."+year+".";		break;
		case "YYYY.MM.DD"	: returnString = year+"."+month+"."+day;		break;
		case "DD.MM.YYYY"	: returnString = day+"."+month+"."+year;		break;
		case "MM.DD.YYYY"	: returnString = month+"."+day+"."+year;		break;
		case "YY-MM-DD"	: returnString = yy+"-"+month+"-"+day;		break;
		case "DD-MM-YY"	: returnString = day+"-"+month+"-"+yy;		break;
		case "MM-DD-YY"	: returnString = month+"-"+day+"-"+yy;		break;
		case "YY/MM/DD"	: returnString = yy+"/"+month+"/"+day;		break;
		case "DD/MM/YY"	: returnString = day+"/"+month+"/"+yy;		break;
		case "MM/DD/YY"	: returnString = month+"/"+day+"/"+yy;		break;
		case "YY.MM.DD."	: returnString = yy+"."+month+"."+day+".";		break;
		case "DD.MM.YY."	: returnString = day+"."+month+"."+yy+".";		break;
		case "MM.DD.YY."	: returnString = month+"."+day+"."+yy+".";		break;
		case "YY.MM.DD"	: returnString = yy+"."+month+"."+day;		break;
		case "DD.MM.YY"	: returnString = day+"."+month+"."+yy;		break;
		case "MM.DD.YY"	: returnString = month+"."+day+"."+yy;		break;
		case "YYYY-M-D"	: returnString = year+"-"+mm+"-"+dd;		break;
		case "D-M-YYYY"	: returnString = dd+"-"+mm+"-"+year;		break;
		case "M-D-YYYY"	: returnString = mm+"-"+dd+"-"+year;		break;
		case "YYYY/M/D"	: returnString = year+"/"+mm+"/"+dd;		break;
		case "D/M/YYYY"	: returnString = dd+"/"+mm+"/"+year;		break;
		case "M/D/YYYY"	: returnString = mm+"/"+dd+"/"+year;		break;
		case "YYYY.M.D."	: returnString = year+"."+mm+"."+dd+".";		break;
		case "D.M.YYYY."	: returnString = dd+"."+mm+"."+year+".";		break;
		case "M.D.YYYY."	: returnString = mmm+"."+dd+"."+year+".";		break;
		case "YYYY.M.D"	: returnString = year+"."+mm+"."+dd;		break;
		case "D.M.YYYY"	: returnString = dd+"."+mm+"."+year;		break;
		case "M.D.YYYY"	: returnString = mm+"."+dd+"."+year;		break;
		case "YY-M-D"	: returnString = yy+"-"+mm+"-"+dd;		break;
		case "D-M-YY"	: returnString = dd+"-"+mm+"-"+yy;		break;
		case "M-D-YY"	: returnString = mm+"-"+dd+"-"+yy;		break;
		case "YY/M/D"	: returnString = yy+"/"+mm+"/"+dd;		break;
		case "D/M/YY"	: returnString = dd+"/"+mm+"/"+yy;		break;
		case "M/D/YY"	: returnString = mm+"/"+dd+"/"+yy;		break;
		case "YY.M.D."	: returnString = yy+"."+mm+"."+dd+".";		break;
		case "D.M.YY."	: returnString = dd+"."+mm+"."+yy+".";		break;
		case "M.D.YY."	: returnString = mmm+"."+dd+"."+yy+".";		break;
		case "YY.M.D"	: returnString = yy+"."+mm+"."+dd;		break;
		case "D.M.YY"	: returnString = dd+"."+mm+"."+yy;		break;
		case "M.D.YY"	: returnString = mm+"."+dd+"."+yy;		break;

		case "LOCAL DEFAULT"	:
			/******************여기부터 다시 보자*//////////////////////////////////////////////////////////*/
			if (arrFormat.length>1)
			{
				var trType = arrFormat[1];
				switch (trType.left(2).toLowerCase())
				{
					case "zh","ja","ko","en":
						dtf = new Intl.DateTimeFormat([trType], {year: "numeric",	day: "numeric",	month: "short"});
						strDate = dtf.format(new Date()).toString();
						break;
					default:
						dtf = new Intl.DateTimeFormat([trCode], {year: "numeric",	day: "numeric",	month: "short"});
						strDate = dtf.format(new Date()).toString();
				}
			}
			else
			{
				dtf = new Intl.DateTimeFormat([trCode], {year: "numeric",	day: "numeric",	month: "short"});
				switch (trCode.left(2).toLowerCase())
				{
					case "zh","ja","ko":
						if (agt.indexOf("Internet Explorer") != -1)
						{
							//strDate = dtf.format(new Date()).toString().replace("월","").replace("月","");//동양쪽 날짜 방식일 경우 월을 두번출력하는 오류가 있어 예외처리
							strDate = dtf.format(new Date()).toString();
						}
						else
						{
							strDate = dtf.format(new Date()).toString();
						}
						break;
					default:
						strDate = dtf.format(new Date()).toString();
				}
			}
			returnString = strDate;
			break;
		case "LOCAL DEFAULT LONG"	:
			if (arrFormat.length>1)
			{
				var trType = arrFormat[1];
				switch (trType.left(2).toLowerCase())
				{
					case "zh","ja","ko","en":
						dtf = new Intl.DateTimeFormat([trType], {year: "numeric",	day: "numeric",	month: "long"});
						strDate = dtf.format(new Date()).toString();
						break;
					default:
						dtf = new Intl.DateTimeFormat([trCode], {year: "numeric",	day: "numeric",	month: "long"});
						strDate = dtf.format(new Date()).toString();
				}
			}
			else
			{
				dtf = new Intl.DateTimeFormat([trCode], {year: "numeric",	day: "numeric",	month: "long"});
				switch (trCode.left(2).toLowerCase())
				{
					case "zh","ja","ko":
						if (agt.indexOf("Internet Explorer") != -1)
						{
							strDate = dtf.format(new Date()).toString().replace("월","").replace("月","");//동양쪽 날짜 방식일 경우 월을 두번출력하는 오류가 있어 예외처리
						}
						else
						{
							strDate = dtf.format(new Date()).toString();
						}
						break;
					default:
						strDate = dtf.format(new Date()).toString();
				}
			}
			returnString = strDate;
			break;
		case "YYYYMMDD(WW)" :
		case "YYYYMMDD (WW)"	: returnString = year+month+day+" ("+strWeekDay+")";		break;
		case "YYMMDD(WW)" :
		case "YYMMDD (WW)"	: returnString = yy+month+day+" ("+strWeekDay+")";		break;
		case "MMDDYYYY(WW)" :
		case "MMDDYYYY (WW)"	: returnString = month+day+year+" ("+strWeekDay+")";		break;
		case "MMDDYY(WW)" :
		case "MMDDYY (WW)"	: returnString = month+day+yy+" ("+strWeekDay+")";		break;
		case "DDMMYYYY(WW)" :
		case "DDMMYYYY (WW)"	: returnString = day+month+year+" ("+strWeekDay+")";		break;
		case "DDMMYY(WW)" :
		case "DDMMYY (WW)"	: returnString = day+month+yy+" ("+strWeekDay+")";		break;
		case "YYYY-MM-DD(WW)" :
		case "YYYY-MM-DD (WW)"	: returnString = year+"-"+month+"-"+day+" ("+strWeekDay+")";		break;
		case "DD-MM-YYYY(WW)" :
		case "DD-MM-YYYY (WW)"	: returnString = day+"-"+month+"-"+year+" ("+strWeekDay+")";		break;
		case "MM-DD-YYYY(WW)" :
		case "MM-DD-YYYY (WW)"	: returnString = month+"-"+day+"-"+year+" ("+strWeekDay+")";		break;
		case "YYYY/MM/DD(WW)" :
		case "YYYY/MM/DD (WW)"	: returnString = year+"/"+month+"/"+day+" ("+strWeekDay+")";		break;
		case "DD/MM/YYYY(WW)" :
		case "DD/MM/YYYY (WW)"	: returnString = day+"/"+month+"/"+year+" ("+strWeekDay+")";		break;
		case "MM/DD/YYYY(WW)" :
		case "MM/DD/YYYY (WW)"	: returnString = month+"/"+day+"/"+year+" ("+strWeekDay+")";		break;
		case "YYYY.MM.DD.(WW)" :
		case "YYYY.MM.DD. (WW)"	: returnString = year+"."+month+"."+day+". ("+strWeekDay+")";		break;
		case "DD.MM.YYYY.(WW)" :
		case "DD.MM.YYYY. (WW)"	: returnString = day+"."+month+"."+year+". ("+strWeekDay+")";		break;
		case "MM.DD.YYYY.(WW)" :
		case "MM.DD.YYYY. (WW)"	: returnString = month+"."+day+"."+year+". ("+strWeekDay+")";		break;
		case "YYYY.MM.DD(WW)" :
		case "YYYY.MM.DD (WW)"	: returnString = year+"."+month+"."+day+" ("+strWeekDay+")";		break;
		case "DD.MM.YYYY(WW)" :
		case "DD.MM.YYYY (WW)"	: returnString = day+"."+month+"."+year+" ("+strWeekDay+")";		break;
		case "MM.DD.YYYY(WW)" :
		case "MM.DD.YYYY (WW)"	: returnString = month+"."+day+"."+year+" ("+strWeekDay+")";		break;
		case "YY-MM-DD(WW)" :
		case "YY-MM-DD (WW)"	: returnString = yy+"-"+month+"-"+day+" ("+strWeekDay+")";		break;
		case "DD-MM-YY(WW)" :
		case "DD-MM-YY (WW)"	: returnString = day+"-"+month+"-"+yy+" ("+strWeekDay+")";		break;
		case "MM-DD-YY(WW)" :
		case "MM-DD-YY (WW)"	: returnString = month+"-"+day+"-"+yy+" ("+strWeekDay+")";		break;
		case "YY/MM/DD(WW)" :
		case "YY/MM/DD (WW)"	: returnString = yy+"/"+month+"/"+day+" ("+strWeekDay+")";		break;
		case "DD/MM/YY(WW)" :
		case "DD/MM/YY (WW)"	: returnString = day+"/"+month+"/"+yy+" ("+strWeekDay+")";		break;
		case "MM/DD/YY(WW)" :
		case "MM/DD/YY (WW)"	: returnString = month+"/"+day+"/"+yy+" ("+strWeekDay+")";		break;
		case "YY.MM.DD.(WW)" :
		case "YY.MM.DD. (WW)"	: returnString = yy+"."+month+"."+day+". ("+strWeekDay+")";		break;
		case "DD.MM.YY.(WW)" :
		case "DD.MM.YY. (WW)"	: returnString = day+"."+month+"."+yy+". ("+strWeekDay+")";		break;
		case "MM.DD.YY.(WW)" :
		case "MM.DD.YY. (WW)"	: returnString = month+"."+day+"."+yy+". ("+strWeekDay+")";		break;
		case "YY.MM.DD(WW)" :
		case "YY.MM.DD (WW)"	: returnString = yy+"."+month+"."+day+" ("+strWeekDay+")";		break;
		case "DD.MM.YY(WW)" :
		case "DD.MM.YY (WW)"	: returnString = day+"."+month+"."+yy+" ("+strWeekDay+")";		break;
		case "MM.DD.YY(WW)" :
		case "MM.DD.YY (WW)"	: returnString = month+"."+day+"."+yy+" ("+strWeekDay+")";		break;
		case "YYYY-M-D(WW)" :
		case "YYYY-M-D (WW)"	: returnString = year+"-"+mm+"-"+dd+" ("+strWeekDay+")";		break;
		case "D-M-YYYY(WW)" :
		case "D-M-YYYY (WW)"	: returnString = dd+"-"+mm+"-"+year+" ("+strWeekDay+")";		break;
		case "M-D-YYYY(WW)" :
		case "M-D-YYYY (WW)"	: returnString = mm+"-"+dd+"-"+year+" ("+strWeekDay+")";		break;
		case "YYYY/M/D(WW)" :
		case "YYYY/M/D (WW)"	: returnString = year+"/"+mm+"/"+dd+" ("+strWeekDay+")";		break;
		case "D/M/YYYY(WW)" :
		case "D/M/YYYY (WW)"	: returnString = dd+"/"+mm+"/"+year+" ("+strWeekDay+")";		break;
		case "M/D/YYYY(WW)" :
		case "M/D/YYYY (WW)"	: returnString = mm+"/"+dd+"/"+year+" ("+strWeekDay+")";		break;
		case "YYYY.M.D.(WW)" :
		case "YYYY.M.D. (WW)"	: returnString = year+"."+mm+"."+dd+". ("+strWeekDay+")";		break;
		case "D.M.YYYY.(WW)" :
		case "D.M.YYYY. (WW)"	: returnString = dd+"."+mm+"."+year+". ("+strWeekDay+")";		break;
		case "M.D.YYYY.(WW)" :
		case "M.D.YYYY. (WW)"	: returnString = mmm+"."+dd+"."+year+". ("+strWeekDay+")";		break;
		case "YYYY.M.D(WW)" :
		case "YYYY.M.D (WW)"	: returnString = year+"."+mm+"."+dd+" ("+strWeekDay+")";		break;
		case "D.M.YYYY(WW)" :
		case "D.M.YYYY (WW)"	: returnString = dd+"."+mm+"."+year+" ("+strWeekDay+")";		break;
		case "M.D.YYYY(WW)" :
		case "M.D.YYYY (WW)"	: returnString = mm+"."+dd+"."+year+" ("+strWeekDay+")";		break;
		case "YY-M-D(WW)" :
		case "YY-M-D (WW)"	: returnString = yy+"-"+mm+"-"+dd+" ("+strWeekDay+")";		break;
		case "D-M-YY(WW)" :
		case "D-M-YY (WW)"	: returnString = dd+"-"+mm+"-"+yy+" ("+strWeekDay+")";		break;
		case "M-D-YY(WW)" :
		case "M-D-YY (WW)"	: returnString = mm+"-"+dd+"-"+yy+" ("+strWeekDay+")";		break;
		case "YY/M/D(WW)" :
		case "YY/M/D (WW)"	: returnString = yy+"/"+mm+"/"+dd+" ("+strWeekDay+")";		break;
		case "D/M/YY(WW)" :
		case "D/M/YY (WW)"	: returnString = dd+"/"+mm+"/"+yy+" ("+strWeekDay+")";		break;
		case "M/D/YY(WW)" :
		case "M/D/YY (WW)"	: returnString = mm+"/"+dd+"/"+yy+" ("+strWeekDay+")";		break;
		case "YY.M.D.(WW)" :
		case "YY.M.D. (WW)"	: returnString = yy+"."+mm+"."+dd+". ("+strWeekDay+")";		break;
		case "D.M.YY.(WW)" :
		case "D.M.YY. (WW)"	: returnString = dd+"."+mm+"."+yy+". ("+strWeekDay+")";		break;
		case "M.D.YY.(WW)" :
		case "M.D.YY. (WW)"	: returnString = mmm+"."+dd+"."+yy+". ("+strWeekDay+")";		break;
		case "YY.M.D(WW)" :
		case "YY.M.D (WW)"	: returnString = yy+"."+mm+"."+dd+" ("+strWeekDay+")";		break;
		case "D.M.YY(WW)" :
		case "D.M.YY (WW)"	: returnString = dd+"."+mm+"."+yy+" ("+strWeekDay+")";		break;
		case "M.D.YY(WW)" :
		case "M.D.YY (WW)"	: returnString = mm+"."+dd+"."+yy+" ("+strWeekDay+")";		break;
		case "LOCAL DEFAULT(WW)" :
		case "LOCAL DEFAULT (WW)"	:
			if (arrFormat.length>1)
			{
				var trType = arrFormat[1];
				switch (trType.left(2).toLowerCase())
				{
					case "zh","ja","ko","en":
						dtf = new Intl.DateTimeFormat([trType], {weekday: "short", year: "numeric",	day: "numeric",	month: "short"});
						strDate = dtf.format(new Date()).toString();
						break;
					default:
						dtf = new Intl.DateTimeFormat([trCode], {weekday: "short", year: "numeric",	day: "numeric",	month: "short"});
						strDate = dtf.format(new Date()).toString();
				}
			}
			else
			{
				dtf = new Intl.DateTimeFormat([trCode], {weekday: "short", year: "numeric",	day: "numeric",	month: "short"});
				switch (trCode.left(2).toLowerCase())
				{
					case "zh","ja","ko":
						if (agt.indexOf("Internet Explorer") != -1)
						{
							//strDate = dtf.format(new Date()).toString().replace("월","").replace("月","");//동양쪽 날짜 방식일 경우 월을 두번출력하는 오류가 있어 예외처리
							strDate = dtf.format(new Date()).toString();
						}
						else
						{
							strDate = dtf.format(new Date()).toString();
						}
						break;
					default:
						strDate = dtf.format(new Date()).toString();
				}
			}
			returnString = strDate;
			break;
		case "LOCAL DEFAULT LONG(WW)" :
		case "LOCAL DEFAULT LONG (WW)"	:
			if (arrFormat.length>1)
			{
				var trType = arrFormat[1];
				switch (trType.left(2).toLowerCase())
				{
					case "zh","ja","ko","en":
						dtf = new Intl.DateTimeFormat([trType], {weekday: "short", year: "numeric",	day: "numeric",	month: "long"});
						strDate = dtf.format(new Date()).toString();
						break;
					default:
						dtf = new Intl.DateTimeFormat([trCode], {weekday: "short", year: "numeric",	day: "numeric",	month: "long"});
						strDate = dtf.format(new Date()).toString();
				}
			}
			else
			{
				dtf = new Intl.DateTimeFormat([trCode], {weekday: "short", year: "numeric",	day: "numeric",	month: "long"});
				switch (trCode.left(2).toLowerCase())
				{
					case "zh","ja","ko":
						if (agt.indexOf("Internet Explorer") != -1)
						{
							//strDate = dtf.format(new Date()).toString().replace("월","").replace("月","");//동양쪽 날짜 방식일 경우 월을 두번출력하는 오류가 있어 예외처리
							strDate = dtf.format(new Date()).toString();
						}
						else
						{
							strDate = dtf.format(new Date()).toString();
						}
						break;
					default:
						strDate = dtf.format(new Date()).toString();
				}
			}

			returnString = strDate;
			break;
		default		: returnString = year+"-"+month+"-"+day;		break;
	}

	return returnString;
}
/**/

/*ASP의 istr*/
String.prototype.inStr = function(charSearchFor){
	for (i=0; i < this.length; i++)
	{
		  if (charSearchFor == Mid(this, i, 1))
		  {
				return i;
		  }
	}
	return -1;
}

/*날짜포맷인지 확인*/
function isDate(myDate) {
	var newDate;
	try
	{
		newDate = Date.parse(myDate);//파라미터가 날짜타입이 아닐경우 강제로 날짜타입으로 형변환
	}
	catch (e)
	{
		newDate = ""; //형변환시 오류가 발생하면 문자열로 인식하도록 처리
	}

    return newDate.constructor.toString().indexOf("Date") > -1;//날짜형식이면 true, 아니면 false 반환
}


/*배열인지 확인*/
function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;//배열이면 true, 아니면 false 반환
}

// 2010.06.24 김형식추가 : 각종 페이지에서 폼에 속한 값들을 배열로 만들어 준다.
//예) serializeReturn(폼이름, 접속인자 여부(다른인자뒤에 붙이면true, 아닌면 false)
function serializeReturn(Fname, attach){

	//폼내 항목값을 배열로 만들어 준다.
	var $SerializeData  = $("#"+Fname).serialize();

	//한글깨짐현상 페치
	 //var retuen_value= $SerializeData.replace(/%/g,'%25');
	//폼에 넘길데이터가있는지 확인하여 접속인자를 붙여리턴한다.

	if (attach)
	{
		arg="&";
	}else{
		arg="";
	}
	if ($SerializeData!='')
	{
		return	$SerializeData=arg+$SerializeData;
	}else{
		return '';
	}

}



// 2017.05.12 한정훈추가 : 텍스트 넘길 경우 사이에 콤마 넣어준다.
//예) numberWithCommas(125151)  --> Return 125,151
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//배열에서 중복값 제거
Array.prototype.unique=function() {
	var newArray=[], len=this.length;
	label:for(var i=0; i<len; i++) {
		for(var j=0; j<newArray.length; j++){
			if(newArray[j].trim()==this[i].trim()){ continue label;}
		}
		newArray[newArray.length] = this[i];
	}
	return newArray;
}


function base64Encode(str) {
  var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = "", i = 0, len = str.length, c1, c2, c3;
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += CHARS.charAt(c1 >> 2);
      out += CHARS.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += CHARS.charAt(c1 >> 2);
      out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
      out += CHARS.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += CHARS.charAt(c1 >> 2);
    out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += CHARS.charAt(c3 & 0x3F);
  }
  return out;
}

function getBinary(file) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", file, false);
  xhr.overrideMimeType("text/plain; charset=x-user-defined");
  xhr.send(null);
  return xhr.responseText;
}

/*ASP의 Mid함수*/
function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(str).substring(start,iEnd);
}

/*선택한 쿠키값 일어오기*/
function getCookie(name) {
	var allCookies=document.cookie.split('; ');
	for (i=0;i<allCookies.length;i++) {
		var cookieArray=allCookies[i].split('=');
		if (name==cookieArray[0])
		{
			return unescape(allCookies[i]);
			break;
		}
	}
}

/*
두날짜 사이의 일수 계산
 - sdate : 시작일(YYYY-MM-DD)
 - edate : 종료일(YYYY-MM-DD)
 - sDateYN : 시작일포함여부(true/false)
*/
function util_getDateDiff(sdate, edate, sDateYN){
	var diffDay = "";
	if (moment(sdate, "YYYY-MM-DD").isValid() && sdate.length == 10 && moment(edate, "YYYY-MM-DD").isValid() && edate.length == 10){
		diffDay = moment(edate).diff(sdate, "days");
		if (sDateYN && diffDay >= 0){
			diffDay += 1;
		}
	}
	return diffDay;
}

/*
오늘부터 특정일 까지의 일수 계산
 - edate : 종료일(YYYY-MM-DD)
 - sDateYN : 시작일포함여부(true/false)
*/
function util_getDateDiff_fromToday(edate, sDateYN){
	var diffDay = "";
	if (moment(edate, "YYYY-MM-DD").isValid() && edate.length == 10){
		diffDay = moment(edate).diff(moment(moment().format("YYYY-MM-DD")), "days");
		if (sDateYN && diffDay >= 0){
			diffDay += 1;
		}
	}
	return diffDay;
}

//날짜타입인지(시간 포함) 반환
function isDatetime(d)
{
    var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    //         yyyy -       MM      -       dd           hh     :   mm  :   ss
    return re.test(d);
}

function isDate2(d)
{
    var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    //         yyyy -       MM      -       dd
    return re.test(d);
}

//오늘날짜 반환
function getTodayDate(){
    var dt = new Date();

    var recentYear = dt.getFullYear();
    var recentMonth = dt.getMonth() + 1;
    var recentDay = dt.getDate();

    if(recentMonth < 10) recentMonth = "0" + recentMonth;
    if(recentDay < 10) recentDay = "0" + recentDay;

    return recentYear + "-" + recentMonth + "-" + recentDay;
}