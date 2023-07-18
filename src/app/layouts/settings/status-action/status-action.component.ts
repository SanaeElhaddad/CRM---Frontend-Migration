import { MessageService } from "primeng/api";
import { ActionStatusService } from "./../../../shared/services/api/action-status.service";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { StatusAction } from "../../../shared/models";

@Component({
  selector: 'app-status-action',
  templateUrl: './status-action.component.html',
  styleUrls: ['./status-action.component.css']
})
export class StatusActionComponent implements OnInit {

  constructor() { }
    private spinner: NgxSpinnerService,
    private actionStatusService: ActionStatusService,
    private messageService: MessageService

  ngOnInit(): void {
    this.subscriptions.add(
      this.actionStatusService.findAll().subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: JSON.stringify(error),
          });
        }
      )
    );
  }

}
