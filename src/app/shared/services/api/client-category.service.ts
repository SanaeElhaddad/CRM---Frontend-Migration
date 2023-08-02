import { ProxyService } from "./proxy.service";
import { Injectable } from "@angular/core";
import { ClientCategory } from "../../models";
import { EmsService } from "./ems.service";

@Injectable({
  providedIn: "root",
})
export class ClientCategoryService extends EmsService<ClientCategory> {
  constructor(proxy: ProxyService) {
    super(proxy, "clientCategories");
  }
}
