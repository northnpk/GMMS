import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Snackbar, Alert, Avatar, Divider, Button, Tooltip, Menu, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, ListItemIcon, Paper } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, DoneAllOutlined, PriorityHigh, NotificationsActive as Noti, Logout, PrecisionManufacturing, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'
import PaperCount from '../../Components/PaperCount';

const data = [{
    Name: 'Kong Paoin',
    en_id: '63070501059',
    Date_ac: '25/04/2022',
    com_name: 'Kong company',
    com_id: 'HOSP342485',
    com_de: 'เป็นบริษัทในการผลิตหัวใจไว้ให้เธอ',
    cart_id: '8956112',
    item_id: 'ROB-13207',
    item_name: 'น็อต เบอร์ 6 1.1/2',
    item_re: 2
}]


export default function App() {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [openn, setOpen] = React.useState(false);

    const handleClickn = () => {
        setOpen(true);
    };

    const alertClose = () => {
        setOpen(false);
    };

    const [eropen, ersetOpen] = React.useState(false);

    const erhandleClick = () => {
        ersetOpen(true);
    };

    const eralertClose = () => {
        ersetOpen(false);
    };
    return (
        <>
            <Header title="GMMS - Admin" />
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
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ mt: 15 }}>

                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            width="100%">
                            <Paper elevation={5}
                                sx={{
                                    width: 700
                                }}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Engineer Name :
                                        </Typography>
                                        <Typography sx={{ color: '#435EBB' }}>{data[0].Name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Engineer ID : <text style={{ color: '#435EBB' }}>{data[0].en_id}</text>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <AccordionSummary>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Date :</Typography>
                                    <Typography sx={{ color: '#435EBB' }}>
                                        {data[0].Date_ac}
                                    </Typography>
                                </AccordionSummary>
                            </Paper>

                            <Paper elevation={5}
                                sx={{
                                    width: 700
                                }}>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Company Name :
                                        </Typography>
                                        <Typography sx={{ color: '#435EBB' }}>{data[0].com_name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Company ID : <text style={{ color: '#435EBB' }}>{data[0].com_id}</text>
                                            <br /> <br />
                                            Company Detail : <text style={{ color: '#435EBB' }}>{data[0].com_de}</text>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <AccordionSummary>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Cart ID :</Typography>
                                    <Typography sx={{ color: '#435EBB' }}>
                                        {data[0].cart_id}
                                    </Typography>
                                </AccordionSummary>
                            </Paper>

                            <Paper elevation={5}
                                sx={{
                                    width: 700
                                }}>
                                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Company Name :
                                        </Typography>
                                        <Typography sx={{ color: '#435EBB' }}>{data[0].com_name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Company ID : <text style={{ color: '#435EBB' }}>{data[0].com_id}</text>
                                            <br /> <br />
                                            Company Detail : <text style={{ color: '#435EBB' }}>{data[0].com_de}</text>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <AccordionSummary>
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Cart ID :</Typography>
                                    <Typography sx={{ color: '#435EBB' }}>
                                        {data[0].cart_id}
                                    </Typography>
                                </AccordionSummary>
                            </Paper>

                            <Paper elevation={5}
                                sx={{
                                    width: 700
                                }}>
                                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Item ID :
                                        </Typography>
                                        <Typography sx={{ color: '#435EBB' }}>{data[0].item_id}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Item Name : <text style={{ color: '#435EBB' }}>{data[0].item_name}</text>
                                            <br /> <br />
                                            จำนวน : <text style={{ color: '#435EBB' }}>{data[0].item_re}</text>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Stack>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={2}
                            width="100%"
                            sx={{ ml: 15 }}
                        >
                            <PaperCount
                                title="Engineer"
                                count={data[0].item_re}
                                width={600}
                            />
                            <Button variant="contained" color='success' onClick={handleClickn}
                                startIcon={<DoneAllOutlined sx={{ width: 30, height: 30 }} />}
                                endIcon={<DoneAllOutlined sx={{ width: 30, height: 30 }} />}
                                sx={{ backgroundColor: '#53984E', width: 600, height: 80, letterSpacing: '5px', fontSize: 15 }}>
                                Confirm
                            </Button>

                            <Snackbar
                                open={openn}
                                autoHideDuration={6000}
                                onClose={alertClose}
                            >
                                <Alert severity="success" onClose={alertClose} sx={{}}>Confirm Success!</Alert>
                            </Snackbar>

                            <Button variant="outlined" color='error' onClick={erhandleClick}
                                startIcon={<PriorityHigh sx={{ width: 30, height: 30 }} />}
                                endIcon={<PriorityHigh sx={{ width: 30, height: 30 }} />}
                                sx={{ backgroundColor: '#FFFFFF', width: 600, height: 80, letterSpacing: '5px', fontSize: 15 }}>
                                Cancel
                            </Button>

                            <Snackbar
                                open={eropen}
                                autoHideDuration={6000}
                                onClose={eralertClose}
                            >
                                <Alert severity="error" onClose={eralertClose}>Cancel Success!</Alert>
                            </Snackbar>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

