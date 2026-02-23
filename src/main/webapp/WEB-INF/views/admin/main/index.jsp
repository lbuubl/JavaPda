<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<!-- ChartJS -->
<!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
  <script type="text/javascript" src="/resources/plugins/chart.js/Chart.min.js"></script>
  <style>
    :root {
      --primary: #4F46E5;
      --primary-light: #EEF2FF;
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --text-main: #1E293B;
      --text-sub: #64748B;
    }

    .content-wrapper { background-color: var(--bg); }
    
    .pda-header {
      padding: 20px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .pda-header h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      margin: 0;
    }

    /* 통계 카드 스타일 */
    .pda-stat-card {
      background: var(--card-bg);
      border-radius: 20px;
      padding: 20px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      margin-bottom: 20px;
    }

    /* 메인 메뉴 그리드 */
    .pda-menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 100px;
    }

    .pda-menu-item {
      background: var(--card-bg);
      border-radius: 24px;
      padding: 25px 15px;
      text-align: center;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      text-decoration: none !important;
      color: var(--text-main) !important;
      transition: all 0.2s ease;
    }

    .pda-menu-item:active {
      transform: scale(0.95);
      background: #F1F5F9;
    }

    .pda-icon-box {
      width: 60px;
      height: 60px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      font-size: 24px;
    }

    .pda-menu-name {
      font-weight: 700;
      font-size: 16px;
    }

    /* 아이콘 배경색 */
    .bg-soft-blue { background: #EEF2FF; color: #4F46E5; }
    .bg-soft-green { background: #ECFDF5; color: #10B981; }
    .bg-soft-orange { background: #FFF7ED; color: #F59E0B; }
    .bg-soft-red { background: #FEF2F2; color: #EF4444; }

    /* 플로팅 스캔 버튼 */
    .scan-fab {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary);
      color: white;
      width: 75px;
      height: 75px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
      z-index: 1000;
      border: 4px solid white;
    }

    /* 차트 카드 영역 */
    .pda-chart-card {
      background: var(--card-bg);
      border-radius: 24px;
      padding: 15px;
      margin-bottom: 25px;
      border: 1px solid #E2E8F0;
    }
  </style>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <div class="pda-header">
      <h1>hanin<span style="color:var(--primary)">PDA</span></h1>
      <div style="background: var(--primary-light); color: var(--primary); padding: 5px 12px; border-radius: 12px; font-weight: 600; font-size: 14px;">
        ${sessionScope.userName != null ? sessionScope.userName : 'lbuubl'}님
      </div>
    </div>

    <section class="content px-3">
      <!-- 차트 영역 -->
      <div class="pda-chart-card">
        <h6 class="fw-bold mb-3"><i class="fas fa-chart-bar me-2 text-primary"></i>생산 실적 현황</h6>
        <div style="height: 200px;">
          <canvas id="myChart"></canvas>
        </div>
      </div>

      <!-- 메뉴 그리드 -->
      <div class="pda-menu-grid">
        <a href="/pda/rcv/rcvrawmtis.htm?page=rcvrawmtis" class="pda-menu-item">
          <div class="pda-icon-box bg-soft-blue"><i class="fas fa-truck-loading"></i></div>
          <div class="pda-menu-name">원소재입고</div>
        </a>
        <a href="/pda/ship/shipreg.htm?page=shipreg" class="pda-menu-item">
          <div class="pda-icon-box bg-soft-green"><i class="fas fa-shipping-fast"></i></div>
          <div class="pda-menu-name">출하관리</div>
        </a>
        <a href="/pda/stock/stockmov.htm?item=stock&page=stockmov" class="pda-menu-item">
          <div class="pda-icon-box bg-soft-orange"><i class="fas fa-boxes"></i></div>
          <div class="pda-menu-name">재고관리</div>
        </a>
        <a href="/pda/os/osprocin.htm?item=os&page=osprocship" class="pda-menu-item">
          <div class="pda-icon-box bg-soft-red"><i class="fas fa-external-link-alt"></i></div>
          <div class="pda-menu-name">외주관리</div>
        </a>
      </div>
    </section>

    <!-- 플로팅 스캔 버튼 -->
    <div class="scan-fab">
      <i class="fas fa-barcode"></i>
    </div>
  </div>

<script type="text/javascript">

const params ={test :'tttt', test2 :'tttt'}
  $.ajax({
      url : "${pageContext.request.contextPath}/pda/manage/getmainchart",
      type : "POST",
      processData: false,
      contentType : "application/json; charset=utf-8",
      dataType: "json",
      data :JSON.stringify(params),
      success : function(result) {
          console.log('getmainchart====', result.data)
					//라벨
					let allLabels = []
					let allOkInTot = []
					let allBadInTot= []

					$.each(result.data , function (a,b){
					  allLabels.push(b.wc_cd)
					  if(b.ok_in_tot==='undefined'){
					    allOkInTot.push(0)
					  }else{
					    allOkInTot.push(b.ok_in_tot)
					  }

						if(b.bad_in_tot==='undefined'){
							allBadInTot.push(0)
						}else{
							allBadInTot.push(b.bad_in_tot)
						}
					})
			    var areaChartData = {
			      labels  : allLabels,
			      datasets: [
			        {
			          label               : '양품실적계' ,
			          backgroundColor     : 'rgba(60,141,188,0.9)',
			          borderColor         : 'rgba(60,141,188,0.8)',
			          pointRadius          : false,
			          pointColor          : '#3b8bba',
			          pointStrokeColor    : 'rgba(60,141,188,1)',
			          pointHighlightFill  : '#fff',
			          pointHighlightStroke: 'rgba(60,141,188,1)',
			          data                : allOkInTot //[28, 48, 40, 19, 86, 27, 90]
			        },
			        {
			          label               : '불량실적계',
			          backgroundColor     : 'rgba(210, 214, 222, 1)',
			          borderColor         : 'rgba(210, 214, 222, 1)',
			          pointRadius         : false,
			          pointColor          : 'rgba(210, 214, 222, 1)',
			          pointStrokeColor    : '#c1c7d1',
			          pointHighlightFill  : '#fff',
			          pointHighlightStroke: 'rgba(220,220,220,1)',
			          data                : allBadInTot //[65, 59, 80, 81, 56, 55, 40]
			        },
			      ]
			    }



					    //-------------
					    //- BAR CHART -
					    //-------------
					    var barChartCanvas = $('#myChart').get(0).getContext('2d')
					    var barChartData = $.extend(true, {}, areaChartData)
					    var temp0 = areaChartData.datasets[0]
					    var temp1 = areaChartData.datasets[1]
					    barChartData.datasets[0] = temp1
					    barChartData.datasets[1] = temp0

					    var barChartOptions = {
					      responsive              : true,
					      maintainAspectRatio     : false,
					      datasetFill             : false
					    }

					    new Chart(barChartCanvas, {
					      type: 'bar',
					      data: barChartData,
					      options: barChartOptions
					    })


      },
      error : function() {
          alert("처리중 오류가 발생했습니다.");
      }
  });


</script>
