// Markdown post loader
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("markdown-container");
  if (container) {
    const url = new URL(window.location.href);
    const filename = url.searchParams.get("post");
    if (!filename) {
      container.innerHTML = "<p>No post selected.</p>";
      return;
    }

    try {
      const res = await fetch(`../posts/${filename}`);
      const text = await res.text();
      const markedText = window.marked.parse(text);
      container.innerHTML = markedText;
    } catch (e) {
      container.innerHTML = "<p>Error loading post.</p>";
    }
  }

  // ✅ Hamburger menu toggle
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
