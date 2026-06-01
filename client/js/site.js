let logInPage = document.getElementById('logInPage').content;
let logInOptions = document.getElementById('logInOptions').content;
let manegerOptions = document.getElementById('manegerOptions').content;
function changPage(id) {
    let current = document.getElementById(id).content;
    console.log('link ' + id + ' clicked');
    loadPage(current);
    history.pushState({ boardId: id }, "", `#${id}`);
    if(id==='show_all_sec'){
        showAllSec()
    }
    if(id==='show_all_task'){
        showAllTask()
    }
}

function loadPage(board) {
    console.log(`board loaded`);
    document.getElementById('board').replaceChildren(board.cloneNode(true));
}

function loadOptions(options) {
    console.log('options loaded');
    document.getElementById('options').replaceChildren(options.cloneNode(true));
}

loadPage(logInPage);
loadOptions(logInOptions);

function manegerPage() {
    document.getElementById('board').innerHTML = '';
    history.replaceState({ boardId: "empty" }, "", "#empty");
    let current = document.getElementById('manegerOptions').content;
    loadOptions(current);
}


// setTimeout(() => {
//     sessionStorage.setItem("loggedIn", "true"); // לסמן שהוא מחובר
//     history.replaceState({ pageId: "manegerOptions" }, "", "#manegerOptions"); // לא דוחף דף התחברות אחורה
//     loadPage(manegerOptions);
//     loadOptions(manegerOptions);
// }, 3000);


function secretaryPage() {
    document.getElementById('board').innerHTML = '<p>sorry, you have to log in first</p>';
    document.getElementById('options').innerHTML = '';
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function laodMessegeToPage(mes) {
    document.getElementById('board').innerHTML = mes;
}

// האזנה לחזרה אחורה
window.addEventListener("popstate", (event) => {
    if (event.state && "boardId" in event.state) {
        if (event.state.boardId === "empty") {
            document.getElementById('board').innerHTML = '';
        } else {
            let current=document.getElementById(event.state.boardId).content
            loadPage(current);
            if (event.state.boardId === 'show_all_sec') {
                showAllSec();
            } else if (event.state.boardId === 'show_all_task') {
                showAllTask();
            }
        }
    }
});
