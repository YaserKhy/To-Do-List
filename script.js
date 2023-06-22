let task = document.getElementById("task");
let todoarr = [];
let myList = document.getElementById("myList");
let err = document.getElementById("err");
let crossed = [];

function addToList() {
    if(task.value.length !== 0) {
        err.style.visibility = "hidden";
        err.style.marginBottom = "0";
        task.style.borderBottomColor = "blue";
        task.value.trim();
        todoarr.push(task.value);
        crossed.push(false);
        task.value = "";
        viewList();
    }
    else {
        err.style.visibility = "visible";
        err.style.marginBottom = "5px";
        err.style.animation = "hrz-shaking 0.5s ease-in-out";
        task.style.borderBottomColor = "red";
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
    myList.innerHTML = "";
    for(let i=0 ; i<todoarr.length ; i++) {
        // let row = document.createElement("tr");
        // let todo = document.createElement("td");
        // todo.textContent = temp;
        // let delcell = document.createElement("td");
        // let delbtn = document.createElement("button");
        // delbtn.setAttribute("id","delbtn");
        // delbtn.textContent = "Delete";
        // delbtn.addEventListener("click",function() {
        //     deleteFromList(i);
        // })
        // delcell.appendChild(delbtn);
        // row.appendChild(todo);
        // row.appendChild(delcell);
        // myList.appendChild(row);
        myList.innerHTML +=
        `<tr>
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