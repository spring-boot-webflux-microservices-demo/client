import {User} from './user';

export interface UserActions {
  delete(): void;
  confirmEditCreate(updatedUser: User): boolean;
  startEdit(): void;
  cancel(): void;
}
