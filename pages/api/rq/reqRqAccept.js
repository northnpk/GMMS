import con from "../../../lib/connect";

export default async function handler(req, res) {

    console.log(req.body)
    const { id } = req.query;

    try {
        con.query("UPDATE `Request` SET `Status`= '1' WHERE Request_ID = ?", [id], (err, result) => {
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