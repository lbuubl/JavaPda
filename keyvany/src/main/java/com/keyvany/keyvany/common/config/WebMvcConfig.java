/**
 * Copyright all right reserved SOFTONE CO., LTD.
 *
 * No part of this work may be reproduced, stored in a retrieval system
 * ,or transmitted by any means without prior written permission of SOFTONE CO., LTD.
 * ====================================================================================
 * @project KEYVANY
 * @file WebMvcConfig.java
 * ====================================================================================
 *  No      DATE            Author      Description
 * ====================================================================================
 *  1.0     2020.08.18. lee     Initial Coding
 * ====================================================================================
 */
package com.keyvany.keyvany.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.keyvany.keyvany.common.interceptor.ProjectListInterceptorAdapter;
import com.keyvany.keyvany.common.interceptor.UserInfoInterceptorAdapter;

/**
 * <PRE>
 * package : co.kr.keyvany.sys.config
 * type : WebMvcConfig
 * description : Web Mvc Config
 * </PRE>
 * @author lee
 * @version 1.0
 * @since 2020.08.18.
 */



@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final String uploadImagesPath;

    public WebMvcConfig(@Value("${custom.path.upload-path}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
        System.out.println("==============================================================================");
        System.out.println("path check=>"+uploadImagesPath);
        System.out.println("==============================================================================");
    }

    /**
     * <PRE>
     * name : addInterceptors
     * description : add Interceptors
     * </PRE>
     * @author lee
     * @since 2018. 4. 9.
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /*
         * registry.addInterceptor(new UserInfoInterceptorAdapter())
         * .excludePathPatterns("/static/**","/resources/**");
         */
    	/*
        // 사용자쪽 메뉴리스트를 위한 인터셉터 추가
        registry.addInterceptor(projectListInterceptorAdapter())
        .addPathPatterns("/**")
        .excludePathPatterns("/static/**","/resources/**","/cms/**");
        */
        //관리자쪽 인터셉터
        registry.addInterceptor(userInfoInterceptorAdapter())
        .addPathPatterns("/cms/**")
        .excludePathPatterns("/static/**","/resources/**","/cms/**","/headerIndex","/cms/logout","/cms/login","/cms/loginAction");


    }
    // Bean으로 등록하여 인터셉터에서 DB(mybatis)에 접근할수 있도록 허용
    @Bean
    public ProjectListInterceptorAdapter projectListInterceptorAdapter() {
        return new ProjectListInterceptorAdapter();
    }

    @Bean
    public UserInfoInterceptorAdapter userInfoInterceptorAdapter() {
        return new UserInfoInterceptorAdapter();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/resources/**","/static/**")
            .addResourceLocations("classpath:/resources/","classpath:/static/")
            .setCachePeriod(20);

        registry.addResourceHandler("/resources/static/upload/**","/cms/manage/popImageUpload")
                .addResourceLocations("file:"+uploadImagesPath)
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
        System.out.println("file:"+uploadImagesPath);
    }


}
