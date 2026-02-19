<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<!-- ChartJS -->
<!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
  <script type="text/javascript" src="/resources/plugins/chart.js/Chart.min.js"></script>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/pda/manage/main#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

		<!-- Main content -->
		<section class="content">
		  <div class="container-fluid">

		    <div class="row">
          <!-- Left col -->
          <section class="col-lg-7 connectedSortable">
            <!-- Custom tabs (Charts with tabs)-->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-chart-pie mr-1"></i>
                  생산등록현황
                </h3>
              </div><!-- /.card-header -->
              <div class="card-body">
                <!-- Morris chart - Sales -->
                <canvas id="myChart" height="300" style="height: 300px;"></canvas>
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </section>
        </div>
        <!-- /.row (main row) -->


        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3><sup style="font-size: 20px">원소재입고</sup> </h3>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="/pda/rcv/rcvrawmtis.htm?page=rcvrawmtis" class="small-box-footer">바로가기 <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3><sup style="font-size: 20px">출하관리</sup></h3>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="/pda/ship/shipreg.htm?page=shipreg" class="small-box-footer">바로가기 <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3><sup style="font-size: 20px">재고관리</sup> </h3>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <a href="/pda/stock/stockmov.htm?item=stock&page=stockmov" class="small-box-footer">바로가기 <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3><sup style="font-size: 20px">외주관리</sup> </h3>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="/pda/os/osprocin.htm?item=os&page=osprocship" class="small-box-footer">바로가기 <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->

		  </div>
		</section>
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
