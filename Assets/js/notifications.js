// DOM Elements
const markAllReadBtn = document.getElementById('mark-all-read');
const filterSelect = document.getElementById('filter-notifications');
const notificationItems = document.querySelectorAll('.notification-item');

// Mark all notifications as read
markAllReadBtn.addEventListener('click', () => {
    notificationItems.forEach(item => {
        item.classList.remove('unread');
    });
    
    // Update unread count in stats
    updateUnreadCount(0);
    
    // Show success message
    showToast('All notifications marked as read');
});

// Filter notifications
filterSelect.addEventListener('change', (e) => {
    const filter = e.target.value;
    
    notificationItems.forEach(item => {
        const type = item.getAttribute('data-type');
        if (filter === 'all' || filter === type) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Update unread count in stats
function updateUnreadCount(count) {
    const unreadElement = document.querySelector('.stat-item:nth-child(2) p');
    if (unreadElement) {
        unreadElement.textContent = count;
    }
}

// Show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add click event to notification items
notificationItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Don't trigger if clicking on action buttons
        if (e.target.closest('.notification-actions')) {
            return;
        }
        
        // Mark as read
        item.classList.remove('unread');
        
        // Update unread count
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        updateUnreadCount(unreadCount);
    });
});

// Add styles for toast
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--color-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        transform: translateY(100%);
        opacity: 0;
        transition: all 300ms ease;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style); 