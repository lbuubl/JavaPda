package com.keyvany.keyvany.admin.common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keyvany.keyvany.admin.common.service.ComService;
import com.keyvany.keyvany.common.helper.helper;

@Service("comService")
public class ComServiceImpl implements ComService {

    @Autowired
    ComServiceDAO dao;

    /*공지사항 리스트 조회*/
    @Override
    public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap) throws Exception {
        return dao.usp_zt_00_login_pda(serachMap);
    }

    @Override
    public List<Map<String, Object>> usp_zt_99_popup_wh_cd(Map<String, Object> serachMap) throws Exception {
        return dao.usp_zt_99_popup_wh_cd(serachMap);
    }

    /**
     * (공통) 거래처 가져올때 사용
     * @param serachMap
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> getSelectCusInfo(Map<String, Object> serachMap) throws Exception {
        return dao.getSelectCusInfo(serachMap);
    }


    /**
     * (공통) 공장 가져올때 사용
     * @param serachMap
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> getFacInfo(Map<String, Object> serachMap) throws Exception {
        return dao.getFacInfo(serachMap);
    }
}