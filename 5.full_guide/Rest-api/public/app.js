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
    methods: {
      addTodo() {
        const title = this.todoTitle.trim();
        if (!title) return;
        this.todos.push({
          title: title,
          id: Math.random(),
          done: false,
          date: new Date()
        });
        this.todoTitle = '';
      },
      removeTodo(id) {
        this.todos = this.todos.filter((t) => t.id !== id);
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1);
      },
      date(value) {
        return new Intl.DateTimeFormat('en-En', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(value));
      }
    },
    created () {
      this.$vuetify.theme.dark = true;
    },
  });