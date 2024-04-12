define(function() {
	var PdsRevison = function(elId, parent) {
		this.el = $('#' + elId);
		this.parent = parent;
		this.fileUploader;

		this.addEvent();
	}

	PdsRevison.prototype.addEvent = function() {
		var _this = this;

		// 저장버튼 클릭
		_this.el.on('click', 'a.btn_blue', function(e) {
			var $form = _this.el.find('form');
			var formData = $form.serializeObject();
			var gongguSeqno = $form.find('input[name=gongguSeqno]').val();

			if (_this.fileUploader.getFiles().length == 0) {
				kendo.alert('파일을 추가해주세요.');
				return;
			}

			var loader = UI.Loading.open();
			_this.fileUploader.upload(gongguSeqno).done(function(uuid) {
				formData['tempsavekey'] = uuid;
				formData['seqno'] = _this.parent.data.seqno;
				formData['grpKey'] = _this.parent.data.grpKey;
				formData['pdsmode'] = _this.parent.data.pdsmode;
				formData['tags'] = '';
				
				var tags = _this.el.find('[name=tags]').jsonTagEditor('getTags')[0].tags;
			    for (i = 0; i < tags.length; i++) { 
			    	if(i > 0) {
			    		formData['tags'] = formData['tags'] + ',';
			    	}
			    	formData['tags'] = formData['tags'] + tags[i].value; 
			    }

				_this.save(formData).done(function(data) {
					loader.close();
					kendo.alert('리비전 파일이 추가되었습니다.');
					_this.el.data("kendoWindow").close();
					_this.parent.refresh(data.seqno);
				});
			});
		});

		// 닫기버튼 클릭
		_this.el.on('click', 'a.btn_close', function(e) {
			_this.close();
		});
	}

	PdsRevison.prototype.open = function() {
		var _this = this;

		UI.Form.reset(_this.el.find('form'));
		
		if(_this.parent.data.pdsmode == 'F') {
			_this.fileUploader = UI.FileUploader(_this.el.find('input:file'), null, false);
		} else {
			_this.fileUploader = UI.FileUploader(_this.el.find('input:file'));
		}
		
		_this.fileUploader.reset();
		_this.el.find('textarea[name=contents]').val(Encoder.htmlDecode(_this.parent.data.contents));

		var _tags = [];
		$.each(_this.parent.data.commonTags, function(i, v) {
			_tags.push(v.tagvalue);
		});

		_this.el.find('[name=tags]').jsonTagEditor({
			initialTags: _tags,
			placeholder: '태그 입력 후 엔터를 누르세요.',
			beforeTagSave: function(field , editor, tags, tag, val) { // 중복태그 제거
				if (tags.filter(function(e) { return e.value === val; }).length > 0) {
					return false;
				}
			}
		});

		if (typeof _this.el.data('kendoWindow') === "undefined") {
			_this.el.kendoWindow({
				width: '560px',
				height: '',
				title: 'REV추가',
				modal: true,
				close: function() {
					_this.el.find('[name=tags]').jsonTagEditor('destroy');
				}
			}).data("kendoWindow").center().open();
		} else {
			_this.el.data("kendoWindow").refresh().open();
		}
	}

	PdsRevison.prototype.save = function(formData) {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds/rev/',
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
	}

	PdsRevison.prototype.close = function() {
		var _this = this;

		_this.el.find('[name=tags]').jsonTagEditor('destroy');
		_this.el.data('kendoWindow').close();
	}

	return PdsRevison;
});
