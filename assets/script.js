// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Markdown post loader
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
      if (!res.ok) throw new Error("Post not found.");
      const text = await res.text();
      const markedText = window.marked.parse(text);
      container.innerHTML = markedText;
    } catch (e) {
      container.innerHTML = `<p style="color: red;">${e.message}</p>`;
    }
  }

  // Hamburger menu toggle
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
