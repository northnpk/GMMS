import { Button, Table, TableHead, TableRow, TableCell, Typography, TableBody, Paper, Box, Stack, TableFooter } from '@mui/material'
import {
    Error as ErrorIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router'

import { useState } from 'react';
import Control from './ControlTable';

const Data = ({ children, left, right }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                minHeight: 70,
                borderTopLeftRadius: (left) ? 10 : 0,
                borderBottomLeftRadius: (left) ? 10 : 0,
                borderTopRightRadius: (right) ? 10 : 0,
                borderBottomRightRadius: (right) ? 10 : 0,
                backgroundColor: '#f5f7f9',
            }}
            square
        >
            {children}
        </Paper>
    )
}

const EfficiencyBar = ({ value, onClick }) => {

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Box
                sx={{
                    backgroundColor: '#e4e6e8',
                    borderRadius: 2,
                    width: '65%',
                    height: 15,
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}
            >
                <Box
                    sx={{
                        backgroundColor: (value >= 80) ? 'success.light' : (value > 50) ? 'warning.light' : 'error.light',
                        borderRadius: 2,
                        width: value + '%',
                        height: '100%'
                    }}
                />
            </Box>
            <Typography component="p" variant="body1"
                sx={{
                    display: 'inline-flex',
                    color: (value >= 80) ? 'success.light' : (value > 50) ? 'warning.light' : 'error.light'
                }}>
                {value}%
            </Typography>
            <Button variant="outlined" onClick={onClick}>View</Button>
        </Stack>
    )
}

const Head = ({ title, width }) => {
    return (
        <TableCell width={width}>
            <Typography component="h6" variant="h6" color="primary" fontWeight={600}>
                {title}
            </Typography>
        </TableCell>
    )
}

const Row = ({ value, path }) => {

    const router = useRouter();

    return (
        <TableRow>
            <TableCell sx={{ borderBottom: "none", py: 1, px: 0 }}>
                <Data left >
                    <Typography component="p" variant="body1" sx={{ p: 1, display: 'inline-flex' }}>
                        {<ErrorIcon sx={{ mr: 1, color: 'error.light', opacity: (value.Status) ? 1 : 0 }} />}
                        {value.Machine_Name}
                    </Typography>
                </Data>
            </TableCell>
            <TableCell sx={{ borderBottom: "none", py: 1, px: 0 }}>
                <Data >
                    <Typography component="p" variant="body1" sx={{ p: 1, display: 'inline-flex' }}>
                        {(value.Status) ? 'Unactivate' : 'Activate'}
                    </Typography>
                </Data>
            </TableCell>
            <TableCell sx={{ borderBottom: "none", py: 1, px: 0 }}>
                <Data right>
                    <EfficiencyBar value={value.Efficiency} onClick={() => router.push({
                        pathname: '/' + path + '/info',
                        query: value,
                    })} />
                </Data>
            </TableCell>
        </TableRow>
    )
}

export default ({ data, role }) => {

    const [page, setPage] = useState(1)

    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <Head title="Device name" width="30%" />
                    <Head title="Status" width="30%" />
                    <Head title="Efficiency" width="40%" />
                </TableRow>
            </TableHead>
            <TableBody >
                {
                    (data) && data.map((value, i) => (i >= ((page - 1) * 5) && i < page * 5) && < Row value={value} key={i} path={role} />)
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} align="right" sx={{ borderBottom: "none", py: 1 }}>
                        <Control count={data.length} page={page} setPage={setPage} />
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
