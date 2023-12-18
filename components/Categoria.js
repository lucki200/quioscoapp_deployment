import Image from 'next/image'
import React from 'react'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ({categoria}) => {
    const {categoriaActual,handleClickCategoria} = useQuiosco()
    const {nombre , icono , id} = categoria


  return (
    <div className={`${categoriaActual.id === id ? 'bg-amber-400 ' : ''}flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>

      <Image
        alt='Imagen icono'
        width={100}
        height={100}
        src={`/assets/img/icono_${icono}.svg`}
        
      />
      <button type='button ' className='text 2xl font-bold hover:cursor-pointer'
      onClick={() => handleClickCategoria(id)}>
        Click aqui
      </button>
    </div>
  )
}

export default Categoria
