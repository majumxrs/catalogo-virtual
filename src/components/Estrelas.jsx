import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function Estrelas(props) {



  return (
    <>
    <span>Escolha seu nivel de satisfação</span>
    <Stack spacing={1} >
      <Rating name="half-rating" value={parseInt( props.valor )} precision={0.5} onChange={props.modificador} />
    </Stack></>
    
  )
}

export default Estrelas