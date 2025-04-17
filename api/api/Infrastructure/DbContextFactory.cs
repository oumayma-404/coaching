using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace api.Infrastructure;

public class DbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // Load environment variables from .env file
        Env.Load();

        // Get environment variables for the database connection
        var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
        var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
        var dbUsername = Environment.GetEnvironmentVariable("DB_USERNAME");
        var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
        var dbName = Environment.GetEnvironmentVariable("DB_DATABASE");

        // Build connection string
        var connectionString = $"Host={dbHost};Port={dbPort};Username={dbUsername};Password={dbPassword};Database={dbName}";

        // Create the DbContextOptions using the connection string
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}