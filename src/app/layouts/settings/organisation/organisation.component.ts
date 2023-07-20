import { MessageService } from "primeng/api";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Organisation } from "./../../../shared/models/Organisation";
import { OrganisationService } from "./../../../shared/services/api/organisation.service";
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-organisation",
  templateUrl: "./organisation.component.html",
  styleUrls: ["./organisation.component.css"],
})
export class OrganisationComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  fetchedOrganisation: Organisation;
  organisationForm: FormGroup;

  constructor(
    private organisationService: OrganisationService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.organisationService.findAll().subscribe(
        (data) => {
          this.fetchedOrganisation = data[0];
          this.initForm();
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: JSON.stringify(error),
          });
        }
      )
    );
  }
  initForm() {
    this.organisationForm = this.formBuilder.group({
      organisationCode: new FormControl(
        this.fetchedOrganisation.code,
        Validators.required
      ),
      organisationName: new FormControl(
        this.fetchedOrganisation.nomOrganisation,
        Validators.required
      ),
      siret: new FormControl(
        this.fetchedOrganisation.siret,
        Validators.required
      ),
      fax: new FormControl(this.fetchedOrganisation.fax),
      telPrincipal: new FormControl(this.fetchedOrganisation.fax),
      description: new FormControl(this.fetchedOrganisation.description),
      taxeProfessionelle: new FormControl(
        this.fetchedOrganisation.professionalTax,
        Validators.required
      ),
      identificationFiscale: new FormControl(
        this.fetchedOrganisation.taxpayerIdentification,
        Validators.required
      ),
      idCommunEntreprise: new FormControl(
        this.fetchedOrganisation.commonIdentifierCompany,
        Validators.required
      ),
      classificationFiscale: new FormControl(
        this.fetchedOrganisation.classificationFiscale
      ),
      siteWeb: new FormControl(this.fetchedOrganisation.webSite),
      nAdresseSiegePrincipal: new FormControl(
        this.fetchedOrganisation.nomAdressSiegePrincipal,
        Validators.required
      ),
      premiereLigneAdresse: new FormControl(
        this.fetchedOrganisation.firstAddressLine,
        Validators.required
      ),
      deuxiemeLigneAdresse: new FormControl(
        this.fetchedOrganisation.secondAddressLine
      ),
      ville: new FormControl(
        this.fetchedOrganisation.city,
        Validators.required
      ),
      codeZip: new FormControl(
        this.fetchedOrganisation.zipCode,
        Validators.required
      ),
      pays: new FormControl(
        this.fetchedOrganisation.country,
        Validators.required
      ),
      nomContactPrincipal: new FormControl(
        this.fetchedOrganisation.nomContactPrincipal,
        Validators.required
      ),
      prenomContactPrincipal: new FormControl(
        this.fetchedOrganisation.prenomContactPrincipal,
        Validators.required
      ),
      emailContactPrincipal: new FormControl(
        this.fetchedOrganisation.emailContactPrincipal,
        Validators.required
      ),
      telContactPrincipal: new FormControl(
        this.fetchedOrganisation.telephoneContactPrincipal
      ),
      conditionsGenerals: new FormControl(
        this.fetchedOrganisation.generaleCondition
      ),
      nomContactLogistique: new FormControl(
        this.fetchedOrganisation.nomContactLogistique,
        Validators.required
      ),
      prenomContactLogistique: new FormControl(
        this.fetchedOrganisation.prenomContactLogistique,
        Validators.required
      ),
      emailContactLogistique: new FormControl(
        this.fetchedOrganisation.emailContactPrincipal,
        Validators.required
      ),
      telContactLogistique: new FormControl(
        this.fetchedOrganisation.telephoneContactLogistique
      ),
      commentContactLogistique: new FormControl(
        this.fetchedOrganisation.comment
      ),
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
