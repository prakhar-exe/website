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
  });
});
