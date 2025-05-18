// DOM Elements
const bookmarksList = document.querySelector('.bookmarks-list');
const filterSelect = document.querySelector('#filter-bookmarks');
const sortSelect = document.querySelector('#sort-bookmarks');
const searchInput = document.querySelector('#search-bookmarks');
const viewButtons = document.querySelectorAll('.view-options .btn-icon');
const removeBookmarkButtons = document.querySelectorAll('.remove-bookmark');
const createCollectionBtn = document.querySelector('.create-collection');
const manageCollectionsBtn = document.querySelector('#manage-collections');
const collectionModal = document.querySelector('#collection-modal');
const closeModalBtn = document.querySelector('.close-modal');

// Sample Data
const sampleBookmarks = [
    {
        id: 1,
        type: 'posts',
        user: {
            name: 'Lana Rose',
            image: 'Assets/images/profile-2.jpg',
            location: 'Dubai, 15 MINUTES AGO'
        },
        content: 'Check out this amazing sunset view from my balcony! 🌅',
        image: 'Assets/images/feed-1.jpg',
        likes: 283,
        comments: 45,
        date: '2024-03-15T10:30:00'
    },
    {
        id: 2,
        type: 'articles',
        user: {
            name: 'John Doe',
            image: 'Assets/images/profile-3.jpeg',
            location: 'New York, 2 HOURS AGO'
        },
        content: 'The Future of Web Development: Trends to Watch in 2024',
        image: 'Assets/images/feed-2.jpg',
        likes: 156,
        comments: 23,
        date: '2024-03-15T08:15:00'
    },
    {
        id: 3,
        type: 'videos',
        user: {
            name: 'Sarah Wilson',
            image: 'Assets/images/profile-4.jpeg',
            location: 'London, 5 HOURS AGO'
        },
        content: 'How to Master JavaScript in 30 Days - Complete Tutorial',
        image: 'Assets/images/feed-3.jpg',
        likes: 892,
        comments: 167,
        date: '2024-03-14T15:45:00'
    },
    {
        id: 4,
        type: 'images',
        user: {
            name: 'Mike Johnson',
            image: 'Assets/images/profile-5.jpeg',
            location: 'Tokyo, 1 DAY AGO'
        },
        content: 'My photography collection from Japan',
        image: 'Assets/images/feed-4.jpg',
        likes: 445,
        comments: 89,
        date: '2024-03-14T09:20:00'
    },
    {
        id: 5,
        type: 'links',
        user: {
            name: 'Emma Davis',
            image: 'Assets/images/profile-6.jpeg',
            location: 'Paris, 2 DAYS AGO'
        },
        content: '10 Must-Visit Places in Paris - Travel Guide',
        image: 'Assets/images/feed-5.jpg',
        likes: 678,
        comments: 134,
        date: '2024-03-13T14:10:00'
    }
];

const sampleCollections = [
    {
        id: 1,
        name: 'Travel',
        count: 12,
        icon: 'uil-plane'
    },
    {
        id: 2,
        name: 'Inspiration',
        count: 23,
        icon: 'uil-lightbulb'
    },
    {
        id: 3,
        name: 'Work',
        count: 10,
        icon: 'uil-briefcase'
    },
    {
        id: 4,
        name: 'Learning',
        count: 15,
        icon: 'uil-book-open'
    }
];

// Load Bookmarks
function loadBookmarks() {
    // Clear existing bookmarks
    bookmarksList.innerHTML = '';
    
    // Get bookmarks from localStorage or use sample data
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || sampleBookmarks;
    
    if (bookmarks.length === 0) {
        showEmptyState();
        return;
    }

    // Create and append bookmark elements
    bookmarks.forEach(bookmark => {
        const bookmarkElement = createBookmarkElement(bookmark);
        bookmarksList.appendChild(bookmarkElement);
    });

    // Update stats
    updateStats();
}

// Create Bookmark Element
function createBookmarkElement(bookmark) {
    const div = document.createElement('div');
    div.className = 'bookmark-item';
    div.dataset.type = bookmark.type;
    div.dataset.id = bookmark.id;

    div.innerHTML = `
        <div class="bookmark-header">
            <div class="user-info">
                <div class="profile-photo">
                    <img src="${bookmark.user.image}" alt="${bookmark.user.name}">
                </div>
                <div class="user-details">
                    <h4>${bookmark.user.name}</h4>
                    <small class="text-muted">${bookmark.user.location}</small>
                </div>
            </div>
            <div class="bookmark-actions">
                <button class="btn-icon remove-bookmark" title="Remove Bookmark">
                    <i class="uil uil-bookmark-slash"></i>
                </button>
            </div>
        </div>
        <div class="bookmark-content">
            <p>${bookmark.content}</p>
            <div class="bookmark-media">
                <img src="${bookmark.image}" alt="Bookmark Media">
            </div>
        </div>
        <div class="bookmark-footer">
            <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i> ${bookmark.likes}</span>
                <span><i class="uil uil-comment-dots"></i> ${bookmark.comments}</span>
                <span><i class="uil uil-share"></i> Share</span>
            </div>
        </div>
    `;

    // Add remove bookmark functionality
    const removeBtn = div.querySelector('.remove-bookmark');
    removeBtn.addEventListener('click', () => removeBookmark(bookmark.id));

    return div;
}

