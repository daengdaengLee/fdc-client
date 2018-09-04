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
 * @param {string} mod module list
 * @param {string} from from date
 * @param {string} to to date
 */
export const getHistory = (by, fab, mod, from, to) =>
  axios
    .get(`${BASE_URL}/fdc/history/${by}/${fab}/${mod}/${from}/${to}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: [] }));

/**
 *
 * @param {string} fab fab id
 * @param {string} mod module list
 * @param {string} from from date
 * @param {string} to to date
 * @param {string} lot lot id
 */
export const getParameters = (fab, mod, from, to, lot) =>
  axios
    .get(`${BASE_URL}/fdc/param/${fab}/${mod}/${from}/${to}/${lot}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: [] }));

/**
 *
 * @param {string} fab fab id
 * @param {string} mod module list
 * @param {string} from from date
 * @param {string} to to date
 * @param {string} lot lot id
 * @param {string} param param list
 */
export const getTraceData = (fab, mod, from, to, lot, param) =>
  axios
    .get(`${BASE_URL}/fdc/data/${fab}/${mod}/${from}/${to}/${lot}/${param}`)
    .then(({ data }) => ({ success: true, data }))
    .catch(() => ({ success: false, data: {} }));
