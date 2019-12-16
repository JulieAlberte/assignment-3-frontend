export class User {
    name?: String;
    email: String;
    password: String;
    constructor(email: String, password: String, name?: String) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}