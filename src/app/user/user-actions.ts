import {User} from './user';

export interface UserActions {
  confirmEditCreate(updatedUser: User): boolean;
  startEdit(): void;
  cancel(): void;
}
