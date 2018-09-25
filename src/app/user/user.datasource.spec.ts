import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {UserDatasource} from './user.datasource';
import {HttpClientModule} from '@angular/common/http';

describe('userDatasource', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
  });

  fit('should fill table with all users', () => {
    const userService = TestBed.get(UserService);
    const userDatasource = new UserDatasource(userService);

    userDatasource.getAllUsersInTable();

    console.log('test');
  });


});
