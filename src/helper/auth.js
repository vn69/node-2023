import jwt from "jsonwebtoken"

const helper = {
    checkToken: (req, res, next) => {
        if(checkTwoString('/api/v1/user/login', req.url) || checkTwoString('/api/v1/user/create', req.url)) {
            console.log("pass", req.url)
            next();
        } else {
            console.log("check token")
            const token = req.headers.authorization?.split(" ")[1]
            if(token) {
                try {
                    const jwtObject = jwt.verify(token, process.env.SECRET_KEY)
                    const isExpired = Date.now() >= jwtObject.exp * 1000
                    if(isExpired) {
                        return res.status(403).json({
                            message: 'Token is expired'
                        })   
                    } else {
                        next()
                        return
                    }  
                    
                } catch (error) {
                    res.status(403).json({
                        message: error
                    })
                }
            } else {
                res.status(403).json({
                    message: 'Token is missing'
                })
            }
        }
    }
}

const checkTwoString = (str1, str2) => {
    if(str1.toLowerCase().trim() === str2.toLowerCase().trim()) return true
    else return false
}

export default helper