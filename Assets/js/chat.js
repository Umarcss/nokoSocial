// Chat Modal Functionality
const chatModal = document.querySelector('.chat-modal');
const closeChat = document.getElementById('close-chat');
const messageInput = document.getElementById('message-input');
const sendBtn = document.querySelector('.send-btn');
const chatMessages = document.querySelector('.chat-messages');
const chatUserName = document.getElementById('chat-user-name');
const chatUserPhoto = document.getElementById('chat-user-photo');
const chatUserStatus = document.getElementById('chat-user-status');
const chatList = document.querySelector('.chat-list');
const chatSearch = document.getElementById('chat-search');
const messagesMenuItem = document.getElementById('messages-notifications');

// Sample messages for demonstration
const sampleMessages = {
    'Eden Quist': [
        { text: "Hey, how are you?", time: "10:30 AM", sent: false },
        { text: "I'm good, thanks! How about you?", time: "10:31 AM", sent: true },
        { text: "Just woke up bruh", time: "10:32 AM", sent: false }
    ],
    'John Foe': [
        { text: "Did you see the new update?", time: "9:15 AM", sent: false },
        { text: "Yes, it looks great!", time: "9:16 AM", sent: true },
        { text: "ok", time: "9:17 AM", sent: false }
    ],
    'Daniella Jackson': [
        { text: "When are you free for a call?", time: "8:45 AM", sent: false },
        { text: "I can do tomorrow afternoon", time: "8:46 AM", sent: true },
        { text: "Perfect, I'll send you a calendar invite", time: "8:47 AM", sent: false }
    ]
};

// Sample users for the chat list
const chatUsers = [
    { name: 'Eden Quist', photo: 'Assets/images/profile-17.jpeg', status: 'online', lastMessage: 'Just woke up bruh' },
    { name: 'John Foe', photo: 'Assets/images/profile-4.jpeg', status: 'online', lastMessage: 'ok' },
    { name: 'Daniella Jackson', photo: 'Assets/images/profile-5.jpeg', status: 'offline', lastMessage: '2 new messages' },
    { name: 'Jullet Markarey', photo: 'Assets/images/profile-6.jpeg', status: 'offline', lastMessage: 'lol u right' },
    { name: 'chantel Msiza', photo: 'Assets/images/profile-7.jpeg', status: 'online', lastMessage: 'Birthday Tomorrow!' }
];

// Open chat modal when clicking on Messages menu item
messagesMenuItem.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    chatModal.classList.add('active');
    // Clear chat space
    clearChatSpace();
});

// Function to clear chat space
function clearChatSpace() {
    chatUserName.textContent = 'Select a chat';
    chatUserPhoto.src = '';
    chatUserStatus.textContent = '';
    chatMessages.innerHTML = '<div class="no-chat-selected"><p>Select a chat to start messaging</p></div>';
    messageInput.disabled = true;
    sendBtn.disabled = true;
}

// Open chat modal when clicking on a message in the sidebar
document.querySelectorAll('.message').forEach(message => {
    message.addEventListener('click', () => {
        const userName = message.querySelector('h5').textContent;
        const userPhoto = message.querySelector('.profile-photo img').src;
        const userStatus = message.querySelector('.active') ? 'Online' : 'Offline';
        
        openChat(userName, userPhoto, userStatus);
        // Enable input and send button
        messageInput.disabled = false;
        sendBtn.disabled = false;
    });
});

// Close chat modal
closeChat.addEventListener('click', () => {
    chatModal.classList.remove('active');
});

// Initialize chat list
function initializeChatList() {
    chatList.innerHTML = '';
    chatUsers.forEach(user => {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-list-item');
        chatItem.innerHTML = `
            <div class="profile-photo">
                <img src="${user.photo}" alt="${user.name}">
                ${user.status === 'online' ? '<div class="active"></div>' : ''}
            </div>
            <div class="user-info">
                <h5>${user.name}</h5>
                <p class="text-muted">${user.lastMessage}</p>
            </div>
        `;
        
        chatItem.addEventListener('click', () => {
            openChat(user.name, user.photo, user.status);
            // Update active state
            document.querySelectorAll('.chat-list-item').forEach(item => item.classList.remove('active'));
            chatItem.classList.add('active');
            // Enable input and send button
            messageInput.disabled = false;
            sendBtn.disabled = false;
        });
        
        chatList.appendChild(chatItem);
    });
}

// Open chat function
function openChat(userName, userPhoto, userStatus) {
    chatUserName.textContent = userName;
    chatUserPhoto.src = userPhoto;
    chatUserStatus.textContent = userStatus;
    chatModal.classList.add('active');
    
    // Load messages
    loadMessages(userName);
}

// Load messages function
function loadMessages(userName) {
    chatMessages.innerHTML = '';
    const messages = sampleMessages[userName] || [];
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.sent ? 'sent' : 'received');
        
        messageElement.innerHTML = `
            <p>${message.text}</p>
            <div class="message-status">
                <span class="time">${message.time}</span>
                ${message.sent ? '<i class="uil uil-check"></i>' : ''}
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message function
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const currentUser = chatUserName.textContent;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Add message to UI
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.innerHTML = `
            <p>${message}</p>
            <div class="message-status">
                <span class="time">${time}</span>
                <i class="uil uil-check"></i>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        messageInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to sample messages
        if (!sampleMessages[currentUser]) {
            sampleMessages[currentUser] = [];
        }
        sampleMessages[currentUser].push({
            text: message,
            time: time,
            sent: true
        });
        
        // Update last message in chat list
        updateLastMessage(currentUser, message);
    }
}

// Update last message in chat list
function updateLastMessage(userName, message) {
    const chatItems = document.querySelectorAll('.chat-list-item');
    chatItems.forEach(item => {
        if (item.querySelector('h5').textContent === userName) {
            item.querySelector('p').textContent = message;
        }
    });
}

// Search functionality
chatSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-list-item');
    
    chatItems.forEach(item => {
        const userName = item.querySelector('h5').textContent.toLowerCase();
        const lastMessage = item.querySelector('p').textContent.toLowerCase();
        
        if (userName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Send message on button click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Close chat when clicking outside
chatModal.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.classList.remove('active');
    }
});

// Initialize chat list when the page loads
initializeChatList(); 