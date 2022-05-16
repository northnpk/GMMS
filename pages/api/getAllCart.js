// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT c.*, t.Description,sum(l.Amount) as `count`,u.Firstname,u.Lastname " +
            " FROM `Cart`c LEFT JOIN Status_type t ON t.Status = c.Status " +
            " LEFT JOIN Cart_List l ON l.Cart_ID = c.Cart_ID " +
            " LEFT JOIN User u ON u.User_ID = c.User_ID " +
            " WHERE c.Status != ? GROUP BY c.Cart_ID", [0], (err, result) => {

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
