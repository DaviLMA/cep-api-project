"use client"
import { useState } from "react";
import { getAddress } from "../../get-address";

interface Address {
  id: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ddd: string;
}

const endereço: Address[] = [
  {
    id: crypto.randomUUID(),
    cep: "50761-340",
    logradouro: "Rua Ourém",
    bairro: "San Martin",
    localidade: "Recife",
    uf: "PE",
    estado: "Pernambuco",
    regiao: "Nordeste",
    ddd: "81"
  },
  {
    id: crypto.randomUUID(),
    cep: "01001-000",
    logradouro: "Praça da Sé",
    bairro: "Sé",
    localidade: "São Paulo",
    uf: "SP",
    estado: "São Paulo",
    regiao: "Sudeste",
    ddd: "11"
  },
  {
    id: crypto.randomUUID(),
    cep: "20040-020",
    logradouro: "Avenida Rio Branco",
    bairro: "Centro",
    localidade: "Rio de Janeiro",
    uf: "RJ",
    estado: "Rio de Janeiro",
    regiao: "Sudeste",
    ddd: "21"
  },
  {
    id: crypto.randomUUID(),
    cep: "30130-010",
    logradouro: "Avenida Afonso Pena",
    bairro: "Centro",
    localidade: "Belo Horizonte",
    uf: "MG",
    estado: "Minas Gerais",
    regiao: "Sudeste",
    ddd: "31"
  },
  {
    id: crypto.randomUUID(),
    cep: "40020-000",
    logradouro: "Avenida Sete de Setembro",
    bairro: "Centro",
    localidade: "Salvador",
    uf: "BA",
    estado: "Bahia",
    regiao: "Nordeste",
    ddd: "71"
  }
];

const nomes: string[] = [
  "Augusto César",
  "Thiago Felipe",
  "Argila Barros",
  "Davi Araújo",
  "Douglas Henrique",
  "Cláudio José"
];

export default function Home() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);

    try {
      const result = await getAddress(textValue);
      setAddress(result.logradouro);
      console.log(result.logradouro);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="flex justify-center">Página Home</h1>
  
      <div className="flex flex-col gap-2">
        <span className="font-bold">Endereço: {address}</span>
        <input
          onChange={(e) => setTextValue(e.target.value)}
          className="rounded-lg shadow-lg px-4 p-3 max-w-fit"
          placeholder="Digite um CEP válido:"
        />
        <button
          disabled={textValue === ""}
          onClick={handleGetAddress}
          className={`${loading && "opacity-30"} w-fit px-5 py-3 bg-blue-700 text-white rounded-xl`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
      </div>
  
      <ul className="mt-5">
        <h2 className="text-black font-bold">Logradouros:</h2>
        {endereço.map((endereco) => (
          <li key={endereco.id}>{endereco.logradouro}</li>
        ))}
      </ul>
  
      <ul className="mt-5">
        <h2 className="text-black font-bold">Nomes:</h2>
        {endereço.map((address) => (
          <li key={address.id}>{address.logradouro}</li>
        ))}
      </ul>
    </div>
  );  
}