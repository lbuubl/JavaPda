
var validator = null;
function validationInit(){


	validator = $("#mFrm").validate({
        ignore: 'input[type=hidden], .select2-search__field, .FileChk', // ignore hidden fields
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
			usedNm: {

				maxlength : 20


			}
			,expense : {
				number: true,
				maxlength : 13
			}
			,memo : {
				maxlength : 255
			}


        },
        messages: {
			usedNm : {
				required : i18next.t("common:validation.required"),
				maxlength : i18next.t("common:validation.maxlength", { "maxLength" : 20 })
			} ,
			expense : {
				required : i18next.t("common:validation.required"),
				maxlength : i18next.t("common:validation.maxlength", { "maxLength" : 13 }),
				number : i18next.t("common:validation.number")

			},
			memo : {
				maxlength : i18next.t("common:validation.maxlength", { "maxLength" : 250 })
			}
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();

        }
		,submitHandler: function (form) {

			//console.log("submit handler");
			modalDataDML();
			return false;
		}
    });
}

