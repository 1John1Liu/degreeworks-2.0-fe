export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, role, sessionId } = req.body;

    // Construct query string from parameters
    const queryString = new URLSearchParams({ name, role, sessionId }).toString();

    // Redirect to the dashboard page with query parameters
    res.redirect(307, `/dashboard?${queryString}`);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
