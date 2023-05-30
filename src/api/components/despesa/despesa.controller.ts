import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Despesa } from './despesa.entity';

export class DespesaController {
  public async list(req: Request, res: Response) {

    const { limit } = req.query;

    console.log(limit);

    const despesas = await  await AppDataSource.manager.find(Despesa)
    
    res.status(200).json({ dados: despesas });
  }

  public async create(request:Request, response:Response){
    let descricao = request.body.descricao;
    let valor = request.body.valor;
    let data = request.body.data;

    let despes = new Despesa();
    despes.descricao=descricao;
    despes.data_desp=data;
    despes.valor=valor;

    const despesa_salva = await AppDataSource.manager.save(despes);
    response.status(201).json({despesa_salva});
  }
}
