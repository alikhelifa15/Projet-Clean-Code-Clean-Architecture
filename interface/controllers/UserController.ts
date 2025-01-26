import { Request, Response } from "express";
import { CommandBus } from "../../application/usecases/CommandBus";
import { LoginCommand } from "../../application/usecases/commands/LoginCommand";
import { SignUpCommand } from "../../application/usecases/commands/SignUpCommand";
import { UpdateUserCommand } from "../../application/usecases/commands/UpdateUserCommand";
import { DeleteUserCommand } from "../../application/usecases/commands/DeleteUserCommand";

export class UserController {
  constructor(private commandBus: CommandBus) {}

  async login(req: Request, res: Response): Promise<void> {
    console.log("Request Body:", req.body);
    try {
      const { email, password } = req.body;
      const token = await this.commandBus.execute(
        new LoginCommand(email, password)
      );
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, type, additionalData } = req.body;
      console.log("Request Body:", req.body);
      const signUpCommand = new SignUpCommand(email, password, type, additionalData);
    console.log('Executing SignUp command:', signUpCommand);
    const result = await this.commandBus.execute(signUpCommand);
    console.log('Result of SignUp command execution:', result);
    
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error occurred during SignUp execution:", error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }



  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const { email, type, additionalData, password } = req.body;
      
      const updateCommand = new UpdateUserCommand(
        userId,
        email,
        password,
        type,
        additionalData
      );
      
      const updatedUser = await this.commandBus.execute(updateCommand);
      res.status(200).json({ 
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error occurred during user update:", error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const deleteCommand = new DeleteUserCommand(userId);
      
      await this.commandBus.execute(deleteCommand);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error occurred during user deletion:", error);
      if (error instanceof Error)
        res.status(400).json({ error: error.message });
    }
  }
}



