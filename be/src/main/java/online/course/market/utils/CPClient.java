package online.course.market.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Mock Class cho thư viện NICE CPClient.
 * Lớp này mô phỏng các phương thức gốc của NICE để dùng trong môi trường Dev/Test.
 */
public class CPClient {
    private String sCipherTime = "";
    private String sPlainData = "";
    private String sCipherData = "";

    /**
     * Mô phỏng hàm fnEncode của NICE.
     * @return 0 nếu thành công, mã lỗi nếu thất bại.
     */
    public int fnEncode(String siteCode, String sitePassword, String reqData) {
        if (siteCode == null || siteCode.isEmpty()) return -1;
        if (sitePassword == null || sitePassword.isEmpty()) return -2;

        // Mô phỏng chuỗi đã mã hóa bằng cách Base64 hoặc String đơn giản
        this.sCipherData = "ENC_" + java.util.Base64.getEncoder().encodeToString(reqData.getBytes());
        return 0;
    }

    /**
     * Mô phỏng hàm fnDecode của NICE.
     * Quan trọng: Phải tạo ra chuỗi PlainData đúng định dạng [L:FieldName][L:Value]
     */
    public int fnDecode(String siteCode, String sitePassword, String cipherData) {
        if (cipherData == null || !cipherData.startsWith("ENC_")) return -4;

        // MÔ PHỎNG DỮ LIỆU CHUẨN NICE: [Độ dài tên]:[Tên][Độ dài giá trị]:[Giá trị]
        // Ví dụ: 7:REQ_SEQ15:REQ1698399000...
        StringBuilder sb = new StringBuilder();
        appendField(sb, "REQ_SEQ", "REQ20260208223853132");
        appendField(sb, "RES_SEQ", "RES20260208223853132");
        appendField(sb, "UTF8_NAME", "NGUYEN VAN A");
        appendField(sb, "MOBILE_NO", "01012345678");
        appendField(sb, "BIRTHDATE", "19950101");
        appendField(sb, "GENDER", "1"); // 1: Nam, 0: Nữ
        appendField(sb, "NATIONALINFO", "0"); // 0: Nội địa, 1: Nước ngoài
        appendField(sb, "DI", "MC0GCCqGSIb3DQIJAyEAtX2D..."); // 64 byte định danh
        appendField(sb, "CI", "MC0GCCqGSIb3DQIJAyEAtX2D..."); // 88 byte định danh

        this.sPlainData = sb.toString();
        this.sCipherTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

        return 0;
    }

    // --- Helper nội bộ để tạo định dạng NICE ---
    private void appendField(StringBuilder sb, String key, String value) {
        sb.append(key.length()).append(":").append(key);
        sb.append(value.length()).append(":").append(value);
    }

    // --- Public Getters ---

    public String getCipherData() { return sCipherData; }

    public String getPlainData() { return sPlainData; }

    public String getCipherTime() { return sCipherTime; }

    /**
     * Mô phỏng hàm getRequestNO (Tạo mã giao dịch duy nhất)
     */
    public String getRequestNO(String siteCode) {
        return "REQ20260208223853132";
    }

    public String getErrorMsg() {
        return "SUCCESS";
    }
}