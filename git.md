<!-- #git -->

# Remote

```sh
# List remotes
git remote -v

# Set remote
git remote set-url origin git@github.com:${project}/${repository}.git
```

# Different SSH key

Create/edit `~/.ssh/config`. For example:

```
# Default GitHub Account
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes

# Second GitHub Account
Host other-github
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa-other
  IdentitiesOnly yes
```

Then change the URL of `origin` to point the host `other-github`.

```sh
# Change URL to point
git remote set-url origin git@other-github:${project}/${repository}.git
```

# Change the last commit

```sh
# Change the email of the last commit
git commit --amend --author="Your Name <email@example.com>"
```