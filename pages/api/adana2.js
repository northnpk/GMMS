// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT m.Machine_Type, COUNT(m.Machine_Type) AS Error_count, MAX(e.Problem_Category) AS Mostly_Problem_Category FROM `Machine` m, `Error_logging` e WHERE m.Serial_number = e.Serial_number GROUP BY m.Machine_Type ORDER BY Error_count DESC;", (err, result) => {

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