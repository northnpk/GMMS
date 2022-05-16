import con from "../../lib/connect";

export default async function handler(req, res) {

    const { cartID } = req.query;

    try {
        con.query("Select * FROM `Cart_List` c LEFT JOIN `Item_Detail` i ON c.`Item_ID` = i.`Item_ID` WHERE c.`Cart_ID` = ?", [cartID], (err, result) => {

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