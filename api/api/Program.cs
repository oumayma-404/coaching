﻿// Program.cs

using api;
using api.Infrastructure;
using api.Repositories;
using api.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// Now you can access the environment variables
var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
var dbUsername = Environment.GetEnvironmentVariable("DB_USERNAME");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
var dbName = Environment.GetEnvironmentVariable("DB_DATABASE");



var connectionString = $"Host={dbHost};Port={dbPort};Username={dbUsername};Password={dbPassword};Database={dbName}";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information));
    


builder.Services.AddHttpClient(); // 👈 This registers IHttpClientFactory

// Register services (same as before)
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IPaymentService, PaymeeService>();
builder.Services.AddSingleton<CloudinaryService>();

//builder.Services.AddScoped<IPaymentService, StripePaymentService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
    options.OperationFilter<FileUploadOperationFilter>(); // 👈 Add this line
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

app.UseCors("AllowAll"); //


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