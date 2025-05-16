// SIDEBAR
const menuitems = document.querySelectorAll(',menuitem')

//remove active class from all menu items
const changeActiveitem = () => {
    menuitems.forEach(item => {
        item.classList.remove('active')
    })
}

menuitems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveitem ();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notification-popup').
            style.display = 'none';
        }else{
            document.querySelector('.notification-popup');
            style.display = 'block';
            document.querySelector('#notifications .; notification-count').style.display =  'none';
            
        }

    })
})


//MESSAGE

const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const messages = messages.querySelectorAll('.message');
const messagesSearch = document.querySelector('#message-search');

// THEME
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg1');
const Bg2 = document.querySelector('.bg2');
const Bg3 = document.querySelector('.bg3');



// ('messages-notifications');
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');

// =========================MESSAGE=================
// searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    // console.log(val);
    messages.forEach(chat => {
        let name = chat.querySelectorAll('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        }else{
            chat.style.display = 'none';
        }
    })
}

// search chat 
messageSearch.addEventListener('keyup', searchMassage);


// highlight messages card when on fullscreenerror

messagesNotification.addEventListener('click', () => {
    messages.style.boxShsadow = '0 0 1rem var (--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShsadow = 'none';
    }, 2000)
})





// THEME/DISPLAY CUSTOMIZATION

// opens modal 
const openThemeModal = () =>  {
    themeModal.style.display = 'grid';
}

// close modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize.theme')){
        themeModal.style.display = 'none';
    }
}

// close modal 
theme.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);





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
            root.style.setProperty(' --sticky-top-left', '5.4rem');
            root.style.setProperty(' --sticky-top-right', '5.4rem');
        }else  if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty(' --sticky-top-left', '5.4rem');
            root.style.setProperty(' --sticky-top-right', '-7rem');
        }else  if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty(' --sticky-top-left', '-2rem');
            root.style.setProperty(' --sticky-top-right', '-17rem');
        }else  if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty(' --sticky-top-left', '-5rem');
            root.style.setProperty(' --sticky-top-right', '-25rem');
        }else  if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty(' --sticky-top-left', '-12rem');
            root.style.setProperty(' --sticky-top-right', '35rem');
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
        let primary;
        // remove active class from colors 
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
            color.classList.add('active');
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

        root.style.setProperty(' --primary-color-hue', primaryHue);
    })
})




// THEME BACKGROUND VALUES
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// changes background color 
const changeBG = () => {
    root.style.setProperty('--light-color-lightness',   lightColorLightness);
    root.style.setProperty('--white-color-lightness',  whiteColorLightness);
    root.style.setProperty(' --dark-color-lightness', darkColorLightness);
}


// change background colors
Bg1.addEventListener('click', () => {
    // add active class 
    Bg1.classList.add('active');
     // remove active class from the others
    Bg2.classList.add('active');
    Bg3.classList.add('active');
    // remove customized changes from local storage 
    window.location.reload();


}); 

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';


    // add active class 
    Bg2.classList.add('active');
        // remove active class from the others
    Bg1.classList.add('active');
    Bg3.classList.add('active');
    changeBG();

});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '%';


    // add active class 
    Bg3.classList.add('active');
        // remove active class from the others
    Bg1.classList.add('active');
    Bg2.classList.add('active');
    changeBG();

})




// END 

































