$(function() {

	 $('#ajax').jstree({
			'core' : {
				'check_callback': true, //add, rename, Del를 적용여부
				"themes" : { "stripes" : true }, //격자배경
				'data' : {
					 //"url": "/module/sysModule/obs/obs.do?calltype=o,c,g,m",
					 "url": "/module/sysmodule/obs/obs?calltype=o,c,g,m",
					 "dataType" : "json" // needed only if you do not supply JSON headers
					}
				},
				"search": {
					"case_insensitive": true,
					"show_only_matches" : true
				},
				//검색 , 선택배경반전, 체크박스
				"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
		});

	// ajax demo
	 $('#ajax').on("select_node.jstree", function (e, data) {
		//	console.log(data)
			onClickChk().then(function(done){
			 if (done==1)
				{

					if(data.selected.length) {

						//node_click(data.selected);

						/* 한개 선택하는 방식일때 사용 */
						node_id			 = data.instance.get_node(data.selected[0]).id;
						P_node_id	     = data.instance.get_node(data.selected[0]).parent;
						node_nm	     = data.instance.get_node(data.selected[0]).text;

						a_attr				 = data.instance.get_node(data.selected[0]).a_attr;
						type				 = a_attr.T;

						$("#tree_sn").val(node_id);
						$("#tree_pn").val(P_node_id);
						$("#tree_md").val("");

						 loadCall(type); //select type page load
						 BlockShow($("#Select_item_info"));

					}else{
						//null data
					}
				}
			});
		});


	//$("#ajax").on("dblclick.jstree", function (event) {
	$("#ajax").bind("dblclick.jstree", function(e) {

			 var data= $("#ajax").jstree().get_selected(true);
             if (onDblChk()==2)
			 {

					 if(data.length) {
						/* 한개 선택하는 방식일때 사용 */
						node_id			 =data[0].id;
						P_node_id	     =data[0].id.parent;
						node_nm	     =data[0].text;

						a_attr				 =data[0].a_attr;
						type				 =a_attr.T;

						$("#tree_sn").val(node_id);
						$("#tree_pn").val(P_node_id);
						$("#tree_md").val("");

						 loadCall(type); //select type page load
						 BlockShow($("#Select_item_info"));

					}else{
						//null data
					}
			 }
     });


	$('#ajax').on("loaded.jstree", function (e, data) { //first loading
			R_id=$('#ajax ul > li:first').attr("id");
			//console.log("loding", R_id);
			$('#ajax').jstree().select_node(R_id);

			$(this).height(cHeight-200);
			$(this).css("overflow-y","auto");
	});


	//검색
	var to = false;
	$('#Search_nm').keyup(function () {
		if(to) { clearTimeout(to); }
		to = setTimeout(function () {
			var v = $('#Search_nm').val();
			$('#ajax').jstree(true).search(v);
		}, 250);
	});

	i18next.loadNamespaces(["obs"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('body').localize();		//다국어 반영
	});

	i18next.loadNamespaces(["user"], function(err, t){
		jqueryI18next.init(i18next, $);		//jquery 사용위해 선언
		$('body').localize();		//다국어 반영
	});

	$(document).on("click", "#AddGroup", function(){

			 $("#tree_ps").val("");
			 $("#tree_md").val("c");
			//console.log($('#tree_form').serialize());
			 loadCall("g");
	});

	$(document).on("click", "#AddCom", function(){

			 $("#tree_ps").val("");
			 $("#tree_md").val("c");
			//console.log($('#tree_form').serialize());
			 loadCall("c");
	});

	$(document).on("click", "#cancel",function() {
		$("#tree_md").val("");
		$('#ajax').jstree().deselect_all();
		$('#ajax').jstree().select_node($("#tree_sn").val());	//트리 선택
	});

	$(document).on("click", "#AddMan",function() {
		 $("#tree_ps").val("");
		 $("#tree_md").val("m");
		 loadCall("m");
	});

	$(document).on("click", ".obsSort",function() {

				var Sort_str="";
				$('li', '.dropdown-menu-sortable').each(function(i) {
					   var SortSeqNo = $(this).attr("seqNo");
						Sort_str =Sort_str +SortSeqNo+"/"+(i+1) +",";
				});

				if (Sort_str!="")
				{
					$("#obs_Sort").val(Sort_str);

					$.ajax({
							//url:'/module/sysmodule/Obs/Obs_Sort.do',
							url:'/module/sysmodule/obs/obsSort',
							type:'post',
							global: false,
							isLocal:true,
							data: $('#Sort_form').serialize(),
							success:function(data){
									$('#ajax').jstree(true).refresh();
									alert(i18next.t("msg.saveOk"))
							}
						});
				}else{
					alert(i18next.t("obs:msg.SortNo"))
				}
	});

	//트리접기확장스크립트 .Htmlhead page에 있음
	treeExpansion("ajax");

});




function loadCall(kind){
	//console.log(kind)
	//targetUrl='/data.do?callcmd=obs_'+kind;
	//targetUrl='/module/sysmodule/Obs/Obs_'+kind+'.page';
	targetUrl='/module/sysmodule/obs/obs_'+kind.toUpperCase();  // pathVariable로는 불가..  json, html return 및페이지 구성이 다름.
	//targetUrl='/module/sysmodule/obs/page/'+kind.toUpperCase();  // pathVariable 처리.. 하지말자...소스관리 차원에서.
	//alert('loadCall targetUrl : '+targetUrl);
	val=$('#tree_form').serialize();
	callAjax(targetUrl, val);
}

function callAjax(targetUrl, val, hMode){

		$.ajax({
			url:targetUrl,
			type:'post',
			data: val,
			success:function(data, status, xhr){

				$("#Select_item_info").html(data);

				if (hMode!="n")
				{
					SetHistory(this, "callAjax");
				}

				loadSuccess();
				BlockHide();
			}
		})
}

function loadSuccess(){
	 $('.select').select2();
	 $(".styled").uniform({ radioClass: 'choice' });
	 $(".file-styled").uniform({
	     fileButtonClass: 'action btn bg-pink-400'
	 });

	 $(".control-primary").uniform({
			radioClass: 'choice',
			wrapperClass: 'border-primary-600 text-primary-800'
	 });

	 $('#Select_item_info').localize();		//다국어 반영

	 var containers = $('.dropdown-menu-sortable').toArray();
	 dragula(containers);
	// Init dragula
//	dragula(containers, {
	//   mirrorContainer: document.querySelector('.dropdown-menu-sortable')
//	});


}

	//Back, forword버튼 처리
	window.onpopstate = function(e) {
		try
		{
					FnName= e.state.FnName;
					url		   = e.state.url;
					data	   = e.state.data;

					tree_snArr= data.split("&");
					tree_sn	 = tree_snArr[0].replace("tree_sn=", "");

					window[FnName](url,data, "n");

					//트리 선택효과
					$('#ajax').jstree().deselect_all();
					$("#"+tree_sn).attr("aria-selected", true);
					$("#"+tree_sn+">div").addClass("jstree-wholerow-clicked");
					$("#"+tree_sn+">a").addClass("jstree-clicked");

					mnu_seqno= e.state.menu_seqno;
					if (mnu_seqno!="")
					{
						setCookie("menu_seqno", mnu_seqno,"")
						//console.log( getCookie("menu_Seqno")) ;
					}
					//실제 선택된 이벤트발생으로 히스토리가 발생하므로 사용할 수 없음
					//$('#ajax').jstree().select_node(tree_sn);

		}
		catch (e){}
	};