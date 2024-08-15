import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

import "./Form.css";


export default function Form(
  { handleSubmit, handleChange, novaTarefa }
) {
  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      className="form"
    >
      <input
        onChange={handleChange}
        type="text"
        value={novaTarefa} />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

// Caso um dos campos não fossem obrigatórios
// teríamos que definir um valor padrão para o campo
// isso seria feito da seguinte forma
// Form.defaultProps = {
//   novaTarefa: 'Valor padrão',
// };

Form.PropTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  novaTarefa: PropTypes.string.isRequired,
};
