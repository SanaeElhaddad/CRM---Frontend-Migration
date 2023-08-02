import { ProxyService } from "./proxy.service";
import { StatusAction } from "./../../models/";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ActionStatusService extends EmsService<StatusAction> {
  constructor(proxy: ProxyService) {
    super(proxy, "statusActions");
  }
}
