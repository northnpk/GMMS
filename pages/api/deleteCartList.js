import con from "../../lib/connect";

export default async function handler(req, res) {

    const { cartID, itemID } = req.body;

    try {
        con.query("DELETE FROM `cart_list` WHERE Cart_ID = ? AND Item_ID IN (?)", [cartID, itemID], (err, result) => {

            if (err) {
                console.log(err);
                res.status(400).json({ error: 'not found' });
                return;
            }
            res.status(200).json(result);

        });
    } catch {
        console.log("Error")
        res.status(400).json({ error: 'not found' });
    }

}