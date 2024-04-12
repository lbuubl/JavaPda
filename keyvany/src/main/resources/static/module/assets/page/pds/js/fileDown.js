
/* main > 최근자료목록 에서 PDS 전체 js 삽입시 오류로 다운로드 부분만 분리, 2017-02-01, 김영식 */

$(function(){

	//파일 다운 클릭
	$(document).on("click", ".fileDown", function(){
		var fsn = $(this).attr("FileSeq");

		//일반형
		if(fsn.indexOf("g_") < 0){
			FileDown(fsn);

		//게시형 Zip 으로 묶어서 다운로드
		}else{
			pdsGroupfileDown(fsn);
		}
	});

});


//파일형 자료 다운로드
function FileDown(fsn){
	alert('333333');

	 //$.fileDownload("/common/Download.Do?fsn="+fsn+"&ssid="+$("#gssid").val())
	 $.fileDownload("/common/downLoad/"+fsn+"/"+$("#gssid").val())
	.done(function () {  })
	.fail(function () {  });


	/*
	if (inside){

		/--
		$.fileDownload("/common/Download_Test.Do?fsn="+fsn+"&ssid="+$("#gssid").val())
		//$.fileDownload("/common/DownLoad_Ios.Do?fsn="+fsn+"&ssid="+$("#gssid").val())

		//$.fileDownload("http://mpm.smartpmis.net/Data/P13/G49/M2570/712679178/Tulips.jpg")	//=> 새창으로 열렸다가 로딩되면 닫힘
		//$.fileDownload("http://mpm.smartpmis.net/Data/P14/G1088/M53650/9975/7%EC%9B%94%20%EC%9B%94%EA%B0%84%ED%9A%8C%EC%9D%98%EC%9E%90%EB%A3%8C.pdf") => 새창으로 열렸다가 로딩되면 닫힘

		.done(function () {  })
		.fail(function () {  });
		--/



		window.open("/common/Download_Ios.Do?fsn="+fsn+"&ssid="+$("#gssid").val()) //ADODB.Stream 으로 직접 write ==> 똑같이 소스가 보인다.
		//window.open("http://mpm.smartpmis.net/Data/P13/G49/M2570/712679178/Tulips.jpg") //새창으로 이미지 열림
		//window.open("http://mpm.smartpmis.net/Data/P14/G1088/M53650/9975/7%EC%9B%94%20%EC%9B%94%EA%B0%84%ED%9A%8C%EC%9D%98%EC%9E%90%EB%A3%8C.pdf") //pds 새창으로 열림
		//window.open("http://mpm.smartpmis.net/Data/P13/G48/M3559/8716/%EC%98%81%EC%83%81%EB%A7%8C%EB%93%A4%EA%B8%B0%20%EC%9E%91%EC%97%85%EC%88%9C%EC%84%9C.xlsx") //엑셀 새창에서 열림
		//window.open("http://mpm.smartpmis.net/Data/P14/G1112/M54880/8732/11.30%EC%97%85%EB%AC%B4%EC%9D%BC%EC%A7%80(%EC%B1%85%EC%9E%84).hwp") //hwp는 안열림(계속 로딩중으로 나옴)
	}else{
		 $.fileDownload("/common/Download.Do?fsn="+fsn+"&ssid="+$("#gssid").val())
		.done(function () {  })
		.fail(function () {  });
	}
	*/

}


//게시형 자료 다운로드
function pdsGroupfileDown(fsn){
	//$.fileDownload("/Module/UserModule/pds/zip_groupFiles.do", {
	$.fileDownload("/module/usermodule/pds/zipGroupfiles", {
		successCallback : function () {
			//console.log('File download a success!');
		},
		failCallback: function (responseHtml, url) {
			//console.log('File download failed!');
		},
		httpMethod: "POST",
		data: {
			"fsn" : fsn.replace("g_", "")
		},
		cookieName: "ssn"+$("#gssid").val()
	});
}