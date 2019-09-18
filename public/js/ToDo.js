const LIST = "ToDo";
let lists = [];
const body = document.querySelector(".toDoBody");
const repository = localStorage.getItem(LIST);
const ul = document.querySelector('.ul');



const init = function(){
    
    if(repository){
        // 저장소에 저장된것이 존재
        showList();
    }
    body.querySelector('.toDoForm').addEventListener('submit',submitListener);
};

const showList = function(){
    const parsedToDos = JSON.parse(repository);
    parsedToDos.forEach(e=>{
        makeToDo(e.text);
    })
}

const submitListener = function(e){
    e.preventDefault();
    const input = body.querySelector('.toDoInput');
    makeToDo(input.value);
    input.value = '';
    
}

const makeToDo = function(text){
    const node = {
        id : lists.length,
        text : text
    };
    const btn = document.createElement('button');
    btn.innerText = 'X';
    btn.addEventListener('click',deleteNode);
    let span = document.createElement('span');
    let li = document.createElement('li');
    li.id=node.id;
    span.innerText = text;

    li.appendChild(btn);
    li.appendChild(span);
    ul.appendChild(li);

    saveLocal(node);
}

const deleteNode = function(event){
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    ul.removeChild(li);

    const cleanToDos = lists.filter(function(lists){
        return parseInt(lists.id) !== parseInt(li.id);
    });
    lists = cleanToDos;
    localStorage.clear();
    localStorage.setItem(LIST,JSON.stringify(lists));
}

const saveLocal = function(node){
    lists.push(node);
    localStorage.clear();
    localStorage.setItem(LIST,JSON.stringify(lists));

   
}



init();