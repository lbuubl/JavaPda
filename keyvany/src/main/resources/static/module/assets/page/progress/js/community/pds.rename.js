define(function() {
	var PdsNameEditor = function(elId) {
		this.el = $('#' + elId);
		this.parent = null;
		this.grid = null;
		this.init();
	};
	
	PdsNameEditor.prototype.setParent = function(parent) {
		this.parent = parent;
	};

	PdsNameEditor.prototype.open = function(dataItems) {
		var _this = this;

		if (typeof _this.el.data('kendoWindow') === "undefined") {
			_this.el.kendoWindow({
				width: "560px",
				modal: true,
				height: '',
				title: '파일명 수정',
			}).data("kendoWindow").center().open();
		} else {
			_this.el.data("kendoWindow").refresh().open();
		}

		_this.grid.data('kendoGrid').dataSource.data(dataItems);
		_this.el.find('input:checkbox').prop('checked', true);
	};

	PdsNameEditor.prototype.save = function(_data) {
		var _this = this;
		
		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/title',
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
	};

	PdsNameEditor.prototype.close = function() {
		var _this = this;

		_this.el.data('kendoWindow').close();
	};

	PdsNameEditor.prototype.init = function() {
		var _this = this;

		_this.grid = $("#grid_filename_edit").kendoGrid({
			dataBound: function(e) {
                var grid = this;
                var rows = grid.items();

                $(rows).each(function(e) {
                	 grid.select(this);
                });
            },
			columns: [{
					selectable: true,
					width: '50px',
					attributes: {
						'class': 'text_center'
					},
					headerAttributes: {
						'class': 'text_center'
					}
				},
				{
					field: 'title',
					title: '파일명',
					width: '200px',
					attributes: {
						'class': "text_left"
					},
					headerAttributes: {
						'class': "text_center min_width_td"
					},
					template: "<label class='i_input'><input type='text' name='title' class='k-textbox w100' data-seqno='#:seqno#' value='#: title #'></label>"
				},
				{
					field: 'writeDate',
					title: "작성일",
					width: "100px",
					attributes: {
						'class': 'text_center'
					},
					headerAttributes: {
						'class': 'text_center'
					}
				},
				{
					field: 'fsFileext',
					title: "유형",
					width: "60px",
					attributes: {
						'class': 'text_center'
					},
					headerAttributes: {
						'class': 'text_center'
					}
				}
			]
		});
		
		_this.el.on('click', 'a.btn_blue', function(e) {
			var _data = [];
			var dataItems = [];
			dataItems = dataItems.concat(UI.Grid.getSelectRowData(_this.grid.data('kendoGrid')));
			
			if(dataItems.length == 0) {
				kendo.alert('수정 할 파일을 선택해 주세요.');
				return;
			}
			
			$.each(dataItems, function(i, dataItem) {
				_data.push({
					'seqno': dataItem.seqno,
					'title': $('input[data-seqno='+dataItem.seqno+']').val()
				});
			});
			
			kendo.confirm('수정하시겠습니까?').then(function() {
				_this.save(_data).done(function() {
					kendo.alert('수정되었습니다.');
					_this.parent.reload();
					_this.close();
				});
			});
		});

		_this.el.on('click', 'a.btn_close', function(e) {
			_this.close();
		});
	};


	return PdsNameEditor;
});
