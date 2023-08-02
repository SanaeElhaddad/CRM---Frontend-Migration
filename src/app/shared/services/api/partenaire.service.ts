import { EmsService } from "./ems.service";
import { ProxyService } from "./proxy.service";
import { Injectable } from "@angular/core";
import { Distributor } from "../../models/Distributor";

@Injectable({
  providedIn: "root",
})
export class PartenaireService extends EmsService<Distributor> {
  constructor(proxy: ProxyService) {
    super(proxy, "distributors");
  }
}
