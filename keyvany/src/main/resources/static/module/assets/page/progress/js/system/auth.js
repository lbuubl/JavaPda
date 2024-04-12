$(document).ready(function() {
    var auth = {
        create: function() {
            var _this = this;
            auth.createAuthGroupGrid();
            auth.createMappingGird();
            _this.addEvent();
        },
        addEvent: function() {
            var _this = this;
            $("#menuAuthGroupFrm").ajaxForm({
                success: function(resp, status) {
                    kendo.alert("성공적으로 처리되었습니다.");
                    $("#grid_left").data("kendoGrid").dataSource.read();
                }
            });

            // 검색창 엔터키 처리
            $("#keyword").keyup(function(e) {
                if (e.which == 13) {
                    $("#grid_left").data("kendoGrid").dataSource.page(0);
                }
            });

            // 검색
            $("a.btn_ab_right").on("click", function(e) {
                $("#grid_left").data("kendoGrid").dataSource.page(0);
            });

            // 삭제버튼 클릭
            $("#mDelBtn").on("click", function(e) {
                kendo.confirm("그룹을 삭제하시겠습니까?").then(function() {
                    $("#menuAuthGroupFrm").attr("action", "/system/auth-mng/" + $("#menuAuthGroupFrm [name=seqno]").val());
                    $("#menuAuthGroupFrm [name=_method]").val("delete");
                    $("#menuAuthGroupFrm").submit();
                });
            });

            // 그룹복사버튼 클릭
            $("#mCopyBtn").on("click", function(e) {
                kendo.confirm("그룹을 복사하시겠습니까?").then(function() {
                    $("#menuAuthGroupFrm [name=_method]").val("post");
                    $("#menuAuthGroupFrm").attr("action", "/system/auth-mng/copy");
                    $("#menuAuthGroupFrm").submit();
                });
            });

            // 수정버튼 클릭
            $("#mEditBtn").on("click", function(e) {
                _this.enableButtons(false, false, false, false, true, true);

                $("#menuAuthGroupFrm [name=_method]").val("put");
                $("#menuAuthGroupFrm input[type=text]").attr("readonly", false);
            });

            // 등록버튼 클릭
            $("#mWriteBtn").on("click", function(e) {
                _this.enableButtons(false, false, false, false, true, true);

                $("#menuAuthGroupFrm [name=seqno]").val("");
                $("#menuAuthGroupFrm input[type=text]").val("");
                $("#menuAuthGroupFrm [name=_method]").val("post");
                $("#menuAuthGroupFrm input[type=text]").attr("readonly", false);
            });

            // 취소버튼 클릭
            $("#mCancelBtn").on("click", function(e) {
                _this.enableButtons(true, true, true, true, false, false);

                $("#menuAuthGroupFrm input[type=text]").attr("readonly", true);
            });

            // 저장 버튼 클릭
            $("#mSaveBtn").on("click", function(e) {
                var $form = $('#menuAuthGroupFrm');
                var formData = UI.Validator($form).value();
                if (!formData) {
                    return;
                }

                if ($("#menuAuthGroupFrm [name=_method]").val() == "put") {
                    $("#menuAuthGroupFrm").attr("action", "/system/auth-mng/" + $("#menuAuthGroupFrm [name=seqno]").val());
                    kendo.confirm("수정하시겠습니까?").then(function() {
                        $("#menuAuthGroupFrm").submit();
                    });
                } else {
                    $("#menuAuthGroupFrm").attr("action", "/system/auth-mng");
                    $("#menuAuthGroupFrm").submit();
                }
            });

            // 권한설정 저장 버튼 클릭
            $("#aSaveBtn").on("click", function(e) {
            	var loader = UI.Loading.open();
                var data = $('#treelist').data("kendoTreeList").dataSource.data();

                $.ajax({
                    url: '/system/auth-mng/authkinds/' + $("#menuAuthGroupFrm [name=seqno]").val(),
                    method: "post",
                    data: JSON.stringify(data),
                    processData: true,
                    contentType: "application/json; charset=UTF-8",
                    success: function(data, stat, xhr) {
                        kendo.alert("성공적으로 처리되었습니다.");
                    },
                    complete : function () {
						loader.close();
						loader = null;
					}
                });
            });

            //인원조정 아이콘 클릭
            $('#grid_left').on('click', 'a.btn_td', function(e) {
                var grid = $('#grid_left').data("kendoGrid");
                var dataItem = grid.dataItem($(this).closest('tr'));
                var seqno = dataItem.seqno;

                $.ajax({
                    url: '/system/auth-mng/' + seqno + '/users',
                    type: 'get',
                    success: function(data) {
                        var params = [];
                        $.each(data, function(i) {
                            params.push({
                                "seqno": data[i].userSeqno,
                                "name": data[i].userName
                            })
                        });

                        UI.showUsersModal("modal-users", params, _this.saveMenuAuthGroupUsers)
                    }
                });
            });

            // 권한설정 treelist 라디오버튼 클릭
            $('#treelist').on('click', '.k-radio', function(e) {
                var checked = $(this).is(':checked');
                var grid = $('#treelist').data("kendoTreeList");
                var dataItem = grid.dataItem($(this).closest('tr'));
                dataItem.set('authKind', $(this).val());
            });
        },
        enableButtons: function(e1, e2, e3, e4, e5, e6) {
            if (e1) $("#mDelBtn").removeClass("hide");
            else $("#mDelBtn").addClass("hide");
            if (e2) $("#mCopyBtn").removeClass("hide");
            else $("#mCopyBtn").addClass("hide");
            if (e3) $("#mEditBtn").removeClass("hide");
            else $("#mEditBtn").addClass("hide");
            if (e4) $("#mWriteBtn").removeClass("hide");
            else $("#mWriteBtn").addClass("hide");
            if (e5) $("#mCancelBtn").removeClass("hide");
            else $("#mCancelBtn").addClass("hide");
            if (e6) $("#mSaveBtn").removeClass("hide");
            else $("#mSaveBtn").addClass("hide");
        },
        createAuthGroupGrid: function() {
            var _this = this;

            $("#grid_left").kendoGrid({
                dataSource: {
                    transport: {
                        read: "/system/auth-mng",
                        dataType: "json",
                        parameterMap: function(data) {
                            var serverUrlParams = {
                                size: data.pageSize,
                                page: data.page = data.page - 1
                            };
                            if (data.sort && data.sort.length > 0)
                                serverUrlParams.sort = data.sort[0].field + '.' + data.sort[0].dir;
                            if ($.trim($("#keyword").val()) != "")
                                serverUrlParams.keyword = $.trim($("#keyword").val());

                            return serverUrlParams;
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total",
                        model: {
                            fields: {
                                authGrpNm: {
                                    type: "string"
                                },
                                userCnt: {
                                    type: "number"
                                }
                            }
                        }
                    },
                    serverPaging: true,
                    serverSorting: true,
                    pageSize: UI.getGridPageSize(540)
                },
                selectable: "row",
                change: _this.changeAuthGroup,
                sortable: true,
                pageable: {
                    buttonCount: 3,
                    pageSizes: UI.getGridPageSizes(540)
                },
                //scrollable: false,
                columns: [{
                        field: "No",
                        width: 60,
                        attributes: {
                            "class": "text_center"
                        },
                        headerAttributes: {
                            "class": "text_center"
                        },
                        sortable: false,
                        template: "#= rownum-- #"
                    },
                    {
                        field: "authGrpNm",
                        title: "그룹",
                        width: 160,
                        attributes: {
                            "class": "text_center min_width_td"
                        },
                        headerAttributes: {
                            "class": "text_center"
                        }
                    },
                    {
                        field: "userCnt",
                        title: "인원",
                        width: 60,
                        attributes: {
                            "class": "text_center"
                        },
                        headerAttributes: {
                            "class": "text_center"
                        },
                        sortable: false
                    },
                    {
                        title: "인원조정",
                        width: 60,
                        attributes: {
                            "class": "text_center"
                        },
                        headerAttributes: {
                            "class": "text_center"
                        },
                        sortable: false,
                        template: "<a href='javascript:;' class='btn_td' ><i class='k-icon k-i-gear'></i></a>"
                    }
                ],
                dataBinding: function() {
                    rownum = (this.dataSource.total() - (this.dataSource.page() - 1) * this.dataSource.pageSize());
                }
            });
        },
        createMappingGird: function() {
            var _this = this;

            $("#treelist").kendoTreeList({
                dataSource: {
                    transport: {
                        read: "/system/auth-mng/authkinds",
                        dataType: "json",
                        parameterMap: function(data) {
                            var serverUrlParams = {};
                            if ($("#menuAuthGroupFrm [name=seqno]").val() != "")
                                serverUrlParams.menuAuthGroupSeqno = $("#menuAuthGroupFrm [name=seqno]").val();

                            return serverUrlParams;
                        }
                    },
                    schema: {
                        model: {
                            id: "menuSeqno",
                            fields: {
                                parentId: {
                                    field: "menuParentSeqno",
                                    nullable: true
                                }
                            }
                        }
                    },
                    change: _this.setChildrenNode
                },
                //scrollable: false,
                columns: [{
                        field: "menuName",
                        title: "메뉴명",
                        width: 200,
                        attributes: {
                            "class": "min_width_td"
                        },
                        headerAttributes: {
                            "class": "min_width_th"
                        }
                    },
                    {
                        field: "authKind",
                        title: "N",
                        width: 60,
                        headerAttributes: {
                            "class": "text_center"
                        },
                        template: "<div class='text_center'><input type='radio' name='#='AUTH_'+id#' id='#='AUTH_N_'+id#' value='N' #= authKind=='N' ? checked='checked' : ''# class='k-radio'>" + "<label class='k-radio-label' for='#='AUTH_N_'+id#'></label></div>"
                    },
                    {
                        field: "authKind",
                        title: "V",
                        width: 60,
                        headerAttributes: {
                            "class": "text_center"
                        },
                        template: "<div class='text_center'><input type='radio' name='#='AUTH_'+id#' id='#='AUTH_V_'+id#' value='V' #= authKind=='V' ? checked='checked' : ''# class='k-radio'>" + "<label class='k-radio-label' for='#='AUTH_V_'+id#'></label></div>"
                    },
                    {
                        field: "authKind",
                        title: "W",
                        width: 60,
                        headerAttributes: {
                            "class": "text_center"
                        },
                        template: "<div class='text_center'><input type='radio' name='#='AUTH_'+id#' id='#='AUTH_W_'+id#' value='W' #= authKind=='W' ? checked='checked' : ''# class='k-radio'>" + "<label class='k-radio-label' for='#='AUTH_W_'+id#'></label></div>"
                    },
                    {
                        field: "authKind",
                        title: "M",
                        width: 60,
                        headerAttributes: {
                            "class": "text_center"
                        },
                        template: "<div class='text_center'><input type='radio' name='#='AUTH_'+id#' id='#='AUTH_M_'+id#' value='M' #= authKind=='M' ? checked='checked' : ''# class='k-radio'>" + "<label class='k-radio-label' for='#='AUTH_M_'+id#'></label></div>"
                    },
                    {
                        field: "authKind",
                        title: "A",
                        width: 60,
                        headerAttributes: {
                            "class": "text_center"
                        },
                        template: "<div class='text_center'><input type='radio' name='#='AUTH_'+id#' id='#='AUTH_A_'+id#' value='A' #= authKind=='A' ? checked='checked' : ''# class='k-radio'>" + "<label class='k-radio-label' for='#='AUTH_A_'+id#'></label></div>"
                    }
                ],
                dataBound: function(e) {
                    var dataItem = this.dataSource.get(1);
                    var row = this.tbody.find("tr[data-uid=" + dataItem.uid + "]");
                    this.expand(row);
                }
            });
        },
        changeAuthGroup: function() {
            var grid = $("#grid_left").data("kendoGrid");
            var selectedItem = grid.dataItem(this.select());

            for (key in selectedItem) {
                var $element = $("#menuAuthGroupFrm [name=" + key + "]");
                if ($element.length == 0) {
                    continue;
                }
                if (selectedItem[key] != null) {
                    $element.val(selectedItem[key]);
                }

                $("#menuAuthGroupFrm input[type=text]").attr("readonly", true);
            }

            auth.enableButtons(true, true, true, true, false, false);

            $("#treelist").data("kendoTreeList").dataSource.read();
            $("#treelist").data("kendoTreeList").refresh();
        },
        setChildrenNode: function(e) {
            var node = e.items && e.items[0];
            if (!$("#allChecker").is(":checked")) {
                return;
            }
            if (!node || e.field != "authKind") {
                return;
            }
            this.unbind("change", auth.setChildrenNode);

            function update(dataSource, nodes, field, state) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].set(field, state);
                    update(dataSource, dataSource.childNodes(nodes[i]), field, state);
                }
            }

            update(this, this.childNodes(node), "authKind", node["authKind"]);
            this.bind("change", auth.setChildrenNode);
        },
        //인원조정정보 저장
        saveMenuAuthGroupUsers: function(data) {
            var seqno = $("#menuAuthGroupFrm [name=seqno]").val();
            var users = [];
            $.each(data, function(i) {
                users.push({
                    "seqno": data[i].seqno,
                    "userNm": data[i].name
                })
            });

            $.ajax({
                url: '/system/auth-mng/' + seqno + '/users',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(users),
                success: function() {
                    kendo.alert("성공적으로 처리되었습니다.");
                    $("#modal-users").data("kendoWindow").close();
                    $("#grid_left").data("kendoGrid").dataSource.read();
                },
                error: function(e) {
                    console.log(e);
                }
            });
        }
    }

    auth.create();
});
