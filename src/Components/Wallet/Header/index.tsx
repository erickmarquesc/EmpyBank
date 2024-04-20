import { WalletHeaderContent } from "./styles"
import { PiPlusCircle } from "react-icons/pi"

export default function WalletHeader() {
  return (
    <WalletHeaderContent>
      <h1>Carteira de clientes</h1>

      <section>
        <label>Selecione o Assistente Comercial</label>

        <div>
          <select>
            <option value="opcao1">Fulano</option>
            <option value="opcao2">Opção 2</option>
            <option value="opcao3">Opção 3</option>
          </select>

          <button>
            <PiPlusCircle size={22}/>
          </button>
        </div>
      </section>
    </WalletHeaderContent>
  )
}