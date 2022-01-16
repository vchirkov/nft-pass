import NFTPass from '@nft-pass/client';

const apiKey = process.env.API_KEY;
NFTPass.verify({apiKey}).then(({error, data}) => {
    console.log(error, data);
});
