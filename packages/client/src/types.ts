export interface NFTResult {
    amount: number;
    contract_type: 'ERC721' | 'ERC1155';
    name: string | null;
    symbol: string | null;
    token_address: string;
    token_id: string;
    token_uri: string | null;
}
