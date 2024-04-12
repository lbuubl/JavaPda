<%
Class Base64
    
    Public classVersion
	Public classType
    Private sBASE_64_CHARACTERS
	Private sBASE_64_CHARACTERSansi

    Private Sub Class_initialize() '생성자
        classType    = typeName(Me)
        classVersion = "1.0.0.0"
		sBASE_64_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
		sBASE_64_CHARACTERSansi = strUnicode2Ansi(sBASE_64_CHARACTERS)
    End Sub
    
    Private Sub Class_terminate() '소멸자
    End Sub
    
    Public Function getBinary(path) '파일을 바이너리텍스트로 변환, 경로는 웹경로
        Dim Stream : Set Stream = Server.createObject("ADODB.Stream")
		Dim filePath, fso
		Set fso = Server.CreateObject("Scripting.FileSystemObject") 

		If isnull(path) Or isempty(path) Or Trim(path)="" Or Trim(path)="null" Then
			getBinary=""
		Else
			filePath =  server.mapPath(path)
			If fso.FileExists(filePath) then 
				filePath = server.mapPath(path)
				Stream.type = 1' adTypeBinary
				Stream.open()
				Stream.loadFromFile(filePath)
				getBinary = Stream.read()
				Stream.close()
			Else
				getBinary=""
			End If 
		End If 
		Set fso = Nothing 
        Set Stream = Nothing 
    End Function
    
    Public Function encode(bin) '바이너리로 변환된 파일정보를 base64로 인코딩
        Dim Xml : Set Xml = Server.createObject("MSXML2.DOMDocument.6.0")
        Dim Node : Set Node = Xml.createElement("data")
		If isnull(bin) Or isempty(bin) Or Trim(bin)="" Or Trim(bin)="null" Then
			encode = ""
		Else 
			Node.dataType = "bin.base64"
			Node.nodeTypedValue = bin
			encode = Node.Text
		End If 
        Set Node = Nothing
        Set Xml = Nothing
	End Function
    
    Public Function decode(base64) 'base64로 인코딩된 파일을 디코딩
        Dim Xml : Set Xml = Server.createObject("MSXML2.DOMDocument.6.0")
        Dim Node : Set Node = Xml.createElement("data")
		If isnull(base64) Or isempty(base64) Or Trim(base64)="" Then
			decode = ""
		Else 
			Node.dataType = "bin.base64"
			Node.text = base64
			decode = Node.nodeTypedValue
		End If
        Set Node = nothing
        Set Xml = nothing
    End Function
    
    Public Function encodedSize(base64) 'base64로 변환된 바이너리파일사이즈
		If isnull(base64) Or isempty(base64) Or Trim(base64)="" Then
			encodedSize = 0
		Else 
			encodedSize = len(base64) / 1024
		End If 
    End Function
    
    Public Function decodedSize(bin) '바이너리 문자를 파일사이즈로 변환
		If isnull(bin) Or isempty(bin) Or Trim(bin)="" Then
			decodedSize = 0
		Else 
	        decodedSize = lenb(bin) / 1024
		End If 
    End Function

	Public Function strUnicodeLen(asContents) '유니코드 길이 구현
		Dim asContents1 : asContents1 ="a" & asContents
		Dim Len1  : Len1=Len(asContents1)
		Dim K  : K=0
		Dim I, Asc1
		
		For I=1 To Len1
			Asc1 = asc(mid(asContents1,I,1))
			IF Asc1 < 0 Then Asc1 = 65536 + Asc1
			IF Asc1 > 255 Then
				K = K + 2
			Else
				K = K + 1
			End If
		Next
		strUnicodeLen = K - 1
	End Function

	Public Function strUnicode2Ansi(asContents) '유니코드문자 안시코드로 변환
		Dim Len1   : Len1 = Len(asContents)
		Dim I, VarCHAR, VarASC, VarHEX, VarLOW, VarHIGH
		strUnicode2Ansi = ""

		For I = 1 to Len1
			VarCHAR = Mid(asContents,I,1)
			VarASC = Asc(VarCHAR)
			IF VarASC < 0 Then VarASC = VarASC + 65536
			IF VarASC > 255 Then
				VarHEX  = Hex(VarASC)
				VarLOW  = Left(VarHEX,2)
				VarHIGH  = Right(VarHEX,2)
				strUnicode2Ansi = strUnicode2Ansi & ChrB("&H" & VarLOW ) & ChrB("&H" & VarHIGH )
			Else
				strUnicode2Ansi = strUnicode2Ansi & ChrB(VarASC)
			End If
		Next
	End Function

	Public Function strAnsi2Unicode(asContents) '안시문자 유니코드로 변환
		Dim Len1   : Len1  = LenB(asContents)
		Dim VarCHAR, VarASC, I
		strAnsi2Unicode = ""

		IF Len1=0 Then Exit Function
			For I=1 To Len1
				VarCHAR = MidB(asContents,I,1)
				VarASC = AscB(VarCHAR)
				IF VarASC > 127 Then
					strAnsi2Unicode = strAnsi2Unicode & Chr(AscW(MidB(asContents, I+1,1) & VarCHAR))
					I  = I + 1
				Else
				strAnsi2Unicode = strAnsi2Unicode & Chr(VarASC)
			End If
		Next
	End Function

	Public Function Base64encode(asContents) 'base64문자 인코딩, 유니코드문자열로 입력되어야 함
		Dim lnPosition
		Dim lsResult
		Dim Char1
		Dim Char2
		Dim Char3
		Dim Char4
		Dim Byte1
		Dim Byte2
		Dim Byte3
		Dim SaveBits1
		Dim SaveBits2
		Dim lsGroupBinary
		Dim lsGroup64
		Dim M3, M4, Len1, Len2
		
		'Len1   =LenB(strUnicode2Ansi(asContents))
		Len1   =LenB(asContents)
		
		IF Len1 < 1 Then
			Base64encode = ""
			Exit Function
		End If
		
		M3=Len1 Mod 3
		
		IF M3 > 0 Then asContents = asContents & String(3 - M3, ChrB(0))
		IF m3 > 0 Then
			Len1 = Len1 + (3 - M3)
			Len2 = Len1 - 3
		Else
			Len2 = Len1
		End If
		
		lsResult = ""
		
		For lnPosition = 1 To Len2 Step 3
			lsGroup64 = ""
			lsGroupBinary = MidB(asContents, lnPosition, 3)
			Byte1  = AscB(MidB(lsGroupBinary, 1, 1)) : SaveBits1 = Byte1 And 3
			Byte2  = AscB(MidB(lsGroupBinary, 2, 1)) : SaveBits2 = Byte2 And 15
			Byte3  = AscB(MidB(lsGroupBinary, 3, 1))
			Char1  = MidB(sBASE_64_CHARACTERSansi, ((Byte1 And 252) \ 4) + 1, 1)
			Char2  = MidB(sBASE_64_CHARACTERSansi, (((Byte2 And 240) \ 16) Or (SaveBits1 * 16) And &HFF) + 1, 1)
			Char3  = MidB(sBASE_64_CHARACTERSansi, (((Byte3 And 192) \ 64) Or (SaveBits2 * 4) And &HFF) + 1, 1)
			Char4  = MidB(sBASE_64_CHARACTERSansi, (Byte3 And 63) + 1, 1)
			lsGroup64 = Char1 & Char2 & Char3 & Char4
			lsResult  = lsResult & lsGroup64
		Next
		
		IF M3 > 0 Then
			lsGroup64 = ""
			lsGroupBinary = MidB(asContents, Len2 + 1, 3)
			Byte1  = AscB(MidB(lsGroupBinary, 1, 1)) : SaveBits1 = Byte1 And 3
			Byte2  = AscB(MidB(lsGroupBinary, 2, 1)) : SaveBits2 = Byte2 And 15
			Byte3  = AscB(MidB(lsGroupBinary, 3, 1))
			Char1  = MidB(sBASE_64_CHARACTERSansi, ((Byte1 And 252) \ 4) + 1, 1)
			Char2  = MidB(sBASE_64_CHARACTERSansi, (((Byte2 And 240) \ 16) Or (SaveBits1 * 16) And &HFF) + 1, 1)
			Char3  = MidB(sBASE_64_CHARACTERSansi, (((Byte3 And 192) \ 64) Or (SaveBits2 * 4) And &HFF) + 1, 1)
			IF M3=1 Then
				lsGroup64 = Char1 & Char2 & ChrB(61) & ChrB(61)
			Else
				lsGroup64 = Char1 & Char2 & Char3 & ChrB(61)
			End If
			lsResult  = lsResult & lsGroup64
		End If
