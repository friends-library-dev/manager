import * as yargs from 'yargs';
import * as branch from './cmd/branch';
import * as status from './cmd/status';

yargs.scriptName(`flgit`).command(branch).command(status).help().argv;
