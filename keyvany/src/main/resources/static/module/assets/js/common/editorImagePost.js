
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
		// url:"/common/editorImageUpload.do",
		url:"/common/editorImageUpload",
		contentType:false,
		type:"POST",
		mimeType:"multipart/form-data",
		dataType:"text",
		data:formData,
		cache:false,
		async:false,
		processData:false,
		success:function(data){
			alert('submit_to: ' + data);
			//tinymce.activeEditor.execCommand("mceInsertContent",'false',"<img src='"+data+"' class='tinyMCEInsertIMAGE'>");
			tinymce.activeEditor.execCommand("mceInsertContent",'false',"<img src='/common/editorImageLoad?src="+data+"' class='tinyMCEInsertIMAGE'>");
			$('#modalEditorImageInsert').modal('hide');
			$("#uploadInputBox").val("");
			try
			{
				var srcSeqno=new Array();
				$tmImg = tinymce.dom.DomQuery(tinymce.activeEditor.dom.select('.tinyMCEInsertIMAGE'));
				$("#tinyMCEInsertIMAGE").val("");
				if ($tmImg.length>0)
				{
					for (i=0;i<$tmImg.length ;i++ )
					{
						srcSeqno[i] = $tmImg[i].src.split('?src=')[1];
						//srcSeqno[i] = $tmImg[i].fileSeqNo.split('?fileSeqNo=')[1];
					//console.log($tmImg[i].src.split('?')[1]);
					//console.log($tmImg);

					}
				}
				//console.log(srcSeqno.join(","));
				$("#tinyMCEInsertIMAGE").val(srcSeqno);
			}
			catch (e)
			{
			}

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
