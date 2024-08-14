function Getstatus() {
    let kakunin_fa = localStorage.getItem("status");
    let status_fs = localStorage.getItem("save_data");

    // Correct the condition to check if both kakunin_fa and status_fs.user are not undefined
    if (
        kakunin_fa !== null &&
          status_fs !== null &&
          status_fs.user !== undefined
          ) {
        var data = JSON.parse(kakunin_fa);
        var currentTimestamp = Date.now();
        var expiryTime = 744 * 60 * 60 * 1000;

        if (data && currentTimestamp - data.timestamp <= expiryTime) {
            window.Login = localStorage.getItem("user");
            return true;
        } else {
            localStorage.removeItem("status");
            return false;
        }
    } else {
        return false;
    }
}
window.lstas = Getstatus();