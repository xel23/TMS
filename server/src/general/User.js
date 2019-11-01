class User {
    constructor() {
        this.id = 0;
        this.name;
        this.role;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getRole() {
        return this.role;
    }

    setRole(role) {
        this.role = role;
    }

    getId() {
        return this.id;
    }
}

module.exports = User;