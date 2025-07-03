document.addEventListener("DOMContentLoaded", async () => {
  // 1️⃣ Load post content
  const container = document.getElementById("markdown-container");
  const filename = new URLSearchParams(window.location.search).get("post");
  if (container) {
    if (!filename) {
      container.innerHTML = "<p>No post selected.</p>";
    } else {
      try {
        const res = await fetch(`../posts/${filename}`);
        if (!res.ok) throw new Error("Post not found.");
        const md = await res.text();
        container.innerHTML = marked.parse(md);
      } catch (e) {
        container.innerHTML = `<p style="color:red;">${e.message}</p>`;
      }
    }
  }

  // 2️⃣ Update view counter
  const span = document.getElementById("counter-value");
  if (span && filename) {
    const counterId = "dc88eafd-88ac-4e89-b4b3-781afe3bd352";
    const key = encodeURIComponent(filename);
    try {
      const r = await fetch(`https://counter.dev/count/${counterId}/${key}`);
      const json = await r.json();
      console.log("Counter.dev response:", json); // debug info
      const count = json.count ?? 0;
      span.textContent = `👁️ ${count} view${count !== 1 ? "s" : ""}`;
    } catch (err) {
      console.error("Counter.dev error:", err);
      span.textContent = "👁️ views unavailable";
    }
  }

  // 3️⃣ Hamburger toggle
  const t = document.getElementById("menu-toggle");
  const m = document.getElementById("menu");
  if (t && m) t.addEventListener("click", () => m.classList.toggle("active"));
});
