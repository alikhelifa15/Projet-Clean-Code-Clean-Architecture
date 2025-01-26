
export interface Command {}
export interface CommandHandler<T extends Command> {
  execute(command: T): Promise<any>;
}

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any>>();
  
  constructor() {
    console.log("CommandBus instancié");
  }
  
  register<T extends Command>(commandClass: { new (...args: any[]): T }, handler: CommandHandler<T>) {
    const commandName = commandClass.name;  
    this.handlers.set(commandName, handler);
  }


   async execute(command: Command): Promise<any> {

    const commandName = command.constructor.name;     
    const handler = this.handlers.get(commandName);
    if (!handler) {
      throw new Error(`Aucun gestionnaire enregistré pour ${commandName}`);
    }

    return handler.execute(command);
  }
}