"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ESTADO_INICIAL, type Estado } from "@/lib/tipos";

type Acao = (estadoAnterior: Estado, dados: FormData) => Promise<Estado>;

// useActionState + envio pelo onSubmit.
//
// Com <form action={...}> puro, o React 19 limpa o formulário logo DEPOIS que
// a resposta chega. Se a pessoa começa a corrigir um campo nesse instante, o
// que ela digitou é sobrescrito. Enviando pelo onSubmit, o formulário nunca é
// resetado e os campos ficam exatamente como a pessoa deixou.
//
// O `action` continua no <form> para funcionar mesmo sem JavaScript.
export function useFormulario(acao: Acao) {
  const [estado, acaoDoForm, pendente] = useActionState(acao, ESTADO_INICIAL);
  const ref = useRef<HTMLFormElement>(null);
  // Muda a cada envio. Usado como `key` do aviso, para o leitor de tela
  // anunciar o erro de novo mesmo quando o texto é igual ao anterior.
  const [envio, setEnvio] = useState(0);

  // Depois de uma resposta com erro, o foco vai para o primeiro campo inválido.
  useEffect(() => {
    if (estado.ok || !Object.keys(estado.erros).length) return;
    ref.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [estado]);

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    setEnvio((atual) => atual + 1);
    startTransition(() => acaoDoForm(dados));
  }

  return {
    estado,
    pendente,
    envio,
    formulario: { ref, action: acaoDoForm, onSubmit: aoEnviar, noValidate: true },
  };
}
