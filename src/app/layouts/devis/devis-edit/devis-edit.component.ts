import { DevisStatusService } from "./../../../shared/services/api/devis-status.service";
import { AccountService } from "./../../../shared/services/api/accounts.service";
import { StatusDevis } from "./../../../shared/models/StatusDevis";
import { Account } from "./../../../shared/models/accounts";
import { Subscription } from "rxjs";
import { DevisService } from "./../../../shared/services/api/devis.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Devis } from "./../../../shared/models/";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MenuItem, MessageService } from "primeng/api";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-devis-edit",
  templateUrl: "./devis-edit.component.html",
  styleUrls: ["./devis-edit.component.css"],
})
export class DevisEditComponent implements OnInit, OnDestroy {
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  formEditForm: FormGroup;
  switchDisabledInput: boolean = true;
  selectedDevis: Devis = new Devis();
  subscriptions = new Subscription();
  statusDevis = new Array<StatusDevis>();
  codeClientList = new Array<Account>();
  editCommercialDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private devisService: DevisService,
    private accountService: AccountService,
    private messageService: MessageService,
    private devisStatusService: DevisStatusService
  ) {}

  ngOnInit(): void {
    this.itemsBreadcrumb = [
      { label: "Vente" },
      { label: "Devis" },
      { label: "edit" },
    ];

    this.homeBreadcrumb = { icon: "pi pi-home", routerLink: "/" };

    const idDevis: number = this.activatedRoute.snapshot.params["id"];
    if (idDevis) {
      this.subscriptions.add(
        this.devisService.findById(idDevis).subscribe((data) => {
          this.selectedDevis = data;
          this.switchDisabledInput = false;
          this.editCommercialDisabled = true;
          this.initForm();
          //initialise p-dropdown with the status of the selected Devis
          this.statusDevis.push(this.selectedDevis.statusDevis);
        })
      );
    } else {
      this.selectedDevis = new Devis();
      //initialise p-dropdown with the object containing 'ATTENTE' as statusDevisCode
      this.subscriptions.add(
        this.devisStatusService
          .find("statusDevisCode~ATTENTE")
          .subscribe((status) => this.statusDevis.push(status[0]))
      );
      this.generateCodeDevis();
    }
  }

  initForm(): void {
    this.formEditForm = this.formBuilder.group({
      devisCode: [this.selectedDevis.code],
      clientCodeDevis: [this.selectedDevis.account],
      clientNameDevis: [this.selectedDevis.account],
      statusDevis: [this.selectedDevis.statusDevis?.statusDevisCode],
      devisVersion: [this.selectedDevis.version],
      opportunityDevis: [this.selectedDevis.lead],
      commercialDevis: [this.selectedDevis.commercial],
      partenaireDevis: [this.selectedDevis.distributor],
      prixHTDevis: [this.selectedDevis.totalPriceHT],
      TvaDevis: [this.selectedDevis.vat],
      remiseDevis: [this.selectedDevis.discount],
      PrixTTCDevis: [this.selectedDevis.totalPriceTTC],
      firstLineAddress: [
        this.selectedDevis.addressByDeliveryDeliveryAddress?.line1,
      ],
      secondLineAddress: [
        this.selectedDevis.addressByDeliveryDeliveryAddress?.line2,
      ],
      codeZip: [this.selectedDevis.addressByDeliveryDeliveryAddress?.zip],
      ville: [this.selectedDevis.addressByDeliveryDeliveryAddress?.city],
      pays: [this.selectedDevis.addressByDeliveryDeliveryAddress?.country],
      description: [this.selectedDevis.description],
      remarques: [this.selectedDevis.remarks],
    });
  }
  generateCodeDevis() {
    this.subscriptions.add(
      this.devisService.generateCode().subscribe((code) => {
        this.selectedDevis.code = code.replace(/\"/g, "");
        this.initForm();
      })
    );
  }

  onCodeClientSearch(event) {
    this.subscriptions.add(
      this.accountService.find("accountCode~" + event.query).subscribe(
        (data) => {
          this.codeClientList = data;
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        }
      )
    );
  }

  onCommercialSearch(event) {}

  onOppurtunitySearch(event) {}

  fillUsingCodeClient(event: Account) {
    console.log(event.accountName);
    console.log(event.accountAddress);

    this.formEditForm.patchValue({
      clientNameDevis: event,
      ville: event.accountAddress.adrCity,
      pays: event.accountAddress.adrCountry,
      codeZip: event.accountAddress.adrZip,
      firstLineAddress: event.accountAddress.adrLine1,
      secondLineAddress: event.accountAddress.adrLine2,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
