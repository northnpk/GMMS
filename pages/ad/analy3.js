import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material'
import Mlist from '../../components/Mlist6'

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'


function MyApp() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`/api/adana3`)
            if (res.status != 200) return;

            const data = await res.json()
            setData(data)
        }
        fetchData();

    }, [])

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
                        <Mlist Topic_list="Item ID" Op1="Item Name" Op2="Request counting"  rows={data} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


MyApp.displayName = "MyApp"

export default MyApp;