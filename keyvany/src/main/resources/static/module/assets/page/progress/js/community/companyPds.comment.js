define(function() {
	var PdsComment = function(elId, pdsFileGroupSeqno, parent) {
		this.el = $('#' + elId);
		this.pdsFileGroupSeqno = pdsFileGroupSeqno;
		this.parent = parent;

		var _this = this;
	}

	PdsComment.prototype.open = function() {
		var _this = this;

		_this.el.find('.comment_write_inline').empty();
		_this.el.find('.comment_list').empty();
		
		_this.showWriteForm(_this.el.find('.comment_write_inline'), null, 0);
		
		_this.load().done(function(comments) {
			if(comments.length == 0) {
				$('<article class="no_data">의견이 없습니다.</article>').appendTo(_this.el.find('.comment_list'));
				return;
			}
			$.each(comments, function(i, comment) {
				if (comment.depth == 0) {
					_this.setCommnet(comment, _this.el.find('.comment_list'));
				} else {
					_this.setCommnet(comment, _this.el.find('article[data-seqno=' + comment.parentSeqno + ']'));
				}
			});
		});
	}

	PdsComment.prototype.setCommnet = function(data, parent) {
		var _this = this;
		
		var comment = (data.delYn) ? '삭제되었습니다.' : data.comment.replace(/\n\r?/g, '<br>');
		var $article = $('<article>').attr('data-seqno', data.seqno).appendTo(parent);
		var $thumb = $('<div class="thumb img_crop">').appendTo($article);
		var $img = $('<img alt="' + data.writeName + '">').attr('src', '/file/user/'+data.writeId+'/thumb/40').appendTo($thumb);
		var $user = $('<p class="user"><strong>' + data.writeName + '</strong> <span>' + data.writeDate + '</span></p>').appendTo($article);
		var $txt = $('<p class="txt">').html(comment).appendTo($article);
		
		if(!data.delYn) {
			var $btnArea = $('<div class="btn_area">').appendTo($article);
		}
		
		if(!data.delYn) {
			var $btnReply = $('<a href="javascript:;"><i class="material-icons">&#xe15e;</i><span class="hidden">댓글</span></a>').appendTo($btnArea);
			$btnReply.on('click', function(e) {
				_this.showWriteForm($article, data.seqno, data.depth+1);
			});
		}
		
		if(!data.delYn && data.editable) {
			var $btnDel = $('<a href="javascript:;"><i class="material-icons">&#xe872;</i><span class="hidden">삭제</span></a>').appendTo($btnArea);
			$btnDel.on('click', function(e) {
				kendo.confirm('정말 삭제하시겠습니까?').done(function() {
					_this.delete(data.seqno).done(function(comments) {
						kendo.alert('삭제완료');
						_this.open();
					});
				});
			});
		}
	}

	PdsComment.prototype.showWriteForm = function(parent, parentSeqno, depth) {
		var _this = this;

		if(parent.find('textarea').length > 0) {
			return;
		}
		
		var $div = $('<div class="comment_write_inline">').appendTo(parent);
		var $comment = $('<textarea class="autosize small m0" name="comment" style="resize: none;"></textarea>').appendTo($div);
		var $btn = $('<a href="javascript:;">등록</a>').appendTo($div);

		$btn.on('click', function(e) {
			if($.trim($comment.val()) == '') {
				kendo.alert('의견내용을 입력해 주십시오.');
				return;
			}
			
			var _data = {
				pdsFileGroupSeqno: _this.pdsFileGroupSeqno,
				comment: $comment.val(),
				parentSeqno: parentSeqno,
				depth: depth
			};
		
			var loader = UI.Loading.open();
			_this.save(_data).done(function() {
				loader.close();
				kendo.alert('저장완료');
				_this.open();
			});
		});
	}

	PdsComment.prototype.load = function() {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds/comment/' + _this.pdsFileGroupSeqno,
			type: 'get',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}

	PdsComment.prototype.save = function(_data) {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds/comment/' + _this.pdsFileGroupSeqno,
			type: 'post',
			data: _data,
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}
	
	PdsComment.prototype.delete = function(seqno) {
		var _this = this;

		var dfd = new $.Deferred();
		$.ajax({
			url: '/community/companyPds/comment/' + _this.pdsFileGroupSeqno + '/' + seqno,
			type: 'delete',
			success: function(data) {
				dfd.resolve(data);
			},
			error: function(e) {
				dfd.reject();
			}
		});
		return dfd.promise();
	}

	return PdsComment;
});
