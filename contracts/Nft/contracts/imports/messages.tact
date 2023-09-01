message Transfer{
    queryId: Int;
    new_owner: Address;
}

message Mint{
    receiver: Address;
    queryId: Int;
}

struct CollectionData{
    next_item_index: Int;
    collection_content: Cell;
    owner_address: Address;
}

struct ItemData{
    owner: Address;
    collection_address: Address;
    item_index: Int;
    individual_content: Cell;
}

struct CollectionMetadata {
    image: String;
    name: String;
    description: String;
}