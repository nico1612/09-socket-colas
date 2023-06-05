import { TicketControl } from "../models/ticket-control.js";

const ticketControl= new TicketControl()

export const socketController = (socket) => {

    socket.on('disconnect', () => {});

    socket.emit( 'ultimo-ticket', ticketControl.ultimo )
    socket.emit( 'estado-actual', ticketControl.ultimos4 );
    socket.emit('estados-pendientes',ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

    });

    socket.on('atender-ticket',({escritorio},callback)=>{
        
        if(!escritorio){
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTickets(escritorio)

        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

        if(!ticket){
            return callback({
                ok:false,
                msg:'ya no hay tickets pendientes'
            })
        }
        else{
            return callback({
                ok:true,
                ticket
            })
        }
    })
}
