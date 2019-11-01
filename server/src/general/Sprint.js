class Sprint {
    constructor(){
        this.fromDate;
        this.toDate;
        this.swimlines = [];
    }

    getId(){
        return this.id;
    }

    setFromDate(date){
        this.fromDate = date;
    }

    getFromDate(){
        return this.fromDate;
    }

    setToDate(date){
        this.toDate = date;
    }

    getToDate(){
        return this.toDate;
    }

    addSwimline(swimline){
        this.swimlines.push(swimline);
    }

    getSwimlines(){
        return this.swimlines;
    }
}

module.exports = Sprint;