import { Vat } from './../../models/vat';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class VatService extends EmsService<Vat> {

    constructor(proxy: ProxyService) {
      super(proxy, 'vats');
    }
}
