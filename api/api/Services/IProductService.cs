using api.Models;
using api.Repositories;

namespace api.Services;

// Services/IProductService.cs
public interface IProductService
{
    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product> GetProductByIdAsync(int id);
    Task AddProductAsync(Product product);
    Task UpdateProductAsync(Product product);
    Task DeleteProductAsync(int id);
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category);
    Task<IEnumerable<Product>> GetBestSellersAsync();
    Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm);
}
