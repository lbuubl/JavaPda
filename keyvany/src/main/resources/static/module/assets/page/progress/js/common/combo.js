/*
 * 필수 변수 선언
 * var prjCd = '${prjCd}'; //공통 DropDownList 사용 필수 프로젝트 코드 선언
 * var initParam = {"lrgCstpCd" : stdWbsCd_1, "mclsCd" : stdWbsCd_2, "sclsCd": stdWbsCd_3 };
 */
$(document).ready(function() {
		// Revision SelectBox 정보 리스트
		var selRvsInfo = $("#selRevisionInfo").kendoDropDownList({
			//optionLabel: "-선택-",
			dataTextField: "rvsNoNm",
			dataValueField: "rvsNo",
			value: initParam.rvsNo,
			dataSource: {
				transport: {
					read: '/module/usermodule/progress/common/rvsInfo',
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
							prjCd: prjCd
						};
						return serverUrlParams;
					}
				}
			},
			select: onSelSowInfo,
			dataBound: function(e){
				var _index = this.dataItem().maxRvsNo;
				this.select(function(dataItem) {

				    return dataItem.rvsNo === _index;
				});

				$("#selRevisionInfo").trigger("change");
			}

		}).data("kendoDropDownList");


		//* 공구 리스트 selectBox 정보 Get
		var selSowInfo = $("#selSowInfo").kendoDropDownList({
			//optionLabel: "-선택-",
			dataTextField: "sowNm",
			dataValueField: "sowCd",
			value: initParam.sowCd,
			optionLabel: "공구",
			dataSource: {
				transport: {
					read: '/module/usermodule/progress/common/sowInfo',
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
							prjCd: prjCd
						};
						return serverUrlParams;
					}
				}
			},
			select: onSelSowInfo
		}).data("kendoDropDownList");

		// 공구 선택시 건물 정보 리스트
		function onSelSowInfo(e) {
			if (e.dataItem) {
				var dataItem = e.dataItem;
				//sowNo = dataItem.sowCd;
				initParam.sowNo = dataItem.sowCd;
				initParam.bldgNo = '';
				// 공구 선택 시 해당하는 '동' 정보 Get
			 } else {
				 console.log("event :: select");
			 }
		}
		// 동 정보 리스트 Get
		var selBldgInfo = $("#selBldgInfo").kendoDropDownList({
			autoBind: true,
			cascadeFrom: "selSowInfo",
			optionLabel: "동",
			dataTextField: "bldgNm",
            dataValueField: "bldgNo",
			value: initParam.bldgNo,
               dataSource: {
                   serverFiltering: true,
                   transport: {
					read: "/module/usermodule/progress/common/bldgInfo",
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
							sowNo: $("#selSowInfo").val(),
							prjCd: prjCd
						};
						return serverUrlParams;
					}
				}
               },
               dataBound: function(e) {
               	var dataLength = e.sender.dataSource._pristineData.length;
               	if(dataLength < 1){
               		selBldgInfo.enable(false);
               		//selLrgCstpCd.enable(false);
               		//selMclsCd.enable(false);
               		//selSclsCd.enable(false);
               	}
	        },
               select: onSelBldgInfo
		}).data("kendoDropDownList");

		// 라인 선택시 데이터
		function onSelBldgInfo(e) {
			if (e.dataItem) {
				var dataItem = e.dataItem;
				initParam.bldgNo = dataItem.bldgNo;
			 } else {
				 //console.log("event :: select");
			 }
		}

		// 라인 정보 리스트 Get
		var selLineInfo = $("#selLineInfo").kendoDropDownList({
			autoBind: true,
			cascadeFrom: "selBldgInfo",
			optionLabel: "라인",
			dataTextField: "lnNm",
            dataValueField: "lnNo",
			value: initParam.lnNo,
               dataSource: {
                   serverFiltering: true,
                   transport: {
					read: "/module/usermodule/progress/common/lineInfo",
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
							sowNo: $("#selSowInfo").val(),
							bldgNo: $("#selBldgInfo").val(),
							prjCd: prjCd
						};
						return serverUrlParams;
					}
				}
               },
               dataBound: function(e) {
               	var dataLength = e.sender.dataSource._pristineData.length;
               	if(dataLength < 1){
               		selLineInfo.enable(false);
               		//selLrgCstpCd.enable(false);
               		//selMclsCd.enable(false);
               		//selSclsCd.enable(false);
               	}
	        },
               select: onSelLineInfo
		}).data("kendoDropDownList");

		// 라인 선택시 데이터
		function onSelLineInfo(e) {
			if (e.dataItem) {
				var dataItem = e.dataItem;
				initParam.lnNo = dataItem.lnNo;
			 } else {
				 //console.log("event :: select");
			 }
		}

		//대공종
		var lrgCstpCdInfo = $("#selLrgCstpCdInfo").kendoDropDownList({
			dataTextField: "lrgCstpNm",
			dataValueField: "lrgCstpCd",
			optionLabel: "대공종",
			value: initParam.lrgCstpCd,
			dataSource: {
				transport: {
					read: '/module/usermodule/progress/common/categories',
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
								prjCd: prjCd ,
								cateType: "lrg"
						};
						return serverUrlParams;
					}
				}
			},
			dataBound: function(e) {
               	var dataLength = e.sender.dataSource._pristineData.length;
               	if(dataLength < 1){
               		//selBldgInfo.enable(false);
               		//selLrgCstpCdInfo.enable(false);
               		selMclsCdInfo.enable(false);
               		selSclsCdInfo.enable(false);
               	}
	        }
			//,select: onSelLrgCstpCdInfo
		}).data("kendoDropDownList");

		//중공종
		var selMclsCdInfo = $("#selMclsCdInfo").kendoDropDownList({
			autoBind: false,
			cascadeFrom: "selLrgCstpCdInfo",
			optionLabel: "중공종",
            dataValueField: "mclsCd",
			dataTextField: "mclsNm",
			value: initParam.mclsCd,
               dataSource: {
                   serverFiltering: true,
                   transport: {
					read: "/module/usermodule/progress/common/categories",
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
								prjCd: prjCd,
								cateType: "mcls",
								cateCd: $("#selLrgCstpCdInfo").val()
						};
						return serverUrlParams;
					}
				}
               }
		}).data("kendoDropDownList");

		//소공종
		var selSclsCdInfo = $("#selSclsCdInfo").kendoDropDownList({
			autoBind: true,
			cascadeFrom: "selMclsCdInfo",
			optionLabel: "소공종",
            dataValueField: "sclsCd",
			dataTextField: "sclsNm",
			value: initParam.sclsCd,
               dataSource: {
                   serverFiltering: true,
                   transport: {
					read: "/module/usermodule/progress/common/categories",
					dataType : "json",
					parameterMap: function (data) {
						var serverUrlParams = {
								prjCd: prjCd,
								cateType: "scls",
								lrgCateCd : $("#selLrgCstpCdInfo").val(),
								cateCd: $("#selMclsCdInfo").val()
						};
						return serverUrlParams;
					}
				}
               }
		}).data("kendoDropDownList");

	});<!--e:docReady-->