export const reminderNotification = (time, message) => {
   let endTime = time;
   endTime.setSeconds(endTime.getSeconds() + 20);
   let diff = endTime.getTime() - new Date().getTime();
   const diffInSecs = diff / 1000;
   if (diffInSecs <= 20 && diffInSecs >= 0) {
     setTimeout(() => {
       alert(message);
     }, diff);
   }
}