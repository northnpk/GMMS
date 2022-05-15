import con from "../../lib/connect";

export default async function handler(req, res) {

    const { id, userID } = req.query;
    const onlyEn = (userID) ? ' AND e.User_ID = ? ' : ''
    console.log(userID,onlyEn)

    try {
        con.query("SELECT e.*,p.`Description` as `Catagory`,u.`Firstname`,u.`Lastname` FROM `Error_Logging` e" +
            " LEFT JOIN  `Problem_type` p ON e.Problem_Catagory = p.Problem_Catagory " + onlyEn +
            " LEFT JOIN  `User` u ON u.User_ID = e.User_ID " +
            " WHERE `Serial_number` = ?", (userID) ? [userID, id] : [id], (err, result) => {

                if (err) {
                    if (err.code == 'ECONNREFUSED') console.log(err.code);
                    res.status(400).json({ error: 'not found' });
                    return;
                }
                res.status(200).json(result);
            })
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }


}