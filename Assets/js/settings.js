// DOM Elements
const profileUpload = document.getElementById('profile-upload');
const profilePreview = document.getElementById('profile-preview');
const profilePhotoUpload = document.querySelector('.profile-photo-upload');
const displayName = document.getElementById('display-name');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const saveSettingsBtn = document.getElementById('save-settings');
const changePasswordBtn = document.getElementById('change-password');

// Toggle Switches
const privateAccount = document.getElementById('private-account');
const onlineStatus = document.getElementById('online-status');
const allowTagging = document.getElementById('allow-tagging');
const emailNotifications = document.getElementById('email-notifications');
const pushNotifications = document.getElementById('push-notifications');
const newFollowers = document.getElementById('new-followers');

// Password Fields
const currentPassword = document.getElementById('current-password');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');

// Profile Photo Upload
profilePhotoUpload.addEventListener('click', () => {
    profileUpload.click();
});

profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size should be less than 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            profilePreview.src = e.target.result;
            // Update all profile photos in the app
            updateProfilePhotos(e.target.result);
            showToast('Profile photo updated successfully');
        };
        reader.onerror = () => {
            showToast('Error reading the image file', 'error');
        };
        reader.readAsDataURL(file);
    }
});

// Update all profile photos in the app
function updateProfilePhotos(newPhotoUrl) {
    const profilePhotos = document.querySelectorAll('.profile-photo img');
    profilePhotos.forEach(photo => {
        photo.src = newPhotoUrl;
    });
}

// Save Settings
saveSettingsBtn.addEventListener('click', async () => {
    try {
        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        saveSettingsBtn.innerHTML = '<span class="loading-spinner"></span> Saving...';
        saveSettingsBtn.disabled = true;

        // Collect all settings
        const settings = {
            profile: {
                displayName: displayName.value,
                username: username.value,
                bio: bio.value,
                photo: profilePreview.src
            },
            privacy: {
                privateAccount: privateAccount.checked,
                showOnlineStatus: onlineStatus.checked,
                allowTagging: allowTagging.checked
            },
            notifications: {
                email: emailNotifications.checked,
                push: pushNotifications.checked,
                newFollowers: newFollowers.checked
            }
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save to localStorage for demo
        localStorage.setItem('userSettings', JSON.stringify(settings));

        // Show success message
        showToast('Settings saved successfully');
    } catch (error) {
        showToast('Error saving settings', 'error');
    } finally {
        // Reset button state
        saveSettingsBtn.innerHTML = 'Save Changes';
        saveSettingsBtn.disabled = false;
    }
});

// Change Password
changePasswordBtn.addEventListener('click', async () => {
    try {
        // Validate passwords
        if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
            showToast('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            showToast('New passwords do not match', 'error');
            return;
        }

        if (newPassword.value.length < 8) {
            showToast('Password must be at least 8 characters long', 'error');
            return;
        }

        // Show loading state
        changePasswordBtn.innerHTML = '<span class="loading-spinner"></span> Changing...';
        changePasswordBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Clear password fields
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';

        // Show success message
        showToast('Password changed successfully');
    } catch (error) {
        showToast('Error changing password', 'error');
    } finally {
        // Reset button state
        changePasswordBtn.innerHTML = 'Change Password';
        changePasswordBtn.disabled = false;
    }
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
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

// Load saved settings
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load profile settings
        displayName.value = settings.profile.displayName;
        username.value = settings.profile.username;
        bio.value = settings.profile.bio;
        if (settings.profile.photo) {
            profilePreview.src = settings.profile.photo;
            updateProfilePhotos(settings.profile.photo);
        }

        // Load privacy settings
        privateAccount.checked = settings.privacy.privateAccount;
        onlineStatus.checked = settings.privacy.showOnlineStatus;
        allowTagging.checked = settings.privacy.allowTagging;

        // Load notification settings
        emailNotifications.checked = settings.notifications.email;
        pushNotifications.checked = settings.notifications.push;
        newFollowers.checked = settings.notifications.newFollowers;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSettings();
});

// Form Validation
function validateForm() {
    let isValid = true;
    const requiredFields = [displayName, username];

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.parentElement.classList.add('error');
            isValid = false;
        } else {
            field.parentElement.classList.remove('error');
        }
    });

    return isValid;
}

// Add validation to form fields
[displayName, username].forEach(field => {
    field.addEventListener('input', () => {
        if (field.value.trim()) {
            field.parentElement.classList.remove('error');
        }
    });
});

// Add validation to password fields
[newPassword, confirmPassword].forEach(field => {
    field.addEventListener('input', () => {
        if (newPassword.value !== confirmPassword.value) {
            confirmPassword.parentElement.classList.add('error');
        } else {
            confirmPassword.parentElement.classList.remove('error');
        }
    });
}); 