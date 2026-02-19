package com.hanin.pda.admin.common.service;

import java.util.List;
import java.util.Map;

public interface ComService {

    /*로그인 조회*/
    public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap) throws Exception;
    /*창고 조회*/
    public List<Map<String, Object>> getWhInfo(Map<String, Object> serachMap) throws Exception;

    /*(공통) 거래처 가져올때 사용 조회 */
    public List<Map<String, Object>> getSelectCusInfo(Map<String, Object> serachMap) throws Exception;

    /*(공통) 공장 가져올때 사용 조회 */
    public List<Map<String, Object>> getFacInfo(Map<String, Object> serachMap) throws Exception;

}
