import { StatusDevis } from "./../../../shared/models/StatusDevis";
import { Account } from "./../../../shared/models/accounts";
import { Subscription } from "rxjs";
import { DevisService } from "./../../../shared/services/api/devis.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Devis } from "./../../../shared/models/";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MenuItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-devis-edit",
  templateUrl: "./devis-edit.component.html",
  styleUrls: ["./devis-edit.component.css"],
})
export class DevisEditComponent implements OnInit {
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  formEditForm: FormGroup;
  switchDisabledInput: boolean = true;
  selectedDevis: Devis = new Devis();
  subscriptions = new Subscription();
  statusDevis: StatusDevis[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private devisService: DevisService
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
          this.statusDevis = this.statusDevis || [];
          this.statusDevis.push(this.selectedDevis.statusDevis);
          this.switchDisabledInput = false;
          this.initForm();
        })
      );
    } else {
      this.selectedDevis = new Devis();
      this.initForm();
    }
  }

  initForm(): void {
    console.log(this.selectedDevis.addressByDeliveryDeliveryAddress.city);

    this.formEditForm = this.formBuilder.group({
      devisCode: [this.selectedDevis.code],
      clientCodeDevis: [this.selectedDevis.account?.accountCode],
      clientNameDevis: [this.selectedDevis.account?.accountName],
      statusDevis: [this.selectedDevis.statusDevis?.statusDevisCode],
      devisVersion: [this.selectedDevis.version],
      opportunityDevis: [this.selectedDevis.lead?.leadCode],
      commercialDevis: [this.selectedDevis.commercial?.code],
      partenaireDevis: [this.selectedDevis.distributor?.code],
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
    });
  }
}
