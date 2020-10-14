import { log, c } from 'x-chalk';
import exec from 'x-exec';
import { getRepos, statusClean, gitBranch } from '../utils';

export default async function handler(): Promise<void> {
  const repos = getRepos();
  for (const { path, name } of Object.values(repos)) {
    if (statusClean(path) && gitBranch(path) === `master`) {
      log(c`{grey Syncing pkg} {green ${name}}`);
      exec.async.exit(`git pull --rebase origin master`, path);
    }
  }
}
