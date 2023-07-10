import { OrderType } from './../../models/order-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ControleType } from '../../models/controle-type';
import { ControleTypeResponse } from '../../models/controle-type-response';
import { ControlState } from '../../models/control-state';
import { NotificationState } from '../../models/notification-state';


@Injectable()
export class NotificationService extends EmsService<Notification> {

  constructor(proxy: ProxyService) {
    super(proxy, 'notifications');
  }
}
