const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()


//отримання списку задач
router.get('/',async (req,res)=>{
    try{
        const todos = await Todo.findAll()
        res.status(200).json(todos)
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:'Server error'
        })
    }
})

//створення нової задачі
router.post('/',async (req,res)=>{
    try{
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:'Server error'
        })
    }
})

//змінення задачі коли натискаєм на чекбокс
//потрібно зрозуміти яке туду буде оброблятись,тому до шляху додаєьбся динамічний Айді
router.put('/:id',(req,res)=>{
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({
            message:'Server error'
        })
    }
})

//потрібно зрозуміти яке туду ми буде видалятись,тому до шляху додаєьбся динамічний Айді
router.delete('/:id',async (req,res)=>{
    try{
        //метод create робить з початку білд і потім зразу авт. зберігає
        //в метод  create парадаєм параметри які будем забирати з фронтенда
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
        //цей стратус каже що обєкт був створений
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:'Server error'
        })
    }
})

module.exports = router