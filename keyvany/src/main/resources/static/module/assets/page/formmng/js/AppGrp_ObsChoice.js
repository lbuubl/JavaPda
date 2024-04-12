/*
	결재그룹 컨트롤 소스
*/
var uploader;
$(function(){

		uploader = new plupload.Uploader({

			// General settings
			browse_button: 'BigSingChoice',
			multi_selection: false,
			runtimes: 'html5,flash,silverlight,html4',
			//url: '/common/Pupload_dml.do',
	        url: '/common/puploadDml',
			chunk_size:  '1mb',
			unique_names: true,
			// Resize images on client-side if we can
		      resize: {
			    width: 100,
			    height: 100,
			    quality: 100
			},
			multipart_params : {
				"Size" : $("#Size").val(), //width*height@width*height
				"mc" : $("#mac").val(),
				"mst" : $("#mst").val(),
				"fk1" : $("#fk1").val(),
				"fk2" : $("#fk2").val(),
				"fk3" : $("#fk3").val(),
				"Rev" : $("#Rev").val(),
				"Ak" : $("#Attech_kind").val()
			 },
			// Filters
			filters: {
			    max_file_size: '1mb'
				,mime_types: [{
					title: "Image files",
					extensions: "jpg,gif,png"
			    }]
			},
			flash_swf_url: '/plupload/js/Moxie.swf',
			silverlight_xap_url: '/plupload/js/Moxie.xap',
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
			init: {
				BeforeUpload:function(up, files){
						console.log(files)
				},
			    FilesAdded: function(up, files) {
					$("#choice_file_nm").val(files[0].name);
			    },
			    UploadComplete: function(up, files) {
					//log('전체파일업로드 완료 [UploadComplete]'); // Called when all files are either uploaded or failed
					//파일저장후 양식정보 저장 이벤트 처리
					ForminfoSave();
			    },
			    Error: function(up, args) {
						if (args.code==-600)
						{
								alert(i18next.t("FormMng:msg.FileSize"));
						}
						//		log('[Error] ', args); // Called when error occurs
			    }
			}
		    });

		uploader.bind("BeforeUpload", function(up,file) {
				 uploader.settings.multipart_params ={
					"Size" : $("#Size").val(), //width*height@width*height
					"mc" : $("#mac").val(),
					"mst" :  $("#mst").val(),
					"fk1" : $("#fk1").val(),
					"fk2" : $("#fk2").val(),
					"fk3" : $("#fk3").val(),
					"Rev" : $("#Rev").val(),
					"Ak" : $("#Attech_kind").val()
				};
		});

		/*$('#startBtn').click(function(e) {
				uploader.start();
				e.preventDefault();
		});*/

		uploader.init();

//----------------------------------------------------------------------
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

			var log = $('#log');
			log.append(str + "<br>");
			log.scrollTop(log[0].scrollHeight);
	    }
//--------------------------------------------------------------------------------


	$.ajax({
		//"url": "/module/sysModule/obs/obs.do",
		"url": "/module/sysmodule/obs/obs",
		"dataType" : "json",
		"type" : "post",
		"data" : {
			"GongGuCode" : $("#select_Gonggu").val()
		},
		"success" : function(nodeData){

				$('#obs_tree').jstree({
					'core' : {
						'check_callback': true, //add, rename, Del를 적용여부
						"themes" : { "stripes" : true }, //격자배경
						'data' : nodeData
						},
					//검색 , 선택배경반전, 체크박스
					"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
				});
		}
	})

	// ajax demo
	$('#obs_tree').on("select_node.jstree", function (e, data) {
			if(data.selected.length) {
				/* 한개 선택하는 방식일때 사용 */
				node_id			 = data.instance.get_node(data.selected[0]).id;
				P_node_id	     = data.instance.get_node(data.selected[0]).parent;
				node_nm	     = data.instance.get_node(data.selected[0]).text;

				a_attr				 = data.instance.get_node(data.selected[0]).a_attr;
				type				 = a_attr.T;

				$("#appGrpPosctionCd").val(node_id);
				$("#appGrpPosctionNm").val(node_nm);
				$("#appGrpNm").val(node_nm);

			}else{
				//null data
			}
	});


	//검색
	var to = false;
	$('#obs_Search_nm').keyup(function () {
		if(to) { clearTimeout(to); }
		to = setTimeout(function () {
			var v = $('#obs_Search_nm').val();
			//console.log(v);
			$('#obs_tree').jstree(true).search(v);
		}, 250);
	});

	//OBS보이기 숨기기
    $(".AppGrpTree").hide();
	$("#GrpChoice").click(function() {
		  	 $(".AppGrpTree").toggle();
	});

	$(".appGrpChoiceEnd").click(function() {
			 $(".AppGrpTree").toggle();
	});



});