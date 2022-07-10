export class AddUser {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  admin: boolean;

  constructor(username: string, password: string, email: string, name: string, surname: string, admin: boolean) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.admin = admin;
    return;
  }
}