<%@ Language=VBScript %>
<%
	'#################################################
	'@file	 PostUpload.asp
	'@date	 2016/10/05
	'@author 이대영(ddzzang@roit.co.kr) 로이테크원™
	'@brief  tinymce에디터용 이미지파일 업로드
	'#################################################
%><!--#include virtual="/common/function.do"--><%
%><!--#include virtual="/module/tinymce/popup/base64.do"--><%

Dim tmpUploadURLPath,returnUrlPath
Dim fileName,fileExt, uuid, saveFileName
Dim uploadform
Dim FSO,b64

Call Load()

Sub Load()
	Set uploadform	= server.CreateObject("DEXT.FileUpload")
	uploadform.AutoMakeFolder = true
	Call GetParam()
	Call ExeProcess()
	Set uploadform = Nothing
	Call Display()
End Sub

Sub GetParam()
	Dim uuid_obj
	Set uuid_obj = Server.CreateObject("Scriptlet.Typelib")
	uuid = Left(Replace(Replace(Replace(uuid_obj.guid,"{",""),"}",""),"-","_"),36)
'Response.write uuid &  "////<br>"
	Set uuid_obj = Nothing
	tmpUploadURLPath ="/data/tinymce/"&year(now())&"/"&Right("0"&month(now()),2)&"/"&Right("0"&day(now()),2)&"/"&Right("0"&hour(now()),2)
	uploadform.DefaultPath=server.mapPath(tmpUploadURLPath)

End Sub 

Sub ExeProcess()
	fileName = uploadform("uploadInputBox").FileName 
'Response.write fileName & "<br>"
	fileExt = "." & right(fileName,len(fileName)-instr(fileName,".")) 
'Response.write fileExt & "<br>"
	saveFileName = Session.SessionID &"_"&uuid& fileExt
	fileName=uploadform.SaveAs(uploadform.DefaultPath&"\"&saveFileName)
'Response.write saveFileName & fileExt & "<br>"
	Set b64 = New Base64
	returnUrlPath=b64.strAnsi2Unicode(b64.Base64encode(HTTP_FILETRANSFER_HOST&tmpUploadURLPath&"/"&saveFileName))
	Set b64 = Nothing 
End Sub 
'623875640C1EE374C_53F1_46D0_AE02_4605A5175125
'623875640138D86C8_4C07_429D_9628_EA449A5A2BBE
'735D5AC3_B8EC_4E3A_AA5F_FD8DB29FEBC2
Sub Display()
'	Response.write "<script type=""text/javascript"">"&Chr(13)&Chr(10)
'	Response.write "<!--"&Chr(13)&Chr(10)
'	Response.write "//alert("""&returnUrlPath&""");"&Chr(13)&Chr(10)
'	Response.write "opener.tinymce.activeEditor.execCommand(""mceInsertContent"",'false',""<img src='/module/tinymce/popup/test.do?src="&returnUrlPath&"' class='userInputImg'>"");"&Chr(13)&Chr(10)
'	'Response.write "opener.tinymce.activeEditor.execCommand(""mceInsertContent"",'false',"""&returnUrlPath&""");"&Chr(13)&Chr(10)
'	Response.write "self.close();"&Chr(13)&Chr(10)
'	Response.write "//-->"&Chr(13)&Chr(10)
'	Response.write "</script>"&Chr(13)&Chr(10)
	Response.write "/module/tinymce/popup/getImageLoad.do?src="&returnUrlPath
End Sub 

Function GetMIMEType(extension)
    select case UCASE(extension)

        'Common documents
        case "TXT","TEXT","JS"
            sMIME = "text/plain"
        case "HTM","HTML","ASP","CGI","PL"
            sMIME = "text/html"
        case "PDF"
            sMIME = "application/pdf"
        case "RTF"
            sMIME = "text/richtext"
        case "XML"
            sMIME = "text/xml"
        case "WPD"
            sMIME = "application/wordperfect"
        case "WRI"
            sMIME = "application/mswrite"
        case "XLS","XLS3","XLS4","XLS5","XLW"
            sMIME = "application/msexcel"
        case "DOC"
            sMIME = "application/msword"
        case "PPT","PPS"
            sMIME = "application/mspowerpoint"
        
        'WAP/WML files    
        case "WML"
            sMIME = "text/vnd.wap.wml"
        case "WMLS"
            sMIME = "text/vnd.wap.wmlscript"
        case "WBMP"
            sMIME = "image/vnd.wap.wbmp"
        case "WMLC"
            sMIME = "application/vnd.wap.wmlc"
        case "WMLSC"
            sMIME = "application/vnd.wap.wmlscriptc"
            
        'Images
        case "GIF"
            sMIME = "image/gif"
        case "JPG","JPE","JPEG"
            sMIME = "image/jpeg"
        case "PNG"
            sMIME = "image/x-png"
        case "BMP"
            sMIME = "image/bmp"
        case "TIF","TIFF"
            sMIME = "image/tiff"
        case "AI","EPS","PS"
            sMIME = "application/postscript"
            
        'Sound files
        case "AU","SND"
            sMIME = "audio/basic"
        case "WAV"
            sMIME = "audio/wav"
        case "RA","RM","RAM"
            sMIME = "audio/x-pn-realaudio"
        case "MID","MIDI"
            sMIME = "audio/x-midi"
        case "MP3"
            sMIME = "audio/mp3"
        case "M3U"
            sMIME = "audio/m3u"
            
        'Video/Multimedia files
        case "AVI"
            sMIME = "video/avi"
        case "MPG","MPEG"
            sMIME = "video/mpeg"
        case "QT","MOV","QTVR"
            sMIME = "video/quicktime"
        case "SWA"
            sMIME = "application/x-director"
        case "SWF"
            sMIME = "application/x-shockwave-flash"
            
        'Miscellaneous
        case "COM","EXE","DLL","OCX"
            sMIME = "application/octet-stream"
        case "PDB"
            sMIME = "chemical/x-pdb"
        case "ZIP"
            sMIME = "application/x-zip-compressed"
            
        'Unknown
        case else
            sMIME = "application/octet-stream"
    end select
    
    GetMimeType = sMIME
End Function
%>
