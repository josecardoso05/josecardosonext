'use client'
import React, { useState } from 'react'

export default function InputPage() {

  const [texto, setTexto] = useState("")
  const [opcao, setOpcao] = useState("")

  const [tarefas, setTarefas] = useState<string[]>([])
  const [novaTarefa, setNovaTarefa] = useState<string>("")

  const [editIndex, setEditIndex] = useState<number | null>(null)

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    // Se está a editar uma tarefa existente
    if (editIndex !== null) {
      const copia = [...tarefas]
      copia[editIndex] = novaTarefa
      setTarefas(copia)
      setEditIndex(null)   // sair do modo edição
    } else {
      // adicionar nova tarefa
      setTarefas([...tarefas, novaTarefa])
    }

    setNovaTarefa("")
  }

  function editarTarefa(index: number) {
    setNovaTarefa(tarefas[index]) // coloca no input
    setEditIndex(index)           // ativa modo edição
  }

  function apagarTarefa(index: number) {
    setTarefas(tarefas.filter((_, i) => i !== index))
  }

  return (
    <section>
      <h2>Input:</h2>

      <input
        type="text"
        placeholder='Escreve aqui...'
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <p>O que escreveste: {texto}</p>

      <h2>Tecnologias</h2>
      <select
        value={opcao}
        onChange={(e) => setOpcao(e.target.value)}
      >
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
      </select>

      <p>Tecnologia escolhida: {opcao}</p>

      <h2>Tarefas</h2>

      <input
        type="text"
        placeholder='Escreve uma tarefa...'
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />

      <button onClick={adicionarTarefa}>
        {editIndex !== null ? "Guardar" : "Adicionar"}
      </button>

      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>
            {tarefa}

            <button onClick={() => editarTarefa(index)}>
              Editar
            </button>

            <button onClick={() => apagarTarefa(index)}>
              Apagar
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
