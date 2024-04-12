if(!window.ganttModules){
	window.ganttModules = {};
}

ganttModules.menu = (function(){
	function addClass(node, className){
		node.className += " " + className;
	}

	function removeClass(node, className){
		node.className = node.className.replace(new RegExp(" *" + className.replace(/\-/g, "\\-"), "g"), "");
	}

	function getButton(name){
		return document.querySelector(".gantt-controls [data-action='"+name+"']");
	}

	function highlightButton(name){
		addClass(getButton(name), "menu-item-active");
	}
	function unhighlightButton(name){
		removeClass(getButton(name), "menu-item-active");
	}

	function disableButton(name){
		addClass(getButton(name), "menu-item-disabled");
	}

	function enableButton(name){
		removeClass(getButton(name), "menu-item-disabled");
	}

	function refreshZoomBtns(){
		var zoom = ganttModules.zoom;
		if(zoom.canZoomIn()){
			enableButton("zoomIn");
		}else{
			disableButton("zoomIn");
		}
		if(zoom.canZoomOut()){
			enableButton("zoomOut");
		}else{
			disableButton("zoomOut");
		}
	}
	
	function toggleZoomToFitBtn(){
		if(ganttModules.zoomToFit.isEnabled()){
			highlightButton("zoomToFit");
		}else{
			unhighlightButton("zoomToFit");
		}
	}

	var menu = {
		zoomIn: function(){
			ganttModules.zoomToFit.disable();
			var zoom = ganttModules.zoom;
			zoom.zoomIn();
			refreshZoomBtns();
			toggleZoomToFitBtn()
		},
		zoomOut: function(){
			ganttModules.zoomToFit.disable();
			ganttModules.zoom.zoomOut();
			refreshZoomBtns();
			toggleZoomToFitBtn()
		},
		zoomToFit: function(){
			ganttModules.zoom.deactivate();
			ganttModules.zoomToFit.toggle();
			toggleZoomToFitBtn();
			refreshZoomBtns();
		},
		fullscreen: function(){
			gantt.expand();
		},
		collapseAll: function(){
			gantt.eachTask(function(task){
				task.$open = false;
			});
			gantt.render();

		},
		expandAll: function(){
			gantt.eachTask(function(task){
				task.$open = true;
			});
			gantt.render();
		},
		toPDF: function(){
			var newURL = window.location.hostname  + "//" + window.location.pathname ;
			console.log(newURL);
			
			gantt.exportToPDF({
				header:"<style>.baseline{position:absolute;border-radius:2px;opacity:0.6;margin-top:-7px;height:12px;background:#ffd180;border:1px solid rgb(255,153,0)} .gantt_task_line,.gantt_line_wrapper{margin-top:-9px;} .gantt_side_content{margin-bottom:7px} .gantt_task_link.gantt_link_arrow{margin-top:-12px} .gantt_side_content.gantt_right{bottom:0} }</style>",
			    raw:true ,
				locale:"kr",
				server:"http://110.45.138.102:8192"
			});
		},
		toPNG: function(){
			gantt.exportToPNG();
		},
		toExcel: function(){
			gantt.exportToExcel();
		},
		toMSProject: function(){
			gantt.exportToMSProject();
		}
	};


	return {
		setup: function(){

			var navBar = document.querySelector(".gantt-controls");
			gantt.event(navBar, "click", function(e){
				var target = e.target || e.srcElement;
				while(!target.hasAttribute("data-action") && target !== document.body){
					target = target.parentNode;
				}

				if(target && target.hasAttribute("data-action")){
					var action = target.getAttribute("data-action");
					if(menu[action]){
						menu[action]();
					}
				}
			});
			this.setup = function(){};
		}
	}
})(gantt);