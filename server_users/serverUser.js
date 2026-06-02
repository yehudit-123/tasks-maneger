//זה דף שמדמה את פעולת הסרבר- השרת שמקבל בקשות גט, סט, וכו'
//כדי לבצע את זה על המשתמש,, אז אני יכתוב פונקציה שמקבלת בקשה,
//ואם כל הפרטים שהיא קיבלה הם טובים אז היא מנסה 
//
function serverUsers(act, ip, request) {
    if (ip !== '189.22.212.4') {
        request.statusText = 'wrong ip';
        return request
    }
    request.readyState++;
    console.log(act);
    console.log(request);
    // request.readyState++;
    switch (request.method) {
        case "POST":
            switch (act) {
                case "add_sec":
                    try {
                        if (request.details.name === '')
                            throw new Error("Please enter username!");

                        if (request.details.id === '')
                            throw new Error("Please enter ID!");

                        if (request.details.id.length !== 4)
                            throw new Error("ID must be exactly 4 digits!");
                        if (request.details.id === "1111")
                            throw new Error("this is manegers's id, please change id");

                        if (request.details.password === '')
                            throw new Error("Please enter password!");

                        if (request.details.verify === '')
                            throw new Error("Please verify password!");

                        if (request.details.password !== request.details.verify)
                            throw new Error("Passwords do not match!");

                        if (request.details.mail === '')
                            throw new Error("Please enter your email address!");

                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(request.details.mail))
                            throw new Error("Invalid email address!");

                        if (request.details.phone === '')
                            throw new Error("Please enter phone number!");

                        if (request.details.phone.length < 10)
                            throw new Error("Phone number must be 10 digits!");
                    } catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        return request;
                    }

                    request.status = 200
                    db_add_sec(request);
                    return request;

            }
            break;
        case "GET":
            switch (act) {
                case "login":
                    try {
                        if (request.details.name === '')
                            throw new Error("Please enter username!");

                        if (request.details.id === '')
                            throw new Error("Please enter ID!");

                        if (request.details.id.length !== 4)
                            throw new Error("ID must be exactly 4 digits!");

                        if (request.details.password === '')
                            throw new Error("Please enter password!");
                        if (request.details.password.length !== 6)
                            throw new Error("password must be exactly 6 digits!");
                    } catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        
                        return request;
                    }
                    request.status = 200
                    db_login(request);
                    return request;

                case "show_all_sec":
                    request.status = 200
                    db_get_all_sec(request);
                    return request;
                case "get_maneger":
                    request.status = 200
                    db_get_maneger(request);
                    return request

            }
            break;
        case "PUT":
            switch (act) {
                case 'change_sec':
                    try {
                        if (request.details.name === '')
                            throw new Error("Please enter username!");

                        if (request.details.password === '')
                            throw new Error("Please enter password!");

                        if (request.details.verify === '')
                            throw new Error("Please verify password!");

                        if (request.details.password !== request.details.verify)
                            throw new Error("Passwords do not match!");

                        if (request.details.mail === '')
                            throw new Error("Please enter your email address!");

                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(request.details.mail))
                            throw new Error("Invalid email address!");

                        if (request.details.phone === '')
                            throw new Error("Please enter phone number!");

                        if (request.details.phone.length < 10)
                            throw new Error("Phone number must be 10 digits!");
                    } catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        return request;
                    }

                    request.status = 200
                    db_change_sec(request);
                    return request;
                case 'change_maneger':
                    try {
                        if (request.details.name === '')
                            throw new Error("Please enter username!");

                        if (request.details.password === '')
                            throw new Error("Please enter password!");

                        if (request.details.verify === '')
                            throw new Error("Please verify password!");

                        if (request.details.password !== request.details.verify)
                            throw new Error("Passwords do not match!");
                    } catch (error) {
                        console.log(error);
                        request.status = 400;
                        request.statusText = error;
                        return request;
                    }
                    request.status = 200
                    db_change_maneger(request);
                    return request;
            }
            break;
        case "DELETE":
            switch (act) {
                case "remove_sec":
                    request.status = 200
                    // console.log('4');
                    db_remove_sec(request);
                    return request;
            }
            break;
    }
}
