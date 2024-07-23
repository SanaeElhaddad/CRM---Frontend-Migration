import { Injectable } from '@angular/core';
import { EmsService } from './ems.service';
import { Zone } from '../../models/zone';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends EmsService<Zone> {

  constructor(proxy: ProxyService) {
    super(proxy, 'zones');
  }
}


