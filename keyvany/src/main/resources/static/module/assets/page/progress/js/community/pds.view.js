define(function() {
	var PdsViewer = function(elId) {
		this.el = $('#' + elId);
		this.seqno = null;
		this.viewer = [];
		this.revs = [];
		this.revEl = this.el.find('#revDropDown');
		this.viewerEl = this.el.find('select[name=viewObsCodes]');
		this.addRev = null;
		this.addRevEl = this.el.find('#popup_rev_add');
		this.data = {};
		this.grid;

		this.addEvent();
	}
	PdsViewer.prototype.setParent = function(parent) {
		this.parent = parent;
	}

	PdsViewer.prototype.addEvent = function() {
		var _this = this;

		_this.grid = $("#grid_dataroom_popup_detail").kendoGrid({
			selectable: true,
			autoBind: false
		});

		_this.grid.on('click', 'tbody > tr', function(e) {
			e.stopPropagation();

			if (_this.data.pdsmode == 'F') {

				var dataItem = _this.grid.data('kendoGrid').dataItem($(this).closest('tr'));
				_this.el.find('[name=tags]').jsonTagEditor('destroy');
				_this.setData(dataItem.seqno);
			}
		});

		_this.grid.on('click', 'a.btn_download', function(e) {
			e.stopPropagation();

			var dataItem = _this.grid.data('kendoGrid').dataItem($(this).closest('tr'));
			if (_this.data.pdsmode == 'F') {
				$.fileDownload('/file/' + dataItem.moduleconfigSeqno + '/' + dataItem.seqno + '/' + dataItem.fsFileseqno + '/download', {
					failCallback: function(html, url) {
						kendo.alert("다운로드 받을 수 없습니다.");
					}
				});
			} else if (_this.data.pdsmode == 'G') {
				$.fileDownload('/file/' + dataItem.moduleconfigSeqno + '/' + dataItem.mstSeqno + '/' + dataItem.seqno + '/download', {
					failCallback: function(html, url) {
						kendo.alert("다운로드 받을 수 없습니다.");
					}
				});
			}
		});

		// Rev 콤포넌트 정의
		if (typeof _this.revEl.data('kendoDropDownList') === "undefined") {
			_this.revEl.kendoDropDownList({
				autoWidth: true,
				dataTextField: 'name',
				dataValueField: 'seqno',
				dataBound: function(e) {
					_this.revEl.data('kendoDropDownList').value(_this.data.seqno);
				},
				change: function(e) {
					_this.el.find('[name=tags]').jsonTagEditor('destroy');
					_this.setData(this.value());
				}
			});
		}

		// 열람권한 콤포넌트 정의
		if (typeof _this.viewerEl.data('kendoMultiSelect') === "undefined") {
			_this.viewerEl.kendoMultiSelect({
				autoClose: true,
				dataTextField: "name",
				dataValueField: "obsCode"
			}).data("kendoMultiSelect");
		}

		// REV+버튼 클릭
		_this.el.find('a.btn_popup_rev_add').on('click', function(e) {
			_this.addRev.open();
		});

		// 열람권한 추가(viewUserType:1)
		_this.el.on('click', 'a.btn_popup_user', function(e) {
			UI.showObsModal({
				target: "popup_user",
				params: _this.viewer,
				callback: function(datas) {
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

		// 삭제버튼 클릭
		_this.el.find('a.btn_delete').on('click', function(e) {
			kendo.confirm('파일을 삭제하시겠습니까?').done(function() {
				_this.delete().done(function() {
					kendo.alert('삭제되었습니다.');
					_this.close();
					_this.parent.refresh();
				});
			});
		});

		// 저장버튼 클릭
		_this.el.find('a.btn_save').on('click', function(e) {
			var $form = _this.el.find('form');
			var formData = $form.serializeObject();
			var gongguSeqno = $form.find('input[name=gongguSeqno]').val();
			var validator = $form.kendoValidator().data("kendoValidator");

			if ($.isArray(formData.viewObsCodes)) {
				$.each(formData.viewObsCodes, function(i, v) {
					formData['viewObsCodes[' + i + '].obsCode'] = v;
				});
			} else {
				formData['viewObsCodes[0].obsCode'] = formData.viewObsCodes;
			}

			delete formData.viewObsCodes;

			formData['seqno'] = _this.seqno;
			formData['tags'] = '';
			var tags = _this.el.find('[name=tags]').jsonTagEditor('getTags')[0].tags;
			for (i = 0; i < tags.length; i++) {
				if (i > 0) {
					formData['tags'] = formData['tags'] + ',';
				}
				formData['tags'] = formData['tags'] + tags[i].value;
			}

			validator.validate();

			_this.save(formData).done(function() {
				kendo.alert('저장되었습니다.');
				_this.parent.refresh();
			});
		});

		// 다운로드 버튼 클릭
		_this.el.find('a.btn_download').on('click', function(e) {
			_this.download();
		});

		// 닫기 버튼 클릭
		_this.el.find('a.btn_close').on('click', function(e) {
			_this.close();
		});
	}

	// 열람권한 수정
	/*
	PdsViewer.prototype.updateAuthority = function(viewUserType) {
		var _this = this;
		
		var _data = [];
		$.each(_this.viewer, function(i, v) {
			_data.push(v.obsCode);
		});
		
		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/'+_this.seqno+'/authority/'+viewUserType,
			type: 'put',
			data: JSON.stringify(_data),
			contentType: 'application/json',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}
	*/

	// 파일정보 저장
	PdsViewer.prototype.save = function(formData) {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/' + _this.seqno,
			type: 'put',
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

	PdsViewer.prototype.load = function() {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/' + _this.seqno,
			type: 'get',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	};

	PdsViewer.prototype.delete = function() {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/' + _this.seqno,
			type: 'delete',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}

	PdsViewer.prototype.setData = function(seqno) {
		var _this = this;
		_this.seqno = seqno;
		_this.data = {};

		_this.load().done(function(data) {
			_this.data = data;

			if (_this.data.latest == true) {
				_this.el.find('a.btn_delete').show();
			} else {
				_this.el.find('a.btn_delete').hide();
			}

			if (_this.data.editable) {
				_this.el.find('a.btn_popup_user').show();
				_this.el.find('a.btn_delete ').show();
				_this.el.find('a.btn_popup_rev_add ').show();
				_this.el.find('a.btn_save ').show();
			} else {
				_this.el.find('a.btn_popup_user').hide();
				_this.el.find('a.btn_delete ').hide();
				_this.el.find('a.btn_popup_rev_add ').hide();
				_this.el.find('a.btn_save ').hide();
			}

			if (data.pdsmode == 'F') {
				$('#revDropDown').parent().hide();
				$('#revText').show();
			} else {
				$('#revDropDown').parent().show();
				$('#revText').hide();
			}

			UI.Form.reset(_this.el.find('form'));
			$('#revText').text(data.rev);
			_this.el.find('input[name=title]').val(Encoder.htmlDecode(data.title));
			_this.el.find('textarea[name=contents]').val(Encoder.htmlDecode(data.contents));
			_this.el.find('#writeNameDiv').text(data.writeName);
			_this.el.find('#writeDateDiv').text(data.writeDate);

			_this.revs = [];
			$.each(data.revs, function(i, v) {
				_this.revs.push({
					seqno: v.seqno,
					name: 'Rev ' + v.rev + '.'
				});
			});

			_this.revEl.data('kendoDropDownList').setDataSource(_this.revs);

			var _tags = [];
			$.each(data.commonTags, function(i, v) {
				_tags.push(v.tagvalue);
			});

			_this.el.find('[name=tags]').val('');
			_this.el.find('[name=tags]').jsonTagEditor({
				initialTags: _tags,
				placeholder: '태그 입력 후 엔터를 누르세요.',
				beforeTagSave: function(field, editor, tags, tag, val) { // 중복태그 제거
					if (tags.filter(function(e) {
							return e.value === val;
						}).length > 0) {
						return false;
					}
				}
			});

			_this.viewer = [];
			$.each(data.viewObsCodes, function(i, v) {
				_this.viewer.push({
					seqno: v.obsSeqno,
					obsCode: v.obsCode,
					name: v.obsNm
				});
			});

			_this.viewerEl.data('kendoMultiSelect').dataSource.data(_this.viewer);
			_this.viewerEl.data('kendoMultiSelect').value(_this.viewer);

			if (_this.data.pdsmode == 'F') {
				_this.grid.data('kendoGrid').setOptions({
					columns: [{
							field: "rev",
							title: "Rev",
							width: 50,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							field: "title",
							title: "파일명",
							width: 350,
							attributes: {
								"class": "text_left min_width_td"
							},
							headerAttributes: {
								"class": "text_center"
							},
							template: "<a href='javascript:;' class='btn_title' title='#: Encoder.htmlDecode(title) #'>#: Encoder.htmlDecode(title) #</a>"
						},
						{
							field: "fileSizeStr",
							title: "크기",
							width: 60,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							field: "fsFileext",
							title: "구분",
							width: 60,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							title: "받기",
							width: 60,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							},
							template: "<a href='javascript:;' class='btn_download'><i class='k-icon k-i-download'></i></a>"
						}
					]
				});
				_this.grid.data('kendoGrid').dataSource.data(_this.data.revs);
				$.each(_this.data.revs, function(i, v) {
					if (v.seqno == _this.seqno) {
						_this.grid.data('kendoGrid').select("tr:eq(" + i + ")");
					}
				});
			} else {
				_this.grid.data('kendoGrid').setOptions({
					columns: [{
							field: "fileNm",
							title: "파일명",
							width: 200,
							attributes: {
								"class": "text_left min_width_td"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							field: "fileSizeStr",
							title: "크기",
							width: 100,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							field: "ext",
							title: "구분",
							width: 60,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							}
						},
						{
							title: "받기",
							width: 60,
							attributes: {
								"class": "text_center"
							},
							headerAttributes: {
								"class": "text_center"
							},
							template: "<a href='javascript:;' class='btn_download'><i class='k-icon k-i-download'></i></a>"
						}
					]
				});
				_this.grid.data('kendoGrid').dataSource.data(_this.data.attachments);
			}
		});
	}

	PdsViewer.prototype.download = function() {
		var _this = this;

		if (_this.data.pdsmode == 'F') {
			$.each(_this.data.revs, function(i, v) {
				$.fileDownload('/file/' + v.moduleconfigSeqno + '/' + v.seqno + '/' + v.fsFileseqno + '/download', {
					failCallback: function(html, url) {
						kendo.alert("다운로드 받을 수 없습니다.");
					}
				});
			});
		} else if (_this.data.pdsmode == 'G') {
			$.each(_this.data.attachments, function(i, v) {
				$.fileDownload('/file/' + v.moduleconfigSeqno + '/' + v.mstSeqno + '/' + v.seqno + '/download', {
					failCallback: function(html, url) {
						kendo.alert("다운로드 받을 수 없습니다.");
					}
				});
			});
		}
	}

	PdsViewer.prototype.refresh = function(seqno) {
		var _this = this;
		_this.el.find('[name=tags]').jsonTagEditor('destroy');
		this.setData(seqno);
		this.parent.refresh();
	}

	PdsViewer.prototype.open = function(seqno, grpKey) {
		var _this = this;

		_this.setData(seqno);

		var loader = new UI.LazyLoader('js');
		loader.get('community/pds.comment.js').then(function(comment) {
			var comment = new comment('div_comment', grpKey, _this);
			comment.open();
		});

		if (typeof _this.el.data('kendoWindow') === "undefined") {
			_this.el.kendoWindow({
				width: "",
				height: "",
				title: "파일정보",
				modal: true,
				close: function() {
					_this.el.find('[name=tags]').jsonTagEditor('destroy');
				}
			}).data("kendoWindow").center().open();
			
			loader.get('community/pds.revision.js').then(function(revision) {
				_this.addRev = new revision('popup_rev_add', _this);
			});
		} else {
			_this.el.data("kendoWindow").refresh().open();
		}
	};

	PdsViewer.prototype.close = function() {
		var _this = this;

		_this.el.data('kendoWindow').close();
	}

	return PdsViewer;
});