import { User } from '../../models/user';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { ClientCategory } from '../../models';

@Injectable()
export class ClientService extends EmsService<ClientCategory> {

  constructor(proxy: ProxyService) {
    super(proxy, 'accounts');
  }

}
