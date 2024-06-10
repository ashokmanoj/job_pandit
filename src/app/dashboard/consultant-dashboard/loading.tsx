import Wrapper from '@/layouts/wrapper'
import React from 'react'

const loading = () => {
  return (
    <Wrapper >
  <div style={{height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
<h1 style={{fontSize:'60px',fontFamily:'var(--gorditas-font)',color:'black',textTransform:'uppercase',letterSpacing:'1px',}}>J<span className='loader'></span>B PANDIT</h1>
  </div>
    </Wrapper>
  )
}

export default loading