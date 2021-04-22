import { Messages } from './../constants/messages';

export default (res: any, message: string, data: any) => {
    if (data) {
        res.status(200).send({
            statusCode: 200,
            statusMessage: message || Messages.OPERATION_OK,
            data
        });
    }
};
