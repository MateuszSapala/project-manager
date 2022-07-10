export class EditUser {
  editedFields: string[];
  username?: string;
  email?: string;
  name?: string;
  surname?: string;
  admin?: boolean;

  constructor(editedFields: string[], username?: string, email?: string, name?: string, surname?: string, admin?: boolean) {
    this.editedFields = editedFields
    this.username = username
    this.email = email
    this.name = name
    this.surname = surname
    this.admin = admin
    return;
  }
}