import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering, Logout, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'

const data = [{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 80,
    Mop2: true,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 60,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 30,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 80,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 80,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 80,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 80,
    Mop2: false,
},
{
    Name: 'เครื่องจักร 1',
    Mop3: 'ยี่ห้อ 1',
    Mop1: 40,
    Mop2: true,
}]


export default function App() {

    const router = useRouter();
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
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Grid item xs={12} md={10}>
                        <Mlist Topic_list="MACHINE LIST" Op1="EFFICIEANCY" Op2="PROBLEM" rows={data} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

