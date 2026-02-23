/**
 * Copyright all right reserved SOFTONE CO., LTD.
 *
 * No part of this work may be reproduced, stored in a retrieval system
 * ,or transmitted by any means without prior written permission of SOFTONE CO., LTD.
 * ====================================================================================
 * @project Sample
 * @file WebMvcConfig.java
 * ====================================================================================
 *  No		DATE			Author		Description
 * ====================================================================================
 *  1.0		2018. 4. 05.	won.jeong		Initial Coding
 * ====================================================================================
 */
package com.hanin.pda.common.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public  class MailConfig
{
	@Value("${spring.mail.host}")
	String host;

	@Value("${spring.mail.port}")
	String port;

	@Value("${spring.mail.username}")
	String user;

	@Value("${spring.mail.password}")
	String pass;

	@Bean
	public JavaMailSender getMailSender()
	{
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setUsername(user);
		mailSender.setPassword(pass);
		mailSender.setJavaMailProperties(getMailProperties());
		return mailSender;
	}

	private Properties getMailProperties()
	{
		Properties properties = new Properties();
		properties.setProperty("mail.transport.protocol", "smtp");
		properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.setProperty("mail.smtp.ssl.trust", host);
		properties.setProperty("mail.smtp.host", host);
		properties.setProperty("mail.smtp.auth", "true");
		properties.setProperty("mail.smtp.port", port);
		properties.setProperty("mail.smtp.socketFactory.port", port);
		properties.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.debug", "true");
		return properties;
	}
}
