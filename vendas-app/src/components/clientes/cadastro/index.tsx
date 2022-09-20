import React, { useState } from "react";
import { Layout } from "components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);
  };
  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
