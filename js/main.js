(() => {
  'use strict';

  let now_date = moment();

  let date_format = 'YYYY:MM:DD HH:mm:ss';

  let set_time = moment('app.setTime');


  setInterval(() => {
    app.nowdate = moment().format(date_format)
  }, 1000);

  const app = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: [],
      setTime: '',
      nowdate: now_date.format(date_format),

    },
    watch: {
        todos: {
          handler: function() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
          },
          deep: true
        }
      },
      mounted: function() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
      },
    methods: {
      addItem: function(event) {
        if (this.newItem == '' || this.setTime == '') return alert("未入力のものがあります");
        let todo = {
          item: this.newItem,
          isDone: false,
          settime: this.setTime,
        }
        this.todos.push(todo);
        this.newItem = '';
        this.setTime = '';

      },
      deleteItem: function(index) {
        this.todos.splice(index, 1)
      },
      cleanItem: function() {
        this.todos = this.todos.filter(function(val) {
          return val.isDone == false;
        })
      },

    },
    computed: {
      remaining: function() {
        return this.todos.filter(function(val){
          return val.isDone;
        }).length;
      }
    }



  })



})();
