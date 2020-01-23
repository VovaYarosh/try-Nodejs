new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
      return {
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
      const query = `
        query{
          getTodos{
            id title done createdAt uodatedAt
          }
        }
      `

      fetch('/graphql',{
        method: 'post',
        headers: {
          "Content-Type":"application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then( repsonse => {
        this.todos = repsonse.data.getTodos
      })
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim();
        if (!title){
           return
        }
        //робим запит до бекенду за допомогою фетч
        fetch('/api/todo',{
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title})
        })
        .then(res => res.json())
        .then(({todo}) =>{
          console.log(todo)
          this.todos.push(todo)
          this.todoTitle = '';
        }) 
        .catch(e => console.log(e))
      },
      removeTodo(id) {
        fetch('/api/todo' + id,{
          method:'delete'
        })
        .then(()=>{
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch(e => console.log(e))
      },
      completeTodo(id){
        fetch('/api.todo' + id,{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({done: true})
        })
        .then(res => res.json())
        .then(({todo})=>{
          const idx = this.todos.findIndex(t => t.id === todo.id)
          this.todos[idx].updatedAt = todo.updatedAt
        })
        .catch(e => console.log(e))
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1);
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }
        if(withTime){
          options.hour = '2-digit'
          options.minute = '2-digit'
          options.second = '2-digit'
        }

        return new Intl.DateTimeFormat('en-En', options).format(new Date(value));
      }
    },
    created () {
      this.$vuetify.theme.dark = true;
    },
  });