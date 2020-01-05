const fs = require('fs')
const path = require('path')

//file system

// fs.mkdir(path.join(__dirname, 'notes'),(err)=>{
//     if (err) throw new Error(err)

//     console.log('Folder has been created')
// })

// fs.writeFile(
//     path.join(__dirname,'notes','mynotes.txt'),
//     'hello  world',
//     (err) =>{
//         if(err) throw err
//         console.log('file has been created')

//         fs.appendFile(
//             path.join(__dirname, 'notes','mynotes.txt'),
//             'From append file',
//             err=> {
//                 if(err) throw err
//                 console.log('file has been changed')

//                 fs.readFile(
//                     path.join(__dirname,'notes','mynotes.txt'),
//                     (err,data)=>{
//                         if(err) throw err
//                         console.log(data.toString())
//                     }
//                 )
//             }
//         )
//     }
//     )

fs.rename(
    path.join(__dirname,'notes','mynotes.txt'),
    path.join(__dirname,'notes','notes.txt'),
    err => {
        if(err) throw err

        console.log('File has been renamed')
    }
)
    