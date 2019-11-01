class Board {
    constructor(){
        this.currentSprint;
        this.sprints = [];
    }

    setCurrentSprint(sprint){
        this.currentSprint = sprint;
    }

    getSprints(){
        return this.sprints;
    }

    addSprint(title){
        this.sprints.push(title);
    }
}

module.exports = Board;