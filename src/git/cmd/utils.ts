import fs from 'fs';
import { basename } from 'path';
import exec from 'x-exec';
import { sync as glob } from 'glob';

export interface Repo {
  path: string;
  name: string;
}

export function getRepos(): Record<string, Repo> {
  const dirs = glob(`${__dirname}/../../../{libs,apps,actions}/*`);
  const map: Record<string, Repo> = {};
  dirs.forEach((dir) => {
    let name = `actions/${basename(dir)}`;
    if (fs.existsSync(`${dir}/package.json`)) {
      const pkgJson = JSON.parse(fs.readFileSync(`${dir}/package.json`, `utf8`));
      name = pkgJson.name as string;
    }
    map[name] = { path: dir, name };
  });
  return map;
}

export function statusClean(path: string): boolean {
  return exec.success(`git diff-index --quiet HEAD --`, path);
}

export function gitBranch(path: string): string {
  return exec.exit(`git rev-parse --symbolic-full-name --abbrev-ref HEAD`, path).trim();
}
