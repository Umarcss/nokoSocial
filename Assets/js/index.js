// SIDEBAR
const menuitems = document.querySelectorAll('.menu-item')

//remove active class from all menu items
const changeActiveitem = () => {
    menuitems.forEach(item => {
        item.classList.remove('active')
    })
}

menuitems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveitem();
        item.classList.add('active');
        
        // Handle notifications popup
        const notificationsPopup = document.querySelector('.notifications-popup');
        if (item.id === 'notifications') {
            notificationsPopup.style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        } else {
            notificationsPopup.style.display = 'none';
        }
    })
})

// Close notification popup when clicking outside
document.addEventListener('click', (e) => {
    const notificationsPopup = document.querySelector('.notifications-popup');
    const notificationsButton = document.querySelector('#notifications');
    
    if (!notificationsButton.contains(e.target) && !notificationsPopup.contains(e.target)) {
        notificationsPopup.style.display = 'none';
    }
});

// Add "See All" button to notifications popup
const notificationsPopup = document.querySelector('.notifications-popup');
if (notificationsPopup) {
    const seeAllButton = document.createElement('a');
    seeAllButton.href = 'notifications.html';
    seeAllButton.className = 'btn see-all-btn';
    seeAllButton.innerHTML = '<i class="uil uil-arrow-right"></i> See All Notifications';
    notificationsPopup.appendChild(seeAllButton);
}

// Add styles for notifications popup
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notifications-popup {
        position: absolute;
        top: 100%;
        left: 0;
        width: 30rem;
        background: var(--color-white);
        border-radius: var(--card-border-radius);
        padding: 1.5rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: none;
        transition: all 300ms ease;
        max-height: calc(100vh - 7rem);
        overflow-y: auto;
    }

    .notifications-popup::before {
        content: "";
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        background: var(--color-white);
        position: absolute;
        left: 50%;
        top: -0.6rem;
        transform: translateX(-50%) rotate(45deg);
        box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.05);
    }

    .notifications-popup > div {
        display: flex;
        align-items: start;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 300ms ease;
    }

    .notifications-popup > div:hover {
        background: var(--color-light);
    }

    .notifications-popup .profile-photo {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--color-primary);
    }

    .notifications-popup .notification-body {
        flex: 1;
        line-height: 1.4;
    }

    .notifications-popup .notification-body b {
        color: var(--color-dark);
        font-weight: 600;
    }

    .notifications-popup .notification-body small {
        display: block;
        margin-top: 0.3rem;
        color: var(--color-gray);
        font-size: 0.8rem;
    }

    .notifications-popup .see-all-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        margin-top: 1rem;
        padding: 0.8rem;
        font-weight: 500;
        transition: all 300ms ease;
        color: var(--color-primary);
    }

    .notifications-popup .see-all-btn:hover {
        transform: translateX(5px);
    }

    .notifications-popup .see-all-btn i {
        transition: all 300ms ease;
    }

    .notifications-popup .see-all-btn:hover i {
        transform: translateX(3px);
    }
`;
document.head.appendChild(notificationStyles);

// MESSAGE
const messagesNotification = document.querySelector('#messages-notifications');
const messagesContainer = document.querySelector('.messages');
const messageElements = messagesContainer.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

// THEME
const themeMenu = document.querySelector('#theme-menu');
const themeModal = document.querySelector('.customize-theme');
const closeBtn = document.querySelector('.close-btn');
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg1');
const Bg2 = document.querySelector('.bg2');
const Bg3 = document.querySelector('.bg3');

// searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    messageElements.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        }else{
            chat.style.display = 'none';
        }
    })
}

// search chat 
messageSearch.addEventListener('keyup', searchMessage);

// highlight messages card when on fullscreen
messagesNotification.addEventListener('click', () => {
    messagesContainer.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messagesContainer.style.boxShadow = 'none';
    }, 2000)
})

// THEME/DISPLAY CUSTOMIZATION

// opens modal 
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme') || e.target.closest('.close-btn')){
        themeModal.style.display = 'none';
    }
}

// Event listeners for theme modal
themeMenu.addEventListener('click', openThemeModal);
themeModal.addEventListener('click', closeThemeModal);

// ===================== FONT ======================

// remove active class from spans or font size selectors 
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {
   size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
    
        if(size.classList.contains('font-size-1')){
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        }else if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        }else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        }else if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        }else if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-12rem');
            root.style.setProperty('--sticky-top-right', '35rem');
        }

        // changes font size of the root html element 
        document.querySelector('html').style.fontSize = fontSize;
    })
})

// remove active class from colors 
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// CHANGE PRIMARY COLORS
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primaryHue;
        // remove active class from colors 
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

// THEME BACKGROUND VALUES
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// changes background color 
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

// change background colors
Bg1.addEventListener('click', () => {
    // Set light theme values
    lightColorLightness = '95%';
    whiteColorLightness = '100%';
    darkColorLightness = '17%';
    
    // add active class 
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    
    changeBG();
}); 

Bg2.addEventListener('click', () => {
    // Set dim theme values
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class 
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    
    changeBG();
});

Bg3.addEventListener('click', () => {
    // Set dark theme values
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class 
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    
    changeBG();
});

// END 

// Bookmark functionality
const bookmarkButtons = document.querySelectorAll('.bookmark');
bookmarkButtons.forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        const feed = button.closest('.feed');
        const postData = {
            id: feed.dataset.postId || Date.now(),
            user: {
                name: feed.querySelector('.logo h3').textContent,
                image: feed.querySelector('.profile-photo img').src,
                location: feed.querySelector('.logo small').textContent
            },
            content: feed.querySelector('.caption p').textContent,
            image: feed.querySelector('.photo img').src,
            likes: feed.querySelector('.liked-by p').textContent,
            comments: feed.querySelector('.comments').textContent
        };

        if (icon.classList.contains('uil-bookmark')) {
            // Add bookmark
            icon.classList.remove('uil-bookmark');
            icon.classList.add('uil-bookmark-full');
            
            // Store in localStorage
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            bookmarks.push(postData);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            
            showToast('Post bookmarked successfully');
        } else {
            // Remove bookmark
            icon.classList.remove('uil-bookmark-full');
            icon.classList.add('uil-bookmark');
            
            // Remove from localStorage
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== postData.id);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            
            showToast('Bookmark removed');
        }
    });
});

// Initialize bookmarks
document.addEventListener('DOMContentLoaded', () => {
    // Check if posts are already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarkButtons.forEach(button => {
        const feed = button.closest('.feed');
        const postId = feed.dataset.postId || Date.now();
        const isBookmarked = bookmarks.some(bookmark => bookmark.id === postId);
        
        if (isBookmarked) {
            const icon = button.querySelector('i');
            icon.classList.remove('uil-bookmark');
            icon.classList.add('uil-bookmark-full');
        }
    });
});

// Toast Notification
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
            toast.remove();
        }, 300);
    }, 3000);
}

// Add toast styles
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
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 300ms ease;
        z-index: 1000;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);

































