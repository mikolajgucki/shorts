<!-- #gitlab -->

# Links

- [CI/CD YAML syntax reference](https://docs.gitlab.com/ee/ci/yaml/)
- [Predefined CI/CD variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

# CI/CD

```yaml
- if [ ! "$CI_COMMIT_REF_NAME" == "master" ]; then echo "${RED}${BOLD}The base Docker image cannot be built from the master branch${RESET}"; exit 1; fi
```

# User

```sh
# List local/global
git config --local --list
git config --global --list

# Remote URL

```sh
# List remotes
git remote -v

# Set remote URL
git remote set-url origin git@${host}:${username}/${repository}$.git
```