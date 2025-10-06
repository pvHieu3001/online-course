package online.course.market.service;

import online.course.market.entity.dto.affiliate.link.AffiliateLinkPostRequest;
import online.course.market.entity.dto.affiliate.link.AffiliateLinkPutRequest;
import online.course.market.entity.model.AffiliateLink;

import java.util.List;

public interface AffiliateService {
     void recordClick(Long id) ;
     List<AffiliateLink> getAllAffiliateLinks();
     AffiliateLink getRandomAffiliateLink();
     AffiliateLink getAffiliateLinkById(Long id);
     AffiliateLink createAffiliateLink(AffiliateLinkPostRequest request);
     AffiliateLink updateAffiliateLink(Long id, AffiliateLinkPutRequest request);
     void deleteById(Long id);
}
