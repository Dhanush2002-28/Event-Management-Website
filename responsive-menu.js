document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && closeSidebar && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.style.width = '250px';
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.style.width = '0';
        });

        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && event.target !== menuToggle) {
                sidebar.style.width = '0';
            }
        });
    }
});