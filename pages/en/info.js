import Header from '../../Components/Header'
import CircleBar from '../../Components/CircleBar';
import TableLog from '../../Components/TableLogEngineer';
import MachineProfile from '../../Components/MachineProfile';
import MainManu from '../../Components/MainMenuen'
import Profile from '../../Components/Profile'
import Loading from '../../Components/Loading'

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

const MyApp = () => {

    const router = useRouter()
    const data = router.query;

    const [detail, setDetail] = useState('')
    const [count, setCount] = useState(0)
    const [log, setLog] = useState({})

    const [open, setOpen] = useState(false)
    const [reload, setReload] = useState(true)

    const Fix = async (errorID, errorDetail) => {
        setOpen(true);
        const newDetail = errorDetail + '<br>' + detail;
        const body = { detail: newDetail, errorID: errorID }

        await fetch('/api/fixLog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        setReload(!reload)
        setOpen(false);
        setDetail('')
    }

    return (
        <>
            <Header title="GMMS - Engineer" />
            <MainManu />
            <Profile />
            <Loading open={open} />
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
                            <TableLog id={(data) ? data.Serial_number : undefined} reload={reload} setCount={setCount} selectData={setLog} />
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                width="100%"
                                height="100%"
                            >
                                <Efficiency value={parseFloat(data.Efficiency)} />
                                <ErrorStatus count={count} />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Dialog open={Object.keys(log).length > 0} fullWidth >
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
                            {log.Category} - LV {log.Problem_LV}
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Error detail
                        </Typography>
                        <Typography component="p" variant="body1" mb={2}>
                            {(log.ProblemDetail) && log.ProblemDetail.split('<br>')[0]}
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Repair detail
                        </Typography>
                        {
                            (log.Status == '0') ? <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={5}
                                fullWidth
                                value={detail}
                                onChange={e => setDetail(e.target.value)}
                            /> : (log.ProblemDetail) && log.ProblemDetail.split('<br>')[1]
                        }
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={() => setLog({})} variant="outline">Cancel</Button>
                        {
                            (log.Status == '0') && <Button
                                variant="contained"
                                color='success'
                                sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                                onClick={() => {
                                    Fix(log.ErrorLog_ID, log.ProblemDetail);
                                    setLog({})
                                }}
                            >
                                Fixed
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}

MyApp.displayName = "MyApp"

export default MyApp;