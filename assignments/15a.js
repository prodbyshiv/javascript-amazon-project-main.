import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import isSatSun from './functionWeekend.js';
const today = dayjs().add(6,'days');

const params = today.format('dddd');


   


console.log(isSatSun(params));
  