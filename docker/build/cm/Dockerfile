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

# Copy Config files - language fallback
# COPY .\App_Config \inetpub\wwwroot\App_Config

# Copy Xdts
COPY .\Xdts\ .\Xdts

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools

# Perform transforms
RUN (Get-ChildItem -Path 'C:\\inetpub\\wwwroot\\xdts\\web*.xdt' -Recurse ) | `
    ForEach-Object { & 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath $_.FullName `
    -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll'; };
