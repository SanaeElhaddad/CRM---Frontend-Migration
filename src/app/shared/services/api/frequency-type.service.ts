import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ControleType } from '../../models/controle-type';
import { ControleTypeResponse } from '../../models/controle-type-response';
import { FrequencyType } from '../../models/frequency-type';


@Injectable()
export class FrequencyTypeService extends EmsService<FrequencyType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'frequencytypes');
  }
}
