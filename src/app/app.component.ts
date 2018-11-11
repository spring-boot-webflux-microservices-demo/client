import {Component} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userTitle = 'User';
  gadgetTitle = 'Gadget';
  title = 'client';
  userDescription = 'User content';
  gadgetDescription = 'Gadget content';

  constructor(private router: Router) {
  }

  onTabClick(event: MatTabChangeEvent) {
    const tabText = event.tab.textLabel;

    if (tabText === this.userTitle) {
      this.router.navigateByUrl('/users');
    }

    if (tabText === this.gadgetTitle) {
      this.router.navigateByUrl('/gadgets');
    }

  }
}
