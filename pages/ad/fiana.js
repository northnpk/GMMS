import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { List, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering, Logout, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist8'
import { styled } from '@mui/material/styles';

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'
import { useRouter } from 'next/router'

const data = [{
    Name: '1.ข้อมูลเครื่องจักรที่พบปัญหาบ่อยในรอบ 1 ปี ประจำปี 2565',
},
{
    Name: '2.ประเภทของเครื่องจักรที่พบปัญหา ประจำปี 2565',
},
{
    Name: '3.อะไหล่ที่มักมีการเบิกใช้งาน ประจำปี 2565',
},
{
    Name: '4.ประเภทของปัญหาที่พบเจอในเครื่องจักร ประจำปี 2565'
}
]

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#CACACA'),
    backgroundColor: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#E5E5E5',
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
    const router = useRouter();
    return (
        <>
            <Header title="GMMS - Admin" />
            <MainMenu />
            <Profile />
            <Container component="main"
                maxWidth="lg"
                sx={{
                    minHeight: "80vh",
                    py: 5
                }}
            >

                <Mlist Topic_list="ANALYTIC REPORT" rows={data}></Mlist>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 5 }}>
                    <ColorButton variant="contained" onClick={() => router.push('/ad/analy1')} startIcon={<List />} sx={{ color: '#000000', width: 120, height: 40 }}>View 1</ColorButton>
                    <ColorButton variant="contained" onClick={() => router.push('/ad/analy2')} startIcon={<List />} sx={{ color: '#000000', width: 120, height: 40, ml: 10 }}>View 2</ColorButton>
                    <ColorButton variant="contained" onClick={() => router.push('/ad/analy3')} startIcon={<List />} sx={{ color: '#000000', width: 120, height: 40, ml: 10 }}>View 3</ColorButton>
                    <ColorButton variant="contained" onClick={() => router.push('/ad/analy4')} startIcon={<List />} sx={{ color: '#000000', width: 120, height: 40, ml: 10 }}>View 4</ColorButton>
                </Grid>
            </Container>
        </>
    )
}