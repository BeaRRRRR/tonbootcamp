import "@stdlib/deploy";
import "@stdlib/ownable";
import "./imports/messages";

contract NftItem with Deployable, Ownable {
    owner: Address;
    item_index: Int as uint32;
    collection_address: Address;
    individual_content: String;

    init( 
        owner: Address,
        collection_address: Address,
        item_index: Int,
        individual_content: String
    ) {
        self.owner = owner;
        self.item_index = item_index;
        self.collection_address = collection_address;
        self.individual_content = individual_content;
    }

    receive(msg: Mint){
        require(self.collection_address == sender(), "Message should come from collection");
        self.owner = msg.receiver;
    }

    receive(msg: Transfer){
        self.requireOwner();
        self.owner = msg.new_owner;
    }

    get fun getItemData(): ItemData{
        return ItemData{
            item_index: self.item_index,
            owner: self.owner,
            collection_address: self.collection_address,
            individual_content: self.individual_content.asSlice().asCell()
        };
    }
}
