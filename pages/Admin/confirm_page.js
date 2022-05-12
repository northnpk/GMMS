import * as React from 'react';
import { IconButton, Container, Grid, Box, Stack, Snackbar, Alert, Avatar, Divider, Button, Tooltip, Menu, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, ListItemIcon, Paper } from '@mui/material'
import { Home, Feed, ShoppingCart, ExitToApp, DoneAllOutlined, PriorityHigh, NotificationsActive as Noti, Logout, PrecisionManufacturing, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import Board from '../../components/Board';
import { useRouter } from 'next/router'

const data = [{
    Name: 'Kong Paoin',
    en_id: '63070501059',
    Date_ac: '25/04/2022',
    com_name: 'Kong company',
    com_id: 'HOSP342485',
    com_de: 'เป็นบริษัทในการผลิตหัวใจไว้ให้เธอ',
    cart_id: '8956112',
    item_id: 'ROB-13207',
    item_name: 'น็อต เบอร์ 6 1.1/2',
    item_re: 2
}]

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#3154A6'),
    backgroundColor: '#435EBB',
    '&:hover': {
        backgroundColor: '#FFFFFF',
        color: '#3154A6'
    },
}));

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const router = useRouter();

    const [openn, setOpen] = React.useState(false);

    const handleClickn = () => {
        setOpen(true);
    };

    const alertClose = () => {
        setOpen(false);
    };
    
    const [eropen, ersetOpen] = React.useState(false);

    const erhandleClick = () => {
        ersetOpen(true);
    };

    const eralertClose = () => {
        ersetOpen(false);
    };
    return (
        <Container component="main" maxWidth="xl">
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                sx={{ xl: 50 }}>
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
                            <ColorButton variant="contained" onClick={() => router.push('/Admin/cart_list')} startIcon={<ExitToApp sx={{ width: 30, height: 30 }} />} sx={{ color: '#FFFFFF', width: 230, height: 60, letterSpacing: '5px', fontSize: 15 }}>Back</ColorButton>
                        </Box>
                    </Stack>
                </Box>
            </Stack>


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
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start">
                <Grid item xs={12} md={6}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ ml: 50, mt: 15 }}>
                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Engineer Name :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].Name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Engineer ID : <text style={{ color: '#435EBB' }}>{data[0].en_id}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <AccordionSummary>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Date :</Typography>
                                <Typography sx={{ color: '#435EBB' }}>
                                    {data[0].Date_ac}
                                </Typography>
                            </AccordionSummary>
                        </Paper>

                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Company Name :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].com_name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Company ID : <text style={{ color: '#435EBB' }}>{data[0].com_id}</text>
                                        <br /> <br />
                                        Company Detail : <text style={{ color: '#435EBB' }}>{data[0].com_de}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <AccordionSummary>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Cart ID :</Typography>
                                <Typography sx={{ color: '#435EBB' }}>
                                    {data[0].cart_id}
                                </Typography>
                            </AccordionSummary>
                        </Paper>

                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Company Name :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].com_name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Company ID : <text style={{ color: '#435EBB' }}>{data[0].com_id}</text>
                                        <br /> <br />
                                        Company Detail : <text style={{ color: '#435EBB' }}>{data[0].com_de}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <AccordionSummary>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>Cart ID :</Typography>
                                <Typography sx={{ color: '#435EBB' }}>
                                    {data[0].cart_id}
                                </Typography>
                            </AccordionSummary>
                        </Paper>

                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Item ID :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>{data[0].item_id}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Item Name : <text style={{ color: '#435EBB' }}>{data[0].item_name}</text>
                                        <br /> <br />
                                        จำนวน : <text style={{ color: '#435EBB' }}>{data[0].item_re}</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Stack>
                </Grid>


                <Grid item xs={12} md={6}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 15 }}>
                        <Paper elevation={5} sx={{ width: 300 }}>
                            <Grid item xs={4}
                                sx={{ ml: 12 }}>
                                <Board
                                    title="Engineer"
                                    count={data[0].item_re}
                                />
                            </Grid>
                        </Paper>
                        <Button variant="contained" color='success' onClick={handleClickn}
                            startIcon={<DoneAllOutlined sx={{ width: 30, height: 30 }} />}
                            endIcon={<DoneAllOutlined sx={{ width: 30, height: 30 }} />}
                            sx={{ backgroundColor: '#53984E', width: 300, height: 60, letterSpacing: '5px', fontSize: 15 }}>
                            Confirm
                        </Button>

                        <Snackbar
                            open={openn}
                            autoHideDuration={6000}
                            onClose={alertClose}
                        >
                            <Alert severity="success" onClose={alertClose} sx={{}}>Confirm Success!</Alert>
                        </Snackbar>

                        <Button variant="outlined" color='error' onClick={erhandleClick}
                            startIcon={<PriorityHigh sx={{ width: 30, height: 30 }} />}
                            endIcon={<PriorityHigh sx={{ width: 30, height: 30 }} />}
                            sx={{ backgroundColor: '#FFFFFF', width: 300, height: 60, letterSpacing: '5px', fontSize: 15 }}>
                            Cancel
                        </Button>

                        <Snackbar
                            open={eropen}
                            autoHideDuration={6000}
                            onClose={eralertClose}
                        >
                            <Alert severity="error" onClose={eralertClose}>Cancel Success!</Alert>
                        </Snackbar>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

