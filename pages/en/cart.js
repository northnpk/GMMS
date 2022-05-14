import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering, Logout, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist3'
import { styled } from '@mui/material/styles';

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
    color: theme.palette.getContrastText('#3154A6'),
    backgroundColor: '#435EBB',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#3154A6'
    },
}));

export default function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

                <Mlist Topic_list="SPARE PART" rows={data}></Mlist>
            </Container>
        </>
    )
}