// Show Empty State
function showEmptyState() {
    bookmarksList.innerHTML = `
        <div class="empty-state">
            <i class="uil uil-bookmark"></i>
            <h3>No Bookmarks Yet</h3>
            <p>Start saving posts, articles, and more to your bookmarks!</p>
        </div>
    `;
}

// Remove Bookmark
function removeBookmark(id) {
    const bookmark = document.querySelector(`.bookmark-item[data-id="${id}"]`);
    if (bookmark) {
        // Add fade-out animation
        bookmark.style.opacity = '0';
        bookmark.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            bookmark.remove();
            
            // Update localStorage
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || sampleBookmarks;
            const updatedBookmarks = bookmarks.filter(b => b.id !== id);
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            
            // Update stats
            updateStats();
            
            // Show toast
            showToast('Bookmark removed successfully');
            
            // Show empty state if no bookmarks left
            if (updatedBookmarks.length === 0) {
                showEmptyState();
            }
        }, 300);
    }
}

// Update Stats
function updateStats() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || sampleBookmarks;
    const collections = JSON.parse(localStorage.getItem('collections')) || sampleCollections;
    
    document.querySelector('.total-bookmarks').textContent = bookmarks.length;
    document.querySelector('.total-collections').textContent = collections.length;
}

// Search Bookmarks
function searchBookmarks(query) {
    const bookmarks = document.querySelectorAll('.bookmark-item');
    query = query.toLowerCase();
    
    bookmarks.forEach(bookmark => {
        const content = bookmark.querySelector('.bookmark-content p').textContent.toLowerCase();
        const username = bookmark.querySelector('.user-details h4').textContent.toLowerCase();
        
        if (content.includes(query) || username.includes(query)) {
            bookmark.style.display = '';
        } else {
            bookmark.style.display = 'none';
        }
    });
}

// Filter Bookmarks
function filterBookmarks(type) {
    const bookmarks = document.querySelectorAll('.bookmark-item');
    
    bookmarks.forEach(bookmark => {
        if (type === 'all' || bookmark.dataset.type === type) {
            bookmark.style.display = '';
        } else {
            bookmark.style.display = 'none';
        }
    });
}

// Sort Bookmarks
function sortBookmarks(criteria) {
    const bookmarks = Array.from(document.querySelectorAll('.bookmark-item'));
    const bookmarksList = document.querySelector('.bookmarks-list');
    
    bookmarks.sort((a, b) => {
        switch (criteria) {
            case 'newest':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            case 'oldest':
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            case 'name':
                return a.querySelector('.user-details h4').textContent.localeCompare(
                    b.querySelector('.user-details h4').textContent
                );
            case 'popular':
                return parseInt(b.dataset.likes) - parseInt(a.dataset.likes);
            default:
                return 0;
        }
    });
    
    bookmarks.forEach(bookmark => bookmarksList.appendChild(bookmark));
}

// Create Collection
function createCollection() {
    const name = prompt('Enter collection name:');
    if (name) {
        const collections = JSON.parse(localStorage.getItem('collections')) || sampleCollections;
        const newCollection = {
            id: Date.now(),
            name,
            count: 0,
            icon: 'uil-folder'
        };
        
        collections.push(newCollection);
        localStorage.setItem('collections', JSON.stringify(collections));
        
        // Update UI
        const collectionList = document.querySelector('.collection-list');
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-item';
        collectionElement.innerHTML = `
            <i class="uil ${newCollection.icon}"></i>
            <span>${newCollection.name}</span>
            <small>0 items</small>
        `;
        collectionList.appendChild(collectionElement);
        
        // Update stats
        updateStats();
        showToast('Collection created successfully');
    }
}

// Show Toast
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadBookmarks();
    
    // Search
    searchInput.addEventListener('input', (e) => searchBookmarks(e.target.value));
    
    // Filter
    filterSelect.addEventListener('change', (e) => filterBookmarks(e.target.value));
    
    // Sort
    sortSelect.addEventListener('change', (e) => sortBookmarks(e.target.value));
    
    // View Toggle
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const view = button.dataset.view;
            bookmarksList.className = `bookmarks-list ${view}-view`;
        });
    });
    
    // Create Collection
    createCollectionBtn.addEventListener('click', createCollection);
    
    // Manage Collections Modal
    manageCollectionsBtn.addEventListener('click', () => {
        collectionModal.classList.add('show');
    });
    
    closeModalBtn.addEventListener('click', () => {
        collectionModal.classList.remove('show');
    });
    
    // Close modal when clicking outside
    collectionModal.addEventListener('click', (e) => {
        if (e.target === collectionModal) {
            collectionModal.classList.remove('show');
        }
    });
}); 