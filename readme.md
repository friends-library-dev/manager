# Friends Library Multi-Repo Manager

It is recommended to add the following to your `~/.bashrc`:

```bash
# add friends library convenience aliases
FLROOT="/path/to/this/repo"
if [ -f ${FLROOT}/bash_aliases.sh ]; then
  source ${FLROOT}/bash_aliases.sh
fi
```

## `flgit` command

Do batch git things with multi-repo libs and apps:

```
flgit [command]

Commands:
  flgit branch   show sub-module git branch           [aliases: br]
  flgit status   show sub-module git status            [aliases: s]
```
