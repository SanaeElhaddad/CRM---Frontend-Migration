import { Injectable } from "@angular/core";
import { Setting } from "../../models";
import { EmsService } from "./ems.service";
import { ProxyService } from "./proxy.service";

@Injectable({
  providedIn: "root",
})
export class SettingsService extends EmsService<Setting> {
  constructor(proxy: ProxyService) {
    super(proxy, "settings");
  }
}
