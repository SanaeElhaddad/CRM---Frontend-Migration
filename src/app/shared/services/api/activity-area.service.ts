import { ProxyService } from "./proxy.service";
import { ActivityArea } from "./../../models/ActivityArea";
import { Injectable } from "@angular/core";
import { EmsService } from "./ems.service";

@Injectable({
  providedIn: "root",
})
export class ActivityAreaService extends EmsService<ActivityArea> {
  constructor(proxy: ProxyService) {
    super(proxy, "activityAreas");
  }
}
