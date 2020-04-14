package cn.com.do1.dsf.common.base.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

/**
 * 里约网关签名校验过滤器
 *
 * @author zengxc
 */
public class TifAuthenticationFilter implements Filter {
    private static Logger log = LoggerFactory.getLogger(TifAuthenticationFilter.class);
    private final int FAIL_CODE = 400001;

    private final int TIME_OUT = 180;

    /**
     * 参与计算签名的密钥字符串
     */
    private String token;

    /**
     * 过滤器开关
     *
     */
    private boolean enable;

    public TifAuthenticationFilter(String token, boolean enable) {
        this.token = token;
        this.enable = enable;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        if (!enable) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            //时间戳
            String timestamp = request.getHeader("x-tif-timestamp");
            String nonce = request.getHeader("x-tif-nonce");
            String uid = request.getHeader("x-tif-paasid");
            //签名
            String signature = request.getHeader("x-tif-signature");
            log.debug("x-tif-timestamp:{},x-tif-nonce:{},x-tif-paasid:{},x-tif-signature:{}",timestamp,nonce,uid,signature);
            long localTimestamp =  System.currentTimeMillis() / 1000;
            if (StringUtils.isEmpty(timestamp) || StringUtils.isEmpty(nonce) || StringUtils.isEmpty(uid)
                    || StringUtils.isEmpty(signature)) {
                writeError(response, FAIL_CODE, "鉴权参数不完整，请求不合法。");
            } else {
                long nowTimestamp = Long.parseLong(timestamp);
                if (Math.abs(nowTimestamp - localTimestamp) > TIME_OUT) {
                    writeError(response, FAIL_CODE, "鉴权失败，鉴权信息有误。");

                } else if (authentication(timestamp, nonce, signature)) {
                    filterChain.doFilter(servletRequest, servletResponse);
                } else {
                    writeError(response, FAIL_CODE, "鉴权失败，鉴权信息有误。");
                }
            }
        }

    }

    /**
     * 写错误结果的方法
     * 数据采用JSON方式返回
     *
     * @param response
     * @param code
     * @param msg
     * @throws IOException
     */
    private void writeError(HttpServletResponse response, int code, String msg) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        //设置响应状态500
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        Map<String, Object> messageMap = new HashMap<>(2);
        messageMap.put("code", code);
        messageMap.put("msg", msg);
        ObjectMapper objectMapper = new ObjectMapper();
        String writeValueAsString = objectMapper.writeValueAsString(messageMap);
        response.getWriter().write(writeValueAsString);
    }

    /**
     * 签名验证
     *
     * @param timestamp
     * @param nonce
     * @param signature
     * @return
     */
    private boolean authentication(String timestamp, String nonce, String signature) {
        String signDataSha256 = calcRequestSign(timestamp, nonce);
        return signDataSha256.equalsIgnoreCase(signature);
    }

    /**
     * 计算请求签名
     *
     * @param timestamp
     * @param nonce
     * @return
     */
    private String calcRequestSign(String timestamp, String nonce) {
        return toSHA256(timestamp + token + nonce + timestamp).toUpperCase();
    }

    /**
     * SHA-256加密
     */
    private static String toSHA256(String str) {
        MessageDigest messageDigest;
        String encodeStr = "";
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(str.getBytes("UTF-8"));
            encodeStr = byte2Hex(messageDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encodeStr;
    }

    /**
     * byte转换成16进制
     */
    private static String byte2Hex(byte[] bytes) {
        StringBuffer stringBuffer = new StringBuffer();
        String temp = null;
        for (int i = 0; i < bytes.length; i++) {
            temp = Integer.toHexString(bytes[i] & 0xFF);
            if (temp.length() == 1) {
                stringBuffer.append("0");
            }
            stringBuffer.append(temp);
        }
        return stringBuffer.toString();
    }


    @Override
    public void destroy() {
    }
}
