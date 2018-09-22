import {User} from './user';

export class EmptyUser implements User {
  id: string;
  age: number;
  firstName: string;
  lastName: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.age = 0;
  }

}
