import { Alert, Box, Button, Container, Link, Rating, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import Estrelas from './components/Estrelas';



function CadastroComida() {

    document.body.style.backgroundColor = "Black";

    const [Nome, setNome] = useState("");
    const [Comentario, serComentario] = useState("");
    const [imagem, setImagem] = useState("");
    const [cadastro, setCadastro] = useState(false);
    const [erro, setErro] = useState(false);
    const [ valor, setValor ] = useState( 0 );


    function Cadastrar(evento) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: Nome,
                    descricao: Comentario,
                    imagem: imagem,
                    usuario: localStorage.getItem( "usuario" ),
                    duracao: valor
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {

            if (json._id) {
                setCadastro(true);
                setErro( false );
            } else {
                setErro(true);
                setCadastro( false );
                }
        })
        .catch((erro) => { setErro(true) })
    }   


    return (
        <Container component="section" maxWidth="sm">
            <Box sx={{
                mt: 10,
                backgroundColor: "#A800FF",
                padding: "30px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                { erro && (<Alert severity="warning">Alimento já cadastrado. Tente outro por favor</Alert>) }
                { cadastro && ( <Alert severity="success">Obrigado por dar sua resenha sobre tal alimento</Alert> )}
                <Box component="form" onSubmit={Cadastrar}>
                    <TextField
                        type="text"
                        label="Nome do alimento:"
                        variant="filled"
                        margin="normal"
                        value={Nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        required
                        sx={{
                            background:"#FFFFFF",
                            borderRadius:"10px",
                            color:"#000"
                          }}
                    />
                    <TextField
                        type="text"
                        label="Seu comentario sobre o alimento:"
                        variant="filled"
                        margin="normal"
                        value={Comentario}
                        onChange={(e) => serComentario(e.target.value)}
                        fullWidth
                        required
                        sx={{
                            background:"#FFFFFF",
                            borderRadius:"10px",
                            color:"#000"
                          }}
                    />
                    <TextField
                        type="text"
                        label="Url da Imagem"
                        variant="filled"
                        margin="normal"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        fullWidth
                        required
                        sx={{
                            background:"#FFFFFF",
                            borderRadius:"10px",
                            color:"#000"
                          }}
                    />
                    <Estrelas valor={valor} modificador={ (event, valor ) => { setValor( valor ) } }/>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2,  borderRadius:"10px", color:"#fff", background:"#000"}} >Cadastrar</Button>
                    <Button type='submit' variant="contained"  sx={{ background:"#000", marginLeft:"210px"}}><a href='http://localhost:3000/' style={{textDecoration:"none", color:"#fff"}}>Voltar</a></Button>
                </Box>
            </Box>
        </Container>
    )
}

export default CadastroComida;