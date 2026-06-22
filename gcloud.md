# Files

```sh
cat ~/.config/gcloud/configurations/config_default
cat ~/.config/gcloud/application_default_credentials.json
```

# Configurations

```sh
# List configurations
gcloud config configurations list

# Create configuration
gcloud config configurations create ${configuration_name}

# Set configuration
gcloud config set configuration ${configuration_name}

# Delete configuration
gcloud config configurations delete ${configuration_name}
```

# Projects

```sh
# List projects
gcloud projects list

# Set project
gcloud config set project ${project_id}
```