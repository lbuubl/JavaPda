/* ------------------------------------------------------------------------------
*
 파일 업로드 관련 ..
*
* ---------------------------------------------------------------------------- */

var uploaderId = "#uploader";

function plUploaderInit(){ ;

	$(uploaderId).pluploadQueue({

			// General settings
			runtimes: 'html5,flash,silverlight,html4',
			//url: '/common/Pupload_dml.Do',
			url: '/common/puploadDml',
			chunk_size:  '19999mb',
			unique_names: true,
			//***************************
			//파일 한개만 선택 가능하도록 추가
			//***************************
			multi_selection: false,
			multiple_queues : false,
			// Resize images on client-side if we can
			/*resize: {
				width: 320,
				height: 240,
				quality: 90
			},*/

			// Filters
			filters: {
				max_file_size: '19999mb'

				,mime_types: [{
					title: "Image files",
					extensions: "jpg,jpeg,gif,png"
				}
				,{
					title: "PDF",
					extensions: "pdf"
				}
				]
			},

			// Flash settings
			flash_swf_url: '/plupload/js/Moxie.swf',
			// Silverlight settings
			silverlight_xap_url: '/plupload/js/Moxie.xap',
			// PreInit events, bound before any internal events
			preinit: {
				Init: function(up, info) {

				},
				UploadFile: function(up, file) {
					log('[UploadFile]', file);
				}
			},

			// Post init events, bound after the internal events
			init: {
				BeforeUpload: function(up, file) {
					log('[BeforeUpload]', 'File: ', file); // Called right before the upload for a given file starts, can be used to cancel it if required
					this.settings.multipart_params = {
						/*
//						"Size" : $("#Size").val(),
						"fk1" : $("#rev").val(),
//						"fk2" : $("#fk2").val(),
//						"fk3" : $("#fk3").val(),
//						"Rev" : $("#Rev").val(),
//						"Ak" : $("#Attech_kind").val()
//						"mc" : $("#mc").val(),
						"mst" : $("#selectRev").val()
						*/

						"Size" : "400*300@300*400",  //썸네일
						"fk1" : "",
//						"fk2" : $("#fk2").val(),
//						"fk3" : $("#fk3").val(),
//						"Rev" : $("#Rev").val(),
//						"Ak" : $("#Attech_kind").val()
//						"mc" : $("#mc").val(),
						"mst" : ""
					};



				},
				UploadProgress: function(up, file) {
					log('[UploadProgress]', 'File:', file, "Total:", up.total); // Called while file is being uploaded
				//	alert(file.id +"//"+ file.percent)

					$("#"+file.id).css("background-image", "url(/resources/module/assets/images/download_bg.png)");
					$("#"+file.id).css('background-position', '10% 10%');
				},

				UploadComplete: function(up, files) {
					//log('전체파일업로드 완료 [UploadComplete]'); // Called when all files are either uploaded or failed
					//console.log("complete");
					//alert("up complete");
					//dataSubmit();
					//alert("up complete end ");
					dataDML();
				},

				Destroy: function(up) {
					log('[Destroy] '); // Called when uploader is destroyed
				},

				Error: function(up, args) {
					log('[Error] ', args); // Called when error occurs
				}
			}

	})
	//******************************************************
	//한개 이상의 파일 업로드시 기존 파일 remove  필요없는경우 주석
	 $(uploaderId).pluploadQueue().bind('FilesAdded', function(up, files) {
		while (up.files.length > 1) {
			up.removeFile(up.files[0]);
		}
	});
	//******************************************************
	$(uploaderId).niceScroll();
}

// Write log
function log() {
	return false;
	var str = "";

	plupload.each(arguments, function(arg) {
		var row = "";

		if (typeof(arg) != "string") {
			plupload.each(arg, function(value, key) {

				// Convert items in File objects to human readable form
				if (arg instanceof plupload.File) {

					// Convert status to human readable
					switch (value) {
						case plupload.QUEUED:
						value = 'QUEUED';
						break;

						case plupload.UPLOADING:
						value = 'UPLOADING';
						break;

						case plupload.FAILED:
						value = 'FAILED';
						break;

						case plupload.DONE:
						value = 'DONE';
						break;
					}
				}

				if (typeof(value) != "function") {
					row += (row ? ', ': '') + key + '=' + value;
				}
			});

			str += row + " ";
		}
		else {
			str += arg + " ";
		}
	});

	//var log = $('#log');
	//log.append(str + "<br>");
	//log.scrollTop(log[0].scrollHeight);
}
