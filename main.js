let storeNotes=[]
if(localStorage.getItem("notes")){
    storeNotes=JSON.parse(localStorage.getItem("notes")) 
}
//Elements 
const fullContainer=document.getElementById("fullContainer");
const main=document.getElementById("main");
const addbtn=document.getElementById("addbtn");
const editor=document.getElementById("editor");
const noteTitle=document.getElementById("noteTitle");
const textarea=document.getElementById("textarea");
const saveButton=document.getElementById("saveButton");
const note=document.getElementsByClassName("note");
let number=0;
let updation=false;

function openEditor() {
    main.style.display="none";
    editor.style.display="flex";
    addbtn.style.display="none"
}

function closeEditor() {
    main.style.display="flex";
    editor.style.display="none";
    addbtn.style.display="block "
}
function addNote(title,body,noteNumber){
    main.innerHTML+=`<div class="note displayNote" id='${noteNumber}'>
        <div class="tool">
            <div class="title">${title}</div>
            <i class="fa-sharp fa-solid fa-trash" onclick="deleteNote('${noteNumber}')"></i>
        </div>
        <div class="note-body">${body}</div>
    </div>`
}
function deleteNote(dataId){
    document.querySelector(`#${dataId}`).remove();
    storeNotes=[];
    let notes=document.querySelectorAll(".displayNote")
    let title=document.querySelectorAll(".title")
    let body=document.querySelectorAll(".note-body")
    notes.forEach((note,index)=>{storeNotes.push({title:title[index].innerText,body:body[index].innerText,noteNumber:`noteNumber${index}`})})
    changeData()
}

addbtn.addEventListener("click",()=>{
    openEditor()
    noteTitle.value="";
    textarea.value="";
});



saveButton.addEventListener("click",()=>{
    let title=noteTitle.value
    let body=textarea.value
    if(title!="" && body!="" && !updation){
        closeEditor();
        storeNotes.push({title:title,body:body,noteNumber:`noteNumber${number}`})
        changeData()
        number++;
    }
    else if(title!="" && body!="" && updation){
        closeEditor();
        storeNotes.push({title:title,body:body,noteNumber:`noteNumber${number}`})
        changeData()
        number++;
    }
})




function changeData(){
    localStorage.setItem("notes",JSON.stringify(storeNotes))
    if(storeNotes.length==1){
        if(document.getElementById("create-note")){
            document.getElementById("create-note").remove()   
        }
    }
    else if(storeNotes.length==0){
        main.innerHTML=`<div id="create-note" class="main-center">
        <img src="img/web.png">
        <div class="centered">Tap to Create new Note</div>
    </div>`;
    const createNote=document.getElementById("create-note");
    createNote.addEventListener("click",()=>{
        openEditor()
        noteTitle.value="";
        textarea.value="";
    });
        return;
    }
    main.innerHTML = "";
    storeNotes.forEach(note=>{
        addNote(note.title,note.body,note.noteNumber)
    })
    
}
changeData()
closeEditor()


// function updateNote(dataId){
//     updation=true;
//     let noteItem=document.querySelector(`#${dataId}`)
//     let title=noteItem.querySelector(".title").innerText
//     let body=noteItem.querySelector(".note-body").innerText
//     openEditor()
//     noteTitle.value=title;
//     textarea.value=body;
// }