package com.keyvany.keyvany.admin.rcv.rcvrawmtis.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.keyvany.keyvany.common.dao.AbstractDAO;

@Repository
public class RcvRawMtisDAO extends AbstractDAO {

    /*원소재 바코드 조회 */
    public List<Map<String, Object>> getLotMasterInfoInCheck(Map<String, Object> serachMap) throws Exception {
        return (List<Map<String,Object>>) selectList("RcvRawMtisDAO.getLotMasterInfoInCheck", serachMap);
    }


    /*원소재 등록*/
    public int setRcvRawSaveMoveNo(Map<String, Object> saveMap) {
        return (Integer) insert("RcvRawMtisDAO.setRcvRawSaveMoveNo", saveMap);
    }
}
