
function netFun(request) {
    request.readyState++;
    if (failureProbability ()) {
        request.statusText = "fail, please try again"
        console.log("ההודעה אבדה בדרך לשרת ");
        console.log(request.data);
        return request
    }
    // console.log('3');
    let array = request.url.split('/')
    console.log(array);
    let dns = myUrl.returnIP(array[0])
    console.log(dns);
    if (dns.iP === "189.22.212.4") {
        serverUsers(array[1], dns.iP, request)
        return request;
    }

    if (dns.iP === "115.34.211.46") {
        serverActions(array[1], dns.iP, request)
        return request;
    }
    else {
        request.status = 404
        return request;
    }
}
function failureProbability () {
    const random = Math.random();
    if (random < 0.2&&random>0.1) {

        return true;
    }
    return false;
}