import userModle from "../modle/userModle.js";

export const topUp = async(req, res) =>{
    try{
        const userId = req.userId;
        const {amount,dimond} = req.body;
        const user = await userModle.findById(userId);

        user.credits = user.credits + dimond;
        await user.save();

        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:`topUP error: - ${error}`});
    }
}