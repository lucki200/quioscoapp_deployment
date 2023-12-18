import { useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout"
import { formatearDinero } from "../helpers";

export default function Total() {

    const {pedido , colocarOrden , total} = useQuiosco()
    const comprobarPedido = () => {
        return pedido.length === 0
    }
    useEffect(() => {
        
   
        comprobarPedido();
    }, [pedido , comprobarPedido])
    
 
  
 
    
    return (

        <Layout pagina='Total y Confirmar pedido' >
            
       
        <p className="text-2xl my-10 text-center">
            Confirma tu pedido a continuacion
        </p>
        <form onSubmit={colocarOrden} className="bg-transparent shadow-lg p-8 rounded-md mx-auto mt-10 max-w-md">
            <div>
                <label htmlFor="nombre" className="block upper text-slate-300 text-xl ">
                    Nombre
                </label>
                <input className="bg-gray-200  w-full  lg:w-1/3 mt-3 p-2 rounder-md" type="text" />

            </div>
            <div className="mt-10 ">
                <p className="text-2xl "> total a pagar:  {''} <span className="font-bold ">{formatearDinero(total)}</span></p>
            </div>
            <div className="mt-5">
                <input disabled={comprobarPedido()}  type="submit" className=" text-center  lg:w-auto py-5 rounded uppercase font-bold text-white bg-indigo-600 w-full" value='confirmar pedido' />
            </div>
        </form>
    </Layout>
    
        )
}