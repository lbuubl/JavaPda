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
var  traverseFileTree, map = {};

//uploadUrl = "/common/Pupload_Dml.do"
uploadUrl = "/common/puploadDml"


$(function() {
	 // Events
	 $("#uploadEvent").pluploadQueue({

        // General settings
        runtimes: 'html5,flash,silverlight,html4',
        //url: '/common/Pupload_dml.Do',
        url: uploadUrl,
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

				uploader.settings.multipart_params = {
					"mc" : mc,
					"mst" :  $("#frmUpload input[name='mst']").val(),
					"FK1" : "T_FIELDWORK_TYPE"
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
				fn_save_evalClass();

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
	$('#btn_s2_save').unbind('click');
	$('#btn_s2_save').click(function(e) {
		/*
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
		}*/

		//var validObject = $("#evalClassNm, select[name = methodTypeCode1], select[name = methodTypeCode2], select[name = methodTypeCode3], select[name = methodTypeCode4]")
		var validObject = $("#evalClassNm");

		if(validObject.valid()){

			var codeCnt = 0;
			$("select[name = methodTypeCode1], select[name = methodTypeCode2], select[name = methodTypeCode3], select[name = methodTypeCode4]").each(function(index, item){
				if ($(this).val() != ""){
					codeCnt += 1;
				}
			});

			if(codeCnt < 2){
				alert("평가등급은 2개이상 선택 하셔야 합니다.");
				return false;
			}

			BlockShow();	//block-ui show
			uploader.start();
			e.preventDefault();
		}
	});

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

	// 폴더 업로드 추가시작
	traverseFileTree = function (item, path) {
		var dirReader = null;
		path = path || '';
		if (item.isFile) {
			item.file(function(file) {
				// careful here, could be several files of the same name
				// we assume files will be in the same order here than in plupload
				if(map[file.name] === undefined) {
					map[file.name] = [];
				}
				map[file.name].push(path);
			});
		} else if (item.isDirectory) {
			dirReader = item.createReader();
			dirReader.readEntries(function (entries) {
				var n = 0;
				for (n = 0; n < entries.length; n++) {
					traverseFileTree(entries[n], path + item.name + "/");
					//console.log(path + item.name + "/");
				}
			});
		}
	};

	// bind another handler to the drop event to build an object representing the folder structure
	document.getElementById('uploadEvent').addEventListener('drop', function(e) {
		var items = e.dataTransfer.items, n, item;
		for(n = 0; n < items.length; n++) {
			item = items[n].webkitGetAsEntry();
			if(item) {
				traverseFileTree(item);
			}
		}
	}, false);

});
