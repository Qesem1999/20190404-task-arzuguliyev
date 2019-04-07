// inputs
const manufacturer = document.forms['myForm']['manufacturer'],
      model = document.forms['myForm']['model'],
      release = document.forms['myForm']['release'];

//buttons
const addButton =  document.getElementById('addButton'),
      editButton = document.getElementById('editButton');

// object list
const myObjectList =  document.getElementById('myObjectList');

// form alet
const formAlert =  document.getElementById('formAlert');      

// for validate
const onlyLetter = /^[a-zA-Z]+$/;  
const letterAndNumber =  /^([a-zA-Z0-9 _-]+)$/;
const onlyNumber = /^[0-9]+$/;

// object list Array
const carObjectList = [];



// my local data
let myLocalData;

// date

let nowDate =  new Date();
console.log(nowDate.getFullYear());




// created constructor function
function Car(id, manufacturer, model, release)
{
    this.id = id;
    this.manufacturer = manufacturer;
    this.model = model;
    this.release = release;
}


function validateForm()
{   
    // check input value
    validateEditing(manufacturer, model, release)
    if(validateEditing(manufacturer, model, release) == false)
    {
      return false;   
    }
    else
    {
       
    //   check local storage support  
      if(checkLocalStorage() == true)
      {
        if(carObjectList.length == 0)
         {  //  id is when my list's length is 0 
           var idCounter = 1;
           localStorage.setItem('localIdCounter', idCounter);
        
           // send id number to local Storage wit json
           let localIdCounter = localStorage.getItem('localIdCounter');
           var plusLocalIdCounter = Number(localIdCounter);
        }
        else if(carObjectList.length != 0)
        {  // else: plus 1 to ID
           let localIdCounter = localStorage.getItem('localIdCounter');
           localIdCounter++
            // send id number to local Storage wit json
           localStorage.setItem('localIdCounter', localIdCounter);
           var plusLocalIdCounter = Number(localIdCounter);
           }
         }
         else
            {
             console.log('Sorry, your browser does not support web storage...');
            }       
          
      // created new object
       let newCar = new Car(plusLocalIdCounter, manufacturer.value, model.value, release.value);
    
       // add to object list
       carObjectList.push(newCar);
    
       // send to localStorage with jeson
       localStorage.setItem('myLocalData', JSON.stringify(carObjectList));
    
       //create new list item and append to list
       createNewListItem(newCar)
      
       
    // hided alert and clean input value
       hideAlert();
       cleanInputs();
       return false; 
    }
    

}


  
     

// show alert function
function showAlert(message)
{     formAlert.innerHTML = '';
   let node =  document.createElement('P');
   let textNode = document.createTextNode(message);
       node.appendChild(textNode);
       formAlert.appendChild(node);
       formAlert.classList.remove('d-none');
}

// hide alert function
function hideAlert(){formAlert.classList.add('d-none')};


function cleanInputs()
{
    manufacturer.value = '';
    model.value = '';
    release.value = '';
}


// print local Storage elements
function myLocalDataEelemets()
{
    // get local data from localStorage 
    myLocalData = JSON.parse(localStorage.getItem('myLocalData'));
  
 //if local data not empty, local data elements push to carobject and display it
   if(myLocalData!=null){
        for(let i = 0; i < myLocalData.length; i++)
        {
            carObjectList.push(myLocalData[i]);
        }
        displayList(carObjectList);
   }
};






// display local storage list
function displayList(item)
{

  for(let i = 0; i < item.length; i++)
  {
        // create new li element and add class
     let node = document.createElement('LI');
         node.classList.add('list-group-item');
         node.addEventListener('click', ()=>
         {
            return editLiItem(node);
         }, false);
     
     let textNode =  document.createTextNode(`${item[i].id} ${item[i].manufacturer} ${item[i].model} ${item[i].release} `);
         node.appendChild(textNode);
    
     //create delete icon and add event
     let iconNode =  document.createElement('I');
         iconNode.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger');
         iconNode.addEventListener('click', ()=>
         { return deleteLiItem(iconNode);}, false);
         node.appendChild(iconNode);
        
         myObjectList.appendChild(node);
    } 
}


