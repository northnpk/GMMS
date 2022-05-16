import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { Typography, Table, TextField, TableBody, DialogTitle, AccordionDetails, DialogActions, AccordionSummary, Accordion, DialogContent, Stack, Checkbox, Dialog, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, Button, TableFooter, TablePagination } from '@mui/material'
import {
    List, CheckBox, Report, Engineering, ShoppingCart, AddCircle, Shop,
    ArrowForwardIos as Next,
    ArrowBackIos as Back
} from '@mui/icons-material'

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Loading from './Loading'


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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

export default function MyApp({ Topic_list }){

    const [page, setPage] = useState(1);

    const [rows, setRows] = useState([])
    const [detail, setDetail] = useState({});

    const [cart, setCart] = useState({})
    const [request, setRequest] = useState({})

    const [cartList, setCartList] = useState([])
    const [requestList, setRequestList] = useState([])

    const [reload, setReload] = useState(false);
    const [reload2, setReload2] = useState(false);

    const [dialog, setDialog] = useState(false);
    const [dialog2, setDialog2] = useState(false);
    const [usedialog, usesetDialog] = useState(false);
    const [usedialog2, usesetDialog2] = useState(false);
    const [vidialog, visetDialog] = useState(false);

    //From
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [amountUse, setAmountUse] = useState(0);
    const [reList, setReList] = useState(false);
    const [deleteL, setDelete] = useState([]);

    const [reList2, setReList2] = useState(false);

    const selectDelete = (i) => {
        setDelete((l) => {
            if (l.indexOf(i) >= 0) {
                l.splice(l.indexOf(i), 1)
                console.log(l)
                return l;
            } else {
                l.push(i)
                console.log(l)
                return l;
            }
        })
    }

    //----------------

    const addCartList = async () => {

        if (amountUse == 0) {
            setError(true);
            return
        }

        setLoad(true)
        usesetDialog(false);

        const body = {
            cartID: cart.Cart_ID,
            itemID: detail.Item_ID,
            amount: amountUse,
            total: detail.inStock - amountUse
        }

        await fetch(`/api/addCartList`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        setLoad(false)
        //setReload(!reload);
    }

    const onDelete = async () => {

        if (deleteL.length == 0) {
            return
        }

        setLoad(true)
        setDialog(false)

        const deleteID = cartList.map((v, i) => {

            if (deleteL.includes(i)) return v.Item_ID

        });

        const body = {
            cartID: cart.Cart_ID,
            itemID: deleteID,
        }

        await fetch(`/api/deleteCartList`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        setLoad(false)
        setReList(!reList);
        setDialog(true)
        setDelete([])
    }

    const onConfirm = async () => {

        if (cartList.length == 0) {
            return
        }

        setLoad(true)
        setDialog(false)

        await fetch(`/api/reqCartAccept?id=${cart.Cart_ID}`)

        setLoad(false)
        setReList(!reList);
        setReload2(!reload2);
    }

    //-------------------------------

    const addRequestList = async () => {

        if (amountUse == 0 || detail.inStock < amountUse) {
            setError(true);
            return
        }

        setLoad(true)
        usesetDialog2(false);

        const body = {
            requestID: request.Request_ID,
            itemID: detail.Item_ID,
            amount: amountUse,
            total: detail.inStock - amountUse
        }

        await fetch(`/api/rq/addRqList`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        setLoad(false)
        setReload(!reload);
        setReload2(!reload2);
    }

    const onDelete2 = async () => {

        if (deleteL.length == 0) {
            return
        }

        setLoad(true)
        setDialog2(false)

        let total = {}
        const deleteID = requestList.map((v, i) => {

            if (deleteL.includes(i)) {
                total[v.Item_ID] = v.Amount
                return v.Item_ID
            }

        });

        const body = {
            requestID: request.Request_ID,
            itemID: deleteID,
            total: total
        }

        await fetch(`/api/rq/deleteRequestList`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        setLoad(false)
        setReList2(!reList2);
        setDialog2(true)
        setDelete([])
        setReload(!reload);
    }

    const onConfirm2 = async () => {

        if (requestList.length == 0) {
            return
        }

        setLoad(true)
        setDialog2(false)

        await fetch(`/api/rq/reqRqAccept?id=${request.Request_ID}`)

        setLoad(false)
        setReList2(!reList2);
    }

    const [cookies] = useCookies(['user'])

    useEffect(() => {

        if (!cookies.user || !cookies.user.User_ID) return;
        const fetchData = async () => {

            const res = await fetch(`/api/getCart?id=${cookies.user.User_ID}`)
            if (res.status != 200) return;

            const data = await res.json()
            setCart(data)

            const res2 = await fetch(`/api/rq/getReq?id=${cookies.user.User_ID}`)
            if (res.status != 200) return;

            const data2 = await res2.json()
            setRequest(data2)
        }
        fetchData();

    }, [cookies.user, reload2])

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`/api/itemlist`)
            if (res.status != 200) return;

            const _data = await res.json()
            setRows(_data)
        }
        fetchData();

    }, [reload])

    useEffect(() => {

        const fetchData2 = async () => {
            if (!cart.Cart_ID) return;
            const res = await fetch(`/api/getCartList?cartID=${cart.Cart_ID}`)
            if (res.status != 200) return;

            const _data = await res.json()
            console.log(_data)
            setCartList(_data)
        }
        fetchData2();

    }, [reList])


    useEffect(() => {

        const fetchData2 = async () => {
            if (!request.Request_ID) return;
            const res = await fetch(`/api/rq/getRequestList?requestID=${request.Request_ID}`)
            if (res.status != 200) return;

            const _data = await res.json()
            console.log(_data)
            setRequestList(_data)
        }
        fetchData2();

    }, [reList2])

    return (
        <>
            <Loading open={load} />
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={3}>{Topic_list}</StyledTableCell>
                        <StyledTableCell align="center" width={250}>
                            <ColorButton variant="contained" onClick={() => { setDialog2(true); setReList2(!reList2); setDelete([]) }} startIcon={<AddCircle />} sx={{ color: '#000000', width: 100, height: 40, mr: 2 }}>Request</ColorButton>
                            <ColorButton variant="contained" onClick={() => { setDialog(true); setReList(!reList); setDelete([]) }} startIcon={<Shop />} sx={{ color: '#000000', width: 100, height: 40 }}>CART</ColorButton>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice((page - 1) * 5, page * 5).map((row, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row" sx={{ color: '#242424' }}>
                                {row.Item_Name}<br />In stock : {row.inStock}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => { setDetail(row); usesetDialog2(true); setAmountUse(0) }} startIcon={<Engineering />} sx={{ color: '#000000', width: 100, height: 40 }}>Use</ColorButton>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => { setDetail(row); usesetDialog(true); setAmountUse(0) }} startIcon={<ShoppingCart />} sx={{ color: '#000000', width: 100, height: 40 }}>Buy</ColorButton>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Grid>
                                    <ColorButton variant="contained" onClick={() => { setDetail(row); visetDialog(true) }} startIcon={<List />} sx={{ color: '#000000', width: 100, height: 40 }}>View</ColorButton>
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
                        {
                            cartList.map((v, i) =>
                                <Paper elevation={5} key={i}
                                    sx={{
                                        width: 500,
                                        p: 2
                                    }}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                        <Checkbox onChange={() => selectDelete(i)}></Checkbox>{v.Item_Name} จำนวน {v.Amount}
                                    </Typography>
                                </Paper>
                            )
                        }
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setDialog(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='error'
                        sx={{ backgroundColor: '#FF2F2F', ":hover": { backgroundColor: 'error' } }}
                        onClick={() => {
                            onDelete();
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={dialog2} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Request List
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        width="100%">
                        {
                            requestList.map((v, i) =>
                                <Paper elevation={5} key={i}
                                    sx={{
                                        width: 500,
                                        p: 2
                                    }}>
                                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                        <Checkbox onChange={() => selectDelete(i)}></Checkbox>{v.Item_Name} จำนวน {v.Amount}
                                    </Typography>
                                </Paper>
                            )
                        }
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setDialog2(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='error'
                        sx={{ backgroundColor: '#FF2F2F', ":hover": { backgroundColor: 'error' } }}
                        onClick={() => {
                            onDelete2();
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            onConfirm2()
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={usedialog2} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Request {detail.Item_Name}
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
                            <TextField error={error} id="filled-basic" label="จำนวน" variant="filled" type="number" value={amountUse} onChange={(e) => { setAmountUse(e.target.value); setError(false); }} />
                        </Box>
                    </Stack>

                </DialogContent>
                <DialogActions >
                    <Button onClick={() => usesetDialog2(false)} variant="outline">Cancel</Button>
                    <Button
                        variant="contained"
                        color='success'
                        sx={{ backgroundColor: 'success.light', ":hover": { backgroundColor: 'success' } }}
                        onClick={() => {
                            addRequestList();
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={usedialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Buy {detail.Item_Name}
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
                            <TextField error={error} id="filled-basic" label="จำนวน" variant="filled" type="number" value={amountUse} onChange={(e) => { setAmountUse(e.target.value); setError(false); }} />
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
                            addCartList();
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={vidialog} fullWidth>
                <DialogTitle p={1} bgcolor="success.light" mb={2}>
                    <Typography component="p" variant="h6" color="white" fontWeight={600}>
                        Item detail
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Image
                        src={'/ItemPic/' + detail.Item_Name + '.jpg'}
                        width={250}
                        height={250}
                        loading="lazy"
                        objectFit='cover'
                    />
                    <Typography component="p" variant="body1" fontWeight={600} mb={2}>
                        {detail.Item_Name}
                    </Typography>
                    <Typography component="p" variant="body1" mb={(detail.Detail) ? 2 : 5}>
                        {detail.Detail}
                    </Typography>
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => visetDialog(false)} variant="outline">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
