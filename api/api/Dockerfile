# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . . 
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published files
COPY --from=build /app/out . 

# Ensure the uploads folder exists
RUN mkdir -p /app/wwwroot/uploads

ENTRYPOINT ["dotnet", "api.dll"]
