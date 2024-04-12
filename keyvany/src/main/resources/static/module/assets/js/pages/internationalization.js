/* ------------------------------------------------------------------------------
*
*  # Change language without page reload
*
*  Specific JS code additions for internationalization_switch_direct.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {
	
	var curLan="ko";

    // Hide sidebar category titles on load
    $('.category-title > span').css('visibility', 'hidden');

    // Add options
	
	i18next
	.use(i18nextXHRBackend)
	.use(i18nextBrowserLanguageDetector)
	.use(window.i18nextLocalStorageCache) //다국어 로컬스토리지저장
	.init({
		debug: true,
		load: "languageOnly",
		backend: {
			//loadPath: '/module/assets/locales/{{ns}}/{{lng}}.json'
			loadPath: function(languages, namespaces){
				
				if(namespaces == "s"){
					return '/module/assets/locales/{{ns}}/'+gg_code+'/{{ns}}_{{lng}}.json'
				}else{
					return '/module/assets/locales/{{ns}}/{{ns}}_{{lng}}.json'
				}				
			}
		},
			  //다국어 로컬스토리지저장
		cache: {
					  enabled: true,
					  prefix: 'i18next_res_'+gg_code+"_",
					  expirationTime: 7 * 24 * 60 * 60 * 1000
		}, 

		"interpolation": {
			"escapeValue": false,
			"prefix": "{{",
			"suffix": "}}",
			"unescapePrefix": "-",
			"nestingPrefix": "$t(",
			"nestingSuffix": ")"
		},
		fallbackLng: 'ko',		// 언어파일에 값이 없으면 가져올 기본언어셋
		ns:["s","common"],		// 사용할 네임스페이스
		defaultNS : "common",	//기본 네임스페이스
		detection: {
			//order and from where user language should be detected
			//order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			order: ['cookie', 'localStorage', 'navigator'],
			//keys or params to lookup language from
			//lookupQuerystring: 'lng',
			lookupCookie: 'i18next',
			lookupLocalStorage: 'i18nextLocalStorage',
			//cache user language on
			caches: ['localStorage','cookie'],
			// optional expire and domain for set cookie
			cookieMinutes: 365*24*60, // 1 year
			cookieDomain: MultiLngDomain,
			// optional htmlTag with lang attribute, the default is:
			//htmlTag: document.documentElement
		}
	}, function(err, t) {
		jqueryI18next.init(i18next, $);	//jquery 를 사용하기 위해 jqueryI18next 초기화
		
		//달력 다국어 전역변수 - 선언은 htmlHeader.js에..		
		datepickerI18n();		
		//validator 다국어 처리
		//validatorI18n();
		
		i18next.changeLanguage((i18next.language).substr(0, 2), function() {		
	
			$('body').localize();
			// Show sidebar category titles after load
		    $('.category-title > span').css('visibility', 'visible');

		});

		ChangeLanguagesDropdown();
		//initLange();

		fn_i18nextLoaded();
	});


	// Change languages in dropdown
	function ChangeLanguagesDropdown(){	

		var curLan = (i18next.language).substr(0, 2);
		$('.'+curLan).parent().addClass('active');

		// Change language in dropdown
		$('.language-switch').children('.dropdown-toggle').html(
			$('.language-switch').find('.'+curLan).html() + ' <i class="caret" />'
		).children('img').addClass('position-left');
		
		//업로드 다국어 적용
		loadjscssfile("/module/assets/js/plugins/uploaders/plupload/i18n/"+curLan+".js","js");
	
	}

    // Change languages in navbar
    // -------------------------
    var switchContainer = $('.language-switch');

    $('.languageC').on('click', function () {
		
		choice_lan=$(this).attr("class").substr(0, 2);

        // Set language
        $.i18n.changeLanguage(choice_lan , function() {
            $('body').localize();
        });
	
        // Change lang in dropdown
        switchContainer.children('.dropdown-toggle').html(
            $('.'+choice_lan).html() + ' <i class="caret" />'
        ).children('img').addClass('position-left');

        // Set active class
        switchContainer.find('li').removeClass('active');
        $('.'+choice_lan).parent().addClass('active');

		//업로드 다국어 적용
		loadjscssfile("/module/assets/js/plugins/uploaders/plupload/i18n/"+choice_lan+".js","js");
		//setUploadLan("/Module/assets/js/plugins/uploaders/plupload/i18n/ko.js");
    });
	
	
});


	function loadjscssfile(filename, filetype){ 
		 if(typeof(plupload)!="undefined"){
			if (filetype=="js"){ //if filename is a external JavaScript file
				var fileref = document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
				
				document.body.appendChild( fileref);
				try
				{
					onChangeLangEvent();
				}
				catch (e)
				{
				}
			}
		 }
	}
	
	/* datepicker 다국어 처리 */
	function datepickerI18n(){
			datepicker_locale={
				format: 'YYYY-MM-DD'
				,applyLabel: i18next.t("common:daterangepicker.label.apply")
				,cancelLabel: i18next.t("common:daterangepicker.label.cancel")
				,startLabel: i18next.t("common:daterangepicker.label.start")
				,endLabel: i18next.t("common:daterangepicker.label.end")
				,"customRangeLabel": "Custom"
				,"daysOfWeek": [
					i18next.t("common:daterangepicker.day.Su"),
					i18next.t("common:daterangepicker.day.Mo"),
					i18next.t("common:daterangepicker.day.Tu"),
					i18next.t("common:daterangepicker.day.We"),
					i18next.t("common:daterangepicker.day.Th"),
					i18next.t("common:daterangepicker.day.Fr"),
					i18next.t("common:daterangepicker.day.Sa")
				]
				,"monthNames": [
					"01.","02.","03.","04.","05.","06.","07.","08.","09.","10.","11.","12."
				]
			}
	}
	
	/* validator 다국어 처리 */

	function validatorI18n(){
		
		jQuery.extend(jQuery.validator.messages, {
			required: i18next.t("validation.required"),
			remote: i18next.t("validation.remote"),
			email: i18next.t("validation.email"),
			url: i18next.t("validation.url"),
			date: i18next.t("validation.date"),
			dateISO: i18next.t("validation.dateISO"),
			number: i18next.t("validation.number"),
			digits: i18next.t("validation.digits"),
			creditcard: i18next.t("validation.creditcard"),
			equalTo: i18next.t("validation.equalTo"),
			accept: i18next.t("validation.accept"),
			maxlength: jQuery.validator.format(i18next.t("validation.maxlength")),
			minlength: jQuery.validator.format(i18next.t("validation.minlength")),
			rangelength: jQuery.validator.format(i18next.t("validation.rangelength")),
			range: jQuery.validator.format(i18next.t("validation.range")),
			max: jQuery.validator.format(i18next.t("validation.max")),
			min: jQuery.validator.format(i18next.t("validation.min"))
		});
		
	}
	
	//118next 로딩 callback(); ==> 필요에 따라서 페이지에서 재정의 해서 사용
	function fn_i18nextLoaded(){

	}