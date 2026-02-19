package com.hanin.pda.common.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.ToString;

@SuppressWarnings("serial")
@ToString
@Data
@Alias("admin")
public class Admin {

	private static final long serialVersionUID = 1L;
	private String adminName;
	private String adminId; 

}
