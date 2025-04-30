using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        // Configure decimal precision for PostgreSQL
        builder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");
            
        builder.Entity<OrderItem>()
            .Property(oi => oi.Price)
            .HasColumnType("decimal(18,2)");
            
        builder.Entity<Order>()
            .Property(o => o.Total)
            .HasColumnType("decimal(18,2)");

        // Configure relationships
        builder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order) // <-- Correct navigation property
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

            
        // Configure case-insensitive email for PostgreSQL
        builder.Entity<Order>()
            .HasIndex(o => o.CustomerEmail);
    }
}