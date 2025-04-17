using api.Models;

namespace api.Repositories;
// Repositories/IProductRepository.cs
public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
    Task<IEnumerable<Product>> GetBestSellersAsync();
    Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm);
}

