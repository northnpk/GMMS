import Header from '../../Components/Header'
import { Container, Grid, Paper } from '@mui/material';
import MachineTable from '../../Components/MachineTable';
import PaperCount from '../../Components/PaperCount';
import MainMenu from '../../Components/MainMenuqc';
import Profile from '../../Components/Profile'

import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default () => {

    const [data, setData] = useState([]);
    const [cookies] = useCookies(['user'])
    const [en, setEn] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            if (!cookies.user || !cookies.user.User_ID) return;

            const res = await fetch(`/api/qcMachine?id=${cookies.user.User_ID}`)
            if (res.status != 200) return;

            const data = await res.json()
            setData(data)
        }

        const fetchData2 = async () => {
            const res2 = await fetch(`/api/getEngineer`)
            if (res2.status != 200) return;

            const _data2 = await res2.json()
            setEn(_data2.length)
        }
        fetchData();
        fetchData2();

    }, [cookies.user])

    return (
        <>
            <Header title="GMMS - QC" />
            <MainMenu />
            <Profile />
            <Container
                component="main"
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
                            <MachineTable data={data} role="qc" />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}