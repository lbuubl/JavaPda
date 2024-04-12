package com.keyvany.keyvany.common.domain;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.ToString;

@SuppressWarnings("serial")
@ToString
@Data
@Alias("privilege")
public class Privilege {
	private String name;
}
