import { Owner } from "./owner";
import { ControleTypeResponse } from "./controle-type-response";
export class ControleType {

  id: number;
  code: string;
  description: string;
  controleTypeResponse : ControleTypeResponse;
  owner : Owner;

}
