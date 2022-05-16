import con from "../../lib/connect";

export default async function handler(req, res) {

    console.log(req.body)
    const { serial, type, level, detail } = req.body;

    try {
        con.query("INSERT INTO `Error_Logging` " +
            " (`Serial_number`, `Problem_Category`, `Problem_LV`, `ProblemDetail`, `Status`, `User_ID`) " +
            " VALUES (?,?,?,?,?,?)", [serial, type, level, detail, 0, 0], (err, result) => {

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