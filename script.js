let task = document.getElementById("task");     // Input field
let myList = document.getElementById("myList"); // Tasks table
let err = document.getElementById("err");       // Error message
let todoarr = [];                               // Stores added tasks
let crossed = [];                               // Stores true if done, false if not
let addbtn = document.getElementById("addbtn"); // Add to list button
let limit = 15;                                 // Characters limit

function checkLength(){
    if(task.value.length <= limit) {
        raiseErr("",false)
    }
    else {
        task.value = task.value.substring(0,limit);
        raiseErr("ERROR : Reached maximum character limit.",true)
    }
}

function addToList() {
    if(task.value.length !== 0) {
        raiseErr("",false)
        task.value.trim();
        todoarr.push(task.value);
        crossed.push(false);
        task.value = "";
        viewList();
    }
    else {
        raiseErr("ERROR : Invalid input.", true)
    }
}

function raiseErr(msg,state) {
    if(state===true) {
        err.innerHTML = msg;
        err.style.visibility = "visible";
        err.style.marginBottom = "5px";
        err.style.animation = "hrz-shaking 0.5s ease-in-out";
        task.style.borderBottomColor = "red";
        addbtn.disabled = true;
        addbtn.style.backgroundColor = "grey";
        addbtn.style.borderColor = "grey";
        addbtn.style.transition = "0.5s";
        addbtn.style.cursor = "auto";
        addbtn.style.color = "rgb(70,70,70)";
    }
    if(state===false) {
        err.innerHTML = "ERROR";
        err.style.visibility = "hidden";
        err.style.marginBottom = "0";
        task.style.borderBottomColor = "blue";
        addbtn.disabled = false;
        addbtn.style.backgroundColor = "#0012DD";
        addbtn.style.borderColor = "#0012DD";
        addbtn.style.cursor = "pointer";
        addbtn.style.color = "white";
    }
}

function deleteFromList(index) {
    todoarr.splice(index, 1);
    crossed.splice(index, 1);
    viewList();
}

function markAsDone(index) {
    if(!(crossed[index])) {
        todoarr[index] = "<del>" + todoarr[index] + "</del>";
        document.getElementById("donbtn").innerText = "Undone";
        crossed[index] = true;
    }
    else {
        todoarr[index] = todoarr[index].replace("<del>","").replace("</del>","");
        document.getElementById("donbtn").innerText = "Done";
        crossed[index] = false;
    }
    viewList();
}

function viewList() {
    if(todoarr.length === 0) {
        myList.innerHTML = "";
        return;
    }
    myList.innerHTML =
    `<tr>
        <th> # </th>
        <th> task </th>
        <th colspan="2"> actions </th>
    </tr>`;
    for(let i=0 ; i<todoarr.length ; i++) {
        myList.innerHTML +=
        `<tr>
            <th> ${i+1} </th>
            <td id="todocell"> ${todoarr[i]} </td>
            <td id="actcell"> <button id="delbtn" onclick=deleteFromList(${i})> Delete X </button> </td>
            <td id="actcell"> <button id="donbtn" onclick=markAsDone(${i})> ${(crossed[i]) ? "Undone" : "Done"} </button> </td>
        </tr>`;
    }
}

task.addEventListener("focus", () => {
    task.style.backgroundColor = "white";
    task.style.transition = "0.5s";
});

task.addEventListener("blur", () => {
    task.style.backgroundColor = "rgb(255,255,255,0.5)";
    task.style.transition = "0.5s";
});

task.addEventListener("mouseenter", () => {
    task.style.backgroundColor = "white";
    task.style.transition = "0.5s";
});

task.addEventListener("mouseleave", () => {
    if(document.activeElement === task) {
        return;
    }
    task.style.backgroundColor = "rgb(255,255,255,0.5)";
    task.style.transition = "0.5s";
});

task.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        addToList();
    }
});

err.addEventListener('animationend', () => {
    err.style.animation = '';
});