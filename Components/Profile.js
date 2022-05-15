import { useEffect, useState } from "react"

import { Box, Avatar, Stack, IconButton, Menu, MenuItem, Tooltip, ListItemIcon } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";

export default () => {

    const router = useRouter();
    const [cookies,setCookie,removeCookie] = useCookies(['user']);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState({ Role: '-', Firstname: '-', Lastname: '-' })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (cookies.user && cookies.user.User_ID) {
            setUser(cookies.user)
        }
    }, [cookies.user])

    return (
        <Box position='fixed' top={10} right={50}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} dis>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 50, height: 50, border: '5px solid #E9DF00' }}>{user.Role}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { removeCookie('user'); router.push('/') }}>
                    {user.Firstname} {user.Lastname}
                </MenuItem>
                <MenuItem onClick={() => { removeCookie('user'); router.push('/') }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}