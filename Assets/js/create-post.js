// DOM Elements
const createPostForm = document.querySelector('.create-post');
const createPostInput = document.querySelector('#create-post');
const createPostBtn = document.querySelector('.create-post input[type="submit"]');
const feedsContainer = document.querySelector('.feeds');
const createPostButton = document.querySelector('.btn-create-post');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    setupCreatePost();
    setupExistingPosts();
    setupCreatePostButton();
});

// Setup Create Post
function setupCreatePost() {
    if (!createPostForm) {
        console.error('Create post form not found');
        return;
    }

    console.log('Setting up create post form');
    
    createPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        createNewPost();
    });
}

// Setup Existing Posts
function setupExistingPosts() {
    const existingFeeds = document.querySelectorAll('.feed');
    existingFeeds.forEach(feed => {
        setupPostInteractions(feed);
        
        // Setup comment section
        const commentsSection = feed.querySelector('.comments');
        if (commentsSection) {
            commentsSection.addEventListener('click', () => {
                showCommentSection(feed);
            });
        }
    });
}

// Setup Create Post Button
function setupCreatePostButton() {
    if (createPostButton) {
        createPostButton.addEventListener('click', () => {
            showCreatePostModal();
        });
    } else {
        console.error('Create post button not found');
    }
}

// Show Create Post Modal
function showCreatePostModal() {
    const modal = document.createElement('div');
    modal.className = 'create-post-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Post</h3>
                <span class="close-modal">&times;</span>
            </div>
            <form class="create-post-form">
                <div class="post-input-container">
                    <div class="profile-photo">
                        <img src="Assets/images/profile-1.jpeg" alt="Profile Photo">
                    </div>
                    <textarea placeholder="What's on your mind, Dana?" required></textarea>
                </div>
                <div class="post-options">
                    <div class="image-upload">
                        <label for="post-image">
                            <i class="uil uil-image"></i>
                            <span>Add Photo</span>
                        </label>
                        <input type="file" id="post-image" accept="image/*" hidden>
                    </div>
                </div>
                <div class="image-preview"></div>
                <button type="submit" class="btn btn-primary">Post</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });

    // Handle image upload
    const imageInput = modal.querySelector('#post-image');
    const imagePreview = modal.querySelector('.image-preview');
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `
                    <div class="preview-container">
                        <img src="${e.target.result}" alt="Preview" onload="this.parentElement.style.display='flex'">
                        <button type="button" class="remove-image">&times;</button>
                    </div>
                `;
                
                // Remove image functionality
                const removeBtn = imagePreview.querySelector('.remove-image');
                removeBtn.addEventListener('click', () => {
                    imagePreview.innerHTML = '';
                    imageInput.value = '';
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    const form = modal.querySelector('.create-post-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = form.querySelector('textarea').value.trim();
        const imagePreview = form.querySelector('.image-preview img');
        
        if (!content && !imagePreview) {
            showToast('Please add some text or an image to your post');
            return;
        }

        createNewPost(content, imagePreview ? imagePreview.src : null);
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
}

// Create New Post
function createNewPost(content, imageUrl = null) {
    if (!feedsContainer) {
        console.error('Feeds container not found');
        return;
    }

    // Get current user info
    const currentUser = {
        name: 'Dana',
        image: 'Assets/images/profile-1.jpeg',
        location: 'Just now'
    };

    // Create post data
    const postData = {
        id: Date.now(),
        user: currentUser,
        content: content,
        image: imageUrl,
        likes: 0,
        comments: 0,
        date: new Date().toISOString()
    };

    try {
        // Create post element
        const postElement = createPostElement(postData);

        // Add to feeds container
        if (feedsContainer.firstChild) {
            feedsContainer.insertBefore(postElement, feedsContainer.firstChild);
        } else {
            feedsContainer.appendChild(postElement);
        }

        // Show success message
        showToast('Post created successfully!');
    } catch (error) {
        console.error('Error creating post:', error);
        showToast('Error creating post. Please try again.');
    }
}

// Create Post Element
function createPostElement(post) {
    const div = document.createElement('div');
    div.className = 'feed';
    div.dataset.postId = post.id;

    div.innerHTML = `
        <div class="head">
            <div class="user">
                <div class="profile-photo">
                    <img src="${post.user.image}" alt="${post.user.name}">
                </div>
                <div class="logo">
                    <h3>${post.user.name}</h3>
                    <small>${post.user.location}</small>
                </div>
            </div>
            <span class="edit"><i class="uil uil-ellipsis-h"></i></span>
        </div>
        ${post.content ? `<div class="caption">
            <p>${post.content}</p>
        </div>` : ''}
        ${post.image ? `<div class="photo">
            <img src="${post.image}" alt="Post Image" onload="this.parentElement.style.display='flex'">
        </div>` : ''}
        <div class="action-buttons">
            <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i></span>
                <span><i class="uil uil-comment-dots"></i></span>
                <span><i class="uil uil-share-alt"></i></span>
            </div>
            <div class="bookmark">
                <span><i class="uil uil-bookmark"></i></span>
            </div>
        </div>
        <div class="liked-by">
            <p>Be the first to like this</p>
        </div>
        <div class="comments text-muted">
            <div class="comments-list"></div>
        </div>
    `;

    // Add event listeners
    setupPostInteractions(div);

    return div;
}

// Setup Post Interactions
function setupPostInteractions(postElement) {
    // Like button
    const likeButton = postElement.querySelector('.uil-heart').parentElement;
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('active');
        const likedBy = postElement.querySelector('.liked-by p');
        if (likeButton.classList.contains('active')) {
            likedBy.innerHTML = 'You liked this';
        } else {
            likedBy.innerHTML = 'Be the first to like this';
        }
    });

    // Bookmark button
    const bookmarkButton = postElement.querySelector('.uil-bookmark').parentElement;
    bookmarkButton.addEventListener('click', () => {
        bookmarkButton.classList.toggle('active');
        showToast(bookmarkButton.classList.contains('active') 
            ? 'Post bookmarked' 
            : 'Post removed from bookmarks');
    });

    // Share button
    const shareButton = postElement.querySelector('.uil-share-alt').parentElement;
    shareButton.addEventListener('click', () => {
        sharePost(postElement);
    });

    // Comment button
    const commentButton = postElement.querySelector('.uil-comment-dots').parentElement;
    commentButton.addEventListener('click', () => {
        showCommentSection(postElement);
    });
}

