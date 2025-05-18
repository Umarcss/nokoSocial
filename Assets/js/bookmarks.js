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
const totalBookmarksElement = document.querySelector('.total-bookmarks');
const totalCollectionsElement = document.querySelector('.total-collections');
const collectionList = document.querySelector('.collection-list');

// State
let currentView = 'grid';
let currentFilter = 'all';
let currentSort = 'newest';
let collections = JSON.parse(localStorage.getItem('collections') || '[]');

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

// Enhanced Stats Data
const statsData = {
    totalBookmarks: 0,
    totalCollections: 0,
    bookmarksByType: {
        posts: 0,
        articles: 0,
        videos: 0,
        images: 0,
        links: 0
    },
    recentActivity: [],
    popularTags: new Map(),
    monthlyStats: new Map()
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize with sample data if no bookmarks exist
    if (!localStorage.getItem('bookmarks')) {
        console.log('Initializing with sample bookmarks');
        localStorage.setItem('bookmarks', JSON.stringify(sampleBookmarks));
    }
    
    // Load bookmarks and update UI
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    console.log('Loaded bookmarks:', bookmarks);
    
    if (bookmarks.length === 0) {
        console.log('No bookmarks found, initializing with sample data');
        localStorage.setItem('bookmarks', JSON.stringify(sampleBookmarks));
    }
    
    loadBookmarks();
    loadCollections();
    setupEventListeners();
    updateStats();
});

// Event Listeners
function setupEventListeners() {
    // View options
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            updateBookmarksView();
        });
    });

    // Filter and sort
    filterSelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        loadBookmarks();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        loadBookmarks();
    });

    // Collection management
    createCollectionBtn.addEventListener('click', showCreateCollectionModal);
    manageCollectionsBtn.addEventListener('click', showManageCollectionsModal);
    closeModalBtn.addEventListener('click', () => collectionModal.classList.remove('show'));

    // Close modal when clicking outside
    collectionModal.addEventListener('click', (e) => {
        if (e.target === collectionModal) {
            collectionModal.classList.remove('show');
        }
    });

    // Add bookmark functionality to posts
    document.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('.bookmark');
        if (bookmarkBtn) {
            const feed = bookmarkBtn.closest('.feed');
            if (feed) {
                toggleBookmark(feed);
            }
        }
    });
}

// Load Bookmarks
function loadBookmarks() {
    console.log('Loading bookmarks...');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    console.log('Bookmarks from storage:', bookmarks);
    
    let filteredBookmarks = filterBookmarks(bookmarks);
    filteredBookmarks = sortBookmarks(filteredBookmarks);
    
    displayBookmarks(filteredBookmarks);
    updateStats();
}

// Filter Bookmarks
function filterBookmarks(bookmarks) {
    if (currentFilter === 'all') return bookmarks;
    
    return bookmarks.filter(bookmark => {
        const type = getBookmarkType(bookmark);
        return type === currentFilter;
    });
}

// Sort Bookmarks
function sortBookmarks(bookmarks) {
    switch (currentSort) {
        case 'newest':
            return bookmarks.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'oldest':
            return bookmarks.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'name':
            return bookmarks.sort((a, b) => a.user.name.localeCompare(b.user.name));
        case 'popular':
            return bookmarks.sort((a, b) => b.likes - a.likes);
        default:
            return bookmarks;
    }
}

// Display Bookmarks
function displayBookmarks(bookmarks) {
    console.log('Displaying bookmarks:', bookmarks);
    if (!bookmarksList) {
        console.error('Bookmarks list element not found');
        return;
    }
    
    bookmarksList.innerHTML = '';
    
    if (bookmarks.length === 0) {
        console.log('No bookmarks to display, showing empty state');
        showEmptyState();
        return;
    }

    bookmarks.forEach(bookmark => {
        const bookmarkElement = createBookmarkElement(bookmark);
        bookmarksList.appendChild(bookmarkElement);
    });
}

