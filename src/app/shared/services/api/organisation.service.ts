import { ProxyService } from "./proxy.service";
import { Organisation } from "./../../models";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrganisationService extends EmsService<Organisation> {
  constructor(proxy: ProxyService) {
    super(proxy, "organisations");
  }
}
