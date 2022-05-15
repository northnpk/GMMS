import Header from '../../Components/Header'
import CircleBar from '../../Components/CircleBar';
import TableLog from '../../Components/TableLogAdmin';
import MachineProfile from '../../Components/MachineProfile';
import MainManu from '../../Components/MainMenu'
import Profile from '../../Components/Profile'
import Loading from '../../Components/Loading'

import * as React from 'react';
import { Container, Grid, Paper, MenuItem, Stack, FormControl, InputLabel, Select, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

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
                Error
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

    const [log, setLog] = useState({})
    const [count, setCount] = useState(0)
    const [engineerList, setEngineerList] = useState([]);
    const [engineer, setEngineer] = useState(0)

    const [reload, setReload] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {

        const fetchList = async () => {
            const res = await fetch(`/api/getEngineer`)
            if (res.status != 200) return;
            const data = await res.json()
            setEngineerList(data);
        }
        fetchList();

    }, [])

    const Check = async (id, errorID) => {
        setOpen(true);
        const body = { id, errorID }

        await fetch('/api/setEngineer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        setReload(!reload)
        setOpen(false);
    }

    return (
        <>
            <Header title="GMMS - Engineer" />
            <Loading open={open} />
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
                <Dialog open={Object.keys(log).length > 0} fullWidth>
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
                            {log.Catagory} - LV {log.Problem_LV}
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Detail
                        </Typography>
                        <Typography component="p" variant="body1" mb={2}>
                            {log.ProblemDetail}
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                            Engineer
                        </Typography>
                        {
                            (!log.Firstname) ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={engineer}
                                onChange={(e) => setEngineer(e.target.value)}
                                fullWidth
                            >
                                <MenuItem key={0} value={0}>None</MenuItem>
                                {
                                    engineerList.map((value, i) => <MenuItem key={i + 1} value={value.User_ID}>{value.Firstname} {value.Lastname}</MenuItem>)
                                }
                            </Select> :
                                <Typography component="p" variant="body1" mb={2}>
                                    {log.Firstname} {log.Lastname}
                                </Typography>
                        }
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={() => setLog({})} variant="outline">{(!log.Firstname) ? 'Cancel' : 'Close'}</Button>
                        {
                            (!log.Firstname) && <Button
                                variant="contained"
                                color='success'
                                sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                                onClick={() => {
                                    Check(engineer, log.ErrorLog_ID);
                                    setLog({})
                                }}
                            >
                                Check
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}  
