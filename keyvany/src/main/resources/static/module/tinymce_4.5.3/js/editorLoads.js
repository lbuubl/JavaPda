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

	if (readOnly == "" || readOnly == null || typeof readOnly == "undefined"){
		readOnly = 0;
	}

	if (isMobile){
		toolbar="";
		menubar="";
	}else{
		toolbar="undo redo | print | fontselect | fontsizeselect | forecolor backcolor | mybutton charmap table | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | preview";
		menubar="file edit insert view table tools";
	}

	switch (lng){
		case "ko":
			//font_formats="Batang=바탕,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n";
			font_formats='나눔고딕=Nanum Gothic;'+'Andale Mono=andale mono,times;'+ 'Arial=arial,helvetica,sans-serif;'+ 'Arial Black=arial black,avant garde;'+ 'Book Antiqua=book antiqua,palatino;'+ 'Comic Sans MS=comic sans ms,sans-serif;'+ 'Courier New=courier new,courier;'+ 'Georgia=georgia,palatino;'+ 'Helvetica=helvetica;'+ 'Impact=impact,chicago;'+ 'Symbol=symbol;'+ 'Tahoma=tahoma,arial,helvetica,sans-serif;'+ 'Terminal=terminal,monaco;'+ 'Times New Roman=times new roman,times;'+ 'Trebuchet MS=trebuchet ms,geneva;'+ 'Verdana=verdana,geneva;'+ 'Webdings=webdings;'+ 'Wingdings=wingdings,zapf dingbats';
			break;

		case "en":
			break;

		case "ru":
			break;

		case "ua":
			break;

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
			'advlist  lists charmap print preview hr pagebreak ',
			'visualblocks visualchars  fullscreen nonbreaking',
			'table contextmenu directionality textcolor paste colorpicker textpattern imagetools'
		],
		content_css: "/module/tinymce/tests/manual/css/development.css",
		add_unload_trigger: false,
		menubar: menubar,
		extended_valid_elements : "span[!class]",
		statusbar: false,
		resize: true,
		paste_data_images: true,
		relative_urls: false,
		toolbar: toolbar,
		font_formats: font_formats,
		fontsize_formats: fontsize_formats,
		setup: function(ed) {
			ed.on("click",function(e) {//
/*
				console.log("===e.target.class====");
				console.log(e.target);
				console.log(e.target.id);
//				console.log(e.target.class);
				console.log($(e.target).attr("class"));
				console.log("===e.target.class====");
*/
				try
				{
					if (e.target.id.left(1)=="M")
					{
						try
						{
							chkMultiItem(e.target.id,e.target.value,$(e.target).attr("class"));
						}
						catch (err)
						{
							console.log(err);
						}
					}
				}
				catch (err)
				{
					console.log("id가 없음"+err);
				}
			});
			ed.addContextToolbar('img', 'alignleft aligncenter alignright alignjustify | image remove');
			ed.addButton('mybutton', {
					type: 'button',
					title: 'Local Image Insert',
					icon: 'image',
					id: 'mybutton',

					onclick: function() {
						$.ajax({
							// Edward.   실제 사용되는거니?
							//url:"/module/UserModule/approval/common/inputImageModal.page",
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
										//url: "/module/assets/page/approval/js/editorImagePost.js",
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
						//$(".file-Choice").next().html(i18next.t("common:F.NoChoiceFile"));
						//$(".file-Choice").next().next().html(i18next.t("common:F.ChoiceFile"));
						$("#uniform-upto").localize();
					}
				});
		},
		init_instance_callback: function (editor) {
			editor.on('click', function (e) {
				nodeItem = e.target;
				//cbm=tinyMCE.activeEditor.selection.getBookmark();
				//tinyMCE.execCommand('mceSetAttribute',false,{name:'id',value:'right1'});
			});
			editor.on('blue', function(e) {
				mainContents=tinymce.get(id).getContent();
			});
		}
	});
	//plUploaderInit();
 }
