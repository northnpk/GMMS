import { Box, Button, Stack } from '@mui/material'
import { Home, Feed, ShoppingCart, ArrowBackIos, PrecisionManufacturing } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'

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

export default () => {

    const router = useRouter();

    return (
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
            <ButtonMenu icon={<Home sx={{ width: 30, height: 30 }} />}>Home</ButtonMenu>
            <ButtonMenu icon={<Feed sx={{ width: 30, height: 30 }} />}>Machine List</ButtonMenu>
            <ButtonMenu icon={<ShoppingCart sx={{ width: 30, height: 30 }} />}>Cart List</ButtonMenu>
            <Box borderBottom="3px solid #FFFFFF" width="100%" height={40} />
            <ButtonMenu onClick={() => router.back()} icon={<ArrowBackIos sx={{ width: 30, height: 30 }} />}>Back</ButtonMenu>
        </Stack>
    )
}