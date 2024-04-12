<%@ Language=VBScript %>
<%
	'#################################################
	'@file	 
	'@date	 
	'@author 이대영(ddzzang@roit.co.kr) 로이테크원™
	'@brief  
	'#################################################
%><!--#include virtual="/common/function.asp"--><%
%><!--#include virtual="/module/tinymce/popup/base64.do"--><%

Dim b64
Dim url,encodeUrl,decodeUrl,bin,bencode,bdecode
Set b64 = New Base64

url = "/data/tinymce/2016/10/18/20/810007897_D4EE2861_ED04_4911_B7A3_2B2F2BE60697.JPG"
'encodeUrl=b64.strAnsi2Unicode(b64.Base64encode(url))
encodeUrl=b64.Base64encode(url)
'decodeUrl=b64.Base64decode(encodeUrl)
decodeUrl=b64.Base64decode(encodeUrl)

bin = b64.getBinary(url)
bencode = b64.encode(bin)
bdecode = b64.decode(bencode)

Response.write "url=" & url &"<br>"
Response.write "encodeUrl=" & b64.strAnsi2Unicode(encodeUrl) &"<br>"
Response.write "decodeUrl=" & decodeUrl &"<br>"
Response.write "decodeUrl2=" & b64.Base64decode(b64.strUnicode2Ansi("LwBkAGEAdABhAC8AdABpAG4AeQBtAGMAZQAvADIAMAAxADYALwAxADAALwAxADgALwAyADAALwA4ADEAMAAwADAANwA4ADkANwBfAEQANABFAEUAMgA4ADYAMQBfAEUARAAwADQAXwA0ADkAMQAxAF8AQgA3AEEAMwBfADIAQgAyAEYAMgBCAEUANgAwADYAOQA3AC4ASgBQAEcA")) &"<br>"

'Response.write "bin=<img src='" & bin &"'><br>"
Response.write "bencode=<img src='/module/tinymce/popup/test.do?src=" & b64.strAnsi2Unicode(encodeUrl) &"'><br>"
'Response.write "bdecode=<img src='" & bdecode &"'><br>"
Set b64 = Nothing 
%>