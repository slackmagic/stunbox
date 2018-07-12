import HelixInteractor from './helixInteractor';

const SUPPORTS_BY_TYPE = "/api/itemstore/support/bytype/";
const TYPE_BY_ID = "/api/itemstore/type/";
const ITEM_ADD = "/api/itemstore/item";
const ITEM_BY_TYPE = "/api/itemstore/item/bytype/";
const ITEM_BY_SUPPORT = "/api/itemstore/item/bysupport/";
const ITEM_BY_COLLECTION = "/api/itemstore/item/bycollection/";
const COLLECTION_LIST = "/api/itemstore/collection/all";
const TYPE_LIST = "/api/itemstore/type/all";
const ITEM_BY_UUID = "/api/itemstore/item/";
const COLLECTION_BY_UUID = "/api/itemstore/collection/";
const COLLECTION_ADD = "/api/itemstore/collection";
const REFERENCE_SEARCH = "/api/itemstore/reference/search/";
const REFERENCE_ADD = "/api/itemstore/reference";

const HelixItemstore = {

    typeById(type, callback) {
        return HelixInteractor.getWithAuth(TYPE_BY_ID + type);
    },

    supportsByType(type, callback) {
        return HelixInteractor.getWithAuth(SUPPORTS_BY_TYPE + type);
    },

    itemsByType(type, callback) {
        return HelixInteractor.getWithAuth(ITEM_BY_TYPE + type);
    },

    itemsByCollection(collection, callback) {
        return HelixInteractor.getWithAuth(ITEM_BY_COLLECTION + collection);
    },

    itemsBySupport(support, callback) {
        return HelixInteractor.getWithAuth(ITEM_BY_SUPPORT + support);
    },

    itemByUuid(uuid, callback) {
        return HelixInteractor.getWithAuth(ITEM_BY_UUID + uuid);
    },

    collectionList(callback) {
        return HelixInteractor.getWithAuth(COLLECTION_LIST);
    },

    typeList(callback) {
        return HelixInteractor.getWithAuth(TYPE_LIST);
    },

    collectionByUuid(uuid, callback) {
        return HelixInteractor.getWithAuth(COLLECTION_BY_UUID + uuid);
    },

    newCollection(collection, callback) {
        return HelixInteractor.postWithAuth(COLLECTION_ADD, JSON.stringify(collection));
    },

    updateCollection(collection, callback) {
        return HelixInteractor.putWithAuth(COLLECTION_ADD, JSON.stringify(collection));
    },

    newReference(reference, callback) {
        return HelixInteractor.postWithAuth(REFERENCE_ADD, JSON.stringify(reference));
    },

    updateReference(reference, callback) {
        return HelixInteractor.putWithAuth(REFERENCE_ADD, JSON.stringify(reference));
    },

    newItem(item, callback) {
        console.log(JSON.stringify(item));
        return HelixInteractor.postWithAuth(ITEM_ADD, JSON.stringify(item));
    },

    updateItem(item, callback) {
        console.log(JSON.stringify(item));
        return HelixInteractor.putWithAuth(ITEM_ADD, JSON.stringify(item));
    },

    searchReference(search, callback) {
        return HelixInteractor.getWithAuth(REFERENCE_SEARCH + encodeURI(search));
    }
}

export default HelixItemstore;