// Create Bookmark Element
function createBookmarkElement(bookmark) {
    console.log('Creating bookmark element:', bookmark);
    const div = document.createElement('div');
    div.className = 'bookmark-item';
    div.dataset.id = bookmark.id;
    
    const date = new Date(bookmark.date);
    const formattedDate = formatDate(date);
    
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
                <button class="btn-icon share-bookmark" data-id="${bookmark.id}" title="Share">
                    <i class="uil uil-share-alt"></i>
                </button>
                <button class="btn-icon remove-bookmark" data-id="${bookmark.id}" title="Remove">
                    <i class="uil uil-trash-alt"></i>
                </button>
            </div>
        </div>
        <div class="bookmark-content">
            <p>${bookmark.content}</p>
            <small class="text-muted">${formattedDate}</small>
        </div>
        <div class="bookmark-media">
            <img src="${bookmark.image}" alt="Bookmark content" loading="lazy">
        </div>
        <div class="bookmark-footer">
            <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i> ${bookmark.likes}</span>
                <span><i class="uil uil-comment-dots"></i> ${bookmark.comments}</span>
            </div>
            <div class="collection-select">
                <select class="add-to-collection" data-id="${bookmark.id}">
                    <option value="">Add to collection...</option>
                    ${collections.map(collection => `
                        <option value="${collection.id}">${collection.name}</option>
                    `).join('')}
                </select>
            </div>
        </div>
    `;

    // Add event listeners
    div.querySelector('.remove-bookmark').addEventListener('click', () => removeBookmark(bookmark.id));
    div.querySelector('.add-to-collection').addEventListener('change', (e) => addToCollection(bookmark.id, e.target.value));
    div.querySelector('.share-bookmark').addEventListener('click', () => shareBookmark(bookmark));

    return div;
}

// Format Date
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    
    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than 7 days
    if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show full date
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Toggle Bookmark
function toggleBookmark(feed) {
    const postId = feed.dataset.postId || Date.now();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const isBookmarked = bookmarks.some(b => b.id === postId);
    
    if (isBookmarked) {
        removeBookmark(postId);
    } else {
        const postData = {
            id: postId,
            user: {
                name: feed.querySelector('.logo h3').textContent,
                image: feed.querySelector('.profile-photo img').src,
                location: feed.querySelector('.logo small').textContent
            },
            content: feed.querySelector('.caption p').textContent,
            image: feed.querySelector('.photo img').src,
            likes: parseInt(feed.querySelector('.liked-by p').textContent.match(/\d+/)[0]),
            comments: parseInt(feed.querySelector('.comments').textContent.match(/\d+/)[0]),
            date: new Date().toISOString()
        };
        
        addBookmark(postData);
    }
}

// Add Bookmark
function addBookmark(bookmark) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
    showToast('Post bookmarked successfully');
}

// Remove Bookmark
function removeBookmark(id) {
    if (confirm('Are you sure you want to remove this bookmark?')) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        showToast('Bookmark removed successfully');
        loadBookmarks();
    }
}

// Add to Collection
function addToCollection(bookmarkId, collectionId) {
    if (!collectionId) return;
    
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const collection = collections.find(c => c.id === collectionId);
    
    if (collection) {
        if (!collection.bookmarks) collection.bookmarks = [];
        if (!collection.bookmarks.includes(bookmarkId)) {
            collection.bookmarks.push(bookmarkId);
            localStorage.setItem('collections', JSON.stringify(collections));
            showToast('Added to collection successfully');
        }
    }
}

// Show Empty State
function showEmptyState() {
    bookmarksList.innerHTML = `
        <div class="empty-state">
            <i class="uil uil-bookmark"></i>
            <h3>No Bookmarks Yet</h3>
            <p>Start saving posts you love to your bookmarks!</p>
        </div>
    `;
}

// Update Bookmarks View
function updateBookmarksView() {
    bookmarksList.className = `bookmarks-list ${currentView}-view`;
}

// Helper Functions
function getBookmarkType(bookmark) {
    const imageUrl = bookmark.image.toLowerCase();
    if (imageUrl.includes('video')) return 'videos';
    if (imageUrl.includes('article')) return 'articles';
    if (imageUrl.match(/\.(jpg|jpeg|png|gif)$/)) return 'images';
    return 'posts';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Load Collections
function loadCollections() {
    collectionList.innerHTML = '';
    
    collections.forEach(collection => {
        const div = document.createElement('div');
        div.className = 'collection-item';
        div.innerHTML = `
            <i class="uil uil-folder"></i>
            <span>${collection.name}</span>
            <small>${collection.bookmarks?.length || 0} items</small>
        `;
        collectionList.appendChild(div);
    });
}

// Show Create Collection Modal
function showCreateCollectionModal() {
    const modalBody = collectionModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <form id="create-collection-form">
            <div class="form-group">
                <label for="collection-name">Collection Name</label>
                <input type="text" id="collection-name" required>
            </div>
            <div class="form-group">
                <label for="collection-description">Description (optional)</label>
                <textarea id="collection-description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Collection</button>
        </form>
    `;

    const form = modalBody.querySelector('#create-collection-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#collection-name').value;
        const description = form.querySelector('#collection-description').value;
        
        createCollection(name, description);
        collectionModal.classList.remove('show');
    });

    collectionModal.classList.add('show');
}

