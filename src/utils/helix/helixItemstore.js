import HelixGeneric from './helixGeneric';

const SUPPORTS_BY_TYPE = "/api/itemstore/support/bytype/";
const TYPE_BY_ID = "/api/itemstore/type/";
const ITEMS_BY_TYPE = "/api/itemstore/item/bytype/";
const ITEMS_BY_SUPPORT = "/api/itemstore/item/bysupport/";
const COLLECTIONS_LIST = "/api/itemstore/collection/all";

const HelixItemstore = {

    typeById(type, callback) {
        return HelixGeneric.getWithAuth(TYPE_BY_ID + type);
    },

    supportsByType(type, callback) {
        return HelixGeneric.getWithAuth(SUPPORTS_BY_TYPE + type);
    },

    itemsByType(type, callback) {
        return HelixGeneric.getWithAuth(ITEMS_BY_TYPE + type);
    },

    itemsBySupport(support, callback) {
        return HelixGeneric.getWithAuth(ITEMS_BY_SUPPORT + support);
    },

    collectionsList(support, callback) {
        return HelixGeneric.getWithAuth(COLLECTIONS_LIST);
    },
}

export default HelixItemstore;