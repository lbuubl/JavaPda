
importScripts('/resources/module/assets/js/plugins/jquery.hive.pollen/jquery.hive.pollen.js')

/* StringBuffer 선언 */
var StringBuffer = function() {
    this.buffer = new Array();
};
StringBuffer.prototype.append = function(str) {
    this.buffer[this.buffer.length] = str;
};
StringBuffer.prototype.toString = function() {
    return this.buffer.join("");
};
/* //StringBuffer 선언 */


var pageSize = 5000;

self.addEventListener('message', function(e) {

	var rowData			= e.data.rowData;
	var gubun			= e.data.gubun
	var page			= e.data.page
	var arr_rowIndex	= e.data.arr_rowIndex
	var arr_cellIndex	= e.data.arr_cellIndex


	//console.log(gubun)

	var filterdData = $.grep(rowData, function (element, idx) {
		return (pageSize * (page-1)) <= idx && (pageSize * page) > idx
	});


	var html = new StringBuffer();
	$.each( filterdData, function (idx, item){

		var inText = "";
		var inTextLen = 0;
		if(item.date != undefined){
			$.each(item.date, function (idx2, item2){
				inTextLen += item2.str.length;

				if (inText != ""){
					inText += " "
				}

				if (item2.type == "S"){
					inText += "<"
					//inText += "◁"
				}

				inText += parseInt(item2.str)

				if (item2.type == "E"){
					inText += ">"
					//inText += "▷"
				}
			});
		}

		/*----------------------------------------------------------------------*/
		/* MstSn, YYYYMM 으로 각각 rowIndex, CellIndex를 가져 와 위치값 계산 */
		var rIdx = arr_rowIndex[item.mstSn];
		var cIdx = arr_cellIndex[item.yyyymm];
		if(gubun == "P"){
			rIdx = (rIdx * 2) -1
		}else{
			rIdx = (rIdx * 2)
		}

		var top = 30 * (rIdx-1);
		var left = 50 * (cIdx-1);

		//글자수에 따른 폰트조절
		var inTextSize = "";
		if (inTextLen > 3){
			inTextSize = " tx-4"
		}
		/*----------------------------------------------------------------------*/


		//html += "<div class='cell "+item.class+" r"+rIdx+" c"+cIdx+"' mstSn='"+item.mstSn+"' gubun='"+gubun.substr(0,1)+"' style='top:"+top+"px; left:"+left+"px'>"+inText+"</div>"
		//html += "<div class='cell "+item.class+" r"+rIdx+" c"+cIdx+"' mstSn='"+item.mstSn+"' gubun='"+gubun.substr(0,1)+"'>"+inText+"</div>"
		//html.append("<div class='cl "+item.class+" r"+rIdx+" c"+cIdx+"' mstSn='"+item.mstSn+"' gubun='"+gubun.substr(0,1)+"'>"+inText+"</div>")
		html.append("<div class='cl "+item.class+" r"+rIdx+" c"+cIdx+ inTextSize+"' mSn='"+item.mstSn+"' gb='"+gubun.substr(0,1)+"'>"+inText+"</div>")
	});



	self.postMessage({
		"html" : html.toString(),
		"rowData" : rowData,
		"gubun" : gubun
	});


}, false);
