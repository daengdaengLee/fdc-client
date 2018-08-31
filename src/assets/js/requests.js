import axios from 'axios';

const BASE_URL = '';

/**
 *
 * @param {string} fab fab id
 */
export const getTree = fab =>
  axios
    .get(`${BASE_URL}/fdc/module/${fab}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: [] }));

/**
 *
 * @param {string} by lot or wafer
 * @param {string} fab fab id
 * @param {string} eqp eqp list
 * @param {string} from from date
 * @param {string} to to date
 */
export const getHistory = (by, fab, eqp, from, to) =>
  axios
    .get(`${BASE_URL}/fdc/history/${by}/${fab}/${eqp}/${from}/${to}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: [] }));

/**
 *
 * @param {string} fab fab id
 * @param {string} eqp eqp list
 * @param {string} from from date
 * @param {string} to to date
 * @param {string} lot lot id
 */
export const getParameters = (fab, eqp, from, to, lot) =>
  axios
    .get(`${BASE_URL}/fdc/param/${fab}/${eqp}/${from}/${to}/${lot}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: [] }));

/**
 *
 * @param {string} fab fab id
 * @param {string} eqp eqp list
 * @param {string} from from date
 * @param {string} to to date
 * @param {string} lot lot id
 * @param {string} param param list
 */
export const getTraceData = (fab, eqp, from, to, lot, param) =>
  axios
    .get(`${BASE_URL}/fdc/data/${fab}/${eqp}/${from}/${to}/${lot}/${param}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: {} }));
