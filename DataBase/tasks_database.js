if (!(localStorage.getItem('taskArray'))) {
    let taskArray=[];
    const a = new Task("cleaning","2222","2025-07-03","clean the windows",false);
    const b = new Task("filing","3333","2025-08-01","Submit the material to the committee",false);
    const c = new Task("Sending envelopes","5555","2025-07-22","Organizing and sending salary envelopes to employees",true);
    const d = new Task("Search","5555","2024-05-13","Search the 2020 employee folder",false);
    const e = new Task("printer","4444","2026-07-05","Call a technician for the external printer",true);
    const f = new Task("project","2222","2025-12-25","Finish the project by the specified date.",true);
    const g = new Task("project","5555","2024-12-25","Finish the project by the specified date.",true);

    taskArray.push(a);
    taskArray.push(b);
    taskArray.push(c);
    taskArray.push(d);
    taskArray.push(e);
    taskArray.push(f);
    taskArray.push(g);
    localStorage.setItem('taskArray', JSON.stringify(taskArray))

}
function setTaskArray(taskArray) {
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
}
function getTaskArray() {
    return JSON.parse(localStorage.getItem('taskArray'))
}
function db_add_task(fajaxObject) {
    let taskArray = getTaskArray()
    let secArray = getSecArray()
    const exists = secArray.some(sec => sec.id === fajaxObject.details.id);
    if (!exists) {
        fajaxObject.statusText = 'secretary didnt found, change id';
        return fajaxObject;
    }
    taskArray.push(fajaxObject.details);
    setTaskArray(taskArray)
    fajaxObject.data = true;
    fajaxObject.statusText = 'task added seccesfuly'
    return fajaxObject;
}

function show_all_task(fajaxObject) {
    let taskArray = getTaskArray();
    console.log(taskArray);
    if (!taskArray || taskArray.length === 0) {
        fajaxObject.statusText = "you have'nt any task yet";
        fajaxObject.data = undefined;
        console.log(taskArray);
        return fajaxObject
    }
    fajaxObject.data = taskArray;
    console.log('fajaxObject.data:', fajaxObject.data);
    console.log(fajaxObject);
    return fajaxObject;
}



function remove_task_from_sec(fajaxObject) {
    let taskArray = getTaskArray()
    // console.log('1',taskArray);
    taskArray = taskArray.filter(a => !(
       
        a.id === fajaxObject.details.id &&
        a.date === fajaxObject.details.date &&
        a.text === fajaxObject.details.text &&
        a.isUrgent === fajaxObject.details.isUrgent
    ));
    // console.log('2',taskArray);
    setTaskArray(taskArray)
    fajaxObject.data = true;
    fajaxObject.statusText = 'task removed successfully';
    return fajaxObject;
}
//function toChange_task(fajaxObject) {
 //   let taskArray = getTaskArray()
  //  if (taskArray === null)
  //      fajaxObject.statusText = 'null array'
 //   taskArray = taskArray.filter(a => (a.id) % 100 !== (fajaxObject.details.id) % 100);
 //   setTaskArray(taskArray)
 //   add_task_to_sec(fajaxObject)
//}

function TaskCompleted(fajaxObject) {
    let taskArray = getTaskArray()
   let change_task  = taskArray.find(a => (
   
    a.id === fajaxObject.details.id &&
    a.date === fajaxObject.details.date &&
    a.text === fajaxObject.details.text &&
    a.isUrgent === fajaxObject.details.isUrgent
));
  change_task.isTaskCompleted="true";
  setTaskArray(taskArray)
  fajaxObject.data = true;
    return fajaxObject;
}