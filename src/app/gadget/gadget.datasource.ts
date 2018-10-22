import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {GadgetRowTableActions} from './gadget-row-table-actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {EmptyGadget} from './empty-gadget';
import {GadgetService} from './gadget.service';

export class GadgetDatasource implements DataSource<GadgetRowTableActions> {
  public gadgetSubject = new BehaviorSubject<GadgetRowTableActions[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptyGadget: EmptyGadget;
  private gadgetRows: GadgetRowTableActions[];

  constructor(private gadgetService: GadgetService) {
    this.gadgetRows = [];
  }

  getAllGadgetsInTable() {

  }

  connect(collectionViewer: CollectionViewer): Observable<GadgetRowTableActions[]> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
