package com.keyvany.keyvany.admin.os.osprocin.service;

import java.util.List;
import java.util.Map;

public interface OsProcInService {

    /*외주가공입고 바코드 조회*/
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception;

}
