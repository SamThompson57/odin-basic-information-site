const http = require('node:http');
const fs = require('fs');
const url = require('node:url');

const hostname = 'localhost';
const port = 8080;

function docSelector(doc){

    switch(doc){
        case '/':
        case '':
            return './index.html';
        
        case '/about':
            return './about.html';
           
        case '/contact-me':
            return './contact-me.html';
        
        default:
            return './404.html';
    }
}

const server = http.createServer(function(req,res){
    const q = url.parse(req.url, true);
    const filename = docSelector(q.pathname)
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text.html'})
            return res.end("404 Not Found")
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });