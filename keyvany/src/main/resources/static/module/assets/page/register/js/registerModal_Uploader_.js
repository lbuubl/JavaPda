var uploader;
var uploader2;
$(function() {

	// Events
	//	 $("#uploadEvent").pluploadQueue({
	uploader = new plupload.Uploader({

		// General settings
		browse_button: 'btnUploadImage',
		multi_selection: false,
		runtimes: 'html5,flash,silverlight,html4',
		//container: document.getElementById('uploadEvent'),
		container: document.getElementById('uploadEvent'),


		url: '/common/PuploadRegister_dml.do',
		chunk_size:  '19000mb',
		unique_names: true,


		// Resize images on client-side if we can
		   /*resize: {
			width: 320,
			height: 240,
			quality: 90
		},*/
		multipart_params : {
			"Size" : $("#Size").val(), //width*height@width*height
			"mc" : $("#mac").val(),
			"mst" : $("#mst").val(),
			"fk1" : "Register",
			"fk2" : "photo",
			"fk3" : $("#formUid").val(),
			"Rev" : "0",
			"Ak" : "",
			"ProjectCode" : $("#PCode").val(),
			"GongguCode" : $("#selectGonggu").val()
		 },
		// Filters
		filters: {
			max_file_size: '10mb'
			,mime_types: [{
				title: "Image files",
				extensions: "jpg,gif,png"
			}]
		},
		// Flash settings
		flash_swf_url: '/plupload/js/Moxie.swf',

		// Silverlight settings
		silverlight_xap_url: '/plupload/js/Moxie.xap',

		// PreInit events, bound before any internal events
		preinit: {
				PostInit: function() {
				},
				Init: function(up, info) {
				//log('[Init]', 'Info:', info, 'Features:', up.features);
				},
				UploadFile: function(up, file) {
				//log('[UploadFile]', file);
				}
		 },

		// Post init events, bound after the internal events
		init: {

			UploadProgress: function(up, file) {

				//	alert(file.id +"//"+ file.percent)
					//$("#"+file.id).css("background-image", "url(/module/assets/images/download_bg.png)");
					//$("#"+file.id).css('background-position', '10% 10%');
			},
			BeforeUpload: function(up, file) {
				//log('[BeforeUpload]', 'File: ', file); // Called right before the upload for a given file starts, can be used to cancel it if required
				this.settings.multipart_params = {
					"Size" : $("#Size").val(), //width*height@width*height
					"mc" : $("#mac").val(),
					"mst" :  $("#mst").val(),
					"fk1" : "Register",
					"fk2" : "photo",
					"fk3" : $("#formUid").val(),
					"Rev" : "0",
					"Ak" : "",
					"ProjectCode" : $("#PCode").val(),
					"GongguCode" : $("#selectGonggu").val()
				};
			},

			FilesAdded: function(up, files) {
				$("#choice_file_nm").html(files[0].name);
			},

			UploadComplete: function(up, files) {
				//log('전체파일업로드 완료 [UploadComplete]'); // Called when all files are either uploaded or failed
				//console.log("up start1 Complite");
				//직접 싸인 한 경우 싸인파일 업로드X
				//console.log($("#uSignBase64"));
				if($("#uSignBase64").text()!=""){
					user_saveW();
				}else{
					uploader2.start();
				}


			}
		}

	});


	uploader2 = new plupload.Uploader({

		// General settings
		browse_button: 'btnUploadImage2',
		multi_selection: false,
		runtimes: 'html5,flash,silverlight,html4',
		//container: document.getElementById('uploadEvent2'),
		container: document.getElementById('uploadEvent2'),


		url: '/common/PuploadRegister_dml.do',
		chunk_size:  '19000mb',
		unique_names: true,


		// Resize images on client-side if we can
		   /*resize: {
			width: 320,
			height: 240,
			quality: 90
		},*/
		multipart_params : {
			"Size" : $("#Size").val(), //width*height@width*height
			"mc" : $("#mac").val(),
			"mst" : $("#mst").val(),
			"fk1" : "Register",
			"fk2" : "sign",
			"fk3" : $("#formUid").val(),
			"Rev" : "0",
			"Ak" : "",
			"ProjectCode" : $("#PCode").val(),
			"GongguCode" : $("#selectGonggu").val()
		 },
		// Filters
		filters: {
			max_file_size: '10mb'
			,mime_types: [{
				title: "Image files",
				extensions: "jpg,gif,png"
			}]

		},
		// Flash settings
		flash_swf_url: '/plupload/js/Moxie.swf',

		// Silverlight settings
		silverlight_xap_url: '/plupload/js/Moxie.xap',

		// PreInit events, bound before any internal events
		preinit: {
				PostInit: function() {
				},
				Init: function(up, info) {
				//log('[Init]', 'Info:', info, 'Features:', up.features);
				},
				UploadFile: function(up, file) {
				//log('[UploadFile]', file);
				}
		 },

		// Post init events, bound after the internal events
		init: {
			UploadProgress: function(up, file) {
				//$("#"+file.id).css("background-image", "url(/resources/module/assets/images/download_bg.png)");
				//$("#"+file.id).css('background-position', '10% 10%');
			},
			BeforeUpload: function(up, file) {
				//log('[BeforeUpload]', 'File: ', file); // Called right before the upload for a given file starts, can be used to cancel it if required
				this.settings.multipart_params = {
					"Size" : $("#Size").val(), //width*height@width*height
					"mc" : $("#mac").val(),
					"mst" :  $("#mst").val(),
					"fk1" : "Register",
					"fk2" : "sign",
					"fk3" : $("#formUid").val(),
					"Rev" : "0",
					"Ak" : "",
					"ProjectCode" : $("#PCode").val(),
					"GongguCode" : $("#selectGonggu").val()

				};
			},

			FilesAdded: function(up, files) {
				$("#choice_file_nm2").html(files[0].name);
			},

			UploadComplete: function(up, files) {
				//alert("up complete2");
				user_saveW();
			}
		}

	});

	/* 사용자 커스텀 업로드 시작버튼 */
	//var uploader= new $("#uploadEvent").pluploadQueue();


	//$(".plupload_filelist").niceScroll();//파일리스트처리


	uploader.init();
	uploader2.init();
});