export default function handler(req, res) {
    res.status(200).json({
        userId: process.env.EMAILJS_USER_ID,
        serviceId: process.env.EMAILJS_SERVICE_ID,
        templateIdTeam: process.env.EMAILJS_TEMPLATE_ID_TEAM,
        templateIdUser: process.env.EMAILJS_TEMPLATE_ID_USER,
    });
}
