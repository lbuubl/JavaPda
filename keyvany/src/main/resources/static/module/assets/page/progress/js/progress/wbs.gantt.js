$(document).ready(function() {
	view = {
		elements:{},
		CODES:{},
		chartId: _.noop(),
		create: function(){
			var _this = this;
			_this.el = $('#main_gantt');
			_this.createChart();
			_this.addEvent();
			_this.loadGantt();
		},
		createChart: function(){
			UI.Gantt.init();
			gantt.config.columns = [
				{name: 'text', label: 'WBS명', width: 250, tree: true, resize: true },
				{name: 'start_date', label: '계획시작일', width: 100, resize: true},
				{name: 'end_date', label: '계획종료일', width: 100, resize: true},
				{name: 'duration', label: '공기', width: 60, resize: true}
			];

			//gantt.config.autosize = "xy";
			gantt.config.order_branch = true;
		    gantt.config.order_branch_free = true;
		    gantt.config.grid_resize = true;
		    gantt.config.static_background = true;
		    gantt.config.auto_scheduling_strict = true;
			gantt.init("main_gantt");
			ganttModules.menu.setup();
			gantt.parse({
				data:[],
				links:[]
			}, "json");

		},
		addEvent: function(){
			var _this = this;
			$('#btnSearch').on('click', function(e){
				_this.loadGantt();
			});

		    //리사이즈 이벤트
			$(window).on('resizeEnd', function(){
//				$('#main_gantt').height(100);
//				$('#main_gantt').height(($('.colbox').height() - 131));
//				gantt.setSizes();
			});

			// download
			$('a[data-name="downGantt"]').on('click', UI.Gantt.downloadEvent);

			// full screen
			$('a[data-name="fullScreen"]').on('click', UI.Gantt.fullScreenEvent);
		},
		loadGantt: function(){
			var _this = this;
			var dfd = new $.Deferred();
			var startDate = $("#datepicker_start").val().split("/").join("");
			var type = $("#sd_prcs_ds_no_select").val();


			var serverUrlParams = {
				type: type,
				startDate: startDate,
				lrgCstpCs: $("#selLrgCstpCdInfo").val(),
				mclsCd: $("#selMclsCdInfo").val(),
				sclsCd: $("#selSclsCdInfo").val(),
				activityId: $("#paramActiId").val(),
				activityNm: $("#paramActiNm").val()
	        };

			// 데이터 요청
			// jQuery ajax 사용
			$.ajax({
				url : "/module/usermodule/progress/plan/select/revision",
				type : "GET",
				dataType : "json",
				success : function(revision) {
					serverUrlParams.rvsNo = revision;
					$.ajax({
						url : "/module/usermodule/progress/wbs/list/gantt/data",
						type : "GET",
						dataType : "json",
						data : serverUrlParams,
						success : function(resp) {
							gantt.clearAll();
							gantt.config.order_branch = true;
						    gantt.config.order_branch_free = true;
						    gantt.config.grid_resize = true;
						    gantt.config.static_background = true;
						    gantt.config.auto_scheduling_strict = true;
						    gantt.config.smart_rendering = true;
							gantt.init("main_gantt");
							gantt.parse({
								data: resp,
								links: []
							}, 'json');
						},
						fail : function(e) {
							dfd.reject();
						},
						error : function(e) {
							dfd.reject();
						}
					});
				},
				fail : function(e) {
					dfd.reject();
				},
				error : function(e) {
					dfd.reject();
				}
			});

        	return dfd.promise();
		}
	}
	view.create();

	$(window).resize(function(){
		//간트사이즈 조절
		$("#main_gantt").height(window.innerHeight-300);
		gantt.render();
	});
	$(window).resize();
	$(".wrap_container").css("padding-bottom","0");
 });

//adding baseline display
//gantt.addTaskLayer(function draw_planned(task) {
//
//	if (task.planned_start && task.planned_end) {
//		var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
//		var el = document.createElement('div');
//		el.className = 'baseline';
//		el.style.left = sizes.left + 'px';
//		el.style.width = sizes.width + 'px';
//		el.style.top = sizes.top + gantt.config.task_height + 26 + 'px';
//		return el;
//	}
//	return false;
//});
//
//gantt.templates.task_class = function (start, end, task) {
//	if (task.planned_end) {
//		var classes = ['has-baseline'];
//		if (end.getTime() < task.planned_end.getTime()) {
//			classes.push('overdue');
//		}
//		return classes.join(' ');
//	}
//};
//
//gantt.templates.rightside_text = function (start, end, task) {
//	if (task.planned_end) {
//		if (end.getTime() < task.planned_end.getTime()) { //계획종료일 보다 실적종료일이 늦은 경우
//			var overdue = Math.ceil(Math.abs((end.getTime() - task.planned_end.getTime()) / (24 * 60 * 60 * 1000)));
//			var text = "<b>Overdue: " + overdue + " days</b>";
//			return text;
//		}
//	}
//};
//
//gantt.templates.leftside_text = function (start, end, task) {
//	if (task.planned_start) {
//		if (start.getTime() < task.planned_start.getTime()) { //계획시작일 보다 실적시작일이 늦은 경우
//			var overdue = Math.ceil(Math.abs((start.getTime() - task.planned_start.getTime()) / (24 * 60 * 60 * 1000)));
//			var text = "<b>Late start: " + overdue + " days</b>";
//			return text;
//		}
//	}
//};
//
//
//
//gantt.attachEvent("onTaskLoading", function (task) {
//			//console.log(gantt.date.parseDate(task.planned_start, "xml_date"), task.planned_start)
//			task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
//			task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
//	return true;
//});