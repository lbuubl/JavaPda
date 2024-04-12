define(function() {
	var PdsTab = function(tabIndex, tabId, gridId, parent) {
		this.tabIndex = tabIndex;
		this.el = $('#' + tabId);
		this.gridEl = $('#' + gridId);
		this.parent = parent;
		this.grid = null;
		this.form = null;
		this.imageViewer = $('#img_popup_viewer');
		this.titleEditor = parent.titleEditor;
		this.folderSelector = parent.folderSelector;
		this.gongguSeqno = null,
		this.classSeqno = null;
		this.baseUrl = '';
		this.keyword = null;
		this.fileExt = null;
		this.data = [];

		var _this = this;

		this.el.on('click', '.func_area a', function(e) {
			_this.loadGrid();
		});

		this.el.on('keyup', '.func_area input[name=keyword]', function(key) {
			if (key.keyCode == 13) {
				_this.loadGrid();
			}
		});

		// 확장자 선택 콤포넌트 정의
		this.el.find('.func_area select[name=fileExt]').kendoMultiSelect({
			dataTextField: "ext",
			dataValueField: "ext",
			placeholder: "확장자",
			height: 300,
			autoClose: false,
		    tagMode: 'single',
			change: function() {
				_this.loadGrid();
			}
		});
		
		// AND,OR 선택 콤포넌트 정의
		this.el.find('.func_area input[name=keywordSeparator]').kendoDropDownList({
			autoWidth: true,
			dataSource: ["AND", "OR"],
			value: "AND"
		});
	}
	
	PdsTab.prototype.loadGrid = function() {
		var _this = this;
		_this.keyword = _this.el.find('input[name=keyword]').val();
		_this.fileExt = _this.el.find('.func_area select[name=fileExt]').data("kendoMultiSelect").value();
		_this.grid.load({
			'classSeqno': _this.classSeqno,
			'keyword': _this.el.find('input[name=keyword]').val(),
			'fileExt': _this.el.find('.func_area select[name=fileExt]').data("kendoMultiSelect").value(),
			'keywordSeparator': _this.el.find('.func_area input[name=keywordSeparator]').data("kendoDropDownList").value()
		});
	};
	
	PdsTab.prototype.loadFileExtList = function(classSeqno, keyword, fileExt) {
		var _this = this;
		
		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/pds/ext',
			type: 'get',
			data : {
				params: {
					classSeqno: classSeqno,
					keyword: keyword,
					fileExt: fileExt
				}
			},
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	};
	
	PdsTab.prototype.showPDF = function(file) {
		var _this = this;
		
		if (typeof _this.imageViewer.data('kendoWindow') === 'undefined') {
			_this.imageViewer.kendoWindow({
                modal: true,
                iframe: false,
                resizable: true,
                visible: false
            });
        }
		
		var height = window.innerHeight - 240;
        var width = height * 0.8;
        
		if (UI.isMobile) {
			height = window.innerHeight - 190;
			width = height * 0.8;
        }
		
		_this.imageViewer.find('div:eq(0)').empty();
		var $div = $('<div id="pdf-' + file.seqno + '" class="item">').appendTo(_this.imageViewer.find('div:eq(0)'));
		$div.css('height', height);
        
        var modalWidth = parseInt(width) + 50;
        var modalHeight = parseInt(height) + 120;

        _this.imageViewer.data('kendoWindow').setOptions({
            width: modalWidth,
            height: modalHeight,
            title: file.fsFilenm
        });
        
        _this.imageViewer.data('kendoWindow').center().open();

        //pdf view js처리
        var options = {
            pdfOpenParams: {
                navpanes: 0,
                toolbar: 0,
                statusbar: 0,
                view: "FitV",
                pagemode: "none"
            },
            forcePDFJS: true,
            PDFJS_URL: "/static/js/document/pdfjs/web/viewer.html"
        };

        var src = '/file/' + file.moduleconfigSeqno + '/' + file.seqno + '/' + file.fsFileseqno + '/download';
        var myPDF = PDFObject.embed(src, '#pdf-' + file.seqno, options);
	};
	
	PdsTab.prototype.showImage = function(file) {
		var _this = this;
		
		if (typeof _this.imageViewer.data('kendoWindow') === 'undefined') {
			_this.imageViewer.kendoWindow({
                modal: true,
                iframe: false,
                resizable: true,
                visible: false
            });
        }
		
		var height = parseInt(file.fsFileimgheight);
        var width = parseInt(file.fsFileimgwidth);
        var ratio = height / width;

        if (UI.isMobile) {
            if (height > window.innerHeight - 200 && height >= width) {
                height = window.innerHeight - 200
                width = height / ratio;

                if (width > window.innerWidth - 60) {
                    width = window.innerWidth - 60
                    height = width * ratio;
                }
            }

            if (width > window.innerWidth - 80 && width > height) {
                width = window.innerWidth - 80
                height = height * width / parseInt(file.fsFileimgwidth);

                if (height > window.innerHeight - 200) {
                    height = window.innerHeight - 200
                    width = height / ratio;
                }
            }
        } else {
            if (height > window.innerHeight - 240 && height > width) {
                height = window.innerHeight - 240
                width = height / ratio;

                if (width > window.innerWidth - 120) {
                    width = window.innerWidth - 120
                    height = width * ratio;
                }
            }

            if (width > window.innerWidth - 120 && width > height) {
                width = window.innerWidth - 120
                height = height * width / parseInt(file.fsFileimgwidth);

                if (height > window.innerHeight - 240) {
                    height = window.innerHeight - 240
                    width = height / ratio;
                }
            }
        }
        
        _this.imageViewer.find('div:eq(0)').empty();
		var $img = $('<img class="item" data-type="img" src="/file/' + file.moduleconfigSeqno + '/' + file.seqno + '/' + file.fsFileseqno + '/view" alt="' + file.fsFilenm + '">').appendTo(_this.imageViewer.find('div:eq(0)'));
		$img.attr('height', height);
		$img.attr('width', width);
		
		var modalWidth = parseInt(width) + 50;
        var modalHeight = parseInt(height) + 120;

        if (modalWidth < 250) {
            modalWidth = 250;
        }

        if (modalHeight < 190) {
            modalHeight = 190;
        }

        _this.imageViewer.data('kendoWindow').setOptions({
            width: modalWidth,
            height: modalHeight,
            title: file.fsFilenm
        });
        
        _this.imageViewer.data('kendoWindow').center().open();
	};
	
	PdsTab.prototype.setThumbnails = function() {
		var _this = this;

		var _thumbList = _this.el.find('.thumb_list > ul');

		_thumbList.empty();
		$.each(_this.data, function(i, file) {
			var $li = $('<li>').appendTo(_thumbList);
			var $a = $('<a>').attr('data-seqno', file.seqno).appendTo($li);
			if ($.inArray(file.fsFileext, ['jpg', 'jpeg', 'gif', 'png', 'bmp']) >= 0) {
				$a.addClass('img_crop');
				$a.on('click', function(e) {
					_this.showImage(file);
				});
				$('<img>').attr('src', '/file/' + file.moduleconfigSeqno + '/' + file.seqno + '/110/thumb').attr('alt', file.fsFilenm).appendTo($a);
			} else {
				$a.addClass('file_etc');
				if(file.fsFileext == 'pdf') {
					$a.on('click', function(e) {
						_this.showPDF(file);
					});
				}
				$('<img>').attr('src', '/static/img/icon_flile.png').attr('alt', file.fsFilenm).appendTo($a);
				$('<span class="text">' + file.fsFileext + '</span>').appendTo($a);
			}
			
			$a.on('click', function(e) {
				_this.el.find('.thumb_list > ul > li > a').removeClass('active');
				$(this).addClass('active');
				_this.grid.select($(this).attr('data-seqno'));
			});
		});
	};
	
	PdsTab.prototype.selectThumbnail = function(seqno) {
		var _this = this;
		
		_this.el.find('.thumb_list > ul > li > a').each(function(i, el) {
			if($(this).attr('data-seqno') == seqno) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});
	};

	PdsTab.prototype.load = function(classSeqno) {
		var _this = this;

		_this.classSeqno = classSeqno;
		
		var url = '/community/pds/comment/count/';
		if(typeof classSeqno === 'undefined') {
			url = url + '-1';
		} else {
			url = url + classSeqno;
		}
		
		$.ajax({
			url: url,
			type: 'get',
			success: function(data) {
				if(data > 0) {
					var $tabTitle = $('#tabmenus > ul > li:eq('+_this.tabIndex+') > a');
					if($tabTitle.find('.tab_new').length > 0) {
						$tabTitle.find('.tab_new').text(data);
					} else {
						$tabTitle.html($tabTitle.html()+'<span class="tab_new">'+data+'</span>');
					}
				}
			}
		});
		
		_this.loadGrid();
		
		_this.loadFileExtList(_this.classSeqno, _this.keyword, _this.fileExt).done(function(data) {
			var fileExtList = [];
			$.each(data, function(i, v) {
				fileExtList.push({
					'ext': v
				});
			});
			
			_this.el.find('.func_area select').getKendoMultiSelect().dataSource.data(fileExtList);
		});

		if (this.form) {
			_this.form.setClassSeqno(_this.classSeqno);
		}
	};

	PdsTab.prototype.setData = function(data) {
		var _this = this;

		_this.data = data;
		_this.setThumbnails();
	};
	
	PdsTab.prototype.reload = function() {
		var _this = this;

		_this.parent.reload();
	};
	
	PdsTab.prototype.refresh = function() {
		var _this = this;

		_this.parent.refresh();
	};
	
	// 그리드에서 이동 아이콘 클릭
	PdsTab.prototype.move = function(classSeqno) {
		var _this = this;

		_this.parent.move(classSeqno);
	};

	PdsTab.prototype.create = function(option) {
		var _this = this;
		
		_this.gongguSeqno = option.gongguSeqno;
		_this.classSeqno = option.classSeqno;
		
		var loader = new UI.LazyLoader('js');
		loader.get('community/pds.form.js?v1').then(function(form) {
			_this.form = new form(option.formId, _this);
			if (option.formId) {
				_this.form.init();
			}
		});
		
		loader.get('community/pds.grid.js').then(function(grid) {
			_this.grid = new grid({
				el: _this.gridEl,
				viewer: _this.parent.viewer,
				parent: _this
			});
			
			_this.grid.create(option.autoBind, option.movable);
			_this.load(option.classSeqno);
		});
		
		// 업로드
		_this.el.on('click', 'a.btn_popup_file_upload', function(e) {
			_this.form.open();
		});
		
		// 다운로드
		_this.el.on('click', '.bottom_area a.btn_download', function(e) {
			e.stopPropagation();
			
			var dataItems = [];
			dataItems = dataItems.concat(UI.Grid.getSelectRowData(_this.grid.el.data('kendoGrid')));
			if (UI.getBrowser() == 'msie') {
				if(dataItems.length == 1) {
					_this.grid.download(dataItems[0]);
				} else {
					var params = '';
					$.each(dataItems, function(i, dataItem) {
						if (i == 0) {
							params = '?seqno=' +dataItem.seqno;
						} else {
							params = params + '&seqno=' + dataItem.seqno;
						}
					});
					
					$.fileDownload('/community/pds/download' + params, {
						failCallback: function(html, url) {
							kendo.alert("다운로드 받을 수 없습니다.");
						}
					});
				}
			} else {
				$.each(dataItems, function(i, dataItem) {
					_this.grid.download(dataItem);
				});
			}
		});
		
		// 파일삭제
		_this.el.on('click', 'a.btn_delete', function(e) {
			kendo.confirm('선택한 파일을 삭제하시겠습니까?').done(function() {
				var dataItems = [];
				dataItems = dataItems.concat(UI.Grid.getSelectRowData(_this.grid.el.data('kendoGrid')));
				var checkedItems = $.grep(dataItems, function(data) {
					return data.editable == true;
				});
				if (checkedItems.length == 0) {
					kendo.alert('삭제 할 파일을 선택해 주세요.');
					return;
				}
				_this.grid.delete(checkedItems).done(function() {
					if(dataItems.length == checkedItems.length) {
						kendo.alert('삭제되었습니다.');
					} else {
						kendo.alert('삭제되었습니다.<br>※ 다른 사용자가 등록한 자료는 삭제할 수 없습니다.');
					}
					_this.parent.refresh();
				});
			});
		});
		
		// 파일명수정
		_this.el.on('click', 'a.btn_popup_filename_edit', function(e) {
			var dataItems = [];
			dataItems = dataItems.concat(UI.Grid.getSelectRowData(_this.grid.el.data('kendoGrid')));
			var checkedItems = $.grep(dataItems, function(data) {
				return data.editable == true;
			});
			if(checkedItems.length == 0) {
				kendo.alert('수정 할 파일을 선택해 주세요.');
				return;
			}

			_this.titleEditor.setParent(_this);
			_this.titleEditor.open(checkedItems);
		});
		
		// 자료이동
		_this.el.on('click', 'a.btn_popup_file_move', function(e) {
			var dataItems = [];
			dataItems = dataItems.concat(UI.Grid.getSelectRowData(_this.grid.el.data('kendoGrid')));
			var checkedItems = $.grep(dataItems, function(data) {
				return data.editable == true;
			});
			if(checkedItems.length == 0) {
				kendo.alert('이동 할 파일을 선택해 주세요.');
				return;
			}

			_this.folderSelector.setParent(_this);
			_this.folderSelector.open(checkedItems);
		});
		
		_this.imageViewer.on('click', 'a.btn_blue', function(e) {
			 _this.imageViewer.data('kendoWindow').close();
		});
	};

	return PdsTab;
});
