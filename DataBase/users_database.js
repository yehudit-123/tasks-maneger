//את  כל הפונקציות שקשורות להתחברות 

//לעשות קובץ בשביל בדיקות
if (!(localStorage.getItem('myUser'))) {
    let manegerObj = new Maneger("NoName", '1111', '111111', '111111');
    let secretariesArray = []
    // constructor(name,id,password,verify,mail,phone)
    const a = new Secretary("Yael Refael","2222","222222","222222","yael@gmail.com","0548455476");
    const b = new Secretary("Hodia Ashcenazi","3333","333333","333333","hodaia@gmail.com","0587217433");
    const c = new Secretary("Yehudit Baruchi","4444","444444","444444","yehudit@gmail.com","0548469521");
    const d = new Secretary("Efrat Mazal","6666","666666","666666","efrat@gmail.com","0525381648");
    const f = new Secretary("A","5555","555555","555555","a@gmail.com","0548455476");

    secretariesArray.push(a);
    secretariesArray.push(b);
    secretariesArray.push(c);
    secretariesArray.push(d);
    secretariesArray.push(f);
    const myUser = new User(manegerObj, secretariesArray);
    // // שמירה ב-LocalStorage
    localStorage.setItem('myUser', JSON.stringify(myUser));
}
//את  כל הפונקציות שקשורות להתחברות 
//לעשות קובץ בשביל בדיקות
function getManeger() {
    let myUser = JSON.parse(localStorage.getItem('myUser'));
    let maneger = myUser.maneger;
    return maneger;
}
function setManeger(maneger) {
    let myUser = JSON.parse(localStorage.getItem('myUser'));
    myUser.maneger = maneger;
    localStorage.setItem('myUser', JSON.stringify(myUser));
}
//+
function getSecArray() {
    let myUser = JSON.parse(localStorage.getItem('myUser'));
    let secArray = myUser.secretaries
    return secArray;
}
//+
function setSecArray(secArray) {
    let myUser = JSON.parse(localStorage.getItem('myUser'));
    myUser.secretaries = secArray;
    localStorage.setItem('myUser', JSON.stringify(myUser));
}
function db_login(fajaxObject) {
    let manegerObj = getManeger();
    if (manegerObj.id === fajaxObject.details.id&&
        manegerObj.password === fajaxObject.details.password&&
        manegerObj.name === fajaxObject.details.name) {
        fajaxObject.data = fajaxObject.details;
        fajaxObject.statusText = 'maneger'
        return fajaxObject;

    }
    let secArray = getSecArray()
    let secretary = secArray.find(sec => (
        sec.id === fajaxObject.details.id &&
        sec.name === fajaxObject.details.name &&
        sec.password === fajaxObject.details.password
    ));
    if (secretary === undefined) {
        fajaxObject.statusText = "user isn't exist"
        return fajaxObject

    }
    fajaxObject.data = secretary;
    fajaxObject.statusText = 'secretary Loged in'
    return fajaxObject;
}
function db_change_maneger(fajaxObject) {
    let maneger = fajaxObject.details;
    setManeger(maneger);
    fajaxObject.data = true;
    // request.readyState++;
    fajaxObject.statusText = 'maneger details changed!'
    return fajaxObject;
}
function db_get_maneger(fajaxObject) {
    let maneger = getManeger();
    fajaxObject.data = maneger;
    // fajaxObject.readyState++;
    fajaxObject.statusText = 'secceed'
    console.log(fajaxObject);

    return fajaxObject;

}

//+
function db_add_sec(fajaxObject) {
    console.log('db_add_sec');
    let secArray = getSecArray()
    const exists = secArray.some(sec => sec.id === fajaxObject.details.id);
    if (exists) {

        fajaxObject.statusText = 'already exist, change id';
        return fajaxObject;
    }
    secArray.push(fajaxObject.details)
    fajaxObject.data = true;
    fajaxObject.statusText = 'secretary added seccesfuly'
    setSecArray(secArray)
    return fajaxObject;
}
//+
function db_remove_sec(fajaxObject) {
    let secArray = getSecArray();
    secArray = secArray.filter(sec => sec.id !== fajaxObject.details.id);
    setSecArray(secArray);

    fajaxObject.data = true;
    console.log(fajaxObject.data);

    fajaxObject.statusText = 'secretary removed successfully';
    return fajaxObject;
}
//+
function db_get_all_sec(fajaxObject) {
    let secArray = getSecArray();
    console.log(secArray);
    if (!secArray || secArray.length === 0) {
        fajaxObject.statusText = "you have any secretary yet";
        fajaxObject.data = undefined;
        return fajaxObject
    }
    fajaxObject.data = secArray;
    console.log('fajaxObject.data:', fajaxObject.data);
    return fajaxObject;
}
function db_change_sec(fajaxObject) {
    let secArray = getSecArray();
    let sec = secArray.find(s => s.id === fajaxObject.details.id);
    sec.name = fajaxObject.details.name;
    sec.password = fajaxObject.details.password;
    sec.verify = fajaxObject.details.verify;
    sec.mail = fajaxObject.details.mail;
    sec.phone = fajaxObject.details.phone;
    // secArray = secArray.filter(sec => sec.id !== fajaxObject.details.id);
    // secArray.push(fajaxObject.details)
    setSecArray(secArray);
    fajaxObject.data = true;
    fajaxObject.statusText = 'secretary changed successfully';
    return fajaxObject;
}



