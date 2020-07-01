const http = require("http");
const socket = require("socket.io");

const server = http.createServer((request, response) => {
    response.end("...");
});
server.listen(3000);
//3000 portuna gelecek olan tüm istekleri socket tarafından dinlememiz gerekmektedir.
const io = socket.listen(server);
//socket tarafından ilgili server dinlenmeye alınmıştır. Dolayısıyla gelecek olan tüm talepler socket tarafından yakalanacaktır.
//Bu şekilde her talep neticesinde server ile client arasında aktif bir TCP bağlantısı oluşturulacaktır.

io.sockets.on("connection", socket => {
    console.log("kullanıcı baglandı.");

    socket.on('new-user',(data)=>{
        //console.log(data.name);
        socket.broadcast.emit("user",{name:data.name});
    })

    socket.on('disconnet',()=>{
        console.log("kullanıcı ayrıldı");
    })
});
