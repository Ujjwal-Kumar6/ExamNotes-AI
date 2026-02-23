import userModle from "../modle/userModle.js";


export const getCurrent = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(201).json({message:'You are not Login to this WebPage'});
        }
        const user = await userModle.findById(userId);
        if (!user) {
            return res.status(405).json({messge:`your findById is not woring in MongoDB`});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:`Get Current User error :- ${error}`});
    }
}