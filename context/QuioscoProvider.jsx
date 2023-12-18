import axios from "axios";
import { Router, useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";

const QuioscoContext = createContext();



const QuioscoProvider = ({ children }) => {
  const [total, settotal] = useState(0)
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setproducto] = useState({})
  const [modal, setmodal] = useState(false)
  const [pedido, setpedido] = useState([])
  
  const obtenerCategorias = async () => {
    try {
      const response = await axios('/api/categorias');
      setCategorias(response.data); // Accede a la propiedad data de la respuesta
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);
 
  useEffect(() => {
    const nuevoTotal =  pedido.reduce((total, producto) => (producto.precio * producto.cantidad) +  total  , 0)
    settotal(nuevoTotal)
  }, [pedido])
  

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id === id);
    setCategoriaActual(categoria[0])
    router.push('/')
  };
  const handleSetProducto = producto => {
    setproducto(producto)
  }
  
  const handleChangeModal  = () => {
    setmodal(!modal)
  }
  const handleAgregarPedido = ({categoriaId , ...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)) {
      //actualizar la cantidad

      const pedidoActualizado  = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setpedido(pedidoActualizado)
      toast.success('Guardado Correctamente')
    } else{
      setpedido([...pedido , producto])
      toast.success('Agregado al pedido')
    }
    setmodal(false)
    
  }

  const handleActualizarCantidad = (productoId, nuevaCantidad) => {
    const pedidoActualizado = pedido.map((producto) =>
      producto.id === productoId ? { ...producto, cantidad: nuevaCantidad } : producto
    );
    setpedido(pedidoActualizado);
  };

  // Función para eliminar un producto del pedido
  const handleEliminarProducto = (productoId) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== productoId);
    setpedido(pedidoActualizado);
  };

  const colocarOrden = async () => {
    try {
      // Validar que hay productos en el pedido antes de colocar la orden
      if (pedido.length === 0) {
        toast.error("El pedido está vacío. Agrega productos antes de confirmar la orden.");
        return;
      }

      // Aquí puedes realizar la lógica para enviar el pedido a tu backend y almacenarlo en la base de datos
      // Supongamos que tienes una API en '/api/orden' para manejar la creación de órdenes

      const response = await axios.post(`/api/ordenes`, { pedido , nombre , total });
      console.log(response)
      
      // Puedes manejar la respuesta según tus necesidades
      if (response.status === 200) {
        toast.success("Orden colocada exitosamente.");
        // Aquí puedes realizar acciones adicionales después de colocar la orden, si es necesario
      } else {
        toast.error("Error al colocar la orden.");
      }
    } catch (error) {
      console.error("Error al colocar la orden:", error);
      toast.error("Error al colocar la orden. Por favor, inténtalo de nuevo.");
    }
  };



  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleActualizarCantidad,
        handleEliminarProducto,
        colocarOrden,
        total
      
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
