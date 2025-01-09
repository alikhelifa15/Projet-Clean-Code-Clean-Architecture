
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
    console.log(`Enregistrement du gestionnaire pour la commande : ${commandName}`);
    console.log("Gestionnaires actuels :", Array.from(this.handlers.entries()));
  }


   async execute(command: Command): Promise<any> {
    console.log("Gestionnaires disponibles :", Array.from(this.handlers.entries()));

    const commandName = command.constructor.name; 
    console.log(`Exécution de la commande : ${commandName}`);
    
    const handler = this.handlers.get(commandName);
    console.log("Gestionnaire trouvé :", handler);

    if (!handler) {
      throw new Error(`Aucun gestionnaire enregistré pour ${commandName}`);
    }

    return handler.execute(command);
  }
}