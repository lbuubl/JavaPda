
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<head>
    <title>웹사이트 관리자</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.7, minimum-scale=0.7, maximum-scale=1.4, user-scalable=yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
<!--  HTMLHeader.page   -->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1, minimum-scale=0.25, maximum-scale=1.6">
  <meta name="theme-color" content="#37474F">
  <link rel="apple-touch-icon" href="/resources/module/assets/images/mobile_icone/114114.png" />
  <link rel="apple-touch-icon-precomposed" href="/resources/module/assets/images/mobile_icone/114114.png" />
  <link rel="shortcut icon" href="/resources/module/assets/images/mobile_icone/7272.png" />
</head>

  <script>
      // var a =0;
      var gg_code=""
     var isImagePostLoad=false;//에디터에서 이미지추가 스크립트 로드여부
     var MultiLngDomain =location.host;
     alert(MultiLngDomain)
  </script>

      <link href="/resources/module/assets/css/WHITE/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/WHITE/bootstrap.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/WHITE/core.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/WHITE/components.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/WHITE/colors.css" rel="stylesheet" type="text/css">

<!-- kendo css -->
<link rel="stylesheet" href="/resources/module/assets/page/progress/css/kendo/styles/kendo.common.min.css" />
<link rel="stylesheet" href="/resources/module/assets/page/progress/css/kendo/styles/kendo.default.min.css" />
<!-- //kendo css -->

  <link  href="/resources/module/assets/css/WHITE/jstree/themes/default/style.min.css" rel="stylesheet" type="text/css">
  <style>
    .cursor_css{   cursor:pointer;  }
    .FixColnum{
        padding-left: 0px;
        text-overflow: ellipsis;
        list-style-position: inside;
        white-space: nowrap;
        overflow: hidden;
     }
     /* Datatable scroll 위한 CSS 처리*/
     .table.text-nowrap.table-bordered{
      border:0px !important;
     }
    .text-nowrap.table-bordered thead tr > td:first-child,  .text-nowrap.table-bordered thead tr > th:first-child,.text-nowrap.table-bordered tbody tr > td:first-child,  .text-nowrap.table-bordered tbody tr > th:first-child{
      border-left:0px;border-right:0px;
    }
    .text-nowrap.table-bordered thead tr > td:last-child,  .text-nowrap.table-bordered thead tr > th:last-child,.text-nowrap.table-bordered tbody tr > td:last-child,  .text-nowrap.table-bordered tbody tr > th:last-child{
      border-left:0px;border-right:0px;
    }
      .text-nowrap.table-bordered tbody tr:last-child > td,  .text-nowrap.table-bordered tbody tr:last-child > th{
      border-bottom:0px;
    }
    /*연락망css*/
    .Contact-list>.media{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .Contact-list>.media>.prjnm{
      position: relative;
      left: -10px;
      margin-top: 10px;
      margin-bottom: 10px;
      width: 105%;
      background-color: aliceblue;
      line-height: 25px;
    }
    .viewKind{
      height:35px;
    }
    .viewKind .btn{
      padding: 1px 4px;
      display:none;
    }
    .mobile_text, .sms_text, .tel_text, .email_text{
      display:none;
    }
    .posNm{
      color:#1e88e5;
    }
    .mtel{
      color:#f35656;
    }
    .mSms{
      color:#f35656;
    }
    .tel{
      color:#6e85f8;
    }
    .email{
      color:#89a939;
    }
    .Contact-tree .jstree-anchor{
      font-size:14px;
    }
    .jstree-anchor[t="M"]{
      font-weight:550;
    }
    .jstree-anchor{
      cursor:pointer;
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
    .img-face{
      width:45px!important;
      height:50px!important;
    }
    #detail_actListTable , #actProgressListTable {
      border: 1px solid #ddd !important;
    }
  </style>


  <script type="text/javascript" src="/resources/module/assets/js/common/basket.full.min.js"></script>
  <script type="text/javascript" src="/resources/module/assets/js/common/loadJs.js?vs="></script>
  <script type="text/javascript" src="/resources/module/assets/js/common/internationalization.js"></script>

  <script type="text/javascript" src="/resources/module/assets/js/plugins/mresize-master/mresize.js"></script>
  <script type="text/javascript" src="/resources/module/assets/js/plugins/jstree/jstree.js"></script>
  <script type="text/javascript" src="/resources/module/assets/js/common/bluebird.min.js"></script>

    <!--  CORS 비주기적인 에러..해결 안됨..
    <script type="text/javascript" src="/resources/module/assets/js/common/jquery.ajax-cross-origin.min.js"></script>
     -->

  <script>
    var gcode="";
    var inside ="";   //  inside, isInsideAddr

    //위도 경도
    var latitude = "";
    var longitude = "";
    $(document).ready(function () {

       realtimeClock();

      if(isMobile){//모바일 만.   // htmlHeader.js
        var sideMenu = document.getElementById('gnb');
        var sideMenuG = new Hammer(sideMenu);
        sideMenuG.get('pan').set({ threshold: 60, direction:2});
        sideMenuG.on("panend", function(ev) {

          $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached');
          if (ev.direction == 2)//left, 4 right
          {
            $('.sidebar-main').removeClass('SideActive');
          }
        });
      }

      //**prj_list** Session Storage//
      var Prj_list  = $.jStorage.get("Prjlist");
      if(Prj_list==null){
        getPrj_list(1);//초기 진행중인..
      }else{
         Prj_list  =$.jStorage.get("Prjlist");
         $(".Prj_Choice").html(Prj_list);
         ChoiceEvent();
      }

      function project_create(data){
        h_str=""
        $.each(data.prj_data, function() {
          //console.log(this.id)
          h_str=h_str+"<li class='media Prj_list' data-gonggu='"+this.Gonggu_SeqNo+"'>"
          h_str=h_str+" <div class='media-left'>"
          h_str=h_str+"   <span class='status-mark border-success position-left'><\/span>"
          h_str=h_str+" <\/div>"
          if (this.ActiveYn=="Y" && inside=="true" )
          {
            h_str=h_str+" <div class='media-body'><span class='prj_nm' style='color:#ffff66;'>"+this.Gonggu_Nm+"<\/span><\/div> <\/li>"
          }
          else{
            h_str=h_str+" <div class='media-body'><span class='prj_nm'>"+this.Gonggu_Nm+"<\/span><\/div> <\/li>"
          }

        });
        $.jStorage.set("Prjlist",h_str);
        $(".Prj_Choice").html(h_str);
        //$(".Prj_Choice").css("m","")

      }
      function ChoiceEvent(){
        $(".Prj_list").on('click', function (e) {

          if (sessionStorage.getItem("ProjectMoveYn")){
            gongguChange($(this).data("gonggu"));
          }else{
            if (confirm("선택한 프로젝트로 이동하시겠습니까??") ){ //확인
              gongguChange($(this).data("gonggu"));
              sessionStorage.setItem("ProjectMoveYn", true);
            }
          }
         });
         Classbind();
      }

      function gongguChange(gcd)
      {
        //alert(' gongguChange mainPageUrl :   ${user.mainPageUrl}');

        //   /Gonggu_Change.do    -> /user/gongguChange
        $.ajax({
            url: '/user/gongguChange'
          , type: 'post'
          , data: {  "gcd": gcd
                   , "gssidg" : "${user.sessionId}"  }
          , dataType: 'json'
          //, async : false
          , success: function(data) {
            //console.log('gongguChange : '+ data+' \n  mainPageUrl :   ${user.mainPageUrl}');

            switch(data){
              case 100 :  /*alert("변경완료");*/  location.href = "/user/moveGonggu";  break;
              case 101 :  alert("퇴사한 사용자는 로그인할 수 없습니다.[101]"); break;
              case 102 :  alert("참여 종료된 프로젝트에는 로그인할 수 없습니다.[102]"); break;
              case 200 :  alert("계정 정보가 없습니다..[200]"); break;
              case 201 :  alert("서비스가 중지된 프로젝트입니다.[201]"); break;
              case 202 :  alert("서비스가 중지된 공구입니다.[202]"); break;
              case 203 :  alert("현재 탈퇴된 계정입니다.[203]");  break;
              case 204 :  alert("프로젝트 참여가 종료된 계정입니다.[204]"); break;
              case 300 :  alert("비정상적인 요청입니다. [300]"); break;  // 잘못된 접속입니다
              default :   alert("정보를 찾을수 없습니다."); break;
            }
          }
        });
      }

      function Classbind(){
        $(".Prj_Choice li[data-gonggu='"+gcode+"']").removeClass("Prj_list");
        $(".Prj_Choice li[data-gonggu='"+gcode+"'] div").addClass("cur_prj");
      }

      function getPrj_list(Pstate){
      }
      /*prj-list end */

      //**side Menu**//

      var Side_Menu  = $.jStorage.get("SideMenu_"+gcode);
        //console.log(Side_Menu);
      //alert('header...'); / page reload 검증.

      if(Side_Menu==null)
      {
        //alert('Side_Menu...');
      }else{
        //alert('Side_Menu...2');
        //Side_Menu  =$.jStorage.get("SideMenu_"+gcode);
         $("#side_ul").html(Side_Menu);
         menuEvent();
      }

      function menuEvent(){
        $('.menus').on("click", function () {
          mv=$(this).attr("addrs");

          link=$(this).attr("linkYn");
          extendyn=$(this).attr("extendyn");
          Targetyn=$(this).attr("target");

          //console.log(Targetyn)

          if (link=="y")
          {
            if (Targetyn!="_blank") //내부링크
            {
              BlockShow();
              if (isMobile)
              {
                $('.sidebar-mobile-main-toggle').trigger( "click" );
              }
              //menu move history seve
              //SetHistory("/service.do",mv);
              SetHistory("/common/menu",mv);

              //console.log('menuEvent  mv :'+mv);
              $('#m').val(mv);
              //$('#actForm').attr("action","/service.do");
              $('#actForm').attr("action","/common/menu");
              $('#actForm').submit();
            }
          }
        });
        Activebind();
      }

      //dashboard history save
      //if (getCookie("menu_Seqno")=="30")
      if (getCookie("menu_Seqno")=="0")  // 암호화 코드 -> 평문(JAVA)
      {
        //replaceHistory("/service.do","30");
        replaceHistory("/common/menu","0");// 암호화 코드 -> 평문(JAVA)
        //console.log("30")
      }
      //console.log(window.history.length);


      function Activebind() {
        $('.navigation').find('li.active').parents('li').addClass('active');
        $('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');
        $('.navigation').find('li').has('ul').children('a').addClass('has-ul');

         $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
          e.preventDefault();

          // Collapsible
          $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(150);

          // Accordion
          if ($('.navigation-main').hasClass('navigation-accordion')) {
              $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(150);
          }
         });

         if ("${user.menuSeqNo}"!="")
         {
          $("#side_ul li a").each(function(){
            if (MenuSeqNos.indexOf("/"+$(this).attr("addrs")+"/") >=0)
            {
              acodionActive(this);
            }
          })
         }
        //menu bg save
        SetMenuBg("1level", ".navbar-header");
        SetMenuBg("1level", ".sidebar-main");
        SetMenuBg("2level", ".navigation > li ul li a");
        SetMenuBg("3level", ".navigation > li > ul > li > ul > li > a");
        SetMenuBg("4level", ".navigation > li > ul > li > ul > li > ul > li > a");
        SetMenuBg("5level", ".navigation > li > ul > li > ul > li > ul > li > ul > li >a");
      }

      //myphoto load save
      if (localStorage.getItem('myPhoto')===null || localStorage.getItem('UserImg') != '${user.userImg}'){
        localStorage.setItem("UserImg", '${user.userImg}');
        //getDataUri("/Common/img.do?Fsn=......
        getDataUri("/common/img?fsn=${user.userImg}&face=y", function(dataUri) {
            localStorage.setItem("myPhoto", dataUri);
            $("#myPhoto").attr("src", dataUri);
        });

      }else{
        myPhoto=localStorage.getItem('myPhoto');
        $("#myPhoto").attr("src", myPhoto);
      }

      //project logo load save
      if (localStorage.getItem('logo_'+gg_code)===null)
      {
        logo_path ="/logo/logo_gonggu_"+gg_code+".png";
        // /MPMS_JAVA/src/main/resources/static/logo

      }else{ //로컬에 있으면 사용
        logo=localStorage.getItem('logo_'+gg_code);
        $("#logo").attr("src", logo);
      }

      //country  Default
      if (localStorage.getItem("i18nextLocalStorage")===null)
      {
        $("#imgLangDefault").attr("src", "/resources/module/assets/images/flags/ko.png");
      }else{
        countryDefault=localStorage.getItem("i18nextLocalStorage");
        countryDefaultUri=localStorage.getItem(countryDefault);
        $("#imgLangDefault").attr("src", countryDefaultUri);
      }

      //country save
      $(".imgLang").each(function( index ) {
        SetLangIMg($(this).attr("id"));
      });

      function getDataUri(url, callback) {
          var image = new Image();

          image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
          canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

          canvas.getContext('2d').drawImage(this, 0, 0);

          // Get raw image data
          callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

          // ... or get as Data URI
          callback(canvas.toDataURL('image/png'));
          };

          image.src = url;
      }

      function SetMenuBg(nm, target){
        if (localStorage.getItem(nm)===null)
        {
          getDataUri("/resources/module/assets/images/"+nm+".png", function(dataUri) {
              localStorage.setItem(nm, dataUri);
              $(target).css({ 'background-image': "url(" + dataUri + ")" });
          });

        }else{
          dataUri=localStorage.getItem(nm);
          $(target).css({ 'background-image': "url(" + dataUri + ")" });
        }
      }

      function SetLangIMg(nm){
        if (localStorage.getItem(nm)===null)
        {
          getDataUri("/resources/module/assets/images/flags/"+nm+".png", function(dataUri) {
              localStorage.setItem(nm, dataUri);
              $("#"+nm).attr("src", dataUri);
          });

        }else{
          dataUri=localStorage.getItem(nm);
          $("#"+nm).attr("src", dataUri);
        }
      }

       $(".cPrjt_state").on('click', function () {
        $(".Prj_Choice").html("");
         getPrj_list($(this).val());
       });


      //출퇴근기능 사용여부
      if ("${attendUseYn}" == "Y"){
        fn_inoutLoad();
      }


      //  '내부인 경우 -- 사용자 선택 변경기능
      if (  inside=="true" &&  '${user.projectSeqno}' != 16 )
      {
        $(".Contact-list").on("click",".user_val",function(e){
          //console.log("선택한 사용자 ID : "  + $(this).data("userseqno") );

          if (confirm("선택한 사용자로 변경하시겠습니까??") ){    //확인
            sessionStorage.clear();
            //$("#cuid").val($(this).data("userseqno"));
            //$("#login_change").submit();

            //  /login_Change.do    ->   /user/loginChange
            //.done(function(data) {    setTimeout("reload()", 1000);       });
          }
         });
      }
      // 특정언어 하나인 경우 / 없는 경우
      if('${fn:length(strMultiLan)}' == 0 ){
        $(".language-switch").hide();
      }
    });

    function fn_inoutLoad(){
      //출퇴근버튼 로드

    }

    function realtimeClock() {
        $("#Ctime").text(getTimeStamp());
        setTimeout("realtimeClock()", 1000);
    }

    function getTimeStamp() { // 24시간제
        var d = new Date();

        var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +
        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

        return s;
    }

    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
          zero += '0';
        }
        return zero + n;
    }
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  /*
  var httpRequest;

  function alertContents() {
    try
    {
        alert('alertContents. readyState :  '+httpRequest.readyState);
      if (httpRequest.readyState === 4)
      {

          alert('alertContents.  status :  '+httpRequest.status);
        if (httpRequest.status === 200)
        {
          alert('alertContents.  responseText :' + httpRequest.responseText);
            alert('alertContents.  responseXML :' + httpRequest.responseXML);
        }
        else
        {
          alert('There was a problem with the request.');
        }
      }
    }
    catch( e ) {
      alert('Caught Exception: ' + e.description);
    }
  }

  function getWeather(AreaCode) {
      console.log('getSearchAddr   ');
     var url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone='+AreaCode;

     if (window.XMLHttpRequest) { // Mozilla, Safari, ...
       httpRequest = new XMLHttpRequest();
     } else if (window.ActiveXObject) { // IE
       try {
         httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
       }
       catch (e) {
         try {
           httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }
         catch (e) {}
       }
     }

     if (!httpRequest) {
       alert('Giving up :( Cannot create an XMLHTTP instance');
       return false;
     }
     //alert('::: url : '+url);
     httpRequest.onreadystatechange = alertContents;
     httpRequest.open('GET',  url);

     // httpRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
     httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); ;
     httpRequest.setRequestHeader('Access-Control-Allow-Origin', 'http://www.kma.go.kr');
     httpRequest.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     httpRequest.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     httpRequest.setRequestHeader('Access-Control-Allow-Credentials', true);
     httpRequest.send();
 }
*/
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // 날씨 보여주는 곳에서만 사용.  각  main page 에서 호출 해줄 것
    //getWeather(1153054000);   //TEST  // Pub_13.page
    //getWeather(1159068000);   //TEST

    function getWeather(AreaCode){

        $.ajax({
          url : '/common/getKmaWeather'
        , type : "get"
                , data: { "areaCode": AreaCode }
              , async: false
        , dataType : "xml"
        , success : function(data){
                    var data = new XMLSerializer().serializeToString(data);
                    //console.log('getKmaWeather  data : ' +data);
                var weather=data.substring(data.indexOf("<item>"), data.indexOf("<\/item>")+7) ;
          //onsole.log('getKmaWeather  weather : ' +weather);
                $xml = $(weather);

          Zone_nm= $xml.find('category').text();
          $("#Zone_NAME").text(Zone_nm);

          dateTime = $xml.find('tm').text();
          $("#content").append(dateTime+"<br>");
          //console.log("::::::::::::::: Zone_nm : " + Zone_nm+"  /  dateTime : " + dateTime);

          todayCnt=0;
          baseDt=getdate();

          day1html=""
          day2html=""
          $xml.find('data').each(function(index){

              var sDay    = $(this).find('day').text();
              var hour    = $(this).find('hour').text();
              var sDescript  = $(this).find('wfKor').text();
              var tmp   = $(this).find('temp').text(); //온도
              var tmx   = $(this).find('tmx').text();
              var tmn   = $(this).find('tmn').text();
              var pop   = $(this).find('pop').text(); //강수확률
              var ws    = $(this).find('ws').text(); //풍속
              ws      *=1; //숫자변환
              var reh   = $(this).find('reh').text(); //습도

            if (sDay==0 && todayCnt==0)//오늘항목중 첫번째(현재시간에서 가까운 시간)
            {
              todayCnt=1;
              SetMainWeathder(baseDt, tmp, pop, sDescript, reh, ws.toFixed(1));

              /* console.log("::::::::::::::: SetMainWeathder baseDt: " + baseDt);
              console.log("::::::::::::::: SetMainWeathder : reh" + reh );
              console.log("::::::::::::::: SetMainWeathder : tmp" +  tmp);
              console.log("::::::::::::::: SetMainWeathder : pop" +  pop);
              console.log("::::::::::::::: SetMainWeathder : sDescript" +  sDescript);
              console.log("::::::::::::::: SetMainWeathder : ws.toFixed(1)" + ws.toFixed(1) ); */
            }

            if (sDay==1 && hour==12) //내일정시 데이터
            {
              day1=DayPlus(baseDt, 1, "-");
              //console.log("day1:"+ day1)
              day1html=SetForcast(day1, 6, tmx, tmn, sDescript);
            }

            if (sDay==2 && hour==12) //내일모레 정시 데이터
            {
              day2=DayPlus(baseDt, 2, "-");
              //console.log("day2:"+ day2)
              day2html=SetForcast(day2, 6, tmx, tmn, sDescript);
            return false;
            }
           });

           $(".forecast").append(day1html+day2html);
            /* console.log("::::::::::::::: SetMainWeathder : forecast" + day1html+day2html ); */

        },error: function(xhr, Status, Err){
                     console.log("error xhr: " +xhr +" /  Status: " +Status+" / Err: " +Err );
                     console.log("status:"+xhr.status+"\n"+"statusText:"+xhr.statusText+"\n"+"responseText:"+xhr.responseText+"\n"+"readyState:"+xhr.readyState);

           getWeather(AreaCode);
        }
          })
    }

    var action_mode= "none"; // js트리액션컨트롤 변수

    function JsonSort(a, b) {//maxLevel순으로 정렬
      if( parseInt(a.a_attr.maxLevel) == parseInt(b.a_attr.maxLevel)){ return 0} return parseInt(a.a_attr.maxLevel) > parseInt(b.a_attr.maxLevel) ? 1 : -1;
    }

    //tree접기확공통
    function treeExpansion(tree){

        var treeId =tree;
        var instance = $('#'+treeId).jstree(true);

        function MaxOpen(){
          //기본 오픈된 level구하기
          var open_maxL=0;
          $('#'+treeId+" .jstree-open").each(function(){
            if (open_maxL < $(this).attr("aria-level"))
            {
                open_maxL=$(this).attr("aria-level")
            }
          });


          $("#level_open").val(open_maxL);
        }

        $('#tree_close').on("click", function () {
            action_mode= "none"
            var depth = $("#level_open").val();

            var level_obj=instance.get_container().find('li [aria-level='+depth+']');
            instance.close_node($(level_obj));

            if ((parseInt(depth) -1)<1)
            {
              alert("최상위까지 축소를 지원하지 않습니다.")
            }else{
               $("#level_open").val(parseInt(depth) -1);
             }
        });


        $('#tree_open').on("click", function () {

            action_mode= "exapnd"

            var depth = $("#level_open").val();
            var maxL = $("#level_max").val();


              if ( (parseInt(depth) +1) ==maxL)
              {
                alert("더 이상 확장할 노드가 없습니다.");
              }else{

                $("#level_open").val(parseInt(depth) +1);
                depth=parseInt(depth) +1

                //최종오픈된 레벨에 닫힌 항목들 열리게..
                c_level_obj=instance.get_container().find('li [aria-level='+(depth-1)+']');
                instance.open_node($(c_level_obj));

                //그리고 하위에 항목들 열리게..
                level_obj=instance.get_container().find('li [aria-level='+depth+']');
                instance.open_node($(level_obj));

              }

        });

        $('#'+treeId).on('close_node.jstree', function (e, data) {

              if (data.node.parent=="#")
              {
                  instance.open_node($(this));
                  alert("최상위까지 축소를 지원하지 않습니다.")
                  //a //일부러 에러발생
                  return false;
              }

        });

        $('#'+treeId).on('after_close.jstree', function (e, data) {
          MaxOpen();
        });


        $('#'+treeId).on("loaded.jstree", function (e, data) { //first loading

          /*트리확장축소 maxLevel 구하기*/
          var $tree = $(this);

          var dataLen=$($tree.jstree().get_json($tree, {flat: true})).length;

          treeDataJson=$($tree.jstree().get_json($tree, {flat: true}));
          treeDataJson.sort(JsonSort);

          $("#level_max").val(treeDataJson[dataLen-1].a_attr.maxLevel);

          //기본 오픈된 level구하기
          MaxOpen();

        });

        $('#'+treeId).on("open_node.jstree", function (e, data) { //확장 loading
          MaxOpen();
        });

        $('#Search_nm').keyup(function() {
          action_mode= "search"
        });
    }


    //연락망 tree접기확공통
    function ContactTreeExpansion(tree){

        var treeId =tree;
        var instanceC = $('#'+treeId).jstree(true);
        var Action_ing =false;

        function ContactMaxOpen(){
          //기본 오픈된 level구하기
          var open_maxL=0;
          $('#'+treeId+" .jstree-open").each(function(){
            if (open_maxL < $(this).attr("aria-level"))
            {
                open_maxL=$(this).attr("aria-level")
            }
          });


          $("#Contact_level_open").val(open_maxL);
        }

        $('#ctree_close').on("click", function () {
            action_mode= "none"
            var depth = $("#Contact_level_open").val();

            var level_obja=$('li [aria-level='+depth+']');


            if ((parseInt(depth) )==0)
            {
              alert("최상위까지 축소를 지원하지 않습니다..")
            }else{
              jQuery.each( level_obja, function( i, val ) {
                instanceC.close_node($(this),  false);
              });
               $("#Contact_level_open").val(parseInt(depth) -1);
             }

        });


        $('#ctree_open').on("click", function () {
            if (Action_ing)
            {
              alert("조직도 확장 중 입니다.");
              return false;
            }

            action_mode= "exapnd"

            var depth = $("#Contact_level_open").val();
            var maxL = $("#Contact_level_max").val();

            if ( (parseInt(depth) +1) ==maxL)
            {
              alert("더 이상 확장할 노드가 없습니다.");
              //$(".viewKind").unblock();
            }else{

              $("#Contact_level_open").val(parseInt(depth) +1);
              depth=parseInt(depth) +1

              var level_obja=$('li [aria-level='+depth+']');
               Action_ing=true;
               DelayNodeOpen(0, level_obja);
            }
        });

        function DelayNodeOpen(s_num, object){

          for (xe=s_num; xe<object.length ;xe++ )
          {
            instanceC.open_node($(object[xe]),open_log(xe), false);
          }

          if ( object.length==xe )
          {
            Action_ing=false;
          }
        }

        function open_log(id){
        }

        $('#'+treeId).on('close_node.jstree', function (e, data) {
          if (data.node.parent=="#")    {     }
        });

        $('#'+treeId).on('after_close.jstree', function (e, data) {
          ContactMaxOpen();
        });


        $('#'+treeId).on("loaded.jstree", function (e, data) { //first loading

          /*트리확장축소 maxLevel 구하기*/
          var $tree = $(this);

          var dataLen=$($tree.jstree().get_json($tree, {flat: true})).length;
          treeDataJson=$($tree.jstree().get_json($tree, {flat: true}));
          treeDataJson.sort(JsonSort);

          $("#Contact_level_max").val(treeDataJson[dataLen-1].a_attr.maxLevel);

          //기본 오픈된 level구하기
          ContactMaxOpen();
          //넓이픽스
          ContactTreeWidthFix();

        });

        $('#'+treeId).on("open_node.jstree", function (e, data) { //확장 loading

          ContactMaxOpen();
          $(".mobile_text, .sms_text, .tel_text, .email_text").hide();

          $( ".icon-mobile, .icon-bubble-lines4, .icon-phone, .icon-envelop2" )
            .mouseover(function() {
               $( this ).next().show();
            })
            .mouseout(function() {
               $( this ).next().hide();
            });

           $('.Contact-tree .jstree-anchor[t=M]').click(function(e){//Tree안에 e.preventDefault() 방지용
            e.stopPropagation();
           });

        });

        $('.Contact-tree').on("click", ".jstree-anchor[t!=M]", function(e){//연락망원 토글클릭
          $('.Contact-tree').jstree(true).toggle_node(e.target);
        });


        $('#Search_nm').keyup(function() {
          action_mode= "search"
        });


    }
    function ContactTreeWidthFix(){
      if (!isMobile)
      {
        var elmnt = document.getElementById("Contact-tree");
        var scWidth = elmnt.scrollWidth;
        $(".ContactBox").width(500);
      }
    }
    var doubleClickTime = 0;
    var threshold = 400;

    function onClickChk(){

        var t0 = new Date();
        var result =0;

        if (t0 - doubleClickTime > threshold){
            var promise = new Promise(function(resolve, reject) {
               window.setTimeout(function() {
                   if (t0 - doubleClickTime > threshold) {
                     resolve(1);
                  }
                 }, threshold);
             });
             return promise;
        }
          };

    function onDblChk() {
      doubleClickTime = new Date();
      return 2;
    }

    function showSwal_time(_title, _type, time){
      swal({
        title:_title,
        type: _type,
        //confirmButtonText: i18next.t("common:btn.ok"),
        showConfirmButton: false,
        timer: time
      });
    }
    /*  query 에서 처리..
    //byte를 용량 계산해서 반환
    function byteCalculation(bytes) {
          var bytes = parseInt(bytes);
          var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
          var e = Math.floor(Math.log(bytes)/Math.log(1024));

          if(e == "-Infinity")
            return "0 "+s[0];
          else
              return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
    }
    */

  </script>

  <!--  '웹푸시 설정 버튼 -->
  <c:if test="${user.projectSeqno eq 17 || user.projectSeqno eq 14 || user.projectSeqno eq 13  || user.projectSeqno eq 20  }">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
    <script>
      $(function(){   if (! isMobile){    }   });

      /** 알림 카운트/목록 갱신 **/
      function fn_noti_info_reload(){
        //알림목록이 열려있는 경우
        if ($("#navbar-mobile .Notification").hasClass("open")) {
          LoadNotificationList(); //알림리스트 재로딩
        } else {
          LoadNotificationCount(); //알림카운트 재로딩
        }
      }

      // ONESignal 등록시 내보 host 에 등록한 uri 도 인식함.. 단 포트까지 등록해야함.
      if (isMobile || inside=="true"){
        //console.log("user.appId  :  ${user.appId}");
        var OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
          OneSignal.init({
            appId: "${user.appId}"
          });
          //수신시 이벤트발생
          OneSignal.on('notificationDisplay', function(event) {
            console.log(" This callback fires every time the event occurs", event);
            fn_noti_info_reload();
          });


          //Push지원여부
          var isPushSupported = OneSignal.isPushNotificationsSupported();
          if (isPushSupported) {
            console.log("// Push notifications are supported");

          } else {
            console.log("// Push notifications are not supported");
          }
          //사용자 Tag에 사용자 sys_id 저장 // 필요에 따라 만들수 있으나, 나중에 필터하여 사용
          //OneSignal.sendTag("user_ip", " ");
          Device_info();


          if (sessionStorage.getItem("player_id") == null) {
            //Device_info();
          } else {
            console.log("player_id :", sessionStorage.getItem("player_id"))
          }

          OneSignal.isPushNotificationsEnabled(function(isEnabled) {
            if (isEnabled)
              console.log("Push notifications are enabled!");
            else
              console.log("Push notifications are Not enabled yet.");
          });
        });

        //노티 클릭 콜백
        function notifListen() {
          OneSignal.push(['addListenerForNotificationOpened', function(data) {

            //alert('addListenerForNotificationOpened : '+data);
            //alert('notifListen  skipNotificationOpened getCookie :  ' +getCookie('skipNotificationOpened') ) ;
                        //alert('notifListen  skipNotificationOpened $.cookie : '+ $.cookie('skipNotificationOpened') );

            //Push_chk로 유입된 경우 수신자와 로그인 사용자가 다를경우 otherUsersNotification = "Y" 이 담겨들어온다.
            //    ?? 동일 사용자인 경우에도 "Y" 로 세팅하고 있음.
              //      왜 못가져 오지???? TODO
            if ($.cookie("skipNotificationOpened") != "Y") {

              var confirmFlag = false
              if (data.data.callMode == "move") {
                if (confirm("페이지 이동을 하시겠습니까?")) {
                  confirmFlag = true;
                }
              } else {
                confirmFlag = true;
              }

              //노티처리함수 호출
              if (confirmFlag) {
                fn_NotificationOpened(data.id);

                //알림목록 닫기
                $("#navbar-mobile .Notification").removeClass("open");

                //알람카운트 갱신
                LoadNotificationCount();
              }

              //다른사용자의 노티피케이션 인경우 스킵처리한다. (쿠키 초기화)
            } else {
              $.cookie("skipNotificationOpened", null);
                            alert('notifListen  skipNotificationOpened  delete ' );
            }

            notifListen();
          }]);
        }
        notifListen();


        function Device_info() { //단말기정보 업데이트

          OneSignal.getUserId(function(userId) {
            if (userId != null) {
              console.log("Device_info   > OneSignal.userId : " + userId);


            } else {
              setTimeout(function() {
                //console.log("OneSignal.userId : none")
                Device_info();
              }, 5000);
            }

          });
        }

        function removeA(arr) { //배열 삭제
          var what, a = arguments,
            L = a.length,
            ax;
          while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
            }
          }
          return arr;
        }

      }

      Array.prototype.contains = function(elem) //배열값체크
      {
        for (var i in this) {
          if (this[i] == elem) return true;
        }
        return false;
      }

      // 노티클릭시 처리하는 함수
      function fn_NotificationOpened(noti_id) {

                //alert('fn_NotificationOpened  noti_id: '+noti_id);

        /*
        1. push_chk 에서 메뉴이동으로 들어온 경우 아무처리도 안함.
        2. push_chk 에서 함수호출으로 들어온 경우 ajax로 함수 가져와 처리
        3. 다이렉트로 들어온 경우 ajax로 함수/메뉴이동 처리.
        */

      }

    </script>
  </c:if>

  <script id="UserContact" type="text/x-jquery-tmpl">
      <li class="media">

        {{if view}}
          <div class="text-semibold prjnm" style="border-bottom: 1px solid #e7e7e7;">\${pr_nm}</div>
        {{else}}
          <div style="display:none">\${pr_nm}</div>
        {{/if}}

        <div class="media-left">
          <img src="\${img}" class="img-circle img-sm img-face" width="45">
        </div>

        <div class="media-body userBox">
          <ul class="text-muted text-semibold search_item" style="display:none">\${pr_nm}</ul>
          <ul class="text-muted text-semibold search_item">\${gp_nm}</ul>
          <ul class="text-muted text-semibold user_val search_item <c:if test="${inside eq 'true'}">cursor_css</c:if>" <c:if test="${inside eq 'true'}">data-userseqno=\${u_no}</c:if> > \${nm} \${po} (\${pn})</ul>
          <ul class="text-muted">\${m_t} <a href="tel:\${m_t}"><c:if test="${mobileYn eq 'Y'}"><i class='icon-iphone'></i></c:if></a> <a href="sms:\${m_t}"><c:if test="${mobileYn eq 'Y'}"><i class='icon-bubble-lines4'></i></c:if></a></ul>
          <ul class="text-muted">\${g_t} <a href="tel:\${g_t}"><c:if test="${mobileYn eq 'Y'}"><i class='icon-iphone'></i></c:if></a> <a href="sms:\${g_t}"><c:if test="${mobileYn eq 'Y'}"><i class='icon-bubble-lines4'></i></c:if></a></ul>
          <ul class="text-muted">\${em} <a href="mailto:\${em}"><c:if test="${mobileYn eq 'Y'}"><i class='icon-mail5'></i></c:if></a></ul>
        </div>
      </li>
  </script>
