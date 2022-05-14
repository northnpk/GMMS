import { useState, useEffect, useCallback } from 'react'

import { Typography, Table, TextField, TableBody, DialogTitle, AccordionDetails, DialogActions, AccordionSummary, Accordion, DialogContent, Stack, Checkbox, Dialog, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, Button, TableFooter, TablePagination } from '@mui/material'
import {
    List, CheckBox, Report, Engineering, ShoppingCart, ExpandMore as ExpandMoreIcon, Shop,
    ArrowForwardIos as Next,
    ArrowBackIos as Back
} from '@mui/icons-material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useRouter } from 'next/router'


const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3154A6',
        color: '#FFFFFF',
        fontSize: 30,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#EEF6FF',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const problemicon = (status) => {
    if (!status)
        return (<Report fontSize="large" sx={{ color: '#E33122' }} />);
    else
        return (<CheckBox fontSize="large" sx={{ color: '#65FF00' }} />);
}

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#CACACA'),
    backgroundColor: '#FFFFFF',
    '&:hover': {
        backgroundColor: '#E5E5E5',
    },
}));

const Control = ({ count, page, setPage, perPage = 5 }) => {

    const [start, setStart] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const next = useCallback(() => {
        if (page < maxPage) {
            setPage(page + 1);
            setStart(start + perPage)
        }
    }, [page, maxPage]);

    const back = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
            setStart(start - perPage)
        }
    }, [page]);

    useEffect(() => {
        setMaxPage(Math.ceil(count / 5))
        setStart(count == 0 ? 0 : 1);
    }, [count])

    return (
        <>
            <Typography component="p" variant="body1" sx={{ display: 'inline-flex', mr: 2 }} gutterBottom>
                {start} - {(start + (perPage - 1) < count ? (start + (perPage - 1)) : count)} of {count}
            </Typography>
            <IconButton aria-label="back" onClick={back} disabled={page == 1}>
                <Back />
            </IconButton>
            <IconButton aria-label="next" onClick={next} disabled={page == maxPage}>
                <Next />
            </IconButton>
        </>
    )
}

export default ({ Topic_list, Op1, Op2, rows }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = useState(1);
    const open = Boolean(anchorEl);

    const [dialog, setDialog] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const [usedialog, usesetDialog] = useState(false);
    const [useexpanded, usesetExpanded] = React.useState(false);

    const [vidialog, visetDialog] = useState(false);
    const [viexpanded, visetExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const usehandleChange = (panel) => (event, isExpanded) => {
        usesetExpanded(isExpanded ? panel : false);
    };

    const vihandleChange = (panel) => (event, isExpanded) => {
        visetExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{Topic_list}</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">
                            <Grid >
                                <ColorButton variant="contained" onClick={() => setDialog(true)} startIcon={<Shop />} sx={{ color: '#000000', width: 100, height: 40 }}>CART</ColorButton>
                            </Grid>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice((page - 1) * 5, page * 5).map((row) => (
                        <StyledTableRow key={row.Name}>
                            <StyledTableCell component="th" scope="row" sx={{ color: '#242424' }}>
                                {row.Name}<br />{row.Mop3}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => usesetDialog(true)} startIcon={<Engineering />} sx={{ color: '#000000', width: 100, height: 40 }}>Use</ColorButton>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => usesetDialog(true)} startIcon={<ShoppingCart />} sx={{ color: '#000000', width: 100, height: 40 }}>Buy</ColorButton>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => visetDialog(true)} startIcon={<List />} sx={{ color: '#000000', width: 100, height: 40 }}>View</ColorButton>
                                </Grid>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} align="right">
                            <Control count={rows.length} page={page} setPage={setPage} />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <Dialog open={dialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Cart List
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        width="100%">
                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <div>
                                <Checkbox {...label} />
                            </div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        CART NAME :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>dss</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        จำนวน : <text style={{ color: '#435EBB' }}>dadad</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                        <Paper elevation={5}
                            sx={{
                                width: 500
                            }}>
                            <div>
                                <Checkbox {...label} />
                            </div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        CART NAME :
                                    </Typography>
                                    <Typography sx={{ color: '#435EBB' }}>fdsfs</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        จำนวน : <text style={{ color: '#435EBB' }}>dsasadad</text>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setDialog(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='error'
                        sx={{ backgroundColor: '#FF2F2F', ":hover": { backgroundColor: 'error' } }}
                        onClick={() => {
                            setDialog(false)
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            setDialog(false)
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={usedialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        ITEM
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        width="100%">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '60ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="filled-basic" label="จำนวน" variant="filled" />
                        </Box>
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => usesetDialog(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            usesetDialog(false)
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={vidialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Error detail
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                        Problem type
                    </Typography>
                    <Typography component="p" variant="body1" mb={2}>
                        asdasdasdasdasdasdasdadadadada
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                        Detail
                    </Typography>
                    <Typography component="p" variant="body1" mb={2}>
                        asdasdasdasdasdasdasdadadadada
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                        Detail
                    </Typography>
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => visetDialog(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            visetDialog(false)
                        }}
                    >
                        Fixed
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

