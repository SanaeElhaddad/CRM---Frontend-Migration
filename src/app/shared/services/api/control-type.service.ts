import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ControleType } from '../../models/controle-type';


@Injectable()
export class ControleTypeService extends EmsService<ControleType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'controleTypes');
  }
}
