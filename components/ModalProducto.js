import Image from "next/image";
import React, { useEffect, useState } from "react";
import Producto from "./Producto";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";


const ModalProducto = () => {
  const { producto, handleChangeModal , handleAgregarPedido , pedido } = useQuiosco();
  const [cantidad, setcantidad] = useState(1)
  const [edicion, setedicion] = useState(false)

  useEffect(() => {
    if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
        const productoEdicion  = pedido.find((pedidoState => pedidoState.id === producto.id))
        setedicion(true)
        setcantidad(productoEdicion.cantidad)
      }
  }, [producto, pedido])
  

  //comprobar  si el modal actual esta en el ´pedido 
   
  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`imagen producto ${producto.imagen}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>
        <div className="flex gap-4 mt-5">

        <button onClick={() => setcantidad(cantidad - 1)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl ">{cantidad}</p>
          <button onClick={() => setcantidad(cantidad + 1)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button onClick={() => handleAgregarPedido({...producto , cantidad})} type="button" className="bg-indigo-600 hover:bg-indigo-800 mt-5 text-white font-bold uppercase rounded p-3">
            {edicion ? 'Guardar cambios' : 'añadir al pedido'}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