// Create Collection
function createCollection(name, description) {
    const collection = {
        id: Date.now().toString(),
        name,
        description,
        bookmarks: []
    };
    
    collections.push(collection);
    localStorage.setItem('collections', JSON.stringify(collections));
    
    showToast('Collection created successfully');
    loadCollections();
    updateStats();
}

// Show Manage Collections Modal
function showManageCollectionsModal() {
    const modalBody = collectionModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="collections-management">
            ${collections.map(collection => `
                <div class="collection-item" data-id="${collection.id}">
                    <div class="collection-info">
                        <i class="uil uil-folder"></i>
                        <span>${collection.name}</span>
                        <small>${collection.bookmarks?.length || 0} items</small>
                    </div>
                    <div class="collection-actions">
                        <button class="btn-icon edit-collection" data-id="${collection.id}">
                            <i class="uil uil-edit"></i>
                        </button>
                        <button class="btn-icon delete-collection" data-id="${collection.id}">
                            <i class="uil uil-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add event listeners for edit and delete
    modalBody.querySelectorAll('.edit-collection').forEach(btn => {
        btn.addEventListener('click', () => editCollection(btn.dataset.id));
    });

    modalBody.querySelectorAll('.delete-collection').forEach(btn => {
        btn.addEventListener('click', () => deleteCollection(btn.dataset.id));
    });

    collectionModal.classList.add('show');
}

// Edit Collection
function editCollection(id) {
    const collection = collections.find(c => c.id === id);
    if (!collection) return;

    const modalBody = collectionModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <form id="edit-collection-form">
            <div class="form-group">
                <label for="collection-name">Collection Name</label>
                <input type="text" id="collection-name" value="${collection.name}" required>
            </div>
            <div class="form-group">
                <label for="collection-description">Description</label>
                <textarea id="collection-description">${collection.description || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
    `;

    const form = modalBody.querySelector('#edit-collection-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('#collection-name').value;
        const description = form.querySelector('#collection-description').value;
        
        collection.name = name;
        collection.description = description;
        localStorage.setItem('collections', JSON.stringify(collections));
        
        showToast('Collection updated successfully');
        collectionModal.classList.remove('show');
        loadCollections();
    });
}

// Delete Collection
function deleteCollection(id) {
    if (confirm('Are you sure you want to delete this collection?')) {
        collections = collections.filter(c => c.id !== id);
        localStorage.setItem('collections', JSON.stringify(collections));
        
        showToast('Collection deleted successfully');
        loadCollections();
        updateStats();
    }
}

// Update Stats
function updateStats() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    
    // Reset stats
    statsData.totalBookmarks = bookmarks.length;
    statsData.totalCollections = collections.length;
    statsData.bookmarksByType = {
        posts: 0,
        articles: 0,
        videos: 0,
        images: 0,
        links: 0
    };
    statsData.popularTags.clear();
    statsData.monthlyStats.clear();
    
    // Calculate stats
    bookmarks.forEach(bookmark => {
        // Count by type
        const type = getBookmarkType(bookmark);
        statsData.bookmarksByType[type]++;
        
        // Track tags
        const tags = bookmark.content.match(/#\w+/g) || [];
        tags.forEach(tag => {
            statsData.popularTags.set(tag, (statsData.popularTags.get(tag) || 0) + 1);
        });
        
        // Track monthly stats
        const date = new Date(bookmark.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        statsData.monthlyStats.set(monthKey, (statsData.monthlyStats.get(monthKey) || 0) + 1);
    });
    
    // Update UI
    updateStatsUI();
}

// Update Stats UI
function updateStatsUI() {
    const statsContainer = document.querySelector('.bookmarks-stats');
    if (!statsContainer) return;
    
    // Calculate trends
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentMonthKey = `${new Date().getFullYear()}-${currentMonth + 1}`;
    const lastMonthKey = `${new Date().getFullYear()}-${lastMonth + 1}`;
    
    const currentMonthCount = statsData.monthlyStats.get(currentMonthKey) || 0;
    const lastMonthCount = statsData.monthlyStats.get(lastMonthKey) || 0;
    const totalTrend = lastMonthCount ? ((currentMonthCount - lastMonthCount) / lastMonthCount * 100).toFixed(1) : 0;
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="uil uil-bookmark"></i>
            </div>
            <div class="stat-info">
                <div class="stat-value">${statsData.totalBookmarks}</div>
                <div class="stat-label">Total Bookmarks</div>
                <div class="stat-trend ${totalTrend >= 0 ? 'positive' : 'negative'}">
                    <i class="uil uil-arrow-${totalTrend >= 0 ? 'up' : 'down'}"></i>
                    <span>${Math.abs(totalTrend)}%</span>
                </div>
            </div>
        </div>
        
        <div class="stat-card">
            <div class="stat-icon">
                <i class="uil uil-folder"></i>
            </div>
            <div class="stat-info">
                <div class="stat-value">${statsData.totalCollections}</div>
                <div class="stat-label">Collections</div>
                <div class="stat-trend positive">
                    <i class="uil uil-arrow-up"></i>
                    <span>${statsData.totalCollections > 0 ? 'Active' : 'New'}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add compact monthly stats
    const monthlyData = Array.from(statsData.monthlyStats.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-6);
    
    const chartContainer = document.createElement('div');
    chartContainer.className = 'monthly-stats';
    chartContainer.innerHTML = `
        <h4>Monthly Activity</h4>
        <div class="chart">
            ${monthlyData.map(([month, count]) => `
                <div class="chart-bar" style="height: ${(count / Math.max(...monthlyData.map(d => d[1]))) * 100}%">
                    <span class="bar-value">${count}</span>
                    <span class="bar-label">${new Date(month).toLocaleString('default', { month: 'short' })}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    statsContainer.appendChild(chartContainer);
    
    // Add compact popular tags
    const popularTags = Array.from(statsData.popularTags.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (popularTags.length > 0) {
        const tagsSection = document.createElement('div');
        tagsSection.className = 'popular-tags';
        tagsSection.innerHTML = `
            <h4>Popular Tags</h4>
            <div class="tags-list">
                ${popularTags.map(([tag, count]) => `
                    <span class="tag">
                        ${tag} <small>${count}</small>
                    </span>
                `).join('')}
            </div>
        `;
        statsContainer.appendChild(tagsSection);
    }
}

// Share Bookmark
function shareBookmark(bookmark) {
    // Create share data
    const shareData = {
        title: `${bookmark.user.name}'s Post`,
        text: bookmark.content,
        url: window.location.href
    };

    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                showToast('Shared successfully!');
            })
            .catch((error) => {
                console.error('Error sharing:', error);
                showShareModal(bookmark);
            });
    } else {
        // Fallback to custom share modal
        showShareModal(bookmark);
    }
}

