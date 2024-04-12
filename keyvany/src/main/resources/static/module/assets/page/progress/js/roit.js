var ROIT = function() {
	return {
		popup: function(url, title, w, h, resizable, scrollbars) {
			var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		    var top = ((height / 2) - (h / 2)) + dualScreenTop;
		    if(!resizable) {
		    	resizable = "no";
		    }
		    if(!scrollbars) {
		    	scrollbars = "no";
		    }

		    var newWindow = window.open(url,title,"width="+w+", height="+h+",top="+top+", left="+left+",resizable="+resizable+",scrollbars="+scrollbars);
		}
		, getFormObj: function(formId) {
		    var formObj = {};
		    var inputs = $('#'+formId).serializeArray();
		    $.each(inputs, function (i, input) {
		        formObj[input.name] = input.value;
		    });
		    return formObj;
		}
        , callAJAX: function() {
			var contextPath = "";
			var url;
			var type;
			var data;
			var async;
			var callback;

			switch(arguments.length) {
				case 1 :
					url = arguments[0];
					type = 'GET';
					async = false;
					break;
				case 2 :
					url = arguments[0];
					type = arguments[1];
					async = false;
					break;
				case 3 :
					url = arguments[0];
					type = arguments[1];
					if(typeof arguments[2] == "function") {
						callback = arguments[2];
					} else {
						data = arguments[2];
					}

					async = false;
					break;
				case 4 :
					url = arguments[0];
					type = arguments[1];
					data = arguments[2];
					callback = arguments[3];
					async = false;
					break;
				case 5 :
					url = arguments[0];
					type = arguments[1];
					data = arguments[2];
					async = arguments[3];
					callback = arguments[4];
					break;
			}
			var obj = null;
			url = contextPath + url;

			$.ajax({'url':url,
					'async':async,
					'type':type,
					'data' : data,
					'success':function(resp) {
						if(callback) {
							callback(resp);
						}
					},
					'error':function(resp) {
						if(resp.responseText != "") {
							alert(resp.responseText);
						} else {
							alert('요청이 실패하였습니다.');
						}
					}
			});
		}
        , makeExcelForm : function(datas, columnSize, columnId, columnNm, columnAlign) {
			var headBackground = "#E9E9E9";						//컬럼명 배경색
			var headBackColor = "#000000";						//컬럼명 글자색
			var headTextAlign = "center";						//컬럼명 글자색
			var columns = [];
			var rows = [];
			var headCells = [];

			for(j = 0 ; j < columnSize.length ; j++){
				columns.push({width : columnSize[j]});
				headCells.push({value : columnNm[j], background : headBackground, color : headBackColor , textAlign : headTextAlign ,  borderRight:{ color: "#D7D7D7", size: 1 }, borderBottom: { color: "#D7D7D7", size: 1 }});
			}

			rows.push({cells : headCells});

			//if(rowspanColumn.length == 0){
			rowspanColumn = [];
			if(rowspanColumn.length == 0){

				$(datas).each(function(i, item) {
					var cells = [];
					for(j = 0 ; j < columnId.length ; j++){

						var align = columnAlign[j] == "left" ? true : columnAlign[j] == "center"? true:  columnAlign[j] == "right"? true: false;
						if(align){
							if(columnId[j] == "NO" || columnId[j] == "SORT"){
								cells.push({value : (i+1) , textAlign : columnAlign[j] });
							}else{
								cells.push({value : item[columnId[j]] , textAlign : columnAlign[j] });
							}
						}else{
							if(columnId[j] == "NO" || columnId[j] == "SORT"){
								cells.push({value : (i+1)});
							}else{
								cells.push({value : item[columnId[j]] });
							}
						}
					}
					rows.push({cells : cells});
				});
			}else {

				var text = '{';

				for(j = 0 ; j < rowspanColumn.length ; j++){

					var val = "";
					var cnt = 0;

					text += '"'+rowspanColumn[j]+'" : {  ';

					$(datas).each(function(i, item) {

						//console.log("val : "+val+"  item[columnId[j]] : "+item[columnId[j]]);
						if(val != item[rowspanColumn[j]]){

							if(val != ""){
								text +='"'+val+'" : ' +cnt+' , ';
							}
							//console.log("val : "+val+"  cnt : "+cnt);

							val = item[rowspanColumn[j]];
							cnt = 0;
						}
						cnt += 1;


					});

					text = text.substr(0,text.length-2);

					text += '} ,';
				}

				text = text.substr(0,text.length-2);

				text += '}';
				//console.log(text);
				var jsonObj = JSON.parse(text);

				//console.log(jsonObj);

				var te = "";
				$(datas).each(function(i, item) {
					var cells = [];
					for(j = 0 ; j < columnId.length ; j++){


						cells.push({value : item[columnId[j]]});
						/*
							if(false){
								//console.log("te : "+te+ "   item[columnId[j]] : "+item[columnId[j]]);

								//var rowS = jsonObj[rowspanColumn[k]][item[columnId[j]]];

								//cells.push({value : item[columnId[j]], rowSpan : rowS});

							}else{
								cells.push({value : item[columnId[j]]});
							}
						*/

					}
					rows.push({cells : cells});
				});
			}


			workbook = new kendo.ooxml.Workbook({
			  sheets: [
			      {
			    	  columns: columns,
			          rows: rows
			      }
			  ]
			});

			return workbook;

		},
		uploadExcel : function(url,data){ // 엑셀 업로드
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> ROIT EXCEL UPLOAD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			var excelData = '';
			if(data !=null && data !=''){
				excelData = data;
			}
			kendo.confirm('등록 하시겠습니까?').done(function() {
				var loader = UI.Loading.open();
				$('#fileFrm').ajaxSubmit({
					url: url,
					data : excelData,
					beforeSubmit: function(arr, $form, options) {
						console.log("beforeSubmit===", arr, arr[0]);
						var filename = arr[0].value.name;
						var ext = UI.getFileExtension(filename);
						if(ext == 'xls' || ext == 'xlsx') {
							return true;
						} else {
							kendo.alert('엑셀파일을 등록하여 주십시오.');
							return false;
						}
					},
		            success: function(resp ,status){
		            	loader.close();
		            	$('#fileFrm')[0].reset();
		            	if(resp == ''){
			            	kendo.alert('엑셀파일이 등록되었습니다.');
		            	}else{
		            		kendo.alert(resp);
		            	}
		            	//_this.loadRev();
		            },
		            error: function(e){
		            	loader.close();
		            	$('#fileFrm')[0].reset();
		            	//kendo.alert('엑셀파일이 등록중 오류가 발생되었습니다.');
		            }
		        });
			});
		},
		multiUploadExcel : function(id,url,data){ // file 이름변경 엑셀 업로드
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> MULTI  ROIT EXCEL UPLOAD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log("id:", id);


			var excelData = '';
			if(data !=null && data !=''){
				excelData = data;
			}
			kendo.confirm('등록 하시겠습니까?').done(function() {
				var loader = UI.Loading.open();
				$('#'+id).ajaxSubmit({
					url: url,
					data : excelData,
					beforeSubmit: function(arr, $form, options) {

						console.log("beforeSubmit===", arr, arr[0]);
						var filename = arr[0].value.name;
						var ext = UI.getFileExtension(filename);
						if(ext == 'xls' || ext == 'xlsx') {
							return true;
						} else {
							kendo.alert('엑셀파일을 등록하여 주십시오.');
							return false;
						}
					},
		            success: function(resp ,status){
		            	loader.close();
		            	$('#'+id)[0].reset();
		            	if(resp == ''){
			            	kendo.alert('엑셀파일이 등록되었습니다.');
		            	}else{
		            		kendo.alert(resp);
		            	}
		            	//_this.loadRev();
		            },
		            error: function(e){
		            	loader.close();
		            	$('#'+id)[0].reset();
		            	//kendo.alert('엑셀파일이 등록중 오류가 발생되었습니다.');
		            }
		        });
			});
		}
    };
}();
