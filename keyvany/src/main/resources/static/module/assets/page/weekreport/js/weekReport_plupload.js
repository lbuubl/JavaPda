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
	 $("#uploadEvent").pluploadQueue({

        // General settings
        runtimes: 'html5,flash,silverlight,html4',
        //url: '/common/Pupload_dml.Do',
        url: '/common/puploadDml',
        chunk_size:  '19999mb',
        unique_names: true,

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
					"MST" : $("#reportWriteForm input[name='MST']").val()
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

				var dmlType = $("#reportWriteForm input[name='dmlType']").val();
				var paramData = $("#reportWriteForm").serialize();
				paramData += "&SSID="+$("#gssid").val();

				$.ajax({
					type :'post'												// Post로 데이터 전달(get,post방식)
					, asyn : false												// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/WeekReport/dml/weekReportDml.do"
					, url: "/module/usermodule/weekreport/dml/weekReportDml"
					, data : paramData
					, dataType:"json"
					, success:function( data ){
						if(data.result == "success"){
							$.unblockUI();							//block-ui hide

							var resultStr = "";
							//등록
							if (dmlType == "add"){
								$('#modal_reportEdit').modal('hide');	//레이어 닫기
								t1.ajax.reload();						//테이블 재로딩
								resultStr = i18next.t("msg.saveOk");

							//수정
							}else{
								t1.ajax.reload();	//테이블 재로딩
								$('#modal_reportEdit').modal('hide');									//레이어 닫기
								fn_loadReportDetail($("#reportWriteForm input[name='sn']").val());		//상세 로딩
								resultStr = i18next.t("msg.editOk");
							}

							swal({
								title: resultStr,
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

						}else{
							$.unblockUI();								//block-ui hide
							//$.ajax({url: "/Common/TempFileDelete.do"}); //session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"});
							swal({
								title: i18next.t(data.code),
								confirmButtonColor: "#f44336",
								closeOnConfirm: true,
								type: "error"
							});

						}
					 }
					 , error:function(xhr,textStatus){
							$.unblockUI();								//block-ui hide
							//$.ajax({url: "/Common/TempFileDelete.do"}); //session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"});
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
	var uploader = new $("#uploadEvent").pluploadQueue();

	/**********************************************************************/
	/*************************** 저장버튼 이벤트 **************************/
	/**********************************************************************/

	//저장 버튼
	$('#btn_reportSave').click(function(e) {
		if($("#reportWriteForm").valid()){	//valid 체크
			BlockShow();	//block-ui show
			uploader.start();
			e.preventDefault();
		}
	});

	//제출 버튼
	$('#reportWriteForm #btn_weekReportSubmit').click(function(e) {
		if($("#reportWriteForm").valid()){	//valid 체크
			$("#reportWriteForm input[name='sendState']").val("1");	//제출여부(제출)
			BlockShow();	//block-ui show
			uploader.start();
			e.preventDefault();
		}
	});

	/**********************************************************************/
	/************************** //저장버튼 이벤트 *************************/
	/**********************************************************************/


	//$(".plupload_filelist").niceScroll();//파일리스트처리

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
