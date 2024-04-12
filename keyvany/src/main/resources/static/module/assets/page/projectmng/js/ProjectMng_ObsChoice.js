$(function(){

	// ajax demo
	$('#obs_tree').on("select_node.jstree", function (e, data) {
		if(data.selected.length) {
			/* 한개 선택하는 방식일때 사용 */
			node_id	     = data.instance.get_node(data.selected[0]).id;
			P_node_id	     = data.instance.get_node(data.selected[0]).parent;
			node_nm	     = data.instance.get_node(data.selected[0]).text;

			a_attr		     = data.instance.get_node(data.selected[0]).a_attr;
			type		     = a_attr.T;

			$("#m_obsSeqIdx").val(node_id);
			$("#m_obsNm").val(node_nm);
			/*
			$("#tree_sn").val(node_id);
			$("#tree_pn").val(P_node_id);
			$("#tree_md").val("");

			 loadCall(type); //select type page load
			 BlockShow($("#Select_item_info"));
			 */

		}else{
			//null data
		}
	});
	$.ajax({
		//"url": "/module/sysModule/obs/obs.do",
		"url": "/module/sysmodule/obs/obs",
		"dataType" : "json",
		"type" : "post",
		"data" : {
			"GongGuCode" : $("#select_Gonggu").val()
		},
		"success" : function(nodeData){
			//console.log(nodeData);
			//console.log(" ! ");
			$('#obs_tree').jstree({
				'core' : {
					'check_callback': true, //add, rename, Del를 적용여부
					"themes" : { "stripes" : true }, //격자배경
					'data' : nodeData
					},
				//검색 , 선택배경반전, 체크박스
				"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
			});
		}
	})
	/*
	$('#obs_tree').jstree({
		'core' : {
			'check_callback': true, //add, rename, Del를 적용여부
			"themes" : { "stripes" : true }, //격자배경
			'data' : {
				 "url": "/data.do?callcmd=Obs_Tree",
				"dataType" : "json" // needed only if you do not supply JSON headers
				}
			},
		//검색 , 선택배경반전, 체크박스
		"plugins" : ["search", "wholerow"]  //  "types" "checkbox", "contextmenu", "dnd"
	});
	*/
/*
	$('#obs_tree').on("loaded.jstree", function (e, data) { //first loading
		R_id=$('#obs_tree ul > li:first').attr("id");
		$('#obs_tree').jstree().select_node(R_id);

		if (!isMobile)//pc tree height
		{
			$(this).height(cHeight-200);
		}
	});
*/
	//검색
	var to = false;
	$('#obs_Search_nm').keyup(function () {
		if(to) { clearTimeout(to); }
		to = setTimeout(function () {
			var v = $('#obs_Search_nm').val();
			//console.log(v);
			$('#obs_tree').jstree(true).search(v);
		}, 250);
	});

});