FROM mcr.microsoft.com/dotnet/sdk:7.0 as base
WORKDIR /source

# Copy csproj and restore dependencies as a distinct layer
COPY ApiSource/*.csproj .
RUN dotnet restore --use-current-runtime

ENV TRUSTEDNEIGHBOUR_ReadDockerSecrets=true

# Copy source code
COPY ApiSource/. .

### These steps are only performed in a DEVELOPMENT environment:
FROM base AS dev
# Linux containers don't get file change events from Windows volumes, so
# dotnet watch should regularly poll files instead.
ENV DOTNET_USE_POLLING_FILE_WATCHER=1
# If dotnet watch detects an edit it can't hot reload, it should always
# force a restart.
ENV DOTNET_WATCH_RESTART_ON_RUDE_EDIT=1

# Run with file watching to reload
ENTRYPOINT [ "dotnet", "watch", "--launch-profile", "docker"]

### These steps are only performed in a PRODUCTION environment:
FROM base AS build

# Build and publish .NET application
RUN dotnet publish -c Release -o /app --use-current-runtime --self-contained false --no-restore

# Create a nice sleek image for production
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as prod

RUN apt update && apt install -y curl

WORKDIR /app
COPY --from=build /app .

ENTRYPOINT [ "dotnet", "ApiSource.dll" ]