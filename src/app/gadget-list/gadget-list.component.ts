import {Component, OnInit} from '@angular/core';
import {GadgetService} from '../gadget/gadget.service';

@Component({
  selector: 'app-gadget-list',
  templateUrl: './gadget-list.component.html',
  styleUrls: ['./gadget-list.component.css']
})
export class GadgetListComponent implements OnInit {
  gadgets: Array<any>;
  gadgetColumns: string[] = ['position', 'type', 'specifications'];

  constructor(private gadgetService: GadgetService) {
  }

  ngOnInit() {
    this.gadgetService.getAll().subscribe(g => {
      this.gadgets = g;
    });
  }

}
