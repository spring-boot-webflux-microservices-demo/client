import {TableActions} from '../table-actions';
import {GadgetService} from './gadget.service';
import {Gadget} from './gadget';

export class GadgetRowTableActions implements TableActions {
  editing: boolean;
  focus: boolean;

  constructor(public gadget: Gadget, private gadgetService: GadgetService) {
    this.editing = false;
    this.focus = false;
  }
  cancel(): void {
  }

  confirmEditCreate(updatedGadget: Gadget): boolean {
    this.editing = false;
    this.focus = false;
    this.gadgetService.saveGadget(updatedGadget).subscribe();
    return false;
  }

  startEdit(): void {
    this.editing = true;
    this.focus = true;
  }

}
