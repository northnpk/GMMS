import Header from '../../Components/Header'
import CircleBar from '../../Components/CircleBar';
import ReportForm from '../../Components/ReportForm';
import TableLog from '../../Components/TableLog';
import MachineProfile from '../../Components/MachineProfile';
import MainMenu from '../../Components/MainMenuqc';
import Profile from '../../Components/Profile'
import Loading from '../../Components/Loading'

import { Container, Grid, Paper, Stack, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';

const Efficiency = ({ value }) => {

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Typography component="h6" variant="h6" mb={1} color="primary" fontWeight={600}>
                Efficiency
            </Typography>
            <CircleBar value={value} size={95} />
        </Paper>
    )
}

const ButtonPaper = ({ reportDialog }) => {

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Typography component="h6" variant="h6" mb={2} color="primary" fontWeight={600}>
                Check machine
            </Typography>
            <Button
                variant="contained"
                color='error'
                sx={{ mb: 2, width: '50%', backgroundColor: 'error.light', ":hover": { backgroundColor: 'error' } }}
                onClick={reportDialog}
            >
                Report
            </Button>
        </Paper>
    )

}

export default () => {

    const [cookies] = useCookies(['user'])
    const router = useRouter()
    const data = router.query;

    const [form, setForm] = useState({})
    const [list, setList] = useState([])

    const [reload, setReload] = useState(true)
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);

    const addLog = async () => {
        setOpen(true);
        const detailData = { serial: data.Serial_number, id: cookies.user.User_ID }
        const body = { ...form, ...detailData }

        const res = await fetch('/api/addError', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        setReload(!reload)
        setOpen(false);
    }

    useEffect(() => {

        const fetchList = async () => {
            const res = await fetch(`/api/getProblemType`)
            if (res.status != 200) return;
            const data = await res.json()
            setList(data);
            console.log(data)
        }
        fetchList();

    }, [])

    return (
        <>
            <Header title="GMMS - QC" />
            <Loading open={open} />
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
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={12} md={4}>
                        <MachineProfile data={data} i />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            width="100%"
                            height={650}
                        >
                            <TableLog id={(data) ? data.Serial_number : undefined} reload={reload}/>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                width="100%"
                                height="100%"
                            >
                                <Efficiency value={parseFloat(data.Efficiency)} />
                                <ButtonPaper reportDialog={() => setDialog(true)} />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Dialog open={dialog} fullWidth>
                    <DialogTitle p={1} bgcolor="error.light">
                        <Typography component="p" variant="h6" color="white" fontWeight={600}>
                            Report
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <ReportForm setData={setForm} list={list} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setDialog(false)}} variant="outline">Cancel</Button>
                        <Button
                            variant="contained"
                            color='error'
                            sx={{ backgroundColor: 'error.light', ":hover": { backgroundColor: 'error' } }}
                            onClick={() => {
                                if (form.detail == '' || setForm.type == -1) return;
                                setDialog(false)
                                addLog();
                            }}
                        >
                            Report
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
