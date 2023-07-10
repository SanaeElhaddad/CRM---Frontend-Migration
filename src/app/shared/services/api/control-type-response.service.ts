import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ControleType } from '../../models/controle-type';
import { ControleTypeResponse } from '../../models/controle-type-response';


@Injectable()
export class ControleTypeResponseService extends EmsService<ControleTypeResponse> {

  constructor(proxy: ProxyService) {
    super(proxy, 'controleTypeResponses');
  }
}
