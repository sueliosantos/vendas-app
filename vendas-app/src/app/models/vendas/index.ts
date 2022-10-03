import { Cliente } from "app/models/clientes";
import { Produto } from "../produtos";

export interface Venda {
  cliente?: Cliente;
  produtos?: Array<Produto>;
  formaPagamento?: String;
  totalVenda: number;
}
