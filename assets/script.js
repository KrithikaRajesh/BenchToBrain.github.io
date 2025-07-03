// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  /* -------------------------
     Markdown post loader
  ------------------------- */
  const container = document.getElementById("markdown-container");
  const url       = new URL(window.location.href);
  const filename  = url.searchParams.get("post");

  if (container) {
    if (!filename) {
      container.innerHTML = "<p>No post selected.</p>";
    } else {
      try {
        const res = await fetch(`../posts/${filename}`);
        if (!res.ok) throw new Error("Post not found.");
        const text       = await res.text();
        const markedText = window.marked.parse(text);
        container.innerHTML = markedText;
      } catch (e) {
        container.innerHTML = `<p style="color:red;">${e.message}</p>`;
      }
    }
  }

  /* -------------------------
     👁️  View‑counter display
  ------------------------- */
  if (filename) {                       // only run on post pages
    const viewSpan   = document.getElementById("counter-value");
    const counterId  = "dc88eafd-88ac-4e89-b4b3-781afe3bd352"; // your Counter.dev ID
    const encodedKey = encodeURIComponent(filename);

    if (viewSpan) {
      try {
        const res   = await fetch(`https://counter.dev/count/${counterId}/${encodedKey}`);
        const data  = await res.json();
        const views = (data && data.count !== undefined) ? data.count : 0;
        viewSpan.textContent = `${views} views`;
      } catch {
        viewSpan.textContent = "views unavailable";
      }
    }
  }

  /* -------------------------
     Hamburger menu toggle
  ------------------------- */
  const toggle = document.getElementById("menu-toggle");
  const menu   = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
