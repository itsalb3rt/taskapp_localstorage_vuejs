new Vue({
    el: '#appvue',
    created:function(){
        this.get_tasks_from_local_storage();
    },
    data: {
        taskList: [],
        newTask: '',
        message:'',
        searchValue:'',
    },
    methods: {
        appTask: function () {
            if(this.newTask != '' && this.newTask.length > 5){
                this.taskList.push({
                    id: this.taskList.length +1 ,
                    task:this.newTask,
                    create_at: get_date_time(),
                    complete_at: null,
                    completed:false,
                });
                this.newTask = '';
                this.message = '';
                this.save_tasks_local_storage();
            }else{
                this.message = 'Debe agregar una tarea valida';
            }
        },
        completeTask:function(idTask){
            /**
             * Se actualiza la fecha de actualaizacion de la tarea
             **/
            for(let item in this.taskList){
                if(this.taskList[item].id == idTask){
                    this.taskList[item].complete_at = get_date_time();
                    if(this.taskList[item].completed == true){
                        this.taskList[item].completed = false;
                    }else{
                        this.taskList[item].completed = true;
                    }

                    this.save_tasks_local_storage();
                    break;
                }
            }
        },
        removeTask:function (idTask) {
            /**
             * Se elimina una tarea segun su id, esto busca dentro
             * del arreglo por el id, hasta encontrar la coincidencia
             * para pasarle la posicion del arreglo principal
             **/
            for(let item in this.taskList){
                if(this.taskList[item].id == idTask){
                    this.taskList.splice(item,1);
                    this.save_tasks_local_storage();
                    break;
                }
            }
        },
        get_tasks_from_local_storage:function(){
            if (localStorage.getItem('tasks') !== null) {
                this.taskList = JSON.parse(window.localStorage.getItem('tasks'));
            }
        },
        save_tasks_local_storage:function(){
            window.localStorage.setItem('tasks', JSON.stringify(this.taskList));
        }
    },
    computed: {
        filterTasks: function () {
            return this.taskList.filter((item) => item.task.toUpperCase().includes(this.searchValue.toUpperCase()));
        }
    }
});

/**
 * Reotorna fecha en formato yyyy-mm-dd hh:ii:ss
 **/
function get_date_time(){
    let date = new Date().toISOString().slice(0, 10);
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return date + ' ' + hours + ':' + minutes + ':' + seconds;
}