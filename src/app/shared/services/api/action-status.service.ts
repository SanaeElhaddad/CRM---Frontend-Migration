import { ProxyService } from './proxy.service';
import { EmsService } from './ems.service';
import { StatusAction } from './../../models/StatusAction';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionStatusService extends EmsService<StatusAction>{

  constructor(proxy: ProxyService) {
    super(proxy, 'statusActions');
   }
}
