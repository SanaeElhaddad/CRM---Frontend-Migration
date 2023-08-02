import { EmsService } from "./ems.service";
import { ProxyService } from "./proxy.service";
import { Uom } from "../../models/";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UomService extends EmsService<Uom> {
  constructor(proxy: ProxyService) {
    super(proxy, "uoms");
  }
}
