import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenuen';
import Profile from '../../Components/Profile'

import { Container, Grid, Paper } from '@mui/material';
import MachineTable from '../../Components/MachineTable';
import PaperCount from '../../Components/PaperCount';

import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

export default () => {

    const [data, setData] = useState([]);
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        if (!cookies.user || !cookies.user.User_ID) return

        const fetchData = async () => {

            const res = await fetch(`/api/enMachine?id=${cookies.user.User_ID}`)
            if (res.status != 200) return;

            const _data = await res.json()
            setData(_data)
            console.log(_data);
        }
        fetchData();

    }, [cookies.user])

    return (
        <>
            <Header title="GMMS - Engineer" />
            <MainMenu />
            <Profile />
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    minHeight: "95vh",
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
                    <Grid item xs={12} md={4}>
                        <PaperCount title="Engineer" count={4} />
                    </Grid>


                    <Grid item xs={12} md={4}>
                        <PaperCount title="Machinery" count={4} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <PaperCount title="Broken machine" count={3} error={true} />
                    </Grid>

                    <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2
                            }}
                        >
                            <MachineTable data={data} role="en" />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}