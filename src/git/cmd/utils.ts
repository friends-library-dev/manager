import fs from 'fs';
import exec from 'x-exec';
import { sync as glob } from 'glob';

export interface Repo {
  path: string;
  name: string;
}

export function getRepos(): Record<string, Repo> {
  const dirs = glob(`${__dirname}/../../../{libs,apps}/*`);
  const map: Record<string, Repo> = {};
  dirs.forEach((dir) => {
    const pkgJson = JSON.parse(fs.readFileSync(`${dir}/package.json`, `utf8`));
    const name = pkgJson.name as string;
    map[name] = { path: dir, name };
  });
  return map;
}

export function statusClean(path: string): boolean {
  return exec.success(`git diff-index --quiet HEAD --`, path);
}
