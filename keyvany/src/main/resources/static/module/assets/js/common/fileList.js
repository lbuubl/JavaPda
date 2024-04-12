
$(function() {

	$("#Prv_img").css("text-align","center");
	$("#img_nav_div").show();

	var fileView = "pdf,.jpeg,jpg,gif,bmp,png"
	var curViewindex=0;
	var FileLength=0;

	if (isBrowser=="ch")
	{
		$("#zipinfo").hide();
	}else{
		$("#zipinfo").show();
	}


	try
	{
			if (file_height=="full" && !isMobile) //chrome..notice
			{
					$('.plupload_scroll .plupload_filelist').css("height","100%");
			}
	}
	catch (e)
	{

	}

	 /*파일리스트 스크롤처리*/
	 if(!isMobile){//데스트탑 만.
		//	 $(".plupload_filelist").niceScroll();
	 }

/*이전이벤트*/
$("#p").unbind("click");
$("#p").on("click", function () {
	if (curViewindex==0)
	{
		alert("이전 파일이 없습니다.");
		return false;
	}
	$('#modal_remote').modal('hide');
	$( ".plupload_filelist .FilePreview:eq("+(curViewindex-1)+")").trigger( "click" );
})
/*다음이벤트*/
$("#n").unbind("click");
$("#n").on("click", function () {
	if (curViewindex==(FileLength-1))
	{
		alert("다음 파일이 없습니다.")
		return false;
	}
	$('#modal_remote').modal('hide');
	$( ".plupload_filelist .FilePreview:eq("+(curViewindex+1)+")").trigger( "click" );
})

	function ImgPrvView(){

		 $("#modal_remote").unbind("show.bs.modal");

		 $('#modal_remote').on('show.bs.modal', function(event) {

				FileLength=0;
				FileLength= $(".plupload_filelist .FilePreview").length;
				 $('input:checkbox.FileChk').removeAttr('checked'); //선택한 파일외 체크박스 풀기

				var viewIcon = $(event.relatedTarget) //호출한 버튼의 선택한 이미지 보기 .FilePreview*/

				curViewindex =$(".plupload_filelist .FilePreview").index(viewIcon); //현재 선택항목의 인덱스

				var fsn=$(viewIcon).parent().parent().attr("FileSeq");
				var title=$(viewIcon).parent().prev().attr("title");

				var iw=$(viewIcon).attr("data-width");
				var ih=$(viewIcon).attr("data-height");

				var tw=$(viewIcon).attr("data-thum");
				var ext=$(viewIcon).attr("data-ext").toLowerCase();

				if (fileView.indexOf(ext)==-1)
				{
						alert("이미지와 PDF파일만 미리보기를 지원합니다.");
				}else{

						// 썸네일에 바로 링크걸 경우 사용(main > 최근자료목록), 2017-02-01, 김영식
						if(fsn == "undefined" || fsn == undefined ){
							fsn = $(viewIcon).attr("data-fsn");

						}
						//console.log("title-1",title )
						if(title == "undefined" || title == undefined ){
							title = $(viewIcon).attr("title");

						}

						//제목 Prv_PDF
						$(this).find('.modal-title').html(title);

						if (ext=="pdf")
						{

								$(this).find(".modal-dialog").width("95%");
								$("#modal_remote .modal-content").removeAttr( "style" );

								$(".img-small").attr("src", "");
								$("img.loaded").remove();
								$("#Prv_img").height(0);

								if (isMobile)
								{
									$("#modal_remote .modal-body").css("padding", "0px");
									frame_h=cHeight-100;
								}else{
									frame_h=cHeight-210;
								}

								$("#Prv_PDF").html("");
								//$( "#Prv_PDF" ).append("<iframe width='100%' height='"+frame_h+"' src='"+"/Module/assets/js/plugins/pdfjs-1.8.170-dist/web/viewer.page?fsn="+fsn+"'></iframe>")
								$( "#Prv_PDF" ).append("<iframe width='100%' height='"+frame_h+"' src='/common/pdfViewer?fsn="+fsn+"'></iframe>")

						}else{
							//	$("#Prv_img").height(0);
								$("#Prv_PDF").html("");
								$("#Prv_img").removeAttr( "style" );

								var Prv_placeholder = $('.Prv_placeholder'),	  small =  $('.img-small')

								//기존로딩 이미지 삭제
								 $(".img-small").attr("src", "");
								 $('.Prv_placeholder img:not(.img-small)').remove();

								  // 1: load small image and show it
								  if (tw >0)
								  {									  $('.img-small').show();
									  //$(".img-small").attr("src", "/resources/data/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext);
									  $(".img-small").attr("src", "/common/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext);
									  //imgLarge.src = '/common/img?fsn='+fsn+"&ssid="+ssid

									  var img = new Image();
									  img.src =  $('.img-small').attr("src");
									  img.onload = function () {
										 small.addClass('loaded');
									  };
								  }

								  // 2: load large image
								  var imgLarge = new Image();
								 // imgLarge.src = Prv_placeholder.dataset.large;
								  //imgLarge.src = '/Common/img.Do?fsn='+fsn+"&ssid="+ssid
								  imgLarge.src = '/common/img?fsn='+fsn+"&ssid="+ssid
								  //imgLarge.src = "/common/imgThum/"+mc+"_"+tw+"_"+fsn+"."+ext  // imgThum 테스트
								  imgLarge.onload = function () {

									$('.img-small').hide();
									imgLarge.classList.add('loaded');
								  };
								  Prv_placeholder.append(imgLarge);

								//이미지클릭 닫기 이벤트추가
								 $(this).find('.modal-body img').attr("data-dismiss", "modal");

								if (iw >= cWidth) //이미지가 윈도우보다 크면
								{
										if (!isMobile) //모바일이 아닌 경우
										{
											height_rate=ih/iw*100;
											view_img_height=cHeight-150;
											view_img_width =view_img_height*100/height_rate; //높이기준 넓이 산정

											if (view_img_width>cWidth) //높이기준으로 이미지 넓이를 산정했으나, 넓이가 윈도우 넓이보다 큰경우(와이드)
											{

												$(this).find(".modal-dialog").width("95%");
												$(this).find('.modal-body img').css("width", "100%");
												$(this).find('.modal-body img').css("height", "auto");
												$("#modal_remote .modal-content").css("left", "");
											}else{

													$(this).find(".modal-dialog").width(view_img_width+50+"px");
													$(this).find('.modal-body img').css("width", view_img_width+"px");
													$(this).find('.modal-body img').css("height", view_img_height+"px");

													cwinPx=(parseInt(view_img_width)+50) ;
													modal_c = $(window).width() / 2 - cwinPx / 2;
													$("#modal_remote .modal-content").css("left", modal_c);
													$(this).find(".modal-dialog").css("margin-top", "10px");
											}

										}else{ //모바일인 경우

											$(this).find(".modal-dialog").width("95%");
											$(this).find('.modal-body img').css("width", "100%");
											$(this).find('.modal-body img').css("height", "auto");

										}

								}else{

										cwinPx=(parseInt(iw)+50) ;
										if (cwinPx <320) // 최소해상도 320보다 작으면 창사이즈를 320으로 고정
										{
												cwinPx =320;
										}

										$(this).find(".modal-dialog").width(cwinPx+"px");
										$(this).find('.modal-body img').css("width", iw+"px");
										$(this).find('.modal-body img').css("height", "");
										modal_c = $(window).width() / 2 - cwinPx / 2;

										if (!isMobile)
										{
											$("#modal_remote .modal-content").css("left", modal_c);
										}else{
											if (iw<320)
											{
												$(this).find(".modal-dialog").css("margin", "auto");
											}
											$("#modal_remote .modal-content").css("left", "");
										}

										$(this).find('.modal-body').addClass("text-center");					//이미지 중앙정렬
										$(this).find('.Prv_placeholder').css("background-color", "#FFFFFF")		//이미지홀더 컬러 제거
								}
						}
						//pdf end

				}
		 });
	}
	 ImgPrvView();

	 /*모달 숨기기*/
	 $("#Prv_img, .img_close").unbind("click");
	 $('#Prv_img, .img_close').on('click', function() {
			$('#modal_remote').modal('hide')
	 });


	/* 선택한 행 체크, 해제 */
	 $(".Filelist").unbind("click");
	 $(".Filelist").on("click", function (e) {
		var this_chk ;
		//체크박스 클릭시 클릭이벤트 주기위해 예외처리
		this_chk=$(this).find('.FileChk').is(":checked");

		if ($(e.target).hasClass("FileChk") == false)
		{
			if (this_chk)
			{
				$(this).find('.FileChk').prop("checked",false);

				//해제시에는 삭제배열에서 뺀다.
				removeA(del_key,$(this).val());
			}else{
				$(this).find('.FileChk').prop("checked",true);
			}

		}
	 });

	/* 하나 다운로드 할 때 */
	 $(".FileDown").unbind("click");
	 $(".FileDown").on("click", function () {
			fsn=$(this).parent().parent().attr("FileSeq");
			FileDown(fsn);
     });

	/*파일삭제 시*/
	 $(".FileDel").unbind("click");
	 $(".FileDel").on("click", function () {
			if (confirm(i18next.t("F.DelYnMsg")) == true){
				 $('input:checkbox.FileChk').removeAttr('checked'); //선택한 파일외 체크박스 풀기


				 fsn=$(this).parent().parent().attr("FileSeq");
				 FileDel(fsn, $(this));
			 }
     });

	 /*선택된 여러개의 파일을 다운로드 할때*/
	 $(".MultiDownBtn").unbind("click");
	 $(".MultiDownBtn").on("click", function () {

		// $(this).closest(".plupload_content").find('input[name=Files]:checkbox:checked').length <=0
		// if($("input[name=Files]:checkbox:checked").length <=0){

		if( $(this).closest(".plupload_content").find('input[name=Files]:checkbox:checked').length <=0){
			alert(i18next.t("F.UnSelectMsg"));

		}else{
			if (isBrowser=="ch")
			{
				//$('.FileChk').each(function(index) {
				$(this).closest(".plupload_content").find('.FileChk').each(function(index) {
						if($(this).is(":checked")){
							FileDown($(this).val());
						}
				});

			}else{
				if( $(this).closest(".plupload_content").find('input[name=Files]:checkbox:checked').length ==1){
					//한개정도 체크된 정도

					//FileDown($(".FileChk").val());
					FileDown($(".FileChk:checked").val());
				}else{
					//여러개 선택된 경우
					//alert(i18next.t("F.ZipFileinfo")"여러 파일이 선택된 경우는 압축하여 다운로드합니다.");

					// IE 만 적용.
					// ?? 응??  ASP 에러....
					// 1. getWeather_xml.do  무한루프...
					// 2.  '1.' 원인 삭제후 다운로드 안됨....응???

					// 다운로드 오류 수정.
					//console.log(" data "+$(this).closest(".plupload_content").find(".FileChk").serialize()+"\n checked cnt  "+$(this).closest(".plupload_content").find('input[name=Files]:checkbox:checked').length  );
					 // data  Files=104896&Files=104897
					var files="";
					$(this).closest(".plupload_content").find('.FileChk').each(function(index) {
						if($(this).is(":checked")){
							files = files +(index>0?",":"")+$(this).val();
						}
					});
					//console.log(" files  "+files);

					//$.fileDownload("/common/zip.Do", {
					$.fileDownload("/common/zip", {
					successCallback : function () {
						//console.log('File download a success!');
					},
					failCallback: function (responseHtml, url) {
						//console.log('File download failed!');
					},
					httpMethod: "POST",
					//data: 	$(this).closest(".plupload_content").find("#fileDownForm").serialize(),
					//data: 	, $(this).closest(".plupload_content").find(".FileChk").serialize(),
					data : { "files" : files   },
					cookieName: "ssn"+ssid
				    });
				}
			}
		}
	 });

	/* 전체 선택, 해제*/
	$(".allCheck").click(function(){
		if($(this).prop("checked")) {
			   $(this).closest(".plupload_content").find('.FileChk').prop("checked",true);
		} else {
				$(this).closest(".plupload_content").find('.FileChk').prop("checked",false);
		}
	});

	function FileDown(fsn){
		// $.fileDownload("/common/Download.Do?fsn="+fsn+"&ssid="+ssid)
		 $.fileDownload("/common/downLoad/"+fsn+"/"+ssid)
			.done(function () {
				 $('input:checkbox.FileChk').removeAttr('checked'); //선택한 파일외 체크박스 풀기
			 })
			.fail(function () {  });
	}

});
