/* ************************************************************************************************
 * System Name : KCC_SRC System
 * Class Name  : util.js
 * Author      : KCC
 * Date        :
 * Description : [ Common JS ] Common Utility JS
 *
 * History     :
 * ************************************************************************************************
 * No.     Date           Name             Description
 * ************************************************************************************************
 * CH_OO   2020. 03. 01.    KCC             Initial Release
 * CH_01
 **************************************************************************************************/
/*******************************************************
 * NULL Check !!
 *
 * @param {string} str
 * @returns {string} str
 * @description :  NULL Check !!
 *******************************************************/
function gfn_isNull(str){
    if(str == null || str == "undefined" || str == "null" || str == "NULL" || str == "")
        return true;
    else
        return false;
}

/*******************************************************
 * CREATE GRID LIST
 * @param {string}  gridId : 그리드 id  값    ex) grid_left
 * @param {string} jsonUrl : GET  통신경로  ex) "/system/codes-mng"
 * @param {string} fields : model 핕터 바인딩  ex) json  형태
 *      seqno: { type: "number" },
 *      mstCode: { type: "string" },
 *      mstName: { type: "string" },
 *      codeProperty: { type: "string" },
 *      gonggucodecopyYn: { type: "string" },
 *      activeYn: { type: "string" },
 *      memo: { type: "string" }
 * @param {string} pClumns : model 필드 설정
 *      { field: "No", width: "70px", attributes: { "class": "text_center" }, headerAttributes: { "class": "text_center" }, template: "#= rownum-- #" },
 *      { field: "mstCode", title: "코드", width: "200px", attributes: { "class": "text_center" }, headerAttributes: { "class": "text_center min_width_th" }, template: "<div class='text_wrap'>#: mstCode #</div>" },
 *      { field: "mstName", title: "코드명", width: "200px", attributes: { "class": "text_center" }, headerAttributes: { "class": "text_center" } },
 *      { field: "activeYn", title: "사용여부", width: "70px", attributes: { "class": "text_center" }, headerAttributes: { "class": "text_center" } }
 * @param {string} pChange :  onchange 콜백함수
 * @param {string} pPageable : 페이지 속성
 * @param {string} pChange   : 변경 함수
 * @returns {Object} retObj
 * @description :   GRID LIST !!
 *******************************************************/
