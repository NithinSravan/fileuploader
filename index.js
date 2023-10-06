const http=require('http')
const fs =require('fs');
const path =require('path')

const httpServer=http.createServer();

const PORT= process.env.PORT || 3000; 

httpServer.on("listening",()=>{
    console.log(`Server running on port: ${PORT}`)
});

httpServer.on("request",(req,res)=>{

    let filepath = path.join(__dirname,req.url==='/'?'index.html':req.url)

    let extname=path.extname(filepath)
    let contentType='text/html'
    switch(extname){
        case '.js':
            contentType='text/javascript'
            break;
        case '.css':
            contentType='text/css'
            break;
    }  
    fs.readFile(filepath, function(error, data) {  
        if (error) {  
            res.writeHead(404);  
            res.end('this page does not exist');
        } else {  
            res.writeHead(200, {  
                'Content-Type': contentType
            }); 
            res.end(data);  
        } 

    });
})

httpServer.listen(PORT);            