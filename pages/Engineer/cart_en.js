import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Avatar, Button, Divider,Tooltip,Menu,MenuItem,ListItemIcon } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering ,Logout,PrecisionManufacturing } from '@mui/icons-material'
import Mlist from '../../components/Mlist3'
import { styled } from '@mui/material/styles';

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
        color:'#3154A6'
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
        <Container component="main" maxWidth="xl">
            <Box
                sx={{
                    width: 230,
                    height: 825,
                    backgroundColor: '#3154A6',
                    position: 'absolute',
                    height: '100vh',
                    overflow: 'hidden',
                    left: 0,
                }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ mt: 15 }}
                >
                    <PrecisionManufacturing sx={{ color: '#FFFFFF', width: 230, height: 100 }}>GMMS</PrecisionManufacturing >
                    <Grid  >
                        <ColorButton variant="contained" startIcon={<Home sx={{ width:30,height:30}}/>} sx={{ color: '#FFFFFF', width: 230, height: 60,letterSpacing:'5px' ,fontSize:15}}>Home</ColorButton>
                    </Grid>
                    <Grid item lg={1} >
                        <ColorButton variant="contained" startIcon={<Feed sx={{ width:30,height:30}}/>} sx={{ color: '#FFFFFF', width: 230, height: 60 ,letterSpacing:'5px' ,fontSize:15}}>Machine List</ColorButton>
                    </Grid>
                    <Grid item lg={1} >
                        <ColorButton variant="contained" startIcon={<ShoppingCart sx={{ width:30,height:30}}/>} sx={{ color: '#FFFFFF', width: 230, height: 60,letterSpacing:'5px' ,fontSize:15 }}>Cart List</ColorButton>
                    </Grid>
                    <Divider></Divider>
                    <Divider></Divider>
                    <Divider></Divider>
                    <Box sx={{ borderTop: '3px solid', color: '#CACACA', width: 230 }} pt={3}>
                        <ColorButton variant="contained" startIcon={<ExitToApp sx={{ width:30,height:30}}/>} sx={{ color: '#FFFFFF', width: 230, height: 60,letterSpacing:'5px' ,fontSize:15 }}>Back</ColorButton>
                    </Box>
                </Stack>
            </Box>

            <Stack
                direction="row-reverse"
                justifyContent="flex-start"
                alignItems="flex-end"
                spacing={1}
            >
                <React.Fragment>
                    <Box sx={{  mt: 6, mr: 2,display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 50, height: 50 ,border:'5px solid #E9DF00'}}>M</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>

            </Stack>

            <Mlist Topic_list="SPARE PART"  rows={data}></Mlist>
        </Container>
    )
}