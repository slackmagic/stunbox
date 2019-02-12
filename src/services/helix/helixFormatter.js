
const HelixFormatter = {

    textTruncate(text, size = 140) {
        return text.substring(0, size);
    },

    dateToText(time, prefix = "") {
        if (time !== undefined) {
            var date = new Date(time) // returns NaN if it can't parse
            return Number.isNaN(date) ? "" : prefix + date.toLocaleDateString("fr-FR");
        }
        else {
            return time;
        }
    },

    typeToDropdown(list) {
        return list.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.id;
                rObj["value"] = obj.id;
                rObj["text"] = obj.name;
                return rObj;
            }
        );
    },

    supportToDropdown(list) {
        return list.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.id;
                rObj["value"] = obj.id;
                rObj["text"] = obj.name;
                return rObj;
            }
        );
    },

    typeToHashmap(list) {
        return list.reduce((map, obj) => { map[obj.id] = obj.name; return map; }, {});
    },

    supportToHashmap(list) {
        return list.reduce((map, obj) => { map[obj.id] = obj.name; return map; }, {});
    },

    userToDropdown(list) {
        return list.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.person.uuid;
                rObj["value"] = obj.person.uuid;
                rObj["text"] = obj.person.firstname + " (" + obj.login + ")";
                return rObj;
            }
        );
    },

    userToHashmap(list) {
        return list.reduce((map, obj) => { map[obj.person.uuid] = obj.login; return map; }, {});
    },

    collectionToDropdown(list) {
        return list.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.uuid;
                rObj["value"] = obj.uuid;
                rObj["text"] = obj.name;
                return rObj;
            }
        );
    },

    referenceToSearch(list) {
        return list.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.uuid;
                rObj["value"] = obj;
                rObj["title"] = obj.name;
                return rObj;
            }
        );
    }
}
export default HelixFormatter;