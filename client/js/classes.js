class Secretary{
    constructor(name,id,password,verify,mail,phone) {
        this.name = name;
        this.id=id;
        this.password=password;
        this.verify=verify;
        this.mail=mail;
        this.phone=phone;
        
    }
}

class Maneger{
    constructor(name,id,password,verify)
    {
        this.id=id
        this.name = name;
     this.password=password;
     this.verify=verify;
    }
}   
    
class Task{
    static task_id=100
    constructor(title,id,date,text,isUrgent)
    {
        this.title=title
        this.id=id;
        this.date=date;
        this.isTaskCompleted=false;
        this.text=text;
        this.isUrgent=isUrgent
        this.taskId=Task.task_id++;
    }
   
}
class User{
    constructor(maneger,secretaries=[])
     {
        this.maneger = maneger; //מנהל
        this.secretaries  = secretaries ;//מערך של מזכירות
     }
  //   addSecretary(secretary) {
      //  this.secretaries.push(secretary);
  // }

    // addTypeToSecretary(secretary,newtype) 
    // {
    //     secretary.types.push(newtype);
    // }
}