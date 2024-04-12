/* ------------------------------------------------------------------------------
*
*  # Plupload multiple file uploader
*
*  Specific JS code additions for uploader_plupload.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */


$(function() {
	 // Events
	 $("#uploadEvent_workReqComment").pluploadQueue({

        // General settings
        runtimes: 'html5,flash,silverlight,html4',
        //url: '/common/Pupload_dml.Do',
		url: '/common/puploadDml',
        chunk_size:  '19999mb',
        unique_names: true,
        // Resize images on client-side if we can
       /*resize: {
            width: 320,
            height: 240,
            quality: 90
        },*/
		/*
		multipart_params : {
			"Size" : $("#Size").val(), //width*height@width*height
			"mc" : $("#mac").val(),
			"mst" : "",
			"fk1" : $("#fk1").val(),
			"fk2" : $("#fk2").val(),
			"fk3" : $("#fk3").val(),
			"Rev" : $("#Rev").val(),
			"Ak" : $("#Attech_kind").val()
	    },
		*/
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
			 PostInit: function() {

			},
            Init: function(up, info) {
                log('[Init]', 'Info:', info, 'Features:', up.features);
            },
            UploadFile: function(up, file) {
                log('[UploadFile]', file);
            }
        },

        // Post init events, bound after the internal events
        init: {
            Browse: function(up) {
                log('[Browse]'); // Called when file picker is clicked
            },

            Refresh: function(up) {
                log('[Refresh]'); // Called when the position or dimensions of the picker change
            },

            StateChanged: function(up) {
                log('[StateChanged]', up.state == plupload.STARTED ? "STARTED": "STOPPED"); // Called when the state of the queue is changed
            },

            QueueChanged: function(up) {
                log('[QueueChanged]'); // Called when queue is changed by adding or removing files
            },

            OptionChanged: function(up, name, value, oldValue) {
                log('[OptionChanged]', 'Option Name: ', name, 'Value: ', value, 'Old Value: ', oldValue); // Called when one of the configuration options is changed
            },

            BeforeUpload: function(up, file) {

                log('[BeforeUpload]', 'File: ', file); // Called right before the upload for a given file starts, can be used to cancel it if required
				uploader.settings.multipart_params = {
					"Size" : "",
					"mc" : $("#frmCommentUpload input[name='mc']").val(),
					"mst" : $("#frmCommentUpload input[name='MST']").val(),
					"fk1" : $("#frmCommentUpload input[name='FK1']").val(),
					"fk2" : "",
					"fk3" : "",
					"Rev" : "",
					"Ak" : ""
				};
            },

            UploadProgress: function(up, file) {
                log('[UploadProgress]', 'File:', file, "Total:", up.total); // Called while file is being uploaded
			//	alert(file.id +"//"+ file.percent)

				$("#"+file.id).css("background-image", "url(/resources/module/assets/images/download_bg.png)");
				$("#"+file.id).css('background-position', '10% 10%');
            },

            FileFiltered: function(up, file) {
                log('[FileFiltered]', 'File:', file); // Called when file successfully files all the filters
            },

            FilesAdded: function(up, files) {
                log('[FilesAdded]'); // Called when files are added to queue

                plupload.each(files, function(file) {
                    log('  File:', file);
                });
            },

            FilesRemoved: function(up, files) {
                log('[FilesRemoved]'); // Called when files are removed from queue

                plupload.each(files, function(file) {
                    log('  File:', file);
                });
            },

            FileUploaded: function(up, file, info) {
                log('[파일하나 업로드완료 FileUploaded] File:', file, "Info:", info); // Called when file has finished uploading
            },

            ChunkUploaded: function(up, file, info) {
                log('[ChunkUploaded] File:', file, "Info:", info); // Called when file chunk has finished uploading
            },

            UploadComplete: function(up, files) {
                log('전체파일업로드 완료 [UploadComplete]'); // Called when all files are either uploaded or failed

				var param = $("#frmCommentUpload").serialize();

				$.ajax({
					type :'post'													// Post로 데이터 전달(get,post방식)
					, asyn : false													// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/WorkReq/dml/workReqCommentDml.do"	// 전송할 페이지
					, url: "/module/usermodule/workreq/workReqCommentDml"
					, data : param
					//, dataType:"json"
					, dataType: "html" // workReqCommentDml.do 에서 넘기는 값중  result 만 사용.  result 만 넘기도록 변경함
					, success:function( data ){
						//if(data.result == "success"){
						if(data == "success"){

							var dmlType = $("#frmCommentUpload input[name='dmlType']").val()

							var resultStr = i18next.t("msg.saveOk");
							if(dmlType == "edit"){
								resultStr = i18next.t("msg.editOk");
							}

							$.unblockUI();							//block-ui hide
							swal({
								title: resultStr,
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

							$("#commentModal").modal("hide");

							//코멘트 로딩
							loadWorkReqCommentList($("#frmCommentUpload input[name='boardSeqNo']").val());

						}else{
							$.unblockUI();
							//$.ajax({url: "/Common/TempFileDelete.do"}); //session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제

							swal({
								//title: i18next.t(data.code),  // 'workReqCommentDml.do' 에서   code값은 설정하지도 않음..  뭐니???   'result' 값만 사용하고 잇음.
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
						}
					 }
					 , error:function(xhr,textStatus){
							$.unblockUI();								//block-ui hide
							//$.ajax({url: "/Common/TempFileDelete.do"}); //session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제

							swal({
								title: i18next.t("msg.DbError"),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});
					 }
				});

            },

            Destroy: function(up) {
                log('[Destroy] '); // Called when uploader is destroyed
            },

            Error: function(up, args) {
                log('[Error] ', args); // Called when error occurs
            }
        }
    });


	/* 사용자 커스텀 업로드 시작버튼 */
	var uploader = new $("#uploadEvent_workReqComment").pluploadQueue();

	/*
	$('#startBtn').click(function(e) {

		//valid 체크를 하기위해 파일첨부 여부를 hidden 에 담는다.
		if(uploader.files.length == 0){
			$("#frmUpload").find("input[name='isAttach']").val("")
		}else{
			$("#frmUpload").find("input[name='isAttach']").val("Y")
		}

		if($("#frmUpload").valid()){	//valid 체크
			BlockShow();	//block-ui show
			uploader.start();
			e.preventDefault();
		}
	});
	*/

	$(".plupload_filelist").niceScroll();//파일리스트처리

    // Write log
    function log() {
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

		/*
        var log = $('#log');
        log.append(str + "<br>");
        log.scrollTop(log[0].scrollHeight);
		*/
    }

});
