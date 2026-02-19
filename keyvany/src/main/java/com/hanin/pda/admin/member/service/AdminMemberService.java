package com.hanin.pda.admin.member.service;

import java.util.List;
import java.util.Map;

public interface AdminMemberService {

    public List<Map<String,Object>> selectAdminMemberList(Map<String,Object> map) throws Exception;

    public List<Map<String,Object>> selectAdminMemberLog(Map<String,Object> map) throws Exception;

    public List<Map<String,Object>> selectMember(int unique_id) throws Exception;

    public List<Map<String,Object>> selectMemberLog(Map<String, Object> map) throws Exception;

    public List<Map<String,Object>> selectCmmCodeList() throws Exception;

    public void insertAdminMember(Map<String, Object> map) throws Exception;

    public void updateAdminMember(Map<String,Object> map) throws Exception;

    public void deleteAdminMembmer(Map<String,Object> Map) throws Exception;

    public int checkUsedEmail(Map<String,Object> Map) throws Exception;

    public int checkUsedMberId(Map<String,Object> Map) throws Exception;
    
}
