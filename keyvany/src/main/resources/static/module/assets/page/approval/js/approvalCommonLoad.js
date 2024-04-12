/* ------------------------------------------------------------------------------
*
 전자결재 공통 자바스크립트 로드
*
* ---------------------------------------------------------------------------- */
var baseURL = "/resources/module/assets/page/approval/js"
var html=""

function load(path) {
	var date = new Date();
	var curTimeStamp = date.getFullYear()
	+ ("0" + (date.getMonth() + 1)).slice(-2)
	+ ("0" + date.getDate()).slice(-2)
	+ ("0" + date.getHours() + 1 ).slice(-2)
	+ ("0" + date.getMinutes()).slice(-2)
	+ ("0" + date.getSeconds()).slice(-2);

	path += "?" + curTimeStamp

	html += '<script type="text/javascript" src="' + baseURL + '/' + path + '"></script>\n';
}

load("approvalCommons.js");
load("approvalEditor.js");
load("approvalAppLine.js");
load("approvalViewAuth.js");
load("approvalReceiveGrp.js");

document.write(html);
