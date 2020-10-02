import { CommandBuilder } from 'yargs';

export const command = `branch`;

export const describe = `show sub-module git branch`;

export const builder: CommandBuilder = function (yargs) {
  return yargs.positional(`pattern`, {
    type: `string`,
    required: true,
    describe: `pattern to match repo dirs against`,
  });
};

export { default as handler } from './handler';
