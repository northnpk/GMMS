import con from "../../../lib/connect";

export default async function handler(req, res) {

    const { requestID, itemID, amount, total } = req.body;
    const _amount = parseInt(amount);

    try {
        con.query("Select * FROM `Request_List` WHERE Item_ID = ? AND Request_ID = ?", [itemID, requestID], (err, result) => {

            if (err) {
                console.log(err);
                res.status(400).json({ error: 'not found' });
                return;
            }

            con.query('UPDATE `stock` SET `Amount`=? WHERE `Item_ID`=?', [total, itemID], (err) => {

                if (result.length == 0) {
                    con.query("INSERT INTO `Request_List` " +
                        " (`Request_ID`,`Item_ID`, `Amount`) " +
                        " VALUES (?,?,?)", [requestID, itemID, _amount], (err1, result1) => {
                            if (err1) {
                                console.log(err1);
                                res.status(400).json({ error: 'not found' });
                                return;
                            }
                            res.status(200).json(result1);
                        })
                } else {
                    con.query("UPDATE `Request_List` SET `Amount`=? WHERE `Item_ID`=? AND  Request_ID = ?", [result[0].Amount + _amount, itemID], requestID, (err1, result1) => {
                        if (err1) {
                            console.log(err1);
                            res.status(400).json({ error: 'not found' });
                            return;
                        }
                        res.status(200).json(result1);
                    })
                }

            });


        });
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}