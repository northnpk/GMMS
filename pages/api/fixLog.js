// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    const { errorID, detail } = req.body;

    console.log(errorID,detail)

    try {
        con.query("UPDATE `error_logging` SET `ProblemDetail`=?,`Status`=? WHERE `ErrorLog_ID` = ?", [detail, 1, errorID], (err, result) => {

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
