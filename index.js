const http = require('http'); // http服务器和客户端模块
const path = require('path') // 该模块提供用于处理文件和目录的路径的工具函数
const url = require('url')  // 该模块用于URL处理和解析
const fs = require('fs') // 文件系统模块
const hostname = '127.0.0.1'
const port = 8080
const server = http.createServer( (req,res) => {
    let pathname = url.parse(req.url).pathname;
    let extname = path.extname(pathname)
    if(pathname == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync(path.join(__dirname,pathname,'index.html')))
    } else if (extname == '.jpg' || extname=='.png') {
        res.writeHead(200, { 'Content-Type': 'image/'+ extname.substr(1)})
        res.end(fs.readFileSync(path.join(__dirname, pathname)))
    } else{
        res.statusCode = 404;
        res.end();
    }
})

server.listen(port,hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
})