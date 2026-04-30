
const resStatus = {
    error: 'ERROR',
    success: 'SUCCESS',
    fail: 'FAIL'
}

const createResponse = (status, message="", data = null) => {
    return {
        status:resStatus[status] || resStatus.error,
        message,
        data
    };
};


export default createResponse;