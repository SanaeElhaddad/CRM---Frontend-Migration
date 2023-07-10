import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
import { Process } from "./process";
import { ControlPlan } from "./control-plan";
import { FrequencyType } from "./frequency-type";
import { ControleType } from "./controle-type";
import { Product } from "./product";
import { ControlState } from "./control-state";


export class ControlLigneValidation {

    id:number;
    controleType:ControleType;
    interval:String;
    responseIntervale:String;
    reponseValue:Boolean;
    owner:Owner;
   
   
}
