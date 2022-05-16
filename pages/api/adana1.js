// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT e.Serial_number, m.Machine_name, " + 
        "m.Machine_Type, m.Detail, COUNT(e.Serial_number) AS Error_count " + 
        "FROM `Machine` m, `Error_logging` e WHERE m.Serial_number = e.Serial_number "+
        "GROUP BY e.Serial_number ORDER BY Error_count DESC", (err, result) => {

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