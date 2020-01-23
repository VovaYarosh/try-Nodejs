const Todo = require('../models/todo')

const users = [
    {name:'Igor', age: 30, email: 'igor@mail.ua'},
    {name:'Olena',age:23, email: 'olena@mail.ua'}
]

module.exports = {
    test(){
        return {
            count:Math.trunc(Math.random() * 10),
            users
        }
    },
    random({min,max,count}){
        const arr = []
        for(let i = 0; i < count;i++){
            const random = Math.random() * (max - min) + min
            arr.push(random)
        }
        return arr
    },
    addTestUser({user: {name,email}}){
        const user = {
            name,email,
            age:Math.ceil(Math.random() * 30)
        }
        users.push(user)
        return user
    },
    async getTodos(){
        try{
            return await Todo.findAll()
        }catch(e){
            throw new Error('Fetch todos is not available')
        }
    },
    async createTodo({todo}){
        try{
            return await Todo.create({
                title: todo.title,
                done: false
            })
        }catch(e){
            throw new Error('Title is required')
        }
    },
    async completeTodo({id}){
        try{
            const Todo = await Todo.findByPk(id)
            todo.done = true
            await todo.save()
            return todo
        }catch(e){
            throw new Error('id is required')
        }
    }
}