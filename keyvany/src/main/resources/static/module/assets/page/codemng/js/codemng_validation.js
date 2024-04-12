var validator,validator2 ;

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
			 mCode: {
				maxlength : 20
			 },mCodeNm: {
				maxlength : 20
			 },mCodeProperty : {
				maxlength : 255
			 }


        },
        messages: {
			mCode : {
				required : i18next.t("codeMng:validation.code"),
				maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 20 })
			},
			mCodeNm : {
				required : i18next.t("codeMng:validation.codeNm"),
				maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 20 })
			}

			/*
            bbs_Title: {
                required: i18next.t("bbs:msg.insertTitle"),
            }
			*/
			//,agree: "Please accept our policy"
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) {


			//선택한 MstCode 있는경우
			if($("#mSeqIdx").val()!=""){
				dataConfirm(i18next.t("codeMng:msg.form.updateYn"),"info");
			}else{
				formSubmit();
			}
			return false;
		}
    });
}




function validationInit2(){
	validator = $("#frm2").validate({
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
			sCode : {
				 maxlength : 20
			},
			sCodeNm : {
				maxlength : 100
			},
			p1 : {
				maxlength : 100
			},
			p2 : {
				maxlength : 100
			},
			p3 : {
				maxlength : 100
			},
			p4 : {
				maxlength : 100
			},
			p5 : {
				maxlength : 100
			},
			p6 : {
				maxlength : 100
			},
			p7 : {
				maxlength : 100
			}

        },
        messages: {
			sCode : {
				 required: i18next.t("codeMng:validation.code"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 20 })
			},
			sCodeNm : {
				 required: i18next.t("codeMng:validation.codeNm"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 100 })
			},
			p1 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p2 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p3 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p4 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p5 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p6 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			},
			p7 : {
				 required: i18next.t("codeMng:validation.value"),
				 maxlength : i18next.t("common:validation.maxLength", { "maxLength" : 50 })
			}
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) {
			if($("#sSeqIdx").val()!=""){
				dataConfirm(i18next.t("codeMng:msg.form.updateYn"),"info");
				return false;
			}else{
				formSubmit();
			}
			return false;
		}
    });
}



