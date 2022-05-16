// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT i.* ,s.`Amount` as inStock "+
        " FROM `Item_Detail` i "+
        " LEFT JOIN `Stock` s ON i.`Item_ID` = s.`Item_ID` ", (err, result) => {

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
