
const HelixFormatter = {

    typeToDropdown(types) {
        return types.map(
            obj => {
                var rObj = {};
                rObj["key"] = obj.id;
                rObj["value"] = obj.id;
                rObj["text"] = obj.name;
                return rObj;
            }
        );
    }
}
export default HelixFormatter;