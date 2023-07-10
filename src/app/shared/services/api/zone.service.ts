import { Zone } from './../../models/Zone';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ZoneServcie extends EmsService<Zone> {

    constructor(proxy: ProxyService) {
      super(proxy, 'zones');
    }
}
