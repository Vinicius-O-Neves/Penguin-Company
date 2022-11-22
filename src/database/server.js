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

      if (typeof localStorage==="undefined" || localStorage===null) {
        var localStorage = require('node-localstorage').LocalStorage;
        localStorage = new localStorage('../database')
      }

      if (result.rows.length === 0) {
        result.rows = 0;
        localStorage.setItem("idValid",false);
      } else {
        localStorage.setItem("idValid",true);
      }
      
      console.log(result.rows);
      
      this.connection.commit();   
      return result.rows;
    } catch(err) {
      console.error(err);
    }

  }

  //Função para alimentar a tabela 'Recharge'
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

  //Função para atualizar a tabela 'Ticket_Amount', somando 1 no tipo escolhido pelo usuário
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

  async selectAmount (idTicket) {
    try {
      const sqlCommand = "SELECT * FROM TICKET_AMOUNT WHERE USER_ID = " + "(:0)";
      const data = [idTicket];
      let result = await this.connection.execute(sqlCommand, data);
    

      console.log(result.rows);
      
      this.connection.commit();   
      return result.rows;
    } catch(err) {
      console.error(err);
    }
  }

  async UsingUserTicket (usageId, type, date, idTicketUser) {
    try {
      const sqlCommand = "INSERT INTO TICKET_USING (ID_TICKET_USING, TYPE_TICKET_USING, DATE_HOUR_TICKET_USING, USER_ID) "+
      "VALUES (:0, :1, :2, :3)";
      const data = [usageId, type, date, idTicketUser];

      let result = await this.connection.execute(sqlCommand,data);
      
      console.log(result.rowsAffected);
      console.log(sqlCommand,data);

      this.connection.commit();   
    } catch(err) {
      console.error(err);
    }
  }

  async subtractAmount (idTicket, typeOfTicket) {
    try {
      const sqlCommandSelectTicketAmount = "SELECT * FROM TICKET_AMOUNT WHERE USER_ID = " + "(:0)";
      let sqlCommandUpdate;
      const data = [idTicket];
      let data2, result2;
      let result = await this.connection.execute(sqlCommandSelectTicketAmount, data);
      var lastTicketUsage = await this.getLastTicketUsage(idTicket,typeOfTicket);
      lastTicketUsage=lastTicketUsage.substring(13,21).split(":");
      var hour = lastTicketUsage[0]*3600;
      var minute = lastTicketUsage[1]*60;
      var secondsLastUsage = hour+minute+lastTicketUsage[2]*1;
      console.log(secondsLastUsage);

      switch (typeOfTicket) {
        case "Único":
          data2 = result.rows[0][0]-1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET UNIQUE_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Duplo":
          data2 = result.rows[0][1]-1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET DOUBLE_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Semanal":
          data2 = result.rows[0][2]-1
          sqlCommandUpdate = "UPDATE TICKET_AMOUNT SET WEEKLY_TICKET = " + data2 + " WHERE USER_ID = " + "'"+ idTicket +"'";
          break;
        case "Mensal":
          data2 = result.rows[0][3]-1
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

  async getLastTicketUsage (idTicket, typeOfTicket) {
    try {
      var sqlCommandGetLastTicketUsage = "SELECT DATE_HOUR_TICKET_USING FROM TICKET_USING "+
      "WHERE USER_ID = " + "(:0)" + " AND TYPE_TICKET_USING = "+"(:1)"+
      " ORDER BY DATE_HOUR_TICKET_USING DESC";
                                        
                                        
      var data = [idTicket,typeOfTicket];
      let result = await this.connection.execute(sqlCommandGetLastTicketUsage,data);

      console.log(result.rowsAffected);
      console.log(sqlCommandGetLastTicketUsage,data);

      this.connection.commit(); 
      return result.rows[0][0];
    } catch(err) {
      console.error(err);
    }
  }
}

module.exports = DB;
