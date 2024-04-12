 var validator = null;


function validationInit(){
	
	var approvalRules = {};
	var approvalMsgs  = {};
 
	$(".editor_validateItem").each(function(i,item){
		approvalRules[$(item).attr("name")] = {"required" : true } ;
	}); 
	//console.log(approvalRules); 
	//console.log(" ================= editor_validateItem ============================= " ) ;
	/*
	$(".editor_dateFormat").each(function(i,item){
		//console.log(typeof(approvalRules[$(item).attr("name")].required));

		if(typeof(approvalRules[$(item).attr("name")].required ) == "string"){
			approvalRules[$(item).attr("name")].date = true ;
		}else{
			approvalRules[$(item).attr("name")] = { "date" : true };
		}
	}); 
	*/
	/*
	console.log(approvalRules);
	console.log(typeof(approvalRules));
    var tmp = {
			"hidden_S3_1_0-0-0_ItemVal" : {
				required : true
			},
			"hidden_S4_1_0-0-0_ItemVal" : {
				required : true
			}
		}

	console.log(tmp);
	console.log(typeof(tmp));
	*/
	
	validator = $("#editor_submitForm").validate({
        ignore: '.select2-search__field', // ignore hidden fields
       
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
		rules : approvalRules,
		/*rules : {
			"hidden_S3_1_0-0-0_ItemVal" : {
				required : true
			},
			"hidden_S4_1_0-0-0_ItemVal" : {
				required : true
			}
		}, 
		*/
		//messages : approvalMsgs, 
		//before handler
         
		invalidHandler:  function(event, validator) { 
			//아이템 값 바인딩
			//console.log($(".editor_validateItem"));
			//CheckUserItem(); 

        }
		,submitHandler: function (form) { 
 			//console.log("submit");
			var uploader= new $("#uploadEvent").pluploadQueue();  
			uploader.start(); 

			return false;
		}
    });
	//console.log(validator);
	//console.log($("#frm"));
}
 
	 