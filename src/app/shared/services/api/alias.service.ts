import { Injectable } from '@angular/core';
import { Alias } from '../../models/alias';
import { EmsService } from './ems.service';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AliasService extends EmsService<Alias>{

constructor(proxy:ProxyService) {
  super(proxy,'aliass')
 }

}
