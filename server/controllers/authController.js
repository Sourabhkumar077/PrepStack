import User, { findOne } from '../models/User';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // Isey add karein

// Register function (yeh pehle se hai, waise hi rahega)
export async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        let user = await findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();
        
        // Register karne ke baad bhi token bhej dete hain
        const payload = {
            user: {
                id: user.id
            }
        };

        sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

// Naya Login function add karein
export async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Check for user
        let user = await findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        [cite_start]// Return jsonwebtoken [cite: 49]
        const payload = {
            user: {
                id: user.id // We will use this id to fetch user-specific data later
            }
        };

        sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}