import { OrderType } from '../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

import { Process } from '../../models/process';


@Injectable()
export class ProcessService extends EmsService<Process> {

  constructor(proxy: ProxyService) {
    super(proxy, 'process');
  }
}
