
importScripts('/resources/module/assets/js/plugins/jquery.hive.pollen/jquery.hive.pollen.js')

var pageSize = 200;

self.addEventListener('message', function(e) {

	var rowData			= e.data.rowData;
	var arr_rowIndex	= e.data.arr_rowIndex
	var arr_cellIndex	= e.data.arr_cellIndex


	//console.log(gubun)
	/*
	var filterdData = $.grep(rowData, function (element, idx) {
		return (pageSize * (page-1)) <= idx && (pageSize * page) > idx
	});
	*/

	//console.log("++++++++++++++++++++++++++++++")
	//console.log(rowData)
	//console.log("++++++++++++++++++++++++++++++")

	var html = ""
	$.each( rowData, function (idx, item){

		var inText = "";
		if(item.date != undefined){
			$.each(item.date, function (idx2, item2){
				inText += item2.str
			});
		}


		/* MstSn, YYYYMM 으로 각각 rowIndex, CellIndex를 가져 와 위치값 계산 */
		var rIdx = arr_rowIndex[item.mstSn];
		var cIdx = arr_cellIndex[item.yyyymm];

		if (rIdx != undefined){
			if(item.gubun == "P"){
				rIdx = (rIdx * 2) -1
			}else{
				rIdx = (rIdx * 2)
			}

			html += "<div class='cl memo r"+rIdx+" c"+cIdx+"' sn='"+item.sn+"'></div>"
		}

	});



	self.postMessage({
		"html" : html
	});


}, false);
