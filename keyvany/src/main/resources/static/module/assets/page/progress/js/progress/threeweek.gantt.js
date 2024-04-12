define(function() {
	//startsWith 사용 시
	String.prototype.startsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.indexOf(str) == 0;
	}

	//endsWith 사용 시
	String.prototype.endsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.lastIndexOf(str) + str.length == this.length;
	}


    var view = {
        editor: $('#popup_editor'),
        form: $('#popup_editor #frm'),
        authKind: 'N',
        create: function(authKind) {
            var _this = this;

            $('#datepicker_standard').val(moment().format('YYYY/MM/DD'));

            _this.authKind = authKind;
            _this.el = $('#main_gantt');
            _this.createChart();
            _this.addEvent();

            $('#btnSearch').trigger('click');
        },
        monthScaleTemplate: function(date) {
            var dateToStr = gantt.date.date_to_str('%M');
            var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
            return dateToStr(date);
        },
        weekScaleTemplate: function(date) {
            var dateToStr = gantt.date.date_to_str('%M %d');
            var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
            return dateToStr(date) + ' - ' + dateToStr(endDate);
        },
        daysStyle: function(date) {
            var dateToStr = gantt.date.date_to_str('%D');
            if (dateToStr(date) == '일') return 'weekend';
            return '';
        },
        getGanttStartDate: function() {
            var start_date = moment($('#datepicker_standard').val(), 'YYYY/MM/DD');
            if ($('#scaleSelect').val() == 'M') {
                start_date.startOf('month');
                start_date.subtract(1, 'months');
            } else {
                start_date.startOf('week');
                start_date.subtract(7, 'days');
            }

            return start_date;
        },
        getGanttEndDate: function() {
            var end_date = moment($('#datepicker_standard').val(), 'YYYY/MM/DD');
            if ($('#scaleSelect').val() == 'M') {
                end_date.add(1, 'months');
                end_date.endOf('months');
            } else {
                end_date.add(7, 'days');
                end_date.endOf('week');
            }

            return end_date;
        },
        getYearDataSource: function() {
            var datasource = [];
            var year = moment().years();
            for (var i = -1; i < 5; i++) {
                datasource.push({
                    text: (year + i) + '년',
                    value: (year + i)
                });
            }
            return datasource;
        },
        getWeekDataSource: function(year) {
            var datasource = [];
            for (var i = 1; i < 53; i++) {
                var stDt = "";
                var stDt2 = "";
                var stDt3 = "";
                var edDt = "";
                var edDt2 = "";
                var edDt2 = "";
                var textStr = "";
                var curYear = moment().years();
                if(i == 1) {
               		stDt = moment((year-1), 'YYYY').weeks(52).days(0).format('YYYY/MM/DD');
                	stDt2 = moment(year, 'YYYY').weeks(i).days(0).format('YYYY/MM/DD');
                	stDt3 = moment(year, 'YYYY').weeks(i+1).days(0).format('YYYY/MM/DD');
                	edDt = moment((year-1), 'YYYY').weeks(52).days(6).format('YYYY/MM/DD');
                	edDt2 = moment(year, 'YYYY').weeks(i).days(6).format('YYYY/MM/DD');
                	edDt3 = moment(year, 'YYYY').weeks(i+1).days(6).format('YYYY/MM/DD');

                	textStr = (year-1) + '년 ' + 52 + '주차 ~ ' + (year) + '년 ' + (i+1) + '주차 [' + stDt + " ~ " + edDt3 + ']';
                } else if(i == 52) {
                	stDt = moment(year, 'YYYY').weeks(i-1).days(0).format('YYYY/MM/DD');
                	stDt2 = moment(year, 'YYYY').weeks(i).days(0).format('YYYY/MM/DD');
                	stDt3 = moment((Number(year)+1), 'YYYY').weeks(1).days(0).format('YYYY/MM/DD');
                	edDt = moment(year, 'YYYY').weeks(i-1).days(6).format('YYYY/MM/DD');
                	edDt2 = moment(year, 'YYYY').weeks(i).days(6).format('YYYY/MM/DD');
                	edDt3 = moment((Number(year)+1), 'YYYY').weeks(1).days(6).format('YYYY/MM/DD');

                	textStr = year + '년 ' + (i-1) + '주차 ~ ' + (Number(year)+1) + '년 ' + 1 + '주차 [' + stDt + " ~ " + edDt3 + ']';
                } else {
                	stDt = moment(year, 'YYYY').weeks(i-1).days(0).format('YYYY/MM/DD');
                	stDt2 = moment(year, 'YYYY').weeks(i).days(0).format('YYYY/MM/DD');
                	stDt3 = moment(year, 'YYYY').weeks(i+1).days(0).format('YYYY/MM/DD');
                	edDt = moment(year, 'YYYY').weeks(i-1).days(6).format('YYYY/MM/DD');
                	edDt2 = moment(year, 'YYYY').weeks(i).days(6).format('YYYY/MM/DD');
                	edDt3 = moment(year, 'YYYY').weeks(i+1).days(6).format('YYYY/MM/DD');

                	textStr = year + '년 ' + (i-1) + '주차 ~ ' + year + '년 ' + (i+1) + '주차 [' + stDt + " ~ " + edDt3 + ']';
                }

                datasource.push({
                    text: textStr,
                    value: i
                });
            }
            return datasource;
        },
        // WBS 조회
        getWbsDataSource: function(level, uppWbsCd) {
            var _this = this;
            var dfd = new $.Deferred();

            // 데이터 요청
            $.ajax({
                url: '/module/usermodule/progress/threeweek/wbs/' + level + '/' + uppWbsCd,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        // 대표품목 조회
        getCbsDataSource: function(lrgCstpCd, sowCd, bldgCd, mclsCd, sclsCd) {
            var _this = this;
            var dfd = new $.Deferred();

            $.ajax({
                url: '/module/usermodule/progress/threeweek/cbs',
                type: 'GET',
                dataType: 'json',
                data: {
                    lrgCstpCd: lrgCstpCd,
                    sowCd: sowCd,
                    bldgCd: bldgCd,
                    mclsCd: mclsCd,
                    sclsCd: sclsCd
                },
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        // 대표품목 물량 조회
        getCbsQty: function(lrgCstpCd, sowCd, bldgCd, mclsCd, sclsCd) {
            var _this = this;
            var dfd = new $.Deferred();

            $.ajax({
                url: '/module/usermodule/progress/threeweek/cbs/qty',
                type: 'GET',
                data: {
                    lrgCstpCd: lrgCstpCd,
                    sowCd: sowCd,
                    mclsCd: mclsCd,
                    sclsCd: sclsCd
                },
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        // 중분류 조회
        getMclsDataSource: function(lrgCstpCd, sowCd) {
            var _this = this;
            var dfd = new $.Deferred();

            $.ajax({
                url: '/module/usermodule/progress/threeweek/wbs/mcls',
                type: 'GET',
                dataType: 'json',
                data: {
                    lrgCstpCd: lrgCstpCd,
                    sowCd: sowCd
                },
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        // 소분류 조회
        getSclsDataSource: function(lrgCstpCd, sowCd, mclsCd) {
            var _this = this;
            var dfd = new $.Deferred();

            $.ajax({
                url: '/module/usermodule/progress/threeweek/wbs/scls',
                type: 'GET',
                dataType: 'json',
                data: {
                    lrgCstpCd: lrgCstpCd,
                    sowCd: sowCd,
                    mclsCd: mclsCd
                },
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        setEnableForm: function(formName, enabled) {
            var _this = this;
            if (formName == 'milestone') {
                _this.form.find('.milestone input[name=wrkCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.milestone input[name=stDt]').data('kendoDatePicker').enable(enabled);
                _this.form.find('.milestone input[name=edDt]').data('kendoDatePicker').enable(enabled);
                _this.form.find('.milestone input[name=wrkNm]').attr('disabled', !enabled);
                _this.form.find('.milestone input[name=dtlWrkNm]').attr('disabled', !enabled);

                if (enabled) {
                    $('div.input_list > ul.milestone').show();
                } else {
                    $('div.input_list > ul.milestone').hide();
                }
            } else if (formName == 'work') {
                _this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=bldgCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=year]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=week]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.work input[name=wrkNm]').attr('disabled', !enabled);
                _this.form.find('.work input[name=newWrkNm]').attr('disabled', !enabled);

                if (enabled) {
                    $('div.input_list > ul.work').show();
                    $('#r2').show();

                    _this.getWbsDataSource(1, '').done(function(data) {
                        _this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').setDataSource(data);
                    });
                } else {
                    $('div.input_list > ul.work').hide();
                    $('#r2').hide();
                }
            } else if (formName == 'resource') {
                _this.form.find('.resource input[name=rsDs]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=lrgCstpCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=sowCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=mclsCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=sclsCd]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=year]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=week]').data('kendoDropDownList').enable(enabled);
                _this.form.find('.resource input[name=wrkNm]').attr('disabled', !enabled);
                _this.form.find('.resource input[name=newWrkNm]').attr('disabled', !enabled);
                _this.form.find('.resource input[name=glQty]').attr('disabled', !enabled);

                if (enabled) {
                    $('div.input_list > ul.resource').show();
                    $('#r1').show();

                    _this.getWbsDataSource(1, '').done(function(data) {
                        _this.form.find('.resource input[name=lrgCstpCd]').data('kendoDropDownList').setDataSource(data);
                    });
                } else {
                    $('div.input_list > ul.resource').hide();
                    $('#r1').hide();
                }
            }
        },
        // 수정용 조회
        selectDetail: function(id) {
            var _this = this;
            var dfd = new $.Deferred();
            var url = (id.startsWith('R')) ? '/progress/threeweek/resource/' : '/progress/threeweek/detail/';
            var stDt = moment($('#datepicker_standard').val(), 'YYYY/MM/DD').format('YYYYMMDD');

            var strfirst = id.substring(0, id.indexOf("-")+1);
            var id = id.substring(id.indexOf("-")+1);
            var strlast = id.substring(id.lastIndexOf("-"));
            var id = id.substring(0, id.lastIndexOf("-"));
            var strlast2 = id.substring(id.lastIndexOf("-"));
            var id = id.substring(0, id.lastIndexOf("-"));
            var strlast3 = id.substring(id.lastIndexOf("-"));
            var id = id.substring(0, id.lastIndexOf("-"));

            var ids = id.replace(/\//gi,"!@!");
            var ids = ids.replace(/-/gi,"@!@");

            id = strfirst + ids + strlast3 + strlast2 + strlast;

            // 데이터 요청
            $.ajax({
                url: url + encodeURI(id) + '/' + stDt + '/' + encodeURI(id),
                type: 'GET',
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        },
        // 복사용 조회
        selectDetailForCopy: function(id) {
        	var arr = id.split("-");
        	var _this = this;
        	kendo.alert('최상단의 (+)버튼을 이용하여 내용을 등록하세요.');

        	/*if(id.indexOf("-1") == -1 && id.indexOf("-2") == -1) {
        		kendo.alert('최하단의 작업 및 자원(인원/장비)만 복사할 수 있습니다.');
        		_this.loadGantt();
        		return false;
        	} else {
        		if(id.indexOf("R-") != -1) {
        			if(arr.length <= 3) {
        				kendo.alert('최하단의 작업 및 자원(인원/장비)만 복사할 수 있습니다.');
        				_this.loadGantt();
        				return false;
        			}
        		}
        	}
        	//if()
            var _this = this;

            var dfd = new $.Deferred();
            var url = (id.startsWith('R')) ? '/progress/threeweek/resource/' : '/progress/threeweek/detail/';
            var stDt = moment($('#datepicker_standard').val(), 'YYYY/MM/DD').format('YYYYMMDD');

            // 데이터 요청
            $.ajax({
                url: url + id + '/' + stDt,
                type: 'GET',
                success: function(data) {
                    dfd.resolve(data);
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();*/
        },
        resetForm: function() {
            var _this = this;

            UI.Form.reset(_this.form);

            _this.form.find('input[name=wrkDs]').data('kendoDropDownList').value('');
            _this.form.find('input[name=wrkCd]').data('kendoDropDownList').value('');

            _this.form.find('input[name=lrgCstpCd]').each(function(i) {
                $(this).data('kendoDropDownList').value('');
            });
            _this.form.find('input[name=sowCd]').each(function(i) {
                $(this).data('kendoDropDownList').setDataSource({});
                $(this).data('kendoDropDownList').value('');
            });
            _this.form.find('input[name=bldgCd]').each(function(i) {
                $(this).data('kendoDropDownList').setDataSource({});
                $(this).data('kendoDropDownList').value('');
            });
            _this.form.find('input[name=mclsCd]').each(function(i) {
                $(this).data('kendoDropDownList').setDataSource({});
                $(this).data('kendoDropDownList').value('');
            });
            _this.form.find('input[name=sclsCd]').each(function(i) {
                $(this).data('kendoDropDownList').setDataSource({});
                $(this).data('kendoDropDownList').value('');
            });

            _this.form.find('input[name=wrkNm]').val('');
            _this.form.find('input[name=newWrkNm]').val('');
            _this.form.find('input[name=dtlWrkNm]').val('');
            _this.form.find('input[name=stDt]').val('');
            _this.form.find('input[name=edDt]').val('');
            _this.form.find('input[name=glQty]').val('');

            _this.setEnableForm('milestone', false);
            _this.setEnableForm('work', false);
            _this.setEnableForm('resource', false);
        },
        setWorkData: function(data) {
            var _this = this;

            _this.setEnableForm('milestone', false);
            _this.setEnableForm('work', true);
            _this.setEnableForm('resource', false);

            _this.form.find('input[name=wrkDs]').data('kendoDropDownList').value('2');
            _this.form.find('.work input[name=wrkNm]').val(Encoder.htmlDecode(data.wrkNm));
            _this.form.find('.work input[name=newWrkNm]').val(Encoder.htmlDecode(data.wrkNm));

            _this.getWbsDataSource(1, '').done(function(datasource) {
                _this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').setDataSource(datasource);
                _this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').value(data.lrgCstpCd);
            });

            _this.getWbsDataSource(2, data.lrgCstpCd).done(function(dataSource) {
                _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').setDataSource(dataSource);
                _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').value(data.sowCd);
            });

            _this.getWbsDataSource(3, data.lrgCstpCd + data.sowCd).done(function(dataSource) {
                _this.form.find('.work input[name=bldgCd]').data('kendoDropDownList').setDataSource(dataSource);
                _this.form.find('.work input[name=bldgCd]').data('kendoDropDownList').value(data.bldgCd);
            });

            _this.getWbsDataSource(4, data.lrgCstpCd + data.sowCd + data.bldgCd).done(function(dataSource) {
                _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').setDataSource(dataSource);
                _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').value(data.mclsCd);
            });

            var r1 = $.grep(data.details, function(r) {
                return r.ds == '1';
            });
            var r2 = $.grep(data.details, function(r) {
                return r.ds == '2';
            });
            var r3 = $.grep(data.details, function(r) {
                return r.ds == '1';
            });
            var r4 = $.grep(data.details, function(r) {
                return r.ds == '2';
            });
            var r5 = $.grep(data.details, function(r) {
                return r.ds == '1';
            });
            var r6 = $.grep(data.details, function(r) {
                return r.ds == '2';
            });

            var d1 = {
                ds: '1',
                dsName: '계획'
            };
            var d2 = {
                ds: '2',
                dsName: '실적'
            };
            var d3 = {
                ds: '3',
                dsName: '층'
            };
            var d4 = {
                ds: '4',
                dsName: '층'
            };
            var d5 = {
                ds: '5',
                dsName: '색상구분'
            };
            var d6 = {
                ds: '6',
                dsName: '색상구분'
            };

            for (var i = 0; i < r1.length; i++) {
                d1['wrk' + (i + 1)] = r1[i].dtlWrkNm;
            }
            for (var i = 0; i < r2.length; i++) {
                d2['wrk' + (i + 1)] = r2[i].dtlWrkNm;
            }
            for (var i = 0; i < r3.length; i++) {
                d3['wrk' + (i + 1)] = r3[i].flrDs;
            }
            for (var i = 0; i < r4.length; i++) {
                d4['wrk' + (i + 1)] = r4[i].flrDs;
            }
            for (var i = 0; i < r5.length; i++) {
                d5['wrk' + (i + 1)] = r5[i].clrYn;
            }
            for (var i = 0; i < r6.length; i++) {
                d6['wrk' + (i + 1)] = r6[i].clrYn;
            }

            $('#workGrid').data('kendoGrid').dataSource.data([]);
            $('#workGrid').data('kendoGrid').dataSource.add(d1);
            $('#workGrid').data('kendoGrid').dataSource.add(d3);
            $('#workGrid').data('kendoGrid').dataSource.add(d5);
            $('#workGrid').data('kendoGrid').dataSource.add(d2);
            $('#workGrid').data('kendoGrid').dataSource.add(d4);
            $('#workGrid').data('kendoGrid').dataSource.add(d6);

            /*if (data.details.length > 0) {
                for (var i = 0; i < data.details.length; i++) {
                    $('#workGrid').data('kendoGrid').dataSource.add({
                        dtlWrkNm: data.details[i].dtlWrkNm,
                        flrDs: data.details[i].flrDs,
                        planStDt: (data.details[i].stDt) ? moment(data.details[i].stDt, 'YYYYMMDD').format('YYYY/MM/DD') : '',
                        planEdDt: (data.details[i].edDt) ? moment(data.details[i].edDt, 'YYYYMMDD').format('YYYY/MM/DD') : '',
                        execStDt: (data.details[i + 1].stDt) ? moment(data.details[i + 1].stDt, 'YYYYMMDD').format('YYYY/MM/DD') : '',
                        execEdDt: (data.details[i + 1].edDt) ? moment(data.details[i + 1].edDt, 'YYYYMMDD').format('YYYY/MM/DD') : '',
                        rmk1: (data.wrkNo == data.details[i].wrkNo) ? data.rmk1 : '',
                        rmk2: (data.wrkNo == data.details[i].wrkNo) ? data.rmk2 : ''
                    });

                    i++;
                }
            }*/
        },
        setResourceData: function(data) {
            var _this = this;
            _this.setEnableForm('milestone', false);
            _this.setEnableForm('work', false);
            _this.setEnableForm('resource', true);

            _this.form.find('input[name=wrkDs]').data('kendoDropDownList').value('3');
            _this.form.find('.resource input[name=wrkNm]').val(Encoder.htmlDecode(data.wrkNm));
            _this.form.find('.resource input[name=newWrkNm]').val(Encoder.htmlDecode(data.wrkNm));
            _this.form.find('.resource input[name=newWrkNm]').val(Encoder.htmlDecode(data.wrkNm));
            _this.form.find('.resource input[name=rsDs]').data('kendoDropDownList').value(data.rsDs);

            _this.getWbsDataSource(1, '').done(function(datasource) {
                _this.form.find('.resource input[name=lrgCstpCd]').data('kendoDropDownList').setDataSource(datasource);
                _this.form.find('.resource input[name=lrgCstpCd]').data('kendoDropDownList').value(data.lrgCstpCd);
            });

            _this.getWbsDataSource(2, data.lrgCstpCd).done(function(dataSource) {
                _this.form.find('.resource input[name=sowCd]').data('kendoDropDownList').setDataSource(dataSource);
                _this.form.find('.resource input[name=sowCd]').data('kendoDropDownList').value(data.sowCd);
            });

            _this.getMclsDataSource(data.lrgCstpCd, data.sowCd).done(function(dataSource) {
                _this.form.find('.resource input[name=mclsCd]').data('kendoDropDownList').setDataSource(dataSource);
                _this.form.find('.resource input[name=mclsCd]').data('kendoDropDownList').value(data.mclsCd);
            });

            _this.getSclsDataSource(data.lrgCstpCd, data.sowCd, data.mclsCd).done(function(datasource) {
                _this.form.find('.resource input[name=sclsCd]').data('kendoDropDownList').setDataSource(datasource);
                _this.form.find('.resource input[name=sclsCd]').data('kendoDropDownList').value(data.sclsCd);
            });

            _this.form.find('.resource input[name=glQty]').val(data.glQty);

            var r1 = $.grep(data.resources, function(r) {
                return r.ds == '1';
            });
            var r2 = $.grep(data.resources, function(r) {
                return r.ds == '2';
            });
            var d1 = {
                ds: '1',
                dsName: '계획'
            };
            var d2 = {
                ds: '2',
                dsName: '실적'
            };

            for (var i = 0; i < r1.length; i++) {
                d1['qty' + (i + 1)] = r1[i].rsInpQty;
            }
            for (var i = 0; i < r2.length; i++) {
                d2['qty' + (i + 1)] = r2[i].rsInpQty;
            }

            $('#resourceGrid').data('kendoGrid').dataSource.data([]);
            $('#resourceGrid').data('kendoGrid').dataSource.add(d1);
            $('#resourceGrid').data('kendoGrid').dataSource.add(d2);
        },
        openEditor: function(id) {
            var _this = this;
            var task = gantt.getTask(id);

            if (task.$new) {
                $('#btnDelete').addClass('hide');
                $('#btnCopy').addClass('hide');

                _this.form.find('input[name=_method]').val('post');
                _this.resetForm();

                if (task.parent == 0) {
                    // 신규 등록
                    _this.form.find('input[name=wrkDs]').data('kendoDropDownList').readonly(false);
                } else {
                    var parent = gantt.getTask(task.parent);
                    // 복사
                    if (task.parent.toString().startsWith('R')) {
                        _this.selectDetailForCopy(task.parent).done(function(data) {
                            _this.setResourceData(data);

                            var wkStDt = moment($('#datepicker_standard').val(), 'YYYY/MM/DD');
                            wkStDt.add(7, 'days');
                            var year = moment(wkStDt, 'YYYYMMDD').year();
                            var week = moment(wkStDt, 'YYYYMMDD').weeks();
                            _this.form.find('.resource input[name=year]').data('kendoDropDownList').value(year);
                            _this.form.find('.resource input[name=week]').data('kendoDropDownList').setDataSource(_this.getWeekDataSource(year));
                            //_this.form.find('.resource input[name=week]').data('kendoDropDownList').value((week-1));

                            _this.form.find('.resource input[name=glQty]').val(parent.glQty);
                            _this.form.find('.resource input[name=wrkNm]').val(parent.text.substr(0, parent.text.indexOf('[')));
                        });
                    } else {
                        _this.selectDetailForCopy(task.parent).done(function(data) {
                            _this.setWorkData(data);

                            var wkStDt = moment($('#datepicker_standard').val(), 'YYYY/MM/DD');
                            wkStDt.add(7, 'days');
                            var year = moment(wkStDt, 'YYYYMMDD').year();
                            var week = moment(wkStDt, 'YYYYMMDD').weeks();
                            console.log(year);
                            _this.form.find('.resource input[name=year]').data('kendoDropDownList').value(year);
                            _this.form.find('.resource input[name=week]').data('kendoDropDownList').setDataSource(_this.getWeekDataSource(year));
                            _this.form.find('.resource input[name=week]').data('kendoDropDownList').value(week);

                            _this.form.find('.work input[name=wrkNm]').val(parent.text.substr(0, parent.text.indexOf('[')));
                        });
                    }
                }
            } else {
                $('#btnDelete').removeClass('hide');

                _this.selectDetail(task.id).done(function(data) {
                    _this.form.find('input[name=id]').val(task.id);
                    _this.form.find('input[name=_method]').val('put');
                    _this.form.find('input[name=wrkDs]').data('kendoDropDownList').value(data.wrkDs);
                    _this.form.find('input[name=wrkDs]').data('kendoDropDownList').readonly(true);

                    if (data.wrkDs == '1') {
                        $('#btnCopy').addClass('hide');
                    } else {
                        $('#btnCopy').removeClass('hide');
                    }

                    if (task.id.startsWith('MST')) {
                        // 마일스톤 데이터 폼 출력
                        $('#popup_editor').data('kendoWindow').title('마일스톤 수정');

                        _this.setEnableForm('milestone', true);
                        _this.setEnableForm('work', false);
                        _this.setEnableForm('resource', false);

                        _this.form.find('input[name=wrkNo]').val(data.wrkNo);
                        _this.form.find('.milestone input[name=wrkCd]').data('kendoDropDownList').value(data.wrkCd);
                        _this.form.find('.milestone input[name=wrkCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.milestone input[name=dtlWrkNm]').val(Encoder.htmlDecode(data.details[0].dtlWrkNm));

                        if (data.details[0].stDt) {
                            _this.form.find('.milestone input[name=stDt]').val(moment(data.details[0].stDt, 'YYYYMMDD').format('YYYY/MM/DD'));
                        }
                        if (data.details[0].edDt) {
                            _this.form.find('.milestone input[name=edDt]').val(moment(data.details[0].edDt, 'YYYYMMDD').format('YYYY/MM/DD'));
                        }
                    } else if (task.id.startsWith('R')) {
                        // 자원 데이터 폼 출력
                        $('#popup_editor').data('kendoWindow').title('자원 수정');
                        _this.setResourceData(data);

                        var wkStDt = data.wkStDt;
                        var year = "";
                        var week = moment(data.wkStDt, 'YYYYMMDD').weeks();

                        if(week == 52) {
                        	year = moment(data.wkStDt, 'YYYYMMDD').year();
                        } else if(week == 1) {
                        	year = moment(data.wkEdDt, 'YYYYMMDD').year();
                        } else {
                        	year = moment(data.wkStDt, 'YYYYMMDD').year();
                        }

                        _this.form.find('input[name=wrkNo]').val(data.wrkNo);
                        _this.form.find('.resource input[name=year]').data('kendoDropDownList').value(year);
                        _this.form.find('.resource input[name=year]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.resource input[name=week]').data('kendoDropDownList').setDataSource(_this.getWeekDataSource(year));
                        _this.form.find('.resource input[name=week]').data('kendoDropDownList').value(week);
                        _this.form.find('.resource input[name=week]').data('kendoDropDownList').readonly(true);

                        _this.form.find('.resource input[name=wrkNm]').val(Encoder.htmlDecode(data.wrkNm));
                        _this.form.find('.resource input[name=newWrkNm]').val(Encoder.htmlDecode(data.wrkNm));
                        _this.form.find('.resource input[name=rsDs]').data('kendoDropDownList').value(data.rsDs);

                        _this.form.find('.resource input[name=lrgCstpCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.resource input[name=sowCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.resource input[name=mclsCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.resource input[name=sclsCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.resource input[name=rsDs]').data('kendoDropDownList').readonly(true);
                    } else {
                        // 작업 데이터 폼 출력
                        $('#popup_editor').data('kendoWindow').title('작업 수정');

                        _this.setWorkData(data);

                        var wkStDt = data.wkStDt;
                        var year = "";
                        var week = moment(data.wkStDt, 'YYYYMMDD').weeks();

                        if(week == 52) {
                        	year = moment(data.wkStDt, 'YYYYMMDD').year();
                        } else if(week == 1) {
                        	year = moment(data.wkEdDt, 'YYYYMMDD').year();
                        } else {
                        	year = moment(data.wkStDt, 'YYYYMMDD').year();
                        }
                        //_this.form.find('input[name=wrkNo]').val(data.wrkNo);
                        /*_this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').readonly(true);

                        $('.work .k-grid-add').addClass('k-state-disabled');
                        $('.work .k-grid-delete').addClass('k-state-disabled');*/

                        _this.form.find('input[name=wrkNo]').val(data.wrkNo);
                        _this.form.find('.work input[name=year]').data('kendoDropDownList').value(year);
                        _this.form.find('.work input[name=year]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=week]').data('kendoDropDownList').setDataSource(_this.getWeekDataSource(year));
                        _this.form.find('.work input[name=week]').data('kendoDropDownList').value(week);
                        _this.form.find('.work input[name=week]').data('kendoDropDownList').readonly(true);

                        _this.form.find('.work input[name=wrkNm]').val(Encoder.htmlDecode(data.wrkNm));
                        _this.form.find('.work input[name=newWrkNm]').val(Encoder.htmlDecode(data.wrkNm));

                        _this.form.find('.work input[name=lrgCstpCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').readonly(true);
                        _this.form.find('.work input[name=bldgCd]').data('kendoDropDownList').readonly(true);
                    }

                    _this.editor.data('kendoWindow').center();
                });
            }

            _this.editor.kendoWindow({
                width: '90%',
                modal: true,
                iframe: true,
                title: '등록',
                visible: false,
                close: function(e) {
                    if (gantt.isTaskExists(id)) {
                        var task = gantt.getTask(id);
                        if (task.$new) {
                            gantt.deleteTask(task.id);
                        }
                    }
                    gantt.hideLightbox();
                }
            });

            _this.editor.data('kendoWindow').open().center();
        },
        closeEditor: function() {
            var _this = this;
            _this.editor.data('kendoWindow').close()
        },
        setScaleConfig: function() {
            var _this = this;

            var scale = $('#scaleSelect').val();

            if (scale == 'M') {
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%Y %F";
                gantt.config.subscales = [{
                    unit: 'week',
                    step: 1,
                    date: '%w'
                }];
            } else {
                gantt.config.subscales = [{
                        unit: 'week',
                        step: 1,
                        template: _this.weekScaleTemplate
                },
                    {
                        unit: 'day',
                        step: 1,
                        date: '%j',
                        css: _this.daysStyle
                }];
            }
        },
        createChart: function() {
            var _this = this;

            UI.Gantt.init();
            gantt.config.start_date = _this.getGanttStartDate();
            gantt.config.end_date = _this.getGanttEndDate();
            gantt.config.start_on_monday = false;
            gantt.config.min_column_width = 100;

            _this.setScaleConfig();

            gantt.config.columns = [{
                    name: 'text',
                    label: 'Activity명',
                    width: 200,
                    tree: true,
                    resize: true
                },
                {
                    name: 'rmk',
                    label: '비고',
                    width: 100,
                    tree: false,
                    resize: true
                },
                {
                    name: 'glQty',
                    label: '물량',
                    width: 100,
                    tree: false,
                    resize: true
                },
                {
                    name: 'add',
                    label: '',
                    width: 44
                }
            ];

            /*if (_this.authKind == 'A' || _this.authKind == 'W') {
                gantt.config.columns.push({
                    name: 'add',
                    label: '',
                    width: 44
                });
            }*/

            gantt.config.open_tree_initially = true;
            gantt.init('main_gantt');
            ganttModules.menu.setup();
            gantt.parse({
                data: [],
                links: []
            }, 'json');

            gantt.attachEvent("onTaskLoading", function(task) {
                task.$open = true;
                return true;
            });

            gantt.templates.grid_row_class = function(start, end, task) {
                if (task.id.toString().startsWith('MST')) {
                    return 'nested_task';
                } else if (task.id.toString().startsWith('R')) {
                    if (task.$level == 1) {
                        return 'nested_task';
                    } else {
                        return 'weekend2';
                    }
                } else {
                    if (task.$level == 0) {
                        return 'nested_task';
                    } else {

                    }
                }
            };



            gantt.templates.grid_row_class = gantt.templates.task_row_class = function(start, end, task) {
            	/*if(pId == "") {
            		pId == task.parent;
            	}

            	if(cnt % 2 == 1 && pId == task.parent) {
            		if(task.text.indexOf("계획") != -1) {
            			console.log("계획");
            			return "weekend2";
            		}*/
            		if(task.text.indexOf("계획") != -1) {
            			if (task.id.toString().startsWith('MST')) {
                            return 'nested_task';
                        } else if (task.id.toString().startsWith('R')) {
                            if (task.$level == 1) {
                                return 'nested_task';
                            } else {
                                return '';
                            }
                        } else {
                            if (task.$level == 0) {
                                return 'nested_task';
                            } else {
                                return '';
                            }
                        }
            		} else {
            			if (task.id.toString().startsWith('MST')) {
                            return 'weekend3';
                        } else if (task.id.toString().startsWith('R')) {
                            if (task.$level == 1) {
                                return 'weekend3';
                            } else {
                                return 'weekend2';
                            }
                        } else {
                            if (task.$level == 0) {
                                return 'weekend3';
                            } else {
                                return 'weekend2';
                            }
                        }
            		}
            }


            gantt.templates.task_text = function(start, end, task) {
                if (task.id.toString().startsWith('R')) {
                    return '<span style="color:#000000">' + task.text + '</span> ';
                } else {
                    return task.text;
                }
            };

            gantt.templates.task_class = function(start, end, task) {
                if (task.parent.toString() == '0') {
                    return 'milestone';
                } else if (task.id.toString().startsWith('R')) {
                    return 'resource-task';
                } else {
                    if (task.parent.endsWith('1')) {
                        if (task.clrYn == 'Y') {
                            return 'clrline';
                        } else {
                       		return 'middel-task';
                        }

                    } else {
                        if (task.clrYn == 'Y') {
                            return 'clrline';
                        } else {
                            return 'baseline';
                        }
                    }
                }
            };

            gantt.templates.task_cell_class = function(item,date){
            	if($("#scaleSelect").val() == "W" && (date.getDay()==0)){
                    return "weekend"
                }
            };



            gantt.showLightbox = function(id) {

             	var task = gantt.getTask(id);

                if ($('#scaleSelect').val() == 'M') {
                    return;
                } else {
                    if ($.isNumeric(id)) {
                        _this.openEditor(id);
                    } else {
                        if (id.startsWith('MST')) {
                            if (id.split('-').length < 4) {
                                return;
                            }
                        } else if (id.startsWith('R')) {
                            if (id.split('-').length < 6) {
                                return;
                            }
                        } else {
                            if (id.split('-').length < 4) {
                                return;
                            }
                        }
                        _this.openEditor(id);
                    }
                }
            };

            gantt.templates.rightside_text = function(start, end, task) {
                if (task.type == gantt.config.types.milestone) {
                    return task.text;
                }
            };
            /*gantt.templates.leftside_text = function leftSideTextTemplate(start, end, task) {
    			if (getTaskFitValue(task) === "left") {
    				return task.text;
    			}
    			return "";
    		};
    		gantt.templates.rightside_text = function rightSideTextTemplate(start, end, task) {
    			if (getTaskFitValue(task) === "right") {
    				return task.text;
    			}
    			return "";
    		};
    		gantt.templates.task_text = function taskTextTemplate(start, end, task) {
    			if (getTaskFitValue(task) === "center") {
    				return task.text;
    			}
    			return "";
    		};*/

            function getTaskFitValue(task) {
    			var taskStartPos = gantt.posFromDate(task.start_date),
    				taskEndPos = gantt.posFromDate(task.end_date);

    			var width = taskEndPos - taskStartPos;
    			var textWidth = (task.text || "").length * gantt.config.font_width_ratio;

    			if (width < textWidth) {
    				var ganttLastDate = gantt.getState().max_date;
    				var ganttEndPos = gantt.posFromDate(ganttLastDate);
    				if (ganttEndPos - taskEndPos < textWidth) {
    					return "left"
    				}
    				else {
    					return "right"
    				}
    			}
    			else {
    				return "center";
    			}
    		}
            /*(function () {
        		gantt.config.font_width_ratio = 7;
        		gantt.templates.leftside_text = function leftSideTextTemplate(start, end, task) {
        			if (getTaskFitValue(task) === "left") {
        				return task.text;
        			}
        			return "";
        		};
        		gantt.templates.rightside_text = function rightSideTextTemplate(start, end, task) {
        			if (getTaskFitValue(task) === "right") {
        				return task.text;
        			}
        			return "";
        		};
        		gantt.templates.task_text = function taskTextTemplate(start, end, task) {
        			if (getTaskFitValue(task) === "center") {
        				return task.text;
        			}
        			return "";
        		};

        		function getTaskFitValue(task) {
        			var taskStartPos = gantt.posFromDate(task.start_date),
        				taskEndPos = gantt.posFromDate(task.end_date);

        			var width = taskEndPos - taskStartPos;
        			var textWidth = (task.text || "").length * gantt.config.font_width_ratio;

        			if (width < textWidth) {
        				var ganttLastDate = gantt.getState().max_date;
        				var ganttEndPos = gantt.posFromDate(ganttLastDate);
        				if (ganttEndPos - taskEndPos < textWidth) {
        					return "left"
        				}
        				else {
        					return "right"
        				}
        			}
        			else {
        				return "center";
        			}
        		}
        	})();*/
        },
        addEvent: function() {
            var _this = this;

            $('#datepicker_standard').kendoDatePicker({
                format: 'yyyy/MM/dd'
            });

            _this.form.find('input[name=stDt]').kendoDatePicker({
                format: 'yyyy/MM/dd'
            });

            _this.form.find('input[name=edDt]').kendoDatePicker({
                format: 'yyyy/MM/dd'
            });

            // 작업구분 콤보박스.
            _this.form.find('input[name=wrkDs]').kendoDropDownList({
                optionLabel: '선택',
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                        text: '마일스톤',
                        value: '1'
                    },
                    {
                        text: '작업',
                        value: '2'
                    },
                    {
                        text: '자원',
                        value: '3'
                    },
                ],
                change: function(e) {
                    if (this.value() == '1') {
                        // 마일스톤 선택
                        $('#popup_editor').data('kendoWindow').title('마일스톤 등록');
                        _this.setEnableForm('milestone', true);
                        _this.setEnableForm('work', false);
                        _this.setEnableForm('resource', false);
                    } else if (this.value() == '2') {
                        // 작업 선택
                        $('#popup_editor').data('kendoWindow').title('작업 등록');
                        _this.setEnableForm('milestone', false);
                        _this.setEnableForm('work', true);
                        _this.setEnableForm('resource', false);

                        $('.work .k-grid-add').removeClass('k-state-disabled');
                        $('#workGrid').data('kendoGrid').dataSource.data([]);
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '1',
                            dsName: '계획'
                        });
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '3',
                            dsName: '층'
                        });
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '5',
                            dsName: '색상구분'
                        });
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '2',
                            dsName: '실적'
                        });
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '4',
                            dsName: '층'
                        });
                        $('#workGrid').data('kendoGrid').dataSource.add({
                            ds: '6',
                            dsName: '색상구분'
                        });
                    } else if (this.value() == '3') {
                        // 자원 선택
                        $('#popup_editor').data('kendoWindow').title('자원 등록');
                        _this.setEnableForm('milestone', false);
                        _this.setEnableForm('work', false);
                        _this.setEnableForm('resource', true);

                        $('.resource .k-grid-add').removeClass('k-state-disabled');
                        $('#resourceGrid').data('kendoGrid').dataSource.data([]);
                        $('#resourceGrid').data('kendoGrid').dataSource.add({
                            ds: '1',
                            dsName: '계획'
                        });
                        $('#resourceGrid').data('kendoGrid').dataSource.add({
                            ds: '2',
                            dsName: '실적'
                        });
                    }

                    _this.editor.data('kendoWindow').center();
                }
            }).data('kendoDropDownList');

            // 마일스톤 작업  콤보박스.
            _this.form.find('.milestone input[name=wrkCd]').kendoDropDownList({
                optionLabel: '선택',
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                        text: '가설',
                        value: '01'
                    },
                    {
                        text: '외주',
                        value: '02'
                    },
                    {
                        text: '자재',
                        value: '03'
                    },
                    {
                        text: '안전',
                        value: '04'
                    },
                    {
                        text: '품질',
                        value: '05'
                    }
                ],
                change: function(e) {
                    _this.form.find('.milestone input[name=wrkNm]').val(this.text());
                }
            }).data('kendoDropDownList');

            // 자원구분  콤보박스.
            _this.form.find('.resource input[name=rsDs]').kendoDropDownList({
                optionLabel: '선택',
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                        text: '인원',
                        value: '1'
                    },
                    {
                        text: '자재',
                        value: '2'
                    }
                ]
            }).data('kendoDropDownList');

            // 작업 그리드
            $('#workGrid').kendoGrid({
            	dataSource: {
                    type: 'json',
                    schema: {
                        model: {
                            id: 'id',
                            fields: {
                                id: {
                                    editable: false,
                                    nullable: true
                                },
                                ds: {
                                    editable: false,
                                },
                                dsName: {
                                    editable: false,
                                }
                            }
                        }
                    }
                },
                height: 260,
                pageable: false,
                columns: [{
                        field: 'dsName',
                        title: '구분',
                        width: '80px'
                    },
                    {
                        field: 'wrk1',
                        title: '전주 1일차',
    					width: '100px'
                    },
                    {
                        field: 'wrk2',
                        title: '2일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk3',
                        title: '3일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk4',
                        title: '4일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk5',
                        title: '5일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk6',
                        title: '6일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk7',
                        title: '7일차',
    					width: '80px'
                    },
                    {
                        field: 'wrk8',
                        title: '금주 1일차',
    					width: '100px'
                    },
                    {
                        field: 'wrk9',
                        title: '2일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk10',
                        title: '3일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk11',
                        title: '4일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk12',
                        title: '5일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk13',
                        title: '6일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk14',
                        title: '7일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk15',
                        title: '차주 1일차',
                        width: '100px'
                    },
                    {
                        field: 'wrk16',
                        title: '2일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk17',
                        title: '3일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk18',
                        title: '4일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk19',
                        title: '5일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk20',
                        title: '6일차',
                        width: '80px'
                    },
                    {
                        field: 'wrk21',
                        title: '7일차',
                        width: '80px'
                    },
                    {
                        field: 'rmk',
                        title: '비고',
                        width: '160px'
                    }
                ],
                navigatable: true,
                editable: true
            });

            //리소스 그리드
            $('#resourceGrid').kendoGrid({
                dataSource: {
                    type: 'json',
                    schema: {
                        model: {
                            id: 'id',
                            fields: {
                                id: {
                                    editable: false,
                                    nullable: true
                                },
                                ds: {
                                    editable: false,
                                },
                                dsName: {
                                    editable: false,
                                }
                            }
                        }
                    }
                },
                height: 120,
                pageable: false,
                columns: [{
                        field: 'dsName',
                        title: '구분',
                        width: '80px'
                    },
                    {
                        field: 'qty1',
                        title: '전주 1일차',
                        width: '100px'
                    },
                    {
                        field: 'qty2',
                        title: '2일차',
                        width: '80px'
                    },
                    {
                        field: 'qty3',
                        title: '3일차',
                        width: '80px'
                    },
                    {
                        field: 'qty4',
                        title: '4일차',
                        width: '80px'
                    },
                    {
                        field: 'qty5',
                        title: '5일차',
                        width: '80px'
                    },
                    {
                        field: 'qty6',
                        title: '6일차',
                        width: '80px'
                    },
                    {
                        field: 'qty7',
                        title: '7일차',
                        width: '80px'
                    },
                    {
                        field: 'qty8',
                        title: '금주 1일차',
                        width: '100px'
                    },
                    {
                        field: 'qty9',
                        title: '2일차',
                        width: '80px'
                    },
                    {
                        field: 'qty10',
                        title: '3일차',
                        width: '80px'
                    },
                    {
                        field: 'qty11',
                        title: '4일차',
                        width: '80px'
                    },
                    {
                        field: 'qty12',
                        title: '5일차',
                        width: '80px'
                    },
                    {
                        field: 'qty13',
                        title: '6일차',
                        width: '80px'
                    },
                    {
                        field: 'qty14',
                        title: '7일차',
                        width: '80px'
                    },
                    {
                        field: 'qty15',
                        title: '차주 1일차',
                        width: '100px'
                    },
                    {
                        field: 'qty16',
                        title: '2일차',
                        width: '80px'
                    },
                    {
                        field: 'qty17',
                        title: '3일차',
                        width: '80px'
                    },
                    {
                        field: 'qty18',
                        title: '4일차',
                        width: '80px'
                    },
                    {
                        field: 'qty19',
                        title: '5일차',
                        width: '80px'
                    },
                    {
                        field: 'qty20',
                        title: '6일차',
                        width: '80px'
                    },
                    {
                        field: 'qty21',
                        title: '7일차',
                        width: '80px'
                    },
                    {
                        field: 'rmk',
                        title: '비고',
                        width: '160px'
                    }
                ],
                navigatable: true,
                editable: true
            });

            // 대공종 콤보박스.
            _this.form.find('input[name=lrgCstpCd]').kendoDropDownList({
                optionLabel: '대공종',
                dataTextField: 'text',
                dataValueField: 'id',
                change: function(e) {
                    if (this.value() != '') {
                        var wrkDs = _this.form.find('input[name=wrkDs]').val();
                        if (wrkDs == '2') {
                            _this.getWbsDataSource(2, this.value()).done(function(data) {
                                _this.form.find('.work input[name=sowCd]').data('kendoDropDownList').setDataSource(data);
                            });
                        } else if (wrkDs == '3') {
                            _this.getWbsDataSource(2, this.value()).done(function(data) {
                                _this.form.find('.resource input[name=sowCd]').data('kendoDropDownList').setDataSource(data);
                            });
                        }
                    }
                }
            }).data('kendoDropDownList');

            //공구 콤보박스.
            _this.form.find('input[name=sowCd]').kendoDropDownList({
                optionLabel: '공구',
                dataTextField: 'text',
                dataValueField: 'id',
                change: function(e) {
                    if (this.value() != '') {
                        var wrkDs = _this.form.find('input[name=wrkDs]').val();
                        if (wrkDs == '2') {
                            var lrgCstpCd = _this.form.find('.work input[name=lrgCstpCd]').val();
                            _this.getWbsDataSource(3, lrgCstpCd + this.value()).done(function(data) {
                                _this.form.find('.work input[name=bldgCd]').data('kendoDropDownList').setDataSource(data);
                            });
                        } else if (wrkDs == '3') {
                            var lrgCstpCd = _this.form.find('.resource input[name=lrgCstpCd]').val();
                            _this.getMclsDataSource(lrgCstpCd, this.value()).done(function(data) {
                                _this.form.find('.resource input[name=mclsCd]').data('kendoDropDownList').setDataSource(data);
                            });
                        }
                    }
                }
            }).data('kendoDropDownList');

            // 동 콤보박스.
            _this.form.find('input[name=bldgCd]').kendoDropDownList({
                optionLabel: '동',
                dataTextField: 'text',
                dataValueField: 'id',
                change: function(e) {
                    $('input[name=wrkNm]').val(this.text());
                    if (this.value() != '') {
                        var lrgCstpCd = _this.form.find('.work input[name=lrgCstpCd]').val();
                        var sowCd = _this.form.find('.work input[name=sowCd]').val();
                        _this.getWbsDataSource(4, lrgCstpCd + sowCd + this.value()).done(function(data) {
                            _this.form.find('.work input[name=mclsCd]').data('kendoDropDownList').setDataSource(data);
                        });
                    }
                }
            }).data('kendoDropDownList');

            // 중분류 콤보박스.
            _this.form.find('input[name=mclsCd]').kendoDropDownList({
                optionLabel: '중분류',
                dataTextField: 'text',
                dataValueField: 'id',
                change: function(e) {
                    if (this.value() != '') {
                        var wrkDs = _this.form.find('input[name=wrkDs]').val();
                        if (wrkDs == '3') {
                            var lrgCstpCd = _this.form.find('.resource input[name=lrgCstpCd]').val();
                            var sowCd = _this.form.find('.resource input[name=sowCd]').val();
                            _this.getSclsDataSource(lrgCstpCd, sowCd, this.value()).done(function(datasource) {
                                _this.form.find('.resource input[name=sclsCd]').data('kendoDropDownList').setDataSource(datasource);
                            });
                        }
                    }
                }
            }).data('kendoDropDownList');

            // 소분류 콤보박스.
            _this.form.find('input[name=sclsCd]').kendoDropDownList({
                optionLabel: '소분류',
                dataTextField: 'text',
                dataValueField: 'id',
                change: function(e) {
                    if (this.value() != '') {
                        var wrkDs = _this.form.find('input[name=wrkDs]').val();
                        if (wrkDs == '3') {
                            var lrgCstpCd = _this.form.find('.resource input[name=lrgCstpCd]').val();
                            var sowCd = _this.form.find('.resource input[name=sowCd]').val();
                            var mclsCd = _this.form.find('.resource input[name=mclsCd]').val();

                            _this.getCbsQty(lrgCstpCd, sowCd, '', mclsCd, this.value()).done(function(qty) {
                                _this.form.find('.resource input[name=glQty]').val(qty);
                            });
                        }
                    }
                }
            }).data('kendoDropDownList');

            _this.form.find('input[name=year]').kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: _this.getYearDataSource(),
                index: 1,
                change: function(e) {
                    var datasource = _this.getWeekDataSource(this.value());
                    _this.form.find('.resource input[name=week]').data('kendoDropDownList').setDataSource(datasource);
                    _this.form.find('input[name=week]').data('kendoDropDownList').setDataSource(datasource);
                }
            });

            _this.form.find('input[name=week]').kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: _this.getWeekDataSource(moment().years()),
                dataBound: function(e) {
                    this.value(moment().weeks());
                }
            });

            $("#scaleSelect").kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [{
                        text: '주간공정표',
                        value: 'W'
                    }, {
                        text: '월간공정표',
                        value: 'M'
                    }
                ],
                change: function(e) {
                    _this.setScaleConfig();
                    $('#btnSearch').trigger('click');
                }
            }).data('kendoDropDownList');

            // 검색
            $('#btnSearch').on('click', function(e) {
                gantt.config.start_date = _this.getGanttStartDate();
                gantt.config.end_date = _this.getGanttEndDate();

                _this.loadGantt();
            });

            // 검색
            $('#datepicker_standard').on('change', function(e) {
                gantt.config.start_date = _this.getGanttStartDate();
                gantt.config.end_date = _this.getGanttEndDate();

                _this.loadGantt();
            });

            // 검색
            $('#lrgCstpSelect').on('change', function(e) {
                gantt.config.start_date = _this.getGanttStartDate();
                gantt.config.end_date = _this.getGanttEndDate();

                _this.loadGantt();
            });

            // 검색
            $('#gongguSelect').on('change', function(e) {
                gantt.config.start_date = _this.getGanttStartDate();
                gantt.config.end_date = _this.getGanttEndDate();

                _this.loadGantt();
            });

            // 검색
            $('#dongSelect').on('change', function(e) {
                gantt.config.start_date = _this.getGanttStartDate();
                gantt.config.end_date = _this.getGanttEndDate();

                _this.loadGantt();
            });

            // 복사
            $('#btnCopy').on('click', function(e) {
                _this.form.find('input[name=_method]').val('post');
                _this.form.find('input[name=wrkNo]').val('');
                $('#btnSave').trigger('click');
            });

            //저장
            $('#btnSave').on('click', function(e) {
                var formData = UI.Validator(_this.form).value();
                if (!formData) {
                    return;
                }

                var wrkDs = _this.form.find('input[name=wrkDs]').val();
                var noData = "";
                if (wrkDs == '2') {
                    $.each($('#workGrid').data('kendoGrid').dataSource.data(), function(i, n) {
                        formData['wrks[' + i + '].ds'] = n.ds;
                        formData['wrks[' + i + '].wrk[0]'] = _.isUndefined(n.wrk1) ? null : n.wrk1;
                        formData['wrks[' + i + '].wrk[1]'] = _.isUndefined(n.wrk2) ? null : n.wrk2;
                        formData['wrks[' + i + '].wrk[2]'] = _.isUndefined(n.wrk3) ? null : n.wrk3;
                        formData['wrks[' + i + '].wrk[3]'] = _.isUndefined(n.wrk4) ? null : n.wrk4;
                        formData['wrks[' + i + '].wrk[4]'] = _.isUndefined(n.wrk5) ? null : n.wrk5;
                        formData['wrks[' + i + '].wrk[5]'] = _.isUndefined(n.wrk6) ? null : n.wrk6;
                        formData['wrks[' + i + '].wrk[6]'] = _.isUndefined(n.wrk7) ? null : n.wrk7;
                        formData['wrks[' + i + '].wrk[7]'] = _.isUndefined(n.wrk8) ? null : n.wrk8;
                        formData['wrks[' + i + '].wrk[8]'] = _.isUndefined(n.wrk9) ? null : n.wrk9;
                        formData['wrks[' + i + '].wrk[9]'] = _.isUndefined(n.wrk10) ? null : n.wrk10;
                        formData['wrks[' + i + '].wrk[10]'] = _.isUndefined(n.wrk11) ? null : n.wrk11;
                        formData['wrks[' + i + '].wrk[11]'] = _.isUndefined(n.wrk12) ? null : n.wrk12;
                        formData['wrks[' + i + '].wrk[12]'] = _.isUndefined(n.wrk13) ? null : n.wrk13;
                        formData['wrks[' + i + '].wrk[13]'] = _.isUndefined(n.wrk14) ? null : n.wrk14;
                        formData['wrks[' + i + '].wrk[14]'] = _.isUndefined(n.wrk15) ? null : n.wrk15;
                        formData['wrks[' + i + '].wrk[15]'] = _.isUndefined(n.wrk16) ? null : n.wrk16;
                        formData['wrks[' + i + '].wrk[16]'] = _.isUndefined(n.wrk17) ? null : n.wrk17;
                        formData['wrks[' + i + '].wrk[17]'] = _.isUndefined(n.wrk18) ? null : n.wrk18;
                        formData['wrks[' + i + '].wrk[18]'] = _.isUndefined(n.wrk19) ? null : n.wrk19;
                        formData['wrks[' + i + '].wrk[19]'] = _.isUndefined(n.wrk20) ? null : n.wrk20;
                        formData['wrks[' + i + '].wrk[20]'] = _.isUndefined(n.wrk21) ? null : n.wrk21;
                        formData['wrks[' + i + '].rmk'] = _.isUndefined(n.rmk) ? null : n.rmk;
                        if(i == 0 || i == 3) {
                        	if(n.wrk1 != null && n.wrk1 != '') { noData = "N"; }
                        	if(n.wrk2 != null && n.wrk2 != '') { noData = "N"; }
                        	if(n.wrk3 != null && n.wrk3 != '') { noData = "N"; }
                        	if(n.wrk4 != null && n.wrk4 != '') { noData = "N"; }
                        	if(n.wrk5 != null && n.wrk5 != '') { noData = "N"; }
                        	if(n.wrk6 != null && n.wrk6 != '') { noData = "N"; }
                        	if(n.wrk7 != null && n.wrk7 != '') { noData = "N"; }
                        	if(n.wrk8 != null && n.wrk8 != '') { noData = "N"; }
                        	if(n.wrk9 != null && n.wrk9 != '') { noData = "N"; }
                        	if(n.wrk10 != null && n.wrk10 != '') { noData = "N"; }
                        	if(n.wrk11 != null && n.wrk11 != '') { noData = "N"; }
                        	if(n.wrk12 != null && n.wrk12 != '') { noData = "N"; }
                        	if(n.wrk13 != null && n.wrk13 != '') { noData = "N"; }
                        	if(n.wrk14 != null && n.wrk14 != '') { noData = "N"; }
                        	if(n.wrk15 != null && n.wrk15 != '') { noData = "N"; }
                        	if(n.wrk16 != null && n.wrk16 != '') { noData = "N"; }
                        	if(n.wrk17 != null && n.wrk17 != '') { noData = "N"; }
                        	if(n.wrk18 != null && n.wrk18 != '') { noData = "N"; }
                        	if(n.wrk19 != null && n.wrk19 != '') { noData = "N"; }
                        	if(n.wrk20 != null && n.wrk20 != '') { noData = "N"; }
                        	if(n.wrk21 != null && n.wrk21 != '') { noData = "N"; }
                        }
                    });
                } else if (wrkDs == '3') {
                    var qtys = {};
                    $.each($('#resourceGrid').data('kendoGrid').dataSource.data(), function(i, n) {
                        formData['qtys[' + i + '].ds'] = n.ds;
                        formData['qtys[' + i + '].qty[0]'] = _.isUndefined(n.qty1) ? null : n.qty1;
                        formData['qtys[' + i + '].qty[1]'] = _.isUndefined(n.qty2) ? null : n.qty2;
                        formData['qtys[' + i + '].qty[2]'] = _.isUndefined(n.qty3) ? null : n.qty3;
                        formData['qtys[' + i + '].qty[3]'] = _.isUndefined(n.qty4) ? null : n.qty4;
                        formData['qtys[' + i + '].qty[4]'] = _.isUndefined(n.qty5) ? null : n.qty5;
                        formData['qtys[' + i + '].qty[5]'] = _.isUndefined(n.qty6) ? null : n.qty6;
                        formData['qtys[' + i + '].qty[6]'] = _.isUndefined(n.qty7) ? null : n.qty7;
                        formData['qtys[' + i + '].qty[7]'] = _.isUndefined(n.qty8) ? null : n.qty8;
                        formData['qtys[' + i + '].qty[8]'] = _.isUndefined(n.qty9) ? null : n.qty9;
                        formData['qtys[' + i + '].qty[9]'] = _.isUndefined(n.qty10) ? null : n.qty10;
                        formData['qtys[' + i + '].qty[10]'] = _.isUndefined(n.qty11) ? null : n.qty11;
                        formData['qtys[' + i + '].qty[11]'] = _.isUndefined(n.qty12) ? null : n.qty12;
                        formData['qtys[' + i + '].qty[12]'] = _.isUndefined(n.qty13) ? null : n.qty13;
                        formData['qtys[' + i + '].qty[13]'] = _.isUndefined(n.qty14) ? null : n.qty14;
                        formData['qtys[' + i + '].qty[14]'] = _.isUndefined(n.qty15) ? null : n.qty15;
                        formData['qtys[' + i + '].qty[15]'] = _.isUndefined(n.qty16) ? null : n.qty16;
                        formData['qtys[' + i + '].qty[16]'] = _.isUndefined(n.qty17) ? null : n.qty17;
                        formData['qtys[' + i + '].qty[17]'] = _.isUndefined(n.qty18) ? null : n.qty18;
                        formData['qtys[' + i + '].qty[18]'] = _.isUndefined(n.qty19) ? null : n.qty19;
                        formData['qtys[' + i + '].qty[19]'] = _.isUndefined(n.qty20) ? null : n.qty20;
                        formData['qtys[' + i + '].qty[20]'] = _.isUndefined(n.qty21) ? null : n.qty21;
                        formData['qtys[' + i + '].rmk'] = _.isUndefined(n.rmk) ? null : n.rmk;
                        if(i == 0 || i == 1) {
                        	if(n.qty1 != null && n.qty1 != '') { noData = "N"; }
                        	if(n.qty2 != null && n.qty2 != '') { noData = "N"; }
                        	if(n.qty3 != null && n.qty3 != '') { noData = "N"; }
                        	if(n.qty4 != null && n.qty4 != '') { noData = "N"; }
                        	if(n.qty5 != null && n.qty5 != '') { noData = "N"; }
                        	if(n.qty6 != null && n.qty6 != '') { noData = "N"; }
                        	if(n.qty7 != null && n.qty7 != '') { noData = "N"; }
                        	if(n.qty8 != null && n.qty8 != '') { noData = "N"; }
                        	if(n.qty9 != null && n.qty9 != '') { noData = "N"; }
                        	if(n.qty10 != null && n.qty10 != '') { noData = "N"; }
                        	if(n.qty11 != null && n.qty11 != '') { noData = "N"; }
                        	if(n.qty12 != null && n.qty12 != '') { noData = "N"; }
                        	if(n.qty13 != null && n.qty13 != '') { noData = "N"; }
                        	if(n.qty14 != null && n.qty14 != '') { noData = "N"; }
                        	if(n.qty15 != null && n.qty15 != '') { noData = "N"; }
                        	if(n.qty16 != null && n.qty16 != '') { noData = "N"; }
                        	if(n.qty17 != null && n.qty17 != '') { noData = "N"; }
                        	if(n.qty18 != null && n.qty18 != '') { noData = "N"; }
                        	if(n.qty19 != null && n.qty19 != '') { noData = "N"; }
                        	if(n.qty20 != null && n.qty20 != '') { noData = "N"; }
                        	if(n.qty21 != null && n.qty21 != '') { noData = "N"; }
                        }
                    });
                } else {
                	noData = "N"
                }
                if(noData == "N") {
	                $.ajax({
	                    url: '/module/usermodule/progress/threeweek/report',
	                    type: 'post',
	                    data: formData,
	                    success: function() {
	                        if (_this.form.find('input[name=_method]').val() == 'put') {
	                            kendo.alert('성공적으로 처리되었습니다.');
	                            _this.closeEditor();
	                            _this.loadGantt();
	                        } else {
	                            kendo.confirm('계속 입력하시겠습니까?').done(function() {
	                                _this.loadGantt();
	                                if (wrkDs == '1') {
	                                    _this.form.find('input[name=wrkCd]').data('kendoDropDownList').value('');
	                                    _this.form.find('input[name=dtlWrkNm]').val('');
	                                    _this.form.find('input[name=planStDt]').val('');
	                                    _this.form.find('input[name=execStDt]').val('');
	                                } else if (wrkDs == '2') {
	                                    $('#workGrid').data('kendoGrid').dataSource.data([]);
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '1',
	                                        dsName: '계획'
	                                    });
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '3',
	                                        dsName: '층'
	                                    });
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '5',
	                                        dsName: '색상구분'
	                                    });
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '2',
	                                        dsName: '실적'
	                                    });
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '4',
	                                        dsName: '층'
	                                    });
	                                    $('#workGrid').data('kendoGrid').dataSource.add({
	                                        ds: '6',
	                                        dsName: '색상구분'
	                                    });
	                                } else if (wrkDs == '3') {
	                                    $('#resourceGrid').data('kendoGrid').dataSource.data([]);
	                                    $('#resourceGrid').data('kendoGrid').dataSource.add({
	                                        ds: '1',
	                                        dsName: '계획'
	                                    });
	                                    $('#resourceGrid').data('kendoGrid').dataSource.add({
	                                        ds: '2',
	                                        dsName: '실적'
	                                    });
	                                }
	                            }).fail(function() {
	                                _this.closeEditor();
	                                _this.loadGantt();
	                            });
	                        }
	                    }
	                });
                } else {
                	kendo.alert('등록할 데이터가 없습니다.');
                }
            });

            //등록창 닫기
            $('#btnDelete').on('click', function(e) {
                kendo.confirm('삭제하시겠습니까?\n삭제한 데이터는 복구할 수 없습니다.').done(function() {
                    $.ajax({
                        url: '/module/usermodule/progress/threeweek/report',
                        type: 'post',
                        data: {
                            _method: 'delete',
                            stDt : moment($('#datepicker_standard').val(), 'YYYY/MM/DD').format('YYYYMMDD'),
                            wrkNo: _this.form.find('input[name=wrkNo]').val(),
                            wrkDs: _this.form.find('input[name=wrkDs]').val(),
                        },
                        success: function() {
                            kendo.alert('성공적으로 처리되었습니다.');
                            _this.closeEditor();
                            _this.loadGantt();
                        }
                    });
                });
            });

            // 등록창 닫기
            $('#btnClose').on('click', function(e) {
                _this.closeEditor();
            });

            // 등록창 닫기
            $('#btnClear').on('click', function(e) {
            	var wrkDs = _this.form.find('input[name=wrkDs]').val();

            	if(wrkDs == "2") {
            		var dataSource = $("#workGrid").data("kendoGrid").dataSource;
	            	var data = dataSource.data();

	            	for(var i=0; i<data.length; i++) {
	            		data[i].wrk1 = "";
	            		data[i].wrk2 = "";
	            		data[i].wrk3 = "";
	            		data[i].wrk4 = "";
	            		data[i].wrk5 = "";
	            		data[i].wrk6 = "";
	            		data[i].wrk7 = "";
	            		data[i].wrk8 = "";
	            		data[i].wrk9 = "";
	            		data[i].wrk10 = "";
	            		data[i].wrk11 = "";
	            		data[i].wrk12 = "";
	            		data[i].wrk13 = "";
	            		data[i].wrk14 = "";
	            		data[i].wrk15 = "";
	            		data[i].wrk16 = "";
	            		data[i].wrk17 = "";
	            		data[i].wrk18 = "";
	            		data[i].wrk19 = "";
	            		data[i].wrk20 = "";
	            		data[i].wrk21 = "";
	            		data[i].rmk = "";
	            	}
	            	$("#workGrid").data("kendoGrid").refresh();
            	} else if(wrkDs == "3") {
	            	var dataSource = $("#resourceGrid").data("kendoGrid").dataSource;
	            	var data = dataSource.data();

	            	for(var i=0; i<data.length; i++) {
	            		data[i].qty1 = "";
	            		data[i].qty2 = "";
	            		data[i].qty3 = "";
	            		data[i].qty4 = "";
	            		data[i].qty5 = "";
	            		data[i].qty6 = "";
	            		data[i].qty7 = "";
	            		data[i].qty8 = "";
	            		data[i].qty9 = "";
	            		data[i].qty10 = "";
	            		data[i].qty11 = "";
	            		data[i].qty12 = "";
	            		data[i].qty13 = "";
	            		data[i].qty14 = "";
	            		data[i].qty15 = "";
	            		data[i].qty16 = "";
	            		data[i].qty17 = "";
	            		data[i].qty18 = "";
	            		data[i].qty19 = "";
	            		data[i].qty20 = "";
	            		data[i].qty21 = "";
	            		data[i].rmk = "";
	            	}
	            	$("#resourceGrid").data("kendoGrid").refresh();
            	}
            });

            // download
            $('a[data-name="downGantt"]').on('click', UI.Gantt.downloadEvent);

            $('a[data-name="fullScreen"]').on('click', UI.Gantt.fullScreenEvent);
        },
        // 간트데이터 조회
        loadGantt: function() {
            var _this = this;
            var dfd = new $.Deferred();

            var serverUrlParams = {
                lrgCstpCd: $('#lrgCstpSelect').val(),
                sowCd: $('#gongguSelect').val(),
                bldgCd: $('#dongSelect').val(),
                scale: $('#scaleSelect').val(),
                stdDt: $('#datepicker_standard').val()
            };

            // 데이터 요청
            $.ajax({
                url: '/module/usermodule/progress/threeweek/data',
                type: 'GET',
                dataType: 'json',
                data: serverUrlParams,
                success: function(resp) {
                    gantt.clearAll();
                    gantt.parse({
                        'data': resp,
                        'links': []
                    }, 'json');
                },
                fail: function(e) {
                    dfd.reject();
                },
                error: function(e) {
                    dfd.reject();
                }
            });

            return dfd.promise();
        }
    };

    return view;
});