function gfn_setGridForm(opt){
    console.log("gfn_setGridForm opt======", opt);

    //필수 부분
    var gridId          = !gfn_isNull(opt.gridId)               ? opt.gridId                : "grid";                       // (필수) 그리드 id
    var jsonUrl         = !gfn_isNull(opt.jsonUrl)              ? opt.jsonUrl               : "";                           // (필수) GET  통신경로
    var pClumns         = !gfn_isNull(opt.pClumns)              ? opt.pClumns               : "";                           // (필수) 그리드 컬럼설정 설정

    // 옵션부분
    var pFields         = !gfn_isNull(opt.pFields)              ? opt.pFields               : "";                           // (선택) model 핕터 바인딩
    var pPageable       = !gfn_isNull(opt.pPageable)            ? opt.pPageable             : "";                           // (선택) 페이지 체크
    var pSelectable     = !gfn_isNull(opt.selectable)           ? opt.selectable            : "row";                        // 선택모드 변경 기본으로는 row
    var pChange         = !gfn_isNull(opt.pChange)              ? opt.pChange               : "";                           // (선택) List 전체 체크박스가 있을 경우
    var gridSetOptions  = !gfn_isNull(opt.gridSetOptions)       ? opt.gridSetOptions        : "";                           // (선택) 예외 이벤트
    var setParameterMap     = !gfn_isNull(opt.setParameterMap)  ? opt.setParameterMap       : gfn_defaultParameterMap;      // 기본 파라미터 함수 설정
    var setParamsKeyword     = !gfn_isNull(opt.setParamsKeyword)  ? opt.setParamsKeyword    : "mstKeyword";                 // 기본파라미터값  설정

    //페이지 처리 초기 설정
    if(pPageable==""){
        pPageable = {
            buttonCount: 10,
            pageSizes: UI.getGridPageSizes(510)
        }
    };

    var gridObj =$("#"+gridId).kendoGrid({
        dataSource: {
            transport: {
                read: jsonUrl,
                dataType: "json",
                parameterMap: function(data){
                    var returnObj = setParameterMap(data,setParamsKeyword);
                    return returnObj ;
                }
            },
            schema: {
                data: "data",
                total: "total",
                model: {
                    fields: pFields
                }
            },
            serverPaging: true,
            serverSorting: true,
            pageSize: UI.getGridPageSize(510)
        },
        change:  pChange,// leftGridOnChange,
        sortable: true,
        pageable:pPageable,
        selectable: pSelectable,
        columns: pClumns ,
        dataBound: function(e) {
            var cols = e.sender.columns;
            var colNm = 0;
            if ($("#"+gridId).data("kendoGrid").dataSource.data()[0] != null) {
                colNm = $("#"+gridId).data("kendoGrid").dataSource.data()[0].codeProperty.split(',');
            }
            for (var i = 0; i < colNm.length; i++) {
                var cnt = i + 1;
                //cols[i+4].title = colNm[i];
                $("#"+gridId+" thead [data-field=property" + cnt + "]").html(colNm[i]);
                $("#"+gridId).data("kendoGrid").showColumn(i + 4);
            }

            if(this.dataSource.total() != null && this.dataSource.total() > 0) {
                e.sender.select("tr:eq(0)");
            }
        },
        dataBinding: function() {
            rownum = (this.dataSource.total() - (this.dataSource.page() - 1) * this.dataSource.pageSize());
            rownum = (rownum < 1)? this.dataSource.total(): rownum;
        },
    });

    //추가 이벤트 설정
    if(gridSetOptions!=""){
        $("#" + gridId).kendoGrid(gridSetOptions);
    }
};

/*******************************************************
 * 그리드생성시 파라미터 default 설정함수
 * @param {Object} data
 * @description :  그리드생성시 파라미터 default 설정함수
 *******************************************************/
function gfn_defaultParameterMap(data,paramId){

    console.log("paramId=====", paramId);

    var serverUrlParams = {
        size: data.pageSize,
        page: data.page = data.page - 1
    };
    if(debug) console.log(serverUrlParams.page);
    if (data.sort && data.sort.length > 0)
        serverUrlParams.sort = data.sort[0].field + '.' + data.sort[0].dir;
    if ($.trim($("#"+paramId).val()) != "") {
        serverUrlParams.keyword = $.trim($("#"+paramId).val());
        serverUrlParams.page = 0;
    }
    return serverUrlParams;
}

/*******************************************************
 * 그리드 선택한 후 폼에 데이터 넣기
 * @param {Object} opt
 * @description :  선택한 폼에 데이터 넣기
 *******************************************************/
function gfn_setFormData(opt){
    var formId          = !gfn_isNull(opt.formId)           ? opt.formId     : "mstForm";                // form  id
    var selectedItem   = !gfn_isNull(opt.selectedItem)       ? opt.selectedItem     : "";                // data item
    for (key in selectedItem) {
        var $element = $("#"+formId+" [name=" + key + "]");
        if ($element.length == 0) {
            continue;
        }
        if (selectedItem[key] != null) {
            if ($element.is(":radio")) {
                $("#"+formId+" :radio[name=" + key + "][value=" + selectedItem[key] + " ]").prop("checked", true);
            } else if ($element.is(":checkbox")) {
                if(selectedItem[key]=="Y"){
                    $("#"+formId+" :checkbox[name=" + key + "]").prop("checked", true);
                }else{
                    $("#"+formId+" :checkbox[name=" + key + "]").prop("checked", false);
                }
            } else {
                $element.val("");
                $element.val(selectedItem[key]);
            }
        }
    }
}
