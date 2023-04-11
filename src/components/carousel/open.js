/* 
Name: ShakurSliders
Author: Abdul Shakur Abbas Sakhr (Algomaster)
Date: 23 04 2022
license: MIT
copyright all rights reserved
NOTE: Credit this author for use of this library.
*/

let changeSlide = (activeSlide,nextSlideIndex,slideContainer,isReverse = false) => {
    let slides = Array.from(slideContainer.querySelectorAll('.content .slide'));
    let slidesNav = Array.from(slideContainer.querySelectorAll('.slide-nav span'));

    ['active','active-reverse','initiateSlide'].forEach(c=>{
        if(activeSlide.classList.contains(c)){
            activeSlide.classList.remove(c);
        }
    });

    ['hide-reverse','hide'].forEach(c=>{
        if(slides[nextSlideIndex].classList.contains(c)){
            slides[nextSlideIndex].classList.remove(c);
        }
    });

    if(isReverse){
        activeSlide.classList.add('hide-reverse');
        slides[nextSlideIndex].classList.add('active-reverse');
    }else{
        activeSlide.classList.add('hide');
        slides[nextSlideIndex].classList.add('active');
    }

    slidesNav[nextSlideIndex].style.backgroundColor = shakurSliderConfig.activeTabIndicator;
    slidesNav.filter((sn,i)=>{
        return i !== nextSlideIndex;
    }).forEach(sNav=>{
        sNav.style.backgroundColor = '#00000050';
    });
}

const initiateSlider = (target) => {
    Array(target).forEach(slideContainer=>{
        let leftArrowBtn = slideContainer.querySelector('.icon.left');
        let rightArrowBtn = slideContainer.querySelector('.icon.right');
        let nextSlideIndex = 0;

        setInterval(function(){
            let slides = Array.from(slideContainer.querySelectorAll('.content .slide'));

            let activeSlide = slides[nextSlideIndex];
            nextSlideIndex = slides.length -  1 === nextSlideIndex ? 0 : nextSlideIndex + 1;

            changeSlide(activeSlide,nextSlideIndex,slideContainer);
        },shakurSliderConfig.delay);

        [leftArrowBtn,rightArrowBtn].forEach(btn=>{
            let slides = Array.from(slideContainer.querySelectorAll('.content .slide'));

            btn.addEventListener('click',e=>{
                let actionIndex;
                if(e.target.classList.contains('left')){
                    actionIndex = -1;
                }
                if(e.target.classList.contains('right')){
                    actionIndex = 1;
                }

                let activeSlide = slides[nextSlideIndex];
                if(slides.length - 1 === nextSlideIndex && actionIndex > 0){
                    nextSlideIndex = 0;
                }else if(nextSlideIndex === 0 && actionIndex < 0){
                    nextSlideIndex = slides.length - 1;
                }else{
                    nextSlideIndex = nextSlideIndex + (actionIndex);
                }

                if(actionIndex > 0){
                    changeSlide(activeSlide,nextSlideIndex,slideContainer);
                }else{
                    changeSlide(activeSlide,nextSlideIndex,slideContainer,true);
                }
            });
        })
    });
}


const shakurSliderRenderer = (config) => {
    let {data,target,navType} = config;

    buildArrowBtns(target);
    buildSlideContent(target,data);
    buildSlideNavigation(target,data.length,navType);
}


let createSlideNav = () => {
    return document.createElement('span');
}

let createSlide = (index,data) => {
    let {bannerSrc,title,desc} = data;
    let slideContainer = document.createElement('div');
    slideContainer.classList = "slide";
    
    let slideBannerContainer = document.createElement('div');
    slideBannerContainer.classList = "img";
    let slideBanner = document.createElement('img');
    slideBanner.setAttribute('src',bannerSrc);
    slideBanner.setAttribute('alt','shakur slides ' + index);
    slideBannerContainer.appendChild(slideBanner);
    slideContainer.appendChild(slideBannerContainer);

    let slideInfoContainer = document.createElement('div');
    slideInfoContainer.classList = "text";
    let slideInfoHeader = document.createElement('h1');
    slideInfoHeader.textContent = title;
    slideInfoContainer.appendChild(slideInfoHeader);
    let slideInfoDesc = document.createElement('p');
    slideInfoDesc.textContent = desc;
    slideInfoContainer.appendChild(slideInfoDesc);
    slideContainer.appendChild(slideInfoContainer);

    return slideContainer;
}

let buildArrowBtns = (parent) => {
    ['left','right'].forEach(side=>{
        let iconContainer = document.createElement('div');
        iconContainer.classList = "icon " + side;
        let icon = document.createElement('i');
        icon.classList = "bx bx-" + side + "-arrow-alt";
        iconContainer.appendChild(icon);
        parent.appendChild(iconContainer);
    });
}

let buildSlideNavigation = (parent,number,type) => {
    let slideNavContainer = document.createElement('div');
    slideNavContainer.classList = "slide-nav";

    if(type === 'box'){
        slideNavContainer.classList.add('box');
    }else if(type === 'disc'){
        slideNavContainer.classList.add('disc');
    }

    for(let i = 1; i <= number; i++){
        let slideNav = createSlideNav();
        slideNavContainer.appendChild(slideNav);
    }
    parent.appendChild(slideNavContainer);
}

let buildSlideContent = (parent,data) => {
    let slideContentContainer = document.createElement('div');
    slideContentContainer.classList = "content";

    data.forEach((d,i)=>{
        let slide = createSlide(i,d);
        slideContentContainer.appendChild(slide);
    });

    parent.appendChild(slideContentContainer);
}

function generateRandomData(){
            let data = [];

            for(let i = 1; i <= 10; i++){
                data.push({
                    bannerSrc: `https://source.unsplash.com/random?sig=${i}`,
                    title: 'slide title ' + i,
                    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia architecto perspiciatis praesentium quam sint atque sapiente ipsa distinctio reiciendis! Recusandae eum laboriosam explicabo quod voluptatibus dolorem sed hic nam doloribus?',
                });
            }
            return data;
        }
        
        const shakurSliderConfig = {
            delay: 3000,
            activeTabIndicator: 'deeppink'
        }

        
            let shakurSliderRendererConfig = {
                target: document.querySelector('.shakur-slider'),
                navType: 'disc',
                data: generateRandomData(),
            }

            shakurSliderRenderer(shakurSliderRendererConfig);
            initiateSlider(shakurSliderRendererConfig.target);
