import dotenv from 'dotenv';
import * as yargs from 'yargs';
import * as branch from './cmd/branch';
import * as status from './cmd/status';
import * as clone from './cmd/clone';

dotenv.config();

// eslint-disable-next-line no-unused-expressions
yargs.scriptName(`flgit`).command(branch).command(clone).command(status).help().argv;
