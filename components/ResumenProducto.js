import Image from "next/image";
import React from "react";
import { formatearDinero } from "../helpers";
import { QuioscoProvider } from "../context/QuioscoProvider";
import useQuiosco from "../hooks/useQuiosco";



const ResumenProducto = ({ producto }) => {
    const {handleActualizarCantidad , handleEliminarProducto} = useQuiosco()
  const imagePath = `/assets/img/${producto.imagen}.jpg`;
  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center">
      <div className="md:w-1/6 ">
        <Image src={imagePath} width={300} height={400} alt="imagen producto" />
      </div>
      <div className="md:w-5/6 ">
            <p className="text-3xl font-bold ">{producto.nombre}</p>
            <p className="text-xl font-bold mt-2 "> Cantidad: {producto.cantidad}</p>
            <p className="text-xl font-bold mt-2 text-amber-500 "> Precio: {formatearDinero(producto.precio)}</p>

            <p className="text-xl font-bold mt-2 text-amber-500 "> Total: {formatearDinero(producto.precio * producto.cantidad)}</p>
      </div>
      <div className="flex justify-between ">
      <button
          className="bg-blue-500 text-white px-4 py-2 mr-2"
          onClick={() => {
            const nuevaCantidad = parseInt(prompt("Ingrese la nueva cantidad", producto.cantidad), 10);
            if (!isNaN(nuevaCantidad)) {
              handleActualizarCantidad(producto.id, nuevaCantidad);
            }
          }}
        >
          Editar
        </button>
        <button className="bg-red-500 text-white px-4 py-2" onClick={() => handleEliminarProducto(producto.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ResumenProducto;
