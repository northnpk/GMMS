// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    const { id } = req.query;

    try {
        con.query("SELECT m.*,d.`Efficiency`,d.`Data_ID`,e.`Status`  " +
            "FROM `Machine` m " +
            "LEFT JOIN Data d ON m.`Serial_number` = d.`Serial_number`" +
            "LEFT JOIN Error_Logging e ON m.`Serial_number` = e.`Serial_number` AND e.`Status` = ? " +
            "WHERE m.User_ID = ? GROUP BY d.`Data_ID` ORDER BY d.`Data_ID` DESC LIMIT 16", [0,id], (err, result) => {

                if (err) {
                    console.log(err);
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
