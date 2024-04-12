define(function() {
	var PdsUploadForm = function(elId, parent) {
		this.el = $('#' + elId);
		this.parent = parent;
		this.gongguSeqno = parent.gongguSeqno;
		this.classSeqno = parent.classSeqno;
		this.fileUploader;
		this.viewerEl;
		this.viewer = [];
	}
	
	PdsUploadForm.prototype.setClassSeqno = function(classSeqno) {
		var _this = this;
		_this.classSeqno = classSeqno;
	};
	
	PdsUploadForm.prototype.upload = function(formData) {
		var _this = this;
		
		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds',
			type: 'post',
			data: formData,
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	};
	
	PdsUploadForm.prototype.loadConfig =  function() {
		var _this = this;
		
		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds/config/' + _this.gongguSeqno,
			type: 'get',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}
	
	PdsUploadForm.prototype.init = function() {
		var _this = this;
		
		_this.viewerEl = _this.el.find('select');
		_this.viewerEl.kendoMultiSelect({
			autoClose: false,
			dataTextField: "name",
			dataValueField: "obsCode"
		}).data('kendoMultiSelect');
		
		_this.fileUploader = UI.FileUploader(_this.el.find('input:file'));
		
		_this.el.find('input:radio[name="pdsmode"]').on('change', function(e) {
			if($(this).val() == 'F') {
				_this.el.find('.input_list > ul > li:eq(1)').hide();
			} else {
				_this.el.find('.input_list > ul > li:eq(1)').show();
			}
		});
		
		_this.el.find('[name=tags]').jsonTagEditor({ 
			initialTags: []
			, placeholder: '태그 입력 후 엔터를 누르세요.'
			, beforeTagSave: function(field , editor, tags, tag, val) { // 중복태그 제거
				if (tags.filter(function(e) { return e.value === val; }).length > 0) {
					return false;
				}
			}
		});
		
		// 열람권한 추가
		_this.el.on('click', 'a.btn_popup_user', function(e) {
			UI.showObsModal({
				target : "popup_user",
				params : _this.viewer, 
				callback : function(datas) {
					_this.viewerEl.empty();
					_this.viewer = [];
					
					$.each(datas, function(i, data) {
						_this.viewer.push({
							seqno: data.seqno,
							obsCode: data.obsCode,
							name: data.name
						});
					});			
					
					_this.viewerEl.data('kendoMultiSelect').dataSource.data(datas);
					_this.viewerEl.data('kendoMultiSelect').value(_this.viewer);
				}
			});
		});
		
		// 저장버튼 클릭
		_this.el.on('click', 'a.btn_save', function(e) {
			var $form = _this.el.find('form');
			var formData = $form.serializeObject(); 
			var validator = $form.kendoValidator().data("kendoValidator");
			
			/*
			if($.isArray(formData.viewObsCodes)) {
				$.each(formData.viewObsCodes, function(i, v) {
					formData['viewObsCodes['+i+'].obsCode'] = v;
				});
			} else {
				formData['viewObsCodes[0].obsCode'] = formData.viewObsCodes;
			}
			
			delete formData.viewObsCodes;
			*/
			
			formData['tags'] = '';
			var tags = _this.el.find('[name=tags]').jsonTagEditor('getTags')[0].tags;
		    for (i = 0; i < tags.length; i++) { 
		    	if(i > 0) {
		    		formData['tags'] = formData['tags'] + ',';
		    	}
		    	formData['tags'] = formData['tags'] + tags[i].value; 
		    }
			if(_this.fileUploader.getFiles().length == 0) {
				kendo.alert('파일을 추가해주세요.');
				return;
			}
			
			if(formData['pdsmode'] == 'G') {				
				if(!validator.validate()){
					return false;
				}
			}
			
			var loader = UI.Loading.open();
			_this.fileUploader.upload(_this.gongguSeqno).done(function(uuid){
				formData['tempsavekey'] = uuid;
				formData['gongguSeqno'] = _this.gongguSeqno;
				formData['classSeqno'] = _this.classSeqno;
				
				_this.upload(formData).done(function() {
					loader.close();
					kendo.alert('저장되었습니다.');	
					_this.el.data("kendoWindow").close();
					_this.parent.refresh(_this.classSeqno);
				});
			});					
		
		});
		
		// 닫기 버튼 클릭
		_this.el.on('click', 'a.btn_close', function(e) {
			_this.el.data('kendoWindow').close();
		});
	};

	PdsUploadForm.prototype.open = function() {
		var _this = this;
		
		_this.viewer = [];
		UI.Form.reset(_this.el.find('form'));
		_this.el.find('form')[0].reset();
		_this.el.find('.input_list > ul > li:eq(1)').hide();
		
		var tags = _this.el.find('[name=tags]').jsonTagEditor('getTags')[0].tags;
	    for (i = 0; i < tags.length; i++) { 
	    	_this.el.find('[name=tags]').jsonTagEditor('removeTag', tags[i].value); 
	    }
		
		if(typeof _this.el.data('kendoWindow') === "undefined") {
			_this.el.kendoWindow({
				width: '640px',
				modal: true,
				height: '',
				title: '자료 업로드',
			}).data("kendoWindow").center().open();
		} else {
			_this.el.data("kendoWindow").refresh().open();
		}
		
		/*
		_this.loadConfig().done(function(config) {
			$.each(config.viewObsCodes, function(i, v) {
				_this.viewer.push({
					seqno: v.seqno,
					obsCode: v.obsCode,
					name: v.obsName
				});
			});
			
			_this.viewerEl.data('kendoMultiSelect').dataSource.data(_this.viewer);
			_this.viewerEl.data('kendoMultiSelect').value(_this.viewer);
		});
		*/
	}
	
	return PdsUploadForm;
});