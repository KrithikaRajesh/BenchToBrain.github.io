
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
  }
});
