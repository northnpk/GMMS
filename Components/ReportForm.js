import { InputLabel, MenuItem, Select, Slider, Box, TextField, Stack, Typography } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'

export default ({ setData }) => {

    const [type, setType] = useState('');
    const [detail, setDetail] = useState('');
    const [level, setLevel] = useState(1);

    const [list, setList] = useState([])

    useEffect(() => {

        if (setData) setData({ type, detail, level })

    }, [type, detail, level])

    useEffect(() => {

        const fetchList = async () => {
            const res = await fetch(`/api/getProblemType`)
            console.log(res.status)
            if (res.status != 200) return;
            const data = await res.json()
            console.log(data)
            setList(data);
        }
        fetchList();

    }, [])

    return (
        <Stack
            direction='column'
            justifyContent='flex-start'
            spacing={2}
            mt={2}
        >
            <Typography variant="body1">
                Problem type
            </Typography>
            <Select
                id="demo-simple-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
                fullWidth
                onClick={() => { (list.length == 0) && loadingList() }}
            >
                {(list.length > 0) && list.map((row, i) => {
                    return (<MenuItem key={i} value={row.Problem_Catagory}>{row.Description}</MenuItem>)
                })
                }
            </Select>
            <Typography variant="body1">
                Problem detail
            </Typography>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
            />
            <Typography variant="body1">
                Problem level
            </Typography>
            <Stack
                direction='row'
                justifyContent='flex-start'
                spacing={2}
                px={1}
            >
                <Slider
                    value={level}
                    min={1}
                    max={9}
                    step={1}
                    sx={{ width: '50%', color: 'error.light' }}
                    valueLabelDisplay="auto"
                    onChange={(event) => setLevel(event.target.value)} />
                <Typography variant="body1" fontWeight={300}>
                    {level}
                </Typography>
            </Stack>
        </Stack>
    )
}