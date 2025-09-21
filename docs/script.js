// Tab switching logic
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    // Remove active from all tabs
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    // Add active to clicked tab
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');

    // Show associated tab content
    document.getElementById(this.dataset.tab).classList.remove('hidden');
    updateSlider();
  });
});

// Dark/Light mode toggle
const modeToggle = document.getElementById('modeToggle');
function setMode(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark');
    modeToggle.textContent = '🌞';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    modeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}
modeToggle.addEventListener('click', () => {
  setMode(document.body.classList.contains('dark') ? 'light' : 'dark');
});
if (localStorage.getItem('theme') === 'dark') setMode('dark');

// Slider logic (reading progress per tab)
function updateSlider() {
  // Find visible tab content
  const visibleTab = Array.from(document.querySelectorAll('.tab-content')).find(tc => !tc.classList.contains('hidden'));
  if (!visibleTab) return;
  // Find slider in this tab
  const slider = visibleTab.querySelector('input[type="range"]');
  if (!slider) return;
  // Listen for scroll events (in main content area)
  const onScroll = () => {
    const scrollTop = visibleTab.scrollTop;
    const scrollHeight = visibleTab.scrollHeight - visibleTab.clientHeight;
    const percent = scrollHeight ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    slider.value = percent;
  };
  // Remove old listeners
  visibleTab.removeEventListener('scroll', visibleTab._onScroll || (()=>{}));
  // Attach new listener
  visibleTab._onScroll = onScroll;
  visibleTab.addEventListener('scroll', onScroll);
  // Reset slider
  slider.value = 0;
  // If content is long, make tab-content scrollable
  visibleTab.style.maxHeight = 'calc(100vh - 200px)';
  visibleTab.style.overflowY = 'auto';
}
updateSlider(); // On load

// Re-setup slider when switching tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', updateSlider);
});

// Update slider on tab content scroll
Array.from(document.querySelectorAll('.tab-content')).forEach(tc => {
  tc.addEventListener('scroll', function() {
    const slider = tc.querySelector('input[type="range"]');
    if (!slider) return;
    const scrollTop = tc.scrollTop;
    const scrollHeight = tc.scrollHeight - tc.clientHeight;
    const percent = scrollHeight ? Math.round((scrollTop / scrollHeight) * 100) : 0;
    slider.value = percent;
  });
});
