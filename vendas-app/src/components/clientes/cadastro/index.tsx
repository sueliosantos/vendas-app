import React, { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";
import { useClienteService } from "app/services";
import { Alert } from "components/common/message";
import { useRouter } from "next/router";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const service = useClienteService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      service
        .carregarCliente(id)
        .then((clienteEncontrado) => setCliente(clienteEncontrado));
    }
  }, [id]);

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service.atualizar(cliente).then((resposta) => {
        setMessages([
          {
            tipo: "success",
            texto: "Cliente atualizado com sucesso!",
          },
        ]);
      });
    } else {
      service.salvar(cliente).then((clienteSalvo) => {
        setCliente(clienteSalvo);

        setMessages([
          {
            tipo: "success",
            texto: "Cliente salvo com sucesso!",
          },
        ]);
      });
    }
  };
  return (
    <Layout titulo="Clientes" mensagens={messages}>
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
