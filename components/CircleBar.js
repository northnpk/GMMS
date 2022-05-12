import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"


export default ({ value = 50 }) => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {

        const timer = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= value) {
                    clearInterval(timer);
                    return prevProgress;
                } else {
                    return prevProgress + 1;
                }
            })
        }, 25);

    }, [])

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progress} size={150} thickness={5}
                sx={{
                    color: (progress >= 80) ? 'success.light' : (progress > 50) ? 'warning.light' : 'error.light',
                }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography component="h4" variant="h4" fontWeight={600}
                    sx={{
                        display: 'inline-flex',
                        color: (progress >= 80) ? 'success.light' : (progress > 50) ? 'warning.light' : 'error.light'
                    }}
                    >
                    {progress}%
                </Typography>
            </Box>
        </Box>
    )
}