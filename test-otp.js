const axios = require('axios');

async function test() {
    try {
        const courses = await axios.get('https://api.snwelacademy.in/course?limit=1');
        const courseId = courses.data.data.docs[0]._id;

        console.log("Creating enrollment...");
        const payload = {
            name: "Test User",
            email: "test_shivam@mailinator.com",
            courseId: courseId,
            phone: "919999999999",
            location: { city: "Delhi", state: "DL", country: "IN" },
            extra: { agree: true },
            qualification: "B.Tech",
            mode: "Online",
            occupation: "Student"
        };

        const res = await axios.post('https://api.snwelacademy.in/course-enroll/anon', payload);
        console.log("Enrollment Response:", res.data);

        if (res.data.data.token || res.data.token) {
            const token = res.data.data.token || res.data.token;
            console.log("Resending OTP with token:", token);
            const resend = await axios.post('https://api.snwelacademy.in/course-enroll/resend-otp', {
                token: token
            });
            console.log("Resend Response:", resend.data);
        }
    } catch (e) {
        console.error(e.response ? e.response.data : e.message);
    }
}
test();
