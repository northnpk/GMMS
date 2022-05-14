import {Box} from '@mui/material'

const ProblemLevel = ({ value = 0 }) => {

    const colors = ["#7A161C", "#932825", "#B7473B", "#DB6C56", "#FF9777", "#FFB899", "#FFCCAD", "#FFE1C8", "#FFEAE4"]

    return (
        <Box
            width={50}
            height={120}
            sx={{ backgroundColor: '#f5f7f9' }}
        >
            {colors.map((c, i) => <Box width="100%" height="11.1%" key={i} sx={{ backgroundColor: ((9 - i) <= value) ? c : 'transparent' }} />)}
        </Box>
    )
}

export default ProblemLevel;