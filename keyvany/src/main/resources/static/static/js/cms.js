
/***********************************************************************
 * function Name : callAjax
 * description : 공통 Ajax
 *
 ***********************************************************************/
var callAjax = function(methodType,asyncType,urlPath,dataReceiveType,sendContentType,sendData,errorFunc,successFunc){
    try{
        $.ajax({
            type : methodType,
            url : urlPath,
            async : asyncType,
            //timeout : "5000", // 150000
            headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
            cache : false,
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            dataType : dataReceiveType,
            data : (sendData != "") ? ((sendContentType == "json" || sendContentType == "application/json") ? JSON.parse(sendData) : sendData) : "",
            error : errorFunc,
            success : successFunc
        });
    }catch(e){
        alert("에러코드 : " + e.code + "\r\n 에러내용 : " + e.message);
    }
};

/***********************************************************************
 * function Name : callAjax
 * description : 공통 Ajax
 *
 ***********************************************************************/
var jsonAjax = function(methodType,asyncType,urlPath,sendData, successFunc,errorFunc){
    try{
        $.ajax({
            type : methodType,
            url : urlPath,
            async : asyncType,
            //timeout : "5000", // 150000
            headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
            cache : false,
            contentType : "application/json; charset=utf-8",
            data : JSON.stringify(sendData),
            error : errorFunc,
            success : successFunc
        });
    }catch(e){
        alert("에러코드 : " + e.code + "\r\n 에러내용 : " + e.message);
    }
};

var gn_only_number = function(e){
    if((event.keyCode<48)||(event.keyCode>57)){
        event.returnValue=false;
    }
}

// null check
var gn_nullCheck = function(v){
    return !(v === '' || v === 'undefined' || v == null);
};

/***********************************************************************
 * function Name : gn_validation
 * description : class 명으로 value 요소 체크
 ***********************************************************************/
var gn_validation = function(e){
    var check_list = e.querySelectorAll('.required');
    var flag = true;
    for(var i=0; i<check_list.length; i++){
        if(!gn_nullCheck(check_list[i].value)){
            alert(check_list[i].getAttribute('data-title') +"(은)는 입력 필수사항입니다.");
            check_list[i].focus();
            flag = false;
            return false;
        }
    }
    return flag;
};

let gn_toDayF = function(val){
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;
  return dateString
}

//바코스 스켄 설정
var gl_fnBarcodeScanner = function(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
     );
  }

var gf_facAjax = function( pFacNm, callbackFunc){
	let getData;
	let params = {
      facCd : ''
      , facNm:  pFacNm
  }
  console.log('fnInitFacModalPopup params=------',params)
  $.ajax({
      url : "/cms/common/getFacInfo",
      type : "POST",
      processData: false,
      contentType : "application/json; charset=utf-8",
      dataType: "json",
      data :JSON.stringify(params),
      success : function(data) {
         getData = data.data;
         callbackFunc(true, getData)
      },
      error : function() {
         callbackFunc(false, getData)
      }
  });

}

// TODO : 공통 바코드 조회 ajax
var gf_barcodeSearch = function( pUrl, params, callbackFunc){
$.ajax({
      url : pUrl,
      type : "POST",
      processData: false,
      contentType : "application/json; charset=utf-8",
      dataType: "json",
      data :JSON.stringify(params),
      success : function(data) {
      	callbackFunc(data)
      },
      error : function() {
          alert("처리중 오류가 발생했습니다.");
      }
  });

}


