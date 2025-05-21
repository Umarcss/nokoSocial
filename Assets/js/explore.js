// DOM Elements
const searchInput = document.querySelector('.search-container input');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const categoryCards = document.querySelectorAll('.category-card');
const trendingCards = document.querySelectorAll('.trending-card');
const suggestedCards = document.querySelectorAll('.suggested-card');
const hashtagCards = document.querySelectorAll('.hashtag-card');

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Search in trending posts
    trendingCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        card.style.display = content.includes(searchTerm) ? 'block' : 'none';
    });

    // Search in suggested users
    suggestedCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        card.style.display = content.includes(searchTerm) ? 'flex' : 'none';
    });

    // Search in hashtags
    hashtagCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        card.style.display = content.includes(searchTerm) ? 'block' : 'none';
    });
});

// Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.textContent.toLowerCase();

        // Show/hide sections based on filter
        if (filter === 'all') {
            trendingCards.forEach(card => card.style.display = 'block');
            suggestedCards.forEach(card => card.style.display = 'flex');
            hashtagCards.forEach(card => card.style.display = 'block');
        } else if (filter === 'posts') {
            trendingCards.forEach(card => card.style.display = 'block');
            suggestedCards.forEach(card => card.style.display = 'none');
            hashtagCards.forEach(card => card.style.display = 'none');
        } else if (filter === 'people') {
            trendingCards.forEach(card => card.style.display = 'none');
            suggestedCards.forEach(card => card.style.display = 'flex');
            hashtagCards.forEach(card => card.style.display = 'none');
        } else if (filter === 'hashtags') {
            trendingCards.forEach(card => card.style.display = 'none');
            suggestedCards.forEach(card => card.style.display = 'none');
            hashtagCards.forEach(card => card.style.display = 'block');
        }
    });
});

// Category Cards
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h3').textContent.toLowerCase();
        
        // Filter content based on category
        trendingCards.forEach(trendingCard => {
            const trendingTag = trendingCard.querySelector('.trending-tag').textContent.toLowerCase();
            trendingCard.style.display = trendingTag.includes(category) ? 'block' : 'none';
        });

        // Update active filter button
        filterButtons.forEach(button => {
            if (button.textContent.toLowerCase() === 'posts') {
                button.click();
            }
        });
    });
});

// Follow Buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const isFollowing = button.textContent === 'Following';
        
        if (isFollowing) {
            button.textContent = 'Follow';
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
        } else {
            button.textContent = 'Following';
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
        }
    });
});

// Infinite Scroll for Trending Posts
let page = 1;
const loadMorePosts = () => {
    // Simulate loading more posts
    const trendingGrid = document.querySelector('.trending-grid');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading more posts...';
    trendingGrid.appendChild(loadingIndicator);

    // Simulate API call delay
    setTimeout(() => {
        loadingIndicator.remove();
        // Add more posts here
        page++;
    }, 1000);
};

// Intersection Observer for infinite scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMorePosts();
        }
    });
}, {
    threshold: 0.5
});

// Observe the last trending card
const lastTrendingCard = document.querySelector('.trending-card:last-child');
if (lastTrendingCard) {
    observer.observe(lastTrendingCard);
}

// Theme Toggler
const themeToggler = document.querySelector('.theme-toggler');
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
}); 