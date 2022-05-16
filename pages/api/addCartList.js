import con from "../../lib/connect";

export default async function handler(req, res) {

    const { cartID, itemID, amount } = req.body;
    const _amount = parseInt(amount);

    try {
        con.query("Select * FROM `Cart_List` WHERE Item_ID = ? AND Cart_ID = ?", [itemID, cartID], (err, result) => {

            //con.query('UPDATE `stock` SET `Amount`=? WHERE `Item_ID`=?', [total, itemID]);

            if (err) {
                console.log(err);
                res.status(400).json({ error: 'not found' });
                return;
            }

            if (result.length == 0) {
                con.query("INSERT INTO `Cart_List` " +
                    " (`Cart_ID`,`Item_ID`, `Amount`) " +
                    " VALUES (?,?,?)", [cartID, itemID, _amount], (err1, result1) => {
                        if (err1) {
                            console.log(err1);
                            res.status(400).json({ error: 'not found' });
                            return;
                        }
                        res.status(200).json(result1);
                    })
            } else {
                con.query("UPDATE `cart_list` SET `Amount`=? WHERE `Item_ID`=? AND Cart_ID = ?", [result[0].Amount + _amount, itemID, cartID], (err1, result1) => {
                    if (err1) {
                        console.log(err1);
                        res.status(400).json({ error: 'not found' });
                        return;
                    }
                    res.status(200).json(result1);
                })
            }


        });
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}