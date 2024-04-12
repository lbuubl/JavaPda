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
					"mc" : mc,
					"MST" : $("#docWriteForm input[name='MST']").val()
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

				var dmlType = $("#docWriteForm input[name='dmlType']").val();

				//T_PUBLIC_FILE.TempKey 초기화
				//T_ITEM_INFO, T_ITEM_INFO_CLASS, T_public_file 처리
				$.ajax({
					type :'post'											// Post로 데이터 전달(get,post방식)
					, asyn : false											// 비동기식으로 ajax 요청
					//, url: "/Module/UserModule/DocMgr/dml/docSaveDml.do"
					, url: "/module/usermodule/docmgr/dml/docSave"
					, data : {												// parameter

						"SSID"			: $("#gssid").val(),
						"sn"				: $("#docWriteForm #sn").val(),					//일련번호
						"dmlType"		: dmlType,										//처리타입(add, modify, del)
						"kind_SeqNo_DocNo"	: $("#docWriteForm #kind_SeqNo_DocNo").val(),	//문서번호
						"Kind_SeqNo_Title"	: $("#docWriteForm #Kind_SeqNo_Title").val(),	//문서제목
						"Content"			: $("#docWriteForm #Content").val(),			//문서설명
						"AuthUserObsCode"	: $("#docWriteForm #authUserObsCode").val(),	//열람권한
						"Tags"				: $("#docWriteForm #tags").val(),				//태그
						"DocFolderSn"		: $("#docWriteForm input[name='docFolderSn']").map(function() { //분류체계
												return $(this).val();
											}).get().join()
					}
					, dataType:"json"
					, success:function( data ){
						if(data.result == "success"){
							$.unblockUI();							//block-ui hide

							var resultStr = "";
							//등록
							if (dmlType == "add"){
								$('#modal_docForm').modal('hide');		//레이어 닫기
								t1.ajax.reload();						//테이블 재로딩
								$('#ajax_tree').jstree("refresh");		//트리 재로드
								resultStr = i18next.t("msg.saveOk");

							//수정
							}else{
								t1.ajax.reload();	//테이블 재로딩
								$('#modal_docForm').modal('hide');		//레이어 닫기
								fn_openDocDetail($("#docWriteForm #sn").val());		//상세 로딩
								resultStr = i18next.t("msg.editOk");
							}

							swal({
								title: resultStr,
								showConfirmButton: false,
								type: "success",
								timer: 1000
							});

						}else{
							$.unblockUI();							//block-ui hide
							alert(i18next.t(data.code));
							//$.ajax({url: "/Common/TempFileDelete.do"}); //session id 로 등록된 temp file 삭제
							$.ajax({url: "/common/tempfiledelete"}); //session id 로 등록된 temp file 삭제
						}
					 }
					 , error:function(xhr,textStatus){
							$.unblockUI();							//block-ui hide
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
	var uploader = new $("#uploadEvent").pluploadQueue();

	/**********************************************************************/
	/*************************** 저장버튼 이벤트 **************************/
	/**********************************************************************/
	$('#btn_docSave').click(function(e) {

		$('#btn_docSave').hide();//더블클릭방지...
		if($("#docWriteForm").valid()){	//valid 체크
			//본문파일 있으면 본문파일 UPLOAD 시작
			if( $("#docWriteForm #file").val() != ""){

				//본문파일 업로드
				var form = $('#docWriteForm')[0];
				var formData = new FormData(form);
				$.ajax({
					//url: '/Common/Pupload_Dml.do',
					url: '/common/puploadDml',
					processData: false,
					contentType: false,
					data: formData,
					type: 'POST',
					success: function(result){

						//업로드 성공
						uploader.start();
					}
				});


			//본문파일 없으면 다중파일 업로드 시작
			}else{
				uploader.start();
			}

			e.preventDefault();

		}else{
			$('#btn_docSave').show();
		}
	});
	/**********************************************************************/
	/************************** //저장버튼 이벤트 *************************/
	/**********************************************************************/


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
