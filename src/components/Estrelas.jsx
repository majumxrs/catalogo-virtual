import React from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function Estrelas() {
  return (
    <>
    <span>Escolha seu nivel de satisfação</span>
    <Stack spacing={1} >
      <Rating name="half-rating" defaultValue={0.0} precision={0.5} />
    </Stack></>
    
  )
}

export default Estrelas