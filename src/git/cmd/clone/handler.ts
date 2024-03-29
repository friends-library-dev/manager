import fs from 'fs';
import exec from 'x-exec';
import { log, c } from 'x-chalk';
import fetch from 'node-fetch';

type RepoType = 'actions' | 'apps' | 'libs';

export default async function handler(): Promise<void> {
  const TOKEN = process.env.FLGIT_GITHUB_TOKEN;
  if (!TOKEN) {
    throw new Error(`Missing FLGIT_GITHUB_TOKEN env var`);
  }

  const headers = { Authorization: `token ${TOKEN}` };
  const ORG = `friends-library-dev`;
  const uri = `https://api.github.com/orgs/${ORG}/repos?per_page=100`;
  const res = await fetch(uri, { headers });
  let repos: Array<{ name: string; ssh_url: string; archived: boolean }> =
    await res.json();
  repos = repos.filter(
    (r) => r.name !== `manager` && r.name !== `design-assets` && !r.archived,
  );
  let numSkipped = 0;

  const promises = repos.map(async (repo) => {
    const slug = repo.name;
    const cloneUrl = repo.ssh_url;
    let dir = slug;
    let subDir: RepoType = `libs`;

    if (IGNORED_REPOS.includes(slug)) {
      return;
    }

    if (slug.startsWith(`action`)) {
      subDir = `actions`;
      dir = slug.replace(/^action-/, ``);
    } else {
      const pkgJsonUrl = `https://raw.githubusercontent.com/${ORG}/${slug}/master/package.json`;
      const res = await fetch(pkgJsonUrl, { headers });
      const text = await res.text();
      try {
        var pkgJson = JSON.parse(text);
      } catch (err) {
        console.error(`Error fetching package.json for ${ORG}/${slug}`, err);
        console.error(`Raw response text was: ${text}`);
        process.exit(1);
      }
      subDir =
        pkgJson.private === true || pkgJson.name === `@friends-library/api`
          ? `apps`
          : `libs`;
    }

    const path = `${__dirname}/../../../../${subDir}/${dir}`;
    if (!fs.existsSync(path)) {
      const gitDir = `${subDir}/${dir}`;
      log(
        c`📡 {grey Cloning missing pkg} {magenta ${slug}} {grey into dir} {cyan ${gitDir}}`,
      );
      await exec.async.exit(`git clone ${cloneUrl} ${gitDir}`);
    } else {
      numSkipped++;
    }
  });

  await Promise.all(promises);

  if (numSkipped !== repos.length) {
    log(``); // newline for aesthetics
  }

  if (numSkipped) {
    log(c`👌 Skipped {green ${numSkipped}} repos already cloned.\n`);
  }
}

const IGNORED_REPOS = [
  // deprecated
  `adoc-convert`,
  `doc-html`,
  `friends-library`, // old monorepo

  // issues-only
  `issues`,
];
