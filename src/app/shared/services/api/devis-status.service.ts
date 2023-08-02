import { ProxyService } from "./proxy.service";
import { EmsService } from "./ems.service";
import { StatusDevis } from "./../../models/";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DevisStatusService extends EmsService<StatusDevis> {
  constructor(proxy: ProxyService) {
    super(proxy, "statusDevis");
  }
}
