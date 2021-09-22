// creating mock request and reponse for jest test case
export const mockRequest = () => {
    const req:any = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.headers = jest.fn().mockReturnValue(req)
    return req
}

export const mockResponse = () => {
    const res:any = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.download = jest.fn().mockReturnValue(res)

    return res
}
