export const command = `sync`;

export const describe = `sync all submodule repos (git pull --rebase origin master)`;

export { default as handler } from './handler';
