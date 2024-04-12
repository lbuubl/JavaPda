/*
$.getScript( '/module/tinymce_4.5.3/js/tinymce/tinymce.js' ).done(function(){console.log('tinymce.min.js로드 성공');}).fail(function(){console.log('tinymce.min.js로드 실패');});
$.getScript( '/Module/assets/js/pages/components_modals.js' ).done(function(){console.log('components_modals.js로드 성공');}).fail(function(){console.log('components_modals.js로드 실패');});
$.getScript( '/module/assets/js/common/editorLoads.js' ).done(function(){console.log('editorLoads.js로드 성공');}).fail(function(){console.log('editorLoads.js로드 실패');});
*/
/*
<script type="text/javascript" src="/module/tinymce_4.5.3/js/tinymce/tinymce.dev.js"></script>
<script type="text/javascript" src="/module/tinymce_4.5.3/js/tinymce/plugins/table/plugin.dev.js"></script>
<script type="text/javascript" src="/module/tinymce_4.5.3/js/tinymce/plugins/paste/plugin.dev.js"></script>
<script type="text/javascript" src="/module/tinymce_4.5.3/js/tinymce/plugins/spellchecker/plugin.dev.js"></script>
*/

$('head').append('<script type="text/javascript" src="/resources/module/tinymce_4.5.3/js/tinymce/tinymce.js"></script>');
$('head').append('<script type="text/javascript" src="/resources/module/assets/js/common/editorLoads.js"></script>');