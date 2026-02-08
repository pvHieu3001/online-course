package online.course.market.service;

import online.course.market.entity.dto.nice.NiceRequest;
import online.course.market.entity.dto.nice.NiceResponse;

public interface NiceService {
     public NiceRequest generateRequestData(String callBackUrl);
     public String verifyData(String encodeData);
     public Boolean sendTempPwd(String phoneNumber);
}
