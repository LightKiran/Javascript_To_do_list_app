// CODE EXPLAINED channel

// Select the Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST, id;

// get items form localstorage

let data = localStorage.getItem("TODO");


// check if data is empty or not

if(data){
    LIST = JSON.parse(data); 
    id = LIST.length; // set id to the last one in the list
    loadList(LIST);
   }else{
       //if data isn't empty
       LIST = [];
       id = 0;
       
   }

// load items to the user's GUI

function loadList(Array){
    Array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });   
}

//clear the local storage

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show today's date

const options = {weekday : "long", month : "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash){
    
    if (trash){ return };
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                    </li>
                    `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}



// add an to do item to the list when user hit enter key

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
            const toDo = input.value;
        
        // if the input is not empty
        if(toDo){
                addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage {this code is required whereever the list array is updated}
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
           }
        input.value = "";
       }
});

// task to complete to do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// task to delete

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // compete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
       }else if(elementJob == "delete"){
                removeToDo(element);
                }

    // add item to localstorage {this code is required whereever the list array is updated}
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
                          