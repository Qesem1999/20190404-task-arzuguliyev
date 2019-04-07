'use stirct';
const slideContainer = document.getElementById('slide-container');
const slideImages =  document.querySelectorAll('#slide-container img');

// button
const prewButton =  document.getElementById('prewButton');
const nextButton =  document.getElementById('nextButton');



let counter = 1;
// were get slideimage width(762px)
const size = slideImages[0].clientWidth;

// slidecontainer will animate 762px * counter every time
slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px';

nextButton.addEventListener('click', ()=>
{
//   If you press the button quickly, the other starts before an animation ends.
//   If the counter is equal to the last index of our list, we end the animation.
  if(counter >= slideImages.length - 1) return;    
  slideContainer.style.transition = 'transform .5s ease-in-out';
//   when we push next button counter will increase 1 time
  counter++;

  // slidecontainer will animate 762px * counter++ every time                                      
  slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px';
 
});

prewButton.addEventListener('click', ()=>
{   if(counter <= 0) return;
    slideContainer.style.transition = 'transform .5s ease-in-out';
    //   when we push next button counter will decrease  1 time
    counter--;
    // slidecontainer will animate 762px * counter-- every time          
    slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px';
});


slideContainer.addEventListener('transitionend', ()=>
{ 
   // when our img's id equal to lastPhotoClone translate will bi size * slideImages.length - 2;
   // becouse slideImages.length - 2 is our firstclone photo
   if(slideImages[counter].id === 'lastPhotoClone')
   {
      slideContainer.style.transition='none';
      counter = slideImages.length - 2;
      slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px';
   }
   // when our img's id equal to lastPhotoClone translate will bi size * slideImages.length - counter;
   // becouse slideImages.length - counter  is our lastclone photo
   if(slideImages[counter].id === 'firstPhotoclone')
   {
      slideContainer.style.transition='none';
      counter = slideImages.length - counter;
      slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px';
   }


});


