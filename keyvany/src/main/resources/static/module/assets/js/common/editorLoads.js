/* ------------------------------------------------------------------------------
*
*  # editor환경설정
*
*  사용시 index.page의 css 참고하기
* ---------------------------------------------------------------------------- */

function editorLoads(id,lng,height,readOnly){

	var toolbar="";
	var font_formats="";
	var fontsize_formats = "8pt 10pt 12pt 14pt 18pt 24pt 36pt";
	var menubar="";

	var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);

	if (iOS)//ios일때만 적용
	{
		css_list="/resources/module/assets/css/content.ios.css,/resources/module/assets/css/editorUser.css"
	}else{
		css_list="/resources/module/assets/css/editorUser.css"
	}
	//alert(css_list);

	if (readOnly == "" || readOnly == null || typeof readOnly == "undefined"){
		readOnly = 0;
	}

	if (screen.width < 834){
		toolbar="undo redo | mybutton table | bold italic | link | alignleft aligncenter alignright alignjustify | outdent indent ";
		menubar="";
	}else{
		toolbar="undo redo | print | fontselect | fontsizeselect | forecolor backcolor | mybutton charmap table | bold italic underline strikethrough | link | alignleft aligncenter alignright alignjustify | outdent indent | preview code ";
		menubar="file edit insert table tools";
	}

	switch (lng){
		case "ko":
			//font_formats="Batang=바탕,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n";
			font_formats='나눔고딕=Nanum Gothic;'+'Andale Mono=andale mono,times;'+ 'Arial=arial,helvetica,sans-serif;'+ 'Arial Black=arial black,avant garde;'+ 'Book Antiqua=book antiqua,palatino;'+ 'Comic Sans MS=comic sans ms,sans-serif;'+ 'Courier New=courier new,courier;'+ 'Georgia=georgia,palatino;'+ 'Helvetica=helvetica;'+ 'Impact=impact,chicago;'+ 'Symbol=symbol;'+ 'Tahoma=tahoma,arial,helvetica,sans-serif;'+ 'Terminal=terminal,monaco;'+ 'Times New Roman=times new roman,times;'+ 'Trebuchet MS=trebuchet ms,geneva;'+ 'Verdana=verdana,geneva;'+ 'Webdings=webdings;'+ 'Wingdings=wingdings,zapf dingbats';
			break;

		case "en":
			//break;

		case "ru":
			//break;

		case "ua":
			//break;

		case "ja":
			//break;

		default :
			font_formats="Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n";
	}

	try{
		//이미 init된 정보 remove
		tinymce.remove();
	}catch(e){}

	tinymce.init({
		language: lng,
		selector: "#"+id,
		theme: "modern",
		height: height,
		readonly:readOnly,
		forced_root_block: false,
		plugins: [
			'advlist  lists charmap print preview hr pagebreak link',
			'visualblocks visualchars  fullscreen nonbreaking',
			'table contextmenu directionality textcolor paste colorpicker textpattern imagetools code '
		],
		content_css: css_list,
		pagebreak_separator: "<div class='pagebreak'></div>",
		pagebreak_split_block: true,
		add_unload_trigger: false,
		menubar: menubar,
		plugin_preview_width : "720",
        plugin_preview_height : $(window).height()-130,

		//extended_valid_elements : "span[!class]",
		statusbar: true,
		resize: true,
		//inline : true,
		paste_data_images: false,
		relative_urls: false,
		toolbar: toolbar,
		font_formats: font_formats,
		fontsize_formats: fontsize_formats,
		forced_root_block : false,
		setup: function(ed) {

			/*ed.on("click",function(e) {//
						//$("#Editor_date").val("click")
						//ed.onClick.add(function(ed,e) {//
						//console.log(e.target);
						//console.log(tinymce.dom.DomQuery(e.target).closest("TD"));
						var strItem = tinymce.dom.DomQuery(e.target).closest("TD");
						var strItemBody = tinymce.dom.DomQuery(e.target).closest("body");

						//$("#Editor_date").val(strItem[0].id)
						//alert(strItem[0].id)

						pos = tinymce.DOM.getPos(ed.getContentAreaContainer());
						//console.log(pos);
						pos.x += e.clientX;
						pos.y += e.clientY;

						//console.log("pos.x=" + pos.x +","+ "pos.y=" + pos.y+",e.clientX=" + e.clientX +","+ "e.clientY=" + e.clientY);
						//console.log("strItem[0].id="+strItem[0]);
						//console.log(strItem[0].className);
						//console.log(strItem[0].title);
						//console.log(e);

						 try
						 {
							 if (selectBoxDiv != null)
							 {
								if (strItem[0] == undefined)
								{
									$("#div_"+selectBoxDiv).hide();
									 selectBoxDiv=null;
								}
								 if (selectBoxDiv != strItem[0].id)
								 {
									$("#div_"+selectBoxDiv).hide();
									 selectBoxDiv=null;
								 }

								//$("#"+selectBoxDiv).hide();
							 }
						 }
						 catch (e)
						 {
						 }

						//	$("#Editor_date").val("click="+  strItem[0].id.left(1))

						try
						{
							$("#Editor_date").val("=="+strItem[0].id.left(1))
							if (strItem[0].id.left(1)=="M")
							{
								try
								{
									//console.log(e);
									//console.log(e.target);
									//멀티체크박스 클릭이벤트 처리
									//$("#Editor_date").val("mul")
									chkMultiItem(e.target);
								}
								catch (err)
								{
									//console.log(err);
								}
							}
							if (strItem[0].id.left(1)=="U" || strItem[0].id.left(1)=="S" || strItem[0].id.left(1)=="T")
							{
									editor_nm= $(ed).attr("id")+"_ifr";

									//에디터의 좌표와 이벤트 발생한 TD의 좌표를 합하여 위치구하기 좌측위치
									e_left=$("#"+editor_nm).offset().left +$(strItem).offset().left+5;
									// 스크롤 발생시 상위위치 조정
									e_top=$("#"+editor_nm).offset().top +$(strItem).offset().top -$("#"+editor_nm).contents().scrollTop()+2;

									chkTextItem(e.target, e_left, e_top);


								try
								{
									//$("#Editor_date").val("sing")
									//텍스트 입력박스 클릭이벤트
									//	pos = tinymce.DOM.getPos(ed.getContentAreaContainer());
									//console.log(pos);
									//pos.x += e.clientX;
									//pos.y += e.clientY;
									//console.log("chkTextItem("+strItem[0].id+","+e.screenX+","+e.screenY+")");
									//chkTextItem(e.target,e.screenX,e.screenY);
									//chkTextItem(e.target,e.clientX,e.clientY);
									//console.log("pos.x=" + pos.x +","+ "pos.y=" + pos.y);
									//chkTextItem(e.target, pos.x, pos.y, e.clientX, e.clientY);
									//console.log($("#"+editor_nm).offset().left, );
									//console.log( editor_nm, $("#"+editor_nm).contents().scrollTop());


									//chkTextItem(e.target, pos.x, pos.y, e.clientX, e.clientY);

								}
								catch (err)
								{
									//console.log(err);
								}
							}


						}
						catch (err)
						{
							//console.log("id가 없음"+err);
						}
			});
			*/


			/*ed.on("blur",function(e) {//
				try
				{
					var srcSeqno=new Array();
					$tmImg = tinymce.dom.DomQuery(tinymce.activeEditor.dom.select('.tinyMCEInsertIMAGE'));
					$("#tinyMCEInsertIMAGE").val("");
					if ($tmImg.length>0)
					{
						for (i=0;i<$tmImg.length ;i++ )
						{
							srcSeqno[i] = $tmImg[i].src.split('?src=')[1];
						}
					}
					$("#tinyMCEInsertIMAGE").val(srcSeqno);
				}
				catch (e)
				{
				}

				try{
					//console.log('chkFormsTags()');
					chkFormsTags();
				}catch (e)
				{
				}
			});
			*/

			ed.addContextToolbar('img', 'alignleft aligncenter alignright alignjustify | image remove');
			ed.addButton('mybutton', {
					type: 'button',
					title: 'Local Image Insert',
					icon: 'image',
					id: 'mybutton',
					onclick: function() {
						$.ajax({
							//url:"/module/userModule/approval/common/inputImageModal.page",
							url:"/module/usermodule/approval/common/inputImageModal",
							contentType:false,
							type:"POST",
							dataType:"html",
							//data:buttonFormData,
							cache:false,
							async:false,
							//processData:false,
							success:function(data){
								//alert(data);
								if (!isImagePostLoad)
								{
									//var htmlStript = '<script type="text/javascript" src="/module/assets/page/approval/js/editorImagePost.js"></script>\n';
									//document.write(htmlStript);
									$.ajax({
										type: "GET",
										url: "/resources/module/assets/js/common/editorImagePost.js",
										dataType: "script"
									});
									isImagePostLoad=true;
								}
								$('#modalEditorImageInsert').html(data);
								//console.log(data);
								return;
							},
							error:function(data){
								alert("err//"+data);
							}
						});

						$(".file-Choice").uniform({fileButtonClass: 'action btn bg-warning-400'});
						$(".file-Choice").next().html(i18next.t("common:F.NoChoiceFile"));
						$(".file-Choice").next().next().html(i18next.t("common:F.ChoiceFile"));
						$('#modalEditorImageInsert').modal('show', {backdrop: 'static'});
						$('#widthSize').val($(".mce-tinymce").width()-50);
						$("#uniform-upto").localize();
					}
				});
		},
		init_instance_callback: function (editor) {

					editor.on( 'ResizeEditor', function (e) {
						/*console.log (e);
						$('.mce-edit-area').height(max);
						$('.mce-edit-area iframe').height(max);
						$('.mce-edit-area iframe').parent().height(max);
						*/

					});

					if(tinymce.Env.iOS){

							//IOS에서 프레임 밀고나가는 현상 처리용
							//content.min.css > html, body, mce-content-body에 css max-width:none;height: 100%; min-width:90%;width: 99%; overflow: scroll; 추가 처리함.
							iframe_nm= "#"+$(editor).attr("id")+"_ifr";

							$(iframe_nm).css("height",0)
							$(iframe_nm).css("width",0)

							$(iframe_nm).css("max-height","100%")
							$(iframe_nm).css("max-width","100%")
							$(iframe_nm).css("min-height",height)
							$(iframe_nm).css("min-width","100%")

					}

					//$(editor).select();

					try{
						editorID=this.editorContainer.id;
						editorMenubarID = $("#"+editorID)[0].childNodes[0].childNodes[0].id;
						editorTollbarID = $("#"+editorID)[0].childNodes[0].childNodes[1].id;
					}catch (e){}

					try{
						getLoadContent(); //양식바인딩
					}catch (e){}

					editerOnload=true;

					editor.on('click', function (e) {
						nodeItem = e.target;
						//-------------------------------------------------------------

						var strItem = tinymce.dom.DomQuery(e.target).closest("TD");
						var strItemBody = tinymce.dom.DomQuery(e.target).closest("body");

						 try {
								 if (selectBoxDiv != null)
								 {
									if (strItem[0] == undefined)
									{
										$("#div_"+selectBoxDiv).hide();
										 selectBoxDiv=null;
									}
									 if (selectBoxDiv != strItem[0].id)
									 {
										$("#div_"+selectBoxDiv).hide();
										 selectBoxDiv=null;
									 }

								 }
						 }catch (e){ //console.log("err-1")
							 }


						try{
								editor_nm= $(editor).attr("id")+"_ifr";
								if (strItem[0].id.left(1)=="M") // 멀티체크박스 클릭이벤트 처리
								{
									try	{
										chkMultiItem(e.target);

										if(isMobile){
											$("#"+editor_nm).trigger("blur");
										}
									}catch (e){// console.log("err-2")
										 }
								}

								if (strItem[0].id.left(1)=="U" || strItem[0].id.left(1)=="S" || strItem[0].id.left(1)=="T") // 싱글, 선택박스 클릭이벤트 처리
								{
										try{

											//에디터의 좌표와 이벤트 발생한 TD의 좌표를 합하여 위치구하기 좌측위치
											e_left=$("#"+editor_nm).offset().left +$(strItem).offset().left+5;
											// 스크롤 발생시 상위위치 조정
											e_top=$("#"+editor_nm).offset().top +$(strItem).offset().top -$("#"+editor_nm).contents().scrollTop()+2;

											chkTextItem(e.target, e_left, e_top);
										}catch (e){ //console.log("err-3")
											 }
								}
						}catch (e){ //console.log("err-4")
						 }

						//--------------------------------------------------------------

					});

					editor.on('blur', function(e) {
							mainContents=tinymce.get(id).getContent();

							try
							{
								var srcSeqno=new Array();
								$tmImg = tinymce.dom.DomQuery(tinymce.activeEditor.dom.select('.tinyMCEInsertIMAGE'));
								$("#tinyMCEInsertIMAGE").val("");
								if ($tmImg.length>0)
								{
									for (i=0;i<$tmImg.length ;i++ )
									{
										srcSeqno[i] = $tmImg[i].src.split('?src=')[1];
									}
								}
								$("#tinyMCEInsertIMAGE").val(srcSeqno);
							}
							catch (e)
							{
							}

							try{
								//console.log('chkFormsTags()');
								//console.log('editor.on     blur' );
								chkFormsTags();
							}catch (e)
							{
							}

					});

		}
	});
	//plUploaderInit();
 }
