<%@ Language=VBScript %>
<%
	'#################################################
	'@file	 
	'@date	 
	'@author 이대영(ddzzang@roit.co.kr) 로이테크원™
	'@brief  
	'#################################################
%><!--#include virtual="/common/function.do"--><%
%><!--#include virtual="/module/tinymce/popup/base64.do"--><%


'Dim fso,file,fileInfo
'Set fso=Server.CreateObject("Scripting.FileSystemObject")
'file = server.mapPath("/data/tinymce/2016/10/18/20/810007897_B6CF21D5_1731_42FD_891E_7FBD0CE57CA8.JPG")
'file = server.mapPath("/data/tinymce/2016/10/18/20/img.JPG")
'Set fileInfo=fso.getfile(file)
'Response.clear
'Response.write "fileType="&fileInfo.type&"<br>"
'Response.write "fileName="&fileInfo.name&"<br>"
'Set fileInfo = Nothing
'Set fso = Nothing 

	Dim objStream
	Dim b64
	Dim srcPath
	Dim uuid_obj
	Set uuid_obj = Server.CreateObject("Scriptlet.Typelib")
	uuid = Left(Replace(Replace(Replace(uuid_obj.guid,"{",""),"}",""),"-","_"),36)
	Set uuid_obj = Nothing 
	Set b64 = New Base64
	srcPath=b64.Base64decode(b64.strUnicode2Ansi(RQ("src")))
	Set b64 = Nothing
	Response.Clear 

	Response.AddHeader "Content-Disposition","attachment;filename="""&uuid&""""

	Set objStream = Server.CreateObject("ADODB.Stream") 
	objStream.Open '객체오픈
	objStream.Type = 1 '바이너리로지정
	'아래 파일의 경로는 각자의 형편에 맞처 수정이 필요함
	objStream.LoadFromFile  server.mapPath(srcPath)
	response.BinaryWrite objStream.Read '출력

	objStream.Close
	Set objstream =Nothing 
%>