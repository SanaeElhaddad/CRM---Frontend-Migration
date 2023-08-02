import { Injectable } from "@angular/core";
import { PrerequisiteType } from "../../models";
import { EmsService } from "./ems.service";
import { ProxyService } from "./proxy.service";

@Injectable({
  providedIn: "root",
})
export class PrerequisteTypeService extends EmsService<PrerequisiteType> {
  constructor(proxy: ProxyService) {
    super(proxy, "prerequisitetype");
  }
}
