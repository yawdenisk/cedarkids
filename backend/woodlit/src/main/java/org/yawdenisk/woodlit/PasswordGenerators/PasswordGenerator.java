package org.yawdenisk.woodlit.PasswordGenerators;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
@Component
public class PasswordGenerator {
    static String symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@$%^&*";
    static SecureRandom rnd = new SecureRandom();

    public String randomPass(int len){
        StringBuilder pass = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            pass.append(symbols.charAt(rnd.nextInt(symbols.length())));
        }
        return pass.toString();
    }
}