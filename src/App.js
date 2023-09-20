import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Alimento from "./components/Alimento";
import MenuResponsivo from "./components/MenuRespinsivo";
import "./components/global.module.css";



function App() {

    const [ alimento, setAlimento ] = useState();
    const [  ,setErro ] = useState();
    

    useEffect(() => {
        const usuario = localStorage.getItem( "usuario" );
        fetch( process.env.REACT_APP_BACKEND + "produtos/"+ usuario , {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            }
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => setAlimento( json ) )
        .catch( ( erro ) => { setErro( true ) } )
    }, [])

    function Excluir( evento, id ) {
        evento.preventDefault();
        fetch( process.env.REACT_APP_BACKEND + "produtos" , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                usuario: localStorage.getItem( "usuario" )
            })
        } )
        .then( ( resposta ) => resposta.json() )
        .then( ( json ) => {
            const novaLista = Alimento.filter( (Alimento ) => Alimento._id !== id );
            setAlimento( novaLista );
        })
        .catch( ( error ) => setErro( true ) )
    }

    return (
        <>

            <MenuResponsivo />
            <Container sx={{ 
                display: "flex" ,
                flexFlow: "row",
                flexWrap: "wrap",
                gap: "2rem"
            }}>
            { alimento && (
                alimento.map( (alimento, index ) => ( 
                    <Alimento
                        imagem={alimento.imagem}
                        titulo={alimento.titulo}
                        descricao={alimento.descricao}
                        categoria={alimento.categoria}
                        ano={alimento.ano}
                        duracao={alimento.duracao}
                        excluir={ (e) => Excluir( e, alimento._id ) }
                        id={Alimento._id}
                    />
                ) )
            ) }
            </Container>
        </>
    );
}

export default App;
