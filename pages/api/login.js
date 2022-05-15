// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../lib/connect";

export default async function handler(req, res) {

    const { user } = req.body;

    try {
        con.query("SELECT `User_ID`,`Firstname`,`Lastname`,`Phonenumber`,`Role` FROM `User` WHERE Username=? AND Password=?", [user.username, user.password], (err, result) => {

            if (err || result.length == 0) {
                if (err.code == 'ECONNREFUSED') console.log(err.code);
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
