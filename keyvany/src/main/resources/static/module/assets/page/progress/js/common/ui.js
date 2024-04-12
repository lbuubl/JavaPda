'use strict';

/**
 * UI Functions
 * @returns {Object}
 */
var UI = (function(window, document, $) {
	require.config({
		locale : 'kr',
		waitSeconds : 5,
		enforceDefine : true,
		shim : {},
		paths : {
			'underscore' : '/resources/module/assets/page/progress/js/lib/underscore/underscore-min',
			'jquery' : '/resources/module/assets/page/progress/js/lib/jquery/jquery.min',
			'moment' : '/resources/module/assets/page/progress/js/lib/moment/moment.min',
			'text' : '/resources/module/assets/page/progress/js/text',
			'html' : '/resources/module/assets/page/progress/static/html'
		},
		wrapShim : true,// moment 사용시
		catchError : true
	});

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;


	var $window = $(window);
	var $html = $('html');

	//파일확장자 반환
	var getFileExtension = function(filename) {
		var extension = "";
		var lastIndex = -1;
		lastIndex = filename.lastIndexOf('.');

 		if ( lastIndex != -1 ) {
	 		extension = filename.substring( lastIndex+1, filename.len );
 		}

 		return extension;
	}

	// 브라우저 정보 확인
	var getBrowser = function() {
		var agent = navigator.userAgent.toLowerCase();
		// ie 체크
		if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
			return "msie";
		} else {
			// 크롬 체크
			if (agent.indexOf("chrome") != -1) {
				return "chrome";
			}
			// 사파리나 체크
			else if (agent.indexOf("safari") != -1) {
				return "safari";
			}
			// 파이어폭스 체크
			else if (agent.indexOf("firefox") != -1) {
				return "firefox";
			}
			else {
				return "others";
			}
		}
	}

	// document 이벤트
	var addDocumentEvent = function(eventList) {
		return function(types, cb) {
			var typeList = types.split(' ');
			var type = '';

			if(typeof cb !== 'function') return false;
			for(var i = typeList.length; i--;) {
				type = typeList[i];

				if(eventList.hasOwnProperty(type)) {
					eventList[type].push(cb);
				} else {
					eventList[type] = [cb];
					document.addEventListener(type, function(e) {
						for(var j = eventList[type].length; j--;) {
							eventList[type][j].call(this, e);
						}
					});
				}
			}
		};
	}({});

	/**
	 * error
	 */
	$.ajaxSetup({
		global : true,
		beforeSend: function(xhr) {
			/**
			 * Spring Security CSRF 관련
			 */
//			var token = $("meta[name='_csrf']").attr("content");
//			var header = $("meta[name='_csrf_header']").attr("content");
//			xhr.setRequestHeader(header, token);
        },
        complete:function(x, status, error) {
//            if (x.status == 403 || x.status == 302) {
//            	_this.error('HTTP STATUS: ' + x.status + ', ERROR MESSAGE:' + error);
//                byNDialog.error('Sorry, your session has expired. Please login again to continue', function() {
//					window.onbeforeunload = null;
//                    location.href ="/";
//				});
//            } else  if (x.status == 0) {
//            	_this.error('HTTP STATUS: ' + x.status + ', ERROR MESSAGE:' + error);
//                byNDialog.error('Sorry, Application server is down.', function() {
//					window.onbeforeunload = null;
//                    location.href ="/";
//				});
//            }
        },
        statusCode : {
        	401:function(x, status, error){
        		alert('세션이 만료되었습니다');
        		location.href = '/';
        	},
        	403:function(x, status, error){
        		var obj = JSON.parse(x.responseText);
        		kendo.alert(obj.reason);
        	},
        	404:function(x, status, error){
        		kendo.alert('Sorry, This is not the Web page you are looking for.');
        	},
            500:function(x, status, error) {
            	var obj = JSON.parse(x.responseText);
            	if (obj.error == 'bad_request'){
                	kendo.alert(obj.reason);
            	} else {
            		kendo.alert(obj.reason);
            	}
            }
        }
	});

	String.prototype.startsWith = function(str) {
		if (this.length < str.length) { return false; }
		return this.indexOf(str) == 0;
	}

	//문자열 채우기
	String.prototype.lpad = function(padLength, padString){
	    var s = this;
	    while(s.length < padLength)
	        s = padString + s;
	    return s;
	}

	String.prototype.rpad = function(padLength, padString){
	    var s = this;
	    while(s.length < padLength)
	        s += padString;
	    return s;
	}

	var hasAttr = function($el, attrName){
		var attr = $el.attr(attrName);
		return typeof attr !== typeof undefined && attr !== false;
	};

	/**
	 *  주소 검색 창
	 * el: jquery form el
	 * callBack: 주소 검색 완료 callback 함수
	 *
	 * ex)
	 * <div id="popup_map" style="display: none;"></div>
	 * UI.Postcode($('#popup_map'), function(postData){
			$('#address').val(postData.address);
			//위도, 경도
			$('#xyPoction').val('(' + postData.latitude + ', ' + postData.longitude + ')');
	   });
	 */
	var Postcode = function(el, callBack){
		var pop = el.kendoWindow({
				width: '720px',
				modal: true,
				height: '600px',
				iframe: false,
				resizable: false,
				visible: false,
				title: '주소 검색'
		}).data('kendoWindow');

		var _postCode={};
		var element_wrap = el[0];
		var _createPostCode = function(){
			daum.postcode.load(function(){
				var postCode = new daum.Postcode({
					oncomplete: function(data) {
						// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

						// 각 주소의 노출 규칙에 따라 주소를 조합한다.
						// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
						var fullAddr = data.address; // 최종 주소 변수
						var extraAddr = ''; // 조합형 주소 변수
						var zonecode = data.zonecode;

						// 기본 주소가 도로명 타입일때 조합한다.
						if(data.addressType === 'R'){
							//법정동명이 있을 경우 추가한다.
							if(data.bname !== ''){
								extraAddr += data.bname;
							}
							// 건물명이 있을 경우 추가한다.
							if(data.buildingName !== ''){
								extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
							}
							// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
							fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
						}
						var geocoder = new daum.maps.services.Geocoder();
						var onLoad = function(result, status) {
							if (status === daum.maps.services.Status.OK) {
								_postCode.longitude = result[0].x;
				                _postCode.latitude = result[0].y
							}
							el.trigger('onComplete', [_postCode]);
							if (!_.isUndefined(callBack) && _.isFunction(callBack)){
								callBack(_postCode);
							}
							pop.close();
						};

						_postCode.address = fullAddr;
						geocoder.addressSearch(fullAddr, onLoad);
		           },
		           // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
		           onresize : function(size) {
		               el.css('height', size.height+'px');
		           },
		           width : '100%',
		           height : '100%'
				}).embed(element_wrap);
			});
		};
		var fn = {
			open: function(){
				_createPostCode();
				pop.open();
				pop.center();
			}
		}
		return fn;
	}

	/**
	 * form validation
	 * param: jquery form el
	 *
	 * ex)
	 * var $form = $('#formId');
	 * var values = UI.Validator($form).value();
	 * if (values){
	 *    유효 할 경우
	 * }
	 */
	var Validator = function(form){
		 kendo.init(form);
         var validator = form.kendoValidator({
             rules: {
                 telnumber: function (input) {
                     if (input.is('input[data-type="tel"]') && input.val() != '') {
//                    	 var pattern = /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
                    	 var pattern = /^(0[2-9][0-9])-?([0-9]{3})-?([0-9]{4})$/;
                    	 var patternSeoul = /^(02)-?([0-9]{3})-?([0-9]{4})$/;
                         var pattern15xx = /^(1544|1566|1577|1588|1644|1688)-?([0-9]{4})$/;
                         var patternHand = /^(01[0-9])-?([0-9]{4})-?([0-9]{4})$/;
                         var num = input.val();
                         var isValid = pattern.test(num) || patternSeoul.test(num) || pattern15xx.test(num) || patternHand.test(num) ? true : false;
                		 var defaultLabel = hasAttr(input, 'title') ? input.attr('title') : '전화번호';
                         input.attr('data-telnumber-msg', defaultLabel + '가 유효하지 않습니다.');
                         return isValid;
                     }
                     return true;
                 },
                 engornumber: function (input) {
                     if (input.is('input[data-type="engnum"]') && input.val() != '') {
                    	 var reg = /^[A-Za-z0-9+]*$/;
                    	 var text = input.val();
                    	 var isValid = reg.test(text);
                         input.attr('data-engornumber-msg', '숫자 및 영문만 입력하세요.');
                         return isValid;
                     }
                     return true;
                 },
                 number: function (input) {
                     if (input.is('input[data-type="number"]') && input.val() != '') {
                    	 var reg = /^[0-9+]*$/;
                    	 var text = input.val();
                    	 var isValid = reg.test(text);
                         input.attr('data-number-msg', '숫자만 입력하세요.');
                         return isValid;
                     }
                     return true;
                 },
                 mail: function (input) {
                     if (input.is('input[data-type="mail"]') && input.val() != '') {
                    	 var reg = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
                    	 var text = input.val();
                    	 var isValid = reg.test(text);
                         input.attr('data-mail-msg', '이메일이 유효하지않습니다.');
                         return isValid;
                     }
                     return true;
                 }
             }
         }).data('kendoValidator');

         //required input 기본 메세지 셋
         _.each(form.find('input'), function(input){
        	 var $input = $(input);
        	 if (hasAttr($input, 'required')){
//        		 var defaultLabel = hasAttr(input, 'name') ? input.attr('name') : '필드';
        		 var defaultLabel = hasAttr($input, 'title') ? $input.attr('title') : '필드';
        		 if (!hasAttr($input, 'validationMessage')){

        			 var dataRole = $input.attr('data-role');
        			 if (!_.isUndefined(dataRole)){
        				switch (dataRole) {
						case 'dropdownlist':
	        				$input.attr('validationMessage', defaultLabel + '를(을) 선택해주세요.');
							break;
						default:
							break;
						}
        			 } else {
            			 $input.attr('validationMessage', defaultLabel + '를(을) 입력해주세요.');
        			 }
        		 }
        	 }
         });

         validator.hideMessages();

         return {
    	 /**
    		 * form get value
    		 * param: undefined, 공백 제거 사용여부(true or false), 공백 제거 필드 배열 ['id', 'name']
    		 * 기본 공백 필드는 제거
    		 * ex)
    		 * var $form = $('#formId');
    		 * var values = UI.Validator($form).value();
    		 * if (values){
    		 *    유효 할 경우
    		 * }
    		 */
        	value: function(useEmpty){
                if (validator.validate()){
    				var formData = form.serializeObject();
                	var resultData = {};
                	var rejectField = [];

                	//기본 공백값은 배제
                	if(_.isUndefined(useEmpty) || useEmpty == true){
                		for (var name in formData){
                    		rejectField.push(name);
                		}
                	} else {
                		//배열에 배제할 값 명시
                		if (_.isArray(useEmpty)){
                			rejectField = useEmpty;
                		} else {
                			if (useEmpty == false){
                				rejectField = [];
                			}
                		}
                	}

                	//제거
                	for (var name in formData){
						var isRejectField = !_.isUndefined(_.find(rejectField, function(f){
							return f == name;
						}));

						var v = formData[name];
						if (isRejectField){
							if (!(_.isUndefined(v) || v == '')){
								resultData[name] = v;
							}
						} else {
							resultData[name] = v;
						}
					}
               	 	return resultData;
                } else {
               	 	return false;
                }
        	}
         	, hide: function(){
         		validator.hideMessages();
         	}
         }
	};

	/**
	 * Input mask
	 * param: jquery input el
	 *
	 * ex)
	 * var $input = $('#inputId');
	 * UI.InputMask($input);
	 *
	 * <input id="inputId" data-type="tel">
	 * data-type 정의 해야함.
	 * https://igorescobar.github.io/jQuery-Mask-Plugin/
	 */
	var InputMask = function($input){
		//input 에  data-type 에 적시 되어있어야한다.
		var _maskTypes = ['tel', 'email'];
		if (hasAttr($input, 'data-type') && _.contains(_maskTypes, $input.attr('data-type'))){
			var _mask = function (val) {
				$input.attr('placeholder', '___-___-____');
           	 	var pattern = /^(02)\s?/;
           	 	var pattern2 = /^(0[3-9][0-9])\s?/;
                var patternHand = /^(01[01346-9])\s?/;
                var pattern15xx = /^(1544|1566|1577|1588|1644|1688)\s?/;

           	 	if (pattern.test(val)){
           	 		$input.attr('placeholder', '__-___-____');
           	 		return '00-000-0000'
           	 	}
           	 	if (pattern2.test(val)){
           	 		$input.attr('placeholder', '___-___-____');
           	 		return '000-000-0000'
           	 	}
           	 	if (patternHand.test(val)){
           	 		$input.attr('placeholder', '___-___-____');
           	 		return '000-0000-0000';
           	 	}

           	 	if (pattern15xx.test(val)){
           	 		$input.attr('placeholder', '____-____');
           	 		return '0000-0000';
           	 	}

           	 	return '000-000-0000';
			};

			var _options =  {
				onKeyPress: function(cep, e, field, options) {
					$input.mask(_mask.apply({}, arguments), options);
				}
			};
			$input.mask(_mask, _options);
		};
	}

	var Gantt = {
		init: function(){
			gantt.locale = {
				date:{
					month_full:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					month_short:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					day_full:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					day_short:['일','월','화','수','목','금','토']
				},
				labels:{
					new_task:'이름없는 작업',
					icon_save:'저장',
					icon_cancel:'취소',
					icon_details:'세부 사항',
					icon_edit:'수정',
					icon_delete:'삭제',
					confirm_closing:'',
					confirm_deleting:'작업을 삭제하시겠습니까?',
					section_description:'설명',
					section_time:'기간',
					section_type:'Type',
					column_wbs:'WBS',
					column_text:'작업명',
					column_start_date:'시작일',
					column_duration:'기간',
					column_add:'',
					link:'전제',
					confirm_link_deleting:'삭제 하시겠습니까?',
					link_start:' (start)',
					link_end:' (end)',
					type_task:'작업',
					type_project:'프로젝트',
					type_milestone:'마일스톤',
					minutes:'분',
					hours:'시간',
					days:'일',
					weeks:'주',
					months:'달',
					years:'년',
					message_ok:'OK',
					message_cancel:'취소'
				}
			};

			gantt.config.task_height = 14;
			gantt.config.row_height = 25;
			gantt.config.drag_resize = false;
			gantt.config.drag_links = false;
			gantt.config.drag_move = false;
			gantt.config.drag_progress = false;

			gantt.config.order_branch = true;
			gantt.config.order_branch_free = true;
			gantt.config.grid_resize = true;
			gantt.config.static_background = false;
			gantt.config.smart_rendering = false;
			gantt.config.branch_loading = true;
			gantt.config.branch_loading_property = "hasChild";
			gantt.config.scale_unit = "year";
			gantt.config.date_scale = "%F, %Y";
			gantt.config.work_time = false;
			gantt.config.duration_unit = "day";
			gantt.config.min_column_width = 60;

			gantt.config.auto_scheduling = false;
			gantt.config.auto_scheduling_strict = false;

			//gantt.config.open_tree_initially = true;

			ganttModules.zoom.setZoom(4);


			// adding baseline display
			gantt.addTaskLayer(function draw_planned(task) {
				if (task.planned_start && task.planned_end) {
					var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
					var el = document.createElement('div');
					el.className = 'baseline';
					el.style.left = sizes.left + 'px';
					el.style.width = sizes.width + 'px';
					el.style.top = sizes.top + gantt.config.task_height + 13 + 'px';
					return el;
				}
				return false;
			});

			gantt.templates.task_class = function (start, end, task) {
				if (task.planned_end) {
					var classes = ['has-baseline'];
					if (end.getTime() < task.planned_end.getTime()) {
						classes.push('overdue');
					}
					return classes.join(' ');
				}
			};

			gantt.templates.rightside_text = function (start, end, task) {
				if (task.planned_end) {
					if (end.getTime() < task.planned_end.getTime()) { //계획종료일 보다 실적종료일이 늦은 경우
						var overdue = Math.ceil(Math.abs((end.getTime() - task.planned_end.getTime()) / (24 * 60 * 60 * 1000)));
						var text = "<b>Overdue: " + overdue + " days</b>";
						return text;
					}
				}
			};

			gantt.templates.leftside_text = function (start, end, task) {
				if (task.planned_start) {
					if (start.getTime() < task.planned_start.getTime()) { //계획시작일 보다 실적시작일이 늦은 경우
						var overdue = Math.ceil(Math.abs((start.getTime() - task.planned_start.getTime()) / (24 * 60 * 60 * 1000)));
						var text = "<b>Late start: " + overdue + " days</b>";
						return text;
					}
				}
			};

			gantt.templates.task_class = function(start,end,task){
				return "middel-task";
			};

			gantt.attachEvent("onTaskLoading", function (task) {
						console.log("onTaskLoading======", gantt.date.parseDate(task.planned_start, "xml_date"), task.planned_start)
						task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
						task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
				return true;
			});

			gantt.config.types.root = "subproject";
			gantt.config.types.subproject = "task";

			//css template for each task type
			//gantt.templates.grid_row_class = function( start, end, task ) { if ( task.$level > 0 ) { return "nested_task" } return ""; };
			gantt.templates.grid_row_class = function (start, end, task) {
				if (task.$level < 5 || task.$level == 6) {
					return "nested_task";
				}
				return "";
//				console.log(task);
//				switch (task.type) {
//					case "project":
//						return 'project-task';
//						break;
//					case "subproject":
//						return 'phase-task';
//						break;
//					default:
//						return 'regular-task';
//						break;
//				}
			};
		},
		fullScreenEvent: function(e){
			if (!gantt.getState().fullscreen) {
				var container = document.getElementById("main_gantt");
				container.style.position = "fixed";
				container.style.top = "0";
				container.style.height = "100%";
				container.style.width = "100%";
				gantt.render();
	            //gantt.expand();
	        }
	        else {
	            gantt.collapse();
	        }
		},
		downloadEvent:  function(e){
			var type = $(e.target).attr('data-type');
			var hdrStr = '<style>.middel-task { margin-top:0px; background: #a8a8a8;	border:0px !important; } .baseline { margin-top:0px; background: #0065ca; border:0px !important; }';
			hdrStr += '.clrline { margin-top:0px; background: #e99e03;	border:0px !important; } .nested_task .gantt_add{ display: none !important; }';
			hdrStr += '.resource-task { margin-top:0px !important; margin-left:2px !important; margin-right:2px !important; background: #ffffff !important; border:0px !important;	}';
			hdrStr += '.weekend2 { border-color: #bbbbbb !important; } .weekend { background: #f4e2e8 !important; } <style>';
			var o = {
				header:hdrStr,
				locale:'kr',
				raw: true

				/*
				header:"<style>.baseline{position:absolute;border-radius:2px;opacity:0.6;margin-top:-7px;height:12px;background:#ffd180;border:1px solid rgb(255,153,0)} .gantt_task_line,.gantt_line_wrapper{margin-top:-9px;} .gantt_side_content{margin-bottom:7px} .gantt_task_link.gantt_link_arrow{margin-top:-12px} .gantt_side_content.gantt_right{bottom:0} }</style>",
			    raw:true ,
				locale:"kr",
				server:"http://121.67.90.9:8192"
				*/
			};
			switch (type) {
			case 'pdf':
				gantt.exportToPDF(o);
				break;
			case 'png':
				gantt.exportToPNG(o);
				break;
			case 'excel':
				gantt.exportToExcel(o);
				break;
			case 'ms':
				gantt.exportToMSProject(o);
				break;
			default:
				break;
			}
		}

	}

	//모듈 로드
	var LazyLoader = function(type) {
	    this.type = type;
	};

	//LazyLoader
	_.extend(LazyLoader.prototype, {
	    get: function() {
	        var fileNames = Array.prototype.slice.call(arguments);
	        var dfd = $.Deferred();
	        var path = '/resources/module/assets/page/progress/js/' + this.type + "/";
	        fileNames = _.map(fileNames, function(fileName){
	            return path + fileName;
	        });
	        require(fileNames, function() {
	            dfd.resolve.apply(dfd, arguments);
	        });
	        return dfd.promise();
	    }
	});

	//query String -> Object
	$.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

	var doubleClickTime = 0;
	var threshold = 400;

	// public
	return {
		getFileExtension: getFileExtension,
		getBrowser: getBrowser,
		addDocumentEvent: addDocumentEvent,
		CLICK_EVENT: 1,
		DB_CLICK_EVENT: 2,
		getCode: function(projectCodes, gongguCodes, useAuth){
			var dfd = new $.Deferred();
			var authCodes;
			var param = {};
			if (!_.isUndefined(projectCodes) && projectCodes != null && _.isArray(projectCodes)){
				param.projectCodes = projectCodes;
			}

			if (!_.isUndefined(gongguCodes) && gongguCodes != null && _.isArray(gongguCodes)){
				param.gongguCodes = gongguCodes;
			}

			if (!_.isUndefined(useAuth) && useAuth == true){
				authCodes = ['AUTH'];
				param.authCodes = authCodes;
			}

			/*$.ajax({
			    url: '/common/codes',
			    type: 'POST',
				dataType:'json',
		        contentType: 'application/json',
				data: JSON.stringify(param),
			    success:function(data){
			    	var codes = {};
			    	var parentCodes = _.union((projectCodes) || [], (gongguCodes) || [], (authCodes) || []);
			    	var len = parentCodes.length;
			    	for (var i = 0; i < len; i++){
			    		var parentCode = parentCodes[i];
			    		codes[parentCode] = _.filter(data, function(code){ return code.parent == parentCode;});
			    	}
			    	dfd.resolve(codes);
			  	},
			  	error:function(e){
			  		dfd.reject();
			  	}
			});*/
			return dfd.promise();
		},
		getGonggus: function(sortColumn, sortType){
			/**
			 * sortColumn: 옵션 아래 컬럼명일경우만 작동 기본 공사명 정렬
			 * sortType: 옵션
			 */
//			seqno
//			, gongguNm : 공사명
//			, businessNo : 영업번호
//			, clientSeqno : 고객 seqno
//			, gongguNo : 공구 번호
//			, gongguStat : 상태
//			, part : 공사종류
//			, partCode : 공사종류 코드
//			, type : 사업형식
//			, typeCode : 사업형식 코드
			var  param = {};
			var  columnArr = ['gongguNm', 'businessNo', 'clientSeqno', 'gongguStat', 'part', 'type', 'typeCode', 'sort'];
			var typeArr = ['DESC', 'ASC'];
			if(!_.isUndefined(sortColumn) && _.contains(columnArr, sortColumn)){
				param.column = sortColumn;
				param.type = 'ASC';

				if(!_.isUndefined(sortType) && _.contains(typeArr, sortType)){
					param.type = sortType;
				}

			};
			var dfd = new $.Deferred();
			/*$.ajax({
			    url: '/common/gonggus',
			    type: 'GET',
				dataType:'json',
		        contentType: 'application/json',
		        data:param,
			    success:function(data){
			    	dfd.resolve(data);
			  	},
			  	error:function(e){
			  		dfd.reject();
			  	}
			});*/
			return dfd.promise();
		},
		getTreeDataArray: function(el){
			var _this =  this;
			var treeData = _this.getTreeData(el);
			var root = treeData[0];
			var arr = [];
			arr.push({
				id: root.id,
				text: root.text,
				glevel: root.a_attr.glevel
			});
			var getChild = function(a, parent){
				var children = parent.children;
				if (!_.isUndefined(children) && _.isArray(children)){
					for (var index in children){
						var child = children[index];
						a.push({
							id: child.id,
							text: child.text,
							glevel: child.a_attr.glevel
						});
						if (!_.isUndefined(child.children) && _.isArray(child.children)){
							getChild(a, child);
						}
					}
				}
			}
			getChild(arr, root);
		    return arr;
		},
		getTreeData: function(el){
			var tree = el.jstree(true);
			var treeData = tree.get_json('#', {flat:false});
			return treeData;
		},
		openTree: function(el){
			var _this = this;
		    var tree = el.jstree(true);

		    var treeArrayData = _this.getTreeDataArray(el);
		    var lowRankData = _.max(treeArrayData, function(d){ return d.glevel});
		    var maxLevel = lowRankData.glevel;

		    //화면에 그려져 있는 기준으로 maxLevel를 구한다.
		    var currentNodes = tree.get_container().find('li');
			var currentLowRank = _.max(currentNodes, function(li){
				var id = $(li).attr('id');
				var node = el.jstree('get_node', id);
				var level = node.a_attr.glevel;
				return level;
			});

			var currentLowRankId = $(currentLowRank).attr('id');
			var currentLowRankNode = el.jstree('get_node', currentLowRankId);
			var currentMaxLevel = currentLowRankNode.a_attr.glevel;

			var nextLevel = currentMaxLevel+1;
			if (maxLevel < (nextLevel)){
				kendo.alert('더 이상 확장할 노드가 없습니다.');
				return;
			}

		    tree.get_container().find('li').each(function(i) {
                if(tree.get_path($(this)).length <= nextLevel){
                	tree.open_node($(this));
                }
	        });
		},
		closeTree: function(el){
			var _this = this;
		    var tree = el.jstree(true);

		    var treeArrayData = _this.getTreeDataArray(el);
		    var lowRankData = _.max(treeArrayData, function(d){ return d.glevel});
		    var maxLevel = lowRankData.glevel;

		    //화면에 그려져 있는 기준으로 maxLevel를 구한다.
		    var currentNodes = tree.get_container().find('li');
			var currentLowRank = _.max(currentNodes, function(li){
				var id = $(li).attr("id");
				var node = el.jstree('get_node', id);
				var level = node.a_attr.glevel;
				return level;
			});

			var currentLowRankId = $(currentLowRank).attr("id");
			var currentLowRankNode = el.jstree('get_node', currentLowRankId);
			var currentMaxLevel = currentLowRankNode.a_attr.glevel;

			var nextLevel = currentMaxLevel - 1;
			if (0 == nextLevel){
				kendo.alert('더 이상 축소할 노드가 없습니다.');
//				kendo.alert('최상위까지 축소를 지원하지 않습니다.');
				return;
			}

			var colseTreeData = _.reject(treeArrayData, function(d){
				return d.glevel < nextLevel;
			});
			for (var index in colseTreeData){
				var d = colseTreeData[index];
				el.jstree('close_node', d.id);
			}
		},
		addTreeSearch: function(el, input){
			//검색
			var to = false;
			input.keyup(function () {
				if(to) {
					clearTimeout(to);
				}

				to = setTimeout(function () {
					var v = input.val();
					el.jstree(true).search(v);
				}, 250);
			});
		},
		onClickChk: function(){
			/**
			 * 클릭 체크
			 */
			var _this = this;
			var t0 = new Date();
			var result =0;
			if (t0 - doubleClickTime > threshold){
				var dfd = new $.Deferred();
				window.setTimeout(function() {
				   if (t0 - doubleClickTime > threshold) {
						 dfd.resolve(_this.CLICK_EVENT);
					}
				 }, threshold);
	        	return dfd.promise();
			}
        },
        onDblChk: function() {
			/**
			 * 더블클릭 체크
			 */
    		doubleClickTime = new Date();
    		return this.DB_CLICK_EVENT;
    	},
		loadPage: function(url, method, data){
			var dfd = new $.Deferred();
			method = (method) || 'get';
			data = (data) || {};
			$.ajax({
			    url: url,
			    type: method,
			    data: data,
			    success:function(data){
			    	dfd.resolve(data);
			  	},
			  	error:function(e){
			  		dfd.reject();
			  	}
			});
			return dfd.promise();
		},
		LazyLoader: LazyLoader,
		Validator: Validator,
		InputMask: InputMask,
		Postcode: Postcode,
		Loading: {
			/**
			 * 로딩 이미지 overlay
			 * ex)
			 * var loader = UI.Loading.open();
				_this.add(formData).done(function(){
					kendo.alert('공사 정보를 등록하였습니다.');
					_this.elements.pop.close();
					_this.elements.grid.dataSource.read();
				}).always(function(){
					loader.close();
				});
			 */
			open: function(){
				var  html = '<div class="loader-wrapper">'
					+ '<div class="loader">'
						+ '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'
					+ '</div>'
				+ '</div>';
				var $loading = $(html);
				$('body').append($loading);

				return {
					close: function(){
						$loading.remove();
					}
				}
			}
        },
        ListBox: function(option){
            var config = (option) || {};
            if (_.isUndefined(config.el)){
                console.log('Plz config Ul tag..!!');
                return;
            }
            var defaultOption = {
                css: [],
                height: '100%',
                width: '100%',
                create: function(){
                }
            }

            config = _.defaults(config, defaultOption);
            if (_.isUndefined(config.create) || !_.isFunction(config.create)) {
                console.log('Plz config Create Function..!!');
                return;
            }

            if (!_.isUndefined(config.css) && _.isArray(config.css)){
                $.each(config.css, function(i, css){
                    config.el.addClass(css);
                });

                config.el.css({
                    padding: '5px',
                    width: config.width,
                    height: config.height,
                    overflow: 'auto',
                    border: '1px solid #ddd',
                });

                if($('style[data-id="EGListBox"]').length == 0){
                    var boxSheet = document.createElement('style');
                    boxSheet.type='text/css';
                    boxSheet.setAttribute('data-id', 'EGListBox');

                    var boxCSSList = [];
                    boxCSSList.push('.list_box {');
                    boxCSSList.push('padding: 5px;');
                    boxCSSList.push('width: 100%;');
                    boxCSSList.push('overflow: auto;');
                    boxCSSList.push('border: 1px solid #ddd;');
                    boxCSSList.push('}');

                    boxCSSList.push('.list_box li{');
                    boxCSSList.push('padding: 4px;');
                    boxCSSList.push('cursor: default;');
                    boxCSSList.push('-moz-user-select: -moz-none;');
                    boxCSSList.push('-khtml-user-select: none;');
                    boxCSSList.push('-webkit-user-select: none;');
                    boxCSSList.push('-moz-user-select: -moz-none;');
                    boxCSSList.push('-ms-user-select: none;');
                    boxCSSList.push('user-select: none;');
                    boxCSSList.push('}');

                    boxCSSList.push('.list_box li.active{');
                    boxCSSList.push('background-color: #0088cf;');
                    boxCSSList.push('color: #ffffff;');
                    boxCSSList.push('}');

                    var head = document.head || document.getElementsByTagName('head')[0];
                    if (boxSheet.styleSheet) {
                        boxSheet.styleSheet.cssText = boxCSSList.join('');
                    } else {
                        boxSheet.appendChild(document.createTextNode(boxCSSList.join('')));
                    }
                    head.appendChild(boxSheet);
                }

                config.el.addClass('list_box');
            }

            config.create.apply(config.el, [config]);
            $('li', config.el).each(function(i, li){
                var $li = $(li);
                $li.attr('data-index', i);
                $li.attr('data-parent', config.el.attr('id'));
            });

            $('li', config.el).on('click', function (e) {
                var $li = $(this);
                var $parent = $('#' + $li.attr('data-parent'));
                if (e.ctrlKey || e.shiftKey) {
                    $parent.addClass('multiple');
                    if (e.ctrlKey) {
                        if ($li.hasClass('active')) {
                            $li.removeClass('active');
                        } else {
                            $li.addClass('active');
                        }
                    } else {
                        var dataList = [];
                        $.each($('li', config.el), function (i, li) {
                            var $l = $(li);
                            if ($l.hasClass('active')) {
                                dataList.push({
                                    el: $l,
                                    index: i
                                });
                            }
                        });

                        $('li', config.el).removeClass('active');
                        var firstIndex = _.first(dataList).index;
                        var clickIndex = parseInt($li.attr('data-index'));
                        if (firstIndex < clickIndex) {
                            $.each($('li', config.el), function (i, li) {
                                if (firstIndex <= i && clickIndex >= i) {
                                    $(li).addClass('active');
                                }
                            });
                        } else {
                            $.each($('li', config.el), function (i, li) {
                                if (clickIndex <= i && firstIndex >= i) {
                                    $(li).addClass('active');
                                }
                            });
                        }
                    }
                } else {
                    if ($parent.hasClass('multiple')) {
                        $('li', config.el).removeClass('active');
                        $li.addClass('active');
                        $parent.removeClass('multiple');
                    } else {
                        if ($li.hasClass('active')) {
                            $li.removeClass('active');
                        } else {
                            $('li', config.el).removeClass('active');
                            $li.addClass('active');
                        }
                    }
                }
            });

            var fn = {
                getSelectRow: function(){
                    return $('li.active', config.el);
                },
                getRow: function(){
                    return $('li', config.el);
                },
                getValue: function(){
                    var values = [];
                    $.each($('li', config.el), function(i, li){
                        var v = $(li).data('value');
                        v.index = i;
                        values.push(v);
                    });

                    return values;
                },
                getSelectValue: function(){
                    var values = [];
                    $.each($('li', config.el), function(i, li){
                        if ($(li).hasClass('active')){
                            var v = $(li).data('value');
                            v.index = i;
                            values.push(v);
                        }
                    });

                    return values;
                },
                clear: function(){
                    $('li', config.el).removeClass('active');
                },
                distory: function(){
                    $('li', config.el).off('click');
                    $('li', config.el).remove();
                }
            }
            config.el.data('fn', fn);
            return fn;
        },
		Radio: function(el, codes){
			/**
			 * el: target Div
			 * codes: radio codes
			 *
			 * ex)
			 * var  $gongguStat = $('<div id="gongguStat" class="i_inputs" data-role="radio">');
			 *  var codes = [{
			 *  	label: '사용',
			 *  	value: '1'
			 *  },{
			 *  	label: '미사용',
			 *  	value: '0'
			 *  }]
			 *  var gongguRadioBtn = UI.Radio(gongguStat, codes);
			 *
			 *  gongguRadioBtn.setValue('1');
			 *  gongguRadioBtn.setValueByIndex(0);
			 *  gongguRadioBtn.getValue();
			 */
			var name = el.attr('id');
			var radioTemp = '<span class="i_radio">'
				+ '<input type="radio" name="' + name + '" id="' + name + '<%= index %>" class="k-radio" value="<%= value %>">'
				+ '<label class="k-radio-label" for="' + name + '<%= index %>"><%= label %></label>'
				+ '</span>';
			for (var index in codes){
				var code = codes[index];
				var temp = _.template(radioTemp);
				var html = temp({
					index: index,
					value: code.value,
					label: code.label
				});
				el.append(html);
			}

			var fn = {
				getLabel: function(){
					var result;
					el.find('input[name="' + name + '"]').each(function(i) {
						if ($(this).prop('checked')){
							var idVal = $(this).attr("id");
							result = $("label[for='"+idVal+"']").text();
						}
					});
					return result;
				},
				getValue: function(){
					var result;
					el.find('input[name="' + name + '"]').each(function(i) {
						if ($(this).prop('checked')){
							result = $(this).val();
						}
					});

					return result;
				},
				setValueByIndex: function(index){
					el.find('input[name="' + name + '"]').each(function(i) {
						if (i == index){
							 $(this).prop('checked', true);
						} else {
							 $(this).prop('checked', false);
						}
					});
				},
				setValue: function(value){
					el.find('input[name="' + name + '"]').each(function(i) {
						if (value == $(this).val()){
							 $(this).prop('checked', true);
						} else {
							 $(this).prop('checked', false);
						}
					});
				}
			}
			el.data('fn', fn);
			return fn;
		},
		Form: {
			reset: function(form, otherArr){
				/**
				 * form: 필수
				 * otherArr: 옵션(input이 아닌 라디오 버튼 처리용... )
				 *
				 * ex) 보통
				   UI.Form.reset($('#gongguForm'));
				 *
				 * ex) 라디오버튼 있을경우
				   UI.Form.reset($('#gongguForm'), ['dailyreportBefornext', 'gongguStat']);

				 */
				var prefix = (form.attr("data-prefix")) || '';
				var data = form.serializeObject();
			    Validator(form);

			    if (_.isArray(otherArr)){
			    	for (var index in otherArr){
			    		var name = otherArr[index];

			    		if (_.isUndefined(data[name])){
			    			data[name] = '';
			    		}
			    	}
			    }

				for(var name in data){
					var f = $('#' + prefix + name);
					if (f.is( 'input')){
						var role = f.attr('data-role');
						switch (role) {
						case 'dropdownlist':
							f.data('kendoDropDownList').value('');
							break;
//						case 'datepicker':
//							f.data('kendoDatePicker').value(moment().format('YYYY-MM-DD'));
//							break;
						default:
							f.val('');
							break;
						}
					} else {
						if(_.isUndefined(f.attr('data-role'))){
							f.html('');
						} else {
							if (f.attr('data-role') == 'radio'){
								f.data('fn').setValueByIndex(0);
							} else if(f.attr('data-role') == 'editor'){
//								var temp = $('#htmlTemplate').html();
								f.data('kendoEditor').value('');
							}
						}
					}
				}
			}
		},
		Grid: {
			NUM_FORMAT: '{0:c}',
			SUM_FORMAT: '#=kendo.toString(sum, "C")#',
			PERCENT_FORMAT: '{0:n}',
			NoRecordTemplate: {
				template: '조회된 데이터가 없습니다.',
				noRows: '조회된 데이터가 없습니다.'
			},
			NonColumnEdit: function(){

				/**
				 * 개별 column 의 editable 에 설정해서 사용.
				 */
				return false;
			},
			CodeTemplate: function(config){
				var fn = function(){return '';};
				if (!_.isUndefined(config) && !_.isUndefined(config.key) && !_.isUndefined(config.code) && _.isArray(config.code)){
					fn = function(data){
						var code = data[config.key];
						var findCode = _.find(config.code, function(c){ return c.value == code;});
						return _.isUndefined(findCode) ? '' : findCode.label;
					}

				} else {
					console.log('need Config:{key:"", code:"" }');
				}

				return fn;
			},
			CheckBoxTemplate: function(config){
				 /**
					 * key: 필수 column field
					 * checkd: 1,
					 * uncheckd: 0
					 * notCreate: -1
					 *
					 * ex)
					 */
					var fn = function(){return '';};
					if (!_.isUndefined(config) && !_.isUndefined(config.key)){
						var defaultOption = {
							checkd: 1,
							uncheckd: 0,
							notCreate: -1
						}

						var option = _.defaults(config, defaultOption);
						fn = function(data){
							var v = data[config.key];
							if (option.notCreate == v){
								return '';
							} else {

								var isCheckd = '';
								//일반적인 체크 박스로 나올 경우
								if (option.uncheckd == v){

								} else {
									if (_.isFunction(option.checkd)){
										//text형태로 보고 싶을 경우
										return option.checkd();
									} else {
										isCheckd = ' checked="checked" ';
									}
								}
								var id =  _.uniqueId(data.id + '_');
								return '<input id="' + id + '" data-id="' + data.id + '" data-key="' + config.key + '" type="checkbox"' + isCheckd + 'class="k-checkbox" /><label class="k-checkbox-label" for="' + id +'"></label>';
							}
						}
					} else {
						console.log('need Config:{key:""}');
					}
					return fn;
			},
			LinkTemplate: function(config){
				/**
				 * key: column text
				 * css: event CSS name defulat ''
				 * pk: row uniq id default 'id'
				 *
				 * ex)
				 * var linkTemplateConfig = {
						key: 'gongguNm',
						css: 'popWindow',
						pk: 'seqno'
					};
					var template = UI.Grid.LinkTemplate(linkTemplateConfig);
				 */
				var fn = function(){return '';};
				if (!_.isUndefined(config) && !_.isUndefined(config.key)){
					var id = _.isUndefined(config.pk) ? 'id':config.pk;
					var eventCSS = _.isUndefined(config.css) ? '' : config.css;
					fn = function(data){
						var link = '<a href="javascript:;" class="btn_popup_project_view ' + eventCSS + '" data-key="' + data[id] + '">' + data[config.key] + '</a>';
						return link;
					}

				} else {
					console.log('need Config:{key:"", css:"", pk:"" }');
				}

				return fn;
			},
			FromToTemplate: function(config){
				/**
				 * from: start Date Filed Name defulat 'startDate'
				 * to: end Date Filed Name defulat 'endDate'
				 *
				 * ex)
				 * var linkTemplateConfig = {
						from: 'playStartDate',
						to: 'playEndDate'
					};
					var template = FromToTemplate(linkTemplateConfig);
				 */

				var startDate = _.isUndefined(config.from) ? 'startDate':config.from;
				var endDate = _.isUndefined(config.to) ? 'endDate':config.to;

				var fn = function(data){
					var text = '';
					var hasStart = !_.isUndefined(data[startDate]) && data.contractStart !='' && !_.isNull(data[startDate]);
					var hasEnd = !_.isUndefined(data[endDate]) && data.contractEnd !='' && !_.isNull(data[endDate]);
					if(hasStart){
						text = data[startDate] + ' ';
					}

					if(hasStart || hasEnd){
						text = text + '~';
					}

					if(hasEnd){
						text = text + ' ' + data[endDate];
					}
					return text
				};
				return fn;
			},
			selectByIndex: function(grid, index){
				grid.select('tr:eq(' + index + ')');
			},
			selectById: function(grid, id){
				/**
				 * data schema 에 id가 선언되어있어야함.
				 */
	    		var dataItem = grid.dataSource.get(id);
	    		if(!_.isUndefined(dataItem)){
		            var row = grid.table.find('tr[data-uid="' + dataItem.uid + '"]');
		            grid.select(row);
	    		}
			},
			getDataItemByUId: function(grid, uid){
	    		if(!_.isUndefined(uid)){
		            var row = grid.table.find('tr[data-uid="' + uid + '"]');
		            return grid.dataItem(row);
	    		}else{
	    			return null;
	    		}

			},
			getSelectRowData: function(grid){
				var selectRowData = [];
				grid.select().each(function(){
					selectRowData.push(grid.dataItem(this));
				});

				if (selectRowData.length == 1){
					return selectRowData[0];
				} else {
					return selectRowData;
				}
			},
			getSelectRow: function(grid){
				/**
				 * 정리 필요 ...
				 */
				var selectRowData = [];
				grid.select().each(function(){
					selectRowData.push(grid.dataItem(this));
				});
				return selectRowData;
			},
			getCheckedRowData: function(grid, fieldName){
				var checkedItems = [];
				var checkBoxs = grid.element.find('input[data-key="' + fieldName + '"]');
				for (var index in checkBoxs){
					 var checkBox = checkBoxs[index];
					 if (checkBox.checked){
						 var item = grid.dataItem(checkBox.closest('tr'));
						 checkedItems.push(item);
					 }
				}
				return checkedItems;
			}
		},
		FileUploader: function(el, moduleconfigSeqno){
			/**
			 * 파일 업로더 기본형
			 * el: 필수 <input type="file" data-mcseqno="${moduleconfigSeqno}">
			 * moduleconfigSeqno: 옵션 (input의 attr data-mcseq 사용하지 않을시)
			 * initFiles: 옵션 초기 파일 []
			 *
			 * ex)
			   var fileUploader = UI.FileUploader($('#file_inpu'));
			   //업로드
			   fileUploader.upload().done(function(uuid){
			   	/.....
					로직
				..../

			   });

			   //초기화
			   fileUploader.clear();
			 */
			var config = {
					multiple: true,
//                    async: {
//                        saveUrl: "save",
//                        removeUrl: "remove",
//                        autoUpload: false
//                    },
			};

			var fileUploader = el.kendoUpload(config).data('kendoUpload');
			return {
				reset: function(){
					fileUploader.clearAllFiles();
				},
				getFiles: function(){
					return fileUploader.getFiles();
				},
				upload: function(gongguSeqno){
					var dfd = new $.Deferred();
					var method = 'POST';
					var files = fileUploader.getFiles();
					var formData = new FormData();
					if(files.length == 0){  // 파일이 없을경우
						var responce = '';
						dfd.resolve(responce);
					}else{
						var mcsSeqno = (el.attr('data-mcseq')) || moduleconfigSeqno;
						if(!_.isUndefined(gongguSeqno)){
							formData.append('gongguSeqno', gongguSeqno);
						}
						formData.append('moduleconfigSeqno', mcsSeqno );
						for(var i=0; i<files.length; i++){
							formData.append('files',files[i].rawFile);
						}
						$.ajax({
							type : method,
							url : '/file',
							contentType: false,
							dataType:'text',
							processData: false,
							cache : false,
							data : formData,
							success : function(response, mode) {
								if(null != response && response.length > 0){
									dfd.resolve(response);
								}
							},
							error : function(e) {
								dfd.reject(e);
							}
						});
					}
					return dfd.promise();
				}
			}
		},
		FileViewer: function(options) {
			/**
			 * moduleconfigSeqno(*필수) : 모듈설정시쿼스번호
			 * mstSeqno(*필수) : 마스터 시쿼스번호
			 * target(*필수) : 들어갈 selector
			 * isAccordion : 파일파일 해더 노출 여부
			 * editable : 수정 여부
			 * fk1 : Foreign Key 1
			 * fk2 : Foreign Key 2
			 * fk3 : Foreign Key 3
			 */
			options.el.html('');
			var formKey = 'attachments-' + options.moduleconfigSeqno + '-' + options.mstSeqno;
			var fileUrl = "/file/" + (options.isAccordion ? "accordion" : "default") + "?moduleconfigSeqno="+ options.moduleconfigSeqno +"&mstSeqno="+ options.mstSeqno ;
			if(options.fk1) {
				fileUrl += "&fk1="+options.fk1;
				formKey = formKey + '-' + options.fk1;
			}
			if(options.fk2) {
				fileUrl += "&fk2="+options.fk2;
				formKey = formKey + '-' + options.fk2;
			}
			if(options.fk3) {
				fileUrl += "&fk3="+options.fk3;
				formKey = formKey + '-' + options.fk3;
			}
			if(options.editable) {
				fileUrl += "&mode=edit";
			}

			UI.loadPage(fileUrl).done(function(html){
				options.el.html(html);
			});

			return {
				clear: function(){
					options.el.html('');
				},
				remove: function(){
					$('#' + formKey).submit();
				}
			}
		},
		Gantt: Gantt,

		/**
		 * 사용자 선택 모달
		 *
		 * 사용자 멀티 선택 param: targetId(모달창 id), params(선택된사용자), callback(콜백 function명)
		 * ex) UI.showUsersModal("modal-users", params, saveMenuAuthGroupUsers)
		 *
		 * 사용자 단일 선택 param: targetId(모달창 id), callback(콜백 function명)
		 * ex) UI.showUsersModal("modal-users", saveMenuAuthGroupUsers)
		 */
		showUsersModal: function() {

			var targetId = arguments[0];
			var callback;
			var params;
			var type;

			if(typeof arguments[1] === "function"){
				type = "s";
				callback = arguments[1];
			} else {
				type = "m";
				params = arguments[1];
				callback = arguments[2];
			}

			var _target = $("#"+targetId);
			$(".modal-users-selector").remove();

			UI.loadPage('/common/searchuser').done(function(html) {

	            _target.empty();
	            _target.append(html);

	            var loader = new UI.LazyLoader('js');
	            loader.get('system/obs/searchuser.js').then(function(view) {

	            	var baseinfo = {
	                    target : _target    //타겟 el 필수
	                    , params : params
	                    , type : type
	            	}

	                view.create(baseinfo);
	            });

	            if(typeof _target.data('kendoWindow') === "undefined") {
	            	var popoup = _target.kendoWindow({
		                width: "740px",
		                modal: true,
		                height: type == "s" ? '600px' : "630px",
		                iframe: true,
		                resizable: false,
		                title: "사용자 선택",
		                visible: false,
		            }).data("kendoWindow").center().open();
	            } else {
	            	_target.data("kendoWindow").center().open();
	            }
			});

			_target.prop('doSave', null).off('doSave');
			_target.on('doSave', function(e, data){
	            callback(data);
	        });
		},


		/**
		 * 사용자/ 조직 선택 모달
		 *
		 * options.params = [
         *    {seqNo:"3399", name : "시공사 02", type : "m"}, //사용자(m)
         *    {seqNo:"13444", name : "조직도정보(OBS)" , type : "g"}}//조직(g)
       	 * 	];
       	 * options.target(필수)  -- 팝업이 들어갈 el의 id
       	 * options.callback(필수) -- callback 함수
       	 * options.ischeckbox -- 조직토트리 checkbox 존재여부 (default : true)
       	 * options.isobs -- obs기준여부 false일 경우 사용자기준정보로 보여줌. (default : true)
		 * ex) UI.showObsModal(options);
		 *
		 * 2018-12-19 변경사항
		 * ischeckbox 추가 (조직도 트리 checkbox 존재여부)
		 *   default : ture
		 */
		showObsModal: function(options) {
			var _target = $("#"+options.target);
			$(".modal-users-selector").remove();

			UI.loadPage('/common/searchobs').done(function(html) {

	            _target.empty();
	            _target.append(html);

	            var loader = new UI.LazyLoader('js');
	            loader.get('system/obs/searchobs.js').then(function(view) {
	            	var baseinfo = {
	                    target : _target    //타겟 el 필수
	                    , params : options.params
	                    , ischeckbox : typeof options.ischeckbox === "undefined" ? true : options.ischeckbox
                		, isobs : typeof options.isobs === "undefined" ? true : options.isobs
	            	};

	                view.create(baseinfo);
	            });

	            if(typeof _target.data('kendoWindow') === "undefined") {
	            	var popoup = _target.kendoWindow({
		                width: "940px",
		                modal: true,
		                height: '640px',
		                iframe: true,
		                resizable: false,
		                title: "조직/인원 선택",
		                visible: false,
		            }).data("kendoWindow").center().open();
	            } else {
	            	_target.data("kendoWindow").center().open();
	            }
			});

			_target.prop('doSave', null).off('doSave');
			_target.on('doSave', function(e, data){
	            options.callback(data);
	        });
		},

		/**
		 * 공구 선택 모달
		 *
		 * ex) showGongguModal("modal-users", callback_function)
		 */
		showGongguModal: function() {

			var targetId = arguments[0];
			var callback = arguments[1];
			var type = arguments[2];

			var _target = $("#"+targetId);
			//$(".modal-users-selector").remove();

			UI.loadPage('/common/searchgonggu').done(function(html) {

	            _target.empty();
	            _target.append(html);

	            var loader = new UI.LazyLoader('js');
	            loader.get('system/obs/searchgonggu.js').then(function(view) {

	            	var baseinfo = {
	                    target : _target    //타겟 el 필수
	                    , type : type
	            	}

	                view.create(baseinfo);
	            });

	            if(typeof _target.data('kendoWindow') === "undefined") {
	            	var popoup = _target.kendoWindow({
		                width: "500px",
		                modal: true,
		                height:'620px',
		                iframe: true,
		                resizable: false,
		                title: "공사 조회",
		                visible: false
		            }).data("kendoWindow").center().open();
	            } else {
	            	_target.data("kendoWindow").center().open();
	            }
			});

			_target.prop('doSave', null).off('doSave');
			_target.on('doSave', function(e, data){
	            callback(data);
	        });
		},

		/**
		 * 숫자만 입력
		 *
		 * ex) onlynum(".onleynum"); //class 에 onleynum 추가일 경우
		 */
		onlynum : function(selecter){

			$(selecter).keydown(function (e) {
		        // Allow: backspace, delete, tab, escape, enter and .
		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		             // Allow: Ctrl/cmd+A
		            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
		             // Allow: Ctrl/cmd+C
		            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
		             // Allow: Ctrl/cmd+X
		            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
		             // Allow: home, end, left, right
		            (e.keyCode >= 35 && e.keyCode <= 39)) {
		                 // let it happen, don't do anything
		                 return;
		        }
		        // Ensure that it is a number and stop the keypress
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
		    });

		},
		/**
		 * 숫자를 받아서 콤마(,) 추가
		 *
		 * ex) addCommas('123123123.01');
		 * return : 123,123,123.01
		 */
		 addCommas : function (num) {
			if(!_.isNull(num)){
			    var str = num.toString().split('.');
			    if (str[0].length >= 4) {
			        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
			    }
			    return str.join('.');
			}else{
				num = 0;
			}

			return num;
		},


		/**
		 * 레이어팝업 닫기(제거)
		 *
		 * @param {String} selector 특정 팝업 CSS셀렉터
		 * @returns {Boolean}
		 */
		closeLayerPop: function(selector) {
			var $pop = $(selector || '.common-pop.is-layer');
			var last = $pop.data('opener');

			// 마지막 포커스 엘리먼트로 이동
			if(last) {
				last.focus();
			}

			// 셀렉터가 없을땐 모두 지움
			$pop.remove();

			return false;
		},

		getGridPageSize: function(height) {
			return parseInt((parseFloat ($(".left_bg").css("height"))-height)/39);
		},

		getGridPageSizes: function(height) {
			var pageSize = parseInt((parseFloat ($(".left_bg").css("height"))-height)/39);
			var pageSizes = [10, 20, 50];

			if($.inArray(pageSize, pageSizes) == -1) {
				pageSizes.unshift(pageSize);
			}

			return pageSizes;
		},

		hexToRgb: function(hexType) {
			 var hex = hexType.replace( "#", "" );
		        var value = hex.match( /[a-f\d]/gi );


		        // 헥사값이 세자리일 경우, 여섯자리로.
		        if ( value.length == 3 ) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];


		        value = hex.match( /[a-f\d]{2}/gi );

		        var r = parseInt( value[0], 16 );
		        var g = parseInt( value[1], 16 );
		        var b = parseInt( value[2], 16 );

		        var rgbType = "rgb(" + r + ", " + g + ", " + b + ")";

		        return rgbType;
		},
		getAppKind: function(code){
			var result = '';
			switch (code) {
			case 1:
				result = '결재'
				break;
			case 2:
				result = '참조'
				break;
			case 3:
				result = '협조'
				break;
			case 4:
				result = '회람'
				break;
			default:
				break;
			}

			return result;
		},
		// 해당 공구의 계약정보 조회
		getSubContractCode: function(gongguSeqno){
			var dfd = new $.Deferred();
			var authCodes;
			var param = {};

			if (!_.isUndefined(gongguSeqno) && gongguSeqno != null){
				param.gongguSeqno = gongguSeqno;
			}


			$.ajax({
			    url: '/common/subcontracts',
			    type: 'POST',
				dataType:'json',
		        contentType: 'application/json',
				data: JSON.stringify(param),
			    success:function(data){
			    	dfd.resolve(data);
			  	},
			  	error:function(e){
			  		dfd.reject();
			  	}
			});
			return dfd.promise();
		},
		CommentViewer: function(options){
			var el = options.targetEl;
			var targetSeqno = options.targetSeqno;
			var url = options.targetUrl;
			var goubun = options.targetGoubun;
			var targetCount = options.targetCountEl;

			el.html('');
			var param = {};
			param.seqno =  targetSeqno;
			param.gubun = goubun;
			$.ajax({
				type: 'POST',
				url: url,
				contentType: 'application/json',
				dataType:'json',
				data: JSON.stringify(param),
				success : function(response, mode) {
					htmlAppend(response);
				},
				error : function(e) {

				}
			});


			$(document).off('click', '#btnCommentsDiv').on('click', "#btnCommentsDiv", function(e) {
				e.preventDefault();
				var seqno = $(e.target).attr('data-seqno');
				var f = $("#commentsDiv"+seqno);
				if(f.css("display") == "none"){
					f.show();
				}else{
					f.hide();
				}
			});

			$(document).off('click', '#btnComments').on('click', "#btnComments", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				var parentSeqno = $(e.target).attr('data-seqno');
				var comment = $("#comments"+parentSeqno).val();
				if(comment == '' || comment  == null){
					kendo.alert('내용을 입력하세요.');
					return true;
				}
				var param = {};
				param.parentSeqno =  parentSeqno;
				param.comment = comment;
				param.targetSeqno = targetSeqno;
				param.gubun = goubun;

				var ajaxUrl = '/order/orderrequestreceive/comments/save';
				var message = '저장되었습니다.';

				commentAjax(param,ajaxUrl,message);
				if(goubun != 'B'){
					if(targetCount != null){
						targetCount.html(parseInt(targetCount.html()) + 1);
					}
				}
			});
			$(document).off('click', '#btnCommentSvae').on('click', "#btnCommentSvae", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				if($(this)){
					var comment = $("#comment").val();
					if(comment == '' || comment  == null){
						kendo.alert('내용을 입력하세요.');
						return true;
					}
					var param = {};
					param.parentSeqno = 0;
					param.comment = comment;
					param.targetSeqno = targetSeqno;
					param.gubun = goubun;

					var ajaxUrl = '/order/orderrequestreceive/comments/save';
					var message = '저장되었습니다.';

					commentAjax(param,ajaxUrl,message);
					if(goubun != 'B'){
						targetCount.html(parseInt(targetCount.html()) + 1);
					}
				}

			});

			$(document).off('click', '#btnCommentsDel').on('click', "#btnCommentsDel", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				var seqno = $(e.target).attr('data-seqno');

				var param = {};
				param.targetSeqno = targetSeqno;
				param.seqno =  seqno;
				param.gubun = goubun;

				var ajaxUrl = '/order/orderrequestreceive/comments/del';
				var message = '삭제되었습니다.';

				commentAjax(param,ajaxUrl,message);
			})
			function commentAjax(param,ajaxUrl,message){
				$.ajax({
					type: 'POST',
					url: ajaxUrl,
					contentType: 'application/json',
					dataType:'json',
					data: JSON.stringify(param),
					success : function(response, mode) {
						el.html('');
						htmlAppend(response);
						kendo.alert(message);
					},
					error : function(e) {

					}
				});
			}
			function htmlAppend(response){
				var strHtml = '';
				var strHtmlCheck = 0;
				var strHtmlFor = 0;
				if(goubun == 'B'){
					strHtml += '<div class="tit_area m0">';
					strHtml += '<h3>댓글</h3>'
					strHtml += '<div class="comment_write_inline clear">'
					strHtml += '<textarea class="autosize small m0" id="comment" name="" style="resize: none;"></textarea>'
					strHtml += '<a href="javascript:;" id="btnCommentSvae">등록</a>'
					strHtml += '</div>'
					strHtml += '</div>'

					strHtml += '<div class="comment_list mt10 pt5" id="divHeard">';
					strHtml +=	'</div>';
				}else{
					strHtml += '<div class="comment_write_inline m0">'
					strHtml += '<textarea class="autosize small m0" id="comment" name="" style="resize: none;"></textarea>'
					strHtml += '<a href="javascript:;" id="btnCommentSvae">등록</a>'
					strHtml += '</div>'

					/*strHtml += '<div class="tit_area border m0">';
					strHtml += '<div class="float_left accordion_input">';
					strHtml += '<div class="i_inputs">';
					strHtml += '<label>';
					strHtml += '<input type="text" id="comment" class="k-textbox w100">';
					strHtml += '</label>';
					strHtml += '</div>';
					strHtml += '</div>';
					strHtml += '<div class="float_right accordion_btn">';
					strHtml += '<a href="javascript:;" id="btnCommentSvae" class="btn small btn_blue">저장</a>';
					strHtml += '</div>';
					strHtml += '</div>';*/

					strHtml += '<div class="comment_list mt10 pt5" id="divHeard">';
					strHtml +=	'</div>';
				}
				el.html(strHtml);

				if(null != response && response.length > 0){
					$.each( response, function( i, data ) {
						if(data.parentSeqno == 0){
							dataHtml(data,$("#divHeard"));
						}else{
							dataHtml(data,$("#htmlData"+data.parentSeqno));
						}
					})

				}else{
					dataHtml(null,$("#divHeard"));
				}
			}

			function dataHtml(data,id){
				var strHtml = '';
				if(data != null){
					if("1" == data.depth){
						strHtml += '<article id="htmlData'+data.seqno+'">';
					}else{
						strHtml += '<article id="htmlData'+data.seqno+'"><i class="material-icons reply">&#xe5da;</i>';
					}
					strHtml += '<div class="thumb img_crop">';
					if(data.userPhotoimg == null){
						strHtml += '<img src="/static/img/temp_user.jpg" alt="">';
					}else{
						strHtml += '<img src="/file/user/'+data.writeId+'/photo?'+new Date().getTime()+'" alt="">';
					}
					strHtml += '</div>';
					strHtml += '<p class="user">';
					strHtml += '<strong>';
					//strHtml += '대리 홍길동'
					strHtml += data.writeName;
					strHtml += '</strong>';
					strHtml += '<span>';
					strHtml += data.writeDate
					strHtml += '</span>';
					strHtml += '</p>';
					strHtml += '<p class="txt">';
					//strHtml += '미팅 후 회의록 작성하여 익일 관련자에게 공유바랍니다. 협상 시 수주금액의 %까지 미팅 후 회의록 작성하여 익일 관련자에게 공유바랍니다. 미팅후 회의록 작성하여 익일 관련자에게 공유바랍니다.';
					strHtml += data.comment.replace(/(?:\r\n|\r|\n)/g, '<br/>');
					strHtml += '</p>';
					strHtml += '<div class="btn_area">';
					if(!data.delYn){
						strHtml += '<a id="btnCommentsDiv" data-seqno="'+data.seqno+'" href="javascript:;"><i data-seqno="'+data.seqno+'" class="material-icons">&#xe15e;</i><span class="hidden">댓글</span></a>';
						if($("#resultSettingYn").val() === 'true' || $("#writeCheckId").val() == data.writeId){
							strHtml += '<a id="btnCommentsDel" data-seqno="'+data.seqno+'" href="javascript:;"><i data-seqno="'+data.seqno+'" class="material-icons">&#xe872;</i><span class="hidden">삭제</span></a>';
						}
					}
					strHtml += '</div>';
					strHtml += '<div class="comment_write_inline" id="commentsDiv'+data.seqno+'" style="display: none;"> ';
					strHtml += '<textarea class="autosize small m0" id="comments'+data.seqno+'" name="" style="resize: none;"></textarea>'
					strHtml += '<a id="btnComments" data-seqno="'+data.seqno+'" href="javascript:;">등록</a>';
					strHtml += '</div>';
					strHtml += '</article>';
				}else{
					strHtml += '<article class="no_data">의견이 없습니다.</article>';
				}

				id.append(strHtml);
			}

		},
		setCookie: function(cookieName, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString() +"; path=/;");
			document.cookie = cookieName + "=" + cookieValue;
		},
		deleteCookie: function(cookieName) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() - 1);
			document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
		},
		getCookie: function(cookieName) {
			cookieName = cookieName + '=';
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cookieName);
			var cookieValue = '';
			if (start != -1) {
				start += cookieName.length;
				var end = cookieData.indexOf(';', start);
				if (end == -1) end = cookieData.length;
				cookieValue = cookieData.substring(start, end);
			}
			return unescape(cookieValue);
		},
		/**
		 * UI 초기화
		 */
		init: function() {

			// 마지막 포커스된 엘리먼트
			addDocumentEvent('focusin', function(e) {
				lastFocused = e.target;
			});

			// 레이어 팝업 닫기 버튼
			addDocumentEvent('click', function(e) {
				var $tg = $(e.target);
				if($tg.closest('.common-pop.is-layer') && $tg.hasClass('btn-pop-close')) {
					closeLayerPop(
						$tg.closest('.common-pop')
					);
				}
			});
		},

		DateToStringParse : function(date){
			var parseDate = date instanceof Date ? date : new Date(date);

			var parseDateYear = parseDate.getFullYear();
			var parseDateMonth = parseDate.getMonth()+1;
			if(parseDateMonth < 10){
				parseDateMonth = "0"+parseDateMonth.toString();
			}
			var parseDateDay = parseDate.getDate();
			if(parseDateDay < 10){
				parseDateDay = "0"+parseDateDay.toString();
			}

			var strDate = parseDateYear.toString()+parseDateMonth.toString()+parseDateDay.toString();
			return strDate ;
		}
	};


})(window, document, jQuery);
