// Friend Request Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Sample friend requests data
    const friendRequests = [
        {
            id: 1,
            name: 'Ruth Lee',
            photo: 'Assets/images/profile-13.jpeg',
            mutualFriends: 2
        },
        {
            id: 2,
            name: 'Judith Mike',
            photo: 'Assets/images/profile-14.jpeg',
            mutualFriends: 12
        },
        {
            id: 3,
            name: 'Hajia Bintu',
            photo: 'Assets/images/profile-16.jpeg',
            mutualFriends: 8
        }
    ];

    // Initialize friend requests
    function initializeFriendRequests() {
        const friendRequestsContainer = document.querySelector('.friend-requests');
        const requestsList = friendRequestsContainer.querySelectorAll('.request');
        
        requestsList.forEach((request, index) => {
            const acceptBtn = request.querySelector('.btn-primary');
            const declineBtn = request.querySelector('.btn:not(.btn-primary)');
            
            // Accept friend request
            acceptBtn.addEventListener('click', () => {
                handleFriendRequest(friendRequests[index].id, 'accept');
                request.remove();
                updateRequestCount();
                showToast('Friend request accepted');
            });
            
            // Decline friend request
            declineBtn.addEventListener('click', () => {
                handleFriendRequest(friendRequests[index].id, 'decline');
                request.remove();
                updateRequestCount();
                showToast('Friend request declined');
            });
        });
    }

    // Handle friend request (accept/decline)
    function handleFriendRequest(requestId, action) {
        // Here you would typically make an API call to your backend
        console.log(`Friend request ${action}ed for ID: ${requestId}`);
        
        // Remove the request from the array
        const index = friendRequests.findIndex(req => req.id === requestId);
        if (index !== -1) {
            friendRequests.splice(index, 1);
        }
    }

    // Update request count in the UI
    function updateRequestCount() {
        const requestCount = document.querySelector('.message-requests');
        const count = friendRequests.length;
        requestCount.textContent = `Request${count > 0 ? `(${count})` : ''}`;
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Initialize friend requests when the page loads
    initializeFriendRequests();
}); 