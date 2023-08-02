import { ProxyService } from "./proxy.service";
import { Commercial } from "./../../models/";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommercialService extends EmsService<Commercial> {
  constructor(proxy: ProxyService) {
    super(proxy, "commercials");
  }
}
