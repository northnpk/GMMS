import * as React from 'react';
import { IconButton, Container, Select, Grid, Button, Checkbox, Dialog, Paper, Accordion, AccordionDetails, AccordionSummary, DialogActions, DialogTitle, Typography, FormControl, InputLabel, DialogContent, Stack, Divider } from '@mui/material'
import { Home, Feed, Shop, ExitToApp, ExpandMore as ExpandMoreIcon, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist3'
import { styled } from '@mui/material/styles';
import { useState } from 'react'

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'

const data = [{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ'
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ'
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ'
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ'
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ'
}
]

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#000000'
    },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [dialog, setDialog] = useState(false);
    const [form, setForm] = useState({})
    const [age, setAge] = React.useState('');

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Header title="GMMS - Engineer" />
            <MainMenu />
            <Profile />
            <Container component="main"
                maxWidth="lg"
                sx={{
                    minHeight: "80vh",
                    py: 5
                }}
            >
                <Grid sx={{ml:122}} >
                    <ColorButton variant="contained" onClick={() => setDialog(true)} startIcon={<Shop />} sx={{ color: '#000000', width: 100, height: 40 }}>CART</ColorButton>
                </Grid>
                <Mlist Topic_list="SPARE PART" rows={data} ></Mlist>
            </Container>
            <Dialog open={dialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Cart List
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        width="100%">
                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <div>
                                <Checkbox {...label} />
                            </div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        CART NAME :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].Name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        จำนวน : <text style={{ color: '#435EBB' }}>{data[0].en_id}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <div>
                                <Checkbox {...label} />
                            </div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        CART NAME :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].Name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        จำนวน : <text style={{ color: '#435EBB' }}>{data[0].en_id}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setDialog(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='error'
                        sx={{ backgroundColor: '#FF2F2F', ":hover": { backgroundColor: 'error' } }}
                        onClick={() => {
                            setDialog(false)
                            console.log(form)
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            setDialog(false)
                            console.log(form)
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}