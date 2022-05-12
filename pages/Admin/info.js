import * as React from 'react'
import Header from '../../Components/Header'
import { Box, Button, Container, Grid, Paper, Stack, Typography, IconButton, Avatar, Divider,Tooltip,Menu,MenuItem,ListItemIcon} from '@mui/material';
import { Home, Feed, ShoppingCart, ExitToApp, NotificationsActive as Noti, Engineering ,Logout,PrecisionManufacturing } from '@mui/icons-material'
import Image from 'next/image';
import CircleBar from '../../Components/CircleBar';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#3154A6'),
    backgroundColor: '#435EBB',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color:'#3154A6'
    },
}));

const MachineImage = ({ title, src }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                width: "100%"
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
            >
                <Image
                    src="https://static.wixstatic.com/media/760b9a_afdc953801d541d5b67edf6b845fe056~mv2.png/v1/fill/w_640,h_500,fp_0.50_0.50,lg_1,q_85,enc_auto/760b9a_afdc953801d541d5b67edf6b845fe056~mv2.png"
                    width={300}
                    height={300}
                    loading="lazy"
                    objectFit='cover'
                />
                <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    align="center"
                >
                    {title}
                </Typography>
            </Stack>
        </Paper>
    )
}

const TextData = ({ children, minHeight }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                width: "100%",
                minHeight: (minHeight) ? minHeight : 0
            }}
        >
            <Typography
                component="h6"
                variant="h6"
                gutterBottom
                align="left"
            >
                {children}
            </Typography>
        </Paper>
    );
}

const Efficiency = ({ value }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                pt: 5,
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Typography component="h6" variant="h6" mb={5}>
                Efficiency
            </Typography>
            <CircleBar value={value} />
        </Paper>
    )
}

const ProblemLevel = ({ value = 0 }) => {

    const color = ["#7A161C", "#932825", "#B7473B", "#DB6C56", "#FF9777", "#FFB899", "#FFCCAD", "#FFE1C8", "#FFEAE4"]

    return (
        <Box
            width={50}
            height={120}
            sx={{ backgroundColor: '#f5f7f9' }}
        >
            {color.map((c, i) => <Box width="100%" height="11.1%" sx={{ backgroundColor: ((9 - i) <= value) ? c : 'transparent' }} />)}
        </Box>
    )
}

const Promblem = ({ value }) => {

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                pt: 5,
                borderRadius: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <Typography component="h6" variant="h6" mb={3}>
                ระดับความรุนแรกของปัญหา
            </Typography>
            <ProblemLevel value={value} />
        </Paper >
    )
}

export default () => {
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
            <Header title="QC - Machine info" />
            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    height: "80vh"
                }}
            >
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
                            <ColorButton variant="contained" onClick={() => router.push('/Admin/machine_list')} startIcon={<Home sx={{ width: 30, height: 30 }} />} sx={{ color: '#FFFFFF', width: 230, height: 60, letterSpacing: '5px', fontSize: 15 }}>Home</ColorButton>
                        </Grid>
                        <Grid item lg={1} >
                            <ColorButton variant="contained" onClick={() => router.push('/Admin/machine_list')} startIcon={<Feed sx={{ width: 30, height: 30 }} />} sx={{ color: '#FFFFFF', width: 230, height: 60, letterSpacing: '5px', fontSize: 15 }}>Machine List</ColorButton>
                        </Grid>
                        <Grid item lg={1} >
                            <ColorButton variant="contained" onClick={() => router.push('/Admin/cart_list')} startIcon={<ShoppingCart sx={{ width: 30, height: 30 }} />} sx={{ color: '#FFFFFF', width: 230, height: 60, letterSpacing: '5px', fontSize: 15 }}>Cart List</ColorButton>
                        </Grid>
                        <Divider></Divider>
                        <Divider></Divider>
                        <Divider></Divider>
                        <Box sx={{ borderTop: '3px solid', color: '#CACACA', width: 230 }} pt={3}>
                            <ColorButton variant="contained" onClick={() => router.push('/Admin/machine_list')} startIcon={<ExitToApp sx={{ width: 30, height: 30 }} />} sx={{ color: '#FFFFFF', width: 230, height: 60, letterSpacing: '5px', fontSize: 15 }}>Back</ColorButton>
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
                        <Box sx={{ mt: 6, mr: 2, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 50, height: 50, border: '5px solid #E9DF00' }}>M</Avatar>
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
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ml:12}}
                >
                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            height={650}
                        >
                            <MachineImage title="เครื่องคัดขนาด" />
                            <TextData >Device model :</TextData>
                            <TextData >Serial number :</TextData>
                            <TextData >วันนำเข้า :</TextData>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} height='max-content'>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            height={650}
                        >
                            <TextData minHeight={150}>
                                Problem :
                            </TextData>
                            <TextData minHeight={150}>
                                ประเภทของปัญหา :
                            </TextData>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={2}
                                height="100%"
                                width="100%"
                            >
                                <Efficiency value={75} />
                                <Stack
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                    width="100%"
                                    height="100%"
                                >
                                    <Promblem value={9} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
