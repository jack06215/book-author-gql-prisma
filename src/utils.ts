import util from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

export const resetDatabase = async (): Promise<void> => {
    await exec('npx prisma migrate reset --force');
};