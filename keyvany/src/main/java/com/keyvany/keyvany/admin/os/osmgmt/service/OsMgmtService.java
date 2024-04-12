package com.keyvany.keyvany.admin.os.osmgmt.service;

import java.util.List;
import java.util.Map;

public interface OsMgmtService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;
}
