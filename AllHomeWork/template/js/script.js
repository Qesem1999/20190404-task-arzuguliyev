"use strict";
const cartTitle = document.querySelectorAll('.card-title');







function onLoadPage()
{
  transparentLayer();
   mouseOverOut();
}




function transparentLayer()
{
    const coverLayer = document.getElementById('header-cover-layer');

    setTimeout(()=>{
      coverLayer.style.background = 'transparent';
    }, 1500)
}

function mouseOverOut()
{
  for(let i = 0; i < cartTitle.length; i++)
{
    cartTitle[i].addEventListener('mouseover', ()=>{
      let thisImg = cartTitle[i].previousElementSibling;
      thisImg.style.transform = 'scale(1.5, 1.5)';
    });

    cartTitle[i].addEventListener('mouseout', ()=>{
      let thisImg = cartTitle[i].previousElementSibling;
      thisImg.style.transform = 'scale(1, 1)';
    });
}
}
