// SIDEBAR
const menuitems = document.querySelectorAll('.menuitem')

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
        if(item.id != 'notifications'){
            document.querySelector('.notification-popup').style.display = 'none';
        }else{
            document.querySelector('.notification-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

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

































