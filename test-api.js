const axios = require('axios');

async function test() {
    try {
        const loginRes = await axios.post('https://api.snwelacademy.in/auth/login', {
            email: 'admin@snwelacademy.com',
            password: 'Admin@123'
        });

        // console.log("Login Res:", Object.keys(loginRes.data));

        const token = loginRes.data?.token || loginRes.data?.data?.token;

        if (!token) {
            console.log("No token", loginRes.data);
            return;
        }

        const enrollRes = await axios.get('https://api.snwelacademy.in/course-enroll?limit=5', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const docs = enrollRes.data.data.docs;
        console.log(JSON.stringify(docs.map(d => ({
            applicant: d.applicant,
            userId: d.userId,
            phone: d.phone,
            mobile: d.mobile,
            allKeys: Object.keys(d)
        })), null, 2));
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
    }
}
test();
