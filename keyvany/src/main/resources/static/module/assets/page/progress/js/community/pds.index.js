
//스크롤 처리	
var thumPageGubun = "";

//페이지 이동후 처음 이나 마지막 썸네일을 클릭처리
function fn_firstLastThumClick(){
	var gubun = thumPageGubun;
	var activeTabNm = $("#tabmenus .ui-tabs-nav li.ui-tabs-active").attr("aria-controls");
	var oThumbList = $("#"+activeTabNm).find(".thumb_list");
			
	var arr_thumLi = oThumbList.find("li"); 
	/*
	추후 확장차 추가후 수정 필요...
	var arr_thumLi =  $(oThumbList).find("li").filter(function(){
		return $(this).attr("ext") == 'pdf' || ($(this).attr("ext") != 'pdf' && $(this).data("width") > 0)
	});
	*/	
		
	if (gubun == "next"){
		arr_thumLi.first().find("a").trigger( "click" );
		$(oThumbList).scrollTo(arr_thumLi.first());

	}else{
		arr_thumLi.last().find("a").trigger( "click" );
		$(oThumbList).scrollTo(arr_thumLi.last());
	}
	
	//스크롤 처리	
	thumPageGubun = "";	
}


$(document).ready(function() {
	var config = {
		gongguSeqno: $('div.data_room').attr('data-gongguseqno'),
		menuSeqno: $('div.data_room').attr('data-menuseqno'),
		el: $('#popup_setting_this'),
		baseUrl: '/community/pds/config/' + $('div.data_room').attr('data-gongguseqno'),
		loadConfig: function() {
			var _this = this;
			var dfd = new $.Deferred();
			$.ajax({
				url: _this.baseUrl,
				type: 'get',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		// 자료이동 루트폴더 목록 set
		setMoveFolders: function(folders) {
			var $parent = $('#popup_setting_this ul.data_root_folder');
			$parent.empty();

			$.each(folders, function(i, folder) {
				var $li = $('<li>').attr('data-seqno', folder.seqno).appendTo($parent);
				var $p = $('<p>').text(folder.sort).appendTo($li);
				var $span = $('<span class="btn micro">삭제</span>').appendTo($li);
				$span.on('click', function(e) {
					$(this).parent().remove();
				});
			});
		},
		enableMovement: function(movable) {
			var _this = this;

			if (movable) {
				_this.el.find('.input_list > ul > li:gt(0)').show();
			} else {
				_this.el.find('.input_list > ul > li:gt(0)').hide();
			}
		},
		addEvent: function() {
			var _this = this;

			// 설정 아이콘 클릭
			$('.btn_setting_this').on('click', function(e) {
				_this.loadConfig().done(function(data) {
					$('#rootClassSeqno').val(data.rootClassSeqno);
					$('#viewuserobscode').val(data.viewuserobscode);
					$('#distributeuserobscode').val(data.distributeuserobscode);
					$('input:radio[name=moveyn][value="' + data.moveyn + '"]').prop('checked', true);
					$('input:radio[name=movetargetrev][value="' + data.movetargetrev + '"]').prop('checked', true);
					$('#grid_popup_setting_root').data('kendoGrid').dataSource.data(data.rootFolders);
					$('#grid_popup_setting_authority').data('kendoGrid').dataSource.data(data.viewObsCodes);

					_this.enableMovement(data.moveyn);
					_this.setMoveFolders(data.moveFolders);
				});

				$('#popup_setting_this').kendoWindow({
					width: "640px",
					modal: true,
					height: '600px',
					iframe: true,
					title: "설정",
					visible: false
				});

				var popup = $('#popup_setting_this').data('kendoWindow');
				popup.open();
				popup.center();
			});

			// 루트폴더 추가버튼 클릭
			$('.btn_popup_setting_root_add').on('click', function(e) {
				var loader = new UI.LazyLoader('js');
				loader.get('modal/classInfo.js').then(function(tree) {
					var _window = $('#popup_setting_root_add');
					var _el = $('#tree_list_popup_setting_root_add');

					_window.kendoWindow({
						width: '480px',
						modal: true,
						height: '',
						title: '분류체계정보',
						close: function(e) {
							tree.destroy();
						}
					});

					_window.data('kendoWindow').open().center();
					_window.prop('confirm', null).off('confirm');
					_window.on('confirm', function(e, data) {
						_window.data('kendoWindow').close();

						var rootClassSeqnoValue = '';
						$.each(data.nodes, function(i, node) {
							if (rootClassSeqnoValue == '') {
								rootClassSeqnoValue = node.seqno;
							} else {
								rootClassSeqnoValue = rootClassSeqnoValue + ',' + node.seqno;
							}
						});

						$('#rootClassSeqno').val(rootClassSeqnoValue);
						$("#grid_popup_setting_root").data('kendoGrid').dataSource.data(data.nodes);
					});

					var param = [];
					$.each($("#grid_popup_setting_root").data('kendoGrid').dataSource.view(), function(i, data) {
						param.push(parseInt(data.seqno))
					});

					tree.create(_window, _el, _this.gongguSeqno, param);
				});
			});

			// 루트 폴더 삭제
			$('#grid_popup_setting_root').on('click', 'tbody tr a.btn.micro', function(e) {
				var tr = $(e.target).closest("tr");
				var grid = $("#grid_popup_setting_root").data("kendoGrid");
				grid.removeRow(tr);
			});

			// 기본 열람권한 추가버튼 클릭
			$('.btn_popup_setting_viewer_add').on('click', function(e) {
				var param = [];
				$.each($('#grid_popup_setting_authority').data('kendoGrid').dataSource.view(), function(i, obs) {
					param.push({
						seqno: obs.seqno,
						name: obs.obsName,
						obsCode: obs.obsCode,
						groups: obs.parentObsName
					})
				});

				UI.showObsModal({
					target: "popup_user",
					params: param,
					callback: function(datas) {
						var _datas = [];
						$.each(datas, function(i, data) {
							_datas.push({
								seqno: data.seqno,
								obsKind: (data.type) ? data.type.toUpperCase() : 'O',
								obsCode: data.obsCode,
								name: data.name,
								obsName: data.name,
								parentObsName: data.groups
							});
						});

						$('#grid_popup_setting_authority').data('kendoGrid').dataSource.data(_datas);
					}
				});
			});
			
			// 기본 열람권한 삭제
			$('#grid_popup_setting_authority').on('click', 'tbody tr a.btn.micro', function(e) {
				var tr = $(e.target).closest("tr");
				var grid = $("#grid_popup_setting_authority").data("kendoGrid");
				grid.removeRow(tr);
			});

			$('input:radio[name=moveyn]').on('change', function(e) {
				if (this.value == 'false') {
					_this.enableMovement(false);
				} else {
					_this.enableMovement(true);
				}
			});

			// 자료이동 루트폴더 추가버튼 클릭
			$('.btn_popup_setting_move_add').on('click', function(e) {
				var loader = new UI.LazyLoader('js');
				loader.get('modal/classInfo.js').then(function(tree) {
					var _window = $('#popup_setting_root_add');
					var _el = $('#tree_list_popup_setting_root_add');

					_window.kendoWindow({
						width: '480px',
						modal: true,
						height: '',
						title: '분류체계정보',
						close: function(e) {
							tree.destroy();
						}
					});

					_window.data('kendoWindow').open().center();
					_window.prop('confirm', null).off('confirm');
					_window.on('confirm', function(e, data) {
						_window.data('kendoWindow').close();
						_this.setMoveFolders(data.nodes);
					});

					var param = [];
					$.each($('#popup_setting_this ul.data_root_folder > li'), function(i, li) {
						param.push(parseInt($(this).attr('data-seqno')));
					});

					tree.create(_window, _el, _this.gongguSeqno, param);
				});
			});

			// 설정 window 닫기
			$('#btnCloseConfig').on('click', function(e) {
				$('#popup_setting_this').data('kendoWindow').close();
			});
			
			
			
			// 저장
			$('#btnSaveConfig').on('click', function(e) {
				// 루트폴더 정보 취합하여 ','로 구분된 문자열 생성
				var _view = $("#grid_popup_setting_root").data('kendoGrid').dataSource.view();
				var rootClassSeqno = '';
				$.each(_view, function(i, node) {
					if (rootClassSeqno == '') {
						rootClassSeqno = node.seqno;
					} else {
						rootClassSeqno = rootClassSeqno + ',' + node.seqno;
					}
				});
				$('#rootClassSeqno').val(rootClassSeqno);

				// 자료이동 루트폴더 정보 취합하여 ','로 구분된 문자열 생성
				var movetargetrootfolderseqno = '';
				$.each($('#popup_setting_this ul.data_root_folder > li'), function(i, li) {
					if (movetargetrootfolderseqno == '') {
						movetargetrootfolderseqno = $(this).attr('data-seqno');
					} else {
						movetargetrootfolderseqno = movetargetrootfolderseqno + ',' + $(this).attr('data-seqno');
					}
				});
				$('#movetargetrootfolderseqno').val(movetargetrootfolderseqno);

				// 기본 열람권한 정보 취합하여  ','로 구분된 문자열 생성
				var viewuserobscode = '';
				$.each($('#grid_popup_setting_authority').data('kendoGrid').dataSource.view(), function(i, obs) {
					if (viewuserobscode == '') {
						viewuserobscode = obs.obsCode;
					} else {
						viewuserobscode = viewuserobscode + ',' + obs.obsCode;
					}
				});
				$('#viewuserobscode').val(viewuserobscode);

				$("#configFrm").ajaxSubmit({
					url: '/community/pds/config/' + _this.gongguSeqno,
					success: function(resp, status) {
						kendo.alert("성공적으로 처리되었습니다.");
						if ($('input:radio[name=moveyn]:checked').val() == 'true') {
							$('a.btn_popup_file_move').show();
						} else {
							$('a.btn_popup_file_move').hide();
						}
						_this.close();
					}
				});
			});
									
			//이전, 다음
			$("#n, #p").on('click', function(e) {
				var gubun = e.target.id; //p:이전, n:다음
				var activeTabNm = $("#tabmenus .ui-tabs-nav li.ui-tabs-active").attr("aria-controls");
				var oThumbList = $("#"+activeTabNm).find(".thumb_list");
				var oActiveLi = oThumbList.find("ul li a.active").closest("li");
				
				if(gubun=="p"){
					var prevItem = oActiveLi.prev().find("a");
					if(prevItem.length > 0){
						prevItem.click();
						$(oThumbList).scrollTo(prevItem);
					}else{
						//이전페이지 있는지 체크하여 있으면 이동 후 마지막 아이템 클릭, 없으면 alert("이전이 없습니다.")
						if (! _this.getOtherThumPage("p")){
							kendo.alert("이전 파일이 없습니다.");
						}			
						return false;
					}
				}else{					
					var nextItem = oActiveLi.next().find("a");
					if(nextItem.length > 0){
						nextItem.click();
						$(oThumbList).scrollTo(nextItem);
					}else{
						//다음 페이지 있는지 체크하여 있으면 이동 후 처음 아이템 클릭, 없으면 alert("다음이 없습니다.")
						if (! _this.getOtherThumPage("n")){
							kendo.alert("다음 파일이 없습니다.");
						}			
						return false;												
					}
				}
				
				//grid_dataroom_tab
				var page = $("#grid_dataroom_tab2").data('kendoGrid').dataSource.page();
				var pageSize = $("#grid_dataroom_tab2").data('kendoGrid').dataSource.pageSize();
				var total = $("#grid_dataroom_tab2").data('kendoGrid').dataSource.total();			
				
			});
		},
		
		//썸네일 이전,다음 클릭시 이전,다음 페이지 존재 확인후 처리 
		getOtherThumPage: function(gubun){
			var activeTabNm = $("#tabmenus .ui-tabs-nav li.ui-tabs-active").attr("aria-controls");
			var gridNm = activeTabNm=="tabmenus-1" ? "grid_dataroom_tab" : "grid_dataroom_tab2";
			var grid = $("#"+gridNm).data("kendoGrid");
										
			//grid_dataroom_tab
			var page = $("#"+gridNm).data('kendoGrid').dataSource.page();
			var pageSize = $("#"+gridNm).data('kendoGrid').dataSource.pageSize();
			var total = $("#"+gridNm).data('kendoGrid').dataSource.total();
			var totalPage = Math.ceil(total/pageSize);
			
			//이전
			if(gubun=="p"){
				if(page == 1){	//이전페이지 없음
					return false;
				}else{
					//이전페이지 이동후 마지막 썸네일 클릭
					thumPageGubun = "prev";
					grid.dataSource.page(page-1);
					return true;
				}
			//다음				
			}else{
				if(page == totalPage){	//다음페이지 없음
					return false;
				}else{
					//다음페이지 이동후 처음 썸네일 클릭
					thumPageGubun = "next";
					grid.dataSource.page(page+1);
					return true;
				}
			}			
			
		},
		
		close: function() {
			$('#popup_setting_this').data('kendoWindow').close();
		},
		init: function() {
			var _this = this;

			// 설정 > 루트폴더 그리드
			$("#grid_popup_setting_root").kendoGrid({
				columns: [{
						field: "sort",
						title: "분류체계",
						width: "300px",
						attributes: {
							"class": "text_left"
						},
						headerAttributes: {
							"class": "text_center min_width_td"
						}
					},
					{
						field: "삭제",
						width: "68px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						},
						template: "<a href='javascript:;' class='btn micro'>삭제</a>"
					}
				]
			});

			// 설정 > 기본 열람권한 그리드
			$("#grid_popup_setting_authority").kendoGrid({
				dataBinding: function() {
					var datas = this.dataSource.data();
					$(datas).each(function(i, data) {
						data['name'] = data.obsName;

						if (data.obsCode.indexOf('M') != 0) {
							data['parentObsName'] = data.obsName;
							data['name'] = '*';
						}
					});
				},
				columns: [{
						field: "obsKind",
						title: "구분",
						width: "60px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						},
						template: function(dataItem) {
							var icon = "";
							if (dataItem.obsKind == 'O') {
								icon = 'icon_tree';
							} else if (dataItem.obsKind == 'C') {
								icon = 'icon_building';
							} else if (dataItem.obsKind == 'G') {
								icon = 'icon_folder';
							} else if (dataItem.obsKind == 'M') {
								icon = 'icon_user';
							}

							return "<i class='k-icon " + icon + "'></i>";
						}
					},
					{
						field: "parentObsName",
						title: "소속",
						width: "200px",
						attributes: {
							"class": "text_left"
						},
						headerAttributes: {
							"class": "text_center min_width_td"
						}
					},
					{
						field: "name",
						title: "이름",
						width: "100px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						}
					},
					{
						field: "삭제",
						width: "80px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						},
						template: "<a href='javascript:;' class='btn micro'>삭제</a>"
					}
				]
			});

			// 설정 > 기본 배포자 그리드
			$("#grid_popup_setting_publish").kendoGrid({
				dataBinding: function() {
					var datas = this.dataSource.data();
					$(datas).each(function(i, data) {
						data['name'] = data.obsName;

						if (data.obsCode.indexOf('M') != 0) {
							data['parentObsName'] = data.obsName;
							data['name'] = '*';
						}
					});
				},
				columns: [{
						field: "obsKind",
						title: "구분",
						width: "60px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						},
						template: function(dataItem) {
							var icon = "";
							if (dataItem.obsKind == 'O') {
								icon = 'icon_tree';
							} else if (dataItem.obsKind == 'C') {
								icon = 'icon_building';
							} else if (dataItem.obsKind == 'G') {
								icon = 'icon_folder';
							} else if (dataItem.obsKind == 'M') {
								icon = 'icon_user';
							}

							return "<i class='k-icon " + icon + "'></i>";
						}
					},
					{
						field: "parentObsName",
						title: "소속",
						width: "200px",
						attributes: {
							"class": "text_left"
						},
						headerAttributes: {
							"class": "text_center min_width_td"
						}
					},
					{
						field: "name",
						title: "이름",
						width: "100px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						}
					},
					{
						field: "삭제",
						width: "80px",
						attributes: {
							"class": "text_center"
						},
						headerAttributes: {
							"class": "text_center"
						},
						template: "<a href='javascript:;' class='btn micro'>삭제</a>"
					}
				]
			});

			_this.addEvent();

			_this.loadConfig().done(function(data) {
				if (data.moveyn) {
					$('a.btn_popup_file_move').show();
				} else {
					$('a.btn_popup_file_move').hide();
				}
			});
		}
	};

	var tree = {
		gongguSeqno: $('div.data_room').attr('data-gongguseqno'),
		selectNode: null,
		el: $('#tree_list'),
		baseUrl: '/community/pds/classinfo',
		tabIndex: 0,
		// 트리 조회
		loadTree: function() {
			var _this = this;
			var dfd = new $.Deferred();
			$.ajax({
				url: _this.baseUrl + '/' + _this.gongguSeqno,
				type: 'get',
				success: function(data) {
					dfd.resolve(data);
				},
				error: function(e) {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		// 트리 refresh
		refresh: function() {
			var _this = this;

			_this.loadTree().done(function(treeData) {
				if (!_.isUndefined(treeData)) {
					var createJsDATA = _this.convert(treeData);
					_this.el.jstree(true).settings.core.data = createJsDATA;
					_this.el.jstree(true).refresh();

					if (_this.selectNode) {
						var _node = $.grep(createJsDATA, function(n, i) {
							return n.id = _this.selectNode.id
						});

						if (_node.length > 0) {
							leftTab.load(_node[0].id, _node[0].text);
						}

						var totalCount = 0;
						var newCount = 0;
						$.each(treeData, function(i, v) {
							totalCount += v.totalCount;
							newCount += v.newCount;
						});

						rightTab.load(totalCount, newCount);
					} else {
						leftTab.load(createJsDATA[0].id, createJsDATA[0].text);

						var totalCount = 0;
						var newCount = 0;
						$.each(treeData, function(i, v) {
							totalCount += v.totalCount;
							newCount += v.newCount;
						});

						rightTab.load(totalCount, newCount);
					}
				}
			});
		},
		// 트리노드 선택
		select: function(id) {
			var _this = this;

			_this.tabIndex = 0;
			$("#tabmenus").tabs('option', 'active', 0);
			_this.el.jstree("deselect_all");
			_this.el.jstree("select_node", id);
		},
		// 탭선택
		selectTab: function(tabIndex, tabTitle) {
			var _this = this;

			_this.tabIndex = tabIndex;

			if (_this.tabIndex == 0 && _this.selectNode != null) {
				leftTab.load(_this.selectNode.id, _this.selectNode.text);
			}
		},
		addEvent: function() {
			var _this = this;

			// 트리 노드 클릭
			_this.el.on('select_node.jstree', function(e, data) {
				_this.selectNode = _this.el.jstree('get_selected', true)[0];

				var className = _this.selectNode.text;
				if (_this.selectNode.text.indexOf('<span') != -1) {
					className = _this.selectNode.text.substr(0, _this.selectNode.text.indexOf('<span'));
				}

				$('#className').val(Encoder.htmlDecode(className));
				_this.selectTab(_this.tabIndex, _this.selectNode.text);
			});

			// 트리 노드 이름수정
			_this.el.on('rename_node.jstree', function(e, data) {
				$.ajax({
					url: _this.baseUrl + '/' + _this.gongguSeqno + '/' + data.node.id,
					type: 'put',
					data: {
						className: Encoder.htmlDecode(data.text)
					},
					success: function(data) {
						kendo.alert('성공적으로 저장되었습니다.');
						_this.refresh();
					}
				});
			});

			$("#btnCloseTree").on("click", function(e) {
				UI.closeTree(_this.el);
			});

			$("#btnOpenTree").on("click", function(e) {
				UI.openTree(_this.el);
			});

			// 추가버튼 클릭
			$("#btnAddFolder").on("click", function(e) {
				if (_this.selectNode == null) {
					return;
				}

				kendo.confirm('"' + _this.selectNode.text + '" 하위에 폴더를 등록하시겠습니까?').done(function() {
					$.ajax({
						url: _this.baseUrl + '/' + _this.gongguSeqno,
						type: 'post',
						data: {
							className: $('#className').val(),
							parentSeqno: (_this.selectNode.id == 0) ? null : _this.selectNode.id
						},
						success: function(data) {
							_this.refresh();
						}
					});
				});
			});

			// 저장버튼 클릭
			$("#btnSaveFolder").on("click", function(e) {
				if (_this.selectNode == null) {
					return;
				}

				kendo.confirm('폴더명을 수정하시겠습니까?').done(function() {
					$.ajax({
						url: _this.baseUrl + '/' + _this.gongguSeqno + '/' + _this.selectNode.id,
						type: 'put',
						data: {
							className: $('#className').val(),
						},
						success: function(data) {
							_this.refresh();
						}
					});
				});
			});

			// 삭제버튼 클릭
			$("#btnDelFolder").on("click", function(e) {
				var _seqno = _this.el.jstree().get_selected();

				if (_seqno.length > 0) {
					var _target = _this.el.jstree('get_node', _seqno, false);
					var _parentNode = _this.el.jstree('get_node', _target.parent, false);

					if (_target.children.length) {
						kendo.alert("하위 폴더가 존재합니다.");
					} else {
						kendo.confirm("선택한 폴더를 삭제하시겠습니까?").then(function() {
							$.ajax({
								url: _this.baseUrl + '/' + _this.gongguSeqno + '/' + _seqno[0],
								type: 'delete',
								success: function(data) {
									kendo.alert("삭제되었습니다.");
									_this.refresh();
									_this.el.jstree('select_node', _target.parent);
								}
							});
						});
					}

				}
			});

			// 탭 클릭
			$("#tabmenus > ul:eq(0) > li").on("click", function(e) {
				_this.selectTab($(this).index());
			});
		},
		//jstree data로  변환
		convert: function(data) {
			var result = [];

			if (_.isArray(data) && data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var folder = data[i];
					var _parent = (folder.glevel == 1) ? '#' : folder.parentSeqno;
					var _text = folder.className;
					if (folder.totalCount > 0) {
						if (folder.newCount > 0) {
							_text = folder.className + '<span>(' + folder.newCount + '/' + folder.totalCount + ')</span>';
						} else {
							_text = folder.className + '<span>(' + folder.totalCount + ')</span>';
						}
					}

					var node = {
						id: folder.seqno,
						parent: _parent,
						text: Encoder.htmlDecode(_text),
						icon: 'icon_folder',
						state: {
							opened: (folder.glevel < 2)
						},
						a_attr: {
							glevel: folder.glevel,
							newCount: folder.newCount,
							totalCount: folder.totalCount
						}
					};

					result.push(node);
				}
			}

			return result;
		},
		init: function() {
			var _this = this;

			this.addEvent();

			_this.loadTree().done(function(treeData) {
				if (!_.isUndefined(treeData)) {
					var createJsDATA = _this.convert(treeData);
					_this.el.jstree({
						core: {
							multiple: false,
							check_callback: true,
							themes: {
								stripes: true
							},
							data: createJsDATA
						},
						search: {
							case_insensitive: true,
							show_only_matches: true
						},
						plugins: ['search', 'wholerow']
					});

					initTab(createJsDATA);
				}
			});

			UI.addTreeSearch(_this.el, $('#treeSearch'));
		},
	};

	var initTab = function(treeData) {
		var loader = new UI.LazyLoader('js');
		loader.get('community/pds.rename.js', 'community/pds.move.js', 'community/pds.view.js').then(function(editor, selector, viewer) {
			var titleEditor = new editor('popup_filename_edit');
			var folderSelector = new selector('popup_file_move', 'popup_file_move_tree_list');
			var viewer = new viewer('popup_file_detail_view');

			leftTab.init(treeData[0].id, treeData[0].text, titleEditor, folderSelector, viewer);

			var totalCount = 0;
			var newCount = 0;
			$.each(treeData, function(i, v) {
				totalCount += v.a_attr.totalCount;
				newCount += v.a_attr.newCount;
			});

			rightTab.init(totalCount, newCount, titleEditor, folderSelector, viewer);
		});
	}

	var leftTab = {
		gongguSeqno: $('div.data_room').attr('data-gongguseqno'),
		classSeqno: null,
		tab: null,
		titleEditor: null,
		folderSelector: null,
		viewer: null,
		load: function(classSeqno, tabTitle) {
			var _this = this;

			$('#tabmenus > ul > li:eq(0) > a').html(tabTitle);

			_this.classSeqno = classSeqno;
			_this.tab.load(_this.classSeqno);
		},
		reload: function() {
			// 현재탭을 reload
			var _this = this;
			_this.tab.load(_this.classSeqno);
		},
		refresh: function() {
			// tree 및 탭 reload
			tree.refresh();
		},
		init: function(classSeqno, tabTitle, titleEditor, folderSelector, viewer) {
			var _this = this;

			_this.classSeqno = classSeqno;
			_this.titleEditor = titleEditor;
			_this.folderSelector = folderSelector;
			_this.viewer = viewer;
			$('#tabmenus > ul > li:eq(0) > a').html(tabTitle);

			var loader = new UI.LazyLoader('js');
			loader.get('community/pds.tab.js?v1').then(function(tab) {
				_this.tab = new tab(0, 'tabmenus-1', 'grid_dataroom_tab', _this);
				_this.tab.create({
					autoBind: false,
					movable: false,
					gongguSeqno: _this.gongguSeqno,
					classSeqno: classSeqno,
					formId: 'popup_file_upload',
					baseUrl: '/community/pds'
				})
			});
		}
	};

	var rightTab = {
		gongguSeqno: $('div.data_room').attr('data-gongguseqno'),
		tab: null,
		viewer: null,
		load: function(totalCount, newCount, titleEditor) {
			var _this = this;

			var _title = '전체';
			if (totalCount > 0) {
				if (newCount > 0) {
					_title = _title + '(' + newCount + '/' + totalCount + ')';
				} else {
					_title = _title + '(' + totalCount + ')';
				}
			}

			$('#tabmenus > ul > li:eq(1) > a').html(_title);
			_this.tab.load();
		},
		reload: function() {
			// 현재탭을 reload
			var _this = this;
			_this.tab.load();
		},
		refresh: function(classSeqno) {
			// tree 및 탭 reload
			tree.refresh();
		},
		move: function(classSeqno) {
			// 트리메뉴 선택
			tree.select(classSeqno);
		},
		init: function(totalCount, newCount, titleEditor, folderSelector, viewer) {
			var _this = this;

			_this.titleEditor = titleEditor;
			_this.folderSelector = folderSelector;
			_this.viewer = viewer;

			var _title = '전체';
			if (totalCount > 0) {
				if (newCount > 0) {
					_title = _title + '(' + newCount + '/' + totalCount + ')';
				} else {
					_title = _title + '(' + totalCount + ')';
				}
			}

			$('#tabmenus > ul > li:eq(1) > a').html(_title);

			var loader = new UI.LazyLoader('js');
			loader.get('community/pds.tab.js?v1').then(function(tab) {
				_this.tab = new tab(1, 'tabmenus-2', 'grid_dataroom_tab2', _this);
				_this.tab.create({
					autoBind: true,
					movable: true,
					gongguSeqno: _this.gongguSeqno,
					baseUrl: '/community/pds'
				});
			});
		}
	};

	config.init();
	tree.init();
	$("#tabmenus").tabs();
});
