import exec from 'x-exec';
import { log, c } from 'x-chalk';
import { getRepos, statusClean } from '../utils';

export default async function handler(): Promise<void> {
  log();
  const repos = getRepos();
  const numRepos = Object.values(repos).length;
  let onMaster = 0;

  Object.values(repos).forEach(({ name, path }) => {
    const branch = exec
      .exit(`git rev-parse --symbolic-full-name --abbrev-ref HEAD`, path)
      .trim();

    if (branch !== `master`) {
      log(
        statusClean(path) ? c`{green.bold •}` : c`{red.bold •}`,
        c`{gray Pkg} {green ${name}} {gray is on branch} {cyan <${branch}>}`,
      );
    } else {
      onMaster++;
    }
  });

  onMaster !== numRepos && log();

  log(
    `📦`,
    onMaster === numRepos
      ? c`{green ${onMaster}/${numRepos}}`
      : c`{magenta ${onMaster}/${numRepos}}`,
    c`pkgs on {cyan <master>}\n`,
  );
}
