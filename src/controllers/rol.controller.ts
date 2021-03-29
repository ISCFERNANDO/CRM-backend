import { rolModel } from '../models';

const getAllRolls = async function (req: any, res: any): Promise<void> {
    console.log('request');
    const data = await rolModel.find();
    console.log(data);
    res.send({ foo: 'foo' });
};
const addRoll = async function (req: any, res: any): Promise<void> {};
const updateRoll = async function (req: any, res: any): Promise<void> {};
const deleteRoll = async function (req: any, res: any): Promise<void> {};

export { getAllRolls, addRoll, updateRoll, deleteRoll };
