import React from 'react';

const Button = ({ id, label, type, onClick }) => {
  const base = "text-xl font-semibold py-4 rounded shadow-sm transition duration-150 ease-in-out focus:outline-none";
  const color =
    type === "number"
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : type === "operator"
      ? "bg-orange-500 hover:bg-orange-400 text-white"
      : type === "equals"
      ? "bg-green-500 hover:bg-green-400 text-white col-span-2"
      : "bg-red-600 hover:bg-red-500 text-white";

  const extra = id === "zero" ? "col-span-2" : "";

  return (
    <button
      id={id}
      className={`${base} ${color} ${extra}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};


export default Button;
