import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { Layout, Input } from "components";
import { useState } from "react";

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [id, setId] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [cadastro, setCadastro] = useState<string>("");

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: parseFloat(preco),
      nome,
      descricao,
    };

    if (id) {
      service.atualizar(produto).then((response) => console.log("atualizado!"));
    } else {
      service.salvar(produto).then((produtoResposta) => {
        setId(produtoResposta.id);
        setCadastro(produtoResposta.cadastro);
      });
    }
  };

  return (
    <Layout titulo="Produtos">
      {id && (
        <div className="columns">
          <Input
            id="inputCodigo"
            label="Código: *"
            columnClasses="is-half"
            value={id}
            disabled
          />

          <Input
            id="inputData"
            label="Data cadastro: *"
            columnClasses="is-half"
            value={cadastro}
            disabled
          />
        </div>
      )}
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
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancelar</button>
        </div>
      </div>
    </Layout>
  );
};
