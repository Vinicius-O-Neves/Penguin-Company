class DB {
  constructor() {
    this.oracledb = require('oracledb');
    this.connection;

    this.connect();
  }

  async connect() {
    try {
      this.connection = await this.oracledb.getConnection({ user: "system", password: "1234", connectionString: "localhost:1521/xe" });

      console.log("Successfully connected to Oracle Database");
    } catch(err) {
      console.error(err);
    } 
  }
  
  async createUserTicket(idTicketUser, date, amountSpend, modality) {
    try {
      const sqlCommand = "INSERT INTO TICKET_USER (ID_TICKET_USER, GENERATION_DATE, AMOUNT_SPEND, MODALITY) "+
        "VALUES (:0, :1, :2, :3)";
      
      const data = [idTicketUser, date, amountSpend, modality];
      let result = await this.connection.execute(sqlCommand, data);
      
      console.log(result.rowsAffected);
      console.log(sqlCommand, data);

      this.connection.commit();      
    } catch(err) {
      console.error(err);
    } 
  }

  async createAmountOfTickets(idTicketUser, typeOfTicket) {
    let data;
    
    try {
      switch (typeOfTicket) {
        case "unico":
          data = [1, 0, 0, 0, idTicketUser];
          break;
        case "duplo":
          data = [0, 1, 0, 0, idTicketUser];
          break;
        case "semanal":
          data = [0, 0, 1, 0, idTicketUser];
          break;
        case "mensal":
          data = [0, 0, 0, 1, idTicketUser];
          break;
        default:
          break;
      }

      const sqlCommand = "INSERT INTO TICKET_AMOUNT (UNIQUE_TICKET, DOUBLE_TICKET, WEEKLY_TICKET, MONTHLY_TICKET, USER_ID) "+
        "VALUES (:0, :1, :2, :3, :4)";
      let result = await this.connection.execute(sqlCommand, data);
      
      console.log(result.rowsAffected);
      console.log(sqlCommand, data);

      this.connection.commit();      
    } catch(err) {
      console.error(err);
    } 
  }
}

module.exports = DB;