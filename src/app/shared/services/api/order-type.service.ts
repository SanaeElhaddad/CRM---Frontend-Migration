import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class OrderTypeService extends EmsService<OrderType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'orderTypes');
  }
}
