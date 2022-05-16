
import { useState, useEffect, useCallback } from 'react'

import { Typography, Table, TextField, TableBody, DialogTitle, AccordionDetails, DialogActions, AccordionSummary, Accordion, DialogContent, Stack, Checkbox, Dialog, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, Button, TableFooter, TablePagination } from '@mui/material'
import {
    List, CheckBox, Report, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage,
    ArrowForwardIos as Next,
    ArrowBackIos as Back
} from '@mui/icons-material'

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useRouter } from 'next/router'
import Loading from './Loading';


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

export default ({ Topic_list, Op1, Op2 }) => {
    const [page, setPage] = useState(1);
    const router = useRouter();

    const [rows, setRows] = useState([])
    const [reload, setReload] = useState(true)
    const [id, setID] = useState('')
    const [select, setSelect] = useState({})

    const [data, setData] = useState([])

    const [usedialog, usesetDialog] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`/api/rq/getAllRequest`)
            if (res.status != 200) return;

            const data = await res.json()
            setRows(data)
        }
        fetchData();

    }, [reload])

    const setStatus = async (status) => {

        setLoad(true)
        usesetDialog(false)

        await fetch(`/api/rq/setStatus?id=${id}&status=${status}`)

        setLoad(false)
        setReload(!reload);
    }

    const getDetail = async (_id) => {

        const res = await fetch(`/api/rq/getRequestList?requestID=${_id}`)
        if (res.status != 200) return;

        const _data = await res.json()
        setData(_data)

    }

    return (
        <>
            <Loading open={load} />
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{Topic_list}</StyledTableCell>
                        <StyledTableCell align="center">{Op1}</StyledTableCell>
                        <StyledTableCell align="center">{Op2}</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice((page - 1) * 5, page * 5).map((row, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row" sx={{ color: '#242424' }}>
                                รายการขอร้อง {i + 1}<br />จำนวน {(row.count) ? row.count : '0'} รายการ
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.Date.split('T')[0]}</StyledTableCell>
                            <StyledTableCell align="center">{row.Description}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => { usesetDialog(true); setID(row.Request_ID); setSelect(row); getDetail(row.Request_ID) }} startIcon={<List />} sx={{ color: '#000000', width: 100, height: 40 }}>Check</ColorButton>
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

            <Dialog open={usedialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600} align='center'>
                        Accept request
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography component="p" variant="h6" fontWeight={600} align='left' mb={2}>
                        Engineer
                    </Typography>
                    <Typography component="p" variant="h6" align='left'mb={2}>
                        {select.Firstname} {select.Lastname}
                    </Typography>
                    <Typography component="p" variant="h6" fontWeight={600} align='left'mb={2}>
                        List ( {(select.count) ? select.count : '0'} )
                    </Typography>
                    <Typography component="p" variant="h6" align='left' mb={2}>
                        {data.map((v) => (v.Item_Name) + ' (' + v.Amount + ')  ')}
                    </Typography>

                    {
                        (select.Status == '1') && < Stack direction='row' justifyContent='center' alight='center' spacing={2}>
                            <Button
                                variant="contained"
                                color='success'
                                sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                                onClick={() => {
                                    setStatus(3)
                                }}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="contained"
                                color='error'
                                sx={{ backgroundColor: 'error.light', ":hover": { backgroundColor: 'error' } }}
                                onClick={() => {
                                    setStatus(2)
                                }}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    }
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => { usesetDialog(false) }} variant="outline">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

