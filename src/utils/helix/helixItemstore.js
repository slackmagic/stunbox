import HelixInteractor from './helixInteractor';

const SUPPORTS_BY_TYPE = "/api/itemstore/support/bytype/";
const TYPE_BY_ID = "/api/itemstore/type/";
const ITEMS_BY_TYPE = "/api/itemstore/item/bytype/";
const ITEMS_BY_SUPPORT = "/api/itemstore/item/bysupport/";
const ITEMS_BY_COLLECTION = "/api/itemstore/item/bycollection/";
const COLLECTION_LIST = "/api/itemstore/collection/all";
const TYPE_LIST = "/api/itemstore/type/all";
const COLLECTIONS_BY_UUID = "/api/itemstore/collection/";
const COLLECTION_ADD = "/api/itemstore/collection";

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

    collectionList(callback) {
        return HelixInteractor.getWithAuth(COLLECTION_LIST);
    },

    typeList(callback) {
        return HelixInteractor.getWithAuth(TYPE_LIST);
    },

    collectionByUuid(uuid, callback) {
        return HelixInteractor.getWithAuth(COLLECTIONS_BY_UUID + uuid);
    },

    newCollection(collection, callback) {
        return HelixInteractor.postWithAuth(COLLECTION_ADD, JSON.stringify(collection));
    },

    updateCollection(collection, callback) {
        return HelixInteractor.putWithAuth(COLLECTION_ADD, JSON.stringify(collection));
    },
}

export default HelixItemstore;