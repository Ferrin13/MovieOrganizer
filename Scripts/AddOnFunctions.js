function successCB(data) {
    console.log("Success callback: " + $.makeArray(data)[0]);
};

function errorCB(data) {
    console.log("Error callback: " + data);
};