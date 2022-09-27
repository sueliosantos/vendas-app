import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import { Input, InputCPF, InputFone, InputData } from "components";
import Link from "next/link";
import * as Yup from "yup";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  cadastro: "",
  nome: "",
  cpf: "",
  nascimento: "",
  email: "",
  endereco: "",
  telefone: "",
  id: "",
};

const campoObrigatorioMensagem = "Campo obrigatório";

const validationScheme = Yup.object().shape({
  cpf: Yup.string()
    .trim()
    .required(campoObrigatorioMensagem)
    .length(14, "CPF inválido"),

  nome: Yup.string().trim().required(campoObrigatorioMensagem),

  nascimento: Yup.string()
    .trim()
    .required(campoObrigatorioMensagem)
    .length(10, "Data inválida"),

  email: Yup.string()
    .trim()
    .required(campoObrigatorioMensagem)
    .email("Email inválido"),

  endereco: Yup.string().trim().required(campoObrigatorioMensagem),
  telefone: Yup.string().trim().required(campoObrigatorioMensagem),
});
export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
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
          error={formik.errors.nome}
        />
      </div>
      <div className="columns">
        <InputCPF
          id="cpf"
          name="cpf"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          label="CPF: *"
          autoComplete="off"
          columnClasses="is-half"
          error={formik.errors.cpf}
        />

        <InputData
          id="nascimento"
          name="nascimento"
          onChange={formik.handleChange}
          value={formik.values.nascimento}
          label="Data Nascimento:"
          autoComplete="off"
          columnClasses="is-half"
          error={formik.errors.nascimento}
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
          error={formik.errors.endereco}
        />
      </div>
      <div className="columns">
        <Input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          label="Email: *"
          autoComplete="off"
          columnClasses="is-half"
          error={formik.errors.email}
        />

        <InputFone
          id="telefone"
          name="telefone"
          onChange={formik.handleChange}
          value={formik.values.telefone}
          label="Telefone:"
          autoComplete="off"
          columnClasses="is-half"
          error={formik.errors.telefone}
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
