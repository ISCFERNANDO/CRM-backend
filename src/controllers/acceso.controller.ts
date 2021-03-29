import { AccessDTO } from 'src/dto/access.dto';
import * as accessService from '../services/accesso.service';

const getAllAccess = async function (req: any, res: any): Promise<void> {
    const data = await accessService.getAllAccess();
    res.send(data);
};

const addAccess = async function (req: any, res: any): Promise<void> {
    const requestBody: AccessDTO = req.body;
    const data = await accessService.addAccess(requestBody);
    res.send(data);
};

const updateAccess = async function (req: any, res: any): Promise<void> {
    const requestBody: AccessDTO = req.body;
    requestBody.id = req.params.id;
    const data = await accessService.updateAccess(requestBody);
    res.send(data);
};

const deleteAccess = async function (req: any, res: any): Promise<void> {
    const { id } = req.params;
    const data = await accessService.deleteAccess(id);
    res.send(data);
};

const findById = async function (req: any, res: any): Promise<void> {
    const { id } = req.params;
    const data = await accessService.findAccessById(id);
    res.send(data);
};

export { getAllAccess, addAccess, updateAccess, deleteAccess, findById };
