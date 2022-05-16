import { useState, useEffect } from 'react';
import { Container, Grid} from '@mui/material'
import Mlist from '../../components/Mlist2'

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'

function MyApp() {

    const [data, setData] = useState([]);

    return (
        <>
            <Header title="GMMS - Admin" />
            <MainMenu />
            <Profile />
            <Container component="main"
                maxWidth="lg"
                sx={{
                    minHeight: "80vh",
                    py: 5
                }}
            >
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Grid item xs={12} md={10}>
                        <Mlist Topic_list="CART LIST" Op1="DATE" Op2="STATUS" rows={data}></Mlist>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


MyApp.displayName = "MyApp"

export default MyApp;