import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenuen';
import Profile from '../../Components/Profile'

import { Container, Grid, Paper } from '@mui/material';
import MachineTable from '../../Components/MachineTable';
import PaperCount from '../../Components/PaperCount';

import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

const MyApp = () => {

    const [data, setData] = useState([]);
    const [cookies] = useCookies(['user']);
    const [en, setEn] = useState(0);

    useEffect(() => {
        if (!cookies.user || !cookies.user.User_ID) return

        const fetchData = async () => {

            const res = await fetch(`/api/enMachine?id=${cookies.user.User_ID}`)
            if (res.status != 200) return;

            const _data = await res.json()
            setData(_data)

            const res2 = await fetch(`/api/getEngineer`)
            if (res.status != 200) return;

            const _data2 = await res2.json()
            setEn(_data2.length)
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
                        <PaperCount title="Engineer" count={en} />
                    </Grid>


                    <Grid item xs={12} md={4}>
                        <PaperCount title="Machine" count={data.length} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <PaperCount title="Broken machine" count={data.filter((value) => value.Status && !value.Status.includes('1')).length} error={true} />
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

MyApp.displayName = "MyApp"

export default MyApp;