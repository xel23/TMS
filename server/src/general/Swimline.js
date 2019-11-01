class Swimline {
    constructor(){
        this.id;
        this.tasks = new Map();
    }

    getId(){
        return this.id;
    }

    addTask(task){
        this.tasks.set(task.getId(), task);
    }

    getTasks(){
        return this.tasks;
    }

    removeTask(task){
       this.tasks.delete(task);
    }
}

module.exports = Swimline;