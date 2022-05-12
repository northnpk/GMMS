import { Box } from '@mui/material'


export default ({ title, count, color = '#3154A6' }) => {
    return (<Box
        sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            color: '#000000',
            textAlign: 'center'
        }}
    >
        <p style={{ 'fontSize': '18px' }}>{title}</p>
        <p style={{ 'fontSize': '36px', 'color': color }}>{count}</p>
    </Box>)
}