package com.keyvany.keyvany.admin.rcv.rcvrawmtis.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keyvany.keyvany.admin.rcv.rcvrawmtis.service.RcvRawMtisService;

//
@Service
@Transactional
public class RcvRawMtisServiceImpl implements RcvRawMtisService {

    @Autowired
    RcvRawMtisDAO dao;
    /*원소재 바코드 조회*/
    @Override
    public List<Map<String, Object>> getLotMasterInfoInCheck(Map<String, Object> serachMap) throws Exception {
        return dao.getLotMasterInfoInCheck(serachMap);
    }


    /*배기 리스트 저장*/
    @Override
    public void setRcvRawSaveMoveNo( HashMap<String, Object>  saveMap) throws Exception {
    	List<Map<String, Object>>saveList =  (List<Map<String, Object>>) saveMap.get("data");
    	for (Map<String, Object> hashMap : saveList) {
    		int it  = dao.setRcvRawSaveMoveNo(hashMap);
        	System.out.println("===================="+it);
		}
    }
}
