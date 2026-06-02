class myUrl{
    static IParray = [
    {
        url:'server_users',
        iP:"189.22.212.4"

    },
    {
        url:'server_task',
        iP:"115.34.211.46"

    }
]

static returnIP(url){
return this.IParray.find(ip=>ip.url===url)
 }
}