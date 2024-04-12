package com.keyvany.keyvany.admin.rcv.rcvrawmtis.service;

import java.util.List;
import java.util.Map;

public interface RcvRawMtisService {

    /*wheel 리스트 조회*/
    public List<Map<String, Object>> selectWheelList(Map<String, Object> serachMap) throws Exception;
}
