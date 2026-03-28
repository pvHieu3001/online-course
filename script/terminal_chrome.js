async function scrapeThreadsWithAmz(maxPosts = 10) {
  let results = [];
  let processedLinks = new Set();
  
  // Lấy threadId động từ URL (ví dụ: threads.net/@username -> username)
  const threadId = window.location.pathname.split('/')[1]?.replace('@', '') || "default_user";

  console.log(
    `%c--- 🚀 Đang quét cho Thread: ${threadId} (Max: ${maxPosts} bài) ---`,
    "color: #007bff; font-weight: bold;"
  );

  while (results.length < maxPosts) {
    const containers = Array.from(
      document.querySelectorAll('div[data-pressable-container="true"]')
    );

    for (let i = 0; i < containers.length; i++) {
      const currentContainer = containers[i];
      const amzLinkEl = currentContainer.querySelector('a[href*="amzn.to"]');

      if (amzLinkEl) {
        const previousContainer = containers[i-1];
        let finalAmzUrl = "";
        const rawHref = amzLinkEl.href;

        // Giải mã Link Threads Redirect
        if (rawHref.includes("l.threads.net") || rawHref.includes("l.threads.com")) {
          try {
            const urlObj = new URL(rawHref);
            const encodedUrl = urlObj.searchParams.get("u");
            if (encodedUrl) {
              finalAmzUrl = decodeURIComponent(encodedUrl).split("?")[0];
            }
          } catch (e) {
            console.error("Lỗi giải mã:", rawHref);
          }
        } else {
          finalAmzUrl = rawHref.split("?")[0];
        }

        if (finalAmzUrl && finalAmzUrl.includes("amzn.to") && !processedLinks.has(finalAmzUrl)) {
          let caption = "";
          if (i > 0) {
            const prevContainer = containers[i - 1];
            const captionEl = prevContainer.querySelector("div.xat24cr.xdj266r span");
            if (captionEl) {
              caption = captionEl.innerText.trim()
                .replace(/\d+\s*\/\s*\d+/g, "") // Xóa 1/10
                .replace(/\n\d+$/g, "")
                .trim();
            }
          }

          const threadLinkEl = previousContainer.querySelector('a[href*="/post/"]');
          let threadUrl = threadLinkEl ? (threadLinkEl.href.startsWith("http") ? threadLinkEl.href : "https://www.threads.com" + threadLinkEl.getAttribute("href")) : "";

          processedLinks.add(finalAmzUrl);
          results.push({
            caption: caption,
            amzUrl: finalAmzUrl,
            sourceUrl: threadUrl,
          });

          console.log(`%c[OK] +1: ${finalAmzUrl}`, "color: #25d366");
        }
      }
      if (results.length >= maxPosts) break;
    }

    if (results.length >= maxPosts) break;

    console.log("%c... Đang cuộn xuống để lấy thêm bài ...", "color: #888");
    window.scrollBy({
        top: window.innerHeight * 1.5,
        left: 0,
        behavior: 'smooth'
    });
    await new Promise((r) => setTimeout(r, 3000 + Math.random() * 2000)); 
  }

  console.table(results);

  if (results.length > 0) {
    const apiUrl = `http://srv947597.hstgr.cloud/api/v1/amazon/collect?threadId=${threadId}`;
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results),
    })
    .then(res => res.text())
    .then(msg => console.log(`%c[Backend] ${msg}`, "color: #25d366; font-weight: bold;"))
    .catch(err => console.error("❌ Lỗi gửi Backend:", err));
  }
}

scrapeThreadsWithAmz(5);
