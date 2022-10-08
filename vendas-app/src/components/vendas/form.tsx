import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { ItemVenda, Venda } from "app/models/vendas";
import { useClienteService, useProdutoService } from "app/services";
import { Formik, useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { Produto } from "app/models/produtos";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { validationScheme } from "./validationShema";

const formatadorMonye = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formSchema: Venda = {
  cliente: null,
  itens: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const formaPagamento: String[] = ["DINHEIRO", "CARTÃO"];
  const service = useClienteService();
  const produtoService = useProdutoService();
  const [produto, setProduto] = useState<Produto>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
  const [listProdutos, setListProdutos] = useState<Produto[]>([]);
  const [listFiltradaProdutos, setListFiltradaProdutos] = useState<Produto[]>(
    []
  );
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [mensagem, setMensagem] = useState("");
  const [listaCliente, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formSchema,
    validationSchema: validationScheme,
  });

  const handleAddProduto = () => {
    const itensAdicionados = formik.values.itens;

    const jaExisteItemNaVenda = itensAdicionados?.some((iv: ItemVenda) => {
      return iv.produto.id === produto?.id;
    });

    if (jaExisteItemNaVenda) {
      itensAdicionados?.forEach((iv: ItemVenda) => {
        if (iv.produto.id === produto?.id) {
          iv.quantidade = iv.quantidade + quantidadeProduto;
        }
      });
    } else {
      itensAdicionados?.push({
        produto: produto,
        quantidade: quantidadeProduto,
      });
    }

    setProduto(null);
    setCodigoProduto("");
    setQuantidadeProduto(0);
    const total = totalVenda();
    formik.setFieldValue("total", total);
  };
  const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    service
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleCodigoProdutoSelect = (event) => {
    if (codigoProduto) {
      produtoService
        .carregarProduto(codigoProduto)
        .then((produtoEncontrado) => setProduto(produtoEncontrado))
        .catch((error) => setMensagem("Produto não encontrado"));
    }
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: Cliente = e.value;
    formik.setFieldValue("cliente", clienteSelecionado);
  };

  const handleFecharDialogProdutoNaoEncontrado = () => {
    setMensagem("");
    setCodigoProduto("");
    setProduto(null);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="OK" onClick={handleFecharDialogProdutoNaoEncontrado} />
      </div>
    );
  };

  const disableAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
  };

  const handleProdutoAutoComplete = async (
    e: AutoCompleteCompleteMethodParams
  ) => {
    const nomeProduto = e.query;

    if (!listProdutos.length) {
      const produtosEncontrados = await produtoService.listar();
      setListProdutos(produtosEncontrados);
    }

    const produtosEncontrados = listProdutos.filter((produto: Produto) => {
      return produto.nome?.toUpperCase().includes(e.query.toUpperCase());
    });

    setListFiltradaProdutos(produtosEncontrados);
  };

  const totalVenda = () => {
    const totais: number[] = formik.values.itens?.map(
      (iv) => iv.quantidade * iv.produto.preco
    );
    if (totais.length) {
      return totais.reduce(
        (somatorioAtual = 0, valorItemAtual) => somatorioAtual + valorItemAtual
      );
    } else {
      return 0;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete
            id="cliente"
            name="cliente"
            field="nome"
            suggestions={listaCliente.content}
            completeMethod={handleClienteAutoComplete}
            value={formik.values.cliente}
            onChange={handleClienteChange}
          />
          <small className="p-error p-d-block">{formik.errors.cliente}</small>
        </div>

        <div className="p-grid">
          <div className="p-col-2">
            <span className="p-float-label">
              <InputText
                id="codigoProduto"
                value={codigoProduto}
                onChange={(e) => setCodigoProduto(e.target.value)}
                onBlur={handleCodigoProdutoSelect}
              />
              <label htmlFor="codigoProduto">Código</label>
            </span>
          </div>
          <div className="p-col-6">
            <div className="p-field">
              <AutoComplete
                id="produto"
                name="produto"
                suggestions={listFiltradaProdutos}
                value={produto}
                completeMethod={handleProdutoAutoComplete}
                field="nome"
                onChange={(e) => setProduto(e.value)}
              />
            </div>
          </div>

          <div className="p-col-2">
            <span className="p-float-label">
              <InputText
                id="qtdProduto"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(parseInt(e.target.value))}
              />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>

          <div className="p-col-2">
            <div className="p-field">
              <Button
                type="button"
                label="Adicionar"
                disabled={disableAddProdutoButton()}
                onClick={handleAddProduto}
              />
            </div>
          </div>

          <div className="p-col-12">
            <DataTable
              value={formik.values.itens}
              emptyMessage="Nenhum produto adicionado."
            >
              <Column field="produto.id" header="Código" />
              <Column field="produto.nome" header="Produto" />
              <Column field="produto.sku" header="sku" />
              <Column field="produto.preco" header="Preço" />
              <Column field="quantidade" header="QTD" />
              <Column
                body={(iv: ItemVenda) => {
                  const total = iv.quantidade * iv.produto.preco;
                  const totalFormatado = formatadorMonye.format(total);

                  return <div>{totalFormatado}</div>;
                }}
                header="Total"
              />
              <Column
                body={(item: ItemVenda) => {
                  const handleRemoverItem = () => {
                    const novaLista = formik.values.itens?.filter(
                      (iv) => iv.produto.id !== item.produto.id
                    );
                    formik.setFieldValue("itens", novaLista);
                  };
                  return (
                    <Button
                      type="button"
                      label="Excluir"
                      onClick={handleRemoverItem}
                    />
                  );
                }}
              />
            </DataTable>
            <small className="p-error p-d-block">
              {formik.touched && formik.errors.itens}
            </small>
          </div>

          <div className="p-col-5">
            <div className="p-field">
              <label htmlFor="formaPG">Forma de pagamento: *</label>
              <Dropdown
                id="formaPagamento"
                options={formaPagamento}
                value={formik.values.formaPagamento}
                onChange={(e) =>
                  formik.setFieldValue("formaPagamento", e.value)
                }
                placeholder="Selecione"
              />
              <small className="p-error p-d-block">
                {formik.touched && formik.errors.formaPagamento}
              </small>
            </div>
          </div>
          <div className="p-col-2">
            <div className="p-field">
              <label htmlFor="itens">Itens:</label>
              <InputText disabled value={formik.values.itens?.length} />
            </div>
          </div>

          <div className="p-col-2">
            <div className="p-field">
              <label htmlFor="total">Total:</label>
              <InputText
                disabled
                value={formatadorMonye.format(formik.values.total)}
              />
            </div>
          </div>
        </div>

        <Button type="submit" label="Finalizar" />
      </div>

      <Dialog
        header="Atenção"
        position="top"
        visible={!!mensagem}
        onHide={handleFecharDialogProdutoNaoEncontrado}
        footer={renderFooter}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};
