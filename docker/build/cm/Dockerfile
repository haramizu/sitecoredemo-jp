# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE

FROM ${TOOLS_IMAGE} as tools
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy Localization Files
COPY .\App_Data \inetpub\wwwroot\App_Data

# Copy Config files
COPY .\App_Config \inetpub\wwwroot\App_Config

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools