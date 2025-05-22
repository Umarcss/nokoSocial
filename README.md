# nokoSocial - Modern Social Media Platform

nokoSocial is a responsive social media platform built with HTML, CSS, and JavaScript. It provides a modern and intuitive user interface for social networking, featuring real-time interactions, friend management, and content sharing capabilities.

## 📸 Screenshots

### Main Interface
![Main Interface](screenshots/main-interface.png)
*The main dashboard showing the feed, stories, and navigation*

![3](https://github.com/user-attachments/assets/83a3bc02-53bc-428b-8b6c-6a76f8cfe45d)


### Chat System
![Chat Interface](screenshots/chat-interface.png)
*Real-time chat interface with message history*

### Friend Requests
![Friend Requests](screenshots/friend-requests.png)
*Friend request management interface*

### Theme Customization
![Theme Settings](screenshots/theme-settings.png)
*Theme customization panel*

## 🔄 How It Works

### 1. System Architecture

#### Frontend Components
- **Main Layout (`index.html`)**
  - Three-column layout using CSS Grid
  - Left sidebar for navigation
  - Middle section for content feed
  - Right sidebar for messages and friend requests

- **Navigation System**
  ```javascript
  // Navigation handling
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
      item.addEventListener('click', handleNavigation);
  });
  ```

#### State Management
- Local storage for user preferences
- Session management for active user
- Real-time state updates for notifications

### 2. Core Features Implementation

#### Authentication Flow
1. User enters credentials
2. System validates input
3. Creates session
4. Redirects to dashboard

#### Friend Request System
1. User sends friend request
2. System notifies recipient
3. Recipient can accept/decline
4. Both users' friend lists update
5. Notification sent to requester

#### Post Creation Process
1. User clicks "Create Post"
2. Opens post creation modal
3. User adds content (text/images)
4. System processes and publishes
5. Updates feed in real-time

#### Chat System
1. User selects chat recipient
2. Opens chat interface
3. Messages sent in real-time
4. System handles delivery status
5. Updates chat history

### 3. Data Flow

#### User Data
```javascript
const userData = {
    profile: {
        name: String,
        photo: URL,
        bio: String,
        friends: Array
    },
    preferences: {
        theme: String,
        notifications: Boolean,
        privacy: Object
    }
};
```

#### Post Data
```javascript
const postData = {
    content: String,
    author: Object,
    timestamp: Date,
    likes: Number,
    comments: Array,
    media: Array
};
```

#### Chat Data
```javascript
const chatData = {
    participants: Array,
    messages: Array,
    lastMessage: Object,
    unreadCount: Number
};
```

### 4. Real-time Updates

#### WebSocket Implementation
```javascript
// WebSocket connection
const ws = new WebSocket('ws://your-server');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleRealTimeUpdate(data);
};
```

#### Update Types
- New messages
- Friend requests
- Post interactions
- Online status changes

### 5. Theme System

#### Theme Variables
```css
:root {
    --primary-color: hsl(252, 75%, 60%);
    --background-color: hsl(252, 30%, 95%);
    --text-color: hsl(252, 30%, 17%);
}
```

#### Theme Switching
```javascript
function switchTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
```

### 6. Responsive Design Implementation

#### Breakpoint System
```css
/* Desktop */
@media screen and (min-width: 1200px) {
    .container {
        grid-template-columns: 18vw auto 20vw;
    }
}

/* Tablet */
@media screen and (max-width: 992px) {
    .container {
        grid-template-columns: 0 auto 5rem;
    }
}

/* Mobile */
@media screen and (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
```

## 🌟 Features

### 1. User Interface
- Responsive design that works on desktop and mobile devices
- Modern and clean user interface
- Dark/Light theme customization
- Customizable font sizes and color schemes

### 2. Social Features
- **Friend Management**
  - Send and receive friend requests
  - Accept or decline friend requests
  - View mutual friends
  - Real-time friend request notifications

- **Post Creation**
  - Create text posts
  - Share images
  - Add hashtags
  - Like and comment on posts
  - Bookmark posts for later

- **Real-time Chat**
  - Private messaging system
  - Online/offline status indicators
  - Message notifications
  - Search conversations
  - Media sharing in chats

- **Stories**
  - Share temporary stories
  - View friends' stories
  - Story creation interface

### 3. User Experience
- **Notifications**
  - Real-time notification system
  - Friend request notifications
  - Post interaction notifications
  - Message notifications

- **Search Functionality**
  - Search for users
  - Search for posts
  - Search in messages

- **Profile Management**
  - Customizable profile
  - Profile photo upload
  - Bio and personal information
  - Activity tracking

## 🛠️ Technical Implementation

### Frontend Architecture
- **HTML Structure**
  - Semantic HTML5 markup
  - Responsive layout using CSS Grid and Flexbox
  - Modular component structure

- **CSS Features**
  - CSS Variables for theming
  - Responsive design with media queries
  - Custom animations and transitions
  - Modern UI components

- **JavaScript Functionality**
  - Event-driven architecture
  - Real-time updates
  - Dynamic content loading
  - State management

### Key Components

1. **Authentication System**
   - User registration and login
   - Session management
   - Password recovery

2. **Friend Request System**
   ```javascript
   // Friend request handling
   function handleFriendRequest(requestId, action) {
       // API call to backend
       // Update UI
       // Show notifications
   }
   ```

3. **Chat System**
   ```javascript
   // Real-time messaging
   function sendMessage(message) {
       // Send to server
       // Update UI
       // Handle delivery status
   }
   ```

4. **Post Management**
   ```javascript
   // Post creation and interaction
   function createPost(content) {
       // Upload content
       // Update feed
       // Notify followers
   }
   ```

## 📱 Responsive Design

The platform is fully responsive with three main breakpoints:
- Desktop (>1200px)
- Tablet (992px - 1200px)
- Mobile (<992px)

## 🎨 Theme Customization

Users can customize their experience with:
- Font size options
- Color schemes
- Background themes (Light/Dim/Dark)
- UI density

## 🔒 Security Features

- Secure authentication
- Data encryption
- Privacy controls
- Content moderation

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start exploring the features

## 📦 Dependencies

- Unicons Icons
- Google Fonts (Poppins)
- Custom CSS framework

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Dawendoski - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern social media platforms
- Built with best practices in mind
