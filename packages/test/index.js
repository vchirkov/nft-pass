import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import NFTPass from '@nft-pass/client';
import {
    Alert, Box, Button, Card, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input,
    InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField
} from '@mui/material';

const API_KEY = process.env.API_KEY;
const DEFAULT_MESSAGE = `Please, click sign button to proceed verifying NFT ownership. \n\nThis request will not trigger a blockchain transaction or cost any gas fees.`

const Root = () => {
    const [apiKey, setAPIKey] = useState(API_KEY);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [ttl, setTTL] = useState(0);
    const [force, setForce] = useState(false);
    const [forceWallet, setForceWallet] = useState(false);
    const [forceFetch, setForceFetch] = useState(false);

    const [result, setResult] = useState();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);

    const verify = useCallback(async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        try {
            setResult(await NFTPass.verify({apiKey, message, ttl, force, forceWallet, forceFetch}));
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }, [apiKey, message, ttl, force, forceWallet, forceFetch]);

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
            <Grid item xs={8}>
                <Box sx={{my: 4}}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={10}>
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
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="ttl">ttl</InputLabel>
                                <Input id="ttl"
                                       fullWidth
                                       value={ttl}
                                       onChange={e => setTTL(e.target.value)}/>
                                <FormHelperText>
                                    TTL number
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{my: 4}}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={10}>
                            <TextField label="message"
                                       fullWidth
                                       multiline
                                       rows={4}
                                       value={message}
                                       onChange={e => setMessage(e.target.value)}/>
                        </Grid>
                        <Grid item xs={2}>
                            <FormGroup>
                                <FormControlLabel label="force"
                                                  control={
                                                      <Checkbox name="force"
                                                                checked={force}
                                                                onChange={e => setForce(e.target.checked)}/>
                                                  }/>
                                <FormControlLabel label="forceWallet"
                                                  control={
                                                      <Checkbox name="forceWallet"
                                                                checked={forceWallet}
                                                                onChange={e => setForceWallet(e.target.checked)}/>
                                                  }/>
                                <FormControlLabel label="forceFetch"
                                                  control={
                                                      <Checkbox name="forceFetch"
                                                                checked={forceFetch}
                                                                onChange={e => setForceFetch(e.target.checked)}/>
                                                  }/>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Box>
                <Button sx={{mb: 4}}
                        disabled={loading}
                        onClick={verify}
                        variant="contained">
                    verify
                </Button>
                <Divider/>
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
                                          variant="outlined">
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableBody>
                                                    {['symbol', 'name', 'token_address', 'token_id', 'token_uri', 'contract_type'].map(field => (
                                                        <TableRow>
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
