import HelixInteractor from './helixInteractor';

const ENTRY_LIST = "/api/memoriz/entries";
const ENTRY_LIST_BY_BOARD = "/api/memoriz/entries/by-board/";
const ENTRY_ADD = "/api/memoriz/entries";
const ENTRY_DEL = "/api/memoriz/entries/";
const BOARD_LIST = "/api/memoriz/boards";
const BOARD_ADD = "/api/memoriz/boards";
const BOARD_DEL = "/api/memoriz/boards";

const HelixMemorizStore = {
    entryList(callback) {
        return HelixInteractor.getWithAuth(ENTRY_LIST);
    },

    entryListByBoard(uuid, callback) {
        return HelixInteractor.getWithAuth(ENTRY_LIST_BY_BOARD + uuid);
    },

    newEntry(entry, callback) {
        return HelixInteractor.postWithAuth(ENTRY_ADD, JSON.stringify(entry));
    },

    updateEntry(entry, callback) {
        return HelixInteractor.putWithAuth(ENTRY_ADD, JSON.stringify(entry));
    },

    deleteEntry(uuid, callback) {
        return HelixInteractor.deleteWithAuth(ENTRY_DEL + uuid);
    },

    boardList(callback) {
        return HelixInteractor.getWithAuth(BOARD_LIST);
    },

    newBoard(board, callback) {
        return HelixInteractor.postWithAuth(BOARD_ADD, JSON.stringify(board));
    },

    updateBoard(board, callback) {
        return HelixInteractor.putWithAuth(BOARD_ADD, JSON.stringify(board));
    },

    deleteBoard(board, callback) {
        return HelixInteractor.deleteWithAuth(BOARD_DEL, JSON.stringify(board));
    },
}
export default HelixMemorizStore;
