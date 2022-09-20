import { Produto } from "app/models/produtos";
import { useState } from "react";

interface TabelaProdutosProps {
  produtos?: Array<Produto>;
  onEdit: (produto) => void;
  onDelete: (produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Código</th>
          <th>SKU</th>
          <th>Nome</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {produtos?.map((produto) => (
          <ProdutoRow
            key={produto.id}
            produto={produto}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto) => void;
  onDelete: (produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  const [deletando, setDeletando] = useState(false);

  const onDeleteClik = () => {
    if (deletando) {
      onDelete(produto);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        {!deletando && (
          <button
            onClick={(e) => onEdit(produto)}
            className="button is-success is-rounded is-small"
          >
            Editar
          </button>
        )}
        <button
          onClick={(e) => onDeleteClik()}
          className="button is-danger is-rounded is-small"
        >
          {deletando ? "Confirma" : "Deletar"}
        </button>
        {deletando && (
          <button
            onClick={(e) => cancelaDelete()}
            className="button is-rounded is-small"
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
};
