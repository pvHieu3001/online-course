package online.course.market.service;

import io.github.redouane59.twitter.TwitterClient;
import io.github.redouane59.twitter.dto.tweet.Tweet;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class XService {
    private final String CONSUMER_KEY = "CVmkkB41OMlZKeXv0LbURNq5f";
    private final String CONSUMER_SECRET = "sfDv5aOxW0HzWgIoWFSCX2iLtjaJEqZ4qobcdBHvFyJVSzrxCn";
    private final String ACCESS_TOKEN = "1292278657558310913-rpECNg8rQdDnCVzMJLORgkLZ2PaSNO";
    private final String ACCESS_TOKEN_SECRET = "mlUq82ZKCQLeRg1562S3UHcAGjDOGXWr0enQetfuvbu6q";

    public void postTweet(String content) {
        TwitterClient twitterClient = new TwitterClient(TwitterCredentials.builder()
                .apiKey(CONSUMER_KEY)
                .apiSecretKey(CONSUMER_SECRET)
                .accessToken(ACCESS_TOKEN)
                .accessTokenSecret(ACCESS_TOKEN_SECRET)
                .build());
        try {
            // Trong API v2, dùng hàm postTweet
            Tweet response = twitterClient.postTweet(content);

            if (response != null && response.getId() != null) {
                System.out.println("Đăng bài thành công! ID bài viết: " + response.getId());
            } else {
                System.err.println("Đăng bài thất bại, không nhận được ID phản hồi.");
            }
        } catch (Exception e) {
            System.err.println("Lỗi khi kết nối với X API: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        XService xService = new XService();
        String content = "Chào buổi sáng! Chúc mọi người một ngày làm việc hiệu quả. #TechNews";
        xService.postTweet(content);
    }
}
