# Quick Start: Platform Configuration

NFTPass ensures only authorized individuals have access to the right data at the right time and for the right reasons.
The access mechanism is based on NFT ownership, making identity management completely anonymous and secure.

To check on security standards, please, review verification mechanism page.

## Platform Setup

To start using NFTPass you need to create a new Application. This will generate a unique ‘apiKey’ and will allow to
configure access policies. This can be done in a fairly simple manner.

First you need to click ‘Applications’ tab:

![Applications navigation](https://devcenter.nft-pass.net/docs/apps-navigation.png)

and simply click ‘Create First Application’:

![Add new App](https://devcenter.nft-pass.net/docs/add-new-app.png)

After that you enter some basic parameters like name to differentiate one ‘apiKey’ from another in case you have
multiple apps.

By default the Ethereum mainnet is selected, but for our example we are going to use Ropsten.

You can also add nft contract addresses that you want to validate, but we can do it later also, so lets skip this for
now.

![New App](https://devcenter.nft-pass.net/docs/new-app.png)

After you successfully saved your application, you can find ‘apiKey’ in the list view or on the page of particular
Application.

![Api Key](https://devcenter.nft-pass.net/docs/api-key.png)

Now lets proceed to the last configurational step and add your NFT Contact Addresses.

If you don’t know how to find out an nft contact address (nft collection), please see this doc.

For our example we are going to use this
[Rarible Collection](https://ropsten.rarible.com/collection/0x6a94aC200342AC823F909F142a65232E2f052183/items). As you
can see, this one is also on Ropsten testnet, just like our application.

Now, when I know the collection address, I can add it to the app while editing it. Please, notice that you can add
multiple collections. If you do, application will verify all of them at once.

![NFT addresses list](https://devcenter.nft-pass.net/docs/nft-list.png)

After you hit save, you can see that changes automatically applied:

![number of NFT addresses](https://devcenter.nft-pass.net/docs/nfts-app-list.png)
