// Program.cs

using api;
using api.Infrastructure;
using api.Repositories;
using api.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// Build connection string from environment variables OR fallback to appsettings.json
string connectionString;

var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
if (!string.IsNullOrEmpty(dbHost))
{
    // Use environment variables (Docker/Production)
    var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
    var dbUsername = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "postgres";
    var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "postgres";
    var dbName = Environment.GetEnvironmentVariable("DB_DATABASE") ?? "sportscoach";
    
    connectionString = $"Host={dbHost};Port={dbPort};Username={dbUsername};Password={dbPassword};Database={dbName}";
}
else
{
    // Fallback to appsettings.json (Local development)
    connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection") 
        ?? throw new InvalidOperationException("No database connection string configured. Set DB_HOST environment variable or add ConnectionStrings:PostgreSQLConnection to appsettings.json");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information));


builder.Services.AddHttpClient(); // For external API calls (Email)

// Register services
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddSingleton<CloudinaryService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
    options.OperationFilter<FileUploadOperationFilter>();
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");


// Apply migrations automatically (for development)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}


app.UseRouting();


app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
