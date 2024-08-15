// Componente principal da aplicação
// Esse componente precisa ter estado
import React, { Component } from "react";

import Form from "./Form";
import Tarefas from "./Tarefas";

import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  };

  // Carregando as tarefas do localStorage as tarefas
  // e renderizando na aplicação
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    // Salvando no localStorage do navegar a lista de tarefas
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  // Funcionalidade de enviar o formulário de tarefas
  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      // Criando uma nova tarefe
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      // Editando uma tarefa existente
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: "",
      });
    }

  };

  // Funcionalidade que pega o que for digitado no input
  // e atribui ao atributo novaTarefa
  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  // Funcionalidade de edição
  // Pega o valor de uma tarefa da lista e coloca
  // no input para edição
  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  // Funcionalidade de deletar tarefa
  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas]
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa} />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete} />

      </div>
    );
  }
}
