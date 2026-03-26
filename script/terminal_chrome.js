async function scrapeThreadsWithAmz(maxPosts = 10) {
  let results = [];
  let processedLinks = new Set();

  console.log(
    "%c--- Đang quét (Lấy Caption từ bài trước + Giải mã Link)... ---",
    "color: #007bff; font-weight: bold;",
  );

  while (results.length < maxPosts) {
    const containers = Array.from(
      document.querySelectorAll('div[data-pressable-container="true"]'),
    );

    for (let i = 0; i < containers.length; i++) {
      const currentContainer = containers[i];

      const amzLinkEl = currentContainer.querySelector('a[href*="amzn.to"]');

      if (amzLinkEl) {
        let finalAmzUrl = "";
        const rawHref = amzLinkEl.href;

        if (
          rawHref.includes("l.threads.net") ||
          rawHref.includes("l.threads.com")
        ) {
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

        if (
          finalAmzUrl &&
          finalAmzUrl.includes("amzn.to") &&
          !processedLinks.has(finalAmzUrl)
        ) {
          let caption = "";
          if (i > 0) {
            const prevContainer = containers[i - 1];
            const captionEl = prevContainer.querySelector(
              "div.xat24cr.xdj266r span",
            );
            if (captionEl) {
              let rawText = captionEl.innerText.trim();
              caption = rawText
                .replace(/\d+\s*\/\s*\d+/g, "")
                .replace(/\n\d+$/g, "")
                .trim();

              if (caption === "") caption = "";
            }
          }

          const threadLinkEl =
            currentContainer.querySelector('a[href*="/post/"]');
          let threadUrl = "";
          if (threadLinkEl) {
            const href = threadLinkEl.getAttribute("href");
            threadUrl = href.startsWith("http")
              ? href
              : "https://www.threads.net" + href;
          }

          processedLinks.add(finalAmzUrl);
          results.push({
            caption: caption,
            amzUrl: finalAmzUrl,
            sourceUrl: threadUrl,
          });

          console.log(`%c[OK] Đã lấy bài: ${finalAmzUrl}`, "color: #25d366");
          console.log(
            `      ↳ Caption từ bài trước: ${caption.substring(0, 50)}...`,
          );
        }
      }
      if (results.length >= maxPosts) break;
    }

    if (results.length >= maxPosts) break;
    window.scrollBy(0, window.innerHeight);
    await new Promise((r) => setTimeout(r, 2500));
  }

  console.table(results);

  if (results.length > 0) {
    fetch("http://srv947597.hstgr.cloud/api/v1/admin/amazon/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results),
    }).then(() =>
      console.log("%cĐã đẩy dữ liệu về backend thành công!", "color: #25d366"),
    );
  }
}

scrapeThreadsWithAmz(5);
