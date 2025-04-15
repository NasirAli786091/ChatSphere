const validate = (schema) => async (req, res, next) => {
    try {
        const parseData = await schema.parseAsync(req.body);
        req.body = parseData;
        next();
    } catch (error) {
        console.log("error in validate js");
        res.status(500).json({message : error.issues[0].message});
        console.log(error.issues[0].message);
    }
}

export default validate;