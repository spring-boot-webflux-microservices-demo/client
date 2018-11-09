import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {EmptyGadget} from './empty-gadget';
import {GadgetService} from './gadget.service';
import {catchError, finalize} from 'rxjs/operators';
import {Gadget} from './gadget';
import {GadgetTableRow} from './gadget-table-row';

export class GadgetDatasource implements DataSource<GadgetTableRow> {
  public gadgetSubject = new BehaviorSubject<GadgetTableRow[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptyGadgetRow: GadgetTableRow;
  private gadgetRows: GadgetTableRow[];

  constructor(private gadgetService: GadgetService) {
    this.gadgetRows = [];
  }

  getAllGadgetsInTable(): void {
    this.gadgetService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(gadgets => {
      this.gadgetRows = gadgets.map(g => new GadgetTableRow(g));
      this.gadgetSubject.next(this.gadgetRows);
    });
  }

  onEditStart(row: GadgetTableRow): void {
    row.editing = true;
    row.focus = true;
  }

  onAdd(row: GadgetTableRow): void {
    row.editing = false;
    row.focus = false;
    row.gadget.id === undefined ? this.saveNewGadget(row.gadget) : this.updateExistingGadget(row.gadget);
  }

  onDelete(row: GadgetTableRow): void {
    this.gadgetService.deleteGadget(row.gadget).subscribe(() => {
      this.gadgetRows = this.gadgetRows.filter(item => item.gadget !== row.gadget);
      this.gadgetSubject.next(this.gadgetRows);
    });
  }

  addEmptyGadget() {
    this.emptyGadgetRow = new GadgetTableRow(new EmptyGadget());
    this.emptyGadgetRow.editing = true;
    this.emptyGadgetRow.focus = true;
    this.gadgetRows.push(this.emptyGadgetRow);
    this.gadgetSubject.next(this.gadgetRows);
  }

  connect(collectionViewer: CollectionViewer): Observable<GadgetTableRow[]> {
    return this.gadgetSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.gadgetSubject.complete();
    this.loadingSubject.complete();
  }

  private saveNewGadget(gadget: Gadget): void {
    this.gadgetService.saveGadget(gadget).subscribe();
  }

  private updateExistingGadget(gadget: Gadget): void {
    this.gadgetService.updateGadget(gadget).subscribe();
  }

}
