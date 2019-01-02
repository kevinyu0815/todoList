// vue一個app記得要加new
// todos的資料是存array，array裡才是物件
var app = new Vue({
    el: "#app",
    data: {
        todos:[
            {
                id: "123",
                title: "洗衣服",
                completed: false
            }
        ],
        newTodo: "",
        visibility: "all", // 三種頁籤class的切換條件
        onEdit: {},
        onEditTitle: "", // 暫存修該後的標題(不見得會真的修改)
    },
    methods: {
        addTodo: function(){
            var value = this.newTodo.trim();
            var timestamp = Math.floor(Date.now());
            // 新增時不能是空白!!!
            if (!value){
                return;
            }
            var newOne = {
                id: timestamp,
                title: value,
                completed: false
            };
            // 記得加this
            this.todos.push(newOne);
            this.newTodo = "";
        },
        deleteTodo: function(item){
            // 用vm是因為指向不同，如果forEach內用this，指的「不會是」上面的整個vue物件!!是全域
            var vm = this;
            vm.todos.forEach(function(e, index){
                if(e.id == item.id){
                    vm.todos.splice(index, 1);
                }
            });
        },
        editTodo: function(item){
            this.onEdit = item;
            this.onEditTitle = item.title;
        },
        // 取消編輯也記得另外寫methods來控制比較好
        cancelEdit: function(event){
            if (!event || event.target.id != "edit"){
                this.onEdit = {};
            }
        },
        doneEdit: function(item){
            item.title = this.onEditTitle;
            this.onEdit = {};
        },
        deleteAll: function(){
            // 記得是陣列!
            this.todos = [];
            console.log(this.todos);
        },
    },
    computed: {
        filterTodos: function(){
            // 有簡化後
            var visibility = this.visibility;
            if (visibility == 'all'){
                return this.todos;
            }
            else{
                var showTodos = [];
                this.todos.forEach(function(e){
                    if(!e.completed && visibility == 'active'){
                        showTodos.push (e);
                    }
                    else if (e.completed && visibility == 'completed'){
                        showTodos.push (e);
                    }
                });
                return showTodos;
            }
        },
        undoNum: function(){
            var num = 0;
            this.todos.forEach(function(e){
                if (!e.completed){
                    num += 1;
                }
            });
            return num;
        }
    },
});