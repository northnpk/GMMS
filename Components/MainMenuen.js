import { Box, Button, Stack, Drawer, IconButton } from '@mui/material'
import { Home, Feed, ShoppingCart, ArrowBackIos, PrecisionManufacturing, Menu } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import { useState } from 'react';

const ButtonMenu = ({ children, icon, onClick }) => {
    return (
        <Button
            startIcon={icon}
            variant="contained"
            sx={{
                backgroundColor: '#435EBB',
                '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#3154A6'
                },
                width: 230,
                height: 60,
                letterSpacing: '5px',
                fontSize: 15
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}


export default function MyApp() {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button sx={{ position: 'fixed', top: 10, left: 50, zIndex: 4 }} onClick={() => setOpen(true)}>
                <Menu sx={{ fontSize: 30 }} />
            </Button>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
            >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    pt={10}
                    position='fixed'
                    width={230}
                    height='100vh'
                    bgcolor='#3154A6'
                    overflow='hidden'
                    left={0}
                    top={0}
                    zIndex={5}
                >
                    <PrecisionManufacturing sx={{ color: '#FFFFFF', width: 230, height: 100 }} />
                    <ButtonMenu onClick={() => router.push('/en')} icon={<Home sx={{ width: 30, height: 30 }} />}></ButtonMenu>
                    <ButtonMenu onClick={() => router.push('/en/cart')} icon={<ShoppingCart sx={{ width: 30, height: 30 }} />}></ButtonMenu>
                    <Box borderBottom="3px solid #FFFFFF" width="100%" height={40} />
                    <ButtonMenu onClick={() => router.back()} icon={<ArrowBackIos sx={{ width: 30, height: 30 }} />}></ButtonMenu>
                </Stack>
            </Drawer>
        </>
    )
}