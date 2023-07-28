import { ProxyService } from "./proxy.service";
import { Devis } from "./../../models/";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DevisService extends EmsService<Devis> {
  constructor(proxy: ProxyService) {
    super(proxy, "deviss");
  }
}
