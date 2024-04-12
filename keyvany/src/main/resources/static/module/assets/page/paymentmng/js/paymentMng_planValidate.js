var planValidator ;

function planValidateInit(){ 
	planValidator = $("#pFrm").validate({
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
        ignore: [],
		rules: { 
			"plan-date" : {
                date: true
            }
			,"plan-money" : {
				number:true
			}
			,"plan-depositMny" : {
				number:true
			}
			 


        }, 
        messages: {
			 "plan-date" : {
                date : i18next.t("common:validation.date"),
				required : i18next.t("common:validation.required")
            }
			
			,"plan-money" : {
				date:i18next.t("common:validation.number"),
				required : i18next.t("common:validation.required")
			}
			,"plan-depositMny" : {
				date:i18next.t("common:validation.number"),
				required : i18next.t("common:validation.required")
			}
        }
		//before handler
		, invalidHandler:  function(event, planValidator) {
          // validationChecnk();
        }
		,submitHandler: function (form) {  

		 
			return false;
		}
    }); 
}


  