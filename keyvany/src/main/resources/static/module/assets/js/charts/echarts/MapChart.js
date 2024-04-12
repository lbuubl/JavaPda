/* ------------------------------------------------------------------------------
 *
 *  # Echarts - candlestick and other charts
 *
 *  Candlestick and other chart configurations
 *
 *  Version: 1.0
 *  Latest update: August 1, 2015
 *
 * ---------------------------------------------------------------------------- */

$(function () {

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: 'assets/js/plugins/visualization/echarts'
        }
    });


    // Configuration
    // ------------------------------
    require(

        // Add necessary charts
        [
          'echarts',
          'echarts/theme/limitless',
          'echarts/chart/line',
          'echarts/chart/scatter',
          'echarts/chart/k',
          'echarts/chart/radar',
          'echarts/chart/gauge'
        ],


        // Charts setup
        function (ec, limitless) {
       
            var candlestick_line = ec.init(document.getElementById('candlestick_line'), limitless);
			var Spance_null="&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; "
            candlestick_line_options = {

								// Setup grid
								grid: {
									x: 55,
									x2: 85,
									y: 35,
									y2: 90
								},

								// Add tooltip
								tooltip: {
									trigger: 'axis',
									formatter: function (params) {
										var res = params[0].name;
										for (var i = params.length - 1; i >= 0; i--) {
											if (params[i].value instanceof Array) {
												res += '<br/>' + params[i].seriesName;
												res += '<br/> 금일 최고 : ' + params[i].value[0] + ' &nbsp;&nbsp; 분당 최고 : ' + params[i].value[3];
												res += '<br/> 금일 최저 : ' + params[i].value[1] + ' &nbsp;&nbsp; 분당 최저 : ' + params[i].value[2];
											}
											else {
											//	res += '<br/>분당 평균 :' + params[i].seriesName;
												res += '<br/>'+Spance_null+'분당 평균 : '+ params[i].value;
											}
										}
										return res;
									}
								},

								// Add legend
							/*	legend: {
									data:['Composite index','Turnover (million)']
								},
						*/
								// Enable data zoom
								dataZoom: {
									show: true,
									realtime: true,
									start: 25,
									end: 55,
									height: 30,
									y: 190
								},
							
								// Horizontal axis
								xAxis: [{
									type: 'category',
									boundaryGap: true,
									axisTick: {onGap: false},
									splitLine: {show: false},
									data: [
										1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160
									]
								}],

								// Vertical axis
								yAxis: [
									{
										type: 'value',
										scale: true,
										splitNumber: 5,
										boundaryGap: [0.01, 0.01],
										min: 0,
										max:100
									},
									{
										type: 'value',
										scale: true,
										splitNumber: 5,
										boundaryGap: [0.05, 0.05],
										min: 0,
										max:100
									}
								],

								// Add series (line data)
								series: [
									{
										name: 'Turnover (million)',
										type: 'line', //chart type
										yAxisIndex: 1,
										symbol: 'none',
										data: [
											31,49,50.5,41.5,35.5,25.5,53,28.5,41,46,45,39.5,46.5,45.5,55,41,26,40.5,38,42,37.5,46,42,37.5,42,32,35,32.5,48,41.5,51,50,48.5,44,47,36.5,41,43,36.5,55,39,32,54,42,44.5,51.5,39,50.5,45.5,37.5,39,46.5,41.5,46.5,44.5,42,42.5,34.5,49,45.5,47,44,30,38.5,39.5,40.5,40,27,35,41.5,42,41.5,35,45.5,38.5,36.5,38,35,47,33.5,39,46,36,45,33.5,43.5,42,50,44,33,49,42,40.5,42.5,39,49.5,38.5,37,27,36.5,41.5,40,46,40,44,47.5,45.5,33,30,45.5,43,43,38.5,37,37.5,34,45.5,36,40,43.5,37,36.5,46.5,43.5,37.5,44.5,46.5,44.5,40,40,35.5,35,34,53.5,49,42,35.5,44,50.5,52.5,30,39,35,51,49.5,39.5,28.5,39.5,41,43.5,33.5,26.5,50,28,38.5,52.5,42,43,41,43
										],

										markPoint: {
											symbol: 'emptyPin',
											itemStyle: {
												normal: {
													color: '#1e90ff'
												}
											},
											data: [
												{
													type: 'max',
													name: 'Maximum',
													symbolSize: 5,
													itemStyle: {
														normal: {
															label: {
																position: 'top'
															}
														}
													}
												},
												{
													type: 'min',
													name: 'Minimum',
													symbolSize: 5,
													itemStyle: {
														normal: {
															label: {
																position: 'top',
															}
														}
													}
												}
											]
										},

										markLine: {
											symbol: 'none',
											itemStyle: {
												normal: {
													color: '#1e90ff',
													label: {
														show: true
													}
												}
											},
											data: [{
												type: 'average',
												name: 'Average'
											}]
										}
									},

									{
										name: '구간별 dB정보',
										type: 'k', //chart type
										itemStyle: {
											normal: {
												color: '#66BB6A',
												color0: '#FF7043',
												lineStyle: {
													color: '#66BB6A',
													color0: '#FF7043',
												}
											}
										},
										data: [
											[	54	,	41	,	25	,	37	]	,
											[	56	,	32	,	45	,	53	]	,
											[	40	,	41	,	52	,	49	]	,
											[	52	,	48	,	30	,	53	]	,
											[	42	,	31	,	30	,	41	]	,
											[	26	,	52	,	25	,	26	]	,
											[	36	,	48	,	52	,	54	]	,
											[	33	,	51	,	32	,	25	]	,
											[	54	,	45	,	29	,	53	]	,
											[	42	,	48	,	43	,	49	]	,
											[	37	,	41	,	41	,	49	]	,
											[	45	,	50	,	39	,	40	]	,
											[	41	,	50	,	54	,	39	]	,
											[	41	,	39	,	45	,	46	]	,
											[	48	,	25	,	54	,	56	]	,
											[	54	,	46	,	55	,	27	]	,
											[	52	,	31	,	26	,	26	]	,
											[	55	,	25	,	53	,	28	]	,
											[	55	,	36	,	43	,	33	]	,
											[	43	,	40	,	40	,	44	]	,
											[	40	,	36	,	29	,	46	]	,
											[	50	,	27	,	53	,	39	]	,
											[	45	,	37	,	44	,	40	]	,
											[	33	,	37	,	39	,	36	]	,
											[	39	,	54	,	37	,	47	]	,
											[	42	,	31	,	36	,	28	]	,
											[	34	,	52	,	40	,	30	]	,
											[	42	,	44	,	26	,	39	]	,
											[	47	,	46	,	47	,	49	]	,
											[	55	,	39	,	43	,	40	]	,
											[	41	,	25	,	46	,	56	]	,
											[	54	,	34	,	45	,	55	]	,
											[	43	,	54	,	42	,	55	]	,
											[	43	,	54	,	54	,	34	]	,
											[	53	,	48	,	51	,	43	]	,
											[	36	,	31	,	33	,	40	]	,
											[	50	,	37	,	43	,	39	]	,
											[	37	,	29	,	52	,	34	]	,
											[	43	,	41	,	45	,	28	]	,
											[	32	,	39	,	55	,	55	]	,
											[	56	,	31	,	28	,	50	]	,
											[	53	,	33	,	30	,	34	]	,
											[	29	,	27	,	52	,	56	]	,
											[	46	,	27	,	49	,	35	]	,
											[	40	,	52	,	37	,	52	]	,
											[	32	,	34	,	53	,	50	]	,
											[	31	,	25	,	27	,	51	]	,
											[	39	,	40	,	55	,	46	]	,
											[	43	,	36	,	56	,	35	]	,
											[	51	,	42	,	28	,	47	]	,
											[	31	,	39	,	37	,	41	]	,
											[	55	,	31	,	46	,	47	]	,
											[	37	,	51	,	46	,	37	]	,
											[	53	,	41	,	56	,	37	]	,
											[	32	,	37	,	47	,	42	]	,
											[	36	,	41	,	40	,	44	]	,
											[	31	,	27	,	52	,	33	]	,
											[	35	,	50	,	38	,	31	]	,
											[	42	,	48	,	47	,	51	]	,
											[	26	,	35	,	44	,	47	]	,
											[	55	,	46	,	42	,	52	]	,
											[	33	,	56	,	38	,	50	]	,
											[	53	,	52	,	34	,	26	]	,
											[	38	,	51	,	36	,	41	]	,
											[	38	,	30	,	45	,	34	]	,
											[	49	,	44	,	36	,	45	]	,
											[	47	,	54	,	46	,	34	]	,
											[	29	,	26	,	26	,	28	]	,
											[	49	,	52	,	41	,	29	]	,
											[	36	,	42	,	43	,	40	]	,
											[	32	,	38	,	52	,	32	]	,
											[	46	,	52	,	52	,	31	]	,
											[	36	,	42	,	26	,	44	]	,
											[	27	,	55	,	39	,	52	]	,
											[	36	,	45	,	26	,	51	]	,
											[	28	,	55	,	41	,	32	]	,
											[	37	,	33	,	36	,	40	]	,
											[	50	,	26	,	30	,	40	]	,
											[	48	,	26	,	51	,	43	]	,
											[	37	,	26	,	30	,	37	]	,
											[	48	,	52	,	26	,	52	]	,
											[	37	,	25	,	55	,	37	]	,
											[	44	,	32	,	36	,	36	]	,
											[	35	,	34	,	53	,	37	]	,
											[	25	,	36	,	33	,	34	]	,
											[	53	,	45	,	51	,	36	]	,
											[	37	,	26	,	54	,	30	]	,
											[	55	,	31	,	46	,	54	]	,
											[	27	,	53	,	53	,	35	]	,
											[	48	,	49	,	37	,	29	]	,
											[	34	,	48	,	55	,	43	]	,
											[	50	,	37	,	55	,	29	]	,
											[	44	,	45	,	45	,	36	]	,
											[	55	,	48	,	39	,	46	]	,
											[	47	,	55	,	32	,	46	]	,
											[	47	,	30	,	47	,	52	]	,
											[	48	,	26	,	25	,	52	]	,
											[	51	,	52	,	43	,	31	]	,
											[	39	,	28	,	25	,	29	]	,
											[	40	,	39	,	32	,	41	]	,
											[	47	,	32	,	33	,	50	]	,
											[	41	,	41	,	25	,	55	]	,
											[	40	,	47	,	51	,	41	]	,
											[	29	,	47	,	47	,	33	]	,
											[	26	,	55	,	49	,	39	]	,
											[	35	,	31	,	47	,	48	]	,
											[	50	,	37	,	41	,	50	]	,
											[	43	,	26	,	41	,	25	]	,
											[	41	,	50	,	25	,	35	]	,
											[	33	,	35	,	48	,	43	]	,
											[	44	,	29	,	47	,	39	]	,
											[	44	,	50	,	31	,	55	]	,
											[	51	,	50	,	49	,	28	]	,
											[	44	,	27	,	25	,	49	]	,
											[	46	,	56	,	30	,	45	]	,
											[	50	,	49	,	26	,	42	]	,
											[	41	,	45	,	46	,	45	]	,
											[	31	,	51	,	29	,	43	]	,
											[	39	,	28	,	26	,	54	]	,
											[	51	,	43	,	54	,	33	]	,
											[	52	,	30	,	40	,	34	]	,
											[	45	,	29	,	38	,	35	]	,
											[	36	,	28	,	46	,	47	]	,
											[	31	,	45	,	51	,	36	]	,
											[	30	,	41	,	30	,	45	]	,
											[	28	,	51	,	35	,	54	]	,
											[	42	,	34	,	50	,	43	]	,
											[	30	,	33	,	43	,	46	]	,
											[	38	,	26	,	41	,	39	]	,
											[	44	,	49	,	42	,	38	]	,
											[	39	,	44	,	32	,	39	]	,
											[	41	,	33	,	25	,	45	]	,
											[	27	,	51	,	38	,	30	]	,
											[	52	,	25	,	56	,	51	]	,
											[	55	,	30	,	51	,	47	]	,
											[	34	,	44	,	37	,	47	]	,
											[	33	,	34	,	43	,	28	]	,
											[	43	,	32	,	50	,	38	]	,
											[	35	,	54	,	45	,	56	]	,
											[	35	,	50	,	49	,	56	]	,
											[	50	,	56	,	34	,	26	]	,
											[	40	,	40	,	27	,	51	]	,
											[	50	,	25	,	27	,	43	]	,
											[	36	,	54	,	51	,	51	]	,
											[	27	,	53	,	51	,	48	]	,
											[	40	,	37	,	35	,	44	]	,
											[	29	,	33	,	32	,	25	]	,
											[	27	,	44	,	40	,	39	]	,
											[	30	,	38	,	43	,	39	]	,
											[	26	,	27	,	45	,	42	]	,
											[	53	,	27	,	29	,	38	]	,
											[	27	,	27	,	26	,	27	]	,
											[	53	,	31	,	54	,	46	]	,
											[	44	,	40	,	30	,	26	]	,
											[	53	,	25	,	45	,	32	]	,
											[	40	,	27	,	55	,	50	]	,
											[	33	,	55	,	30	,	54	]	,
											[	52	,	32	,	32	,	54	]	,
											[	33	,	42	,	53	,	29	]	,
											[	32	,	43	,	34	,	52	]	

										]
									}
								]
            };

            candlestick_line.setOption(candlestick_line_options);

            window.onresize = function () {
                setTimeout(function (){
                    candlestick_line.resize();
                }, 200);
            }
        }
    );

	var markerPosition  = new daum.maps.LatLng(37.515647, 126.995910); 

	function mapCreate() {
		map = new daum.maps.Map(document.getElementById('map'), {
			center: markerPosition,
			level: 4,
			mapTypeId :2
		});	
		
		map.setKeyboardShortcuts(true);
		var zoomControl = new daum.maps.ZoomControl();
		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

		var mapTypeControl = new daum.maps.MapTypeControl();
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
		// 마커가 표시될 위치입니다 

		// 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
		var linePath = [
			new daum.maps.LatLng(	37.52155480406646,126.96158654785881	),
			new daum.maps.LatLng(	37.52038896107959,126.96464705182674	),
			new daum.maps.LatLng(	37.519461602576285,126.96697774036483	),
			new daum.maps.LatLng(	37.517939976985446,126.97105626740353	),
			new daum.maps.LatLng(	37.517467226017345,126.97220457711472	),
			new daum.maps.LatLng(	37.51688198460135,126.9740089798564	),
			new daum.maps.LatLng(	37.51655789414682,126.97527032005233	),
			new daum.maps.LatLng(	37.516224896664546,126.97712550114628	),
			new daum.maps.LatLng(	37.51603616303472,126.97973848785028	),
			new daum.maps.LatLng(	37.516005118080216,126.98283215778179	),
			new daum.maps.LatLng(	37.51614953078966,126.98466457126872	),
			new daum.maps.LatLng(	37.516415640853346,126.98731139348659	),
			new daum.maps.LatLng(	37.51660049001788,126.98872529552591	),
			new daum.maps.LatLng(	37.5167537198995,126.98936437164836	),
			new daum.maps.LatLng(	37.51694748523264,126.98992992010324	),
			new daum.maps.LatLng(	37.517186295747365,126.99046718688192	),
			new daum.maps.LatLng(	37.517844114134355,126.99159826864545	),
			new daum.maps.LatLng(	37.51826312960522,126.99231651574023	),
			new daum.maps.LatLng(	37.51870918163643,126.99322141280737	),
			new daum.maps.LatLng(	37.51915073433795,126.99438649358916	),
			new daum.maps.LatLng(	37.51958776640286,126.99544412515235	),
			new daum.maps.LatLng(	37.520087865506774,126.99672234997529	),
			new daum.maps.LatLng(	37.520790682896525,126.99843044622402	),
			new daum.maps.LatLng(	37.52127272935297,126.99964649462308	),
			new daum.maps.LatLng(	37.521502485507646,127.00015554284282	),
			new daum.maps.LatLng(	37.52173674474885,127.00061368913485	),
			new daum.maps.LatLng(	37.52196649834361,127.00093609090557	),
			new daum.maps.LatLng(	37.52231788567404,127.00132637067573	),
			new daum.maps.LatLng(	37.52266927226265,127.00167706076638	),
			new daum.maps.LatLng(	37.52299362922978,127.00193725395992	),
			new daum.maps.LatLng(	37.523439620739026,127.00220876547309	),
			new daum.maps.LatLng(	37.5239216510917,127.00250856284192	),
			new daum.maps.LatLng(	37.52443071017536,127.00283099037955	),
			new daum.maps.LatLng(	37.524903728392985,127.00314776442188	),
			new daum.maps.LatLng(	37.52524159784312,127.00337969042974	),
			new daum.maps.LatLng(	37.52558847456896,127.00368515231783	),
			new daum.maps.LatLng(	37.52585876606264,127.00396798722618	),
			new daum.maps.LatLng(	37.52615608238571,127.00437526771233	),
			new daum.maps.LatLng(	37.52666962526311,127.0050823593895	),
			new daum.maps.LatLng(	37.52704801932864,127.00567066335375	),
			new daum.maps.LatLng(	37.5273858635485,127.00629290915863	),
			new daum.maps.LatLng(	37.52788586375061,127.00726588383405	),
			new daum.maps.LatLng(	37.528358827809406,127.00821058541943	),
			new daum.maps.LatLng(	37.52895340398716,127.00935329710477	),
			new daum.maps.LatLng(	37.5295794970366,127.01057522533166	),
			new daum.maps.LatLng(	37.529867770852206,127.01108437217647	),
			new daum.maps.LatLng(	37.53023262201806,127.01165010241785	),
			new daum.maps.LatLng(	37.53066505894309,127.01208574290456	),
			new daum.maps.LatLng(	37.53114254309567,127.012532709615	),
			new daum.maps.LatLng(	37.53184977647677,127.01301932003142	),
			new daum.maps.LatLng(	37.533421909455406,127.01401522590888	),
			new daum.maps.LatLng(	37.53564720219549,127.01545256390155	),
			new daum.maps.LatLng(	37.53673281321749,127.01615994459303	),
			new daum.maps.LatLng(	37.537606704838744,127.01672586512369	),
			new daum.maps.LatLng(	37.5387058145005,127.01748985996204	),
			new daum.maps.LatLng(	37.53913373452662,127.01785769317564	),
			new daum.maps.LatLng(	37.539818365867355,127.01868950697535	),
			new daum.maps.LatLng(	37.540255243301175,127.01935720332811	),
			new daum.maps.LatLng(	37.54076868266975,127.02013807911563	),
			new daum.maps.LatLng(	37.54179554888961,127.02168288990978	),
			new daum.maps.LatLng(	37.54231798273071,127.02246380041069	),
			new daum.maps.LatLng(	37.542736825278666,127.02309758926602	),
			new daum.maps.LatLng(	37.543034031739545,127.02372003119886	),
			new daum.maps.LatLng(	37.543335668250975,127.02468760240204	),
			new daum.maps.LatLng(	37.54350215428059,127.02562118849913	),
			new daum.maps.LatLng(	37.54352002500748,127.02630012655662	),
			new daum.maps.LatLng(	37.543447771176425,127.02706955663174	),
			new daum.maps.LatLng(	37.54330343504739,127.02782764291793	),
			new daum.maps.LatLng(	37.54266329059889,127.02961523863237	),
			new daum.maps.LatLng(	37.54261370719487,127.0297283729724	)
		];
		
		// 지도에 표시할 선을 생성합니다
		var polyline = new daum.maps.Polyline({
			path: linePath, // 선을 구성하는 좌표배열 입니다
			strokeWeight: 5, // 선의 두께 입니다
			strokeColor: '#fa9205', // 선의 색깔입니다
			strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
			strokeStyle: 'dash' // 선의 스타일입니다
		});

		// 지도에 선을 표시합니다 
		polyline.setMap(map);  


		// 마커를 생성합니다
		var marker = new daum.maps.Marker({
			position: markerPosition
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

		var iwContent = '<div style="padding-left:10px;padding-right:10px;">반포대교 : 서울 특별시 반포동 </div>', 
			iwPosition = markerPosition; //인포윈도우 표시 위치입니다

		// 인포윈도우를 생성합니다
		var infowindow = new daum.maps.InfoWindow({
			position : iwPosition, 
			content : iwContent 
		});
		  
		// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
		infowindow.open(map, marker); 
	}
	mapCreate();
});
