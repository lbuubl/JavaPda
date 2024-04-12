
		//.require({ url: '/resources/module/assets/js/core/libraries/jquery-3.4.1.min.js' , key: 'jquery'})
		//.require({ url: '/resources/module/assets/js/core/libraries/jquery.min.js' , key: 'jquery'})

var fileNoSelectHtml="No file selected";
var fileChooseFile="Choose File";
var isMobile
basket
		.require({ url: '/resources/module/assets/js/core/libraries/jquery.min.js' , key: 'jquery'})
		.then(function () {
			basket.require({ url: '/resources/module/assets/js/core/libraries/jquery.cookie.js' , key: 'cookie' });
			basket.require({ url: '/resources/module/assets/js/core/libraries/bootstrap.min.js',				key: 'bootstrap' });
			basket.require({ url: '/resources/module/assets/js/plugins/forms/selects/select2.min.js',		key: 'select2' });
			basket.require({ url: '/resources/module/assets/js/plugins/forms/styling/uniform.min.js',		key: 'uniform' });

			basket.require({ url: '/resources/module/assets/js/plugins/ui/moment/moment.min.js',		key: 'moment' });
			basket.require({ url: '/resources/module/assets/js/plugins/pickers/daterangepicker.js',		key: 'daterangepicker' });


			basket.require({ url: '/resources/module/assets/js/plugins/internationalization/i18next.min.js', key: 'i18next' });
			basket.require({ url: '/resources/module/assets/js/plugins/internationalization/jquery-i18next.min.js', key: 'jquery-i18next' });
			basket.require({ url: '/resources/module/assets/js/plugins/internationalization/i18nextXHRBackend.min.js', key: 'i18nextXHRB' });
			basket.require({ url: '/resources/module/assets/js/plugins/internationalization/i18nextBrowserLanguageDetector.min.js', key: 'i18nextDetect'  });
			basket.require({ url: '/resources/module/assets/js/plugins/internationalization/i18nextLocalStorageCache.min.js' , key: 'i18nextLocal'  });

			basket.require({ url: '/resources/module/assets/js/plugins/ui/prism.min.js',						key: 'prism'   });
			basket.require({ url: '/resources/module/assets/js/plugins/ui/nicescroll.min.js' ,					key: 'nicescroll'  });
			basket.require({ url: '/resources/module/assets/js/plugins/ui/headroom/headroom.min.js' , key: 'headroom.min'   });

			basket.require({ url: '/resources/module/assets/js/plugins/Gestures/hammer.min.js' ,			key: 'hammer'  });
			basket.require({ url: '/resources/module/assets/js/plugins/Gestures/hammer-time.min.js' , key: 'hammer-time'   });

			basket.require({ url: '/resources/module/assets/js/plugins/ui/headroom/headroom_jquery.min.js' , key: 'headroom_jquery'  });
			basket.require({ url: '/resources/module/assets/js/plugins/blockUI/jquery.blockUI.js',			  key: 'blockUI'   });
			basket.require({ url: '/resources/module/assets/js/core/app.js',									      key: 'app'   });

			basket.require({ url: '/resources/module/assets/js/common/util.js' ,								  key: 'util'  });

			basket.require({ url: '/resources/module/assets/js/common/layout_fixed_custom.js' ,				  key: 'layout_fixed_custom'  });
			basket.require({ url: '/resources/module/assets/js/common/layout_navbar_hideable_sidebar.js', key: 'sidebar'   });
			/*basket.require({ url: '/resources/module/assets/js/common/internationalization.js',				  key: 'international' });*/

			basket.require({ url: '/resources/module/assets/js/FileDown/jquery.fileDownload.js',			  key: 'fileDownload'   });
			basket.require({ url: '/resources/module/assets/js/plugins/Resize/jquery.ba-resize.min.js',	  key: 'resize'   });
			basket.require({ url: '/resources/module/assets/js/plugins/notifications/sweet_alert.min.js',	  key: 'sweet_alert'   });
			basket.require({ url: '/resources/module/assets/js/plugins/jstorage/jstorage.min.js',			  key: 'jstorage' })
			.then(function () {
					basket.require({ url: '/resources/module/assets/js/plugins/Templ/jquery.tmpl.js' ,		key: 'tmpl'  });
					basket.require({ url: '/resources/module/assets/js/common/htmlHeader.js' ,			key: 'Htmlheader' ,	  unique: 1.2 });
			});

		});