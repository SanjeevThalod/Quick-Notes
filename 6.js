var bar = document.getElementById('bar');
var elem = document.getElementsByClassName('notes-item');
var aside = document.getElementById('aside');
var main = document.getElementById('main');
var t = document.getElementById('t');
var cont = document.getElementById('cont');
var notecontainer = document.getElementById('aside');
var btn = document.getElementById('btn');
var x = document.getElementById('fa');

x.addEventListener('click',function(){
    main.style.display = 'block';
    aside.classList.remove('respo');
    aside.classList.add('aside');
    x.style.visibility = 'hidden';
});

bar.addEventListener('click',function(){
    main.style.display = 'none';
    aside.classList.remove('aside');
    aside.classList.add('respo');
    x.style.visibility = 'visible';
    for(var i = 0; i < elem.length; i++){
        elem[i].addEventListener('click',function(){
            aside.classList.remove('respo');
            aside.classList.add('aside');
            main.style.display = 'block';
        });
    }
});


btn.addEventListener('click',function(){
    if(t.value == "" || cont.value == ""){
        alert('Add Content to the note');
    }else{
        let notes = localStorage.getItem('notes');
        if(notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
        let obj = {
            title: t.value,
            content: cont.value
        }
        notesObj.push(obj);
        localStorage.setItem('notes',JSON.stringify(notesObj));
        t.value = "";
        cont.value = "";
        showNotes();
    }
});

function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += 
        `<div class="notes-item" id="${index}" onclick="editNote(this.id)">
            <div class="title">${element.title}</div>
            <div class="content">${(element.content).slice(0,16)}...</div>
            <i class="fa-solid fa-trash" id="${index}" onclick="deleteNote(this.id)"></i>
        </div>`;

    });

    if(notecontainer.length != 0){
        notecontainer.innerHTML = html;
    }else if(notecontainer.innerText== ""){
        notecontainer.innerText = "No Notes Yet";
        console.log('empty');
    }
};

function deleteNote(index){
        let notes = localStorage.getItem('notes');
        if(notes != null){
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index,1);
        localStorage.setItem('notes',JSON.stringify(notesObj));
        t.value = "";
        cont.value = "";
        x.style.visibility = 'hidden';
        showNotes();    
}

function editNote(index){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    t.value = notesObj[index].title;
    cont.value = notesObj[index].content;
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    x.style.visibility = 'hidden';
    showNotes();
}

showNotes();