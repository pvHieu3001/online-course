package online.book.market.service;

import online.book.market.entity.dto.affiliate.link.AffiliateLinkPostRequest;
import online.book.market.entity.dto.affiliate.link.AffiliateLinkPutRequest;
import online.book.market.entity.model.AffiliateLink;

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
