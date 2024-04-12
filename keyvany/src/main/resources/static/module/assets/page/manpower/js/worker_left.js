
importScripts('/resources/module/assets/js/plugins/jquery.hive.pollen/jquery.hive.pollen.js')

var pageSize = 500;

self.addEventListener('message', function(e) {

	var page	= e.data.page;
	var rowData = e.data.rowData;
	var aa		= e.data.aa;


	var filterdData = $.grep(rowData, function (element, index) {
		return (pageSize * (page-1)) <= index && (pageSize * page) > index
	});

	var goungCursor = "";
	if (aa == "yes"){
		goungCursor = " cp"
	}

	var html = "";
	$.each( filterdData, function (index, item){

		var pDate = ""
		var rDate = ""
		var userLabelPart = "&nbsp;"

		if(item.MasterSn != ""){
			pDate = item.P_SDate+" ~ "+item.P_EDate
			rDate = item.R_SDate+" ~ "+item.R_EDate
			userLabelPart = item.User_Level_nm+"<br>("+item.User_Part_nm+")"

			if (item.P_Cnt > 1){
				pDate += "("+item.P_Cnt+")"
			}
			if (item.R_Cnt > 1){
				rDate += "("+item.R_Cnt+")"
			}
		}

		var sCursor = "";
		if (item.User_Sn != ""){
			sCursor = "curP"
		}

		var i18_stay = ""
		if (item.Stay_Yn != ""){
			i18_stay = "data-i18n='manpower:label.stay_"+item.Stay_Yn+"'"
		}

		var orgGongguNm = "";
		var gongguNm = item.Gonggu_Nm;
		if (item.Gonggu_Nm_Cut != ""){
			gongguNm = item.Gonggu_Nm_Cut
			orgGongguNm = item.Gonggu_Nm
		}

		//같은공구 중에 처음인지 체크
		var firstSibling = ""
		var goungBg = ""
		if (item.gfc == "Y"){
			firstSibling = " rk1"
			goungBg = " gk-"+item.Gongu_Kind
		}

		var bg_corpWorker = "";
		if(item.Corp_Worker_Yn == "1" && item.CorpNm != ""){
			bg_corpWorker = "bg-corpWorker"
		}

		//ofh ==> overflow:hidden

		//html += "<tr class='i-row do-rowspan' sn='"+item.MasterSn+"' gSn='"+item.Gonggu_SeqNo+"' uSn='"+item.User_Sn+"' cYn='"+item.Corp_Worker_Yn+"'>"
		html += "<tr class='i-row"+firstSibling+"' sn='"+item.MasterSn+"' gSn='"+item.Gonggu_SeqNo+"' uSn='"+item.User_Sn+"' cYn='"+item.Corp_Worker_Yn+"'>"
		html += "	<td valign='top' class='pin-wrapper ofh' ><div class='stick'>"+item.Host_Yn+"</div></td>"
		html += "	<td valign='top' class='pin-wrapper ggNm"+goungBg+"' title='"+orgGongguNm+"'><div class='stick"+goungCursor+"'>"+gongguNm+"</div></td>"
		html += "	<td valign='top' class='pin-wrapper ofh' ><div class='stick'>"+item.Gonggu_Stat+"</div></td>"
		html += "	<td>"
		html += "		<table class='sbt'>"
		html += "			<tr><td class='PRdt "+sCursor+"' gb='P'>"+pDate+"</td></tr>"
		html += "			<tr><td class='PRdt "+sCursor+"' gb='R'>"+rDate+"</td></tr>"
		html += "		</table>"
		html += "	</td>"
		//html += "	<td><div class='bd-bt'>"+item.AllDate+"</div><div>"+item.RemainDate+"</div></td>"
		html += "	<td class='remain'>"
		html += "		<table>"
		html += "			<tr><td>"+item.AllDate+"</td></tr>"
		html += "			<tr><td>"+item.RemainDate+"</td></tr>"
		html += "		</table>"
		html += "	</td>"
		html += "	<td class='stayYn'>"+item.Stay_Yn2+"</td>"
		html += "	<td>"+userLabelPart+"</td>"
		html += "	<td class='name cp "+bg_corpWorker+"'>"+item.User_Nm+"</td>"
		html += "</tr>"

	});


	self.postMessage({
		"html" : html
	});


}, false);