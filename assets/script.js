
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("markdown-container");
  if (!container) return;

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
});
