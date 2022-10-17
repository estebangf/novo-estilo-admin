import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import { default as LinearProgressMUI } from '@mui/material/LinearProgress';
import { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgressMUI)(({ theme }) => ({
  // height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


interface LinearProgressProp {
  loading: boolean
}

const LinearProgress = ({loading}: LinearProgressProp) => {

  if (loading)
    return <Box sx={{
      width: '-webkit-fill-available',
      height: '100%',
      background: '#ffffffad',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 4,
      alignItems: 'stretch',
    }}
    >
      <BorderLinearProgress
        variant="indeterminate"
      />
    </Box>
  else return <></>
}

export default LinearProgress