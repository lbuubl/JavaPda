package com.hanin.pda.admin.member.service.impl;

import java.util.List;
import java.util.Map;

import com.hanin.pda.common.dao.AbstractDAO;

import org.springframework.stereotype.Repository;


// MemberDAO
@Repository
public class AdminMemberServiceDAO extends AbstractDAO{

    public List<Map<String, Object>> selectMemberList(Map<String,Object> map) throws Exception{
        return (List<Map<String,Object>>) selectList("MemberDAO.selectMemberList",map);
    }

    public List<Map<String, Object>> selectMember(int unique_id) throws Exception{
        return (List<Map<String,Object>>) selectList("MemberDAO.selectMember",unique_id);
    }

    public List<Map<String, Object>> selectMemberLog(Map<String, Object> map) throws Exception{
        return (List<Map<String,Object>>) selectList("MemberDAO.selectMemberLog",map);
    }
    
    public List<Map<String, Object>> selectCmmCodeList() throws Exception{
        return (List<Map<String,Object>>) selectList("MemberDAO.selectCmmCodeList");
    }

    public int checkUsedEmail(Map<String, Object> map) throws Exception{
        return (int) selectOne("MemberDAO.checkUsedEmail",map);
    }

    public int checkUsedMberId(Map<String, Object> map) throws Exception{
        return (int) selectOne("MemberDAO.checkUsedMberId",map);
    }
    
    public void insertAdminMember(Map<String, Object> map) throws Exception{
        insert("MemberDAO.insertAdminMember",map);

    }
    public void updateAdminMember(Map<String, Object> map) throws Exception{
        update("MemberDAO.updateAdminMember",map);
    }

    public void deleteAdminMembmer(Map<String, Object> map) throws Exception{
        update("MemberDAO.deleteAdminMembmer",map);
    }
    
    
}
