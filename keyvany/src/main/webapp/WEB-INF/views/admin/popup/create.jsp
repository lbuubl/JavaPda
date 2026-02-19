<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<script src="/resources/static/js/jquery-ui.min.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
<link rel="stylesheet" href="/resources/static/js/datepicker/css/bootstrap-datepicker.css">
<script type="text/javascript" src="/resources/static/js/datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="/resources/static/js/datepicker/locales/bootstrap-datepicker.ko.min.js"></script>

<script src="/resources/static/js/summernote/summernote-lite.js"></script>
<script src="/resources/static/js/summernote/lang/summernote-ko-KR.js"></script>

<link rel="stylesheet" href="/resources/static/js/summernote/summernote-lite.css">
  <link rel="stylesheet" href="<c:url value="/resources/static/css/shake.css" />">

<link rel="stylesheet" href="/resources/static/css/ie.css" />


    <div id="viewport">
        <!-- 컨텐츠 -->
        <div id="contents">
            <div class="contitle">
                <div class="wrap">
                    <a href="#" title="메뉴 보기" id="btn_gnb_menu" class="btn_menu"><i class="fa fa-bars" aria-hidden="true"></i></a>
                    <!-- <h2>PROJECT</h2> -->
                    <form name="logoutForm" method="post" action="${pageContext.request.contextPath}/pda/logout">
                        <button type="submit" class="btn btn-logout">로그아웃</button>
                    </form>
                </div>
            </div>
            <div class="content_wrap">

            <form id="writeForm" name="writeForm" action="/pda/manage/popupStore" method="post" enctype="multipart/form-data" onsubmit="return fn_save(this)">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                <div class="write">
                    <h3>기본정보 입력</h3>
                        <table>
                            <colgroup>
                                <col width="15%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                            <input type="hidden" id="pop_id" name="pop_id" value="${popInfo[0].pop_id}"/>
                                <tr>
                                    <th scope="col">제목</th>
                                    <td>
                                        <input type="text" id="title" name="title" class="w01 required" data-title="제목" value="${popInfo[0].title}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">게시기간</th>
                                    <td>
                                        <input type="text" id="start_dttm" onchange="fn_dateCheck(this)" data-title="시작일" name="start_dttm" class="w01 datepicker required" readonly value="${popInfo[0].start_dttm}" maxlength="300"/>
                                        <span>~</span>
                                        <input type="text" id="end_dttm" onchange="fn_dateCheck(this)" data-title="마감일" name="end_dttm" class="w01 datepicker required" readonly value="${popInfo[0].end_dttm}" maxlength="300"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">위치</th>
                                    <td>
                                    <span>X : </span>
                                        <input type="number" onkeypress="gn_only_number(this)" data-title="위치 X"" id="loca_wi" name="loca_wi" class="w01 required" value="${popInfo[0].loca_wi}"/>
                                    <span>Y : </span>
                                        <input type="number" onkeypress="gn_only_number(this)" data-title="위치 Y" id="loca_hi" name="loca_hi" class="w01 required" value="${popInfo[0].loca_hi}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">크기</th>
                                    <td>
                                    <span>가로 : </span>
                                        <input type="number" onkeypress="gn_only_number(this)" id="size_wi"  data-title="크기(가로)" name="size_wi" class="w01 required" value="${popInfo[0].size_wi}"/>
                                    <span>세로 : </span>
                                        <input type="number" onkeypress="gn_only_number(this)" id="size_hi"  data-title="크기(세로)" name="size_hi" class="w01 required" value="${popInfo[0].size_hi}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">사용여부</th>
                                    <td>

                                        <input type="radio" id="use_y" name="use_yn" class="w01 " value="Y" <c:if test="${popInfo[0].use_yn eq 'Y'}"> checked</c:if> checked/>
                                        <span>사용함</span>
                                        <input type="radio" id="use_n" name="use_yn" class="w01 " value="N" <c:if test="${popInfo[0].use_yn eq 'N'}"> checked</c:if> />
                                        <span>사용 안함</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="col">내용</th>
                                    <td>
                                        <textarea class="summernote required" name="contents" data-title="내용">${popInfo[0].contents}</textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>

                <div class="btn_c">
                    <button type="button" class="btn btn-list" onclick="location.href='${pageContext.request.contextPath}/pda/manage/popup'">목록</button>
                    <button type="submit" class="btn btn-list">저장</button>
                    <button type="button" class="btn btn-list" onclick="fn_delete()">삭제</button>
                </div>
            </form>
            <form action="/pda/manage/popupDelete/${popInfo[0].pop_id}" method="POST" id="deleteFrom">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
            </form>
            <div class="content_bottom">
            </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
    $(document).ready(function(){
        $('.datepicker').datepicker({
            format: "yyyy-mm-dd",	//데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
            //startDate: '-10d',	//달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
            //endDate: '+10d',	//달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
            autoclose : true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
            calendarWeeks : false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
            clearBtn : false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
            datesDisabled : ['2019-06-24','2019-06-26'],//선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
            daysOfWeekDisabled : [0,6],	//선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
            //daysOfWeekHighlighted : [3], //강조 되어야 하는 요일 설정
            disableTouchKeyboard : false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
            immediateUpdates: false,	//사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
            multidate : false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false
            multidateSeparator :",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
            templates : {
                leftArrow: '&laquo;',
                rightArrow: '&raquo;'
            }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
            showWeekDays : true ,// 위에 요일 보여주는 옵션 기본값 : true
            title: "테스트",	//캘린더 상단에 보여주는 타이틀
            todayHighlight : true ,	//오늘 날짜에 하이라이팅 기능 기본값 :false
            toggleActive : true,	//이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
            weekStart : 0 ,//달력 시작 요일 선택하는 것 기본값은 0인 일요일
            language : "ko"	//달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.

        });//datepicker end


        //여기 아래 부분
	$('.summernote').summernote({
		height: 300,                 // 에디터 높이
		url: '/file/temp_image',
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
        lang: "ko-KR",					// 한글 설정
        dialogsInBody: true,
        placeholder: '최대 2048자까지 쓸 수 있습니다',	//placeholder 설정
        callbacks: {	//여기 부분이 이미지를 첨부하는 부분
            	onImageUpload : function(files) {
					uploadSummernoteImageFile(files[0],this);
				}
		}
    });

    /**
	* 이미지 파일 업로드
	*/
	function uploadSummernoteImageFile(file, editor) {
		data = new FormData();
		data.append("file", file);
		$.ajax({
			data : data,
			type : "POST",
			enctype: "multipart/form-data",
			url : "/pda/manage/popImageUpload",
			contentType : false,
			processData : false,
			success : function(data) {
                console.log("success");
                console.log(data,data.url);
            	//항상 업로드된 파일의 url이 있어야 한다.
				$(editor).summernote('insertImage', data.url);
				//$(editor).summernote('insertImage', "C:\\file\\temp_image\\20200913\\05ed4077aa1f462b8684560c019a08e8.jpg");
            },
            erroe : function(e){
                console.log("error");
                console.log(e);
            }
		});
	}
    });
        var fn_save = function(f){
                if(gn_validation(f)){
                    if(confirm("해당내용을 저장하시겠습니까?")){
                    $('textarea[name="contents"]').val($('.summernote').summernote('code'));
                    return true;
                }
            }

            return false;
        }
        var fn_delete = function(){
            if(confirm("해당내용을 삭제하시겠습니까?")){
                document.getElementById("deleteFrom").submit();
            }
            return false;
        }

        var fn_dateCheck = function(e){
            var start =document.getElementById("start_dttm");
            var end = document.getElementById("end_dttm");


            if(start.value == ""){
                    alert("시작일을 먼저입력해 주세요");
                    start.focus();
                    e.value ="";
                    return false;
                } else {
                    if(end.value !=""){
                        if(e.id =="start_dttm"){
                            if(e.value > end.value){
                                alert("시작일은 마감일보다 빨리 설정될 수 없습니다");
                                e.value ="";
                                e.focus();
                                return false;
                            }
                    }

                if(e.value < start.value){
                    alert("마감일은 시작일 보다 늦게 설정될 수 없습니다");
                    end.value ="";
                    e.focus();
                    return false;
                }
            }

        }
    }

    </script>