'		Base64encode = StrReverse(strAnsi2Unicode(lsResult))
		Base64encode = lsResult
	End Function

	Public Function Base64decode(asContents) 'base64문자 디코딩, 안시코드문자열로 입력되어야 함
		Dim lsResult
		Dim lnPosition
		Dim lsGroup64, lsGroupBinary
		Dim Char1, Char2, Char3, Char4
		Dim Byte1, Byte2, Byte3
		Dim M4, Len1, Len2
		
'		Len1 = LenB(strUnicode2Ansi(StrReverse(asContents)))
		Len1 = LenB(asContents)
		M4 = Len1 Mod 4

		IF Len1 < 1 Or M4 > 0 Then
			Base64decode = ""
			Exit Function
		End If
		IF MidB(asContents, Len1, 1) = ChrB(61) Then M4 = 3
		IF MidB(asContents, Len1-1, 1) = ChrB(61) Then M4 = 2
		IF M4 = 0 Then
			Len2 = Len1
		Else
			Len2 = Len1 - 4
		End If
		
		For lnPosition = 1 To Len2 Step 4
			lsGroupBinary = ""
			lsGroup64 = MidB(asContents, lnPosition, 4)
			Char1  = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 1, 1)) - 1
			Char2  = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 2, 1)) - 1
			Char3  = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 3, 1)) - 1
			Char4  = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 4, 1)) - 1
			Byte1  = ChrB(((Char2 And 48) \ 16) Or (Char1 * 4) And &HFF)
			Byte2  = lsGroupBinary & ChrB(((Char3 And 60) \ 4) Or (Char2 * 16) And &HFF)
			Byte3  = ChrB((((Char3 And 3) * 64) And &HFF) Or (Char4 And 63))
			lsGroupBinary = Byte1 & Byte2 & Byte3
			lsResult  = lsResult & lsGroupBinary
		Next
		
		IF M4 > 0 Then
			lsGroupBinary = ""
			lsGroup64 = MidB(asContents, Len2 + 1, M4) & ChrB(65)
			IF M4=2 Then
				lsGroup64 = lsGroup64 & chrB(65)
			End If
			Char1 = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 1, 1)) - 1
			Char2 = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 2, 1)) - 1
			Char3 = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 3, 1)) - 1
			Char4 = InStrB(sBASE_64_CHARACTERSansi, MidB(lsGroup64, 4, 1)) - 1
			Byte1 = ChrB(((Char2 And 48) \ 16) Or (Char1 * 4) And &HFF)
			Byte2 = lsGroupBinary & ChrB(((Char3 And 60) \ 4) Or (Char2 * 16) And &HFF)
			Byte3 = ChrB((((Char3 And 3) * 64) And &HFF) Or (Char4 And 63))
			IF M4=2 Then
				lsGroupBinary = Byte1
			elseIF M4=3 Then
				lsGroupBinary = Byte1 & Byte2
			end If
			lsResult   = lsResult & lsGroupBinary
		End If
'		Base64decode   = strAnsi2Unicode(lsResult)
		Base64decode   = lsResult
	End Function
End Class


'Dim ORIGNvalue : ORIGNvalue = "mTVisman123456"
'Dim EncodeA : EncodeA = Base64encode(ORIGNvalue)
'Dim DecodeA : DecodeA = Base64decode(EncodeA)
'response.write "[" & DecodeA & "] was encoded to [" & EncodeA & "]<BR>"
'response.write "[" & EncodeA & "] was decoded to [" & DecodeA & "]<BR>"
%>