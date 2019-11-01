class TasksList {
    constructor() {
        this.userId;
        this.tasks = [];
        this.permission;
    }

    checkPermission(user) {
        //TODO: add behavior
    }

    getTasks() {
        return this.tasks;
    }

    requestTask(user) {
        //TODO: add behavior
    }

    searchTask(query) {
        //TODO: add behavior
    }
}