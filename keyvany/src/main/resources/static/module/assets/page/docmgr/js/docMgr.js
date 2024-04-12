

$(function(){
	//좌측 트리 높이 고정
	$("#ajax_tree").height(cHeight-290)

	//화면 회전시 처리
	$(window).on('orientationchange',function(event) {
		pdsMobileTreeTopSet();
	});
	
	//모바일 트리버튼 클릭
	$(".pds-tree-btn").on("click", function(){
		if(! $(".pdsMobileTree").hasClass("SideTreeActive")){
			pdsMobileTreeTopSet();		
			pdsMTreeShow();
		}else{
			pdsMTreeHide();
		}
	});


	//모바일인 경우 트리 버튼 SHOW
	if(isMobile){
		$(".pds-tree-btn").show();
		$("#treeCol").hide();

		$(".pdsMobileTree").html($("#treeCol").html());	//트리 슬라이드 메뉴에 넣기
		$("#treeCol").html("");		//기존 트리 부분 삭제
		$(".pdsMobileTree").show();	//슬라이드 트리 보이기
	}
});


//모바일 트리슬라이드바 높이 조정
function pdsMobileTreeTopSet(){
	var scrollTop_v = $(document).scrollTop();
	var mTreeTop = 0
		
	$(window).resize(function() {
		var	ccHeight = $(window).height();
		$(".pdsMobileTree").css("top", mTreeTop);
		$(".pdsMobileTree").css("height", ccHeight);

		
		

		$(".pdsMobileTree #mainTreeDiv, .pdsMobileTree #mainTagDiv").height(ccHeight-120)
		var treePanelHeight = $(".pdsMobileTree #mainTreeDiv").height();	
		$("#ajax_tree").height(treePanelHeight-40);

		/*
		$(".pdsMobileTree").find(".panel").height(ccHeight-mTreeTop);	//트리 영역 높이 조정	
		var panelHeight = $(".pdsMobileTree").find(".panel").height();	
		$("#ajax_tree").height(panelHeight-mTreeOffSet);
		*/
	});

	$(window).resize();
}


//트리 슬라이드 열기
function pdsMTreeShow(){
	$(".pdsMobileTree").addClass("SideTreeActive");
}

//트리 슬라이드 닫기
function pdsMTreeHide(){
	$(".pdsMobileTree").removeClass("SideTreeActive");
}