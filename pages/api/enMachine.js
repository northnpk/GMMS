// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    const { id } = req.query;

    try {
        con.query("SELECT m.*,GROUP_CONCAT(e.`Status`) as Status" +
            " FROM `Machine` m " +
            " INNER JOIN Error_Logging e ON m.`Serial_number` = e.`Serial_number` AND e.`User_ID` = ?" +
            " GROUP BY m.`Serial_number`", [id], (err, result) => {

                if (err) {
                    console.log(err);
                    res.status(400).json({ error: 'not found' });
                    return;
                }
                const serial = result.map((v) => v.Serial_number)

                con.query("SELECT d.`Efficiency`,d.`Data_ID`,d.`Serial_number` FROM Data d WHERE d.`Serial_number` in (?) ORDER BY d.`Data_ID` DESC LIMIT 2", [serial], (err2, result2) => {
                    if (err2) {
                        console.log(err2);
                        res.status(400).json({ error: 'not found' });
                        return;
                    }
                    result2.forEach((v, i) => {
                        const data = result.find((v2) => v.Serial_number == v2.Serial_number)
                        data.Efficiency = v.Efficiency;
                        data.id = v.Serial_number;
                    })
                    res.status(200).json(result);
                });
            })
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}
