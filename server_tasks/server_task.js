//זה דף שמדמה את פעולת הסרבר- השרת שמקבל בקשות גט, סט, וכו'
//כדי לבצע את זה על המשתמש,, אז אני יכתוב פונקציה שמקבלת בקשה,
//ואם כל הפרטים שהיא קיבלה הם טובים אז היא מנסה 
//
function serverActions(act, ip, request) {
    request.readyState++;
    switch (request.method) {
        case "POST":
            switch (act) {
                case "add_task":
                    try {
                        if (request.details.title === '')
                            throw new Error("Please enter title task!");

                        if (request.details.id === '')
                            throw new Error("Please enter id of task!");

                        console.log(request.details.id);

                        if (request.details.id.length !== 4)
                            throw new Error("Invalid id task number!");

                        if (request.details.date === '')
                            throw new Error("Please enter date");

                        const parsedDate = new Date(request.details.date);
                        if (isNaN(parsedDate.getTime()))
                            throw new Error("Invalid date format!");

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (parsedDate < today)
                            throw new Error("You can't choose a past date!");

                        if (request.details.text === '')
                            throw new Error("Please enter your task!");

                    }
                    catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        
                        return request;
                    }
                    request.status = 200
                    db_add_task(request);
                    return request;
            }
            break;
        case "GET":
            switch (act) {
                case "show_all_task":
                    request.status = 200

                    show_all_task(request);
                    console.log(request);

                    return request;
            }
            break;
        case "PUT":
            switch (act) {
                case "is_task_completed":
                    request.status = 200
                    console.log('v');
                    TaskCompleted(request);
                    return request;

            }
            break;
        case "DELETE":
            switch (act) {
                case "remove_task":

                    try {
                        if (request.details.id === '')
                            throw new Error("Please enter id!");

                        if (request.details.id.length !== 4)
                            throw new Error("Invalid id number!");
                    }
                    catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        return request;
                    }
                    request.status = 200
                    console.log('1', request);
                    remove_task_from_sec(request);
                    console.log('2', request);
                    return request;

            }

            break;
    }
}
