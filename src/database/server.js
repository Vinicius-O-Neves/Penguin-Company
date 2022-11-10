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
        case "Único":
          data = [1, 0, 0, 0, idTicketUser];
          break;
        case "Duplo":
          data = [0, 1, 0, 0, idTicketUser];
          break;
        case "Semanal":
          data = [0, 0, 1, 0, idTicketUser];
          break;
        case "Mensal":
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

  async checkUserId (idTicket) {
    try {
      const sqlCommand = "SELECT * FROM TICKET_USER WHERE ID_TICKET_USER = " + "(:0)";
      const data = [idTicket];
      let result = await this.connection.execute(sqlCommand, data);
      /*if (result.rows.length === 0) {
        throw "Número inválido";
      } */
      
      console.log(result.rows);
      
      this.connection.commit();   
      return result.rows;
    } catch(err) {
      console.error(err);
    }

  }

  async rechargeUserTicket (rechargeId, date, idTicketUser, type) {
    try {
      const sqlCommand = "INSERT INTO RECHARGE (ID_RECHARGE, DATE_HOUR_RECHARGE, USER_ID, TYPE_ID_RECHARGE) "+
      "VALUES (:0, :1, :2, :3)";
      const data = [rechargeId, date, idTicketUser, type];

      let result = await this.connection.execute(sqlCommand,data);
      
      console.log(result.rowsAffected);
      console.log(sqlCommand,data);

      this.connection.commit();   
    } catch(err) {
      console.error(err);
    }
  }

  async addAmount (idTicket, typeOfTicket) {
    try {
      const sqlCommandSelectTicketAmount = "SELECT * FROM TICKET_AMOUNT WHERE USER_ID = " + "(:0)";
      let sqlCommandUpdate;
      const data = [idTicket];
      let data2, result2;
      let result = await this.connection.execute(sqlCommandSelectTicketAmount, data);

      switch (typeOfTicket) {
        case "Único":
          data2 = result.rows[0][0]+1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET UNIQUE_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Duplo":
          data2 = result.rows[0][1]+1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET DOUBLE_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Semanal":
          data2 = result.rows[0][2]+1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET WEEKLY_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Mensal":
          data2 = result.rows[0][3]+1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET MONTHLY_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        default:
          break;
      }

      console.log(sqlCommandUpdate,data2);
      result2 = await this.connection.execute(sqlCommandUpdate);
      console.log(result2.rows);
      this.connection.commit();   
      return result2.rows;
    } catch(err) {
      console.error(err);
    }
  }

}

module.exports = DB;