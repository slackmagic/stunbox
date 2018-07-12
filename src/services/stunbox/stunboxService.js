const StunboxService = {

    getMyName(callback) {
        return sessionStorage.getItem("user");
    },

    getMyUUID(callback) {
        return sessionStorage.getItem("user_uuid");
    },

    getMyPersonUUID(callback) {
        return sessionStorage.getItem("person_uuid");
    },

}
export default StunboxService;