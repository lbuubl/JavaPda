$(document).ready(function() {	
	var bbsDetail = {	
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
			
			init : function (){
	        	var _this = this;	        		        	
	        	_this.loadDetail().done(function(data) {	        		
	        		if (!_.isUndefined(data)) {
	        			//console.log(JSON.stringify(data));	        			
	        			if(data.kind == 'BBS'){
		            		_this.elements.boardType = true;
		            		$("#noticePopYn").hide();
			        		$("#noticePopDate").hide();
			        		//$("#noticeIssueYn").hide();
			        		$("#noticeProject").hide();
		            	}else{
		            		_this.elements.boardType = false;
		            		$("#noticePopYn").show();
			        		$("#noticePopDate").show();
			        		//$("#noticeIssueYn").show();
			        		
			        		//$("#noticeProject").show();
			        		if(data.popupYn == 'Y'){
		        				$("#noticePopDate").show();
		        			}else{
		        				$("#noticePopDate").hide();
		        			}
		            	}
	        			
	        			$("#bbsTitle").text(data.bbsTitle);
	        			$("#popupYn").text(data.popupYn);
	        			$("#popDate").text(data.popupStartDt + " ~ " + data.popupEndDt);
	        			$("#issueYn").text(data.issueYn);
	        			$("#tags").text(data.tags);
	        			if(data.tmoduleconfigSeqno == $("#moduleconfigSeqno").val()){
	        				$("#btnBbsUpdate").show();
	        				$("#btnBbsDelete").show();	        				
	        			}else{
	        				$("#btnBbsUpdate").hide();
	        				$("#btnBbsDelete").hide();	        				
	        			}
	        			
	        			$("#bbsCont").html(data.bbsCont);	        			
	        			if(data.mmoduleconfigSeqno != ''){
	        				_this.loadProjectGongguSetting(data.seqno).done(function(data) {	
		        				gongguProject(data);
		        			});
	        			}
	        			
					}
	        		
	        		UI.FileViewer({
						el: $('#file_list'),
						moduleconfigSeqno: data.tmoduleconfigSeqno,
						mstSeqno: data.seqno						
					});
					UI.CommentViewer({
						targetEl: $('#comment_list'),
						targetSeqno: data.seqno,
						targetUrl: '/order/orderrequestreceive/comment',
						//targetCountEl: $('#vTotalCommentCnt'),
						targetGoubun: 'B'
					});
					_this.loadGongguSetting().done(function(data) {	
            			if (data != "") {
                			_this.elements.projectType = true;
                			
                			//$("#noticeProject").show();    
                		}else{
                			_this.elements.projectType = false;                			
                			$("#noticeProject").hide();    
                		}
            		});
					
	        		_this.loadBoardSetting().done(function(data) {
	    				if (!_.isUndefined(data)) {
	    					if(data.kind != 'BBS'){
	    						$("#btnBbsWrite").hide();
	    					}
	    				}
	        		});	    				
					
				});
	        	//_this.elements.settingBool = $('#settingBool').val();
				//_this.elements.grid = _this.createGrid();
				//_this.createPop();			
				_this.addEvent();					
	        },
	        addEvent: function(){				
	        	$('#btnBbsList').on('click', function(e){				
	        		$("#btnBbsList").attr("href", "/community/bbs/view");		
	        	});
				$('#btnBbsDelete').on('click', function(e){																						
					kendo.confirm('정말 삭제하시겠습니까?').done(function(){
						var formData = {};	
						formData.seqno = parseInt($("#seqno").val());
						formData.tmoduleconfigSeqno = parseInt($("#moduleconfigSeqno").val());
						var stringdata = JSON.stringify(formData);			
						var loader = UI.Loading.open();							
						$.ajax({
							method: 'POST',
							url: '/community/bbs/bbsDelete',
							dataType:'json',
							data:stringdata,
					        contentType: 'application/json',
							success:function(response, data){
								kendo.alert('삭제하였습니다.');			
								location.href = '/community/bbs/view';
							},
							error:function(e){									
							},
							complete : function() {
								loader.close();
						    }
						});													
					});																			
	        	});
				$('#btnBbsWrite').on('click', function(e){														
					$("#btnBbsWrite").attr("href", "/community/bbs/reWrite/"+$("#seqno").val());		
				});
				$('#btnBbsUpdate').on('click', function(e){									
					$("#btnBbsUpdate").attr("href", "/community/bbs/edit/"+$("#seqno").val());		
				});
	        }
	}
	
	function gongguProject(data){				
		var html = "";
		$.each( data, function( i, data ) {
			if(data.checked=="CHECKED"){
				html += '<li>';								
				html += data.gongguNm;
				html += '</li>';
			}
		});
		$("#projectGonggu").append(html);
		
	}
	
	var bbsGrid = {	
			elements:{},					
	        init : function (){
	        	var _this = this;
	        	_this.elements.size = $('#sizeParam').val();
	        	_this.elements.page = $('#pageParam').val();
	        	_this.elements.keyword = $('#keywordParam').val();	     
	        	_this.elements.detailFirst = true;
	        	_this.elements.settingBool = $('#settingBool').val();
				_this.elements.grid = _this.createGrid();		
				$('#keyword').val(_this.elements.keyword);
				_this.elements.grid.dataSource.pageSize(_this.elements.size);
				//_this.elements.grid.dataSource.page(_this.elements.page);
				
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
				        dataBound:function(e) {				        	   
							 var gridData = _grid.dataSource.view();  
							 for (var i = 0; i < gridData.length; i++) {  
							     var currentUid = gridData[i].uid;  
							     if (gridData[i].seqno == $("#seqno").val()) {  
						    	 	var currentRow = _grid.table.find("tr[data-uid='" + currentUid + "']");  
						    	 	currentRow.css('background-color', '#e5eef4');  
							     }  
							 }  
							 if(_this.elements.detailFirst){
								 var newPageIndex = parseInt(_this.elements.page)+1;
							     if ( newPageIndex != this.dataSource.page() ) {
							          this.dataSource.page(newPageIndex);
							     }
							     _this.elements.detailFirst = false;
							 }							 
				        },
				}).data('kendoGrid');				
				return _grid;
			},
			
			addEvent: function(){
				var _this = this;				
				//검색
				$('#btnSearch').on('click', function(e){
					_this.elements.grid.dataSource.page();
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
			}
		}
		
		bbsGrid.init();	
		bbsDetail.init();							
});