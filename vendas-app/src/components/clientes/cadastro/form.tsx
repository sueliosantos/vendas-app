import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import { Input } from "components";
import Link from "next/link";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  cadastro: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  endereco: "",
  telefone: "",
  id: "",
};
export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            id="id"
            name="id"
            onChange={formik.handleChange}
            value={formik.values.id}
            label="Código: *"
            columnClasses="is-half"
            disabled
          />

          <Input
            id="cadastro"
            name="cadastro"
            onChange={formik.handleChange}
            value={formik.values.cadastro}
            label="Data cadastro:"
            disabled
            columnClasses="is-half"
          />
        </div>
      )}
      <div className="columns">
        <Input
          id="nome"
          name="nome"
          onChange={formik.handleChange}
          value={formik.values.nome}
          label="Nome: *"
          autoComplete="off"
          columnClasses="is-full"
        />
      </div>
      <div className="columns">
        <Input
          id="cpf"
          name="cpf"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          label="CPF: *"
          autoComplete="off"
          columnClasses="is-half"
        />

        <Input
          id="dataNascimento"
          name="dataNascimento"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
          label="Data Nascimento:"
          autoComplete="off"
          columnClasses="is-half"
        />
      </div>
      <div>
        <Input
          id="endereco"
          name="endereco"
          onChange={formik.handleChange}
          value={formik.values.endereco}
          label="Endereço: *"
          autoComplete="off"
          columnClasses="is-full"
        />
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          label="Email: *"
          autoComplete="off"
          columnClasses="is-half"
        />

        <Input
          id="telefone"
          name="telefone"
          onChange={formik.handleChange}
          value={formik.values.telefone}
          label="Telefone:"
          autoComplete="off"
          columnClasses="is-half"
        />
      </div>

      <div className="field is-grouped">
        <div className="control is-link">
          <button type="submit" className="button is-link">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href={"/consultas/produtos"}>
            <button className="button is-link is-light">Voltar</button>
          </Link>
        </div>
      </div>
    </form>
  );
};
