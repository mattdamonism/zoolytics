import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from "../public/zoo_logo.svg"
import {Grid} from "@mui/material";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{mr: 2}}>
                        <Logo className={"animate__animated animate__tada"} style={{height: "45px", width: "auto"}}/>
                    </Box>
                    <Typography variant="h6" component="div" sx={{ color: "white", flexGrow: 1 }}>
                        Zoolytics
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
