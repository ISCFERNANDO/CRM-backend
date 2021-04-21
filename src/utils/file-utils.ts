import * as fs from 'fs';

const createFile = function (path: string, data: Buffer): Promise<string> {
    return new Promise<any>((resolve, reject) => {
        fs.writeFile(path, data, function (error: any) {
            if (error) return reject(error);
            resolve(path);
        });
    });
};

const createDirectoryIfNotExist = function (path: string): void {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
};

export { createFile, createDirectoryIfNotExist };
