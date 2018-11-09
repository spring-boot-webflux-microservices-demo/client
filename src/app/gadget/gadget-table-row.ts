import {Gadget} from './gadget';

export class GadgetTableRow {
  editing: boolean;
  focus: boolean;
  gadget: Gadget;

  constructor(gadget: Gadget) {
    this.editing = false;
    this.focus = false;
    this.gadget = gadget;
  }

}
