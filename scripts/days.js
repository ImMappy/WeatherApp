const daysWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
let todayDate = new Date();
let options = {weekday:'long'};
let today = todayDate.toLocaleDateString('en-EN', options)


today = today.charAt(0).toUpperCase() + today.slice(1)

let orderDays = daysWeek.slice(daysWeek.indexOf(today)).concat(daysWeek.slice(0, daysWeek.indexOf(today))); // decoupe du tableau qui prends le debut soit le jour actuel 
console.log(orderDays)

export default orderDays;