import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ControleType } from '../../models/controle-type';
import { ControleTypeResponse } from '../../models/controle-type-response';
import { ControlPlan } from '../../models/control-plan';
import { PlanProduct } from '../../models/plan-product';


@Injectable()
export class PlanProductService extends EmsService<PlanProduct> {

  constructor(proxy: ProxyService) {
    super(proxy, 'planproducts');
  }
}
