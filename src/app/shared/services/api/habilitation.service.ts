import { ProxyService } from "./proxy.service";
import { Habilitation } from "./../../models/";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HabilitationService extends EmsService<Habilitation> {
  constructor(proxy: ProxyService) {
    super(proxy, "habilitations");
  }
}
