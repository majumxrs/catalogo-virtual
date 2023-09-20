import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';



function Login() {

    document.body.style.backgroundColor = "Black";

  const [ email, setEmail ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] = useState( false );
  const [ erro, setErro ] = useState( false );
  const navigate = useNavigate();

  /* */ 
  useEffect( () => {

    if( login ) {
        setEmail( "" );
        setSenha( "" );
        navigate( "/" );
    }

  }, [ login ] );

  function Autenticar( evento )
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json.user ) {
            localStorage.setItem( "usuario" , JSON.stringify( json.user._id ) );
            setLogin( true );
        } else {
            localStorage.removeItem( "usuario" );
            setErro( true );
        }
    } )
    .catch( ( erro ) => {  setErro( true ) } )
    
  }

  return (
    <Container component="section" maxWidth="xs" >
        <Box 
        sx={{ 
            mt: 10,
            backgroundColor: "#A800FF",
            padding: "30px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Typography component="h1" variant='h4' sx={{color:"#ffffff"}}>Entrar</Typography>
            { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Revise seus dados e tente novamente</Alert> ) }
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                  type="email"
                  label="Email" 
                  variant="filled" 
                  margin="normal"
                  value={email}
                  onChange={ (e) => setEmail( e.target.value ) }
                  fullWidth
                  sx={{
                    background:"#FFFFFF",
                    borderRadius:"10px",
                    color:"#000"
                  }}
                />
                <TextField 
                  type="password" 
                  label="Senha" 
                  variant="filled" 
                  margin="normal" 
                  fullWidth
                  value={senha}
                  onChange={ (e) => setSenha( e.target.value ) }
                  sx={{
                    background:"#FFFFFF",
                    borderRadius:"10px",
                    color:"#000"
                  }}
                />
                <FormControlLabel
                    control={ <Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar( !lembrar ) } />}
                    label="Lembrar-me"
                />
                <Button type="submit" variant="contained" fullWidth sx={ { mt: 2, mb: 2, borderRadius:"10px", color:"#fff", background:"#000" }} size="large">Login</Button>
                <Grid container>
                    <Grid item xs>
                        Esqueci a senha
                    </Grid>
                    <Grid item>
                        <a href='http://localhost:3000/cadastro'>Cadastro</a>
                    </Grid>
                </Grid>
                <Button type='submit' variant="contained"  sx={{ background:"#000", marginLeft:"130px"}}><a href='http://localhost:3000/' style={{textDecoration:"none", color:"#fff"}}>Voltar</a></Button>
                
            </Box>
        </Box>
    </Container>
  )
}

export default Login;