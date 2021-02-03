import { PaginationQueryDto } from './dto/PaginationQueryDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  public async getAllClients(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const client = await this.clientService.getAll(paginationQuery);
    return res.status(HttpStatus.OK).json(client);
  }

  @Get('/:id')
  public async getOneClient(@Res() res, @Param('id') clientId: string) {
    const client = await this.clientService.findOne(clientId);
    return res.status(HttpStatus.OK).json(client);
  }

  @Post()
  public async createPost(
    @Res() res,
    @Body() createClientDto: CreateClientDto,
  ) {
    try {
      const client = await this.clientService.create(createClientDto);
      return res.status(HttpStatus.OK).json(client);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Customer not created`,
        error,
      });
    }
  }

  @Put('/:id')
  public async updateOne(
    @Res() res,
    @Param('id') clientId,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const client = await this.clientService.update(clientId, updateClientDto);
    return res.status(HttpStatus.OK).json(client);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') clientId) {
    return await this.clientService.remove(clientId);
  }
}
