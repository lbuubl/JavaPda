var dom = document.getElementById("basic_pie");
var myChart = echarts.init(dom);
var app = {};
option = null;

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    	series: [
					{
						name:'주부관사',
						type:'pie',
						selectedMode: 'single',
						radius: [0, '30%'],
						label: {
							normal: {
								position: 'inside'
								}
						},
						labelLine: {
							normal: {
								show:true
							}
						},
						data:[
							{value:34, name:'주관', selected:true},
							{value:28, name:'부관사'}
						]
					},
					{
						name:'현장통계',
						type:'pie',
						radius: ['40%', '55%'],
						data:[
							{value:19, name:'주택법'},
							{value:41, name:'건기법'},
							{value:4, name:'CM 및 기타'}
						]
					}
				]	
};

		window.onresize = function () {
			setTimeout(function (){
				myChart.resize();
			}, 200);
		}

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}