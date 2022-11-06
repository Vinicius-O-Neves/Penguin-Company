class DateExtension {
    getDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        
        return currentDate;
      }

      getDatetime() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let currentDate = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
        
        return currentDate;
      }
}

module.exports = DateExtension