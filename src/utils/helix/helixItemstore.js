import HelixInteractor from './helixInteractor';

const SUPPORTS_BY_TYPE = "/api/itemstore/support/bytype/";
const TYPE_BY_ID = "/api/itemstore/type/";
const ITEMS_BY_TYPE = "/api/itemstore/item/bytype/";
const ITEMS_BY_SUPPORT = "/api/itemstore/item/bysupport/";
const ITEMS_BY_COLLECTION = "/api/itemstore/item/bycollection/";
const COLLECTIONS_LIST = "/api/itemstore/collection/all";
const COLLECTIONS_BY_UUID = "/api/itemstore/collection/";

const HelixItemstore = {

    typeById(type, callback) {
        return HelixInteractor.getWithAuth(TYPE_BY_ID + type);
    },

    supportsByType(type, callback) {
        return HelixInteractor.getWithAuth(SUPPORTS_BY_TYPE + type);
    },

    itemsByType(type, callback) {
        return HelixInteractor.getWithAuth(ITEMS_BY_TYPE + type);
    },

    itemsByCollection(collection, callback) {
        return HelixInteractor.getWithAuth(ITEMS_BY_COLLECTION + collection);
    },

    itemsBySupport(support, callback) {
        return HelixInteractor.getWithAuth(ITEMS_BY_SUPPORT + support);
    },

    collectionsList(support, callback) {
        return HelixInteractor.getWithAuth(COLLECTIONS_LIST);
    },

    collectionByUuid(uuid, callback) {
        return HelixInteractor.getWithAuth(COLLECTIONS_BY_UUID + uuid);
    },
}

export default HelixItemstore;