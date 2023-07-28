import { Account } from "./../../models/";
import { User } from "../../models/user";
import { EmsService } from "./ems.service";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ProxyService } from "./proxy.service";
import { ClientCategory } from "../../models";

@Injectable({
  providedIn: "root",
})
export class AccountService extends EmsService<Account> {
  constructor(proxy: ProxyService) {
    super(proxy, "accounts");
  }
}
