import json from '../db/data.json' assert { type: "json" };
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

class Ticket{

    constructor(numero,escritorio){
        this.numero=numero
        this.escritorio=escritorio
    }

}

export class TicketControl{

    constructor(){

        this.ultimo   = 0
        this.dia      = new Date().getDate()//5
        this.tickets  = []
        this.ultimos4 = []

        console.log(this.dia)

        this.init()
    }

    get toJson(){

        return{
            ultimo   : this.ultimo,
            hoy      : this.dia,
            tickets  : this.tickets,
            ultimos4 : this.ultimos4
        }
  
    }

    init(){

        const {hoy,ultimo,tickets,ultimos4}=json
        console.log(hoy===this.hoy)
        if(hoy===this.hoy){
            this.tickets=tickets;
            this.ultimo=ultimo;
            this.ultimos4=ultimos4
        }
        else{
            this.guardarDB()
        }
    }

    guardarDB(){

        const dbPath=path.join(__dirname,'../db/data.json')

        fs.writeFileSync(dbPath,JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo +=1
        const ticket = new Ticket(this.ultimo,null)
        this.tickets.push(ticket)

        this.guardarDB
        return 'Ticket' + ticket.numero
    }

    atenderTickets(escritorio){

        if(this.tickets.length===0){
            return null
        }

        const ticket = this.tickets.shift()
        ticket.escritorio=escritorio

        this.ultimos4.unshift()

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)
        }

        this.guardarDB()

        return ticket
    }
}