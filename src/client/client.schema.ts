/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client extends Document {
  @Prop([String])
  name: string;

  @Prop([String])
  lastName: string;

  @Prop([String])
  email: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
