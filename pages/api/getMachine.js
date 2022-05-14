// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    try {
        con.query("SELECT `Machine_Name`,`Serial_number`,`Machine_Type`,`Efficiency`,`Active_start` FROM `Machine`", (err, result) => {

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
