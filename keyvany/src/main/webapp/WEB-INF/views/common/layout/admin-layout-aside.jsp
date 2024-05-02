<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/cms/manage/main" class="brand-link">
      <!-- <img src="" alt="kaak" class="brand-image img-circle elevation-3" style="opacity: .8"> -->
      <img alt="한일정공" src="/resources/dist/img/hanil_logo2-removebg-preview.png" style="opacity: .8" width="236">
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="#" class="d-block">
              ${user.facNm}
              <br>
              ${user.whNm}
              <br>
              ${user.korNm}

          </a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <ul class="nav nav-treeview">
          <li class="nav-header">PDA</li>
          <li class="nav-item">
            <a href="/cms/ship/shipreg.htm?page=shipreg" id="shipreg" class="nav-link ">
              <i class="nav-icon fas fa-truck"></i>
              <p>
                                    출하관리
              </p>
            </a>
          </li>
          <li class="nav-item" id="stock">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-archive"></i>
              <p>
                                      재고관리
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
	              <li class="nav-item">
	                <a href="/cms/stock/stockmov.htm?item=stock&page=stockmov" id="stockmov" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고이동</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/stock/stockcount.htm?item=stock&page=stockcount"  id="stockcount" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고실사</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/stock/stockcheck.htm?item=stock&page=stockcheck"  id="stockcheck" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고확인</p>
	                </a>
	              </li>
            </ul>
          </li>

          <li class="nav-item" id="os">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                                      외주관리
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
	              <li class="nav-item">
	                <a href="/cms/os/osprocin.htm?item=os&page=osprocin" id="osprocin" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>외주가공입고</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/os/osprocship.htm?item=os&page=osprocship" id="osprocship" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>외주가공출고</p>
	                </a>
	              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="/cms/rcv/rcvrawmtis.htm?page=rcvrawmtis" id="rcvrawmtis" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                                    원소재 입고
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside><script type="text/javascript">
  //메뉴 선택값 구정
  const url = new URL(window.location.href);
  // URLSearchParams 객체
  const urlParams = url.searchParams;

  //page 스타일 설정
  const pageId = urlParams.get('page')
  $("#"+pageId).addClass("active");
  $("#"+pageId).css({
      "background-color": "#007bff",
      "color": "#fff",
  });
  $("#"+pageId).addClass("active");


  //item 스타일 설정
  const itemId = urlParams.get('item')
  $("#"+itemId).addClass("menu-is-opening");
  $("#"+itemId).addClass("menu-open");

</script>

