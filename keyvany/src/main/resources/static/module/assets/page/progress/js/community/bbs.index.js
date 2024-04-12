$(document).ready(function() {	
	var bbsGrid = {	
		elements:{},		
        init : function (){
        	var _this = this;	        	
        	_this.elements.settingBool = $('#settingBool').val();
			_this.elements.grid = _this.createGrid();
			_this.createPop();			
			_this.addEvent();					
        },
        createGrid: function(){
			var _this = this;
			var $grid = $('#grid_bbs_list');
	        var dataSource = new kendo.data.DataSource({
	        	autoBind: true,
	        	transport: {
	                read: '/community/bbs', 
	                dataType: 'json', 
	                parameterMap: function (data) {
						var serverUrlParams = {
							size: data.pageSize,
							page: data.page = data.page - 1
			            };

	                    if (data.sort && data.sort.length > 0) {
	                    	serverUrlParams.sort = data.sort[0].field + '.' + data.sort[0].dir;
	                    }
	                        
						var $form = $('#filterForm');
			            var formData = UI.Validator($form).value();
						serverUrlParams.params = formData;
		            	return serverUrlParams;
		          	}
	            },
	            schema: {
	            	data: 'data',
	            	total: 'total',
	                model: {
	                	id: 'seqno',
	                    fields: {	                    	
	                    	tGongguSeqno: { type: 'string' },
	                    	bbsTitle: { type: 'string' },
	                    	writeDate: { type: 'date' },		
	                    	rankstep: { type: 'string' },
	                    	writeName: { type: 'string' }	                    		                    	
	                    }
	                }
	            },
	            serverPaging: true,
	            serverSorting: true,
	            pageSize: 10
	        });

			kendo.culture('ko-KR');
			
			var _grid = $grid.kendoGrid({
				columns: [{ title: "No", width: "80px",
					  attributes: { "class": "text_center" },
					  headerAttributes: { "class": "text_center" },
					  sortable:false,
					  template: '#= rownum-- #'
					},
					{ field:"bbsTitle", title: "제목", width: "300px",
					  attributes: { "class": "text_left min_width_td" },
					  headerAttributes: { "class": "text_center" },
					  template: function(dataItem) {
						  var spacing = "";
						  var reCount = "";
						  for (var i = 1; i <= dataItem.rankstep; i++) {
							  spacing += '&nbsp;&nbsp;';												  
						  }
						  if(dataItem.rankstep != 0){
							  spacing += "<i class='icons19 ic_subdirectory_arrow_right_black'></i>";
						  }		
						  if(dataItem.reCnt > 0 ){
							 reCount = ' <span class="tab_new">'+dataItem.reCnt+'</span>'; 
						  }						  						  
					      return spacing +kendo.htmlEncode(dataItem.bbsTitle) + reCount;
					    }					  
					},
					{ field:"writeDate", title: "작성일", width: "120px",
					  attributes: { "class": "text_center" },
					  headerAttributes: { "class": "text_center" },
					  format: '{0:yyyy-MM-dd}'
					},
					{ field:"writeName", title: "작성자", width: "120px",
					  attributes: { "class": "text_center" },
					  headerAttributes: { "class": "text_center" },
					}],
					sortable: true,
					selectable: 'row',
					noRecords: UI.Grid.NoRecordTemplate,
					pageable: {
						buttonCount: 5,
						pageSizes: true
					},
					dataSource: dataSource,					
					change: function(e) {
			    		var dataItem = UI.Grid.getSelectRowData(_grid);	
			    		
			    		var serverUrlParams = {
			    			size: _grid.dataSource.pageSize(),
			    			page: _grid.dataSource.page()-1
			    		}			    		
			    		var $form = $('#filterForm');
			            var formData = UI.Validator($form).value();
			            serverUrlParams.params = formData;
			            var keyword = "";
			            if(!_.isUndefined(serverUrlParams.params.keyword)){
			            	keyword = serverUrlParams.params.keyword;
			            }
			            
			    		location.href = '/community/bbs/detail/'+dataItem.seqno+'?size='+serverUrlParams.size+'&page='+serverUrlParams.page+'&params%5Bkeyword%5D='+keyword;				    		
					},
					dataBinding: function() {
			        	rownum = (this.dataSource.total() - (this.dataSource.page()-1) * this.dataSource.pageSize());
			        },
			}).data('kendoGrid');
			return _grid;
		},
		createPop: function(){
			var _this = this;
			var popup_setting_this = "설정";
			_this.elements.setting = $('#popup_setting_this').kendoWindow({
				width: "400px",
				modal: true,
				height: '',
				iframe: true,
				resizable: false,
				visible: false,	
				title: popup_setting_this,										
				activate: function(){
                	$('#popup_setting_this').scrollTop(0);
                },
               
			}).data('kendoWindow');
		},
		addEvent: function(){
			var _this = this;
			
			//검색
			$('#btnSearch').on('click', function(e){
				_this.elements.grid.dataSource.page(0);
				_this.elements.grid.dataSource.read();
			});
			//키워드 엔티 이벤트
			$("#keyword").keydown(function(e) {								
				if (e.keyCode == 13) {
					e.preventDefault();		
					//e.stopImmediatePropagation();
					$('#btnSearch').trigger('click');
				}
			});
			
			$('#bbsWrite').on('click', function(e){				
				if(_this.elements.settingBool ==='false'){
					kendo.alert('설정을 되어있지않습니다.')
					return true;
				}				
			     		        
				$("#bbsWrite").attr("href", "/community/bbs/write/0");												
			});
			$('#btnSetting').on('click', function(e){	
				//var param = {};
				$.ajax({
					method: 'POST',
					url:'/community/bbs/setting',
		            dataType:'json',
		            contentType: "application/json",
		            //data:JSON.stringify(param),
		            success:function(response,data){		            			            			            		            		            	
						$('#kind').data('kendoDropDownList').value(response.kind);
		            	$('#newcommentoption').data('kendoDropDownList').value(response.newcommentoption);
		            	_this.elements.settingBool = 'true';		            	
		            	_this.elements.setting.open();
						_this.elements.setting.center();	
						
		            },
		            error:function(e){		            	
		            	_this.elements.setting.open();
						_this.elements.setting.center();	
		            } 
		        });	
						
			});
			$('#btnSettingSave').on('click', function(e){				
				var msg = "설정이 저장되었습다.";
				var url = "/community/bbs/settingSave";				
				if(_this.elements.settingBool === 'true'){
					msg = "설정이 수정되었습다.";
					url = "/community/bbs/settingUpdate";
				}
				var param = {
					kind: $('#kind').val(),
					newcommentoption: $('#newcommentoption').val()
				};				
				$.ajax({
					method: 'POST',
					url: url,
		            dataType:'json',
		            contentType: "application/json",
		            data:JSON.stringify(param),
		            success:function(response,data){
		            	kendo.alert(msg);
		            	_this.elements.setting.close();
		            	_this.elements.settingBool = 'true';
		            },
		            error:function(e){		            	 
		            } 
		        });	
			});
			$('#btnSettingClose').on('click', function(e){
				_this.elements.setting.close();
			});
			
		}
	}
	
	bbsGrid.init();
	
});