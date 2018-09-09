import {User} from './user';

export class EmptyUser implements User {
  age: number;
  firstName: string;
  id: string;
  lastName: string;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
  }
}
