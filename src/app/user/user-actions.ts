export interface UserActions {
  delete(): void;
  confirmEditCreate(): boolean;
  startEdit(): void;
  cancel(): void;
}
