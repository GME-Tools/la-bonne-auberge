export const dateformat = (date) => {
  let mm = date.getMonth()+1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();
  let hh = date.getHours();
  let min = date.getMinutes();

  let day = [(dd>9 ? '' : '0') + dd,
             (mm>9 ? '' : '0') + mm,
             yyyy].join('-');
  let time = [(hh>9 ? '' : '0') + hh,
              (min>9 ? '' : '0') + min].join(':');

  return [day,time].join(', ');
}
