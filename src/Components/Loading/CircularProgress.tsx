import * as React from 'react';
import { styled } from '@mui/material/styles';
import { default as CircularProgressMUI } from '@mui/material/CircularProgress';
import { CircularProgressProps, circularProgressClasses } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularProgressStyled(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative', margin: "auto" }}>
      <CircularProgressMUI
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgressMUI
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}


interface CircularProgressProp {
  loading: boolean
}

const CircularProgress = ({ loading }: CircularProgressProp) => {

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
      <CircularProgressStyled />
    </Box>
  else return <></>
}

export default CircularProgress