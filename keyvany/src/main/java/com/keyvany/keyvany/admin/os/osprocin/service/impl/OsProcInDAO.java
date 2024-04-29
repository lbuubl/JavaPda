package com.keyvany.keyvany.admin.os.osprocin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class OsProcInDAO extends AbstractDAO {

    /*외주가공입고 바코드 조회 */
    public List<Map<String, Object>> getLotMasterInfoCheck(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("OsProcInDAO.getLotMasterInfoCheck", serachMap);
    }
}
