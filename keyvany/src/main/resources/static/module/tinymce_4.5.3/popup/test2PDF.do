<%@codepage = "65001"%>
<%session.codepage = "65001"%>
<%   
Response.CharSet = "utf-8"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
  
webUrl  = "http://mpms.smartpmis.net/module/tinymce/popup/html2pdf.do?seqno=6"
  
fileNm = "html2pdf.pdf"
fileLocation = server.mappath("/") & "/data/tinymce/2016/10/20/17/" & fileNm
  
Set Executor = Server.CreateObject("ASPExec.Execute")
Executor.Application = server.MapPath("/common/") & "/wkhtmltopdf.exe --encoding utf-8 " &  webUrl & " " & fileLocation
Executor.Parameters = ""
Executor.ShowWindow = True
strResult = Executor.ExecuteWinApp
set Executor = nothing
  
response.write fileNm
%>