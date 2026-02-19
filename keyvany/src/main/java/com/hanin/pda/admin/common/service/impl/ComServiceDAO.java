package com.hanin.pda.admin.common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hanin.pda.common.dao.AbstractDAO;

@Repository
public class ComServiceDAO extends AbstractDAO {

  /* 구분코드 조회*/
  public List<Map<String, Object>> usp_zt_00_login_pda(Map<String, Object> serachMap)
      throws Exception {
    return (List<Map<String, Object>>) selectList("ComDAO.usp_zt_00_login_pda", serachMap);
  }

  /*창고 구분코드 조회*/
  public List<Map<String, Object>> getWhInfo(Map<String, Object> serachMap) throws Exception {
    return (List<Map<String, Object>>) selectList("ComDAO.getWhInfo", serachMap);
  }

  /*(공통) 거래처 리스트 조회*/
  public List<Map<String, Object>> getSelectCusInfo(Map<String, Object> serachMap)
      throws Exception {
    return (List<Map<String, Object>>) selectList("ComDAO.getSelectCusInfo", serachMap);
  }

  /*(공통) 공장 리스트 조회*/
  public List<Map<String, Object>> getFacInfo(Map<String, Object> serachMap) throws Exception {
    return (List<Map<String, Object>>) selectList("ComDAO.getFacInfo", serachMap);
  }
}
