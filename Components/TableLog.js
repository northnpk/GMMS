import Control from './ControlTable'

import { TextField, Paper, Stack, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react'

const Log = ({ data }) => {
    return (
        <>
            <Stack
                bgcolor="#f5f7f9"
                width="100%"
                borderRadius={3}
                flexDirection='row'
                justifyContent='space-around'
                alignItems='center'
                p={2}
                sx={{
                    '> p': {
                        width: '20%'
                    }
                }}
            >
                <Typography component="p" variant="body1" align="left">
                    {data.ErrorLog_ID}
                </Typography>
                <Typography component="p" variant="body1" align="center">
                    {data.Catagory}
                </Typography>
                <Typography component="p" variant="body1" align="center">
                    {data.Problem_LV}
                </Typography>
                <Typography component="p" variant="body1" align="right">
                    {data.Status}
                </Typography>
            </Stack>
        </>
    )
}

export default () => {

    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const [data, setData] = useState(undefined);

    const list = [
        {
            'ErrorLog_ID': '123',
            'Catagory': 'Cate',
            'Problem_LV': '2222',
            'Status': '2222',
        },
        {
            'ErrorLog_ID': '124',
            'Catagory': 'Cate',
            'Problem_LV': 'sdsf',
            'Status': 'gdsgf',
        },
        {
            'ErrorLog_ID': '125',
            'Catagory': 'Cate',
            'Problem_LV': 'gdg',
            'Status': 'gdggg',
        },
        {
            'ErrorLog_ID': '126',
            'Catagory': 'Cate',
            'Problem_LV': 'gggg',
            'Status': 'ggrttt',
        },
        {
            'ErrorLog_ID': '126',
            'Catagory': 'Cate',
            'Problem_LV': 'gggg',
            'Status': 'ggrttt',
        },
        {
            'ErrorLog_ID': '126',
            'Catagory': 'Cate',
            'Problem_LV': 'gggg',
            'Status': 'ggrttt',
        },
        {
            'ErrorLog_ID': '126',
            'Catagory': 'Cate',
            'Problem_LV': 'gggg',
            'Status': 'ggrttt',
        }
    ]

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
                        Log data
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={date}
                            onChange={(value) => { setDate(value); console.log(date) }}
                            renderInput={(params) => <TextField {...params} sx={{ width: 200 }} size="small" label="" />}
                        />
                    </LocalizationProvider>
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
                        (data) ? (
                            <>
                                <Typography component="h6" variant="h6" gutterBottom align="left" width={'100%'} >
                                    Efficiency {(data) ? data.Efficiency : '-'}
                                </Typography>
                                {list.map((v, i) => (i >= ((page - 1) * 4) && i < page * 4) ? <Log key={i} data={v} /> : '')}
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
                    <Control count={(data) ? data.length : 0} page={page} setPage={setPage} />
                </Stack>
            </Stack>
        </Paper>
    )

}