import { Paper, Typography } from '@mui/material'


export default function MyApp({ title, count, error = false, width }){
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                height: 150,
                borderRadius: 2,
                width: width
            }}
        >
            <Typography component="h6" variant="h6" color="primary" gutterBottom fontWeight={600}>
                {title}
            </Typography>
            <Typography component="p" variant="h3" align='center' color={(error && count > 0 ? "error.light" : "")}>
                {count}
            </Typography>
        </Paper>)
}