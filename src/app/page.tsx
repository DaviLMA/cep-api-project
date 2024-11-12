"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";

type Address = {
  id: string;
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string;
  logradouro: string;
  uf: string;
  consultedAt: Date;
};

const initialAddresses: Address[] = [
  {
    id: self.crypto.randomUUID(),
    bairro: "Centro",
    cep: "01001-000",
    complemento: "Apto 101",
    ddd: "11",
    localidade: "São Paulo",
    logradouro: "Praça da Sé",
    uf: "SP",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Copacabana",
    cep: "22041-001",
    complemento: "Bloco B, Ap 502",
    ddd: "21",
    localidade: "Rio de Janeiro",
    logradouro: "Avenida Atlântica",
    uf: "RJ",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Savassi",
    cep: "30140-071",
    complemento: "Loja 3",
    ddd: "31",
    localidade: "Belo Horizonte",
    logradouro: "Rua Pernambuco",
    uf: "MG",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Meireles",
    cep: "60160-230",
    complemento: "Casa 10",
    ddd: "85",
    localidade: "Fortaleza",
    logradouro: "Rua Silva Jatahy",
    uf: "CE",
    consultedAt: new Date(),
  },
];

function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });

  return result;
}

export default function Home() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);

    try {
      const result = await getAddress(textValue);
      console.log(result);
      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }

      const newAddress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date(),
        ...result,
      };
      console.log(newAddress);

      const newAddresses = [newAddress, ...addresses];
      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAddress(id: string) {
    const filteredAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(filteredAddresses);
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-8 relative overflow-hidden">
      <motion.img
        src="/background.png" // Caminho ajustado para a imagem na pasta public
        alt="Imagem de fundo decorativa"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h1
        className="text-4xl font-bold mb-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Consulta de Endereços
      </motion.h1>

      <motion.div
        className="flex flex-col gap-4 mb-12 w-full max-w-md z-10 p-4 bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <label className="text-lg font-medium">CEP</label>
        <motion.input
          onChange={(e) => setTextValue(e.target.value)}
          className="rounded-lg shadow-lg px-5 p-3 text-gray-900 focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="Digite um CEP válido"
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetAddress}
          disabled={textValue === ""}
          className={`${
            loading ? "opacity-50 cursor-not-allowed" : ""
          } w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-all`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </motion.button>
      </motion.div>

      <motion.table
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="table-auto w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden border-separate border-spacing-0 z-10"
      >
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-6 py-3">Logradouro</th>
            <th className="px-6 py-3">Bairro</th>
            <th className="px-6 py-3">Localidade</th>
            <th className="px-6 py-3">UF</th>
            <th className="px-6 py-3">CEP</th>
            <th className="px-6 py-3">Consultado em</th>
            <th className="px-6 py-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {addresses.map((address) => (
            <motion.tr
              key={address.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="hover:bg-gray-700 transition-all"
            >
            <td className="px-6 py-3 border-t border-gray-700">{address.logradouro}</td>
            <td className="px-6 py-3 border-t border-gray-700">{address.bairro}</td>
            <td className="px-6 py-3 border-t border-gray-700">{address.localidade}</td>
            <td className="px-6 py-3 border-t border-gray-700">{address.uf}</td>
            <td className="px-6 py-3 border-t border-gray-700">{address.cep}</td>
            <td className="px-6 py-3 border-t border-gray-700">{formatDate(address.consultedAt)}</td>
            <td className="px-6 py-3 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDeleteAddress(address.id)}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-lg flex items-center justify-center"
              >
                <MdOutlineDelete size={20} />
              </motion.button>
            </td>

            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}
