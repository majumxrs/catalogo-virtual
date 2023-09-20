import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Link } from "@mui/material";
import Lapis from '@mui/icons-material/Create';
import Lixo from '@mui/icons-material/Delete';
import Estrelas from "./Estrelas";



function Alimento(props) {

    return (
        <Card sx={{ maxWidth: 345, mt: 10,}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.imagem}
                    alt={props.titulo}
                    sx={{
                       width:"128px",
                       height:"110px",
                       marginLeft:"80px"
                    }}
                />
                <CardContent sx={{background: "#000", color:"#fff"}}>
                    <Typography variant="h5" component="div">
                        {props.titulo}
                    </Typography>
                    <Typography variant="body2" color="#fff">
                        {props.descricao}
                    </Typography>
                    <Grid container>
                        <Grid item xs={2}>
                            <span>{props.categoria}</span>
                        </Grid>
                        <Grid item xs={3}>
                            <span>{props.ano}</span>
                        </Grid>
                        <Grid item xs>
                            <Estrelas valor={props.duracao} />
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <Grid container sx={{background:"#000", height:"35px"}}>
                <Grid item xs={10}>
                     <Lixo onClick={props.excluir} style={{textDecoration:"none", color:"#A800FF", background:"#000" }} ></Lixo>
                </Grid>
                <Grid item xs>
                    <Link href={ "edicao/" + props.id } sx={{textDecoration:"none", color:"#A800FF"}}><Lapis/></Link>
                </Grid>
            </Grid>
            
            
        </Card>
    )
}
export default Alimento;