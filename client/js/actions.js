const fajaxfun = (method, url, details, callback) => {
    const request = new FXMLHttpRequest();
    // console.log('1');
    request.open(method, url, details);
    setTimeout(() => {
        request.send();
        if (request.readyState === 4 && request.status === 200) {
            const data = request.data;
            const response = request.statusText;
            callback(response, data);
        } else {
            const err = request.statusText;
            callback(err, undefined)
        }
    }, 1500);

};


//לשאול על קולבאק בתוך קולבאק
function addSec() {
    let name = document.getElementById('name').value
    let id = document.getElementById('id_sec').value
    let passward = document.getElementById('password').value
    let verify = document.getElementById('verify').value
    let phone = document.getElementById('phone_number').value
    let email = document.getElementById('email').value
    let sec = new Secretary(name, id, passward, verify, email, phone);
    console.log(sec);
    fajaxfun('POST', 'server_users/add_sec', sec, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            console.log(err);
            laodMessegeToPage(err);
        }
    })
}


function addTask() {
    let title_task = document.getElementById('title').value
    let id = document.getElementById('id_task').value
    let text = document.getElementById('text_task').value
    let date = document.getElementById('end_date').value
    let isUrgent = getUrgency()
    let new_task = new Task(title_task, id, date, text, isUrgent)
    console.log(new_task);
    fajaxfun('POST', 'server_task/add_task', new_task, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            console.log(err);
            laodMessegeToPage(err);
        }
    })
}
function getUrgency() {
    const selectedRadio = document.querySelector('input[name="is_urgent"]:checked');
    const value = selectedRadio ? selectedRadio.value : null;
    return value;
}
function showAllTask() {
    fajaxfun('GET', 'server_task/show_all_task', null, (err, data) => {
        if (data === undefined) {
            console.log(err);
            laodMessegeToPage(err);
        } else {
            let arr = data;
            // console.log(arr);

            show_task_button(arr, true);
            show_task_in_board(arr, true);
        }
    })
}
function removeTask(task) {
    fajaxfun('DELETE', 'server_task/remove_task', task, (err, data) => {
        if (data === undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            alert(err);
            showAllTask();
        }
    })
}
function showAllSec() {
    fajaxfun('GET', 'server_users/show_all_sec', null, (err, data) => {
        if (data === undefined) {
            //הדפסת השגיאה בתחתית הבורד
            console.log(err);
            laodMessegeToPage(err);
        } else {
            //הדפסת כל אחת ממערך המזכירות:
            // console.log(data);
            let arr = data;
            // console.log(arr);
            show_sec_button(arr)
            show_sec_in_board(arr)
        }


    });
}
//+
function changeSecretary(sec) {
    const board = document.getElementById('board');
    board.innerHTML = '';//clean the baord
    changPage('change_sec');
    //נכניס פרטי מזכירה כדי להקל על המשתמש
    document.getElementById('changedName').value = sec.name;
    document.getElementById('changedId').value = sec.id;
    document.getElementById('changedPassword').value = sec.password;
    document.getElementById('changedVerify').value = sec.verify;
    document.getElementById('changedPhone').value = sec.phone;
    document.getElementById('changedEmail').value = sec.mail;
}
//+
function changeSec() {
    let name = document.getElementById('changedName').value
    let id = document.getElementById('changedId').value
    let passward = document.getElementById('changedPassword').value
    let verify = document.getElementById('changedVerify').value
    let phone = document.getElementById('changedPhone').value
    let email = document.getElementById('changedEmail').value
    let sec = new Secretary(name, id, passward, verify, email, phone);
    console.log(sec);
    fajaxfun('PUT', 'server_users/change_sec', sec, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            alert(err);
            showAllSec();
        }
    })
}
//+
function deleteSecretary(sec) {
    // console.log(sec);
    fajaxfun('DELETE', 'server_users/remove_sec', sec, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            alert(err);
            showAllSec();
        }
    })
}
//+
function addTaskToSecretary(sec) {
    changPage('add_task');
    document.getElementById('id_task').value = sec.id;
}
function changProfile() {
    const board = document.getElementById('board');
    board.innerHTML = '';//clean the baord
    changPage('change_profile');
    fajaxfun('GET', 'server_users/get_maneger', null, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            // alert(err);
            document.getElementById('manName').value = data.name;
            document.getElementById('manId').value = data.id;
            document.getElementById('manPassword').value = data.password;
            document.getElementById('manVerify').value = data.verify;
            document.getElementById("chang_maneger_details").addEventListener("click", function () {
                let name = document.getElementById('manName').value
                let id = document.getElementById('manId').value
                let password = document.getElementById('manPassword').value
                let verify = document.getElementById('manVerify').value
                let maneger = new Maneger(name, id, password, verify);
                changeManeger(maneger);
            });
        }
    })
}
function changeManeger(maneger) {
    fajaxfun('PUT', 'server_users/change_maneger', maneger, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            laodMessegeToPage(err);
        }
    })
}
function showSec(id) {
    let isMeneger = false;
    if (id === null) {
        id = document.getElementById('id_ofOneSec').value
        isMeneger = true;
    }
    fajaxfun('GET', 'server_task/show_all_task', null, (err, data) => {
        if (data === undefined) {
            console.log(err);
            if (err === 'fail, please try again') {
                showSec(id);
            }
            else {
                laodMessegeToPage(err);
            }
        } else {
            let arr = data;
            arr = arr.filter(task => task.id === id);
            // console.log(arr);
            show_task_button(arr, isMeneger)
            show_task_in_board(arr, isMeneger)
        }
    })
}
function taskCompleted(task) {
    fajaxfun('PUT', 'server_task/is_task_completed', task, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);
        }
        else {
            //secceed, no data response needed
            console.log(err);
            showSec(task.id);
            console.log(data.details);

        }
    })
}
function funlogin() {
    console.log('try to log in');
    let name = document.getElementById('loginName').value
    let id = document.getElementById('loginId').value
    let passward = document.getElementById('loginPassword').value
    let person = new Maneger(name, id, passward, null);
    fajaxfun('GET', 'server_users/login', person, (err, data) => {
        if (data == undefined) {
            //error
            console.log(err);
            let myDiv = document.getElementById("board");
            let newParagraph = document.getElementById("response");
            if (newParagraph === null) {
                newParagraph = document.createElement("p");
                newParagraph.id = 'response'
            }
            newParagraph.textContent = ' ';
            setTimeout(() => {
                newParagraph.textContent = err;
                myDiv.appendChild(newParagraph);
            }, 500);

        }
        else {
            //secceed, no data response needed
            if (err === 'maneger') {
                goManegerPage(data);
            }
            else {
                goSecretaryPage(data);
            }
        }
    });

}
function goManegerPage(maneger) {
    document.getElementById('title_page').innerHTML = 'Administrator access page'
    laodMessegeToPage('maneger loged in')
    setTimeout(() => {
        manegerPage();
    }, 3000);
}

function goSecretaryPage(sec) {
    document.getElementById('title_page').innerHTML = `Secretary access page <br> ${sec.name} <br>${sec.mail}`
    laodMessegeToPage(`hello to secretary: ${sec.name}`)
    let current = document.getElementById('secOptions').content;
    loadOptions(current);
    setTimeout(() => {
        showSec(sec.id);
    }, 1500);
}
function exit() {
    location.reload();
}