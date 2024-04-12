 var validator ;

function validation(){
	validator = $("#item_form").validate({
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        highlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },

        // Different components require proper error label placement
        errorPlacement: function(error, element) {
            // Styled checkboxes, radios, bootstrap switch
            if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
                if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                    error.appendTo( element.parent().parent().parent().parent() );
                }
                 else {
                    error.appendTo( element.parent().parent().parent().parent().parent() );
                }
            }
            // Unstyled checkboxes, radios
            else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                error.appendTo( element.parent().parent().parent() );
            }
            // Input with icons and Select2
            else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
                error.appendTo( element.parent() );
            }
            // Inline checkboxes, radios
            else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                error.appendTo( element.parent().parent() );
            }
            // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo( element.parent().parent() );
            }
            else {
                error.insertAfter(element);
            }
        },
        validClass: "validation-valid-label",
        messages: {
            g_nm: {
                required: i18next.t("obs:msg.gName")
            }
			//,agree: "Please accept our policy"
        },
		rules: {
			g_nm: "underbar_Chk"
		}
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) {
			BlockShow($("#Select_item_info"));
			DBProcess();
			return false;
		}
    });
}

$('#del').on("click", function () {


			if (confirm(i18next.t("msg.delYn")) == true){    //확인
					BlockShow($("#Select_item_info"));
					$.ajax({
						//url:"/module/sysmodule/obs/obs_Exists.Do",
						url:"/module/sysmodule/obs/obsExists",
						type:'post',
						data:$('#item_form').serialize(),
						success:function(data){
							if (data.length >1) // 0/12/5
							{
								if (data.indexOf("@")==0) //lower Y
									{
										alert(i18next.t("obs:msg.lowerY"));
										return false;
									}else{
											arr_d=data.split("/");
											Exists_str= i18next.t("obs:msg.docEx")+":"+ arr_d[0]+","+ i18next.t("obs:msg.appEx")+":"+arr_d[1] +","+i18next.t("obs:msg.formEx")+":"+	arr_d[2] +"\n";
											Exists_str= Exists_str + i18next.t("obs:msg.ExistsDelYn");

											if (confirm(Exists_str) == true){    //확인
													$("#md").val("e");
													DBProcess();
											}else{
												return;
											}
									}
							}else{ //null

								$("#md").val("e");
								DBProcess();
							}
						}
					})

			}else{   //취소
				return;
			}


});

function DBProcess(){

			$.ajax({
				//url:"/module/sysmodule/obs/obs_g.Do",
				url:"/module/sysmodule/obs/dml/g",  // group(부문)
				type:'post',
				data:$('#item_form').serialize(),
				success:function(data){
					if (data.indexOf("/") > 0)
					{
							arr_trr_info=data.split("/");
							tree_id=arr_trr_info[1];
							tree_rename=$("#g_nm").val();

							var ref = $('#ajax').jstree(),
								sel = ref.get_selected();

							if(!sel.length) { return false; }
							sel = sel[0];
							ps= $("#ps").val();
							ref.create_node(sel, {"id":tree_id, "text": tree_rename ,  "icon":" icon-popout", "parent": ps, "a_attr":{"T":"G"}, "state":{"opened":true}});

							alert(i18next.t("msg.saveOk"));
							$("#tree_md").val("");

					}else if(data=="2"){

							$('#ajax').jstree().select_node($("#gn").val());	//트리 선택
							Sel=$('#ajax').jstree().get_selected();	//트리 선택
							$('#ajax').jstree().rename_node(Sel, $("#g_nm").val());	//이름변경

							alert(i18next.t("msg.editOk"));
							$("#tree_md").val("");

					}else if(data=="3"){

							Sel=$('#ajax').jstree().get_selected();	//트리 선택
							$('#ajax').jstree().delete_node(Sel);	//트리 삭제

							alert(i18next.t("msg.delOk"));

					}else if(data=="4"){

							$('#ajax').jstree().select_node($("#gn").val());	//트리 선택
							alert(i18next.t("msg.DbError")); //에러 경고

					}else{

							alert( i18next.t("obs:msg.gCodeEXISTS"));
							$("#g_code").focus();
					}
					BlockHide();
				}
			})
}

$(function() {

    // Constructs the suggestion engine for 1st dataset
    var nbaTeams = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
		//prefetch:"/module/SysModule/obs/userList.Do"
		prefetch:"/module/sysmodule/obs/userList" // 자동완성 문자열
    });

    // Initialize engines
    nbaTeams.initialize()

    // Initialize 1st dataset
    $('.typeahead-multiple-datasets').typeahead(
        {
            highlight: true
        },
        {
            name: 'group',
            displayKey: 'name',
            source: nbaTeams.ttAdapter()
        }
    );


	// validation();
	 validation();
 });