export  class ClientModel {
  id: number;
  firstName: string;
  lastName: string;
  cin: string;
  mail: string;
  constructor(obj: any) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.cin = obj.cin;
    this.mail = obj.mail;
  }
}
