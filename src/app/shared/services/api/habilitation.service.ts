import { Privilege } from "./../../models/";
import { ProxyService } from "./proxy.service";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HabilitationService extends EmsService<Privilege> {
  constructor(proxy: ProxyService) {
    super(proxy, "privileges");
  }
}