// create new list item
function createNewListItem(item)
{
    let node = document.createElement('LI');
    node.classList.add('list-group-item');
    node.addEventListener('click', ()=>
    {
       return editLiItem(node);
    }, false);

let textNode =  document.createTextNode(`${item.id} ${item.manufacturer} ${item.model} ${item.release} `);
    node.appendChild(textNode);

let iconNode =  document.createElement('I');
    iconNode.classList.add('fas', 'fa-trash-alt', 'ml-5', 'float-right', 'text-danger');
    iconNode.addEventListener('click', ()=>
    {return deleteLiItem(iconNode);});
    node.appendChild(iconNode);
    myObjectList.appendChild(node);
}


// check local storage
function checkLocalStorage()
{
    if(typeof(Storage) != "undefined")
    {return true;}
    else
    {return false;}
}




// delete function
function deleteLiItem(item)
{   
    // find item's parent element end delete from list
    const parentLi =  item.parentElement;
    const liText  = parentLi.innerText;
    for(let i = 0; i < carObjectList.length; i++)
    {
        if(liText[0] == carObjectList[i].id)
        { 
         // if parrent element's first child equal to object id delete this object from array
            carObjectList.splice(i, 1);
            localStorage.setItem('myLocalData', JSON.stringify(carObjectList));
            myLocalData = JSON.parse(localStorage.getItem('myLocalData'));
            
        }
    }
          parentLi.parentNode.removeChild(parentLi);
        
}







// edit function
function editLiItem(item)
{
    // if item's textnode first element equal to object.id
    // get the object value push to input value
    // display edit button and hide add button
     const liText =  item.innerText;
    for(let i = 0; i < carObjectList.length; i++)
    {    
        if(liText[0] == carObjectList[i].id)
        {

        
          manufacturer.value = carObjectList[i].manufacturer;
          model.value = carObjectList[i].model;
          release.value = carObjectList[i].release;
          item.setAttribute("id", "editing");
          editButton.classList.remove('d-none');
          addButton.classList.add('d-none');
        }
    }

     
}




editButton.addEventListener('click', ()=>
{
    // check input value
    validateEditing(manufacturer, model, release);

     if(validateEditing(manufacturer, model, release)  == false)
     {

     }
     else
     {  
        // find edit item 
        let editingItem = document.getElementById('editing');
        let textNode = editingItem.innerText;
        for(let i = 0; i < carObjectList.length; i++)
        {
           if(textNode[0] == carObjectList[i].id)
           { 
            //   edit item'stext node first element equal to object id 
             // input values equalto this object's informations
              let oldChild =  editingItem.firstChild;
              carObjectList[i].manufacturer = manufacturer.value;
              carObjectList[i].model = model.value;
              carObjectList[i].release = release.value;
              let newChild = document.createTextNode(`${carObjectList[i].id} ${carObjectList[i].manufacturer}  ${carObjectList[i].model} ${carObjectList[i].release}`)
              editingItem.replaceChild(newChild, oldChild);
              localStorage.setItem('myLocalData', JSON.stringify(carObjectList));
              editingItem.removeAttribute('id');
              editButton.classList.add('d-none');
              addButton.classList.remove('d-none');
              
              hideAlert();
              cleanInputs();
           }
            
        
        }
       
     }


  
});







function validateEditing(manufacturer, model, release)
{    

  if(manufacturer.value == '' || model.value =='' || release.value == '')
  {
    showAlert('Inputs cannot be empty!');
    return false;
  } 
  else if(!manufacturer.value.match(manufacturer))
    {
     showAlert('You can use only letter for Manufacturer');
     return false;
    }
    else if(release.value > nowDate.getFullYear() || release.value < 1927)
    {
        showAlert('IVALID YEAR!');
        return false;
    }     
    else if(!model.value.match(letterAndNumber))
    {
        showAlert('You can use  letter or number for Manufacturer');
        return false;
    }
    
   
    else if(!release.value.match(onlyNumber))
    {
         showAlert('You can use only number for release');
         return false;
    }

}



















