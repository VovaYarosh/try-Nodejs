const http = require('http')

const server = http.createServer((req,res)=>{
    console.log(req.url)

    res.write('hello from node js')
    res.end(`
        <div style="background:red; width:200px; height:200px;">
        <h1>Test</h1>
        </div>
    `)
})

server.listen(3000,()=>{
    console.log('Server is running...')
})