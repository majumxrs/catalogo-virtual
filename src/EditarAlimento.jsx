import { Box, Container, TextField, Button, Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Estrelas from "./components/Estrelas";

function EditarAlimento() {

    document.body.style.backgroundColor = "black"

    const { id } = useParams();
    const [Nome, setNome] = useState("");
    const [Comentario, setComentario] = useState("");
    const [imagem, setImagem] = useState("");
    const [editar, setEditar] = useState(false);
    const [erro, setErro] = useState(false);

    useEffect( () => {
        fetch( process.env.REACT_APP_BACKEND + "filmes/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resposta) => resposta.json())
        .then((json) => {
            if( !json.status ) {
                setNome( json.Nome );
                setComentario( json.Comentario );
                setImagem( json.imagem );
            } else {
                setErro( "Filme não encontrado" );
            }
        })
        .catch((erro) => { setErro(true) })
    }, [] );

    function Editar( evento ) {
        evento.preventDefault();

        fetch( process.env.REACT_APP_BACKEND + "filmes", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    nome: Nome,
                    Comentario: Comentario,
                    imagem: imagem
                }
            )
        })
        .then((resposta) => resposta.json())
        .then((json) => {

            if (json._id) {
                setEditar(true);
                setErro( false );
            } else {
                setErro(true);
                setEditar( "Não foi possivel editar a resenha" );
            }
        })
        .catch((erro) => { setErro( "Erro ao processar a requisição") })
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
                <Typography component="h1" variant='h4' sx={{color:"#ffffff"}}>Editar Alimento</Typography>
                { erro && ( <Alert severity="warning">{erro}</Alert>)}
                { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}
                <Box component="form" onSubmit={Editar}>
                    <TextField
                        type="text"
                        label="Nome:"
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
                        label="Comentario:"
                        variant="filled"
                        margin="normal"
                        value={Comentario}
                        onChange={(e) => setComentario(e.target.value)}
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
                    <Estrelas/>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2, background:"#000", borderRadius:"10px"}} >Editar</Button>
                </Box>

            </Box>
        </Container>
    )
}

export default EditarAlimento;