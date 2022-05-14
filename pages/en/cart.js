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
                <Mlist Topic_list="SPARE PART" rows={data} ></Mlist>
            </Container>
        </>
    )
}