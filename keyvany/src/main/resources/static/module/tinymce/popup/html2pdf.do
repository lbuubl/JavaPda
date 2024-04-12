<%@ Language=VBScript %>
<%codepage = "65001"%>
<%session.codepage = "65001"%>
<%
	'#################################################
	'@file	 
	'@date	 
	'@author 이대영(ddzzang@roit.co.kr) 로이테크원™
	'@brief  
	'#################################################
%><!--#include virtual="/common/DBHelper.asp"--><%
%><!--#include virtual="/common/function.asp"--><%
%><!--#include virtual="/module/tinymce/popup/base64.do"--><%

Response.CharSet = "utf-8"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
  

Dim DBHelper
Dim arrData, seqno
Dim displayHtml

Call Load()

Sub Load()
	Set DBHelper = new clsDBHelper     'DBHelper 생성
	Call GetParam()
	Call ExeProcess()
	DBHelper.Dispose
	Set DBHelper = Nothing 'DBHelper 삭제
	Call Display()
End Sub

Sub GetParam()
	seqno = RQ("seqno")
End Sub

Sub ExeProcess()
	Dim sql
	sql = "Select DOC_Cont_Xml from T_DOC_MST Where  SeqNo=" & SeqNo
	arrData = DBHelper.ExecSQLReturnArray(sql, Nothing, Nothing) '일반 SQL
	If isArray(arrData) Then
		displayHtml=arrData(0,0)
	Else
		displayHtml=""
	End If 
End Sub

Sub Display()
	Response.write displayHtml
End Sub
%>