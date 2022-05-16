import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"


const MyApp = ({ value, size = 100 }) => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {

        if (isNaN(value)) return

        const timer = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= value) {
                    clearInterval(timer);
                    return prevProgress;
                } else {
                    return prevProgress + 1;
                }
            })
        }, 10);

    }, [value])

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={progress} size={size} thickness={4}
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
                <Typography component="h5" variant="h5" fontWeight={600}
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


MyApp.displayName = "MyApp"

export default MyApp;