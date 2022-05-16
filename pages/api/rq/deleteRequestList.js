import con from "../../../lib/connect";

export default async function handler(req, res) {

    const { requestID, itemID, total } = req.body;

    try {

        con.query("SELECT Amount,Item_ID FROM `Stock` WHERE Item_ID IN (?) ", [itemID], (err, result) => {

            if (err) {
                console.log(err);
                res.status(400).json({ error: 'not found' });
                return;
            }

            result.forEach((v) => {
                const a = total[v.Item_ID] + parseInt(v.Amount)
                con.query('UPDATE `Stock` SET `Amount`=? WHERE `Item_ID`=?', [a, v.Item_ID]);
            })

            res.status(200).json(result);

            con.query("DELETE FROM `Request_List` WHERE Request_ID = ? AND Item_ID IN (?)", [requestID, itemID], (err, result) => {

                if (err) {
                    console.log(err);
                    res.status(400).json({ error: 'not found' });
                    return;
                }
                res.status(200).json(result);

            });

        });
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}