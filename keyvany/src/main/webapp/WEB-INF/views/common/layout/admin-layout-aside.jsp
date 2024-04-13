<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="" alt="kaak" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">kaak</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
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
            <a href="/cms/ship/shipreg.htm" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                                    출고 등록
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                                      재고관리
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
	              <li class="nav-item">
	                <a href="/cms/stock/stockmov.htm" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고이동</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/stock/stockcheck.htm" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고실사</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/stock/stockcheck.htm" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>재고확인</p>
	                </a>
	              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                                      외주관리
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
	              <li class="nav-item">
	                <a href="/cms/os/osprocin.htm" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>외주가공출고</p>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a href="/cms/os/osprocin.htm" class="nav-link">
	                  <i class="far fa-circle nav-icon"></i>
	                  <p>외주가공입고</p>
	                </a>
	              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="/cms/rcv/rcvrawmtis.htm" class="nav-link">
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
  </aside>

