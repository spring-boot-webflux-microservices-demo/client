import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {GadgetRowTableActions} from './gadget-row-table-actions';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmptyGadget} from './empty-gadget';
import {GadgetService} from './gadget.service';
import {catchError, finalize} from "rxjs/operators";
import {Gadget} from "./gadget";
import {User} from "../user/model/user";

export class GadgetDatasource implements DataSource<GadgetRowTableActions> {
  public gadgetSubject = new BehaviorSubject<GadgetRowTableActions[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptyGadgetRow: GadgetRowTableActions;
  private gadgetRows: GadgetRowTableActions[];

  constructor(private gadgetService: GadgetService) {
    this.gadgetRows = [];
  }

  getAllGadgetsInTable() {
    this.gadgetService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(gadgets => {
      this.gadgetRows = gadgets.map(g => new GadgetRowTableActions(g, this.gadgetService));
      this.gadgetSubject.next(this.gadgetRows);
    });
  }

  addEmptyGadget() {
    this.emptyGadgetRow = new GadgetRowTableActions(new EmptyGadget(), this.gadgetService);
    this.emptyGadgetRow.editing = true;
    this.emptyGadgetRow.focus = true;
    this.gadgetRows.push(this.emptyGadgetRow);
    this.gadgetSubject.next(this.gadgetRows);
  }

  add(row: GadgetRowTableActions): void {
    row.editing = false;
    row.focus = false;
    row.gadget.id === undefined ? this.saveNewGadget(row.gadget) : this.updateExistingGadget(row.gadget);
  }

  private saveNewGadget(gadget: Gadget): void {
    this.gadgetService.saveGadget(gadget).subscribe();
  }

  private updateExistingGadget(gadget: Gadget): void {
    this.gadgetService.updateGadget(gadget).subscribe();
  }

  delete(gadget: Gadget): void {
    this.gadgetService.deleteGadget(gadget).subscribe(() => {
      this.gadgetRows = this.gadgetRows.filter(item => item.gadget !== gadget);
      this.gadgetSubject.next(this.gadgetRows);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<GadgetRowTableActions[]> {
    return this.gadgetSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.gadgetSubject.complete();
    this.loadingSubject.complete();
  }
}
