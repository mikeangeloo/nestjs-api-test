import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Mensaje} from './entities/mensaje.entity';
import {Repository} from 'typeorm';
import {CreateMensajeDto} from './dto/create-mensaje-dto';
import {arch} from 'os';

@Injectable()
export class MensajesService {

    constructor(
       @InjectRepository(Mensaje)
       private readonly mensajeRespository: Repository<Mensaje>,
    ) {}

    async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRespository.find();
    }

    async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;

        return this.mensajeRespository.save(nuevo);
    }

    async updateMensaje(idMensaje:number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
        const mensajeUpdate = await this.mensajeRespository.findOne(idMensaje);
        mensajeUpdate.nick = mensajeActualizar.nick;
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;

        return await this.mensajeRespository.save(mensajeUpdate);
    }

    async deleteMensaje(idMensaje: number): Promise<any> {
        return await this.mensajeRespository.delete(idMensaje);
    }
}
