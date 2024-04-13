
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
var jsonAjax = function(methodType,asyncType,urlPath,dataReceiveType,sendContentType,sendData,errorFunc,successFunc){
    try{
        $.ajax({
            type : methodType,
            url : urlPath,
            async : asyncType,
            //timeout : "5000", // 150000
            headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
            cache : false,
            contentType : "application/json; charset=utf-8",
            dataType : dataReceiveType,
            data : (sendData != "") ? ((sendContentType == "json" || sendContentType == "application/json") ? JSON.parse(sendData) : sendData) : "",
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

let gn_toDay = function(val){
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;
  return dateString
}


