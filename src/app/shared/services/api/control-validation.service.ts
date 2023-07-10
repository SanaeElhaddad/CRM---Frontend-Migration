import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

import { ControlValidation } from '../../models/control-validation';


@Injectable()
export class ControlValidationService extends EmsService<ControlValidation> {

  constructor(proxy: ProxyService) {
    super(proxy, 'controlValidations');
  }
}
