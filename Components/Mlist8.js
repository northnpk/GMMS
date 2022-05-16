import { useState, useEffect, useCallback } from 'react'

import { Typography, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, Button, TableFooter, TablePagination } from '@mui/material'
import {
    List, CheckBox, Report, Engineering, ShoppingCart,
    ArrowForwardIos as Next,
    ArrowBackIos as Back
} from '@mui/icons-material'

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

export default function MyApp({ Topic_list, Op1, Op2, rows }) {
    const [page, setPage] = useState(1);
    const router = useRouter();
    return (
        <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>{Topic_list}</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice((page - 1) * 5, page * 5).map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row" sx={{ color: '#242424' }}>
                            {row.Name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                        <StyledTableCell align="center">
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
    )
}

