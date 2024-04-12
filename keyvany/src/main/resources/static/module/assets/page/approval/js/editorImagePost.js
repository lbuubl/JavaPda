
function submit_to()
{		
	var frm = document.editor_upimage;
	
	if(frm.uploadInputBox.value =="")
	{
		//alert("파일을 추가해주세요.");
		showSwal(i18next.t("approval:msg.selectFile"),"warning");
		return false;	
	}

	var formData = new FormData($("#editor_upimage")[0]);

	$.ajax({
		url:"/module/tinymce/popup/PostUpload.do",
		contentType:false,
		type:"POST",
		mimeType:"multipart/form-data",
		dataType:"text",
		data:formData,
		cache:false,
		async:false,
		processData:false,
		success:function(data){
			//alert(data);
			tinymce.activeEditor.execCommand("mceInsertContent",'false',"<img src='"+data+"'>");
			$('#modalEditorImageInsert').modal('hide');
			$("#uploadInputBox").val("");
			return;
		},
		error:function(data){
			alert("err//"+data.message);
			$('#modalEditorImageInsert').modal('hide');
		}
		
	});
	//frm.submit();
}

function pop_close(){
	
	$('#modalEditorImageInsert').modal('hide');
}

function fileCheck() {   
  var frm = document.editor_upimage;
  var file = frm.uploadInputBox.value;
  var FileFilter = /\.(jpg|gif|bmp|png)$/i;
  var extArray = new Array(".jpg", ".gif", ".bmp", ".png");   
  var bSubmitCheck = false;

  if( !file ){ 
	showSwal(i18next.t("approval:msg.selectFile"),"warning");
	//swal("Here's a message!")
	//alert( "파일을 선택하여 주세요!");
	return false;
  }
  //alert(document.editor_upimage.uploadInputBox.files[0].type);

  if( file.match(FileFilter))
  { 
	bSubmitCheck = true;
  }
  

  if (!bSubmitCheck) {
	showSwal(i18next.t("approval:msg.extType")+"\n"+(extArray.join("  "))+"\n\n"+i18next.t("approval:msg.reSelectFile"),"warning");
	//alert("다음 파일만 업로드가 가능합니다.\n\n"  + (extArray.join("  ")) + "\n\n 업로드할 파일을 "+ " 다시 선택하여 주세요.");
	frm.uploadInputBox.value="";
	 return false;
   }

}
