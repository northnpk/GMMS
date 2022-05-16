import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering, Logout, PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist3'
import { styled } from '@mui/material/styles';

import Header from '../../Components/Header'
import MainMenu from '../../Components/MainMenuen';
import Profile from '../../Components/Profile'

import { useState, useEffect } from 'react';

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

                <Mlist Topic_list="SPARE PART"></Mlist>
            </Container>
        </>
    )
}