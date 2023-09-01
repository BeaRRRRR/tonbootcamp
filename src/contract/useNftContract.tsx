import { NftCollection } from './NftCollection';
import { Address, Cell, toNano } from 'ton-core';
import { TonClient } from 'ton';
import { buildCollectionContentCell } from './offChain';


const ITEM_CONTRACT_CODE =
    "b5ee9c7241020d010001bd000114ff00f4a413f4bcf2c80b0102016203020009a11f9fe0050202ce07040201200605001d00f232cfd633c58073c5b3327b5520003b3b513434cffe900835d27080269fc07e90350c04090408f80c1c165b5b60020120090800113e910c1c2ebcb8536002e30c8871c02497c0f83434c0c05c6c2497c0f83e903e900c7e800c5c75c87e800c7e800c1cea6d003c00812ce3850c1b088d148cb1c17cb865407e90350c0408fc00f801b4c7f4cfe08417f30f45148c2ea3a24c840dd78c9004f6cf380c0d0d0d4d60840bf2c9a884aeb8c097c12105fcbc200b0a005c7082108b77173505c8cbff5004cf161024804031708010c8cb055006cf165004fa0214cb6acb1f12cb3fc901fb0001f25135c705f2e191fa4021f001fa40d20031fa0020d749c200f2e2c4820afaf0801ba121945315a0a1de22d70b01c300209206a19136e220c2fff2e192218e33821005138d91c85009cf16500bcf16712449145446a031708010c8cb055006cf165004fa0214cb6acb1f12cb3fc901fb00104794102a375be2020c006a8e2a26f0018210d53276db103744006d7131708010c8cb055006cf165004fa0214cb6acb1f12cb3fc901fb0093303234e25502f003455a2209";
const COLLECTION_CONTRACT_CODE = 
  'b5ee9c72410213010001f7000114ff00f4a413f4bcf2c80b01020162090202012004030025bc82df6a2687d20699fea6a6a182de86a182c402012008050201200706002db4f47da89a1f481a67fa9a9a86028be09e006e003e0090002fb5dafda89a1f481a67fa9a9a860d883a1a61fa61ff4806100043b8b5d31ed44d0fa40d33fd4d4d43010245f04d0d431d430d071c8cb0701cf16ccc980202cd0d0a0201480c0b003d16bc00dc087c011de0063232c15633c594013e8084f2dac4b333325c7ec020001b3e401d3232c084b281f2fff274200201200f0e002d501c8cb3ff828cf16c97020c8cb0113f400f400cb00c9803eb420c700915be001d0d3030171b0915be0fa403001d31fd33fed44d0fa40d33fd4d4d4308210693d39505280ba8e28375f0501d08210a8cb00ad708010c8cb055005cf1624fa0214cb6a13cb1fcb3f01cf16c98040fb00e03626c001e3025173c705f2e19125c002e3023204c003e3025f05840ff2f08121110002801fa40304144c85005cf1613cb3fccccccc9ed5400a6357003d4308e378040f4966fa5208e2906a4208100fabe93f2c18fde81019321a05325bbf2f402fa00d43022544b30f00523ba9302a402de04926c21e2b3e6303250444313c85005cf1613cb3fccccccc9ed540052363602d33f5313bb6c12f2e192fa00d43023544630f00501a45521c85005cf1613cb3fccccccc9ed54f65e1416';

export async function deployContract(
    client: TonClient,
    address: string,
    sender: any,
    metadata: string = 'https://raw.githubusercontent.com/Cosmodude/TAP/main/sampleCollectionMetadata.json'
) {
    const newCollection = NftCollection.createFromConfig(
        {
            ownerAddress: Address.parse(address),
            nextItemIndex: 0,
            collectionContent: buildCollectionContentCell({
                collectionContent:
                    metadata,
                commonContent: ' ',
            }),
            nftItemCode: Cell.fromBoc(Buffer.from(ITEM_CONTRACT_CODE, 'hex'))[0],
            royaltyParams: {
                royaltyFactor: Math.floor(Math.random() * 100),
                royaltyBase: 100,
                royaltyAddress: Address.parse(address),
            },
        },
        Cell.fromBoc(Buffer.from(COLLECTION_CONTRACT_CODE, 'hex'))[0],
    );

    const collection = client.open(newCollection);
    await collection.sendDeploy(sender, toNano('0.04'));

    return newCollection.address.toString();
}

export async function mintNewNft(
    client: TonClient,
    nftCollectionAddress: string,
    minter: Address,
    sender: any,
    metadata: string = 'https://raw.githubusercontent.com/TonAttendanceProtocol/Smart_Contracts/main/TactBootCampBadge.json'
) {
    const contract = NftCollection.createFromAddress(Address.parse(nftCollectionAddress));
    const collection = client.open(contract);

    await collection.sendMintNft(sender, {
        value: toNano('0.035'),
        amount: toNano('0.025'),
        itemIndex: 0,
        itemOwnerAddress: minter,
        itemContent: metadata,
        queryId: Date.now(),
    });
}
