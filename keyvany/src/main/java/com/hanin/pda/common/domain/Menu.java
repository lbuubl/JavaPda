package com.hanin.pda.common.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.ToString;

@SuppressWarnings("serial")
@ToString
@Data
@Alias("menu")
public class Menu {

	private static final long serialVersionUID = 1L;
    private String prjId;
    private String prjNm;
    private String expsYn;
    private String dispYn;
    private String listSpac;
    private String listDsc;
    private String listImgId;
    private String listImgNm;
    private String mainImgId;
    private String mainImgNm;
    private String mainImgPath;
    private String creatDttm;
    private String crtrId;
    private String updtDttm;
    private String updusrId;
    private String delYn;
    
    
}