<%--
key1 NO             key2 SEQNO            key3 CLASS_NM        key4 INSTITUE_NM      key5 INSTITUE_POSITION
key6 INSTITUE_JOB   key7 INSTITUE_TEL     key8 INSTITUE_HP     key9 INSTITUE_FAX    key10 INSTITUE_EMAIL

 key11 운 존재하지 않음.....  'outUserContact' 은 heder 외 사용되는 곳 없음
 ASP 에선 왜 에러 안나지..???
        {{if INSTITUE_EMAIL!=key11}}
        <div class="text-semibold prjnm" style="border-bottom: 1px solid #e7e7e7;">\${INSTITUE_EMAIL}</div>
        {{/if}}

--%>
  <script id="outUserContact" type="text/x-jquery-tmpl">
      <li class="media">
        <div class="media-body userBox">
          <ul class="text-muted text-semibold search_item">\${SEQNO}</ul>
          <ul class="text-muted text-semibold search_item">\${INSTITUE_NM} \${CLASS_NM} ( \${INSTITUE_POSITION} )</ul>
          <ul class="text-muted">\${INSTITUE_JOB} <a href="tel:\${INSTITUE_JOB}"><i class='icon-phone'></i></a></ul>
          <ul class="text-muted">\${INSTITUE_HP} <i class='icon-shredder'></i></ul>
          <ul class="text-muted">\${INSTITUE_TEL} <a href="tel:\${INSTITUE_TEL}"><i class='icon-iphone'></i></a> <a href="sms:\${INSTITUE_TEL}"><i class='icon-bubble-lines4'></i></a></ul>
          <ul class="text-muted">\${INSTITUE_FAX} <a href="mailto:\${INSTITUE_FAX}"><i class='icon-mail5'></i></a></ul>
        </div>
      </li>
  </script>

  <style>
    .req_icon{
        background: #f1c4c0;
       }
    .prj_state li{
      float:left;
      padding-top:10px;
      margin-right:20px;
      list-style:none;
    }
    .Prj_Choice{
      padding:0px;
    }
    .Prj_Choice .position-left{
      margin-right: 7px;
    }
    .Prj_Choice .media-left{
           padding-left: 20px;
           padding-right: 0px !important;
    }
    .Prj_Choice .media{
           margin-top: 10px;
           padding-bottom: 10px;
           border-bottom:1px solid #5d5d5d;
          text-overflow: ellipsis;white-space: nowrap; overflow: hidden;
          cursor:pointer;
    }
    .Prj_Choice_header{
       padding: 10px;
       border-bottom:1px solid #ede;
       font-size: 12px;
    }
    .navbar-inverse .navbar-nav .open .dropdown-menu {
        color: #fff;
        background-color: #314148;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .inSideContact .dropdown-content-heading, .inSideContact .dropdown-content-body{
        color: #000;
        background-color: #fff;
    }

    .Notification .dropdown-content-heading, .Notification .dropdown-content-body{
        color: #000;
        background-color: #fff;
    }

    @media (max-width: 768px) {
      .inSideContact .dropdown-content-heading, .inSideContact .dropdown-content-body{
          color: #000;
      }
      .navbar-brand{
        padding-right:10px;
      }
    }

    .cur_prj{     background-color: #5b7a88;    }
    .media-left .cur_prj{          background-color: #5b7a88;   }

    /*모달에서 모달뛰울떄 스크롤 문제해결용 2016-12-15 */
    .modal{      overflow:auto !important;    }
    /*출퇴근*/
    .inoutBtn{      padding: 2px 5px;     width:100%;     text-align:center;    }
    .inoutInfo{
      border-top:1px solid #574f4f;
      margin-top:10px;
      padding-top:2px;
    }
    #Ctime{     padding-top:5px;      text-align:center;    }
    .navbar-brand{      padding-left: 20px ;      padding-top: 3px;   }
    .inSideContact .form-group{     margin-bottom: 0px;   }
    .inSideContact .dropdown-content-heading{     border-bottom: 1px Solid #e7e7e7;     padding: 5px;   }
    .Contact-list{
      overflow-y:auto;
      padding-top: 10px  !important;
      padding-bottom: 50px;
    }
    @media (max-width: 768px) {
      .Contact-list .media-body a{          color: #000  !important;      }
      .Contact-list .media-body ul{       padding-left: 0px;        color:#474747  !important;      }
      .Contact-list .media-body ul a{       color:#1E88E5  !important;      }
    }
    .Contact-list .media-body ul{     padding-left: 0px;      color:#474747;    }
    .Contact-list .media{     border-bottom: 1px solid #e7e7e7;   }
    .prj_state{
      padding-top:5px;
      padding-bottom:5px;
      border-bottom: 1px solid #e7e7e7;
    }
    .Contact-list i{      margin-left:10px;   }
    #Prj_search{        width: 200px;       height:30px;    }
    .Project_seach{
        position: absolute;
        top: -38px;
        left: 70px;
    }
    @media (max-width: 768px){
       #Prj_search {
          width: 100%;
           height:30px;
         }
         .Project_seach {
                    position: absolute;
            top: 10px;
            left: 140px;
         }
    }
    #ContactView_Td > .radio-inline, #Contactkind_Td > .radio-inline{     padding-left: 20px;   }
    .Contact-tree{
      color: #333333;
      background-color: #fff;
      overflow:auto;
      display:none;
    }

    .Notification .media .content{      padding-bottom:0px;   }
    .Notification .media{     margin-top:10px;      margin-bottom:10px;   }
    .Notification .dropdown-content-heading {     border-bottom: 1px Solid #e7e7e7;     padding: 5px;   }
    .Noti-list{
      overflow-y:auto;
      padding-top: 10px  !important;
      padding-bottom:10px !important;
      padding-bottom: 50px;
    }
    .Noti-list .media:not(.nodata){     border-bottom: 1px solid #e7e7e7;   }
    .Noti-list .heading{      font-weight: 600;   }
    .Noti-list .content{      padding-left: 10px;   }
    .Noti-list .media.nodata{     text-align:center;    }

    @media screen and (min-width: 769px) and (max-width: 1060px) {
      .navbar-right i + span:not(.jstree-anchor){
        display:none
      }
    }
    .width100{      width:100%;   }
    .td-right{      text-align:right;   }

  </style>
  <!-- /Core JS files -->

  <!-- module/Middle_HTML.page 에 있던 script -->
  <script>
    //로그인후에 작동
    $(document).ready(function () {

      // 결재 모듈에서 알림 갯수를 가져오지 못하는 이슈 개선.
          LoadNotificationCount();

      //상단 알림 클릭시
      $(".Notification").on("click", function(){
        LoadNotificationList(); //알림목록 로딩
      });

      //알림 전체삭제
      $("#btn_delNotiAll").on("click", function(){

      });

      //알림 삭제버튼
      $(".Notification").on("click", ".btn_delNoti", function(event){
        event.stopPropagation();


      });

      //알림 목록 클릭
      $(".Notification").on("click", ".media:not(.nodata)", function(){
        var sNotiId = $(this).data("notiid")   // data-notiid
        var sParam  = $(this).data("param")   //  data-param

        alert('sNotiId : '+sNotiId+' / sParam : '+sParam);


        var confirmOk = false;

        //페이지 이동인 경우 이동할지 확인
        if (sParam !=""){
          if(confirm("페이지를 이동하시겠습니까?")){
            confirmOk = true;
          }
        }else{
          confirmOk = true;
        }

        if(confirmOk){
          //선택한 알람 삭제처리(확인처리)
          //$(this).find(".btn_delNoti").click();

          //알림종류에 따른 이동 처리함수
          fn_NotificationOpened(sNotiId);

          //알림목록 닫기
          $("#navbar-mobile .Notification").removeClass("open");

          //알람카운트 갱신
          LoadNotificationCount();
        }

      });



      $(".inSideContact").on("click", function(){ //연락망 클릭시
        if($(this).hasClass("open")){
        }else{
          if($.jStorage.get("Contact_"+gcode)!=null){ // 로그인후 메뉴이동시

            if($(".Contact-list").html()==""){ //로딩된 HTML없는 경우는 가져와 만들기..
              data1=$.jStorage.get("Contact_"+gcode);
              DrawContact(data1, 1);
            }
          }else{ //로그인시
            loadContact("", 1);
          }
        }
      });

      $(".Contactkind").click(function(){
        kind=$(this).val();

          if (kind==1) //내부보기
          { $(".viewKind").show();
            viewType= $(':radio[name="ContactView"]:checked').val();

            if (viewType==1) // 목록보기
            {
              $(".Contact-list").show();
              $(".Contact-tree").hide();
              loadContact("", kind);

            }else{  // 트리보기

              $(".Contact-tree").show();
              $(".Contact-list").hide();
              if ($(".Contact-tree").html()=="")
              {
                loadTreeContact("");
              }
            }
          }else{//외부보기
            $(".viewKind").hide();
            $(".Contact-list").show();
            $(".Contact-tree").hide();
            loadContact("", kind);
          }


      });

      $(".ContactView").click(function(){
        viewType=$(this).val();
        if (viewType==1) // 목록보기
        {
          $(".Contact-list").show();
          $(".Contact-tree, #ctree_close, #ctree_open").hide();

          loadContact("", 1);
          $(".ContactBox").width(350);
        }else{  // 트리보기

          $(".Contact-list").hide();
          $(".Contact-tree, #ctree_close, #ctree_open").show();

          if ($(".Contact-tree").html()=="")
          {
            loadTreeContact("");
          }
          //넓이픽스
          ContactTreeWidthFix();
        }
      });

       $("#ContactSearchTxt").keypress(function(){

          if(  $(':radio[name="Contactkind"]').length >0 )
          {
            kind= $(':radio[name="Contactkind"]:checked').val();
          }else{
            kind=1;
          }

          if ( event.which == 13 ) {//Enter ..
            loadContact($("#ContactSearchTxt").val(), kind);

            if (isMobile){
              $("#ContactSearchTxt").blur();
            }
          }
      });

      //검색
      var cto = false;
      $('#ContactSearchTxt').keyup(function () {

        view_type= $(':radio[name="ContactView"]:checked').val();
        if (view_type==2) // 트리보기
        {
          if(cto) { clearTimeout(cto); }
          cto = setTimeout(function () {
            var v = $('#ContactSearchTxt').val();
                $('.Contact-tree').jstree(true).search(v);
          }, 250);
        }
      });

       $("#Prj_search").keypress(function(){
          if ( event.which == 13 ) {//Enter ..
            prj_cnt=$(".Prj_list").length;
            filter = $("#Prj_search").val().toUpperCase();

            for (i = 0; i < prj_cnt; i++) {
                  li_obj=$(".Prj_list").eq(i);
                  Prj_name=li_obj.children("div:last");

                  if (Prj_name[0].innerText.toUpperCase().indexOf(filter) > -1) {
                li_obj.show();
                  } else {
                li_obj.hide();
                  }
            }
          }
      });

      /*
        modal 중첩해서 뜰 경우 배경 제대로 뜨게 해주는 스크립트
        2017-08-09
        한정훈 작업
      */
      $(document).on('show.bs.modal', '.modal', function () {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
          $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
      });

      //모바일 모드 알림아이콘
      var notiCntBadge_M_Clicked = false;
      $("#notiCntBadge_M").on("click", function(){
        if(! $("#navbar-mobile").hasClass("in")){
          notiCntBadge_M_Clicked = true;
          $("#navbar-mobile").collapse('show');
          LoadNotificationList();
        }else{
          $("#navbar-mobile").collapse('hide');
        }
      });


      $('#navbar-mobile').on('shown.bs.collapse', function() {
        //모바일 상단 알림버튼 클릭시 알림영역 오픈
        if (notiCntBadge_M_Clicked){
          $("#navbar-mobile  .dropdown-toggle").dropdown('toggle')
          notiCntBadge_M_Clicked = false;
        }
      }).on('hidden.bs.modal', function() {
        $("#navbar-mobile  .dropdown-toggle").dropdown('dispose')
      });
    });
    // $(document).ready(

    function loadTreeContact(SaerchTxt){

        $('.Contact-tree').jstree({
          'core' : {
              //'check_callback': true, //add, rename, Del를 적용여부
              "themes" : { "stripes" : true}, //격자배경
              'data' : {
                 //"url": "/module/sysModule/obs/Contact_obs.do?calltype=o,c,g,m&SaerchTxt="+SaerchTxt,
                 "url": "/module/sysmodule/obs/contactObs?calltype=o,c,g,m&SaerchTxt="+SaerchTxt,
                 "dataType" : "json" // needed only if you do not supply JSON headers
                },
              "animation" : false

            },
            "search": {
              "case_insensitive": true,
              "show_only_matches" : true
            },

            //검색 , 선택배경반전, 체크박스
            "plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
        });

        $(".Contact-tree").height(cHeight-200+30);
        ContactTreeExpansion("Contact-tree");

    }


    function loadContact(SaerchTxt, kind){
       //alert('loadContact..... SaerchTxt : '+SaerchTxt+' /  kind : '+kind);
             //console.log('SaerchTxt : ' +SaerchTxt + ' / mcS : ${user.contactMcs}   /  ' + ${user.contactMcs});

        if (kind==1)
        {
          //callcmd="/Common/Contact_list.do";
          callcmd="/common/contactList";
          dateArg={"key": SaerchTxt, "PAGESIZE":1000}
        }else{
          //callcmd="/Common/Network_Contact_list.do";
          //dateArg={"search[value]": SaerchTxt,  "mcS": '${user.contactMcs}'}
          callcmd="/common/contactList";
          dateArg={"key": SaerchTxt,  "mcS": '${user.contactMcs}'}
        }


    }

    function DrawContact(data, kind){
      //console.log(' DrawContact length : '+data.length);
            //console.log(' DrawContact : ' + data );
            //console.log('user.data : ' +JSON.stringify(data));

      if (kind==1){ //내부
        $("#UserContact").tmpl(data).appendTo(".Contact-list");

      }else{
        $("#outUserContact").tmpl(data).appendTo(".Contact-list");
      }
    }

    //알림카운트 로드
    function LoadNotificationCount(){
        /*
      $.ajax({
        //url: "/Common/NotificationCount.do",
        url: "/push/notificationCount",
        type:'post',
        dataType:'json',
        success: function (data) {
                //console.log('notificationCount : ' + JSON.stringify(data));

          $("#notiCntBadge").html(data.notiCnt);
          $("#notiCntBadge_M").html(data.notiCnt);

          if (data.notiCnt > 0){
                     // console.log('notificationCount notiCntBadge show  : '+data.notiCnt   );
            $("#notiCntBadge").show();
            $("#notiCntBadge_M").show();
            $("#notiCntBadge_M").closest("li").show();
          }else{
                        //console.log('notificationCount notiCntBadge hide : '+data.notiCnt   );
            $("#notiCntBadge").hide();
            $("#notiCntBadge_M").hide();
            $("#notiCntBadge_M").closest("li").hide();
          }
        },
        error:function(request,status,error){
          //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          //BlockHide();
        }
      }); */
    }

    // -------------------------------------------------
      // 날씨 관련
    // -------------------------------------------------
    function getdate(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      dateStr = year + '-' + month+ '-' +day;
      return dateStr;
    }
    function SetMainWeathder(bastDt, max, min, desc, hdy, ws){
      icon=geticon(desc);
      $(".today .icon").addClass("wi-"+icon);
      $(".today .hiTemp").text( max+"°");
      $(".today .loTemp").text("");
      $(".today .weekDay").text(bastDt+"("+ getTodayLabel(bastDt)+")");
      $(".today .Descript").text(desc);
      $(".today .humidity").text(hdy);
      $(".today .wind").text(ws);
    }
    function geticon(desc){
      var date = new Date();
      dTime=date.getHours();

      //console.log(desc)
      if ((dTime>=16 && dTime<=24) || (dTime>=0 && dTime<=3) ) //밤아이콘
      {
        if (desc=="맑음")   {     icon_num=4
        }else if (desc=="구름 조금"){   icon_num=5
        }else if (desc=="구름 많음"){   icon_num=6
        }
      }else{//낮아이콘

        if (desc=="맑음")     {   icon_num=1
        }else if (desc=="구름 조금"){   icon_num=2
        }else if (desc=="구름 많음"){   icon_num=3
        }
      }

      if (desc=="흐림")     {     icon_num=7
      }else if (desc=="소나기"){     icon_num=8
      }else if (desc=="비"){       icon_num=9
      }else if (desc=="눈"){       icon_num=11
      }else if (desc=="천둥번개"){      icon_num=17
      }else if (desc=="연무"){        icon_num=18
      }else if (desc=="안개"){        icon_num=19
      }else if (desc=="박무"){        icon_num=20
      }else if (desc=="황사"){        icon_num=21
      }else if (desc=="가끔 비, 한때 비"){    icon_num=10
      }else if (desc=="가끔 눈, 한때 눈"){    icon_num=12
      }else if (desc=="비 또는 눈"  || desc=="비/눈"){    icon_num=13
      }else if (desc=="눈 또는 비" || desc=="눈/비"){   icon_num=15
      }else if (desc=="가끔 비 또는 눈, 한때 비 또는 눈"){    icon_num=14
      }else if (desc=="가끔 눈 또는 비, 한때 눈 또는 비"){    icon_num=16
      }
      return icon_num;
    }
    function getTodayLabel(arg) {
       arg=arg.replace(/-/g, '/');
      var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
      var today = new Date(arg).getDay();
      var todayLabel = week[today];
      return todayLabel;
    }

    function DayPlus(baseDt, plusDay, view){
       //console.log("baseDt:"+ baseDt)
       baseDt=baseDt.replace(/-/g, '/');

           var dt = new Date(baseDt);
          // console.log("dt:"+ dt)
           dt.setDate(dt.getDate() + plusDay);

      var dd = dt.getDate();
      var mm = dt.getMonth() + 1;
      var yyyy = dt.getFullYear();
      var dtPlus =yyyy +view+  mm +view+  dd;
      return dtPlus;
    }
    function SetForcast(bastDt, xs_num, max, min, desc){

      v_day=bastDt.split("-")[2];
      //console.log("v_day:"+ v_day)
      icon=geticon(desc);
      html="";
      html += ' <div class="col-xs-'+xs_num+'">';
      html += '    <div class="weather-day vertical-align"> ';
      html += '    <div class="vertical-align-middle font-size-14"> ';
      html += '      <div class="margin-bottom-10 weekNm">'+v_day +" / "+ getTodayLabel(bastDt)+ '</div> ';
      html += '      <i class="wi wi-'+icon+' font-size-24 margin-bottom-10"></i> ';
      html += '      <div class="col-xs-12 col-sm-12 col-md-12"> '+max +"°/ "+min+'° </div> ';
      html += '      <div class="col-xs-12 col-sm-12 col-md-12"> '+desc+'</div>';
      html += '    </div>';
      html += '    </div>';
      html += ' </div>';
      return  html;
    }
    // -------------------------------------------------
      // 날씨 관련
    // -------------------------------------------------

    //LoadNotificationCount(); // EDWARD $(document).ready(function ()  로 이동

    //알림목록 로드
    function LoadNotificationList(){
      //alert('LoadNotificationList');
      $.ajax({
        //url: "/Common/NotificationList.do",
        url: "/push/notificationList",
        type:'post',
        dataType:'html',
        success: function (data) {
          //alert('LoadNotificationList data : '+data);
          $(".Notification .Noti-list").html(data);

          var notiCnt = $(".Notification .media").not(".nodata").length;


                    //console.log('notificationList notiCnt  : '+notiCnt   );

          if (notiCnt == 0){
                      //console.log('notificationList notiCntBadge hide  ');
            $("#notiCntBadge").hide();
            $("#notiCntBadge_M").hide();
            $("#notiCntBadge_M").closest("li").hide();
          }else{
                        //console.log('notificationList notiCntBadge show  ');
            $("#notiCntBadge").show();
            $("#notiCntBadge_M").show();
            $("#notiCntBadge_M").closest("li").show();
          }
          $("#notiCntBadge").html(notiCnt);
          $("#notiCntBadge_M").html(notiCnt);

        },
        error:function(request,status,error){
          //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          //BlockHide();
        }
      });
    }
  </script>
  <!-- module/Middle_HTML.page 에 있던 script -->
