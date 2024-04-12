$(document).ready(function() {	
	var bbsEdit = {	
		elements:{},		
		loadDetail: function() {
			var _this = this;
			var dfd = new $.Deferred();
			var seqno = $("#seqno").val();
			$.ajax({					
				url:'/community/bbs/detailEntity/'+seqno,
				type: 'POST',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		loadBoardSetting: function() {
			var _this = this;
			var dfd = new $.Deferred();
			$.ajax({					
				url:'/community/bbs/setting',
				type: 'POST',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		loadGongguSetting: function() {
			var _this = this;
			var dfd = new $.Deferred();
			$.ajax({					
				url:'/community/bbs/gongguSetting',
				type: 'POST',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		loadProjectSetting: function() {
			var _this = this;
			var dfd = new $.Deferred();
			$.ajax({					
				url:'/community/bbs/projectSetting',
				type: 'POST',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		loadProjectGongguSetting: function(seqno) {
			var _this = this;
			var dfd = new $.Deferred();
			var query = {};
			query.seqno = seqno;
			$.ajax({					
				url:'/community/bbs/projectGongguSetting',
				type: 'POST',
				contentType: 'application/json',
				data : JSON.stringify(query),
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		init : function (){
        	var _this = this;	           	              	        	        	
        	
        	$('#file_upload').kendoUpload(
				{
					multiple: true
				}
			);
        	
        	var _tags = [];						        	
        	        	
        	if("" != $("#seqno").val() && $('#isNew').val() == 'false'){
        		var mmoduleconfigSeqno = [];
        		_this.loadDetail().done(function(data){
        			if (!_.isUndefined(data)) {
            			_this.elements.projectType = true;
            			_this.loadProjectSetting().done(function(data) {
            				//project(data);
            			});
        				_this.loadProjectGongguSetting($("#seqno").val()).done(function(data) {
        					gongguProject(data);
        					/*
        					$('input[name="notic"]').each(function() { 
        	    				for ( var i in mmoduleconfigSeqno ) {						
        							if(this.value == mmoduleconfigSeqno[i]){
        								this.checked = true;
        							}							
        						}        				 						
        					});
        					*/	        					
            			});
            			
        				//$("#noticeProject").show();               			        			
            		}else{
            			_this.elements.projectType = false;
            			$("#noticeProject").hide();
            		}        			
        			$("#bbsTitle").val(data.bbsTitle);        			        		
        			
        			var tagValue = [];
        			if(data.tags != null){
        				if(data.tags.indexOf(',') > -1){
        					tagValue = data.tags.split(',');	
        				}else{
        					tagValue.push(data.tags);
        				}        				
        			}        			    		     
        			for ( var i in tagValue ) {	
        				_tags.push(tagValue[i]);
        			}        			
        			
        			$("#popupStartDt").kendoDatePicker({
                		format: '{0:yyyy-MM-dd}',
                		value: data.popupStartDt
                	});
                	$("#popupEndDt").kendoDatePicker({
                		format: '{0:yyyy-MM-dd}',
                		value: data.popupEndDt
                	});
                	
                	if(data.mmoduleconfigSeqno != null){
        				if(data.mmoduleconfigSeqno.indexOf(',') > -1){
        					mmoduleconfigSeqno = data.mmoduleconfigSeqno.split(',');	
        				}else{
        					mmoduleconfigSeqno.push(data.mmoduleconfigSeqno);
        				}    				
        			}                   	                	
                	
        			if (data.popupYn == 'Y') {
        	            $('#popup_y').prop("checked", true);
        	            $("#noticePopDate").show();
        	        } else {
        	            $('#popup_n').prop("checked", true);
        	        }
        			
        			if(data.showGongguYn == "Y"){        				
        				$('#showGonggu_y').prop("checked", true);
        			}else{        				
        				$('#showGonggu_n').prop("checked", true);
        			}
        			
        			if (data.issueYn == 'Y') {
        	            $('#issue_y').prop("checked", true);
        	        } else {
        	            $('#issue_n').prop("checked", true);
        	        }        			        			      			        	
        			//$("#bbsCont").html(data.bbsCont);	  
        			_this.bbsData = data;

            		$('#tags').jsonTagEditor({ 
        				initialTags: _tags
        				, placeholder: '태그 입력 후 엔터를 누르세요.' 
        				, beforeTagSave: function(field , editor, tags, tag, val) { // 중복태그 제거
        					if (tags.filter(function(e) { return e.value === val; }).length > 0) {
        						return false;
        					}
        				}
        			});
            		
            		_this.getFiles();
            		
            		if(data.kind == 'BBS'){
	            		_this.elements.boardType = true;
	            		$("#noticePopYn").hide();
		        		$("#noticePopDate").hide();
		        		//$("#noticeIssueYn").hide();
		        		$("#noticeProject").hide();
	            	}else{
	            		_this.elements.boardType = false;
	            		$("#noticePopYn").show();
		        		//$("#noticePopDate").hide();
		        		//$("#noticeIssueYn").show();
		        		
	            		//$("#noticeProject").show();
	            	}
            		
            		_this.loadGongguSetting().done(function(data) {	
            			if (data != "") {
                			_this.elements.projectType = true;                			
                			
                			//$("#noticeProject").show();    
                		}else{
                			_this.elements.projectType = false;                			
                			$("#noticeProject").hide();
                		}
            		});
        		});           		
        	}else{
        		_this.loadBoardSetting().done(function(data) {
    				if (!_.isUndefined(data)) {
    					if(data.kind == 'BBS'){
    	            		_this.elements.boardType = true;
    	            		$("#noticePopYn").hide();
    		        		$("#noticePopDate").hide();
    		        		//$("#noticeIssueYn").hide();
    		        		$("#noticeProject").hide();    		        		    		        	
    	            	}else{
    	            		_this.elements.boardType = false;
    	            		$("#noticePopYn").show();
    	            		if(data.companyYn == "Y"){
    	            			$("#noticeProject").show();
    	            		}else{
    	            			$("#noticeProject").hide();
    	            		}
    		        		//$("#noticePopDate").hide();
    		        		//$("#noticeIssueYn").show();    		        		
    	            	}
    				}
    			});
        		_this.loadGongguSetting().done(function(data) {	
            		if (data != "") {
            			_this.elements.projectType = true;
            			_this.loadProjectSetting().done(function(data) {
            				//project(data);
            			});
        				_this.loadProjectGongguSetting('').done(function(data) {
        					gongguProject(data);
            			});
            			
        				//$("#noticeProject").show();                    			
            		}else{
            			_this.elements.projectType = false;
            			$("#noticeProject").hide();            			
            		}
            	});
        		$("#popupStartDt").kendoDatePicker({
            		format: '{0:yyyy-MM-dd}',
            		value: ''
            	});
            	$("#popupEndDt").kendoDatePicker({
            		format: '{0:yyyy-MM-dd}',
            		value: ''
            	});
            	_this.bbsData = {bbsCont:''};
            	$('#tags').jsonTagEditor({ 
    				initialTags: _tags
    				, placeholder: '태그 입력 후 엔터를 누르세요.' 
    				, beforeTagSave: function(field , editor, tags, tag, val) { // 중복태그 제거
    					if (tags.filter(function(e) { return e.value === val; }).length > 0) {
    						return false;
    					}
    				}
    			});                     		
        	}
        	
        	
        	
        	
        	
			//_this.elements.grid = _this.createGrid();
			_this.createPop();			
			_this.editor();
			_this.addEvent();					
        },
        getFiles : function() {
			var moduleconfigSeqno = $("#moduleconfigSeqno").val();
			var mstSeqno          = $("#seqno").val();
			var fileUrl = "/file/default?mode=edit&moduleconfigSeqno="+moduleconfigSeqno+"&mstSeqno="+mstSeqno;
			
			UI.loadPage(fileUrl).done(function(html){
				$("#file_list").html(html);
			});
		},
        editor: function(){
        	var _this = this;
        	var toolbar='';
			var fontsize_formats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
			var font_formats = 'Andale Mono=andale mono,times;'+ 'Arial=arial,helvetica,sans-serif;'+ 'Arial Black=arial black,avant garde;'+ 'Book Antiqua=book antiqua,palatino;'+ 'Comic Sans MS=comic sans ms,sans-serif;'+ 'Courier New=courier new,courier;'+ 'Georgia=georgia,palatino;'+ 'Helvetica=helvetica;'+ 'Impact=impact,chicago;'+ 'Symbol=symbol;'+ 'Tahoma=tahoma,arial,helvetica,sans-serif;'+ 'Terminal=terminal,monaco;'+ 'Times New Roman=times new roman,times;'+ 'Trebuchet MS=trebuchet ms,geneva;'+ 'Verdana=verdana,geneva;'+ 'Webdings=webdings;'+ 'Wingdings=wingdings,zapf dingbats';
			var menubar='';
			var readOnly = 0;
			var height = '400px'
				
			var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
			var css_list = "/static/js/lib/tinymce/css/editorUser.css";
			if (iOS) {
					css_list="/static/js/lib/tinymce/css/content.ios.css,/static/js/lib/tinymce/css/editorUser.css"
			}
				
			if (readOnly == '' || readOnly == null || typeof readOnly == 'undefined'){
				readOnly = 0;
			}
	
			if (screen.width < 834){ 
				toolbar="undo redo |  table | bold italic | link | alignleft aligncenter alignright alignjustify | outdent indent ";
				menubar='';
			}else{
				toolbar="undo redo |   fontselect | fontsizeselect | forecolor backcolor |  charmap table | bold italic underline strikethrough | link | alignleft aligncenter alignright alignjustify | outdent indent | preview code ";
				menubar="file edit insert table tools";	
			}

			try{
				//이미 init된 정보 remove
				tinymce.remove();
			}catch(e){}
			
        	
        	tinymce.init({
				language: 'ko',
				selector: '#editor',
				theme: 'modern',
				height: height,
				readonly:readOnly,
				forced_root_block: false,
				plugins: [
					'advlist  lists charmap  preview hr pagebreak link', 
					'visualblocks visualchars fullscreen nonbreaking', 
					'table contextmenu directionality textcolor paste colorpicker textpattern imagetools code '
				],
				content_css: css_list,
				pagebreak_separator: '<div class="pagebreak"></div>',
				pagebreak_split_block: true,
				add_unload_trigger: false,
				menubar: menubar,
				plugin_preview_width : '720',
		        plugin_preview_height : $(window).height() - 130,
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
					
				},
				init_instance_callback: function (editor) {
					tinyMCE.activeEditor.setContent(_this.bbsData.bbsCont);	
					
					
				}				
			});
							
        },
        createPop: function(){
			var _this = this;				
		},
		addEvent: function(){								
			$('#btnBBSSave').on('click', function(e){
				var $form = $('#bbsEditForm');
				var formData = UI.Validator($form).value();		
				
				var mModuleconfigSeqno = '';
				//체크한 현장이 전체현장이면 ALL
				if($("input[name='notic']:checked").length == $("input[name='notic']").length){
					mModuleconfigSeqno = "ALL";
				}else{
					$('input[name="notic"]').each(function(i) { 
						if ($('#'+this.id).is(':checked')) {
							if(mModuleconfigSeqno != ''){
								mModuleconfigSeqno += ','
							}
							mModuleconfigSeqno += this.value;
						}												 
					});					
				}			
				
				if(formData){																								
					formData.tmoduleconfigSeqno = parseInt($("#moduleconfigSeqno").val());
					formData.mmoduleconfigSeqno = mModuleconfigSeqno;
					
					var tags = $('#tags').jsonTagEditor('getTags')[0].tags;		
					var tagsValue = "";
				    for (i = 0; i < tags.length; i++) { 
				    	if(i > 0) {
				    		tagsValue = tagsValue + ',';
				    	}
				    	tagsValue = tagsValue + tags[i].value; 
				    }
					formData.tags = tagsValue;				
					formData.bbsCont = tinyMCE.get("editor").getContent({format : 'raw'});
					if(formData.bbsCont == ''){
						kendo.alert('내용을 입력하세요.');
						return;
					}
					if (_.isUndefined(formData.seqno) || $('#isNew').val() == 'true'){ //등록
						var loader = UI.Loading.open();
						
						file.fileUpload("file_upload").done(function(uuid) {																																						
							formData.fileKey = uuid;							
							var stringdata = JSON.stringify(formData);							
							$.ajax({
								method: 'POST',
								url:'/community/bbs/bbsSave',
								dataType:'json',
						        contentType: 'application/json',
								data:stringdata,
								success:function(response) {										
									kendo.alert('저장되었습니다.');																			
									location.href = '/community/bbs/view';																									        											
								},
								error:function(e){
								},
								complete : function() {
									loader.close();
							    }
							});
							
						});	
					}else{
						var loader = UI.Loading.open();							
						file.fileUpload("file_upload").done(function(uuid) {								
							$('#attachments-'+$("#moduleconfigSeqno").val()+'-'+formData.seqno).submit();
							formData.fileKey = uuid;							
							var stringdata = JSON.stringify(formData);							
							$.ajax({
								method: 'POST',
								url:'/community/bbs/bbsUpdate',
								dataType:'json',
						        contentType: 'application/json',
								data:stringdata,
								success:function(response) {
									kendo.alert('수정되었습니다.');
									location.href = '/community/bbs/view';											
								},
								error:function(e){
								},
								complete : function() {
									loader.close();
							    }
							});							
						});	
					}
				}					
			});
			
			$('#btnBBSClose').on('click', function(e){						
				/*if($("#seqno").val() == ""){
					$("#btnBBSClose").attr("href", "/community/bbs/view");
				}else{
					$("#btnBBSClose").attr("href", "/community/bbs/detail/"+$("#seqno").val());
				}		*/
				window.history.back();
			});
			
			$('input[type=radio][name=popupYn]').change(function() {					
				if(this.id == 'popup_n'){
					$("#noticePopDate").hide();
				}else if(this.id == 'popup_y'){
					$("#noticePopDate").show();
				}					
			});		
			
			$('#partAll').change(function() {	
				if ($('#partAll').is(':checked')) {
					$('input[name="notic"]').each(function() { 
						this.checked = true; 
					});
					$('input[name="part"]').each(function() { 
						this.checked = true;						
						$('#'+this.id).prop("disabled", true)
					});
				}else{
					$('input[name="notic"]').each(function() { 
						this.checked = false; 
					});
					$('input[name="part"]').each(function() { 
						this.checked = false; 
						$('#'+this.id).removeAttr("disabled");
					});
				}							
			});
			
			$(document).off('change', 'input[name=part]').on('change', "input[name=part]", function(e) {
				var dataKey = this.value;
				if ($('#'+this.id).is(':checked')) {							
					$('input[name="notic"]').each(function() { 
						if(this.getAttribute("data-key") == dataKey){
							this.checked = true;
						}												 
					});
				}else{
					$('input[name="notic"]').each(function() { 
						if(this.getAttribute("data-key") == dataKey){
							this.checked = false;
						}												 
					});
				}
			});	
			
			$(document).off('change', 'input[name=notic]').on('change', "input[name=notic]", function(e) {
				
				checkBoxLength = $("[name=notic]").length;
				checkedLength = $("[name=notic]:checked").length;
				
				var dataKey = this.value;
				
				if(checkBoxLength != checkedLength){
					$('#partAll').prop("checked",false);										
					$('input[name="part"]').each(function() { 
						this.checked = false; 
						$('#'+this.id).removeAttr("disabled");
					});																
				}else{
					$('#partAll').prop("checked",true);					
					$('input[name="part"]').each(function() { 
						this.checked = true;						
						$('#'+this.id).prop("disabled", true)
					});							
				}							
			});		
			
		}
	}
	
	function project(data){		
		var html = "";
		$.each( data, function( i, data ) {			
			html += '<span class="mr10">';
			html += '<input type="checkbox" name="part" data-key="'+data.partCode+'" id="part'+data.partCode+''+i+'" value="'+data.partCode+'" class="k-checkbox">';
			html += '<label class="k-checkbox-label" for="part'+data.partCode+''+i+'">'+data.part+'</label>';
			html += '</span>';
		});
		$("#project").append(html);
			
	}
	function gongguProject(data){		
		$("#projectCount").text(data.length);
		var html = "";
		$.each( data, function( i, data ) {
			var checked = "";
			console.log("data.checked", data.checked);
			if(data.checked=="CHECKED"){
				checked = "checked";
			}
			
			html += '<li>';
			html += '<input type="checkbox" name="notic" data-key="'+data.tmoduleconfigSeqno+'" id="notice'+data.tmoduleconfigSeqno+''+i+'" value="'+data.tmoduleconfigSeqno+'" class="k-checkbox" '+checked+' >';
			html += '<label class="k-checkbox-label" for="notice'+data.tmoduleconfigSeqno+''+i+'">'+data.gongguNm+'</label>';
			html += '</li>';									
		});
		$("#projectGonggu").append(html);
		
	}
	
	var file = {
			getFiles : function(params) {
				var fileUrl = "/file/default?moduleconfigSeqno="+ params.moduleconfigSeqno+"&mstSeqno="+params.mstSeqno;
				if(params.fk1)
					fileUrl += "&fk1="+params.fk1;
				if(params.fk2)
					fileUrl += "&fk2="+params.fk2;
				if(params.fk3)
					fileUrl += "&fk3="+params.fk3;

				if(params.editable)
					fileUrl = fileUrl + "&mode=edit"; 
				
				UI.loadPage(fileUrl).done(function(html){
					$("#"+params.target+" .accordion_area").html(html);
				});
			},
			
			fileUpload : function(fileInputId) { // 파일업로드
				var _this = this;
				var dfd = new $.Deferred();
				var uploadFile = $("#"+fileInputId).data("kendoUpload");
				var method = "POST";
				var files = uploadFile.getFiles();
				var formData = new FormData();
				if(files.length == 0){  // 파일이 없을경우
					var responce = "";
					dfd.resolve(responce);
				}else{
					formData.append("moduleconfigSeqno", $("#moduleconfigSeqno").val());
					for(var i=0; i<files.length; i++){
						formData.append("files",files[i].rawFile);	
					}
					$.ajax({
						type : method,
						url : "/file",
						contentType: false,
						dataType:"text",
						processData: false,
						cache : false,
						data : formData,
						success : function(response, mode) {
							if(null != response && response.length > 0){
								dfd.resolve(response);
							}
						},
						error : function(e) {
							dfd.reject(e);
						}
					});
				}
				return dfd.promise();
			}
		};
	
	bbsEdit.init();

});