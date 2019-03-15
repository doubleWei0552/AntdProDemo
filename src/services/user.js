import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/u/current', {
    method: 'GET'
  });
}

export async function updataCurrent(params) {
  return request('/u/updataCurrent', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
