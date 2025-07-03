// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  /* ---------------- Markdown loader ---------------- */
  const container = document.getElementById("markdown-container");
  const url       = new URL(window.location.href);
  const filename  = url.searchParams.get("post");

  if (container) {
    if (!filename) {
      container.innerHTML = "<p>No post selected.</p>";
    } else {
      try {
        const res  = await fetch(`../posts/${filename}`);
        if (!res.ok) throw new Error("Post not found.");
        container.innerHTML = marked.parse(await res.text());
      } catch (e) {
        container.innerHTML = `<p style="color:red;">${e.message}</p>`;
      }
    }
  }

  /* ---------------- View counter ---------------- */
  const viewSpan  = document.getElementById("counter-value");
  if (viewSpan) {
    const counterId = "dc88eafd-88ac-4e89-b4b3-781afe3bd352"; // <- your ID
   const pageKey = encodeURIComponent(filename);

    try {
      const res   = await fetch(`https://counter.dev/count/${counterId}/${pageKey}`);
      const data  = await res.json();
      const views = (data && data.count !== undefined) ? data.count : 0;
      viewSpan.textContent = `👁️ ${views} view${views !== 1 ? "s" : ""}`;
    } catch {
      viewSpan.textContent = "👁️ views unavailable";
    }
  }

  /* ---------------- Hamburger toggle -------------- */
  const tgl = document.getElementById("menu-toggle");
  const nav = document.getElementById("menu");
  if (tgl && nav) tgl.addEventListener("click", () => nav.classList.toggle("active"));
});
