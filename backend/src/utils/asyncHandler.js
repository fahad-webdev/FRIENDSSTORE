/*const asyncHandler = (func) => async  (req,res,next) =>{//it is a higher order function that will accept function as a parameter
    try {
        await func(res,req,next); 
    } catch (error) {
        res.status(err.code || 500).json(
            {
                success:false,
                message:err.message,
            }
        )
    }
}
*/
const asyncHandler =(reqHandler)=>{//same thing using promises
    (req,res,next)=>{
        Promise.resolve(reqHandler(req,res,next)).
        catch((error)=> next(error))
    }
}
module.exports = asyncHandler;