// Show Share Modal
function showShareModal(bookmark) {
    const modalBody = collectionModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="share-options">
            <h3>Share this post</h3>
            <div class="share-buttons">
                <button class="share-btn facebook" onclick="shareToFacebook('${bookmark.content}')">
                    <i class="uil uil-facebook"></i>
                    Facebook
                </button>
                <button class="share-btn twitter" onclick="shareToTwitter('${bookmark.content}')">
                    <i class="uil uil-twitter"></i>
                    Twitter
                </button>
                <button class="share-btn linkedin" onclick="shareToLinkedIn('${bookmark.content}')">
                    <i class="uil uil-linkedin"></i>
                    LinkedIn
                </button>
                <button class="share-btn copy-link" onclick="copyToClipboard('${window.location.href}')">
                    <i class="uil uil-link"></i>
                    Copy Link
                </button>
            </div>
            <div class="share-preview">
                <img src="${bookmark.image}" alt="Share preview">
                <div class="preview-content">
                    <h4>${bookmark.user.name}</h4>
                    <p>${bookmark.content}</p>
                </div>
            </div>
        </div>
    `;

    collectionModal.classList.add('show');
}

// Social Media Share Functions
function shareToFacebook(content) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showToast('Opening Facebook share...');
}

function shareToTwitter(content) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showToast('Opening Twitter share...');
}

function shareToLinkedIn(content) {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
    showToast('Opening LinkedIn share...');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast('Link copied to clipboard!');
        })
        .catch((error) => {
            console.error('Error copying to clipboard:', error);
            showToast('Failed to copy link');
        });
} 