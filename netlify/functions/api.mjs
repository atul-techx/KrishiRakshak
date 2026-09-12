import { handleAPI } from '../../api.mjs';
export default (request) => handleAPI(request, process.env);
export const config = { path: '/api/*' };
