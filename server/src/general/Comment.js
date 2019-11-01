class Comment {
    constructor(){
        this.id;
        this.author;
        this.createDate;
        this.relatedTask;
        this.message;
    }

    getId(){
        return this.id;
    }

    setAuthor(author){
        this.author = author;
    }

    getAuthor(){
        return this.author;
    }

    setCreateDate(){
        this.createDate = new Date();
    }

    setRelatedTask(task){
        this.relatedTask = task;
    }

    getRelatedTask(){
        return this.relatedTask;
    }

    setMessage(message){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }
}

module.exports = Comment;