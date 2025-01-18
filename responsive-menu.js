document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting sidebar initialization');
    
    // Check if required elements exist
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    
    // Log the elements status
    console.log({
        menuToggleExists: !!menuToggle,
        closeSidebarExists: !!closeSidebar,
        sidebarExists: !!sidebar,
        menuToggleId: menuToggle?.id || 'not found',
        closeSidebarId: closeSidebar?.id || 'not found',
        sidebarId: sidebar?.id || 'not found'
    });

    if (menuToggle && closeSidebar && sidebar) {
        console.log('All required elements found - Adding event listeners');
        
        menuToggle.addEventListener('click', (event) => {
            console.log('Menu toggle clicked', {
                sidebarCurrentWidth: sidebar.style.width,
                eventTarget: event.target
            });
            sidebar.style.width = '250px';
        });

        closeSidebar.addEventListener('click', (event) => {
            console.log('Close sidebar clicked', {
                sidebarCurrentWidth: sidebar.style.width,
                eventTarget: event.target
            });
            sidebar.style.width = '0';
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (event) => {
            console.log('Document clicked', {
                clickedElement: event.target.id || event.target.tagName,
                clickedInsideSidebar: sidebar.contains(event.target),
                clickedMenuToggle: event.target === menuToggle,
                sidebarCurrentWidth: sidebar.style.width
            });
            
            if (!sidebar.contains(event.target) && event.target !== menuToggle) {
                console.log('Closing sidebar due to outside click');
                sidebar.style.width = '0';
            }
        });

        // Add error handling for style changes
        try {
            // Test if we can modify the sidebar width
            sidebar.style.width = '0';
            console.log('Successfully set initial sidebar width');
        } catch (error) {
            console.error('Error setting sidebar width:', error);
        }

    } else {
        console.error('Missing required elements:', {
            menuToggle: !menuToggle ? 'Missing menu toggle button' : 'Present',
            closeSidebar: !closeSidebar ? 'Missing close button' : 'Present',
            sidebar: !sidebar ? 'Missing sidebar element' : 'Present'
        });
        
        // Log all elements with similar IDs to help detect typos
        console.log('All elements with similar IDs:', {
            menuToggleLike: document.querySelectorAll('[id*="menu"]'),
            sidebarLike: document.querySelectorAll('[id*="sidebar"]'),
            closeLike: document.querySelectorAll('[id*="close"]')
        });

        // Log the current page URL
        console.log('Current page:', window.location.href);
        
        // Log the current DOM structure
        console.log('Current body structure:', document.body.innerHTML);
    }
});

// Add window error handler
window.addEventListener('error', (event) => {
    console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        error: event.error
    });
});

// Add unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', {
        reason: event.reason
    });
});