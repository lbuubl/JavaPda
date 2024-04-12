/* ------------------------------------------------------------------------------
*
 파일 업로드 관련 .. 
*
* ---------------------------------------------------------------------------- */

var uploaderId2 = "#depositFiles";

function depositUploaderInit(){ ; 
	$(uploaderId2).pluploadQueue({

			// General settings
			runtimes: 'html5,flash,silverlight,html4',
			url: '/common/Pupload_dml.Do',
			chunk_size:  '19999mb',
			unique_names: true,
			// Resize images on client-side if we can
			/*resize: {
				width: 320,
				height: 240,
				quality: 90
			},*/
		  
			// Filters
			filters: {
				max_file_size: '19999mb'
				/*,mime_types: [{
					title: "Image files",
					extensions: "jpg,gif,png"
				}]*/
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
//						"Size" : $("#Size").val(), 
						"fk1" : "REQ",
//						"fk2" : $("#fk2").val(),
//						"fk3" : $("#fk3").val(),
//						"Rev" : $("#Rev").val(),
//						"Ak" : $("#Attech_kind").val()
						"mc" : mc,
						"mst" : $("#modalDps_DSeq").val()	//기성신청번호
						
					};
				},
				UploadProgress: function(up, file) {
					log('[UploadProgress]', 'File:', file, "Total:", up.total); // Called while file is being uploaded
				//	alert(file.id +"//"+ file.percent)
				
					$("#"+file.id).css("background-image", "url(/module/assets/images/download_bg.png)");  
					$("#"+file.id).css('background-position', '10% 10%');
				},

				UploadComplete: function(up, files) {
					//log('전체파일업로드 완료 [UploadComplete]'); // Called when all files are either uploaded or failed
					//console.log("complete");
					//alert("up complete");
					depositDML();
					//alert("up complete end ");
				},

				Destroy: function(up) {
					log('[Destroy] '); // Called when uploader is destroyed
				},

				Error: function(up, args) {
					log('[Error] ', args); // Called when error occurs
				}
			}

	})

	$(uploaderId2).niceScroll();  
}
 
 