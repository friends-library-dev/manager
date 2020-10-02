import exec from 'x-exec';
import { log, c } from 'x-chalk';
import { getRepos, statusClean } from '../utils';

export default async function handler(): Promise<void> {
  const repos = getRepos();
  const numRepos = Object.values(repos).length;
  let numClean = 0;
  Object.values(repos).forEach(({ name, path }) => {
    if (!statusClean(path)) {
      log(c`\n{gray Pkg} {green ${name}} {gray has uncommitted changes:}`);
      exec.out(`git status -s`, path);
    } else {
      numClean++;
    }
  });

  log(
    `\n🚿`,
    numClean === numRepos
      ? c`{green ${numClean}/${numRepos}}`
      : c`{magenta ${numClean}/${numRepos}}`,
    `pkgs are clean\n`,
  );
}
