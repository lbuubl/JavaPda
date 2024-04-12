define(function() {
	var PdsGrid = function(option) {
		this.el = option.el;
		this.parent = option.parent;
		this.gongguSeqno = option.parent.gongguSeqno;
		this.viewer = option.viewer;
		this.classSeqno = null;
		this.keyword = '';
		this.keywordSeparator = 'AND';
		this.fileExt = [];
	}

	PdsGrid.prototype.load = function(option) {
		var _this = this;

		_this.classSeqno = option.classSeqno;
		_this.keyword = option.keyword;
		_this.keywordSeparator = option.keywordSeparator;
		_this.fileExt = option.fileExt;
		_this.el.data('kendoGrid').dataSource.page(0);
	};
	
	PdsGrid.prototype.reload = function() {
		var _this = this;
		
		_this.el.data('kendoGrid').dataSource.read();
	};
	
	PdsGrid.prototype.refresh = function() {
		var _this = this;
		
		_this.parent.refresh();
	};

	PdsGrid.prototype.download = function(dataItem) {
		if (dataItem.pdsmode == 'F') {
			$.fileDownload('/file/' + dataItem.moduleconfigSeqno + '/' + dataItem.seqno + '/' + dataItem.fsFileseqno + '/download', {
				failCallback: function(html, url) {
					kendo.alert("다운로드 받을 수 없습니다.");
				}
			});
		} else if (dataItem.pdsmode == 'G') {
			$.fileDownload('/file/' + dataItem.moduleconfigSeqno + '/' + dataItem.seqno + '/all', {
				failCallback: function(html, url) {
					kendo.alert("다운로드 받을 수 없습니다.");
				}
			});
		}
	}

	PdsGrid.prototype.delete = function(dataItems) {
		var _data = [];
		$.each(dataItems, function(i, dataItem) {
			_data.push(dataItem.seqno);
		});

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds',
			type: 'delete',
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

	PdsGrid.prototype.select = function(seqno) {
		var _this = this;

		var item = _this.el.data("kendoGrid").dataSource.get(seqno);
		_this.el.find('td').removeClass('k-state-selected');
		var $tr = $("[data-uid='" + item.uid + "']", _this.el);
		$tr.find('td').addClass('k-state-selected');
	};

	PdsGrid.prototype.create = function(autoBind, movable) {
		var _this = this;

		_this.el.on('click', 'a.btn_popup_file_detail', function(e) {
			var dataItem = _this.el.data("kendoGrid").dataItem($(this).closest('tr'));

			_this.viewer.setParent(_this);
			_this.viewer.open(dataItem.seqno, dataItem.grpKey);
		});

		// 그리드 파일 다운로드 아이콘 클릭
		_this.el.on('click', 'a.btn_download', function(e) {
			var dataItem = _this.el.data("kendoGrid").dataItem($(this).closest('tr'));
			_this.download(dataItem);
		});
		
		// 그리드 이동 아이콘 클릭
		// 선택한 자료의 분류체계로 이동
		_this.el.on('click', 'a.btn_move', function(e) {
			var dataItem = _this.el.data("kendoGrid").dataItem($(this).closest('tr'));
			_this.parent.move(dataItem.classSeqno);
		});

		// 그리드 row 클릭
		_this.el.on('click', 'tr', function(e) {
			var dataItem = _this.el.data("kendoGrid").dataItem($(this));
			_this.el.find('td').removeClass('k-state-selected');
			$(this).find('td').addClass('k-state-selected');

			_this.parent.selectThumbnail(dataItem.seqno);
		});

		_this.el.kendoGrid({
			autoBind: autoBind,
			columns: [{
					title: "번호",
					width: 60,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					},
					sortable: false,
					template: "#= rownum-- #"
				},
				{
					selectable: true,
					width: 40,
					sortable: false,
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
					width: 200,
					attributes: {
						"class": "text_left min_width_td"
					},
					headerAttributes: {
						"class": "text_center"
					},
					template: "<a href='javascript:;' class='btn_popup_file_detail' title='#: Encoder.htmlDecode(title) #'>#: Encoder.htmlDecode(title) #</a>"
				},
				{
					field: "fsFileext",
					title: "유형",
					sortable: false,
					width: 80,
					attributes: {
						"class": "text_center"
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
					field: "writeName",
					title: "작성자",
					width: 100,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					}
				},
				{
					field: "writeDate",
					title: "작성일",
					width: 100,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					}
				},
				{
					field: "rev",
					title: "REV",
					sortable: false,
					width: 80,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					}
				},
				{
					field: "move",
					title: "이동",
					hidden: (!movable),
					sortable: false,
					width: 80,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					},
					template: "<a href='javascript:;' class='btn_move'><i class='k-icon k-i-arrow-right'></i></a>"
				},
				{
					field: "받기",
					width: 80,
					sortable: false,
					attributes: {
						"class": "text_center"
					},
					headerAttributes: {
						"class": "text_center"
					},
					template: "<a href='javascript:;' class='btn_download'><i class='k-icon k-i-download'></i></a>"
				}
			],
			dataBinding: function() {
				rownum = (this.dataSource.total() - (this.dataSource.page() - 1) * this.dataSource.pageSize());
			},
			dataBound: function(e) {
				_this.parent.setData(this.dataSource.data());
				
				//썸네일 페이징이동으로 온 경우 처리				
				if(thumPageGubun != ""){
					fn_firstLastThumClick();	
				}
			},
			dataSource: {
				transport: {
					read: '/community/companyPds/',
					dataType: "json",
					parameterMap: function(data) {
						var serverUrlParams = {
							size: data.pageSize,
							page: data.page = data.page - 1
						};
						serverUrlParams.params = {};
						if (_this.classSeqno) {
							serverUrlParams.params.classSeqno = _this.classSeqno;
						}
						if (_this.fileExt.length > 0) {
							for (var i = 0; i < _this.fileExt.length; i++) {
								if (i == 0) {
									serverUrlParams.params.fileExt = _this.fileExt[i];
								} else {
									serverUrlParams.params.fileExt = serverUrlParams.params.fileExt + ',' + _this.fileExt[i];
								}
							}
						}
						serverUrlParams.gongguSeqno = _this.gongguSeqno;
						serverUrlParams.keyword = $.trim(_this.keyword);
						serverUrlParams.params.keywordSeparator = $.trim(_this.keywordSeparator);

						if (data.sort && data.sort.length > 0)
							serverUrlParams.sort = data.sort[0].field + '.' + data.sort[0].dir;


						return serverUrlParams;
					}
				},
				schema: {
					data: 'data',
					total: 'total',
					schema: {
						model: {
							id: 'seqno'
						}
					}
				},
				serverPaging: true,
				serverSorting: true,
				pageSize: UI.getGridPageSize(540)
			},
			noRecords: UI.Grid.NoRecordTemplate,
			sortable: true,
			pageable: {
				pageSizes: UI.getGridPageSizes(540),
				buttonCount: 3,
			}
		});
	};

	return PdsGrid;
});
