/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('preview', function(editor) {
	var settings = editor.settings, sandbox = !tinymce.Env.ie;

	editor.addCommand('mcePreview', function() {
		editor.windowManager.open({
			title: 'Preview',
			width: parseInt(editor.getParam("plugin_preview_width", "650"), 10),
			height: parseInt(editor.getParam("plugin_preview_height", "500"), 10),
			html: '<iframe src="javascript:\'\'"  frameborder="0"' + (sandbox ? ' sandbox="allow-scripts"' : '') + '></iframe>',
			buttons: {
				text: 'Close',
				onclick: function() {
					this.parent().parent().close();
				}
			},
			onPostRender: function() {
				var previewHtml, headHtml = '';

				headHtml += '<base href="' + editor.documentBaseURI.getURI() + '">';

				tinymce.each(editor.contentCSS, function(url) {
					headHtml += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
				});

				var bodyId = settings.body_id || 'tinymce';
				if (bodyId.indexOf('=') != -1) {
					bodyId = editor.getParam('body_id', '', 'hash');
					bodyId = bodyId[editor.id] || bodyId;
				}

				var bodyClass = settings.body_class || '';
				if (bodyClass.indexOf('=') != -1) {
					bodyClass = editor.getParam('body_class', '', 'hash');
					bodyClass = bodyClass[editor.id] || '';
				}

				var printScript = (
					'<script>' +
					' window.onload=function(){	 '+
					' try{ '+
					'	  var webBrowser = "<OBJECT ID="previewWeb" WIDTH=0 HEIGHT=0 CLASSID=''CLSID:8856F961-340A-11D0-A96B-00C04FD705A2''></OBJECT>;" '+
					'	  document.body.insertAdjacentHTML("beforeEnd", webBrowser) ; '+
			 		'	  previewWeb.ExecWB(7, 1); '+
					'	  previewWeb.outerHTML = ""; '+
					'	   }'+
					'	  }catch (e) {'+
					'		  alert("- 도구 > 인터넷 옵션 > 보안 탭 > 신뢰할 수 있는 사이트 선택\n   1. 사이트 버튼 클릭 > 사이트 추가\n   2. 사용자 지정 수준 클릭 > 스크립팅하기 안전하지 않은 것으로 표시된 ActiveX 컨트롤 (사용)으로 체크\n\n※ 위 설정은 프린트 기능을 사용하기 위함임") ;'+
					'	  }'+
					'</script> '
				);

				var preventClicksOnLinksScript = (
					'<script>' +
						'document.addEventListener && document.addEventListener("click", function(e) {' +
							'for (var elm = e.target; elm; elm = elm.parentNode) {' +
								'if (elm.nodeName === "A") {' +
									'e.preventDefault();' +
								'}' +
							'}' +
						'}, false);' +
					'</script> '
				);

				var dirAttr = editor.settings.directionality ? ' dir="' + editor.settings.directionality + '"' : '';

				previewHtml = (
					'<!DOCTYPE html>' +
					'<html>' +
					'<head>' +
						headHtml + printScript+
					'</head>' +
					'<body id="' + bodyId + '" class="mce-content-body ' + bodyClass + '"' + dirAttr + '>' +
						editor.getContent({format : 'raw'}) +
						preventClicksOnLinksScript +
					'</body>' +
					'</html>'
				);

				if (!sandbox) {
					// IE 6-11 doesn't support data uris on iframes
					// so I guess they will have to be less secure since we can't sandbox on those
					// TODO: Use sandbox if future versions of IE supports iframes with data: uris.
					var doc = this.getEl('body').firstChild.contentWindow.document;
					doc.open();
					doc.write(previewHtml);
					doc.close();
				} else {
					this.getEl('body').firstChild.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewHtml);
				}
			}
		});
	});

	editor.addButton('preview', {
		title: 'Preview',
		cmd: 'mcePreview'
	});

	editor.addMenuItem('preview', {
		text: 'Preview',
		cmd: 'mcePreview',
		context: 'view'
	});
});
