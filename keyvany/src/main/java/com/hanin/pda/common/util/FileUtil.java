package com.hanin.pda.common.util;

import java.io.File;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.hanin.pda.common.helper.helper;

@Component
public class FileUtil {

    @Value("${custom.path.bash}")
    private String uploadBash;

    @Value("${custom.path.upload-path}")
    private String uploadImagesPath;



    public List<Map<String, Object>> insertFileInfo(MultipartFile multipartFile) throws Exception {
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Map<String, Object> listMap = new HashMap<String, Object>();

        String originalFileName = "";
        String originalFileExtension = "";
        String storedFileName = "";
        //String filePath = "C:\\file\\"; // 파일이 저장될 위치
        String filePath = ""; // 파일이 저장될 위치

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
        ZonedDateTime current = ZonedDateTime.now();
        //filePath = filePath + current.format(format) + "\\";
        filePath = uploadBash+current.format(format) + uploadBash;
        File file = new File(uploadImagesPath+filePath);

        if(file.exists() == false) {
            file.mkdirs();
        }


        //확장자 확인
        String[] fileEx=new String[]{"PDF","GIF","JPG","PNG"};

        if(multipartFile.isEmpty() == false) {
            originalFileName = multipartFile.getOriginalFilename();
            if(!"".equals(originalFileName)) {
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
            }

            String originalFileExtensionCk = originalFileExtension.toUpperCase();
            boolean fileExBol = false;
            for(int i=0; i< fileEx.length; i++) {
                String paramEx = fileEx[i];
                if(!fileExBol) {
                    if(originalFileExtensionCk.equals(paramEx)) {
                        fileExBol = true;
                    }
                }
            }
            //파일 확인
            if(!fileExBol) {
                throw new BadCredentialsException("파일 확장자를 확인해주세요");
            }


            //임시작업
            //storedFileName = getRandomString() + originalFileExtension;
            storedFileName = getRandomString();

            file = new File(uploadImagesPath + filePath + storedFileName+ "." +originalFileExtension);

            try {
                multipartFile.transferTo(file);

                System.out.println("========================================================");
                System.out.println("originalFileName: " + originalFileName);
                System.out.println("storedFileName: " + storedFileName);
                System.out.println("filePath: " + filePath);
                System.out.println("originalFileExtension: " + originalFileExtension);
                System.out.println("size: " + multipartFile.getSize());
                System.out.println("========================================================");

                listMap.put("orgFileNm", originalFileName);
                listMap.put("reFileNm", storedFileName);
                listMap.put("filePath", filePath);
                listMap.put("fileType", originalFileExtension);
                listMap.put("fileSize", multipartFile.getSize());
                list.add(listMap);
            } catch (IllegalStateException e) {
                Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
            } catch (Exception e) {
                Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
            }
        }

        return list;
    }


    public List<Map<String, Object>> insertFilesInfo(MultipartFile[] multipartFile) throws Exception {
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Map<String, Object> listMap = new HashMap<String, Object>();

        String originalFileName = "";
        String originalFileExtension = "";
        String storedFileName = "";
        //String filePath = "C:\\file\\"; // 파일이 저장될 위치
        String filePath = ""; // 파일이 저장될 위치

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
        ZonedDateTime current = ZonedDateTime.now();
        //filePath = filePath + current.format(format) + "\\";
        filePath = uploadBash+current.format(format) + uploadBash;
        File file = new File(uploadImagesPath+filePath );



        if(file.exists() == false) {
            file.mkdirs();
        }

        for(MultipartFile file1 : multipartFile) {
            if(file1.getOriginalFilename() != null && !"".equals(file1.getOriginalFilename())) {
                originalFileName = file1.getOriginalFilename();

                if(!"".equals(originalFileName)) {
                    originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
                }

                //storedFileName = getRandomString() + originalFileExtension;
                storedFileName = getRandomString();

                file = new File(uploadImagesPath + filePath + storedFileName+ "." +originalFileExtension);

                try {
                    file1.transferTo(file);

                    System.out.println("========================================================");
                    System.out.println("originalFileName: " + originalFileName);
                    System.out.println("storedFileName: " + storedFileName);
                    System.out.println("filePath: " + filePath);
                    System.out.println("originalFileExtension: " + originalFileExtension);
                    System.out.println("size: " + file1.getSize());
                    System.out.println("========================================================");

                    listMap = new HashMap<String, Object>();
                    listMap.put("orgFileNm", originalFileName);
                    listMap.put("reFileNm", storedFileName);
                    listMap.put("filePath", filePath);
                    listMap.put("fileType", originalFileExtension);
                    listMap.put("fileSize", file1.getSize());
                    list.add(listMap);
                } catch (IllegalStateException e) {
                    Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
                } catch (Exception e) {
                    Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
                }
            }
        }
        return list;
    }


    /***
     * 에디터에서만 사용함
     * @param multipartFile
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> insertFileEditorInfo(MultipartFile multipartFile) throws Exception {
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Map<String, Object> listMap = new HashMap<String, Object>();

        /*
         * name=seagulls-5067489__340.webp
         * StoreLocation=
         * size=22808 bytes
         * isFormField=false
         * FieldName=file
         *
         */
        String originalFileName = "";
        String originalFileExtension = "";
        String storedFileName = "";
        //String filePath = "C:\\file\\"; // 파일이 저장될 위치
        String filePath = ""; // 파일이 저장될 위치

        filePath = uploadImagesPath+"summernoteImage/";
        File file = new File(filePath);

        if(file.exists() == false) {
            file.mkdirs();
        }

        if(multipartFile.isEmpty() == false) {
            originalFileName = multipartFile.getOriginalFilename();

            if(!"".equals(originalFileName)) {
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
            }

            //임시작업
            //storedFileName = getRandomString() + originalFileExtension;
            storedFileName = getRandomString();

            file = new File(filePath+ storedFileName+ "." +originalFileExtension);

            try {
                multipartFile.transferTo(file);

                System.out.println("========================================================");
                System.out.println("originalFileName: " + originalFileName);
                System.out.println("storedFileName: " + storedFileName);
                System.out.println("filePath: " + filePath);
                System.out.println("originalFileExtension: " + originalFileExtension);
                System.out.println("size: " + multipartFile.getSize());
                System.out.println("========================================================");

                listMap.put("orgFileNm", originalFileName);
                listMap.put("reFileNm", storedFileName);
                listMap.put("filePath", filePath);
                listMap.put("fileType", originalFileExtension);
                listMap.put("fileSize", multipartFile.getSize());
                list.add(listMap);
            } catch (IllegalStateException e) {
                Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
            } catch (Exception e) {
                Logger.getLogger(helper.class).debug(e); // e.printStackTrace();
            }
        }

        return list;
    }

    public static String getRandomString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
