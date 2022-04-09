import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await post('/api/appschemas/search', params);
}

export async function count(params, options) {
  return await post('/api/appschemas/count', params, options);
}

export async function getById(id, options) {
  return await get(`/api/appschemas/detail?id=${id}`, {}, options);
}

export async function update(params) {
  return await put('/api/appschemas/update', params);
}

export async function save(params) {
  return await post('/api/appschemas/create', params);
}

export async function remove(id, options) {
  return await del(`/api/appschemas/delete?id=${id}`, {}, options);
}
