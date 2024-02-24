const makeSuccessResponse = (data) =>{
    return { content: data, error: [] }
}

const makeErrorResponse = (error) => {
    return { content: [], error }
}

module.exports = {
    makeSuccessResponse,
    makeErrorResponse
}