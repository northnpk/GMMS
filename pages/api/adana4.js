// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT l.Item_ID, i.Item_Name, SUM(l.Amount) AS Request_counting FROM `Request` r, `Request_List` l, `Item_Detail` i WHERE l.Request_ID = r.Request_ID AND i.Item_ID = l.Item_ID GROUP BY l.Item_ID ORDER BY Request_counting DESC;"
        , (err, result) => {

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