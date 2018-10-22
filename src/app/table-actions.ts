export interface TableActions {
  confirmEditCreate(updated: any): boolean;
  startEdit(): void;
  cancel(): void;
}
