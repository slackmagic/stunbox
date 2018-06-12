
const HelixFormatter = {

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
    }
}
export default HelixFormatter;