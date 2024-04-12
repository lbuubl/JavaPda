package com.keyvany.keyvany.common.service.impl;

import java.util.List;
import java.util.Map;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.keyvany.keyvany.common.service.CommonService;

@Service("commonService")
public class CommonServiceImpl implements CommonService{

    @Autowired
    private CommonServiceDAO commonServiceDAO;

    @Autowired
    JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    String form;

    public List<Map<String, Object>> selectMenuList(Map<String, Object> serachMap) throws Exception {
        return commonServiceDAO.selectMenuList(serachMap);
    }

    public  boolean  setEmailSend(String to, String subject , String content) {
        
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
                mimeMessage.setFrom(new InternetAddress(form));
                mimeMessage.setSubject(subject.replaceAll("[\r\n]","")  );
                mimeMessage.setText(content, "utf-8", "html");
            }
        };
         
        try
        {
            //메일 보내기
            javaMailSender.send(preparator);
            return true;
        }
        catch (MailException me)
        {
            System.out.println("setEmailSend=MailException============"+me.getMessage());
            return false;
        }
        catch (Exception e){
           System.out.println("setEmailSend=Exception============"+e.getMessage());
            return false;
        }
    }

    /*해당하는 이미지 삭제*/
    @Override
    public int insertAdminlog(Map<String, Object> saveMap) throws Exception {
        
        int retInt = 0;
        try {
            commonServiceDAO.insertAdminlog(saveMap);
        } catch (Exception e) {
            // TODO: handle exception
            retInt = -1;
            System.out.println("CommonServiceImpl-insertAdminlog : "+e.getMessage());
        }
        return retInt;
    }
    

}
