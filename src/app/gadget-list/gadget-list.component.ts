import {Component, OnInit} from '@angular/core';
import {GadgetService} from '../gadget/gadget.service';
import {UserDatasource} from "../user/user.datasource";
import {GadgetDatasource} from "../gadget/gadget.datasource";

@Component({
  selector: 'app-gadget-list',
  templateUrl: './gadget-list.component.html',
  styleUrls: ['./gadget-list.component.css']
})
export class GadgetListComponent implements OnInit {
  dataSource: GadgetDatasource;
  gadgetColumns: string[] = ['position', 'type', 'specifications', 'actions'];

  constructor(private gadgetService: GadgetService) {
  }

  ngOnInit() {
    this.dataSource = new GadgetDatasource(this.gadgetService);
    this.dataSource.getAllGadgetsInTable();
    }
  }

