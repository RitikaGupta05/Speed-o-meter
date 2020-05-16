 const checkStatus = response => {
     console.log("IncheckStatus")
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    if (response.status === 500) {
        return response.json().then(errorData => {
            const message = (errorData || {}).error
            const error = new TypeError(message || 'Server error')
            throw error
        })
    }
    if (response.status === 401) {
        const error = {
            code: response.status,
            data: 'Unathorized'
        }
        throw error
    }
    return response.json().then(errorData => {
        const error = {
            code: response.status,
            data: errorData
        }
        throw error
    })
}

 const parseJSON = response => {
     console.log("InparseJSON")
    if (response.status === 204 || response.status === 205) {
        return null
    }
    if (response.data.status === "Transaction Not Found!!! Sorry :)" && response.status === 200) {
        return response.data
    }

    const contentType = response.headers["content-type"]
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.data
    }
    return null
}