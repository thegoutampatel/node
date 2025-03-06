const http = require("http")
const fs = require('fs')
const path = require('path')

const port = 3000

//1. Create a Server and Listen on port.
//2. path : it provide directory paths.
//3. http : http req,res. -> reads the url 
const server = http.createServer((req, res) => {
    //filePath : provides the current path -> path.join(__dirname) .

    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url );
    // console.log(filePath)

    //convert in string in lowerCase.
    const extName = String(path.extname(filePath).toLowerCase())

    //mimeType : what types it support.
    const mimeType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'text/png',
    }
    
    //application/octet-stream : ---------------

    const contentType = mimeType[extName] || 'application/octet-stream';

    //fs.readFile : it read the file and use callback that after what -> it has first (error) than (content) .
    //err.code: ENOENT(Contnt not found or file not found)
    //else : 200(success) -> provide the contnt and end with contnt 
    fs.readFile(filePath, (err, content)=> {
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404, {"Content-Type": 'text/html'});
                res.end('404: File Not Found Brooo')
            }
        }else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })

});

server.listen(port, ()=>{
    console.log(`Server is Listning on ${port}`)
})


