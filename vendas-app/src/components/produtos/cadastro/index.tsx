import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { Layout, Input } from "components";
import { useState } from "react";

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");

  const submit = () => {
    const produto: Produto = {
      sku,
      preco: parseFloat(preco),
      nome,
      descricao,
    };

    service
      .salvar(produto)
      .then((produtoResposta) => console.log(produtoResposta));
  };
  return (
    <Layout titulo="Produtos">
      <div className="columns">
        <Input
          id="inputSku"
          label="SKU: *"
          columnClasses="is-half"
          onChange={setSku}
          placeholder="Digite o SKU do produto"
        />

        <Input
          id="inputPreco"
          label="Preço: *"
          columnClasses="is-half"
          onChange={setPreco}
          placeholder="Digite o preço do produto"
        />
      </div>

      <div className="field">
        <Input
          id="inputNome"
          label="Nome: *"
          columnClasses="is-full"
          onChange={setNome}
          placeholder="Digite o nome do produto"
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="inputDesc">
          Descrição: *
        </label>
        <div className="control">
          <textarea
            className="textarea"
            id="inputDesc"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a Descrição detalhada do produto"
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={submit} className="button is-link">
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </Layout>
  );
};
