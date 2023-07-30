import { ProxyService } from "./proxy.service";
import { Lead } from "./../../models/";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OppurtunityService extends EmsService<Lead> {
  constructor(proxy: ProxyService) {
    super(proxy, "leads");
  }
}
