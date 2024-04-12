<%-- response.setHeader("Access-Control-Allow-Origin","*"); --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<sec:authentication var="user" property="principal" />

<!--  HTMLHeader.page   -->

  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1, minimum-scale=0.25, maximum-scale=1.6">
  <meta name="theme-color" content="#37474F">
  <title>SmartEPMS</title>

  <link rel="apple-touch-icon" href="/resources/module/assets/images/mobile_icone/114114.png" />
  <link rel="apple-touch-icon-precomposed" href="/resources/module/assets/images/mobile_icone/114114.png" />
  <link rel="shortcut icon" href="/resources/module/assets/images/mobile_icone/7272.png" />

  <script>
      // var a =0;
     var isImagePostLoad=false;//에디터에서 이미지추가 스크립트 로드여부
     var MultiLngDomain =location.host;
  </script>

  <!--   무의미 해도..이단 sp 따름.  -->
      <script type="text/javascript" src="/resources/module/assets/js/common/cssSave.js"></script>
      <link href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/bootstrap.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/core.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/components.css" rel="stylesheet" type="text/css">
      <link href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/colors.css" rel="stylesheet" type="text/css">

  <link  href="/resources/module/assets/css/<spring:eval expression="@environment.getProperty('UX.THEME_CSS')"/>/jstree/themes/default/style.min.css" rel="stylesheet" type="text/css">
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
        $.ajax({
          //url: "/Common/NotificationDelete.do",
          url: '/push/notificationDelete',
          type:'post',
          data:{  "cmd" : "all" },
          success: function (data) {
            LoadNotificationList();
          },
          error:function(request,status,error){
            //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            //BlockHide();
          }
        });
      });

      //알림 삭제버튼
      $(".Notification").on("click", ".btn_delNoti", function(event){
        event.stopPropagation();

        $.ajax({
          //url: "/Common/NotificationDelete.do",
          url: '/push/notificationDelete',
          type:'post',
          data:{    "pushSn" : $(this).attr("pushSn") },
          success: function (data) {
            LoadNotificationList();
          },
          error:function(request,status,error){
            //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            //BlockHide();
          }
        });
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

        $.ajax({
          url: callcmd,
          type:'post',
          data: dateArg,
          //dataType:'json',
          success: function (user) {
               //console.log('loadContact..... : '+callcmd+' /  kind : '+kind);
                         //console.log('user : ' +JSON.stringify(user));

               if (kind!=2) {
                 $.jStorage.set("Contact_"+gcode ,user.data);;
               }
               $(".Contact-list").html("");
               DrawContact(user.data, kind);

               try {
                 $('.Contact-list').localize();   //다국어 반영
               }
               catch (e) {}
               //BlockHide();
          },
           error:function(request,status,error){
            //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
              //BlockHide();
           }
            });
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
      });
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
