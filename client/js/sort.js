function sortArr(who, act, arr) {

    switch (who) {
        case "sec":
            switch (act) {
                case "id":
                    return arr.sort((a, b) => Number(a.id) - Number(b.id));

                case "name":
                    return arr.sort((a, b) => {
                        let titleA = a.name.trim();
                        let titleB = b.name.trim();

                        let isHebrewA = titleA.charCodeAt(0) >= 1488 && titleA.charCodeAt(0) <= 1514;
                        let isHebrewB = titleB.charCodeAt(0) >= 1488 && titleB.charCodeAt(0) <= 1514;

                        // אם אחד בעברית ואחד לא – העברי קודם
                        if (isHebrewA && !isHebrewB) return -1;
                        if (!isHebrewA && isHebrewB) return 1;

                        // אם שניהם באותה שפה – להשוות רגיל לפי סדר א-ב
                        return titleA.localeCompare(titleB);
                    });


            }
        case "task":
            switch (act) {
                case "sec":
                    return arr.sort((a, b) => Number(a.id) - Number(b.id));

                case "id":
                    return arr.sort((a, b) => Number(a.taskId) - Number(b.taskId));

                case "complited":
                    return arr.filter(task => task.isTaskCompleted === "true");

                case "notComplited":
                    return arr.filter(task => task.isTaskCompleted !== "true");

                case "isUrgent":
                    return arr.sort((a, b) => {
                        const urgentA = a.isUrgent === "true" || a.isUrgent === true;
                        const urgentB = b.isUrgent === "true" || b.isUrgent === true;
                        return urgentA === urgentB ? 0 : urgentA ? -1 : 1;
                    });

                case "title":
                    return arr.sort((a, b) => {
                        let titleA = a.title.trim();
                        let titleB = b.title.trim();

                        let isHebrewA = titleA.charCodeAt(0) >= 1488 && titleA.charCodeAt(0) <= 1514;
                        let isHebrewB = titleB.charCodeAt(0) >= 1488 && titleB.charCodeAt(0) <= 1514;

                        // אם אחד בעברית ואחד לא – העברי קודם
                        if (isHebrewA && !isHebrewB) return -1;
                        if (!isHebrewA && isHebrewB) return 1;

                        // אם שניהם באותה שפה – להשוות רגיל לפי סדר א-ב
                        return titleA.localeCompare(titleB);
                    });

                case "date":
                    return arr.sort((a, b) => new Date(a.date) - new Date(b.date));


            }



        default:
            return arr;
    }
}
function show_task_button(arr, isMeneger) {
    document.getElementById('board').innerHTML = '';
    const board = document.getElementById('board');

    const dateBtn = document.createElement('button');
    dateBtn.innerText = 'sort by date';
    dateBtn.addEventListener("click", function () {
        let copyaArr = sortArr("task", "date", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const titleBtn = document.createElement('button');
    titleBtn.innerText = 'sort by title';
    titleBtn.addEventListener("click", function () {
        let copyaArr = sortArr("task", "title", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const idBtn = document.createElement('button');
    idBtn.innerText = 'sort by id';
    idBtn.addEventListener("click", function () {
        let copyaArr = sortArr("task", "id", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const isCompletedBtn = document.createElement('button');
    isCompletedBtn.innerText = 'show Completed';
    isCompletedBtn.addEventListener("click", function () {
        let copyaArr = sortArr("task", "complited", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const isNotCompletedBtn = document.createElement('button');
    isNotCompletedBtn.innerText = 'show not Completed';
    isNotCompletedBtn.addEventListener("click", function () {
        let copyaArr = sortArr("task", "notComplited", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const isUrgent = document.createElement('button');
    isUrgent.innerText = 'show is Urgent';
    isUrgent.addEventListener("click", function () {
        let copyaArr = sortArr("task", "isUrgent", arr);
        show_task_in_board(copyaArr, isMeneger);
    });
    const search = document.createElement('input');
    search.placeholder = 'search by title';
    search.addEventListener("input", function () {
        // console.log(search.value);
        let copyaArr = arr.filter(task => task.title.includes(search.value));
        show_task_in_board(copyaArr, isMeneger);
    });
    const br = document.createElement('br');


    const BtnTaskDiv = document.createElement('div');
    BtnTaskDiv.appendChild(search);
    BtnTaskDiv.appendChild(br);
    BtnTaskDiv.appendChild(dateBtn);
    BtnTaskDiv.appendChild(isCompletedBtn);
    BtnTaskDiv.appendChild(isNotCompletedBtn);
    BtnTaskDiv.appendChild(isUrgent);
    BtnTaskDiv.appendChild(titleBtn);
    BtnTaskDiv.appendChild(idBtn);

    if (isMeneger) {
        const secBtn = document.createElement('button');
        secBtn.innerText = 'sort by secretary ';
        secBtn.addEventListener("click", function () {
            let copyaArr = sortArr("task", "sec", arr);
            show_task_in_board(copyaArr, isMeneger);
        });
        BtnTaskDiv.appendChild(secBtn);
    }
    board.appendChild(BtnTaskDiv);
    const tasks = document.createElement('div');
    tasks.id = "tasks";
    board.appendChild(tasks);

}
function show_task_in_board(arr, isMeneger) {
    // console.log('show_task_in_board');
    const tasks = document.getElementById('tasks');
    document.getElementById('tasks').innerHTML = ''
    if (arr.length === 0) {
        document.getElementById('tasks').innerHTML = `<br> sorry,<br>no tasks found`
    }
    arr.forEach((task) => {
        const taskDate = new Date(task.date);
        const today = new Date();

        // לאפס את השעות כדי להשוות רק לפי תאריך
        taskDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (taskDate < today) {
            task.title = 'התאריך עבר - לא ניתן לבצע משימה זו';
        }
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-box');
        const completedColor = (task.isTaskCompleted === true || task.isTaskCompleted === "true") ? 'green' : 'rgb(204, 2, 2)';
        const isUrgentColor = (task.isUrgent === true || task.isUrgent === "true") ? 'red' : 'black';
        taskDiv.innerHTML = `
        <br><br>
        <p>Title:${task.title}</p>
        <p>EndDate:${task.date}</p>
        <p>secretary id:${task.id}</p>
        <p>ID: ${task.taskId}</p>
        <p>Text:${task.text}</p>
        <p style="color: ${completedColor};">isTaskCompleted: ${task.isTaskCompleted}</p>
        <p style="color: ${isUrgentColor};">isUrgent: ${task.isUrgent}</p>
`;
        let taskBtn = document.createElement('button');
        if (isMeneger) {
            // console.log('m');
            taskBtn.innerText = 'מחיקת משימה';
            taskBtn.onclick = () => removeTask(task);
        }
        else {
            taskBtn.innerText = 'ביצוע משימה';
            // console.log('v');
            taskBtn.onclick = () => taskCompleted(task);
            if (taskDate < today || task.isTaskCompleted === true || task.isTaskCompleted === "true") {
                taskBtn.disabled = true;
                taskBtn.style.backgroundColor = 'rgb(241, 241, 241)';
            }


        }
        taskDiv.appendChild(taskBtn);
        tasks.appendChild(taskDiv);

    })

}
function show_sec_button(arr) {
    console.log('show_sec_button');
    document.getElementById('board').innerHTML = '';
    const board = document.getElementById('board');

    // לנקות את הלוח קודם
    //הוספת כפתורי מיון
    const idBtn = document.createElement('button');
    idBtn.innerText = 'sort by id ';
    idBtn.addEventListener("click", function () {
        let copyaArr = sortArr("sec", "id", arr);
        show_sec_in_board(copyaArr);
    });
    const nameBtn = document.createElement('button');
    nameBtn.innerText = 'sort by name';
    nameBtn.addEventListener("click", function () {
        let copyaArr = sortArr("sec", "name", arr);
        show_sec_in_board(copyaArr);
    });
    const search = document.createElement('input');
    search.placeholder = 'search by name';
    search.addEventListener("input", function () {
        // console.log(search.value);
        let copyaArr = arr.filter(sec => sec.name.includes(search.value));
        show_sec_in_board(copyaArr);
    });
    const br = document.createElement('br');
    const BtnSecDiv = document.createElement('div');
    BtnSecDiv.appendChild(search);
    BtnSecDiv.appendChild(br);
    BtnSecDiv.appendChild(idBtn);
    BtnSecDiv.appendChild(nameBtn);
    board.appendChild(BtnSecDiv);
    const secr = document.createElement('div');
    secr.id = "secr";
    board.appendChild(secr);

}
function show_sec_in_board(arr) {
    // console.log('show_sec_in_board');
    const secr = document.getElementById('secr');
    document.getElementById('secr').innerHTML = ''
    arr.forEach((sec, index) => {
        const secDiv = document.createElement('div');
        secDiv.classList.add('secretary-box');
        secDiv.innerHTML = `
        <br><br>
    <p>Name:${sec.name}</p>
    <p>ID: ${sec.id}</p>
    <p>Email:${sec.mail}</p>
    <p>Phone:${sec.phone}</p>
`;
        // הוספת שלוש כפתורים
        const changeBtn = document.createElement('button');
        changeBtn.innerText = 'שינוי פרטים';
        changeBtn.onclick = () => changeSecretary(sec);

        const addTaskBtn = document.createElement('button');
        addTaskBtn.innerText = 'הוספת משימה';
        addTaskBtn.onclick = () => addTaskToSecretary(sec);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'מחיקת מזכירה';
        deleteBtn.onclick = () => deleteSecretary(sec);

        secDiv.appendChild(changeBtn);
        secDiv.appendChild(addTaskBtn);
        secDiv.appendChild(deleteBtn);
        secr.appendChild(secDiv);
    });


}