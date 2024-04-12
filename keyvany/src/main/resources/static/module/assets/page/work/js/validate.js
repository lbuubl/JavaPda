
function initValidCommon(){
	//종료일이 시작일 보다 큰지 체크
	jQuery.validator.addMethod(
		"greaterThan",
		function(value, element, params) {
			var sDate = $(element).closest("form").find("input[name='"+params.targetNm+"']").val();

			var sDate = new Date(sDate);
			var eDate = new Date(value);

			if(sDate.getTime() > eDate.getTime()){
				return false;	//검증 실패
			}else{
				return true;	//검증 성공
			}
		},
		//"종료일은 시작일보다 작을수 없습니다."
		i18next.t("work:validation.chkEndDate")
	);
}


//프로젝트 등록/수정
function initValid_frmProjectEdit(){
	$("#frmProjectEdit").validate({
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

			//종료일 체크시 에러 위치
			/*
			if(element.attr("id") == "etime"){
				error.appendTo( $("#edit_eDateTime_orgCol").parent().parent() );

			}
			*/

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
		rules: {
			projectNm: {
				required: true,
				maxlength: 50
			},
			MMPlan: {
				required: true,
				number: true
			}
        },
        messages: {
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
			saveProject();
			return false;
		}

	});
}



//Task 등록/수정
function initValid_frmTaskEdit(){

	$("#frmTaskEdit").validate({
        ignore: 'input[type=hidden]:not(#taskCd_checked), .select2-search__field', // ignore hidden fields
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

			//종료일 체크시 에러 위치
			/*
			if(element.attr("id") == "etime"){
				error.appendTo( $("#edit_eDateTime_orgCol").parent().parent() );

			}
			*/

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
		rules: {
			projectSn : {
				required: true
			},
			sDate: {
				required: true,
				date: true
			},
			eDate: {
				required: true,
				date: true,
				greaterThan:{"targetNm": "sDate"}
			},
			taskCd: {
				required: true
			},
			taskCd_checked: {
				required: function(){
					if($("#frmTaskEdit input[name='taskCd']").val() != ""){	//TaskCd 입력했을때만 체크
						return true;
					}else{
						return false;
					}
				}
			},
			taskNm: {
				required: true
			}
        },
        messages: {

            taskCd_checked: {
                required: i18next.t("work:validation.chkTaskCdPlz"),
            }
        }
		//before handler
		, invalidHandler:  function(event, validator) {
			//console.log(validator)

			//코드 중복체크시 포커스 처리(hidden 필드 포커스 안감, 입력필드로 포커싱 처리)
			if(validator.invalid.taskCd_checked != undefined){
				$("#frmTaskEdit input[name='taskCd']").focus();
			}
        }
		,submitHandler: function (form) {
			saveTask();
			return false;
		}

	});
}



//세부업무 작업내용 등록/수정
function initValid_frmProgressEdit(){
	$("#frmProgressEdit").validate({
        ignore: 'input[type=hidden]:not(#taskCd_checked), .select2-search__field, .FileChk', // ignore hidden fields
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


			if(element.attr("name") == "progressRate"){
				error.appendTo( element.parent());

			}

			else if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
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
		rules: {
			/*
			execSDate: {
				required: true,
				date: true
			},
			*/
			progressRate: {
				required: true,
				number: true
			},
			contents: {
				required: true
			}
        },
        messages: {
        }
		//before handler
		, invalidHandler:  function(event, validator) {
          // validationChecnk();
        }
		,submitHandler: function (form) {
			alert('    saveActivityProgress submitHandler ' );
			saveActivityProgress();
			return false;
		}

	});
}