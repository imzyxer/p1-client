import React, { FC, useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

const buttonsMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'C'];
const passCodeLength = 5;
const dotsMap = Array.from(Array(passCodeLength).keys());

type TPassCodeScreenParams = {
  title: string;
  isError: boolean;
  toAcceptPassCode: (pastCode: string) => void;
};

const PassCodeScreen: FC<TPassCodeScreenParams> = ({ title, isError, toAcceptPassCode }) => {
  const [passCode, setPassCode] = useState('');
  const colorFilledCircles = isError && passCode.length === passCodeLength ? 'error' : 'primary';
  const checkCode = useCallback(
    letter => {
      // 1. erase character
      if (letter === 'C') {
        if (passCode.length === 0) return;
        const letters = passCode.slice(0, -1);
        setPassCode(letters);
        return;
      }

      // 2. Maximum number of characters specified
      if (passCode.length === passCodeLength) return;

      // 3. Adding a Symbol
      const letters = `${passCode}${letter}`;
      setPassCode(letters);
      if (letters.length === passCodeLength) {
        toAcceptPassCode(letters);
      }
    },
    [passCode, setPassCode, toAcceptPassCode]
  );

  return (
    <Container maxWidth="sm" disableGutters>
      <Grid container sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ grow: 1 }}>
          <Stack spacing={3}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h6" component="div" align="center" mb={3}>
                  {title}
                </Typography>
              </Grid>
              {dotsMap.map(i => (
                <Grid item key={i}>
                  {i < passCode.length ? <CircleIcon color={colorFilledCircles} /> : <CircleOutlinedIcon color="primary" />}
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3} alignItems="center">
            {buttonsMap.map(i => (
              <Grid item xs={4} key={`letter_${i}`}>
                {i === null && <></>}
                {i !== null && i !== 'C' && (
                  <Button
                    onClick={() => checkCode(i)}
                    variant="text"
                    size="large"
                    sx={{
                      width: '100%',
                      lineHeight: theme => theme.typography.h4.lineHeight,
                      fontSize: theme => theme.typography.h4.fontSize,
                      fontWeight: 100,
                    }}
                  >
                    {i}
                  </Button>
                )}
                {i === 'C' && (
                  <IconButton
                    onClick={() => checkCode(i)}
                    size="large"
                    sx={{
                      width: '100%',
                      borderRadius: '4px',
                    }}
                    disabled={passCode.length === 0}
                  >
                    <BackspaceOutlinedIcon />
                  </IconButton>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PassCodeScreen;
