const express = require('express');
const fs = require('fs');
const path = require('path');
var jwt = require('jsonwebtoken');


// Import models
const userModel = require('../../models/user')


const router = express.Router();
router.get('/register', async (req, res) => {
    const key = process.env.jwtKey;
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ success: false, message: 'اطلاعات برای ورود کامل نیست', data: {} })

    let user = await userModel.findOne({ username: username })
    if (user)
        return res.status(400).json({ success: false, message: 'نام کاربری قبلا استفاده شده است', data: {} })

    user = await userModel.findOne({ email: email })
    if (user)
        return res.status(400).json({ success: false, message: 'ایمیل قبلا استفاده شده است', data: {} })

    const userData = {
        username: username,
        email: email,
        password: password
    }
    user = await userModel.create(userData)

    if (!user)
        return res.status(400).json({ success: false, message: 'خطا در ایجاد کاربر', data: {} })

    const token = jwt.sign({ id: user._id }, key);

    res.json({ success: true, message: 'کاربر با موفقیت ایجاد شد', data: { token: token } })

})

router.get('/login', async (req, res) => {
    const key = process.env.jwtKey;



    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'اطلاعات برای ورود کامل نیست', data: {} })


    let user = await userModel.findOne({ username: username })
    if (!user)
        return res.status(400).json({ success: false, message: 'یوزرنیم یا رمز عبور اشتباه است.', data: {} })

    if (password != user.password)
        return res.status(400).json({ success: false, message: 'یوزرنیم یا رمز عبور اشتباه است.', data: {} })


    const token = jwt.sign({ id: user._id, date: Date.now() }, key);

    res.json({ success: true, message: 'ورود با موفقیت انجام شد', data: { token } })

})


module.exports = router;