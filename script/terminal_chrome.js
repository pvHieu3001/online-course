let scraperController = new AbortController();

async function scrapeThreadsWithAmz(maxPosts = 10, { signal }) {
  let results = [];
  let processedPosts = new Set(); // Dùng Set để lưu Source URL hoặc Caption tránh trùng
  const threadId =
    window.location.pathname.split("/")[1]?.replace("@", "") || "user";

  signal.addEventListener("abort", () => {
    console.log(
      "%c🛑 ĐÃ DỪNG! Kết quả hiện tại:",
      "color: red; font-weight: bold;",
    );
    console.table(results);
  });

  while (results.length < maxPosts) {
    if (signal.aborted) return;

    // Quét các cụm bài viết dựa trên thuộc tính data-virtualized từ ảnh bạn cung cấp
    const parentContainers = document.querySelectorAll("div[data-virtualized]");

    for (const parent of parentContainers) {
      if (signal.aborted) break;

      const blocks = Array.from(
        parent.querySelectorAll("div[data-pressable-container]"),
      );
      if (blocks.length === 0) continue;

      let currentCaption = "";
      let currentAmzUrl = "";
      let currentSourceUrl = "";

      blocks.forEach((block, index) => {
        if (index == 0) {
          // 3. Tìm Caption
          const spans = Array.from(
            block.querySelectorAll("div.xat24cr.xdj266r span"),
          );
          // Tìm span chứa nội dung text (loại bỏ span chứa link hoặc span quá ngắn)
          const textSpan = spans[0];
          if (textSpan) {
            const content = textSpan.innerText
              .trim()
              .replace(/\d+\s*\/\s*\d+/g, "") // Xóa 1/10...
              .replace(/\n\d+$/g, "");

            // Chỉ lấy caption nếu nó không phải là URL
            if (
              !content.includes("http") &&
              content.length > currentCaption.length
            ) {
              currentCaption = content;
            }
          }
        }

        if (index == 1) {
          // 1. Tìm link Amazon (nếu có)
          const amzLinkEl = block.querySelector(
            'a[href*="amzn.to"], a[href*="amazon.com"]',
          );
          if (amzLinkEl) {
            const rawHref = amzLinkEl.href;
            try {
              const u = new URL(rawHref).searchParams.get("u");
              currentAmzUrl = u
                ? decodeURIComponent(u).split("?")[0]
                : rawHref.split("?")[0];
            } catch (e) {
              currentAmzUrl = rawHref.split("?")[0];
            }
          }

          // 2. Tìm Source URL của bài post (Dùng làm ID định danh bài viết)
          const postLinkEl = block.querySelector('a[href*="/post/"]');
          if (postLinkEl) {
            currentSourceUrl = postLinkEl.href.startsWith("http")
              ? postLinkEl.href
              : window.location.origin + postLinkEl.getAttribute("href");
          }
        }
      });

      // ID định danh để check trùng: Ưu tiên SourceUrl, nếu không có thì dùng Caption
      const postId = currentSourceUrl || currentCaption;

      // ĐIỀU KIỆN LƯU: Chỉ cần có Caption HOẶC có Amazon URL
      if (
        postId &&
        (currentCaption || currentAmzUrl) &&
        !processedPosts.has(postId)
      ) {
        processedPosts.add(postId);

        results.push({
          caption: currentCaption || "",
          amzUrl: currentAmzUrl || "",
          sourceUrl: currentSourceUrl || "",
        });

        const logColor = currentAmzUrl ? "#2ecc71" : "#3498db"; // Xanh lá nếu có link, xanh dương nếu không
        console.log(
          `%c[${currentAmzUrl ? "LINK" : "TEXT"}] ${results.length}: ${currentCaption.substring(0, 30)}...`,
          `color: ${logColor}`,
        );
      }

      if (results.length >= maxPosts) break;
    }

    if (results.length >= maxPosts || signal.aborted) break;

    window.scrollBy(0, window.innerHeight * 1.5);
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
  }

  if (!signal.aborted) {
    console.log("%c✅ HOÀN THÀNH!", "color: #2ecc71; font-weight: bold;");
    console.table(results);
  }

  // if (results.length > 0) {
  //   const apiUrl = `http://srv947597.hstgr.cloud/api/v1/amazon/collect?threadId=${threadId}`;
  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(results),
  //   })
  //     .then((res) => res.text())
  //     .then((msg) =>
  //       console.log(`%c[Backend] ${msg}`, "color: #25d366; font-weight: bold;"),
  //     )
  //     .catch((err) => console.error("❌ Lỗi gửi Backend:", err));
  // }
}

scrapeThreadsWithAmz(15, { signal: scraperController.signal });
//scraperController.abort();
