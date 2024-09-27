let form= document.querySelector(".form-wrapper");
let submitBtn=document.querySelector(".submit-btn");
let input=document.getElementById("input");
let itemContainer=document.querySelector(".items-wrapper");
const itemList = document.querySelector(".item-list");
let warning=document.querySelector(".alert");
const addBtn=document.querySelector(".submit-btn");
const clearBtn=document.querySelector(".clear-btn");



let editMode=false;
let editİtemİd;
let editİtem;

// ! render fonk güncelle

const addİtem =(e)=>{
    e.preventDefault();
    let value = input.value;
    
if (value!=="" && editMode===false){
  let id= new Date().getTime().toString();
  createElement(id,value);
  alertFunction("Added successfully","success")
  setDefaut();
  setLocalStorage(id,value);
}else if(value!=="" && editMode===true){
  editİtem.innerText=value;
  alertFunction("Item Updated","success");
  localStorageUpdate(editİtemİd,value);
setDefaut();




}
}

const editFunction=(e)=>{
  editİtem=e.target.parentElement.parentElement.previousElementSibling;

  const element= e.target.parentElement.parentElement.parentElement;
  input.value=editİtem.innerText;
  editİtemİd=element.dataset.id;
 
  editMode=true;
  addBtn.innerText="Edit";
  
  
}
const deleteFunction=(event)=>{
const containerElement= event.target.parentElement.parentElement.parentElement;
const dataİd=containerElement.dataset.id;
const deleteİtem=event.target.parentElement.previousElementSibling;
containerElement.remove(deleteİtem);
removeFromLocalStorage(dataİd);
alertFunction("Deletion completed","danger")
}

const createElement=(id,value)=>{

    let newDiv=document.createElement("div");
    newDiv.setAttribute("data-id",id);
    newDiv.classList.add("items-list-item");
    newDiv.innerHTML=`
               <p class="item-name">${value}</p>
            <div class="btn-container">
              <button class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>`;
           
  itemList.appendChild(newDiv);
  const deleteBtn=newDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click",deleteFunction);
  const editBtn=newDiv.querySelector(".edit-btn");
  editBtn.addEventListener("click",editFunction);
}




///alert fonkisyon
const alertFunction=(text,message)=>{

warning.innerText=text;
warning.classList.add(`alert-${message}`)
setTimeout(() => {
  warning.innerText="";
  warning.classList.remove(`alert-${message}`)
}, 1000);
}



// değerliri sıfırlama 
const setDefaut=()=>{
  addBtn.innerHTML="Add";
  input.value="";
  editMode=false;
  editİtemİd="";
}

   //! localStorage işlemleri

   const getElementFromLocalStorage=()=>{
   return localStorage.getItem("item")? JSON.parse(localStorage.getItem("item")):[];
   }

 
 const setLocalStorage=(id,value)=>{
  let item={id,value};
let items=getElementFromLocalStorage();
items.push(item);
localStorage.setItem("item",JSON.stringify(items));
}


//render 

window.addEventListener("DOMContentLoaded",()=>{
    const items=getElementFromLocalStorage();
if(items.length>0){
  items.forEach((item)=>{
    createElement(item.id,item.value);
  });
};
   
})


//remove to LocalStorage
const removeFromLocalStorage=(id)=>{
   let items=getElementFromLocalStorage();
   items = items.filter((item) => item.id !== id);
 localStorage.setItem("item",JSON.stringify(items));

}

// LocalStorage güncelleme fonksiyonu

const localStorageUpdate=(id,newValue)=>{

  let items=getElementFromLocalStorage();
 items=items.map((item)=>{
    if(item.id===id){
 return {...item,value:newValue};
    }
    return item;
  });
  localStorage.setItem("item", JSON.stringify(items));
};
const clearBtnFunction=()=>{
  const allİtem=document.querySelectorAll(".items-list-item");

  if(allİtem.length> 0 ){

    localStorage.removeItem("item");
    allİtem.forEach((item) => {
      itemList.removeChild(item);
       clearBtn.style.display = "none";

      alertFunction("The list is empty","danger");

    })
  };

};

clearBtn.addEventListener("click",clearBtnFunction);



 

form.addEventListener("submit", addİtem);

