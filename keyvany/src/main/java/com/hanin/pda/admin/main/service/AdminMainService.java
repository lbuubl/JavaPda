package com.hanin.pda.admin.main.service;

import java.util.List;
import java.util.Map;

public interface AdminMainService {

    /*메인 차트 조회*/
    public List<Map<String,Object>> getMainChart(Map<String, Object> params) throws Exception;
}
