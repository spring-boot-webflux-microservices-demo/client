import {Gadget} from './gadget';

export class EmptyGadget implements Gadget {
  id: string;
  type: string;
  specifications: string;

  constructor() {
    this.id = '';
    this.type = '';
    this.specifications = '';
  }
}
