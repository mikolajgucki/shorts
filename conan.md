<!-- #conan -->

# Conan profile

Conan needs setting up the default profile:

```bash
conan profile detect
```

# Building with Conan

To build, run from the package directory:

```bash
conan install . --output-folder=build --build=missing
cd build
cmake .. -DCMAKE_TOOLCHAIN_FILE=conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release
make
```

# Setting up local Conan repository

```sh
docker run --name conan-repository -d -e JF_SHARED_DATABASE_TYPE=derby -e JF_SHARED_DATABASE_ALLOWNONPOSTGRESQL=true -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest
```

# Local repository

```sh
# List packages in the local repository
conan list

# Publish a package to the local repository
conan create . --test-folder=""

# Remove a package from the local repository
conan remove nanoid
```

# Remote repository

```sh
# Add a remote repository
conan remote add conan-local http://localhost:8081/artifactory/api/conan/conan-local

# Log in to a remote repository
conan remote login conan-local <user> -p <password>

# List remote repositories
conan remote list

# Remove a remote repository
conan remote remove conan-local

# Push a package to a remote repository
conan upload nanoid/1.0 --check -r=conan-local
```

# Pushing to a remove repository

In order to push to a remote directory:
- publish to the local repository,
- publish the package to a remote directory.

```sh
# Publish a package to the local repository
conan create . --test-folder=""

# Push a package to a remote repository
conan upload nanoid/1.0 --check -r=conan-local
```