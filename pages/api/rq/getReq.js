import con from "../../../lib/connect";

const GetCart = (id, req, res) => {

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
        con.query("Select * FROM `Request` WHERE `Status` = ? AND User_ID = ?", [0, id], (err, result) => {

            if (err) {
                console.log(err);
                res.status(400).json({ error: 'not found' });
                return;
            }

            if (result.length > 0) {
                res.status(200).json(result[0]);
                return;
            }

            con.query("INSERT INTO `Request` " +
                " (`Status`, `Date`, `Detail`, `User_ID`,`ErrorLog_ID`) " +
                " VALUES (?,?,?,?,?)", [0, date, '', id, 0], (err2, result2) => {
                    if (err2) {
                        console.log(err2);
                        res.status(400).json({ error: 'not found' });
                        return;
                    }
                    GetCart(id, req, res)
                });
        })
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}

export default async function handler(req, res) {

    const { id } = req.query;

    GetCart(id, req, res)

}