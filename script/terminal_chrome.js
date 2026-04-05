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
        // --- BƯỚC 1: TÌM LINK AMZ Ở INDEX 0 ---
        if (index === 0) {
          // Tìm link Amazon ngay trong khối đầu tiên
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

          // Vẫn lấy Caption ở index 0
          const textSpan = block.querySelector("div.xat24cr.xdj266r span");
          if (textSpan) {
            let content = textSpan.innerText
              .trim()
              .replace(/\d+\s*\/\s*\d+/g, "")
              .replace(/\n\d+$/g, "");

            // Nếu link nằm trong text của index 0, xóa nó đi để caption sạch
            if (currentAmzUrl && content.includes(currentAmzUrl)) {
              content = content.replace(currentAmzUrl, "").trim();
            }

            if (!content.includes("http")) {
              currentCaption = content;
            }
          }

          // Tìm Source URL (luôn lấy để làm ID)
          const postLinkEl = block.querySelector('a[href*="/post/"]');
          if (postLinkEl) {
            currentSourceUrl = postLinkEl.href.startsWith("http")
              ? postLinkEl.href
              : window.location.origin + postLinkEl.getAttribute("href");
          }
        }

        // --- BƯỚC 2: XỬ LÝ INDEX 1 ---
        if (index === 1) {
          // Nếu index 0 CHƯA có link, mới tìm link ở index 1
          if (!currentAmzUrl) {
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
          } else {
            const redundantLink = block.querySelector(
              `a[href*="${currentAmzUrl.split(".to/")[1] || "amazon.com"}"]`,
            );
            if (redundantLink) {
              redundantLink.remove(); // Xóa element chứa link thừa ở index 1
            }
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
