import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let res = http.get('https://inv.member.co.id');
  check(res, {
      'is status 200': (r) => r.status === 200,
  });
}