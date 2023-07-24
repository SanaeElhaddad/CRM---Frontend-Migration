import { ProxyService } from "./proxy.service";
import { BusinessType } from "./../../models/BusinessType";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BusinessTypeService extends EmsService<BusinessType> {
  constructor(proxy: ProxyService) {
    super(proxy, "businesstype");
  }
}
