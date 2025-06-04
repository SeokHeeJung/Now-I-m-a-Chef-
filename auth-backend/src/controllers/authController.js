// 사용자 회원가입 및 로그인 관련 함수들을 정의합니다.
class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async registerUser(req, res) {
        const { username, password, email } = req.body;
        try {
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = await this.userModel.create({ username, password, email });
            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userModel.findOne({ email });
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Here you would typically generate a token and send it back
            return res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            return res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

export default AuthController;