import Header from '../../Components/Header'
import { Container, Grid, Paper } from '@mui/material';
import MachineTable from '../../Components/MachineTable';
import PaperCount from '../../Components/PaperCount';
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'

export default ({ data }) => {

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
                            <MachineTable data={data} path="/qc/info" />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export async function getServerSideProps() {

    const res = await fetch(`http://localhost:3000/api/getMachine`)
    if (res.status != 200)
        return { props: { data: [] } }

    const data = await res.json()
    return { props: { data } }
}