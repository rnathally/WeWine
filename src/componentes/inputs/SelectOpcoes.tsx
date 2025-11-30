import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./SelectOpcoes.css";

interface Opcao {
  label: string;
  value: string;
}

interface SelectOpcoesProps {
  valor: string;
  placeholder?: string;
  aoMudar: (valor: string) => void;
  opcoes: Opcao[];
  largura?: string;
  icone?: React.ReactNode;
}

export default function SelectOpcoes({
  valor,
  aoMudar,
  placeholder = "Selecione",
  opcoes,
  largura = "180px",
  icone,
}: SelectOpcoesProps) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // fechar ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const textoSelecionado =
    opcoes.find((o) => o.value === valor)?.label || placeholder;

  function handleSelecionar(novoValor: string) {
    aoMudar(novoValor);
    setAberto(false);
  }

  return (
    <div
      className="ds-select"
      style={{ width: largura }}
      ref={ref}
    >
      <div
        className="ds-select-display"
        onClick={() => setAberto((a) => !a)}
      >
        {icone && <span className="ds-select-icone">{icone}</span>}

        <span className={`ds-select-text ${valor ? "ativo" : ""}`}>
          {textoSelecionado}
        </span>

        <ChevronDown
          className={`arrow ${aberto ? "open" : ""}`}
          size={16}
        />
      </div>

      {aberto && (
        <div className="ds-select-dropdown">
          {opcoes.map((opcao) => (
            <div
              key={opcao.value}
              className={`ds-select-item ${
                opcao.value === valor ? "ativo" : ""
              }`}
              onClick={() => handleSelecionar(opcao.value)}
            >
              {opcao.value === valor && (
                <Check className="check" size={16} />
              )}
              <span>{opcao.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
