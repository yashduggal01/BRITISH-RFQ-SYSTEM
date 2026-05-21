const BASE = import.meta.env.VITE_API_BASE || 'https://british-rfq-system-1.onrender.com/api';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch (err) {
    if (err instanceof TypeError) throw new Error('Network error — please check your connection.', { cause: err });
    throw err;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const createRfq = (body) => request('/rfq/create', { method: 'POST', body: JSON.stringify(body) });
export const listRfqs = () => request('/rfq');
export const getRfq = (id) => request(`/rfq/${id}`);
export const submitBid = (id, body) => request(`/rfq/${id}/bid`, { method: 'POST', body: JSON.stringify(body) });
export const getBids = (id) => request(`/rfq/${id}/bids`);
export const getEvents = (id) => request(`/rfq/${id}/events`);
export const getDashboardInsights = () => request('/insights/dashboard');
export const simulateBid = (id, body) => request(`/insights/rfq/${id}/simulate`, { method: 'POST', body: JSON.stringify(body) });
