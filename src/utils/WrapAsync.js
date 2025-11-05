export const WrapAsync = (func) => {
    return async function (...arg) {
        try {
            await func(...arg)
        } catch (e) {
            console.log("front error: ", e?.message)
        }
    }
}