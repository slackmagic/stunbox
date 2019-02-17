import HelixInteractor from './helixInteractor';

const ENTRY_LIST = "/api/memoriz/entries";
const ENTRY_ADD = "/api/memoriz/entries";
const ENTRY_DEL = "/api/memoriz/entries";

const HelixMemorizStore = {
    entryList(callback) {
        return HelixInteractor.getWithAuth(ENTRY_LIST);
    },

    newEntry(entry, callback) {
        return HelixInteractor.postWithAuth(ENTRY_ADD, JSON.stringify(entry));
    },

    updateEntry(entry, callback) {
        return HelixInteractor.putWithAuth(ENTRY_ADD, JSON.stringify(entry));
    },

    deleteEntry(entry, callback) {
        return HelixInteractor.deleteWithAuth(ENTRY_DEL, JSON.stringify(entry));
    },


}
export default HelixMemorizStore;
