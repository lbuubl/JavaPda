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
			 bbs_Title: {
				//minlength : 6
			 }
			 
        },
        messages: {
            bbs_Title: {
                required: i18next.t("bbs:msg.insertTitle"),
            }
			//,agree: "Please accept our policy"
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) { 
 			if(editorCheck() ){
				popupCheck();
				var uploader= new $("#uploadEvent").pluploadQueue();  
				uploader.start(); 
			}
			return false;
		}
    });
	//console.log(validator);
	//console.log($("#frm"));
}

	//editor validation fucntion (사용 안함)
	function validationChecnk(){ 
	
		var error1 = $('.editor-validation-error');
		//var success1 = $('.editor-validation-success'); 
		 
		//데이터 검사  
		if($(tinymce.activeEditor.getBody()).text() == ""){ 
			//success1.hide();
			error1.show();
			error1.children().show()
			//포커스 이동
			//$('html,body').animate({scrollTop: $(form1).offset().top},500); 
			return false;
		}else{
			//success1.show();
			//success1.children().show()
			error1.hide();
			return true;
		} 
	}
	