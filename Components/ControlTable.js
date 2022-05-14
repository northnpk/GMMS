
import { Typography, IconButton } from '@mui/material';
import {
    ArrowForwardIos as Next,
    ArrowBackIos as Back
} from '@mui/icons-material';

import { useState, useEffect, useCallback } from 'react'


export default ({ count, page, setPage, perPage = 5 }) => {

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
