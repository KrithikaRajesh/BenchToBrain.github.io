document.addEventListener("DOMContentLoaded", async () => {
  /* Markdown loader */
  const container = document.getElementById("markdown-container");
  const filename  = new URLSearchParams(window.location.search).get("post");

  if (container) {
    if (!filename) {
      container.innerHTML = "<p>No post selected.</p>";
    } else {
      try {
        const res = await fetch(`../posts/${filename}`);
        if (!res.ok) throw new Error("Post not found.");
        container.innerHTML = marked.parse(await res.text());
      } catch (e) {
        container.innerHTML = `<p style="color:red;">${e.message}</p>`;
      }
    }
  }

  /* Hamburger toggle */
  const toggle = document.getElementById("menu-toggle");
  const menu   = document.getElementById("menu");
  if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("active"));
});
