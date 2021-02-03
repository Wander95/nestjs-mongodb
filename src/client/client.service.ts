import { UpdateClientDto } from './dto/UpdateClientDto';
import { IClient } from './client.interface';
import { CreateClientDto } from './dto/CreateClientDto';
import { PaginationQueryDto } from './dto/PaginationQueryDto';
import { ClientDocument, Client } from './client.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  public async getAll(paginationQuery: PaginationQueryDto): Promise<Client[]> {
    const { limit, offset } = paginationQuery;

    return await this.clientModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(clientId: string): Promise<Client> {
    const client = await this.clientModel.findById({ _id: clientId }).exec();
    if (!client) {
      throw new NotFoundException(`Customer #${clientId} not found`);
    }

    return client;
  }

  public async create(createClientDto: CreateClientDto): Promise<IClient> {
    const newClient = await new this.clientModel(createClientDto);
    const client = await newClient.save();
    return client;
  }

  public async update(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    const existingClient = await this.clientModel.findOneAndUpdate(
      { _id: clientId },
      updateClientDto,
    );

    if (!existingClient) {
      throw new NotFoundException(`Customer #${clientId} not found`);
    }

    return existingClient;
  }

  public async remove(clientId: string): Promise<any> {
    const deleteClient = await this.clientModel.findOneAndRemove({
      _id: clientId,
    });
    return deleteClient;
  }
}
