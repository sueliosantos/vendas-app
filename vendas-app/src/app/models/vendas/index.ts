import { Cliente } from "app/models/clientes";
import { Produto } from "../produtos";

export interface Venda {
  cliente?: Cliente;
  itens?: Array<ItemVenda>;
  formaPagamento?: String;
  total: number;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
}
