import { PrismaClient } from "@prisma/client";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from 'apollo-server-express';

export interface Context {
  prisma: PrismaClient;
}

export const context: ContextFunction<ExpressContext> = async () => {

};