import{I as e}from"./index.2854391f.js";function c(t){return e.get({url:"/checkIn/selectByPage",params:t})}function u(t){return e.get({url:"/checkIn",params:t})}function s(t){return e.post({url:"/checkIn/create",params:t})}function i(t){return e.post({url:"/checkIn/review",params:t})}function r(t){return e.post({url:"/checkIn",params:t})}function k(t){return e.post({url:"/checkIn/sign",params:t})}function I(t){return e.put({url:`/checkIn/submit?id=${t.id}&message=${t.message}&taskId=${t.taskId}`})}function o(t){return e.put({url:`/checkIn/reject?id=${t.id}&message=${t.message}&taskId=${t.taskId}`})}function a(t){return e.put({url:`/checkIn?id=${t.id}&message=${t.message}&taskId=${t.taskId}`})}function d(t){return e.put({url:`/checkIn/revocation?id=${t.id}&flowStatus=${t.flowStatus}&taskId=${t.taskId}`})}function h(t){return e.put({url:`/checkIn/cancel?id=${t.id}&taskId=${t.taskId}`})}export{u as a,I as b,r as c,s as d,d as e,i as f,c as g,h,o as r,k as s,a as t};
