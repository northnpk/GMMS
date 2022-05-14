import Header from '../../Components/Header'
import CircleBar from '../../Components/CircleBar';
import TableLog from '../../Components/TableLog';
import MachineProfile from '../../Components/MachineProfile';
import MainManu from '../../Components/MainMenu'
import Profile from '../../Components/Profile'

import { Container, Grid, Paper, Stack, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';

import { useRouter } from 'next/router';
import { useState } from 'react'

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

const ErrorStatus = ({ count }) => {

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
            <Typography component="h6" variant="h6" mb={4} color="primary" fontWeight={600}>
                Error status
            </Typography>
            <Typography component="p" variant="h4" align='center' color={(count && count > 0 ? "error.light" : "")}>
                {count}
            </Typography>
        </Paper>
    )

}

export default () => {

    const router = useRouter()
    const data = router.query;

    const [dialog, setDialog] = useState(false);
    const [form, setForm] = useState({})

    return (
        <>
            <Header title="GMMS - Engineer" />
            <MainManu />
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
                        <MachineProfile data={data} />
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
                            <TableLog />
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                width="100%"
                                height="100%"
                            >
                                <Efficiency value={parseFloat(data.Efficiency)} />
                                <ErrorStatus count={4} />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Dialog open={dialog} fullWidth>
                    <DialogTitle p={1} bgcolor="success.light" mb={2}>
                        <Typography component="p" variant="h6" color="white" fontWeight={600}>
                            Error detail
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Problem type
                        </Typography>
                        <Typography component="p" variant="body1" mb={2}>
                            asdasdasdasdasdasdasdadadadada
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Detaile
                        </Typography>
                        <Typography component="p" variant="body1" mb={2}>
                            asdasdasdasdasdasdasdadadadada
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Detail
                        </Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={5}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={() => setDialog(false)} variant="outline">Cancel</Button>
                        <Button
                            variant="contained"
                            color='success'
                            sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                            onClick={() => {
                                setDialog(false)
                                console.log(form)
                            }}
                        >
                            Fixed
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
