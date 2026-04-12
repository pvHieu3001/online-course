let scraperController = new AbortController();

async function scrapeThreadsWithAmz(maxPosts = 10, { signal }) {
  let results = [];
  let processedPosts = new Set();
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
      let currentIsCaptionLink = false;
      let isPopular = true;

      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        if (index === 0) {
          const spans = block.querySelectorAll('span.x1o0tod.x10l6tqk.x13vifvy');
          if (spans.length >= 1) {
            const rawText = spans[0].innerText.trim().toLowerCase();
            if (rawText.endsWith('k')) {
              isPopular = true;
              console.log(`%c🔥 Đạt điều kiện: ${rawText}`, "color: #f1c40f");
            }
          }
          if (!isPopular) continue;
          
          // 1. Tìm Link Amazon
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

          const textSpan = block.querySelector("div.xat24cr.xdj266r span");
          if (textSpan) {
            let content = textSpan.innerText
              .trim()
              .replace(/\d+\s*\/\s*\d+/g, "") // Xóa định dạng 1/2, 2/2
              .replace(/\n\d+$/g, "");

            if (
              content.includes("http") ||
              content.includes("amzn.to") ||
              content.includes("amazon.com")
            ) {
              currentIsCaptionLink = true;
            }

            if (currentAmzUrl && content.includes(currentAmzUrl)) {
              content = content.replace(currentAmzUrl, "").trim();
            }

            currentCaption = content;
          }

          // 3. Tìm Source URL
          const postLinkEl = block.querySelector('a[href*="/post/"]');
          if (postLinkEl) {
            currentSourceUrl = postLinkEl.href.startsWith("http")
              ? postLinkEl.href
              : window.location.origin + postLinkEl.getAttribute("href");
          }
        }

        // --- BƯỚC 2: XỬ LÝ KHỐI TIẾP THEO (INDEX 1) ---
        if (index === 1 && !currentAmzUrl) {
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
        }
      }

      // --- BƯỚC 3: KIỂM TRA VÀ LƯU ---
      const postId = currentSourceUrl || currentCaption;

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
          isCaptionLink: currentIsCaptionLink,
        });

        const logColor = currentAmzUrl ? "#2ecc71" : "#3498db";
        console.log(
          `%c[${currentAmzUrl ? "LINK" : "TEXT"}] ${results.length}: ${currentCaption.substring(0, 30)}... (Link in text: ${currentIsCaptionLink})`,
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
}

scrapeThreadsWithAmz(15, { signal: scraperController.signal });
//scraperController.abort();
