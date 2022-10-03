import { Venda } from "app/models/vendas";
import { useFormik } from "formik";
import { AutoComplete } from "primereact/autocomplete";

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formSchema: Venda = {
  cliente: {},
  produtos: [],
  totalVenda: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete id="cliente" name="cliente" />
        </div>
      </div>
    </form>
  );
};
