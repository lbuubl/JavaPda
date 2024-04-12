 var validator ;

function validationInit(){
	validator = $("#frm").validate({
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
        //success: function(label) {
            //label.addClass("validation-valid-label").html("<span data-i18n='bbs:validation.success'></span>");
			//label.addClass("validation-valid-label").text(i18next.t("bbs:validation.success"));
        //},
        rules: { 
			 groupNm: {
			 },
			 groupMemo: {
				 maxlength : 100
			 }
			 
        },
        messages: {
            groupNm: {
                required:  i18next.t("AuthMng:msg.insertGroupNm"),
            },
			groupMemo: {
                maxlength:  i18next.t("AuthMng:msg.maxLengthMemo"),
            }
			//,agree: "Please accept our policy"
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) { 
 			if($("#seqIdx").val()==""){
				groupSubmit();
			}else{ 
				swal({
					title: i18next.t("AuthMng:msg.updateGroup"), 
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#EF5350",
					confirmButtonText: i18next.t("common:btn.yes"),
					cancelButtonText: i18next.t("common:btn.cancel"),
					closeOnConfirm: false,
					closeOnCancel: true
				},
				function(isConfirm){
					if (isConfirm) { 						
						groupSubmit();
					}
				})

			}
			return false;
		}
    });

}
 