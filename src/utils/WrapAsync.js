export const WrapAsync = (func, setMsg, setMsgType) => {
    return async function (...arg) {
        try {
            const res = await func(...arg)
            if (res?.data?.message) setMsg(res?.data?.message)
            setMsgType("success")
        } catch (e) {
            console.log("front error: ", e?.message)
            setMsg(e?.response?.data?.message || "Something Went Wrong")
            setMsgType("danger")
        }
    }
}