document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.style.width = '250px';
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.style.width = '0';
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && event.target !== menuToggle) {
            sidebar.style.width = '0';
        }
    });
});