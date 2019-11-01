class Task {
    constructor() {
        this.createDate;
        this.updateDate;
        this.priority;
        this.type;
        this.assignee;
        this.state;
        this.description;
        this.comments = [];
    }

    getCreateDate() {
        return this.createDate;
    }

    setCreateDate() {
        this.createDate = new Date();
    }

    getUpdateDate() {
        return this.updateDate;
    }

    setUpdateDate() {
        this.updateDate = new Date();
    }

    getPriority() {
        return this.priority;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getAssignee() {
        return this.assignee;
    }

    setAssignee(user) {
        this.assignee = user;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    getComments() {
        return this.comments;
    }
}

module.exports = Task;