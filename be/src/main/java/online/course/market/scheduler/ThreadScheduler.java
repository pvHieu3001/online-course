package online.course.market.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.course.market.service.GroqService;
import online.course.market.service.ThreadsService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class ThreadScheduler {
    private final ThreadsService threadsService;
    private final GroqService groqService;
    @Scheduled(cron = "0 * * * * *")
    public void runAtStartOfHour() {
        System.out.println("Task bắt đầu vào đầu giờ: " + LocalDateTime.now());
        String originalCap = "Săn ngay chiếc tai nghe này trên Amazon, đang giảm giá cực sốc!";
        String prompt = "Rewrite this in English using Gen Z slang (e.g., 'slay', 'vibe', 'lowkey', 'game changer'). Keep it vibe-heavy and very concise. Add a few trendy emojis. Original content: " + originalCap;
        String newCaption = groqService.generateThreadsContent(prompt);

        threadsService.postToThreads(newCaption, "", "", "");
    }
}
