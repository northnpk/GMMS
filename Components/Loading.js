import {
    Backdrop,
    CircularProgress
} from '@mui/material'

export default function MyApp({ open, title }) {
    if (!open) return null;

    return (
        < Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            {title}
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}