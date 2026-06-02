//מחלקת הבקשה, בעת יצירת בקשה חדשה נשתמש במחלקה זו
class FXMLHttpRequest {
    constructor() {
        this.statusText;//התשובה כמשפט, שגיאה או הודעת הצלחה
        this.readyState=1;//כל שלב יתווסף עוד אחד, אם יגיע לשלב הסופי יהיה 4
        this.status;//לכאן ייכנב מספר התגובה של השרת כלומר 404,200,400
        this.details;//הפרטים הנשלחים באם יש
        this.method;//פעולת גט, סט וכו'
        this.action;//לכאן יכנס אח"כ סוג הפונקציה שתופעל בסוף
        this.url;//כתובת המכילה שם פונקציה סופית+סוג שרת
        this.data;//כאן ייכנס מידע מוחזר באם יש
        //server_user/add_sec
    }
    open(method,url,details){
        this.method=method;
        this.url=url;
        this.details=details;
        this.readyState++;
        // console.log('2');
    }
    send(){
            netFun(this);
    }
}
