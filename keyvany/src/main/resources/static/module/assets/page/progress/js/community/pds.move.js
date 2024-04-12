define(function() {
	var PdsFolderSelector = function(elId, treeId) {
		this.el = $('#' + elId);
		this.treeEl = $('#' + treeId);
		this.parent = null;
		this.dataItems = [];
		this.init();
	}

	PdsFolderSelector.prototype.init = function() {
		var _this = this;

		// 저장버튼 클릭
		_this.el.on('click', 'a.btn_blue', function(e) {
			var selectNode = _this.treeEl.jstree('get_selected', true)[0];
			if (typeof selectNode === "undefined") {
				kendo.alert('폴더를 선택해 주세요.');
				return;
			}
			
			kendo.confirm('자료를 이동하시겠습니까?').done(function() {
				_this.save(selectNode.id).done(function() {
					kendo.alert('자료가 이동되었습니다.');
					_this.parent.refresh();
					_this.close();
				});
			});
		});

		// 닫기버튼 클릭
		_this.el.on('click', 'a.btn_close', function(e) {
			_this.close();
		});
	}

	// 자료이동
	PdsFolderSelector.prototype.save = function(classSeqno) {
		var _this = this;
		
		var _data = [];
		$.each(_this.dataItems, function(i, dataItem) {
			_data.push(dataItem.seqno);
		});

		var dfd = new $.Deferred();
		$.ajax({
			url : '/community/pds/' + classSeqno + '/classinfo',
			type : 'put',
			data : JSON.stringify(_data),
			contentType : 'application/json',
			success : function(data) {
				dfd.resolve(data);
			},
			error : function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}

	// 닫기
	PdsFolderSelector.prototype.close = function() {
		var _this = this;

		_this.el.data('kendoWindow').close();
	};

	PdsFolderSelector.prototype.setParent = function(parent) {
		this.parent = parent;
	};

	PdsFolderSelector.prototype.open = function(dataItems) {
		var _this = this;
		
		_this.dataItems = dataItems;
		
		if (typeof _this.el.data('kendoWindow') === "undefined") {
			_this.el.kendoWindow({
				width : "400px",
				modal : true,
				height : '',
				title : '자료이동',
			}).data("kendoWindow").center().open();
		} else {
			_this.el.data("kendoWindow").refresh().open();
		}

		_this.loadTree().done(function(treeData) {
			if (!_.isUndefined(treeData)) {
				var createJsDATA = _this.convert(treeData);
				_this.treeEl.jstree({
					core : {
						multiple : false,
						check_callback : true,
						themes : {
							stripes : true
						},
						data : createJsDATA
					},
					search : {
						case_insensitive : true,
						show_only_matches : true
					},
					plugins : [ 'search', 'wholerow' ]
				});
				
				_this.treeEl.jstree("deselect_all");
			}
		});

	}

	PdsFolderSelector.prototype.loadTree = function() {
		var _this = this;
		var dfd = new $.Deferred();
		$.ajax({
			url : '/community/pds/classinfo/movetarget',
			type : 'get',
			success : function(data) {
				dfd.resolve(data);
			},
			error : function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}

	PdsFolderSelector.prototype.convert = function(data) {
		var result = [];

		if (_.isArray(data) && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var folder = data[i];
				var _parent = (folder.glevel == 1) ? '#' : folder.parentSeqno;
				var _text = folder.className;
				if (folder.totalCount > 0) {
					if (folder.newCount > 0) {
						_text = folder.className + '<span>(' + folder.newCount
								+ '/' + folder.totalCount + ')</span>';
					} else {
						_text = folder.className + '<span>('
								+ folder.totalCount + ')</span>';
					}
				}

				var node = {
					id : folder.seqno,
					parent : _parent,
					text : folder.className,
					icon : 'icon_folder',
					state : {
						opened : (folder.glevel < 2)
					},
					a_attr : {
						glevel : folder.glevel,
						newCount : folder.newCount,
						totalCount : folder.totalCount
					}
				};

				result.push(node);
			}
		}

		return result;
	}

	return PdsFolderSelector;
});
