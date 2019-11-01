class BoardComponent {
    constructor(){
        this.id;
        this.title;
    }

    getId(){
        return this.id;
    }

    setTitle(title){
        this.title = title;
    }

    getTitle(){
        return this.title;
    }
}

module.exports = BoardComponent;