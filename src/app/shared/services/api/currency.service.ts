import { ProxyService } from './proxy.service';
import { Currency } from './../../models/Currency';
import { Injectable } from '@angular/core';
import { EmsService } from './ems.service';



@Injectable({
  providedIn: "root",
})
export class CurrencyService extends EmsService<Currency> {
  constructor(proxy: ProxyService) {
    super(proxy, "currencies");
  }
}
