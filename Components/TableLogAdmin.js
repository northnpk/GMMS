import Control from './ControlTable'

import { TextField, Paper, Stack, Typography, Select, MenuItem, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react'

const Log = ({ data, i, selectData }) => {
    return (
        <>
            <Stack
                bgcolor="#f5f7f9"
                width="100%"
                borderRadius={3}
                flexDirection='row'
                justifyContent='flex-start'
                alignItems='center'
                p={2}
                height="25%"
            >
                <Typography component="p" variant="body1" align="left" width="10%">
                    {i}
                </Typography>
                <Typography component="p" variant="body1" align="left" width="50%">
                    {data.Category}
                </Typography>
                <Typography component="p" variant="body1" align="left" width="20%">
                    Level : {data.Problem_LV}
                </Typography>
                <Box sx={{ width: '20%' }} display='flex' flexDirection='row' justifyContent='flex-end'>
                    <Button variant='text' color={(data.Firstname) ? 'success' : 'error'} sx={{ height: '80%' }} onClick={() => selectData(data)}>
                        {(data.Firstname) ? 'Checked' : 'Unchecked'}
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default function MyApp({ id, reload, setCount, selectData }){

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState('0');

    const selectStatus = (value) => {
        setStatus(value);
        setRows(data.filter(v => v.Status == value))
    }

    useEffect(() => {

        if (!id) return;

        const fetchData = async () => {

            const res = await fetch(`/api/getError?id=${id}`)
            if (res.status != 200) return;

            const _data = await res.json()
            setData(_data)
            setRows(_data.filter(v => v.Status == status))
            if (setCount) setCount(_data.filter(v => v.Status == 0).length);
        }

        fetchData();

    }, [id, reload])

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 2,
                width: "100%",
                pt: 2,
                pb: 1,
                px: 2,
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    width="100%"
                    borderBottom="2px solid #D9D9D9"
                    pb={1}
                >
                    <Typography component="h6" variant="h6" color="primary" gutterBottom align="center" fontWeight={600}>
                        Log
                    </Typography>
                    <Select
                        id="demo-simple-select"
                        value={status}
                        onChange={(event) => selectStatus(event.target.value)}
                        sx={{ width: 200 }}
                    >
                        <MenuItem value={'0'}>Error</MenuItem>
                        <MenuItem value={'1'}>Fixed</MenuItem>
                    </Select>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    width="100%"
                    height={295}
                >
                    {
                        (rows.length > 0) ? (
                            <>
                                {rows.map((v, i) => (i >= ((page - 1) * 4) && i < page * 4) ? <Log key={i} data={v} i={i + 1} selectData={selectData} /> : '')}
                            </>
                        ) : (
                            <Typography component="h6" variant="h6" gutterBottom align="center" width={'100%'} height={'100%'} >
                                ไม่มีข้อมูล
                            </Typography>
                        )
                    }
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    width="100%"
                    borderTop="2px solid #D9D9D9"
                    pt={1}
                >
                    <Control count={(rows) ? rows.length : 0} page={page} setPage={setPage} perPage={4} />
                </Stack>
            </Stack>
        </Paper>
    )

}