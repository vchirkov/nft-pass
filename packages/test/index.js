import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import NFTPass from '@nft-pass/client';
import {
    Alert, Box, Button, Card, Divider, FormControl, FormHelperText, Grid, Icon, IconButton, Input, InputAdornment,
    InputLabel, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';

const API_KEY = process.env.API_KEY;
const DEFAULT_MESSAGE = `Please, click sign button to proceed verifying NFT ownership. \n\nThis request will not trigger a blockchain transaction or cost any gas fees.`

const Root = () => {
    const [apiKey, setAPIKey] = useState(API_KEY);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [jwt, setJWT] = useState(localStorage.getItem('jwt'));

    const [result, setResult] = useState();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);

    const verify = useCallback(async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            setResult(await NFTPass.verify({apiKey, message, jwt}));
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }, [apiKey, message, jwt]);

    const auth = useCallback(async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            setResult(await NFTPass.authenticate({apiKey, message, jwt}));
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }, [apiKey, message, jwt]);

    useEffect(() => {
        if (!result?.jwt) return;
        setJWT(result?.jwt);
        localStorage.setItem('jwt', result?.jwt);
    }, [result?.jwt]);

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
            <Grid item xs={8}>
                <Box sx={{my: 4}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="api-key">apiKey</InputLabel>
                        <Input id="api-key"
                               fullWidth
                               value={apiKey}
                               onChange={e => setAPIKey(e.target.value)}/>
                        {apiKey ? (
                            <FormHelperText>
                                NFTPass Api key
                            </FormHelperText>
                        ) : (
                            <FormHelperText>
                                Please, generate Api Kay on the Admin Page
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{my: 4}}>
                    <TextField label="message"
                               fullWidth
                               multiline
                               rows={4}
                               value={message}
                               onChange={e => setMessage(e.target.value)}/>
                </Box>
                <Grid container spacing={1}
                      sx={{mb: 4}}>
                    <Grid item xs={2}>
                        <Button sx={{my: 2}}
                                disabled={loading}
                                onClick={verify}
                                variant="contained"
                                fullWidth>
                            verify
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button sx={{my: 2}}
                                disabled={loading}
                                onClick={auth}
                                variant="contained"
                                fullWidth>
                            authenticate
                        </Button>
                    </Grid>

                    {jwt && (
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="jwt">
                                    JSON Web Token
                                </InputLabel>
                                <Input id="jwt"
                                       readOnly
                                       value={jwt}
                                       endAdornment={(
                                           <InputAdornment position="end">
                                               <IconButton onClick={() => setJWT()}>
                                                   <DeleteForever/>
                                               </IconButton>
                                           </InputAdornment>
                                       )}/>
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
                <Divider/>
                {loading && <LinearProgress/>}
                {result && (
                    <Box sx={{my: 4}}>
                        {result.network && (
                            <Alert severity="success">
                                API network: <b>{result.network}</b>
                            </Alert>
                        )}
                        {result.match ? (
                            <Box sx={{m: 2}}>
                                {result.nfts.map(nft => (
                                    <Card sx={{display: 'flex', my: 1}}
                                          variant="outlined"
                                          key={nft.token_address + nft.token_id}>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableBody>
                                                    {['symbol', 'name', 'token_address', 'token_id', 'token_uri', 'contract_type'].map(field => (
                                                        <TableRow key={field}>
                                                            <TableCell align="right">{field}</TableCell>
                                                            <TableCell>{nft[field]}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <Alert severity="warning">
                                No Match
                            </Alert>
                        )}
                    </Box>
                )}
                {error && (
                    <Box sx={{my: 4}}>
                        <Alert severity="error">
                            <Box>message: {error.message}</Box>
                            <Box>code: {error.code}</Box>
                        </Alert>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

ReactDOM.render((<Root/>), document.getElementById('root'));
