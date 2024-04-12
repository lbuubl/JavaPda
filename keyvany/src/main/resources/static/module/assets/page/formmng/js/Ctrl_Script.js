
	var UGMDTL_SPLIT="ZS";

/*
	function _VerifyVersion()
	{
		// 설치확인▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		if(pHwpCtrl.getAttribute("Version") == null)
		{
			alert("한글 2002이상 컨트롤이 설치되지 않았습니다.");
			return false;
		}
		//버젼 확인▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		CurVersion = pHwpCtrl.Version;
		if(CurVersion < MinVersion)
		{
			alert("한글프로그램의 버젼이 낮아서 정상적으로 동작하지 않을 수 있습니다.\n"+
				"최신 버젼으로 업데이트하기를 권장합니다.\n\n"+
				"현재 버젼: 0x" + CurVersion.toString(16) + "\n"+
				"권장 버젼: 0x" + MinVersion.toString(16) + " 이상"
				);
			return false;
		}
		if(CurVersion >= 0x0505118 && CurVersion <= 0x050511C ) // GetTextFile 동작시 오류 발생
		{
			alert("정상적으로 동작하지 않는 버젼 에러 [HwpCtrl.GetTextFile 실행에러] .\n"+
				"최신 버젼으로 업데이트하기를 권장합니다.\n\n"+
				"현재 버젼: 0x" + CurVersion.toString(16) + "\n"+
				"권장 버젼: " + 0x050511D + " 이상"
				);
			return false;
		}
		return true;
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//한글컨트롤 툴바초기화
	function InitToolBarJS(){
			pHwpCtrl.SetToolBar(-1, "#1;1:TOOLBAR_MENU");
			// 맨 앞에 FileNew, FileOpen, FileSave, FileSaveAs 를 넣기 위해 TOOLBAR_STANDARD를 사용하지 않는다.

			pHwpCtrl.SetToolBar(1, "#2;1:기본 도구 상자,  FileOpen, FileSaveAs, Separator, FilePreview, Print, Separator, Undo, Redo, Separator, Cut, Copy, Paste,"
			+"Separator, ParaNumberBullet, MultiColumn, SpellingCheck, HwpDic, Separator, PictureInsertDialog, MacroPlay1,"
			+"TableCreate, TableDeleteColumn, TableDeleteRow,TableDeleteRowColumn,TableDistributeCellHeight,"
			+"TableDistributeCellWidth,TableDrawPen,TableEraser,TableMergeCell, TableSplitCell,TableSplitCellCol2,TableSplitCellRow2");

			pHwpCtrl.SetToolBar(-1, "#3;1:TOOLBAR_FORMAT");
			pHwpCtrl.SetToolBar(-1, "#4;1:TOOLBAR_DRAW");
			pHwpCtrl.SetToolBar(-1, "#5;2:TOOLBAR_TABLE");
			pHwpCtrl.SetToolBar(-1, "#6;2:TOOLBAR_NUMBERBULLET");
			pHwpCtrl.SetToolBar(-1, "#7;2:TOOLBAR_HEADER_FOOTER");
			pHwpCtrl.SetToolBar(-1, "#8;2:TOOLBAR_MASTERPAGE");
			pHwpCtrl.SetToolBar(-1, "#9;2:TOOLBAR_NOTE");
			pHwpCtrl.SetToolBar(-1, "#10;2:TOOLBAR_COMMENT");

			pHwpCtrl.ShowToolBar(1);
			pHwpCtrl.ShowStatusBar(1);
			pHwpCtrl.AutoShowHideToolBar(true);

			// 새문서, 불러오기, 저장
			pHwpCtrl.ReplaceAction("FileNew", "HwpCtrlFileNew");
			pHwpCtrl.ReplaceAction("FileOpen", "HwpCtrlFileOpen");
			pHwpCtrl.ReplaceAction("FileSave", "HwpCtrlFileSaveAutoBlock");
			pHwpCtrl.ReplaceAction("FileSaveAs", "HwpCtrlFileSaveAsAutoBlock");
			pHwpCtrl.ReplaceAction("FileSaveAs", "HwpCtrlFileSaveAsAutoBlock");
	}
*/
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	String.prototype.trim = function()
	{
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒결재지정 관리 스크립트▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 결재자, 참조자, 회람자의 지정및 미지정 함수
	var Prv_CellNm="";
	var clickObj_item_kind="";

	function FieldAssignApr(btn_obj, App_Cellid, cls){

			var btn_obj=$(btn_obj)

			if(cls=="on"){ // on상태에서 클릭이면, 해제라고 가정한다.

					btn_ChoiceObj=tinyMCE.activeEditor.dom.select('TD[id*='+App_Cellid+']');
					if (btn_ChoiceObj.length>0) //해제하는 버튼의 아이디의 항목이 존제하는 경우
					{
							SetEditorVal(btn_ChoiceObj, "id", "");
							SetEditorVal(btn_ChoiceObj, "class", "");
							SetEditorVal(btn_ChoiceObj, "html", "");
					}else{
							alert("양식내 해제하는 항목을 찾지 못했습니다.\n직접소스에서 #"+App_Cellid+"항목을 확인하여 지워주시기 바랍니다.");
							SetEditorVal(btn_ChoiceObj, "html", "");
					}

					//결재싸인표기타입 초기화
					$("#"+App_Cellid).val("")
					$(btn_obj).removeClass('on').addClass('off');
					$("#SignKind_Table").hide();

					clickObj =null; //클릭한 위치정보 해제
					$(".Sign_kind[value=0]").attr("checked", true); //싸인타입 0으로 지정

			}else{// off에서 클릭은 지정이라고 가정한다.

						if (clickObj==null)
						{
									alert("결재를 지정할 위치를 먼저 마우스로 클릭하여주시기 바랍니다.");
									return false;
						}


						if (clickObj.id !="")	{  //지정된 속성이 있으면

							    clickObj_Text=ItemTextReturn(clickObj);
								msg="현재 선택하신 위치에는 \'"+clickObj_Text+"\'라는 항목이 이미 설정되어있습니다.\n\기존 설정을 해제하시고, 여기에 지정하시겠습니까?\n\n결재타입에 따라 여러셀을 사용하는 경우 해당셀도 같이 해제됩니다.";
								FieldSet_Yn= confirm(msg);

								if (FieldSet_Yn){
										//해당 버튼 오프
										if (clickObj_item_kind=="App")
										{
												$("button[title*='"+clickObj.id+"']").removeClass('on').addClass('off');
										}else if (clickObj_item_kind=="Single"){
												btnSort=clickObj.id.substring(1,2);
												$("button[id=Single_item_btn]:eq("+(btnSort-1)+")").removeClass('on').addClass('off');
										}else{//멀티는 해제할 버튼이 없는데 ??

										}
										clickObj_item_kind="";

								}else{
									return false;
								}
						}else{//기존에 지정된 정보가 없으면..
							   //컨트롤위치에 ID , class바이딩
						}

						//컨트롤위치에 ID , class바이딩
						SetEditorVal(clickObj, "id", App_Cellid);
						SetEditorVal(clickObj, "class", App_Cellid +" a");
						SetEditorVal(clickObj, "html", btn_obj[0].innerText);

						// 싸인타입별 지정
						if ($("#"+App_Cellid).val()==""){
								$(".Sign_kind[value='0']").attr("checked","checked")
						}else{
								chk_val=$("#"+App_Cellid).val()
								$(".Sign_kind[value='"+chk_val+"']").attr("checked","checked")
						}
						//싸인 선택창 뷰
						var sel_pos=$(btn_obj).position();
						$("#SignKind_Table").css( { "left": (sel_pos.left) + "px", "top": (sel_pos.top+25)+ "px" } );
						$("#SignKind_Table").show();

						$("#xClose").attr("alt",App_Cellid);
						$(btn_obj).removeClass('off').addClass('on');

			}
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 결재별 오프젝트에 싸인 타입에 대한 값을 지정
	function SetApp_Type(click_obj){

			arg=$(click_obj).val(); //<-- sign_kind 값
			arg_txt = $(click_obj).data("text"); //<-- sign_kind 표기 택스트
			Val_poction=$("#xClose").attr("alt");

			//(전역변수에 담긴 필드명 선택한 싸이타입을 지정한다.)->A_1_1 = 싸입타입값 (0~6)
			console.log(Val_poction)
			console.log(arg)

			$("#appSet_box #"+Val_poction).val(arg) //<-- 결재항목별 숨김항목에 sign_kind 값지정

			if (arg<=5)// 0~5까지
			{
					Start_obj=tinyMCE.activeEditor.dom.select('#'+clickObj.id);
					SetEditorVal(Start_obj, "id",  Val_poction);
					SetEditorVal(Start_obj, "class", Val_poction +" a");
					SetEditorVal(Start_obj, "html", Start_obj[0].innerText + " ["+ arg_txt+"]");

			}

			if (arg==6 || arg==7 || arg==8)// 678은 TD를 체크한다.
			{
					Next_obj=tinyMCE.activeEditor.dom.getNext(clickObj, "TD"); //선택OBJ의 다음 선택할 태그
					cTD_index=clickObj.cellIndex+1
					row_cnt=$(tinyMCE.activeEditor.dom.getParent(clickObj, "TR")).children('td').length; //선택TD의행에 TD갯수
			}

			if (arg==6 || arg==7) //[이름][싸인]  or  [이름][싸인/결재일]
			{
					if (arg==6){
						Pre_fix="S";
						msg="싸인";
					}else{
						Pre_fix="T";
						msg="싸인/결재일";
					}

					if ( row_cnt -1< cTD_index ){ // 현재선택한 위치가 옆에TD가 없다면..

							pickErrorInit(Val_poction, clickObj);

							alert("선택한 지점 다음에 "+msg+"이 들어갈 셀(TD)이 1개 필요합니다.\n확인하시고, 다시 지정하여 주시기 바랍니다.");
							return false;
					}

					//첫번째 지점의 이름변경
					Start_obj=tinyMCE.activeEditor.dom.select('#'+clickObj.id);
					SetEditorVal(Start_obj, "id",  "N"+Val_poction);
					SetEditorVal(Start_obj, "class", "N"+Val_poction +" a");
					SetEditorVal(Start_obj, "html", Start_obj[0].innerText + " " +arg_txt.split("][")[0] +"]");

					//다음TD에 지정된 아이디가 있으면..기존 지정된 결재버튼 or 아이템버튼 해제처리
					NextTD_objCheck_BtnUnlock(Val_poction, Next_obj);
					SetEditorVal(Next_obj, "id",     Pre_fix+Val_poction);
					SetEditorVal(Next_obj, "class", Pre_fix+Val_poction+" a");
					SetEditorVal(Next_obj, "html", Start_obj[0].innerText.replace( arg_txt.split("][")[0] +"]", "") + " [" +arg_txt.split("][")[1]);
			}


			if (arg==8) //[직급][이름][싸인]
			{
				if ( row_cnt -2< cTD_index ){ // 현재선택한 위치가 옆에TD가 없다면..

							pickErrorInit(Val_poction, clickObj);

							alert("선택한 지점 다음에 이름과 싸인 셀(TD)이 2개 필요합니다.\n확인하시고, 다시 지정하여 주시기 바랍니다.");
							return false;
					}

					//첫번째 지점의 이름변경
					Start_obj=tinyMCE.activeEditor.dom.select('#'+clickObj.id);
					SetEditorVal(Start_obj, "id",  "P"+Val_poction);
					SetEditorVal(Start_obj, "class", "P"+Val_poction+" a");
					SetEditorVal(Start_obj, "html", Start_obj[0].innerText + " " +arg_txt.split("][")[0] +"]" );

					//다음TD에 지정된 아이디가 있으면..기존 지정된 결재버튼 or 아이템버튼 해제처리
					NextTD_objCheck_BtnUnlock(Val_poction, Next_obj);
					SetEditorVal(Next_obj, "id", "N"+Val_poction);
					SetEditorVal(Next_obj, "class", "N"+Val_poction+" a");
					SetEditorVal(Next_obj, "html", Start_obj[0].innerText.replace(arg_txt.split("][")[0] +"]", "") + " [" +arg_txt.split("][")[1]+"]" );

					//--싸인칸으로 이동
					Next_obj=tinyMCE.activeEditor.dom.getNext(Next_obj, "TD"); //선택OBJ의 다음 선택할 태그
					//다음TD에 지정된 아이디가 있으면..기존 지정된 결재버튼 or 아이템버튼 해제처리
					NextTD_objCheck_BtnUnlock(Val_poction, Next_obj);
					SetEditorVal(Next_obj, "id", "S"+Val_poction);
					SetEditorVal(Next_obj, "class", "S"+Val_poction+" a");
					SetEditorVal(Next_obj, "html", Start_obj[0].innerText.replace(arg_txt.split("][")[0] +"]", "") + " [" +arg_txt.split("][")[2] );
			}


			$("#SignKind_Table").hide();
			$("#xClose").attr("alt","");

			clickObj =null; //클릭한 위치정보 해제
			$(".Sign_kind[value=0]").attr("checked", true); //싸인타입 0으로 지정
	}


	//결재선 지정시 TD없음 에러 리턴
	function pickErrorInit(Val_poction, clickObj){

				$("#"+Val_poction).val("");
				$("#appr_btn[title='"+Val_poction+"']").removeClass('on').addClass('off');
				$("#SignKind_Table").hide();
				$("#xClose").attr("alt","");

				SetEditorVal(clickObj, "id", "");
				SetEditorVal(clickObj, "class", "");
				SetEditorVal(clickObj, "html", "");

	}

	//다음TD에 아이디가 지정되어있으면 해당지정버튼 해제하는 기능
	function NextTD_objCheck_BtnUnlock(Val_poction, Next_obj){

			if (Next_obj.id !="")//다음TD에 지정된 아이디가 있으면..
			{
					//지정된 값 해제처리 // 해당항목이 결재인 경우는 결재싸인타입값 초기화
					if (Next_obj.id.indexOf("A_") > -1 )
					{
						$("#"+Val_poction).val("");
						btn_title= Next_obj.id.replace("N","");
						btn_title= btn_title.replace("S","");
						btn_title= btn_title.replace("P","");
						btn_title= btn_title.replace("T","");

						//기존 지정된 결재버튼 or 아이템버튼 해제처리
						$("button[title='"+btn_title+"']").removeClass('on').addClass('off');
					}else{
						btn_title = Next_obj.id;
						btnSort = Next_obj.id.substring(1,2);
						$("button[title='Single_"+btnSort+"']").removeClass('on').addClass('off');
					}

					//console.log(btn_title)	;

					TD_OBJ=tinyMCE.activeEditor.dom.select('TD[id*='+btn_title+']');
					if (TD_OBJ.length>0) //해제하는 버튼의 아이디의 항목이 존제하는 경우
					{
							SetEditorVal(TD_OBJ, "id", "");
							SetEditorVal(TD_OBJ, "class", "");
							SetEditorVal(TD_OBJ, "html", "");
					}


			}

	}


 //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	//싸인타입을 지정
	function app_TypeInfo(obj){
			Sel_obj=obj.value
			SignObj=document.all.SignType

			for (i=0;i<=SignObj.length ;i++ )
			{
				if((i+1)==Sel_obj){
					SignObj[i].checked=true
					break;
				}
			}
	}

	//지정한 위치에 대한 명칭리턴
	function ItemTextReturn(clickObj){

				this_form_item=0;
				this_Type=clickObj.id.substring(0,1);

				// A_1_2, NA_1_2, PA_1_2
				App_item_Kind="ANPSTRCV";//결재,이름,직급,싸인,싸인/결재일, 참조,협조,회람
				if (App_item_Kind.indexOf(this_Type)>-1 && clickObj.id.length <=6 )//결재셀 아이템이라면..
				{
					btn_title= clickObj.id.replace("N","");
					btn_title= btn_title.replace("S","");
					btn_title= btn_title.replace("P","");
					btn_title= btn_title.replace("T","");

					clickObj_Text=$("button[title*="+btn_title+"]").text();
					this_form_item=1;
					clickObj_item_kind="App";
				}

				// S1_1_0-0-0
				Single_item_Kind="US";//싱글,시스템
				if (Single_item_Kind.indexOf(this_Type)>-1 && clickObj.id.length > 6 )//입력셀 아이템이라면..
				{
					btnSort=clickObj.id.split("_")[0].replace("U","");
					btnSort=btnSort.replace("S","");

					clickObj_Text=$("input[name='Single_"+btnSort+"']").val();
					this_form_item=1;
					clickObj_item_kind="Single";
				}

				// M1_1_1-PRS-2 ZS T_1_2
				Multi_item_Kind="M";// 선택셀
				if (Multi_item_Kind.indexOf(this_Type)>-1)//입력셀 아이템이라면..
				{
					clickObj_Text=$("#multiMst_list>tbody>tr[data-cellnm*='"+clickObj.id+"']>td:eq(0)").text();
					this_form_item=1;
					clickObj_item_kind="Multi";
				}


				if (this_form_item==0)
				{
						clickObj_Text=clickObj.id+"[양식내 지정항목 아님]";
						clickObj_item_kind="ex";
				}
				return clickObj_Text;
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒텍스트셀 부분관리 스크립트▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	//단일테이터필드 추가
	function SingleDataAdd(){

			var Tr,Td;
		//	var S_cnt=Number(document.all.Single_Cnt.value);//싱글테이터 갯수

			S_cnt=$(".single_items").last().attr("id").split("_")[1];


			Tr = SingleTable.insertRow();
			Tr.style.backgroundColor="#FAFBEC";

			Tr.style.height="25";
			Tr.style.align="center";

		//	New_num=S_cnt+2 //
			New_num=parseInt(S_cnt)+1

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<input type='text' id='Single_"+New_num+"'  name='Single_"+New_num+"' size='15' maxlength='25' onKeyup='colnum_chk(this)' class='form-control single_items'>";

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<input type='checkbox' id='required_Yn_"+New_num+"' name='required_Yn_"+New_num+"' onclick='Req_chk(this)' class='Single'>";

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<input type='checkbox' id='tag_Yn_"+New_num+"' name='tag_Yn_"+New_num+"'  class='Single'/>";

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<input type='checkbox' id='init_yn_"+New_num+"' name='init_yn_"+New_num+"'  class='Single'/>";

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<input type='checkbox' id='DocNumber_Yn_"+New_num+"' name='DocNumber_Yn_"+New_num+"' onclick='DocNumber_chk(this)' class='Single'>";

			Td = Tr.insertCell();
			Td.align="center";
			doc_level="<input type='hidden' name='DocNumber_Level_"+New_num+"' id='DocNumber_Level_"+New_num+"' >";
			runYN="	<input type='hidden' name='RunYn_"+New_num+"' id='RunYn_"+New_num+"'>";
			Td.innerHTML="<select id='mst_code_"+New_num+"' name='mst_code_"+New_num+"' onchange='SelCode_chk(this);GrpDbCodeChk(this);' onFocus='SelprvValSet(this)' class='Single form-control'>"+js_addStr+"</select>"+doc_level+runYN;

			Td = Tr.insertCell();
			Td.align="center";
			date_str="<input type='checkbox' id='date_Yn_"+New_num+"' name='date_Yn_"+New_num+"'  class='Single date_chk'><input type='hidden' id='dateStr_"+New_num+"' name='dateStr_"+New_num+"'> ";
			date_str=date_str+"<input type='hidden'	id='autoYn_"+New_num+"'  name='autoYn_"+New_num+"'><input type='hidden'	id='autoTime_"+New_num+"'  name='autoTime_"+New_num+"'>";
			date_str=date_str+"<input type='hidden'	id='autoGrp_"+New_num+"'  name='autoGrp_"+New_num+"'>";

			Td.innerHTML=date_str;

			Td = Tr.insertCell();
			Td.align="center";
			Td.innerHTML="<button type='button' class='off' id='Single_item_btn' title='Single_"+New_num+"' onclick='Sdata_Set(this);'>지정 </button>";

			document.all.Single_Cnt.value =New_num;
			//	Number(document.all.Single_Cnt.value) + 1

			$("[id*='Single_"+New_num+"']").focus();
			//eval("document.all.Single_"+New_num+".focus()");
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//단일지정 및 멀티지정의 버튼클릭 이벤트 ( 동적으로 버튼이생성되는 경우 jquery에서 click이벤트가 발생하지 않음)
	function Sdata_Set(btn){


			if($(btn).attr("class")=="on"){// 지정된 것을 해제하는 경우
				$(btn).removeClass('on').addClass('off');
				chk=UsrFieldAssign(btn)

				if (!chk)
				{
					$(btn).removeClass('off').addClass('on');
				}

			}else{ //해제한 것을 지정하는 경우
				$(btn).removeClass('off').addClass('on');
				chk=UsrFieldAssign(btn)
				if (!chk)
				{
					$(btn).removeClass('on').addClass('off');
				}
			}
	}

	 //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//사용자 단일필드 지정 처리
	function UsrFieldAssign(btn_obj){

			//기본데이터 확인----------------------------------------------------------------
			//클릭한 버튼 행에 텍스트박스에 들어간 값
			var textbox_val= $("#"+$(btn_obj).attr("title").trim()).val().trim();

			//클릭한 버튼이름을 배열로 선언
			var arr_btn_nm=	$(btn_obj).attr("title").split("_");

			//선택한 행의 인덱스 (1부터 시작함)
			var RowIndex=arr_btn_nm[1];
			var btn_obj=$(btn_obj)

			// 필수여부
			Req_yn=$("#required_Yn_"+RowIndex).is(":checked");

			// 문서번호사용여부
			DocNumYn=$("#DocNumber_Yn_"+RowIndex).is(":checked");

			// 문서번호에 사용할 코드
			DocNumCd=$("#mst_code_"+RowIndex).val();

			if (!DocNumYn)// 문서번호사용이 아니면 무조건 레밸은 0이다.
			{
					DocNumLevel=0
			}else{
					// 문서번호에 사용되는 코드의 레벨(단계)
					if (DocNumCd!=0)
					{
						for (ii=0;ii<=DocNumCodeArr.length ;ii++ )
						{
							if (DocNumCodeArr[ii].CdNm==DocNumCd )
							{
									DocNumLevel=DocNumCodeArr[ii].Cdlevel
										break;
							}
						}
					}else{
						DocNumLevel=0
					}
			}

			if (RowIndex<5)
			{
					F_gubn="S"
			}else{
					F_gubn="U"
			}

			// 필드속성에 이름을 지정한다.(속성을 조합하여 셀속성명을 만든다.)
			Cell_sysname=F_gubn+RowIndex+"_"+ch_value(Req_yn)+"_"+ch_value(DocNumYn)+"-"+DocNumCd+"-"+DocNumLevel ;

			//U5_1_0-POS-0
			//구분(S,U,M)+순번 +"_"+필수여부+"_"+문서번호여부+"-"+코드+"-"+코드레벨
			//기본데이터 확인----------------------------------------------------------------

			if(btn_obj.attr("class")=="on"){  // 지정하는 경우 Sdata_Set에서 class 이미 변경했음

					 if (clickObj==null)
					  {
							alert("먼저 입력셀을 지정할 위치에 마우스로 클릭하시고, 지정버튼을 클릭하여 주시기 바랍니다.");
							return false;
					  }

					// 항목명 입력 여부 판단
					if(textbox_val == ""){
							alert("입력셀 명칭이 입력되지 않았습니다.\n\n명칭을 입력하시고 지정해 주시기 바랍니다.");
							$("#"+$(btn_obj).attr("title")).focus();
							$(btn_obj).removeClass('on').addClass('off');
							return false;
					}

					// 선택한 셀에 이미 필드가 지정되어있는지 검사한다.
					if (clickObj.id !="")	{  //지정된 속성이 있으면
							console.log(clickObj)
							clickObj_TEXT=ItemTextReturn(clickObj);
							msg="현재 선택하신 위치에는 \'"+clickObj_TEXT+"\'라는 셀이 이미 설정되어있습니다.\n\n 기존 설정을 해제하시고, 여기에 지정하시겠습니까?";
							FiledSet_yn= confirm(msg);

							if (FiledSet_yn)//설정하면 진행하면서
							{

								//컨트롤위치에 ID , class바이딩
								//기존 버튼해지
								unBtn_Arr=clickObj.id.replace("S","").split("_");
								unBtn_index=unBtn_Arr[0];

								if (clickObj_item_kind=="App")
								{
										$("button[title*='"+clickObj.id+"']").removeClass('on').addClass('off');
								}else if (clickObj_item_kind=="Single"){
										btnSort=clickObj.id.substring(1,2);
										$("button[id=Single_item_btn]:eq("+(btnSort-1)+")").removeClass('on').addClass('off');
								}else{ //멀티일때는 해재할 버튼이 없음

								}

								clickObj_item_kind="";
								// 현재 클릭한 지정버튼 on
								$(btn_obj).removeClass('off').addClass('on');

							}else{

								$("#"+$(btn_obj).attr("title")).focus();
								$(btn_obj).removeClass('on').addClass('off');
								return false;
							}
					}

					//단일 필드 순서가 1,2,3이 아닌경우 기본사용필드명과 중복 체크
					if (arr_btn_nm[1]!=1 && arr_btn_nm[1]!=2 && arr_btn_nm[1]!=3 && arr_btn_nm[1]!=4){
							// 시스템 기본제공 필드 제외처리
							var default_item= new Array("프로젝트명","제목","작성일","문서번호")
							for (i=0;i<=default_item.length ;i++ )
							{
								if (default_item[i]==textbox_val)
								{
									alert(default_item[i]+"'은 기본필드이므로 중복 입력하실 수 없습니다.");
									$("#"+$(btn_obj).attr("title")).focus();
									$(btn_obj).removeClass('on').addClass('off');
									return false;
								}
							}
					}

					//기 입력된 항목명과 중복되는지 체크
					for (i = 1; i < form_info.elements.length; i++){
						if(form_info.elements[i].name.substring(0,7) == "Single_" && $(btn_obj).attr("title")!=form_info.elements[i].name ){// 싱글에서만 체크
							if(form_info.elements[i].value == textbox_val){
								alert("이미 입력필드항목으로 사용중인 명칭입니다.\n\n다른 명칭을 입력해주십시요.");
								$("#"+$(btn_obj).attr("title")).focus();
								$(btn_obj).removeClass('on').addClass('off');
								return false;
							}
						}
					}

					if (DocNumYn){//문서번호사용 체크시 코드연계항목이 선택되었는지확인.
						if (DocNumCd==0)
						{
							alert("문서번호 항목으로 사용할 코드연계항목이 선택되지 않았습니다. \n코드연계항목 선택후 지정이 가능합니다.");
							$(btn_obj).removeClass('on').addClass('off');
							return false;

						}else{
							//문서번호 사용시 코드레벨정보를 저장
							$("#DocNumber_Level_"+RowIndex).val(DocNumLevel);
						}
					}
				   //확인----------------------------------------------------------------

					//단일 지정하는 위치에 결재정보가 다중셀인경우 연계 셀도 같이 해제한다.
					if (clickObj.id!="")
					{
							All_TDs=tinyMCE.activeEditor.dom.select('TD[id*='+clickObj.id+']');
							if (All_TDs.length>0) //해제하는 버튼의 아이디의 항목이 존제하는 경우
							{
									SetEditorVal(All_TDs, "id", "");
									SetEditorVal(All_TDs, "class", "");
									SetEditorVal(All_TDs, "html", "");
							}
					}

					//양식내 지정한 셀의 속성명 지정
					SetEditorVal(clickObj, "id", Cell_sysname);//덥어쓰기
					SetEditorVal(clickObj, "class", Cell_sysname +" s");//덥어쓰기
					SetEditorVal(clickObj, "html", textbox_val);

					//필드명이 앞자리가 그룹데이터항목인지 확인
					//if (textbox_val.substring(0,3)!="chk" && textbox_val.substring(0,3)!="rad" ){
						//임시주석 확인필요
						//tinyMCE.activeEditor.dom.setHTML("#"+textbox_val, textbox_val);
						//pHwpCtrl.PutFieldText(textbox_val, textbox_val); //이해가 안됨 @@
					//}

					////////////////////////////////////////////////////////////////////
					//항목명은 지정후 읽기전용으로 변경
					//$("#"+$(btn_obj).attr("title")).attr("readonly", true);

					text_box_id=$(btn_obj).attr("title");
					$("#"+text_box_id).attr("readonly", true); //텍스트박스
					$("#"+text_box_id.replace("Single","mst_code")).attr("disabled",true);  //코드연계

					//사용지정여부 저장
					$("#RunYn_"+RowIndex).val("1");
					return true;

			}else{//해지하는 경우

					if (arr_btn_nm[1]>4) //시스템 항목이 아니면 읽기전용해지
					{
						text_box_id=$(btn_obj).attr("title");
						$("#"+text_box_id).attr("readonly", false); //텍스트박스
						$("#"+text_box_id.replace("Single","mst_code")).removeAttr( "disabled" );  //코드연계
					}

					btn_ChoiceObj=tinyMCE.activeEditor.dom.select('TD[id*='+Cell_sysname+']');
					if (btn_ChoiceObj.length>0) //해제하는 버튼의 아이디의 항목이 존제하는 경우
					{
								SetEditorVal(btn_ChoiceObj, "id", "");
								SetEditorVal(btn_ChoiceObj, "class", "");
								SetEditorVal(btn_ChoiceObj, "html", "");

								//결재싸인표기타입 초기화
								$("#"+Cell_sysname).val("")
								$("button[title='"+Cell_sysname+"']").removeClass('on').addClass('off');

								SetEditorVal("#"+Cell_sysname, "html", "");
					}

					//문서번호 사용시 코드레벨정보를 해지
					$("#DocNumber_Level_"+RowIndex).val("");

					//사용지정여부 해지저장
					$("#RunYn_"+RowIndex).val("0");
					return true;
			}
		    clickObj =null; //클릭한 위치정보 해제
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 문서번호 클릭시 코드선택박스 변경작업
	function DocNumber_chk(chk_obj){

			//선택한 체크박스의 순서번호를 조회하여 같은 인덱스의 코드선택박스를 찾는다.
			var arr_name=chk_obj.id.split("_");
			var chk_index=arr_name[2];
			var SelCodeBox=$("#mst_code_"+chk_index );

		//지정여부 (버튼의 클래스로 확인)
		return_val=	CellDataFixedYn(chk_obj,'chkbox');
		if (!return_val)
		{
				return false; //지정된 경우를 리턴
		}


			if (chk_obj.checked)//true일때
			{
					console.log(1)
					//console.log($("[name^=DocNumber_Yn]:checked").length,  Code_listStr, Code_listStr.split(",").length)
					//----------------------------------------------------------------
					if ($("[name^=DocNumber_Yn]:checked").length == (Code_listStr.split(",").length)){ //사용자가 체크한 갯수와 코드항목갯수
						alert("문서번호 규칙에서 지정된 코드항목이 다 지정되어있어, 문서번호 항목을 사용하실 수 없습니다.")
						$(chk_obj).prop("checked", "");
						return false;
					}

					$("#required_Yn_"+chk_index ).attr("checked", "checked");

					// 선택한 코드박스를 회전하면서,,
					$("#mst_code_"+chk_index+" option").each(function(i){

							//해당 코드값이 문서번호 코드문자열중에 있는지 확인한다.
							if(Code_listStr.indexOf($(this).val()) <0){
								$(this).attr("disabled","disabled");  // 없으면 선택하지 못하게 비호활성화 한다.
								$(this).css("background-color","#DDDDDD");
							}
					});
					//아무것도 선택되지 않은 상태로 변경
					$("#mst_code_"+chk_index ).val(0)

			}else{// 문서번호 미 선택(해제시)
					console.log(2)
					// 선택한 코드박스를 회전하면서..
					$("#required_Yn_"+chk_index).attr("checked", "");

					$("#mst_code_"+chk_index+" option").each(function(i){
						//해당 코드값이 문서번호 코드문자열중에 있는지 확인한다.
							//$(this).attr("disabled","");  // 없으면 선택하지 못하게 비호활성화 한다.
							$(this).prop("disabled", false);
							$(this).css("background-color","");

					});
			}

	}

	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 필수항목체크시 체크하여할 사항확인(문서번호 사용항목인지..)
	function Req_chk(req_obj){

		//선택한 체크박스의 순서번호를 조회하여 같은 인덱스의 코드선택박스를 찾는다.
		var arr_name=req_obj.id.split("_");

		//지정여부 (버튼의 클래스로 확인)
		CellDataFixedYn(req_obj,'chkbox');

		if (req_obj.checked)//true일때
		{
		} else{// false 일때
			if ($("#DocNumber_Yn_"+arr_name[2]).is(":checked"))
			{
				alert("문서번호 사용 항목일 경우는 필수항목으로 해제할 수 없습니다.");
				$(req_obj).attr("checked", "checked");
			}
		}

	}

	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 코드선택박스 변경시 기 선택된 코드값과 중복된 항목을 체크한다.
	function SelCode_chk(Sel_obj){
		//지정여부 (버튼의 클래스로 확인)
		CellDataFixedYn(Sel_obj,'Selectbox');
		Sel_obj=$(Sel_obj);

		$("select[name^='mst_code_']").each(function(){
			// 선택한 값과 이전에 선택된 값을 비교한다( 현재 자신이 아닌것에서...)
			if ($(this).val()==Sel_obj.val() && Sel_obj.attr("id")!=$(this).attr("id"))
			{
					if (Sel_obj.val()!=0) //사용안함은 빼고 ~
					{
						alert("코드연계항목은 입력셀 혹은 선택셀에서 중복된 코드는 선택하실 수 없습니다.\n다시 선택하시기 바랍니다.");
						// 이전포커스된 값으로 선택한다.
						Sel_obj.val(Sel_prv_value);
						return false;
					}
			}
		});
	}


	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//지정한 항목에 대한 지정여부를 리턴한다.
	function CellDataFixedYn(chkbox_obj, item_kind){

		///console.log(chkbox_obj)

		var arr_name=chkbox_obj.id.split("_");
		//지정여부 (버튼의 클래스로 확인)
		var Set_state=$("button[title='Single_"+arr_name[2]+"']").attr("class");
		if (Set_state=='on')
		{
			alert("이미 지정된 상태입니다.\n 항목설정을 변경하시려면 지정 해제후 지정하시기 바랍니다.");
			if (item_kind=='chkbox')
			{
				if (chkbox_obj.checked){//true일때
						chkbox_obj.checked=false;
				}else{
						chkbox_obj.checked=true;
				}
			}else{
				chkbox_obj=$(chkbox_obj);
				chkbox_obj.val(Sel_prv_value);
			}
			return false;
		}else{
			return true;
		}
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 코드연계 항목에 포커스된 시점의 값을 전역변수에 저장(SelCode_chk 함수에서 사용함)
	var Sel_prv_value="";
	function SelprvValSet(Sel_obj){
		Sel_prv_value=	Sel_obj.value;
	}


	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 이전으로 이동
	function PrevClick(){
		history.go(-1);
		//form_info.ACTION = "Form_info_step1.asp"
		//form_info.submit();
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//컬럼키인 값에 첫글자가 숫자인지.체크
	function colnum_chk(obj){
		if (obj.value.length==1)
		{
				if (isNumber(obj.value))
				{
					obj.value="";
					alert("항목명에 첫 글자는 숫자로 입력하실 수 없습니다.")
					false;
				}
		}
	}

	function isNumber(s) {
		  s += ''; // 문자열로 변환
		  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
		  if (s == '' || isNaN(s)) return false;
		  return true;
	}
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒선택셀 부분관리 스크립트▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	function GrpStepCancel(){
			mode			   = $("#mode").val()
			if (mode=="add")
			{
				 work="추가"
			}else{
				 work="수정"
			}
			msg="선택셀 정보 "+work+"중입니다\n취소하시면 수정한 선택셀 정보는 저장되지 않습니다.\n취소하시겠습니까?"

			CancelYn = confirm(msg);
			if (CancelYn){
				$("#grpDataMng").html("");
			}
	}

	function GrpStep1Next(){

			nextYn = confirm("입력하신 선택셀정보가 저장됩니다.\n진행할까요?");
			if (!nextYn){
					return;
			}

			if ($("#UGM_NM").val()=="")
			{
					alert("선택셀 명칭이 입력되지 않았습니다.");
					$("#UGM_NM").focus();
					return;
			}

			mode			   = $("#mode").val()
			UGM_NM       = $("#UGM_NM").val()
			Sel_kind		   = $(".Sel_kind:checked").val()

			Req_YN		   = ch_value($("#Req_YN").is(":checked"))
			Doc_YN		   = ch_value($("#Doc_YN").is(":checked"))
			Multi_Tag_YN = ch_value($("#Multi_Tag_YN").is(":checked"))

			GrpMst_code  = $("#GrpMst_code").val()

			Multi_Tempkey =$("#Multi_Tempkey").val()
			UGM_SEQNO   = $("#UGM_SEQNO").val()

		//	alert($("#docgen_temp_key").val())
		//	$("#docNum_temp_key").val($("#docgen_temp_key").val());
		 //   alert("문서번호 체크.="+ $("#Doc_YN").is(":checked"))

			if($("#Doc_YN").is(":checked")){//문서번호 체크시 체크항목


					if($("#GrpMst_code").val()==0){
						alert("문서번호 사용으로 체크된 항목은 코드연계항목을 선택하셔야 합니다.");
						return;

					}else{ // 선택된 문서코드항목의 레벨을 찾는다.

							for (ii=0;ii<=DocNumCodeArr.length ;ii++ )
							{
									if (DocNumCodeArr[ii].CdNm==GrpMst_code )
									{
											DocNumLevel=DocNumCodeArr[ii].Cdlevel
											break;
									}
							}
					}
			}else{ //문서번호 항목이 아닌 코드는 레벨이 0이다.
				DocNumLevel=0
			}

			//코드연계값 항목이 변경된 상태 체크
			if (Sel_prv_value!="" && Sel_prv_value!=GrpMst_code  && Sel_prv_value!="0")
			{
					chahgeYn = confirm("코드연계값이 변경되었습니다.\n다음단계로 변경시 기존 세부연계항목은 삭제되고, \n변경하신 세부선택셀 항목으로 변경됩니다.\n다음단계로 진행하시겠습니까?");
					if (!chahgeYn){
							return;
					}
			}

			//변경된 내용에 대한 속성명을 양식에 수정반영한다.
			if (mode=="edit")
			{
					prv_Sys_Cellname = $("#Sys_Cellname").val();
					UGM_Sel_kind = $("#UGM_Sel_kind").val();

					Arr_cellname = prv_Sys_Cellname.split("_");
					edit_Sys_Cellname = Arr_cellname[0]+"_"+Req_YN+"_"+Doc_YN+"-"+GrpMst_code+"-"+DocNumLevel;


					if (prv_Sys_Cellname!=edit_Sys_Cellname)//마스터 선택셀정보가 변경되었다면
					{
						//pHwpCtrl.MoveToField(prv_Sys_Cellname, true, true, false);
						//pHwpCtrl.SetCurFieldName(edit_Sys_Cellname);
						//console.log(prv_Sys_Cellname+"=="+edit_Sys_Cellname);

						prv_searchObj=tinyMCE.activeEditor.dom.select('[id*="'+prv_Sys_Cellname+'"]');
						SetEditorVal(prv_searchObj, "id", edit_Sys_Cellname);

					}else{
							// 선택셀 세부항목리스트에서 양식내 항목 갱신여부를 해당변수로 판단.
							prv_Sys_Cellname="" //수정되지 않은 선택셀 마스터정보는 prv_Sys_Cellname값을 초기화
					}

					if(UGM_Sel_kind!=Sel_kind){
						prv_Sys_Cellname=$("#Sys_Cellname").val();
					}

			}else{
					prv_Sys_Cellname=""
			}

			argStr = "UGM_NM="+UGM_NM+"&Sel_kind="+Sel_kind+"&Req_YN="+Req_YN+"&Doc_YN="+Doc_YN+"&Multi_Tempkey="+Multi_Tempkey
			argStr = argStr +"&GrpMst_code="+GrpMst_code+"&DocNumLevel="+DocNumLevel+"&mode="+mode+"&form_num="+form_num
			argStr = argStr +"&UGM_SEQNO="+UGM_SEQNO+"&Sel_prv_value="+Sel_prv_value+"&prv_Sys_Cellname="+prv_Sys_Cellname+"&Multi_Tag_YN="+Multi_Tag_YN;

			//console.log('grpMstDtllist  mode : '+mode);

			$.ajax({
				//"url" :"/Module/SysModule/FormMng/GrpMst_DtlList.page"
				"url" :"/module/sysmodule/formmng/grpMstDtllist"
				,"type" : "POST"
				,"data" : argStr
				,"success" : function(data){
					$("#grpDataMng").html(data);
				},"error" : function(e){
					console.log(e);
					showSwal("Error발생","error");
				}
			});


	}
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 선택방식 클릭시 문서사용여부 확인
	function Sel_kind_chk(obj){
		this_val=$(obj).val()
		if (this_val=='C')
		{
			if ($("#Doc_YN").is(":checked"))
			{
					alert("문서번호 사용항목은 다중선택항목을 사용하실 수 없습니다.");
					$("#Sel_kind[value=R]").attr("checked","checked");
					return;
			}
		}

	}
	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 선택셀에서 문서번호사용여부  클릭시 코드선택박스 변경작업
	function Doc_Ynchk(chk_obj){

		 //사용자가 체크한 갯수와 코드항목갯수
		if ($("[name^=DocNumber_Yn]:checked").length == (Code_listStr.split(",").length-1)){
				alert("입력셀에서 모든 코드항목이 선택되어, 선택셀에서는 문서번호 항목을 사용하실 수 없습니다.")
				$(chk_obj).prop("checked", "");
				return false;
		}



		var SelCodeBox=$("#GrpMst_code");

		if (chk_obj.checked)//true일때
		{
				if ($(":input:radio[name=Sel_kind]:checked").val()=='C')
				{
					alert("문서번호 사용항목은 다중선택항목을 사용하실 수 없습니다.");
					$("#Doc_YN").prop("checked", false);
					return;
				}

				//필수여부 체크
				$("#Req_YN").attr("checked", "checked");

				// 선택한 코드박스를 회전하면서,,
				$("#GrpMst_code option").each(function(){
						//해당 코드값이 문서번호 코드문자열중에 있는지 확인한다.
						if(Code_listStr.indexOf($(this).val()) <0){
							$(this).attr("disabled","disabled");  // 없으면 선택하지 못하게 비활성화 한다.
							$(this).css("background-color","#DDDDDD");
						}
				});
				//아무것도 선택되지 않은 상태로 변경
				$("#GrpMst_code").val(0)

		}else{// 문서번호 미 선택(해제시)
				$("#Req_YN").attr("checked", "");
				$("#GrpMst_code option").each(function(){
						//해당 코드값이 문서번호 코드문자열중에 있는지 확인한다.
						$(this).attr("disabled","");  // 없으면 선택하지 못하게 비활성화 한다.
						$(this).css("background-color","");
				});
		}

	}

	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 필수항목체크시 체크하여할 사항확인(문서번호 사용항목인지..)
	function Req_Ynchk(req_obj){
			if (req_obj.checked)//true일때
			{
			} else{// false 일때
					if ($("#Doc_YN").is(":checked"))
					{
						alert("문서번호 사용 항목일 경우는 필수항목으로 해제하실 수 없습니다.");
						$(req_obj).attr("checked", "checked");
					}
			}
	}
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 선택셀 항목의 코드로 사용중인지 확인
	function GrpDbCodeChk(Sel_obj){
			Sel_obj=$(Sel_obj)
			//종합속성명칭에 코드정보가 있는 지..확인
			if ($("#Sys_Cellname_list").val().indexOf(Sel_obj.val()) >0)
			{
				if (Sel_obj.val()!=0) //사용안함은 빼고 ~
					{
						Sel_obj.val(Sel_prv_value);
						alert("이미 선택셀 항목에 코드로 설정되어 있습니다.\n확인하여 주시기 바랍니다.");
						return false;
					}
			}
	}
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// 선택셀 항목의 코드로 사용중인지 확인
	var DtlCell_DelCount=0;

	function GrpDtlDel(sort_num, img_obj, dtl_seq, Gdm_seq, mode, kind, UGMCellNm, Form_in_Sort){

		click_rowindex=$(img_obj).parent().parent().index() // 클릭한 테이블 Row index
		Org_index=click_rowindex // 속성명변경을 위한 index
		click_rowindex=(click_rowindex-1)+click_rowindex //선택값과 타이틀을 삭제해야하므로 index 변경

		Ugd_length=($("#MultiDtlTable tr").size()-1) //세부항목 갯수

		if (Ugd_length==2 && kind =='R') //단일 선택셀 일경우(체크박스타입은 하나만 사용하수 도 있음).
		{
				alert("선택셀 세부항목[단일선택]은 최소2개 항목으로 구성되어야 함으로, \n삭제하실 수 없습니다.\n전체를 삭제하실 경우는 선택셀 메인을 삭제하셔야 합니다. ");
				return;
		}
		if (Ugd_length==1 && kind =='C')
		{
				alert("선택셀 세부항목[다중선택]은 최소1개 항목으로 구성되어야 함으로, \n삭제하실 수 없습니다.\n전체를 삭제하실 경우는 선택셀 메인을 삭제하셔야 합니다. ");
				return;
		}

		DelYn = confirm("삭제는 DB와 양식에 직접반영되므로 신중히 진행하시기 바랍니다.\n선택셀  세부항목을 삭제 하시겠습니까?");
		if (DelYn){
				img_obj=$(img_obj)
				//alert(mode)
				//-----------------------------------------------------------------------------
				if (mode=="edit") //수정모드이면 양식내 항목도 삭제 한다,
				{
					$.ajax({
								//"url" :"/Module/SysModule/FormMng/Multi_GrpDtlDel.do"
								"url" :"/module/sysmodule/formmng/multiGrpDtlDel"
								,"type" : "POST"
								,"data" : "dtl_seq="+dtl_seq+"&Gdm_seq="+Gdm_seq+"&sort_num="+sort_num
								,"success" : function(data){
										if (data)//삭제결과가 true일경우
										{
											//기존선택셀 삭제
											Ugm_searchObj=tinyMCE.activeEditor.dom.select('[id*="'+UGMCellNm+'"]');
											SetEditorVal(Ugm_searchObj, "html", "");

											// 테이블Row삭제
											img_obj.closest( "tr" ).remove();

											//세부선택셀 항목 삭제여부 확인용 변수
											DtlCell_DelCount=DtlCell_DelCount+1;

											//선택셀 새로만들기
											tsStr="<table class='mng-table' contenteditable='false'><tbody><tr>";
											tdStr="";
											teStr="</tr></tbody></table>";

											 for (i=1;i<=Ugd_length-1 ;i++ )
											 {
													if (kind=="R")
													{
														SelTxT="○"
													}else{
														SelTxT="□"
													}

													p_CellNm=UGMCellNm+UGMDTL_SPLIT+kind+"_"+Form_in_Sort+"_"+(i) //삭제샐의 뒤 셀이름
													c_CellNm=UGMCellNm+UGMDTL_SPLIT+"T_"+Form_in_Sort+"_"+(i) // 변경할 셀이름 생성

													viewText=$("[id='GrpDtl_nm']:eq("+(i-1)+")").val();

													if(i%2==1){
														add_class="md";
													}else{
														add_class="";
													}
													tdStr=tdStr+"<td id='"+p_CellNm+"' class='"+p_CellNm+"'>"+SelTxT+"</td>";
													tdStr=tdStr+"<td id='"+c_CellNm+"' class='"+p_CellNm+" "+add_class+"'>"+viewText+"</td>";
											 }

											 SetEditorVal(Ugm_searchObj, "html", tsStr +tdStr +teStr);

										}else{//삭제결과가 false
											alert("세부항목 삭제 오류입니다.\n관리자에게 확인하시기 바랍니다.")
											return;
										}


								},"error" : function(e){
									console.log(e);
									showSwal("Error발생","error");
								}
							});


				}else{ //add모드(Dtl세부항목 신규등록추가 시 삭제처리
					img_obj.parent().parent().remove()// 테이블Row삭제
				}
				//-----------------------------------------------------------------------------
			}//삭제여부질의
	}

//선택셀 테이터필드 추가
	function multiDtlDataAdd(){
			var Tr,Td;
			// 코드연계항목 확인
			GrpMst_code	= $("#GrpMst_code").val()
			if (GrpMst_code!="0")
			{
				alert("코드항목은 선택셀 세부항목을 추가하실 수 없습니다.");
				return;
			}

			Sel_kind		   = $("#Sel_kind").val()
			New_num	   = MultiDtlTable.rows.length;

			Tr = MultiDtlTable.insertRow();
			Tr.style.backgroundColor="#FFFFFF"
			Tr.style.height="25"
			Tr.style.align="center"

			Td = Tr.insertCell();
			Td.align="center"
			Td.innerHTML="<input type='text' name='GrpDtl_cd'  id='GrpDtl_cd' class='Dtl_cd form-control'>";

			Td = Tr.insertCell();
			Td.align="center"
			Td.innerHTML="<input type='text' name='GrpDtl_nm'  id='GrpDtl_nm' class='Dtl_nm form-control'>";

			Td = Tr.insertCell();
			Td.align="center"
			clsbtnStr="<input type='text' name='GrpDtl_Class' id='GrpDtl_Class' size=10 class='Dtl_class form-control'  size='10' readonly style='float:left;width:87%'>";
			clsbtnStr=clsbtnStr+	"<input type='hidden' name='GrpDtl_Class_Seq' 	id='GrpDtl_Class_Seq' class='Dtl_class_Seq'>";
			clsbtnStr=clsbtnStr+	"<button type='button' class='btn  btn-xs btn-select-class stree' data-callback='MultiClassCallback' data-tree='single'  >";
			clsbtnStr=clsbtnStr+	"<i class='icon-tree7 position-left' style='margin:1px'></i></button>";
			Td.innerHTML= clsbtnStr;

			Td = Tr.insertCell();
			Td.align="center"
			btnStr="<button type='button' onclick=\"GrpDtlDel('"+New_num+"', this, 0,0,'add','"+Sel_kind+"',0)\" class='btnfieldadd btn btn-success btn-xs'>삭제</button>";
			Td.innerHTML=btnStr

			if (New_num==1)
			{
				document.all.GrpDtl_cd.focus();
			}else{
				document.all.GrpDtl_cd[New_num-1].focus();
			}
	}

	 //▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//선택셀 세부항목 리스트
	function DtlList_cancel(){
			GrpMst_code = $("#GrpMst_code").val()
			mode = $("#mode").val()
			Sel_prv_value=	$("#Sel_prv_value").val()

			if (mode=='add')
			{
				if (GrpMst_code=="0")// 코드연계 항목이 선택되지 않은 상태
				{
					msg="세부항목 등록 작업중입니다.\n취소시에는 선택셀 항목메인정보만 저장되고,\n세부항목정보는 저장되지 않습니다.\n이후에 수정하여 세부항목정보를 등록가능합니다. 취소하시겠습니까?";
				}else{ // 코드연계항목이 선택된 상태
					msg="세부항목 등록 작업중입니다.\n선택셀 메인정보 및 코드로 선택한 세부선택셀 항목은 저장되었으나,\n양식에 지정되지 않아 문서작성시 작업내용이 반영되지 않습니다.\n이후에 수정하여 양식내 지정이 가능합니다.\n취소하시겠습니까?";
				}

			}else if(mode=='edit'){
				if (GrpMst_code=="0")// 코드연계 항목이 선택되지 않은 상태
				{
					msg="세부항목 수정 작업중입니다.\n수정한 선택셀 세부항목정보는 저장되지 않습니다.\n취소하시겠습니까?";
				}else{ // 코드연계항목이 선택된 상태
					if (Sel_prv_value!="")// 코드연계항목이 변경되어 양식과 동기화 되어야 함으로 취소를 못하게 막음.
					{
						alert("세부항목의 코드연계가 변경되어 취소하실 수 없습니다.\n취소시 양식내 선택셀 구성항목과 다르게 구성되므로,\n다음단계에서 변경된 내용을 양식에 해당항목에 지정하여 저장하시기 바랍니다.");
						return;
					}else{
						msg="세부항목 수정 작업중입니다.\n삭제된 세부선택셀만 [DB,양식]적용되었습니다.\n취소하시겠습니까?";
					}
				}
			}

			cancelYn = confirm(msg);
			if (cancelYn){
				$("#grpDataMng").html("");
			}else{
				return ;
			}
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//선택셀 세부항목리스트로 이동
	function DtlList_move(){

			UGM_NM       = $("#UGM_NM").val();
			Sel_kind		   = $("#Sel_kind").val();
			Req_YN		   = ch_value($("#Req_YN").is(":checked"));
			Doc_YN		   = ch_value($("#Doc_YN").is(":checked"));
			Multi_Tag_YN = ch_value($("#Multi_Tag_YN").is(":checked"))
			GrpMst_code   = $("#GrpMst_code").val();
			Multi_Tempkey =$("#Multi_Tempkey").val();
			UGM_SEQNO   = $("#UGM_SEQNO").val();
			Sel_prv_value   = $("#Sel_prv_value").val();
			mode			   = $("#mode").val();
			Sys_Cellname  = $("#Sys_Cellname").val();

			argStr = "UGM_NM="+UGM_NM+"&Sel_kind="+Sel_kind+"&Req_YN="+Req_YN+"&Doc_YN="+Doc_YN+"&Multi_Tempkey="+Multi_Tempkey
			argStr = argStr +"&GrpMst_code="+GrpMst_code+"&DocNumLevel="+DocNumLevel+"&mode="+mode+"&form_num="+form_num
			argStr = argStr +"&UGM_SEQNO="+UGM_SEQNO+"&Sel_prv_value="+Sel_prv_value+"&Sys_Cellname="+Sys_Cellname+"&backMode=true&Multi_Tag_YN="+Multi_Tag_YN;

			alert('DtlList_move ..');
			$.ajax({
				//"url" :"/Module/SysModule/FormMng/GrpMst_DtlList.page"
				"url" :"/module/sysmodule/formmng/grpMstDtllist"
				,"type" : "POST"
				,"data" : argStr
				,"success" : function(data){
					$("#grpDataMng").html(data);
				},"error" : function(e){
					console.log(e);
					showSwal("Error발생","error");
				}
			});

	}

	//양식내 속성 및 값지정
	function SetEditorVal(obj, type, val){
			if (type=="id")
			{
				tinyMCE.activeEditor.dom.setAttrib(obj, 'id', val);
			}else if(type=="class"){
				tinyMCE.activeEditor.dom.setAttrib(obj, 'class', val);
			}else{//setHTML
				tinyMCE.activeEditor.dom.setHTML(obj, val);
			}
	}

//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//양식내 세부선택셀 항목 데이블 생성

	// 테이블을 생성 한다.


	function chkCell(obj){

		if (obj!=null)
		{
			if (obj.tagName=="TD")
			{
				return true;
			}else{
				return false;
			}
		}else{
			alert("TD에 커서가 위치하지 않습니다.");
			return false;
		}

		/*
		if (obj==null){
				if (pHwpCtrl.ParentCtrl != null && pHwpCtrl.ParentCtrl.Ctrlid == "tbl")
				{
					return true;
				}
				else
				{
					return false;
				}
		}else{
				if (obj.ParentCtrl != null && obj.ParentCtrl.Ctrlid == "tbl")
				{
					return true;
				}
				else
				{
					return false;
				}
		}*/
	}


//	▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// 양식내 지정부분 작업중

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//선택셀항목 양식내 지정
	function Form_inSet(){

			if (clickObj==null)
			{
					alert("먼저 입력셀을 지정할 위치에 마우스로 클릭하시고, 지정버튼을 클릭하여 주시기 바랍니다.");
					return false;
			}

			if (clickObj.id !="")	{  //클릭한 셀에 속성명이 있으면 ..
						clickObj_TEXT=ItemTextReturn(clickObj);
							msg="현재 선택하신 위치에는 \'"+clickObj_TEXT+"\'라는 셀이 이미 설정되어있습니다.\n\n 기존 설정을 해제하시고, 여기에 지정하시겠습니까?";
							FiledSet_yn= confirm(msg);

							if (FiledSet_yn){//설정하면 진행하면서
									//컨트롤위치에 ID , class바이딩
									//기존 버튼해지
									unBtn_Arr=clickObj.id.replace("S","").split("_");
									unBtn_index=unBtn_Arr[0];

									if (clickObj_item_kind=="App")
									{
											$("button[title*='"+clickObj.id+"']").removeClass('on').addClass('off');//결재버튼해지
									}else if (clickObj_item_kind=="Single"){ //입력셀 버튼해지
											btnSort=clickObj.id.substring(1,2);
											$("button[id=Single_item_btn]:eq("+(btnSort-1)+")").removeClass('on').addClass('off');
									}else{ //멀티일때는 해재할 버튼이 없음

									}

									clickObj_item_kind="";

									//단일 지정하는 위치에 결재정보가 다중셀인경우 연계 셀도 같이 해제한다.
									if (clickObj.id!="")
									{
											All_TDs=tinyMCE.activeEditor.dom.select('TD[id*='+clickObj.id+']');
											if (All_TDs.length>0) //해제하는 버튼의 아이디의 항목이 존제하는 경우
											{
													SetEditorVal(All_TDs, "id", "");
													SetEditorVal(All_TDs, "class", "");
													SetEditorVal(All_TDs, "html", "");
											}
									}
									multiBox=FormInSelectCellCreate(arr_CellNm, arr_viewText);

									SetEditorVal(clickObj, "id", arr_CellNm.pop().split("ZS")[0]);//덥어쓰기
									SetEditorVal(clickObj, "class", "m");//덥어쓰기
									SetEditorVal(clickObj, "html", multiBox);

									$("#formInYn").html("(지정 됨)")
									$("#mode").val("");

							}else{
								$("#formInYn").html("(미 지정)");
								return false;
							}
			}else{ //없으면..

					multiBox=FormInSelectCellCreate(arr_CellNm, arr_viewText);

					SetEditorVal(clickObj, "id", arr_CellNm.pop().split("ZS")[0]);//덥어쓰기
					SetEditorVal(clickObj, "class", "m");//덥어쓰기
					SetEditorVal(clickObj, "html", multiBox);

					$("#formInYn").html("(지정 됨)")
					$("#mode").val("");
			}
	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	//선택셀항목 양식내 지정 취소
	function GrpSet_cancel(){
			cancelYn = confirm("선택셀 항목지정을 취소하시겠습니까?\n취소후 선택셀항목 수정시 지정이 가능합니다.");
			if (cancelYn){
				$("#grpDataMng").html("");
			}else{
				return ;
			}

	}

	//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	function ch_value(value){
		if (value){
			return 1;
		}else{
			return 0;
		}
	}
