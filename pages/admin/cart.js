import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering, Logout, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist2'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenu';
import Profile from '../../Components/Profile'

const data = [{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: true,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: false,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: true,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: false,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: true,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: false,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: true,
},
{
    Name: 'รายการสินค้า 1',
    Mop3: 'จำนวน : 3 รายการ',
    Mop1: '25/04/2022',
    Mop2: false,
}
]

export default function App() {

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
                        <Mlist Topic_list="CART LIST" Op1="DATE" Op2="STATUS" rows={data}></Mlist>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}