// Share Post
function sharePost(postElement) {
    const content = postElement.querySelector('.caption p').textContent;
    const shareData = {
        title: 'Check out this post',
        text: content,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('Shared successfully!'))
            .catch(() => showToast('Sharing failed'));
    } else {
        // Fallback for desktop
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = content;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showToast('Post content copied to clipboard!');
    }
}

// Show Comment Section
function showCommentSection(postElement) {
    const commentsSection = postElement.querySelector('.comments');
    if (!commentsSection.dataset.expanded) {
        commentsSection.innerHTML = `
            <div class="comment-input">
                <input type="text" placeholder="Write a comment..." class="comment-text-input">
                <button class="btn btn-primary">Post</button>
            </div>
            <div class="comments-list"></div>
        `;
        commentsSection.dataset.expanded = 'true';

        // Add event listener for comment submission
        const commentInput = commentsSection.querySelector('.comment-text-input');
        const commentButton = commentsSection.querySelector('.comment-input button');
        const commentsList = commentsSection.querySelector('.comments-list');

        // Focus the input field
        commentInput.focus();

        commentButton.addEventListener('click', () => {
            addComment(commentInput, commentsList);
        });

        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addComment(commentInput, commentsList);
            }
        });
    } else {
        // Don't collapse the comment section if there are comments
        const commentsList = commentsSection.querySelector('.comments-list');
        if (commentsList && commentsList.children.length > 0) {
            return;
        }
        commentsSection.innerHTML = 'No comments yet';
        delete commentsSection.dataset.expanded;
    }
}

// Add Comment
function addComment(commentInput, commentsList, parentComment = null) {
    const content = commentInput.value.trim();
    if (!content) {
        showToast('Please write something to comment');
        return;
    }

    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <div class="comment-content">
            <div class="comment-user">
                <img src="Assets/images/profile-1.jpeg" alt="User" class="comment-avatar">
                <span class="comment-username">Dana</span>
            </div>
            <p>${content}</p>
            <div class="comment-actions">
                <span class="comment-time">Just now</span>
                <span class="comment-like"><i class="uil uil-heart"></i></span>
                <span class="comment-reply">Reply</span>
            </div>
            <div class="replies-container"></div>
        </div>
    `;

    // Add like functionality to the comment
    const likeButton = commentElement.querySelector('.comment-like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('active');
    });

    // Add reply functionality
    const replyButton = commentElement.querySelector('.comment-reply');
    const repliesContainer = commentElement.querySelector('.replies-container');
    
    replyButton.addEventListener('click', () => {
        if (!repliesContainer.querySelector('.reply-input')) {
            const replyInput = document.createElement('div');
            replyInput.className = 'reply-input';
            replyInput.innerHTML = `
                <input type="text" placeholder="Write a reply...">
                <button class="btn btn-primary">Reply</button>
            `;
            
            const input = replyInput.querySelector('input');
            const button = replyInput.querySelector('button');
            
            button.addEventListener('click', () => {
                addComment(input, repliesContainer, commentElement);
                replyInput.remove();
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addComment(input, repliesContainer, commentElement);
                    replyInput.remove();
                }
            });
            
            repliesContainer.appendChild(replyInput);
            input.focus();
        } else {
            repliesContainer.querySelector('.reply-input').remove();
        }
    });

    // Add the comment to the list
    if (parentComment) {
        // This is a reply
        commentElement.classList.add('reply');
        const parentRepliesContainer = parentComment.querySelector('.replies-container');
        parentRepliesContainer.appendChild(commentElement);
    } else {
        // This is a top-level comment
        commentsList.appendChild(commentElement);
    }

    // Clear the input
    commentInput.value = '';

    // Show success message
    showToast(parentComment ? 'Reply posted successfully!' : 'Comment posted successfully!');
}

// Toast Notification
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