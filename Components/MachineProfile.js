import { Box, Paper, Stack, Typography } from '@mui/material';

import Image from 'next/image';

export default ({ data }) => {

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                borderRadius: 2,
                width: "100%",
                height: "650px"
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{
                    '> p': {
                        width: "80%"
                    }
                }}
            >
                <Typography component="h6" variant="h6" color="primary" gutterBottom align="center" fontWeight={600}>
                    Machine
                </Typography>
                <Image
                    src="https://static.wixstatic.com/media/760b9a_afdc953801d541d5b67edf6b845fe056~mv2.png/v1/fill/w_640,h_500,fp_0.50_0.50,lg_1,q_85,enc_auto/760b9a_afdc953801d541d5b67edf6b845fe056~mv2.png"
                    width={250}
                    height={250}
                    loading="lazy"
                    objectFit='cover'
                />
                <Typography component="h6" variant="h6" color="primary" gutterBottom align="center" fontWeight={600}>
                    {(data) ? data.Machine_Name : '?'}
                </Typography>
                <Box width="80%" height="1px" borderBottom="2px solid #D9D9D9" />
                <Typography component="p" variant="h6" fontWeight={600} align="left">
                    รายละเอียด
                </Typography>
                <Typography component="p" variant="body1" align="left">
                    Machine type : {(data) ? data.Machine_Type : '?'}
                </Typography>
                <Typography component="p" variant="body1" align="left">
                    Serial number : {(data) ? data.Serial_number : '?'}
                </Typography>
                <Typography component="p" variant="body1" align="left">
                    วันนำเข้า : {(data) ? data.Active_start : '?'}
                </Typography>
            </Stack>
        </Paper>
    )
}