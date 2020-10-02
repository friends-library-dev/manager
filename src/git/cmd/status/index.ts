import { CommandBuilder } from 'yargs';

export const command = `status`;

export const describe = `show sub-module git status`;

export const builder: CommandBuilder = function (yargs) {
  return yargs.positional(`pattern`, {
    type: `string`,
    required: true,
    describe: `pattern to match repo dirs against`,
  });
};

export { default as handler } from './handler';
