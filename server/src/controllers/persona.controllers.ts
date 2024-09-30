import { GrupoHorario } from '../models/gphorario.model';
import { Persona } from '../models/persona.model';
import { Cargo } from '../models/cargos.model';
import { Request, Response } from 'express';
import { Area } from '../models/areas.model';

export const getPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.findAll({ attributes: ['id', 'identificacion', 'nombres', 'apellidos'] });
    
    res.status(200).json(personas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

export const getPersonaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(
      id, 
      { attributes: ['id', 'identificacion', 'nombres', 'apellidos', 'email', 'direccion', 'ciudad', 'telefono', 'rH', 'id_Areas', 'id_Cargo', 'id_Grupo_Horario'] }
    );

    if (!persona) {
      res.status(404).json({ message: 'Persona no encontrada' });
      return;
    }

    const Areas = await Area.findAll();
    const Cargos = await Cargo.findAll();
    const GruposHorario = await GrupoHorario.findAll();
    
    res.status(200).json({ persona, options: { Areas, Cargos, GruposHorario } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

export const updatePersona = async (req: Request, res: Response) => {
  const { fields, id } = req.body;
  const { nombres, apellidos, id_Areas, id_Cargo, id_Grupo_Horario } = fields;
  
  try {
    const id_Empresa = 1; const id_Ciudad = 1; const id_Centro_Costos = 1;
   
    const persona = await Persona.findByPk(id);
    if (!persona) {
      res.status(404).json({ message: 'Persona no encontrada' });
      return;
    }

    await persona.update({ nombres, apellidos, id_Areas, id_Cargo, id_Grupo_Horario, id_Empresa, id_Ciudad, id_Centro_Costos });

    res.status(200).json({ message: 'Persona actualizada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}