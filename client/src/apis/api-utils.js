export const handleError = (e) => {
    if (e.response.status === 401) {
        alert(e.response.data.msg);
        window.location.replace("login")
    }
};